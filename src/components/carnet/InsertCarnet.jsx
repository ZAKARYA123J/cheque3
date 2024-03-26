import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

function InsertCarnet() {
  const [formData, setFormData] = useState({
    type: '',
    ville: '',
    cosdecarnet: '',
    quantite_minimale: '',
    serie: '',
    first: '',
    last: '',
    remaining_checks: ''
  });
  const [errors, setErrors] = useState(null);
  const { id } = useParams();

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
      const response = await axios.post('http://localhost:8000/api/carnets', {
        ...formData,
        id_comptes: id // Injecting the id from URL params into the form data
      });
      console.log('Success:', response.data);
      // Reset form data and errors after successful submission
      setFormData({
        type: '',
        ville: '',
        cosdecarnet: '',
        quantite_minimale: '',
        serie: '',
        first: '',
        last: '',
        remaining_checks: ''
      });
      setErrors(null);
    } catch (error) {
      console.error('Error:', error.response.data);
      setErrors(error.response.data.errors);
    }
  };

  return (
    <Container>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Type" name="type" value={formData.type} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Ville" name="ville" value={formData.ville} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Cosdecarnet" name="cosdecarnet" value={formData.cosdecarnet} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Quantite Minimale" name="quantite_minimale" value={formData.quantite_minimale} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Serie" name="serie" value={formData.serie} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="First" name="first" value={formData.first} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Last" name="last" value={formData.last} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Remaining Checks" name="remaining_checks" value={formData.remaining_checks} onChange={handleChange} />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
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
  );
}

export default InsertCarnet;
