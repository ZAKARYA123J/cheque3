import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function NumeroCompte({ societe, societeId }) {
    const [banques, setBanque] = useState([]);
    const [compteData, setCompteData] = useState({
        Compte: '',
        societe_id: societeId,
        banque_id: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompteData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/comptes', compteData);
            if (response.status === 201) {
                console.log('Compte inserted successfully');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error inserting compte:', error);
            setError('Une erreur s\'est produite lors de la soumission du formulaire.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/banque');
                const banqueId = response.data.length > 0 ? response.data[0].id : '';
                setBanque(response.data);
                setCompteData(prevData => ({
                    ...prevData,
                    banque_id: banqueId
                }));
            } catch (error) {
                console.error('Error fetching banque data:', error);
                setError('Une erreur s\'est produite lors du chargement des données.');
            }
        };

        fetchData();
    }, []);

    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: 'auto' }} onSubmit={handleSubmit}>
            <p>Societe: {societe}</p>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            <FormControl>
                <InputLabel htmlFor="banque">Banque:</InputLabel>
                <Select
                    id="banque"
                    label="Banque"
                    value={compteData.banque_id}
                    onChange={handleChange}
                    name="banque_id"
                >
                    {banques.map((banque, index) => (
                        <MenuItem key={index} value={banque.id}>{banque.banque}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Numéro"
                type="number"
                variant="outlined"
                onChange={handleChange}
                name="Compte"
                value={compteData.Compte}
            />
            <Button variant="contained" color="success" type="submit">Insert Compte</Button>
        </form>
    );
}

export default NumeroCompte;
