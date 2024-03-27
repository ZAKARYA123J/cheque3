import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { IoIosAddCircleOutline } from "react-icons/io";
import NumeroCompte from './NumeroCompte';
import AjouterCompte from './AjouterCompte';

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
    const selectedSocieteObject = societes.find(societe => societe.Nomsociete === selectedSociete);
    return (
        <div style={{ padding: '20px' }}>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <NumeroCompte societe={selectedSociete} societeId={selectedSocieteObject ? selectedSocieteObject.id : null} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openInsertDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <AjouterCompte insert={insert} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <br />
            <Table>
                <TableHead >
                <TableRow  style={{ border: '1px solid black' }}>
                        <TableCell style={{ fontWeight: 'bold' }}>Société</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Compte</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>insert compte</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ border: '1px solid black' }}>
                    {societes.map((societe) => (
                        <TableRow key={societe.id}>
                            <TableCell>{societe.Nomsociete}</TableCell>
                            {comptes.map((compte) => {
                                if (compte.societe_id === societe.id) {
                                    return (
                                        <React.Fragment key={compte.id}>
                                            <div>{compte.Compte}</div>
                                            <div>{compte.banque.banque}</div>
                                        </React.Fragment>
                                    );
                                }
                                return null;
                            })}
                            <TableCell>
                                <Button onClick={() => handleOpenDialog(societe.Nomsociete)}>
                                    <IoIosAddCircleOutline fontSize={20} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={handleOpenInsertDialog} style={{ marginTop: '20px' }}>Insert Societe</Button>
        </div>
    );
}

export default ListeCompte;
