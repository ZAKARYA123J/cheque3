import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { FaPrint } from "react-icons/fa";
function Suivi() {
  const [cheques, setCheques] = useState([]);
  const [carnets,setCarnets]=useState([])
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

  return (
    <TableContainer component={Paper}>
      <h3>les cheques</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Carnet</TableCell>
            <TableCell>N° Cheque</TableCell>
            <TableCell>Date d'émission</TableCell>
            <TableCell>Date de paiement</TableCell>
            <TableCell>Bénéficiaire</TableCell>
            <TableCell>Montant</TableCell>
            <TableCell>Concerne</TableCell>
            <TableCell>Remarques</TableCell>
            <TableCell>Print<FaPrint/> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cheques.map((cheque) => (
            <TableRow key={cheque.id}>
           <TableCell>
            {cheque.carnet ? cheque.carnet.cosdecarnet : ''}</TableCell>


            <TableCell>{cheque.cheque_number}</TableCell>
            <TableCell>{cheque.emission_date}</TableCell>
            <TableCell>{cheque.payment_date}</TableCell>
            <TableCell>{cheque.beneficiary}</TableCell>
            <TableCell>{cheque.montant}</TableCell>
            <TableCell>{cheque.concern}</TableCell>
            <TableCell>{cheque.remarks}</TableCell>
            <TableCell><Button>print cheque</Button></TableCell>
          </TableRow>
          
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Suivi;
