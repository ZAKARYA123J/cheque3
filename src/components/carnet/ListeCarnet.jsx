import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './carnet.css';
import Button from '@mui/material/Button';
import { IoIosAddCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { motion, useScroll  } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
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
  const { scrollYProgress } = useScroll();

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

  const handleRowClick = (id, serie) => {
    setSelectedCarnetId({ id, serie });
    setShowChequeDialog(true);
  };
  const deletCarnet=async(id)=>{
      try{
          await axios.delete(`http://localhost:8000/api/carnets/${id}`)
          setCarnet(carnets.filter(carnet=> carnet.id !== id))
      }catch(error){
        console.log('error',error)
      }
  }

  return (
    <>
      <motion.button whileHover={{ scale: 1.1 }} // Animation on hover
        whileTap={{ scale: 0.9 }} // Animation on tap
        style={{ margin: '20px', border: 'none' }} // Remove border
        onClick={handleAddClick}>
        <Button variant="contained">Ajouter nouveau carnet <FaPlus /></Button>
      </motion.button>

      <h3>les Carnets</h3>
      <motion.div style={{ scaleX: scrollYProgress }} />
      <TableContainer component={Paper} sx={{ marginTop: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow style={{ backgroundColor: 'lightblue' }}>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Compte</TableCell>
              <TableCell>societe</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>N° de Carnet</TableCell>
              <TableCell>Serie</TableCell>
              <TableCell>Reste</TableCell>
              <TableCell>Nouveau Cheque</TableCell>
              <TableCell>supprimer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: '1px solid black' }}>
            {carnets.map((carnet) => (
              <motion.tr
                key={carnet.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                // onClick={() => handleRowClick(carnet.id, carnet.serie)}
                sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
              >
                <TableCell>{carnet.id}</TableCell>
                <TableCell>{carnet.type}</TableCell>
                <TableCell>
                  {comptes.map((compte) => {
                    if (compte.id === carnet.id_comptes) {
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
                    if (compte.id === carnet.id_comptes) {
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
                <TableCell className={carnet.remaining_checks <= 10 ? 'low-checks' : ''}>{carnet.remaining_checks}</TableCell>
                <TableCell align="right">
                  <motion.button style={{border:'none'}}  whileTap={{ scale: 0.85 }} onClick={(e) => { handleRowClick(carnet.id, carnet.serie); setShowChequeDialog(true); e.stopPropagation(); }}>
                  <Button  > <FaPlus /></Button> 
                  </motion.button>

                </TableCell>
                <TableCell> <Button onClick={()=>deletCarnet(carnet.id)}><MdDeleteOutline fontSize={25}/></Button></TableCell>
              </motion.tr >
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog open={showInsertDialog} onClose={handleCloseInsertDialog}>
        <DialogContent>
          <InsertCarnet handleClose={handleCloseInsertDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInsertDialog} variant="outlined" color="error">Annuler</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showChequeDialog} onClose={handleCloseChequeDialog}>
        <DialogContent>
          {selectedCarnetId && (
            <Cheque handleClose={handleCloseChequeDialog} carnetId={selectedCarnetId.id} serie={selectedCarnetId.serie} remainingChecks={carnets.find(carnet => carnet.id === selectedCarnetId.id)?.remaining_checks} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChequeDialog}>Annuler</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
