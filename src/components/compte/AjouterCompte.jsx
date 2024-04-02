import React, { useState } from 'react';
import { Input, Button, Typography,TextField } from '@mui/material';
import axios from 'axios';

export default function AjouterCompte() {
    const [societe, setSociete] = useState('');
    const [errors, setErrors] = useState(null);

    const handelForm = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/societes/create', {
                Nomsociete: societe,
            });
            console.log('Societe added successfully');
            window.location.reload();
        } catch (error) {
            console.log('error', error);
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: 'Une erreur s\'est produite lors de l\'ajout de la société.' });
            }
        }
    };

    return (
        <form onSubmit={handelForm}>
            <TextField type='text' label='Ajouter une Societe' variant="outlined" value={societe} onChange={(e) => setSociete(e.target.value)} />
            <Button type="submit" variant="contained" color="success" style={{ margin: '10px' }}>Ajouter</Button>
            {errors && (
                <div>
                    <Typography variant="h4">Validation Errors:</Typography>
                    <ul>
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
}
