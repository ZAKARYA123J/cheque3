import React,{useState} from 'react'
import { Input,Button } from '@mui/material'
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
        <Input type='text' placeholder='Ajouter nouvau banque' onChange={(e)=>{setBanque(e.target.value)}}/>
        <Button onClick={fetchData}>Ajouter</Button>
    </div>
  )
}

export default Ajouter