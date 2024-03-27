import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import axios from 'axios';

function NumeroCompte({ societe, societeId }) {
    const [banques, setBanque] = useState([]);
    const [compteData, setCompteData] = useState({
        Compte: '',
        societe_id: societeId,
        banque_id: '' // Initialize banque_id state
    });
    

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
                console.log('Compte inserted successfully'); // Placeholder message
                // Call any necessary callback function here
                
            }
            window.location.reload()
          
        } catch (error) {
            console.log('Error inserting compte:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/banque');
                const banqueId = response.data.length > 0 ? response.data[0].id : ''; // Get the id of the first banque
                setBanque(response.data);
                setCompteData(prevData => ({
                    ...prevData,
                    id: banqueId // Set banque_id to the id of the first banque
                }));
            } catch (error) {
                console.error('Error fetching banque data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: 'auto' }} onSubmit={handleSubmit}>
            <p>Societe:{societe}</p>
            <p>id:{societeId}</p>
            <FormControl>
                <InputLabel htmlFor="banque">banque:</InputLabel>
                <Select
                    id="banque"
                    label="Banque"
                    value={compteData.banque_id} // Set value to selected banque_id
                    onChange={handleChange}
                    name="banque_id" // Set name to banque_id
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
                onChange={handleChange} // Handle changes in the TextField
                name="Compte" // Set name to Compte
                value={compteData.Compte} // Set value to compteData.Compte
            />
            <Button variant="contained" color="primary" type="submit">Submit</Button> {/* Add type="submit" */}
        </form>
    );
}

export default NumeroCompte;
