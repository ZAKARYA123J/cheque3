import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

function Redirecte({chequeId}) {
    const [inputvalue, setInput] = useState({
        nom: '',
        couse: '',
        cheque_id: chequeId
    });


    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/redirecte', inputvalue);
            console.log(response.data);
        } catch (error) {
            console.log('error', error);
        }
    };
    return (
        <Container maxWidth="sm">
            <Typography variant="h5" align="center" gutterBottom>Redirecte Form</Typography>
            <form onSubmit={handleSubmit}>
                <p>{chequeId}</p>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth name="nom" label="Nom" variant="outlined" placeholder="Saisissez votre nom" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth name="couse" label="La cause" variant="outlined" placeholder="Saisissez votre cause" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Redirecte;
