import React,{useState} from 'react'
import { Input,Button,TextField } from '@mui/material'
import axios from 'axios'
function Ajouter() {
    const [banque,setBanque]=useState('')
    const fetchData=async()=>{
        try{
            const response = await axios.post('http://localhost:8000/api/banque',{
            banque:banque}
            )
            window.location.reload()
        }catch(error){
            console.log('error',error)
        };
    }
  return (
    <div>
        <TextField type='text' label='Ajouter nouvau banque' variant="outlined" onChange={(e)=>{setBanque(e.target.value)}}/>
        <Button onClick={fetchData} variant="contained" color="success" style={{margin:"10px"}}>Ajouter</Button>
    </div>
  )
}

export default Ajouter