import React, { useState } from 'react';
import { Typography, TextField, Grid, Container, Button, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Cheque({ carnetId,serie }) {
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
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/cheques/store', formData);
      console.log(response.data);
      navigate('/cheque');
      // Handle success or display a success message
    } catch (error) {
      console.error('Error:', error.response.data.error);
      // Handle error or display an error message
    }
  };

  return (
    <Container>
      <Typography variant="p">ID carnet: {carnetId}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel>{serie}:</InputLabel>
            <TextField
              fullWidth
              label="N° Cheque"
              type="text"
              name="cheque_number"
              value={formData.cheque_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Date d'émission</InputLabel>
            <TextField
              fullWidth
              type="date"
              name="emission_date"
              value={formData.emission_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Date de paiement</InputLabel>
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
              label="Bénéficiaire"
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
              label="Concerne"
              type="text"
              name="concern"
              value={formData.concern}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarques"
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
    </Container>
  );
}
