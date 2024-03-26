import React,{useState,useEffect} from 'react'
import { Input,Button } from '@mui/material'
import axios from 'axios'
export default function AjouterCompte() {
    const [societe,setSociete]=useState('')
    const [banque,setBnaque]=useState('')
    const handelForm = async(e)=>{
        e.preventDefault()
        try{
            await axios.post('http://localhost:8000/api/societes/create',{
                Nomsociete:societe,
                banque:banque
            })
            console.log('Societe added successfully');
            window.location.reload()
        }catch(error){
            console.log('error',error)
        }
    }
  return (
    <form onSubmit={handelForm}>
    <Input type='text' placeholder='Ajouter une Societe' value={societe} onChange={(e) => setSociete(e.target.value)} />
    <Input type='text' placeholder='Ajouter une banque' value={banque} onChange={(e) => setBnaque(e.target.value)} />
    <Button type="submit">Ajouter</Button>
</form>
  )
}
