import React, { useState,useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Ajouter from './Ajouter';
import {motion} from 'framer-motion'
import { CgInsertAfterO } from "react-icons/cg";
import axios from 'axios';
import { CiBank } from "react-icons/ci";

function Listebanque() {
    const [showDialog, setShowDialog] = useState(false);
    const [banque,setBanque]=useState([])
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
    
    const tableStyle = {
        minWidth: 650,
    };

    const handleAddClick = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };
    const handleDeleteBanque = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/banque/${id}`);
            setBanque(banque.filter(banque => banque.id !== id));
        } catch (error) {
            console.error('Error deleting banque:', error);
        }
    };
    
    return (
        <>
        <motion.button
        whileHover={{ scale: 1.1 }} // Animation on hover
        whileTap={{ scale: 0.9 }} // Animation on tap // Animation on tap
      style={{ margin: '20px', border: 'none' }} // Remove border
      onClick={handleAddClick}
    >
      <Button variant="contained" style={{ border: 'none' }}>Ajouter nouveau banque <CgInsertAfterO fontSize={20} /></Button>
    </motion.button>
            <TableContainer component={Paper} style={{ maxWidth: "70%", marginLeft: "10%",marginTop:'20px' }}>
                <Table style={tableStyle} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell style={{  fontWeight: 'bold' }}>banque 
 </TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>supprimer</TableCell>
                        </TableRow>
                        {banque.map((item,index)=>(
                        <motion.tr key={index}
                        initial={{ opacity: 0, y: -20 }} // Initial animation properties
           animate={{ opacity: 1, y: 0 }} // Animation properties to animate to
           transition={{ duration: 0.5, delay: 0.1 }}>
                            <TableCell>{item.banque}</TableCell>
                           
                            <TableCell>
                            <Button color="error" onClick={() => handleDeleteBanque(item.id)}>Supprimer</Button>
                            </TableCell>
                        </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={showDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <Ajouter handleClose={handleCloseDialog} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="outlined" color="error">Annuler</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default Listebanque;
