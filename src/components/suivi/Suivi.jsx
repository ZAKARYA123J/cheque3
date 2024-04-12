import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FaPrint } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import PrintCheque from '../cheque/effecte/PrintCheque';
import PrintEffecte from '../cheque/effecte/PrintEffecte';

function Suivi() {
  const [cheques, setCheques] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCheque, setSelectedCheque] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cheques');
        setCheques(response.data);
      } catch (error) {
        console.log('Error fetching cheques:', error);
      }
    };
    fetchData();
  }, []);

  const handlePrint = (cheque) => {
    setSelectedCheque(cheque);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedCheque && selectedCheque.carnet && selectedCheque.carnet.type === 'cheque' ? 'Print Cheque' : 'Print Effecte'}</DialogTitle>
        <DialogContent>
          {selectedCheque && selectedCheque.carnet && selectedCheque.carnet.type === 'cheque' && <PrintCheque chequeId={selectedCheque.id} cheque={selectedCheque} montant={selectedCheque.montant} beneficiary={selectedCheque.beneficiary}  />}
          {selectedCheque && selectedCheque.carnet && selectedCheque.carnet.type === 'effect' && <PrintEffecte chequeId={selectedCheque.id} Effecte={selectedCheque} montant2={selectedCheque.montant} beneficiary={selectedCheque.beneficiary}/>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined" color="error">Close</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#b0c4de' }}>
            <TableRow>
              <TableCell style={{ borderBottom: '2px solid #ccc', fontWeight: 'bold' }}>Carnet</TableCell>
              <TableCell style={{ borderBottom: '2px solid #ccc', fontWeight: 'bold' }}>N° Cheque</TableCell>
              <TableCell style={{ borderBottom: '2px solid #ccc', fontWeight: 'bold' }}>Type</TableCell>
              <TableCell style={{ borderBottom: '2px solid #ccc', fontWeight: 'bold' }}>Date d'émission</TableCell>
              <TableCell style={{ borderBottom: '2px solid #ccc', fontWeight: 'bold' }}>Date de paiement</TableCell>
              <TableCell style={{ borderBottom: '2px solid #ccc', fontWeight: 'bold' }}>Bénéficiaire</TableCell>
              <TableCell style={{ borderBottom: '2px solid #ccc', fontWeight: 'bold' }}>Montant</TableCell>
              <TableCell style={{ borderBottom: '2px solid #ccc', fontWeight: 'bold' }}>Concerne</TableCell>
              <TableCell style={{ borderBottom: '2px solid #ccc', fontWeight: 'bold' }}>Remarques</TableCell>
              <TableCell style={{ borderBottom: '2px solid #ccc', fontWeight: 'bold' }}>Print<FaPrint /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cheques.map((cheque) => (
              <motion.tr
                key={cheque.id}
                initial={{ opacity: 0, y: -20 }} // Initial animation properties
                animate={{ opacity: 1, y: 0 }} // Animation properties to animate to
                transition={{ duration: 0.5, delay: 0.1 }} // Transition duration and delay
              >
                <TableCell>{cheque.carnet ? cheque.carnet.cosdecarnet : ''}</TableCell>
                <TableCell>{cheque.cheque_number}</TableCell>
                <TableCell>{cheque.carnet ? cheque.carnet.type : ''}</TableCell>
                <TableCell>{cheque.emission_date}</TableCell>
                <TableCell>{cheque.payment_date}</TableCell>
                <TableCell>{cheque.beneficiary}</TableCell>
                <TableCell>{cheque.montant}</TableCell>
                <TableCell>{cheque.concern}</TableCell>
                <TableCell>{cheque.remarks}</TableCell>
                <TableCell>
                  <motion.button
                    onClick={() => handlePrint(cheque)}
                    whileHover={{ scale: 1.1 }} // Animation on hover
                    whileTap={{ scale: 0.9 }} // Animation on tap
                    style={{ backgroundColor: 'white', color: '#00bfff ', border: 'none' }}
                  >
                    <FiPrinter fontSize={25} />
                  </motion.button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Suivi;
