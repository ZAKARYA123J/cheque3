import React from 'react';
import { Typography, TextField, Grid, Container, Button,InputLabel } from '@mui/material';

export default function Cheque({carnetId}) {
  return (
    <Container>
      <Typography variant="p">ID carnet :{carnetId}</Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="N° Cheque" type="text" />
          </Grid>
          <Grid item xs={12} >
            <InputLabel>Date d'émission</InputLabel>
            <TextField fullWidth label="" type="date" />
          </Grid>
          <Grid item xs={12} >
          <InputLabel>Date de paiement</InputLabel>
            <TextField fullWidth  type="date" />
          </Grid>
          <Grid item xs={12} >
            <TextField fullWidth label="Bénéficiaire" type="text" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Montant" type="number" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Concerne" type="text" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Remarques" type="text" />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form>
    </Container>
  );
}
