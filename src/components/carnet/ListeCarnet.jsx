import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { IoIosAddCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import InsertCarnet from './InsertCarnet';
import Cheque from '../Create/Cheque';

export default function ListeCarnet() {
  const [carnets, setCarnet] = useState([]);
  const [showInsertDialog, setShowInsertDialog] = useState(false);
  const [showChequeDialog, setShowChequeDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/comptes');
        const { data } = response;
        setCarnet(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddClick = () => {
    setShowInsertDialog(true);
  };

  const handleCloseInsertDialog = () => {
    setShowInsertDialog(false);
  };

  const handleCloseChequeDialog = () => {
    setShowChequeDialog(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleAddClick}>Ajouter nouveau <FaPlus /></Button>
      <h3>les Carnets</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Banque</TableCell>
              <TableCell align="right">Compte</TableCell>
              <TableCell align="right">Ville</TableCell>
              <TableCell align="right">N° de Carnet</TableCell>
              <TableCell align="right">Serie</TableCell>
              <TableCell align="right">Debut</TableCell>
              <TableCell align="right">Fin</TableCell>
              <TableCell align="right">Reste</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Nouveau Cheque</TableCell>
              <TableCell align="right">Supprimer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carnets.map((carnet, index) => (
              <TableRow key={index}>
                <TableCell>{carnet.id}</TableCell>
                <TableCell align="right">{carnet.type}</TableCell>
                <TableCell>{carnet.Banque}</TableCell>
                <TableCell>{carnet.Compte}</TableCell>
                <TableCell align="right">{carnet.ville}</TableCell>
                <TableCell align="right">{carnet.cosdecarnet}</TableCell>
                <TableCell align="right">{carnet.serie}</TableCell>
                <TableCell align="right">{carnet.first}</TableCell>
                <TableCell align="right">{carnet.last}</TableCell>
                <TableCell align="right">{carnet.remaining_checks}</TableCell>
                <TableCell align="right">ze</TableCell>
                <TableCell align="right">
                  <Button onClick={() => setShowChequeDialog(true)}>
                    <IoIosAddCircle fontSize={30} />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button color="secondary">Edit</Button>
                  <Button variant="outlined" color="error">Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={showInsertDialog} onClose={handleCloseInsertDialog}>
        <DialogContent>
          <InsertCarnet handleClose={handleCloseInsertDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInsertDialog}>Annuler</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showChequeDialog} onClose={handleCloseChequeDialog}>
        <DialogContent>
          <Cheque handleClose={handleCloseChequeDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChequeDialog}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
