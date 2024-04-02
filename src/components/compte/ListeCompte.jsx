import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ListItem,List,Typography,ListItemText, ListItemSecondaryAction,Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { IoIosAddCircleOutline } from "react-icons/io";
import NumeroCompte from './NumeroCompte';
import AjouterCompte from './AjouterCompte';
import { motion } from 'framer-motion';

// import './compte.css'
function ListeCompte() {
    const [comptes, setComptes] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openInsertDialog, setOpenInsertDialog] = useState(false);
    const [selectedSociete, setSelectedSociete] = useState('');
    const [insert, setInsert] = useState('');
    const [societes, setSocietes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const compteResponse = await axios.get('http://localhost:8000/api/comptes');
                const societeResponse = await axios.get('http://localhost:8000/api/societes');
                setComptes(compteResponse.data);
                setSocietes(societeResponse.data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleOpenDialog = (societeName) => {
        setSelectedSociete(societeName);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenInsertDialog(false);
    };

    const handleOpenInsertDialog = () => {
        setInsert('');
        setOpenInsertDialog(true);
    };
    const deleteCompte = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/comptes/${id}`);
            // After deletion, you may want to update the state to reflect the changes
            const updatedComptes = comptes.filter(compte => compte.id !== id);
            setComptes(updatedComptes);
        } catch (error) {
            console.log('Error deleting compte:', error);
        }
    };
    const selectedSocieteObject = societes.find(societe => societe.Nomsociete === selectedSociete);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '20px' }}
        >
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <NumeroCompte societe={selectedSociete} societeId={selectedSocieteObject ? selectedSocieteObject.id : null} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="outlined" color="error">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openInsertDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <AjouterCompte insert={insert} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="outlined" color="error">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <br />
            <List className='List'>
    {societes.map((societe) => (
        <motion.div
            key={societe.id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >
            <ListItem className='ListItem' key={societe.id}>
                <ListItemText primary={<Typography variant="h4">
            {societe.Nomsociete}
        </Typography>} />
                <ListItemSecondaryAction>
                    <Button  onClick={() => handleOpenDialog(societe.Nomsociete)} color="secondary" variant="outlined" >
                       insert compte <IoIosAddCircleOutline fontSize={20} />
                    </Button>
                </ListItemSecondaryAction>
            </ListItem>
            <List>
                {comptes.map((compte) => {
                    if (compte.societe_id === societe.id) {
                        return (
                            <motion.div
                                key={compte.id}
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ListItem className='ListItem' key={compte.id}>
                                    <ListItemText primary={`${compte.Compte} | ${compte.banque.banque}`} />
                                    <ListItemSecondaryAction>
                                        <Button onClick={() => deleteCompte(compte.id)} variant="contained" color="error" style={{ margin: '4px' }}>supprimer</Button>
                                        
                                    </ListItemSecondaryAction>
                                </ListItem>
                                
                            </motion.div>
                            
                        );
                    }
                
                    return null;
                })}
            </List>
            <hr/>
        </motion.div>
    ))}
</List>


            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
            <Button variant="contained" onClick={handleOpenInsertDialog} style={{ marginTop: '20px' }}>Insert Societe</Button>
            </motion.div>
        </motion.div>
    );
}

export default ListeCompte;
