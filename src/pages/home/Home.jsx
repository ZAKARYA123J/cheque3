import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid } from '@mui/material';
import {motion} from 'framer-motion';
import img from './ezrzr.png'
import CheckIcon from '@mui/icons-material/Check';
import './home.scss'

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: '2rem',
    backgroundColor: '#1E90FF', // Add this line to set background color to blue
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: '2rem',
  },
};

const Home = () => {
  return (
    <div style={styles.root}>
      <AppBar position="static"></AppBar>
      <Container style={styles.container}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom style={{color:'white'}}>Optimisez Vos Transactions Financières</Typography>
            <br/>
            <Typography variant="body1" style={{color:'white',width:'80%'}} paragraph>
            Cette application vous aide à gérer vos chèques de manière efficace. Vous pouvez suivre les chèques émis et reçus, et effectuer diverses opérations liées à la gestion des chèques.
            </Typography>
            {/* You can add more components and content here */}
          </Grid>
          <Grid item xs={12} sm={6}>
          <motion.div
              initial={{ opacity: 0, scale: 0.5 }} // Initial animation properties
              animate={{ opacity: 1, scale: 1 }} // Animation properties to animate to
              transition={{ duration: 1 }} // Transition duration
            >
              <img src={img} alt="Cheque Image" style={{ width: '100%', borderRadius: '8px' }} />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
