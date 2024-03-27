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
  const [selectedCarnetId, setSelectedCarnetId] = useState(null);
  const [comptes, setComptes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/carnets');
        const compteResponse = await axios.get('http://localhost:8000/api/comptes');
        setCarnet(response.data);
        setComptes(compteResponse.data);
       
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
  const handleRowClick = (id) => {
    setSelectedCarnetId(id);
    setShowChequeDialog(true);
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
              <TableCell align="right">Compte</TableCell>
              <TableCell align="right">societe</TableCell>
              <TableCell align="right">Ville</TableCell>
              <TableCell align="right">N° de Carnet</TableCell>
              <TableCell align="right">Serie</TableCell>
              <TableCell align="right">Debut</TableCell>
              <TableCell align="right">Fin</TableCell>
              <TableCell align="right">Reste</TableCell>
              <TableCell align="right">Nouveau Cheque</TableCell>
              <TableCell align="right">Supprimer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ border: '1px solid black' }}>
  {carnets.map((carnet) => (
    <TableRow key={carnet.id} onClick={() => handleRowClick(carnet.id)}>
      <TableCell>{carnet.id}</TableCell>
      <TableCell>{carnet.type}</TableCell>
      <TableCell>
        {comptes.map((compte) => {
          if (compte.id=== carnet.id_comptes) {
            return (
              <React.Fragment key={compte.id}>
                <div>{compte.Compte}</div>
                <div>{compte.banque.banque}</div>
              </React.Fragment>
            );
          }
          return null;
        })}
      </TableCell>
      <TableCell>
        {comptes.map((compte) => {
          if (compte.id=== carnet.id_comptes) {
            return (
              <React.Fragment key={compte.id}>
               
                <div>{compte.societe.Nomsociete}</div>
              </React.Fragment>
            );
          }
          return null;
        })}
      </TableCell>
      <TableCell>{carnet.ville}</TableCell>
      <TableCell>{carnet.cosdecarnet}</TableCell>
      <TableCell>{carnet.serie}</TableCell>
      <TableCell>{carnet.first}</TableCell>
      <TableCell>{carnet.last}</TableCell>
      <TableCell>{carnet.remaining_checks}</TableCell>
      <TableCell align="right">
                  <Button onClick={() => setShowChequeDialog(true)}>
                    <IoIosAddCircle fontSize={30} />
                  </Button>
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
          <Cheque handleClose={handleCloseChequeDialog} carnetId={selectedCarnetId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChequeDialog}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
