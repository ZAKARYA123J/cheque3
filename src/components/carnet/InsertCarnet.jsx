import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Select, MenuItem, InputLabel } from '@mui/material';

function InsertCarnet() {
 
  const [formData, setFormData] = useState({
    type: '',
    ville: '',
    id_comptes: '', // Changed this from an empty string to null
    cosdecarnet: '',
    quantite_minimale: '',
    serie: '',
    first: '',
    last: '',
    remaining_checks: ''
  });
  const [comptes, setComptes] = useState([]);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/comptes');
        setComptes(response.data);
        
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      id_comptes: value
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/carnets', formData);
      console.log('Success:', response.data);
      setFormData({
        type: '',
        ville: '',
        id_comptes: '',
        quantite_minimale: '',
        serie: '',
        remaining_checks: ''
      });
      window.location.reload()
      setErrors(null);
     
      window.alert(`Carnet successfully created. N° de Carnet: ${response.data.cosdecarnet}`)
      
    } catch (error) {
      console.error('Error:', error.response.data);
      setErrors(error.response.data.errors);
    }
  };

  return (
    <>
   
    <Container>
    
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}  >
          <InputLabel id="type-label">Type</InputLabel>
            <Select
           
              fullWidth
              labelId="type-label"
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '80%' }}
            >
              <MenuItem value="cheque">Cheque</MenuItem>
              <MenuItem value="effect">Effect</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField fullWidth label="Ville" name="ville" value={formData.ville}  sx={{ width: '80%' }} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputLabel id="comptes-label">Comptes</InputLabel>
            <Select
              fullWidth
              labelId="comptes-label"
              label="Comptes"
              name="id_comptes"
              value={formData.id_comptes}
              sx={{ width: '80%' }}
              onChange={handleSelectChange} // Using handleSelectChange for <Select> component
            >
              {comptes.map(compte => (
                <MenuItem key={compte.id} value={compte.id}>
                  {compte.Compte} - {compte.banque.banque}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Quantite Minimale" name="quantite_minimale" value={formData.quantite_minimale} onChange={handleChange} />
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <TextField fullWidth label="Serie" name="serie" value={formData.serie}  sx={{ width: '80%' }} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField fullWidth type="number" label="Nomber de cheque" name="remaining_checks"  sx={{ width: '80%' }} value={formData.remaining_checks} onChange={handleChange} />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="success" style={{margin:"10px"}}>insert carnet</Button>
      </form>
      {errors && (
        <div>
          <Typography variant="h3">Validation Errors:</Typography>
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
       
    </Container>
    </>
  );
}

export default InsertCarnet;
