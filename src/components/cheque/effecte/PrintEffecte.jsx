import React,{useState,useEffect,useRef} from 'react'
import { TextField, Button,Container,Paper   } from '@mui/material';
import { styled } from '@mui/system';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import { MdPrint } from "react-icons/md";
function PrintEffecte({Effecte,montant2,beneficiary,chequeId}) {
    const [inputValues, setInputValues] = useState({
        date: '',
        montant:montant2,
        montant_lettere: '',
        beneficaire: beneficiary,
        cheque_id:chequeId,
      });
      const [print,setPrint]=useState(false)
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
        if (nombre < 0) {
          return "moins " + NumberToLetter(-nombre); // Convert negative number to text
        }
      
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
      }, [inputValues.montant,NumberToLetter]);
      const handleMontantChange = (e) => {
        setInputValues(prevState => ({
          ...prevState,
          Montant: e.target.value,
        }));
      };
      const componentRef = useRef();
    
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        
      });
    
      const handleInputChange  = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
      // const RootContainer = styled('div')({
      //   display: 'flex',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   minHeight: '100vh',
      //   padding: '10px',
      //   fontFamily: 'Poppins, sans-serif',
      //   background: 'linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%)',
      // });
      
      // const StyledContainer = styled(Container)({
      //   maxWidth: 800,
      //   background: '#fff',
      //   width: 800,
      //   padding: '25px 40px 10px 40px',
      //   boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
      //   margin: 'auto',
      //   marginTop: '10px',
      // });
      
      // const StyledTextField = styled(TextField)({
      //   width: '100%',
      //   margin: '20px 0',
      // });
      
      // const StyledButton = styled(Button)({
      //   marginLeft: '250px',
      //   marginTop: '10px',
      // });
      
      // const StyledPrintArea = styled('div')({
      //   display: 'none',
      //   width: '20cm',
      //   height: '10.2cm',
      // });
      
      // const StyledPrintedContent = styled('div')({
      //   backgroundColor: 'red',
      //   textAlign: 'right',
      //   paddingRight: '10px',
      // });
      const handelform = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/printEffecte', inputValues);
          console.log('data has been sent', response.data);
          const printeEffecte = response.data.printeffecte;
          setPrint(printeEffecte.printed === 1);
        } catch (error) {
          console.log('error', error);
        }
      }
  return (
    <div>
      <Container>
  <Paper elevation={3} style={{ padding: 20, width:'60%',marginLeft:"100px" }}>
  <form onSubmit={handelform}>
          <TextField
            name="montant"
            type='number'
            label="Montant"
            variant="outlined"
            value={inputValues.montant}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="Montantalphabit"
            label="Montantalphabit"
            variant="outlined"
            value={inputValues.montant_lettere}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="date"
            type='date'
            variant="outlined"
            value={inputValues.date}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            name="beneficaire"
            value={inputValues.beneficaire}
            onChange={handleInputChange}
            placeholder="A l'ordre de"
            fullWidth
            margin="normal"
          />
          {print ? (
          <div>
                <p>Effecte has already been printed</p>
                <Button>redirecte print</Button>
                </div>
            ) : (
                <button onClick={handlePrint}>Print effecte</button>
            )}
        </form>
  
  </Paper>

  
</Container>


      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <p>{inputValues.date}</p>
          <p>{inputValues.Montant}</p>
          <p>{inputValues.beneficaire}</p>
          <p>{inputValues.Montantalphabit}</p>
        </div>
      </div>
    </div>
  )
}

export default PrintEffecte