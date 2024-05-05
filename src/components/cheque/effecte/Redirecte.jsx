import React from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid } from '@mui/material'; // Import Material-UI components

function Redirecte() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const nom = e.target.elements.nom.value;
            const couse = e.target.elements.couse.value;
            const response = await axios.post('http://127.0.0.1:8000/api/redirecte', { nom, couse });
            console.log(response.data); // Do something with the response if needed
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <Container maxWidth="sm"> {/* Set maximum width */}
            <Typography variant="h5" align="center" gutterBottom>Redirecte Form</Typography> {/* Typography component for heading */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}> {/* Grid container for form elements */}
                    <Grid item xs={12}> {/* Grid item for input field */}
                        <TextField fullWidth name="nom" label="Nom" variant="outlined" placeholder="Saisissez votre nom" /> {/* TextField component for name */}
                    </Grid>
                    <Grid item xs={12}> {/* Grid item for input field */}
                        <TextField fullWidth name="couse" label="La cause" variant="outlined" placeholder="Saisissez votre cause" /> {/* TextField component for cause */}
                    </Grid>
                    <Grid item xs={12}> {/* Grid item for submit button */}
                        <Button type="submit" variant="contained" color="primary">Submit</Button> {/* Button component for submission */}
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Redirecte;
