import React, { useState,useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Ajouter from './Ajouter';
import { CgInsertAfterO } from "react-icons/cg";
import axios from 'axios';

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
           <Button variant="contained" onClick={handleAddClick} style={{margin:"20px"}}>Ajouter nouveau banque <CgInsertAfterO fontSize={20}/></Button>
          
            <TableContainer component={Paper} style={{ maxWidth: "70%", marginLeft: "10%",marginTop:'20px' }}>
                <Table style={tableStyle} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell style={{  fontWeight: 'bold' }}>banque</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>supprimer</TableCell>
                        </TableRow>
                        {banque.map((item,index)=>(
                        <TableRow key={index}>
                            <TableCell>{item.banque}</TableCell>
                           
                            <TableCell>
                            <Button color="error" onClick={() => handleDeleteBanque(item.id)}>Supprimer</Button>
                            </TableCell>
                        </TableRow>
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
