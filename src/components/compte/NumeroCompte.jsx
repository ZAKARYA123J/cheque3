import React,{useEffect,useState} from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import axios from 'axios';
function NumeroCompte({ societe   }) {
    const[banques,setBanque]=useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/banque');
                setBanque(response.data); // Assuming your API response is an array of banque data
            } catch (error) {
                console.error('Error fetching banque data:', error);
            }
        };
    
        fetchData();
    }, []);
    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: 'auto' }}>
            <p>Societe:{societe}</p>
            <FormControl>
                
                <InputLabel htmlFor="banque">banque:</InputLabel>
                <Select
                    id="banque"
                    label="Banque"
                    defaultValue=""
                >
                    {banques.map((banque, index) => (
                        <MenuItem key={index} value={banque.banque}>{banque.banque}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Numéro"
                type="number"
                variant="outlined"
            />
            <Button variant="contained" color="primary">Submit</Button>
        </form>
    );
}

export default NumeroCompte;
