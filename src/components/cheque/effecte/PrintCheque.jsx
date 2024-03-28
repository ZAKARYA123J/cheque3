
import { useReactToPrint } from 'react-to-print';
import { TextField,Button ,Grid,Paper } from '@mui/material';
import React, { useState, useRef ,useEffect} from 'react';
// import img from './dev.jpg';
// import img2 from './banqe.jpg';
// import img3 from './cih.png'
// import impremt from './impremetb.png'


export default function PrintCheque({cheque,montant,beneficiary}) {
  const [inputValues, setInputValues] = useState({
    Montant: montant,
    Montantalphabit: '',
    ordre: beneficiary,
    Fait: '',
    Date: '',
  });
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
    const montantNumeric = parseFloat(inputValues.Montant);
    if (!isNaN(montantNumeric)) {
      const montantAsText = NumberToLetter(Math.floor(montantNumeric));
      setInputValues(prevState => ({
        ...prevState,
        Montantalphabit: montantAsText,
      }));
    }
  }, [inputValues.Montant]);
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

  return (
    <>
        <Paper elevation={3} style={{ padding: 20,width:'60%',marginLeft:"100px" }}>
        <TextField
          type="number"
          name="Montant"
          value={inputValues.Montant}
          label="Montant"
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          name="Montantalphabit"
          value={inputValues.Montantalphabit}
          
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
/>

        <TextField
          type="text"
          name="Fait"
          value={inputValues.Fait}
          onChange={handleChange}
          label="Fait a"
          fullWidth
          margin="normal"
        />
        <TextField
          type="date"
          name="Date"
          value={inputValues.Date}
          onChange={handleChange}
         
          fullWidth
          margin="normal"
        />
        <Button variant="outlined"  onClick={handlePrint}>Print votre cheque</Button>
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
   
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover', 
      height: '7.9cm',
      width: '17.3cm',
      marginTop: '-15px',
      position: 'relative',
    }}>
      <div style={{color:'green',fontWeight:'bold'}}>
        <p style={{marginLeft:'500px',marginTop:'22px'}}># {values.Montant}#</p>
        <p style={{marginLeft:'300px',marginTop:'20px'}}>{values.Montantalphabit}</p>
        <p style={{paddingLeft:'300px',paddingTop:"6px"}}> {values.ordre}</p>
        <p style={{marginLeft:"320px",marginTop:'30px'}}>{values.Fait}</p>
        <p style={{marginLeft:"550px",marginTop:'-35px'}}>{values.Date}</p>
        
      </div>
      
     
    </div>
  ));
  
