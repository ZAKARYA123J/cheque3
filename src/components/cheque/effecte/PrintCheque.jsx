
import { useReactToPrint } from 'react-to-print';
import { TextField,Button ,Grid,Paper } from '@mui/material';
import React, { useState, useRef ,useEffect} from 'react';
import Redirecte from './Redirecte';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material'
// import img from './dev.jpg';
// import img2 from './banqe.jpg';
// import img3 from './cih.png'
// import impremt from './impremetb.png'
import img from './mr.jpeg'
import axios from 'axios';

export default function PrintCheque({cheque,montant,beneficiary,chequeId}) {
  const [inputValues, setInputValues] = useState({
    montant: montant,
    montant_lettere: '',
    ordre: beneficiary,
    place: '',
    date: '',
    cheque_id:chequeId,
  });
 
  const [print,setPrint]=useState(false)
  const [openDialog, setOpenDialog] = useState(false);
  function NumberToLetter(nombre) {
    // Define your Unite and Dizaine functions here as you did before
  
    const units = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
    const teens = ["", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
    const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];
  
    function convertLessThanOneThousand(n) {
      let output = '';
      if (n >= 100) {
        output += units[Math.floor(n / 100)] + " cent ";
        n %= 100;
      }
      if (n >= 20) {
        output += tens[Math.floor(n / 10)] + "-";
        n %= 10;
      } else if (n >= 10) {
        output += teens[n - 10] + " ";
        return output.trim();
      }
      if (n > 0) {
        output += units[n] + " ";
      }
      return output.trim();
    }
  
    if (nombre === 0) return "zéro";
    if (nombre < 0) return "moins " + NumberToLetter(-nombre);
  
    let result = '';
    let power = 0;
    while (nombre > 0) {
      const chunk = nombre % 1000;
      if (chunk > 0) {
        const chunkText = convertLessThanOneThousand(chunk);
        result = chunkText + ['', 'mille', 'million', 'milliard', 'billion'][power] + " " + result;
      }
      nombre = Math.floor(nombre / 1000);
      power++;
    }
  
    return result.trim();
  }
  
  useEffect(() => {
    const montantNumeric = parseFloat(inputValues.montant);
    if (!isNaN(montantNumeric)) {
      const montantAsText = NumberToLetter(Math.floor(montantNumeric));
      setInputValues(prevState => ({
        ...prevState,
        montant_lettere: montantAsText,
      }));
    }
  }, [inputValues.montant]);
  // const handleMontantChange = (e) => {
  //   setInputValues(prevState => ({
  //     ...prevState,
  //     Montant: e.target.value,
  //   }));
  // };
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
};

const handleCloseDialog = () => {
    setOpenDialog(false);
};
  const handleForm = async (e) => {
    e.preventDefault(); // Corrected typo
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/print', inputValues);
      console.log('data has been sent', response.data);
      // Only print if API call is successful
      handlePrint();
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/print/${chequeId}`);
            const printedCheque = response.data.printedCheque;
            setPrint(printedCheque.printed === 1);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    fetchData();
}, [chequeId]);



  return (
    <>
        <Paper elevation={3} style={{ padding: 20,width:'60%',marginLeft:"100px" }}>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <Redirecte chequeId={chequeId}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="outlined" color="error">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        <p>
          {chequeId}
        </p>
        <form onSubmit={handleForm}>
        <TextField
          type="number"
          name="montant"
          value={inputValues.montant}
          label="Montant"
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          name="montant_lettere"
          value={inputValues.montant_lettere}
          
          label="Montant in letters"
          fullWidth
          margin="normal"
        />
       <TextField
  type="text"
  name="ordre"
  value={inputValues.ordre}
 // Add onChange handler here
  label="A l'ordre de"
  fullWidth
  margin="normal"
  required
/>

        <TextField
          type="text"
          name="place"
          value={inputValues.place}
          onChange={handleChange}
          label="Fait a"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="date"
          name="date"
          value={inputValues.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
         {print ? (
          <div>
                <p>Cheque has already been printed</p>
                <Button onClick={handleOpenDialog}>Redirecte Print</Button>
                </div>
            ) : (
                <button onClick={handlePrint}>Print Cheque</button>
            )}
    </form>
      </Paper>
   
    
    <div style={{ display: 'none' }}>
      {/* Ensure componentRef is defined and correctly assigned */}
      <ComponentToPrint values={inputValues} ref={componentRef} />
    </div>
  </>
  
  );
}

const ComponentToPrint = React.forwardRef(({ values }, ref) => (
  <div ref={ref} style={{ 
    // backgroundImage: `url(${img})`,
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover', 
      height: '7.9cm',
      width: '17.3cm',
      marginTop: '-15px',
      position: 'relative',
    }}>
      <div style={{fontWeight:'bold'}}>
        <p style={{marginLeft:'500px',paddingTop:'15px'}}># {values.Montant}#</p>
        <p style={{marginLeft:'300px',paddingTop:'15px'}}>{values.montant_lettere}</p>
        <p style={{paddingLeft:'300px',paddingTop:"30px"}}> {values.ordre}</p>
        <p style={{marginLeft:"320px",paddingTop:'25px'}}>{values.place}</p>
        <p style={{marginLeft:"550px",paddingButtom:'50px'}}>{values.date}</p>
        
      </div>
      
     
    </div>
  ));
  
