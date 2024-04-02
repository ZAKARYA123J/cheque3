import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Dialog, DialogTitle, DialogContent, DialogActions  } from '@mui/material';
import { FaPrint } from "react-icons/fa";
import PrintCheque from '../cheque/effecte/PrintCheque';
function Suivi() {
  const [cheques, setCheques] = useState([]);
  const [carnets,setCarnets]=useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCheque, setSelectedCheque] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cheques');
        const carnetResponse=await axios.get('http://localhost:8000/api/carnets')
        setCheques(response.data);
        setCarnets(carnetResponse.data)
      } catch (error) {
        console.log('Error fetching cheques:', error);
      }
    };
    fetchData();
  }, []);
  const handlePrintCheque = (cheque) => {
    setSelectedCheque(cheque);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div> <Dialog open={openDialog} onClose={handleCloseDialog}>
    <DialogTitle>Print Cheque</DialogTitle>
    <DialogContent>
      {selectedCheque && <PrintCheque cheque={selectedCheque}  montant={selectedCheque.montant} beneficiary={selectedCheque.beneficiary} />}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog} variant="outlined" color="error">Close</Button>
    </DialogActions>
  </Dialog>
    <TableContainer component={Paper}>
      <Table>
      <TableHead style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
    <TableRow>
        <TableCell style={{ borderBottom: '2px solid #ccc' }}>Carnet</TableCell>
        <TableCell style={{ borderBottom: '2px solid #ccc' }}>N° Cheque</TableCell>
        <TableCell style={{ borderBottom: '2px solid #ccc' }}>Type</TableCell>
        <TableCell style={{ borderBottom: '2px solid #ccc' }}>Date d'émission</TableCell>
        <TableCell style={{ borderBottom: '2px solid #ccc' }}>Date de paiement</TableCell>
        <TableCell style={{ borderBottom: '2px solid #ccc' }}>Bénéficiaire</TableCell>
        <TableCell style={{ borderBottom: '2px solid #ccc' }}>Montant</TableCell>
        <TableCell style={{ borderBottom: '2px solid #ccc' }}>Concerne</TableCell>
        <TableCell style={{ borderBottom: '2px solid #ccc' }}>Remarques</TableCell>
        <TableCell style={{ borderBottom: '2px solid #ccc' }}>Print<FaPrint/></TableCell>
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
               onClick={() => handlePrintCheque(cheque)}
               whileHover={{ scale: 1.1 }} // Animation on hover
               whileTap={{ scale: 0.9 }} // Animation on tap
             >
               Print cheque
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
