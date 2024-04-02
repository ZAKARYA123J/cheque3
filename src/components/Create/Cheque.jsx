import React, { useState, useEffect } from 'react';
import { Typography, TextField, Grid, Container, Button, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cheque({ carnetId, serie ,remainingChecks}) {
  const [chequeOption,setChequeOption]=useState('')
  const [formData, setFormData] = useState({
    carnet_id: carnetId,
    cheque_number: '',
    emission_date: '',
    payment_date: '',
    beneficiary: '',
    montant: '',
    concern: '',
    remarks: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/cheques/store', formData);
      console.log(response.data);
      navigate('/cheque');
      setErrors(null);
      // Handle success or display a success message
    } catch (error) {
      console.error('Error:', error.response.data.error);
      if (error.response.data.error === 'No checks in stock') {
        setErrors({ noChecksInStock: error.response.data.error });
      } else {
        setErrors(error.response.data.errors);
      }
      // Handle error or display an error message
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cheques/available-count/${carnetId}`);
        setChequeOption(Object.values(response.data.available_cheque_numbers));
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchData();
  }, []);

  // console.log(serie)

  // const chequeNumberOptions = [];
  // for (let i = 1; i <= remainingChecks; i++) {
  //   const value = `${serie}${i}`;
  //   console.log(value) // Concatenate serie with the loop variable 'i'
  //   chequeNumberOptions.push(
  //     <MenuItem key={i} value={value}>{` ${value}`}</MenuItem>
  //   );
  // }
  // console.log("Remaining checks:", remainingChecks);
  // console.log(chequeNumberOptions)


  return (
    <Container>
      <Typography variant="p">ID carnet: {carnetId}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel>Cheque Number</InputLabel>
            <Select
              name="cheque_number"
              value={formData.cheque_number}
              onChange={handleChange}
              fullWidth
            >
              {chequeOption && chequeOption.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Emission Date</InputLabel>
            <TextField
              fullWidth
              type="date"
              name="emission_date"
              value={formData.emission_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Payment Date</InputLabel>
            <TextField
              fullWidth
              type="date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Beneficiary"
              type="text"
              name="beneficiary"
              value={formData.beneficiary}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Montant"
              type="number"
              name="montant"
              value={formData.montant}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Concern"
              type="text"
              name="concern"
              value={formData.concern}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarks"
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} type="submit">
          Submit
        </Button>
      </form>
      {errors && (
        <div>
          <Typography variant="h4">Validation Errors:</Typography>
          <ul>
            {Object.keys(errors).map((key, index) => (
              <li key={index}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
