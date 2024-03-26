import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography,Button ,Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { IoIosAddCircleOutline } from "react-icons/io";
import NumeroCompte from './NumeroCompte';
function ListeCompte() {
    const [comptes, setComptes] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSociete, setSelectedSociete] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/comptes');
                const { data } = response;
                setComptes(data);
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
    };
    return (
        <div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                
                <DialogContent>
                    <NumeroCompte societe={selectedSociete} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
          <br/>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Société</TableCell>
                        <TableCell>Compte</TableCell>
                        <TableCell>Banque</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {comptes.map((compte) => (
                        <TableRow key={compte.id}>
                            <TableCell>{compte.societe.Nomsociete}
                            <Button onClick={() => handleOpenDialog(compte.societe.Nomsociete)}>
                                    <IoIosAddCircleOutline fontSize={20} />
                                </Button>
                            </TableCell>
                            <TableCell>{compte.Compte}</TableCell>
                            {/* Assuming Numero de Compte is societe id */}
                            <TableCell>{compte.banque.banque}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ListeCompte;
