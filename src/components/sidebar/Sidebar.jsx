import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BsBankIcon from '@mui/icons-material/Business';
import MdAccountCircleIcon from '@mui/icons-material/AccountCircle';
import BiDockTopIcon from '@mui/icons-material/Dock';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        width: '100%',
        backgroundColor: '#f0f0f0',
        color: '#333',
        '@media (min-width: 960px)': {
          width: '15%',
        },
      }}
    >
      <Grid item>
        <div className='top'>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold',color:'#6495ed',marginLeft:'4px' }}>OWR CONNECT</span>
        </div>
        <hr />
      </Grid>
      <Grid item>
        <div className='center'>
          <ul style={{ padding: 0 }}>
            <p className="title" style={{ fontWeight: 'bold', margin: '1rem', textAlign: 'center' }}>MAIN MENU</p>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ listStyle: 'none', margin: '0.5rem 0' }}
            >
              <Link to={'/'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ marginRight: '0.5rem' }}>
                  <DashboardIcon />
                </motion.div>
                Home
              </Link>
            </motion.li>
            <p className="title" style={{ fontWeight: 'bold', margin: '1rem', textAlign: 'center' }}>LISTS MENU</p>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ listStyle: 'none', margin: '0.5rem 0' }}
            >
              <Link to={'banque'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ marginRight: '0.5rem' }}>
                  <BsBankIcon />
                </motion.div>
                Banques
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ listStyle: 'none', margin: '0.5rem 0' }}
            >
              <Link to={'compte'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ marginRight: '0.5rem' }}>
                  <MdAccountCircleIcon />
                </motion.div>
                Comptes
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ listStyle: 'none', margin: '0.5rem 0' }}
            >
              <Link to={'carnet'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ marginRight: '0.5rem' }}>
                  <BiDockTopIcon />
                </motion.div>
                Carnets
              </Link>
            </motion.li>
            <p className="title" style={{ fontWeight: 'bold', margin: '1rem', textAlign: 'center' }}>OTHER MENU</p>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ listStyle: 'none', margin: '0.5rem 0', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ marginRight: '0.5rem' }}>
                <QueryStatsIcon />
              </motion.div>
              <Link to={'cheque'} style={{ textDecoration: 'none' }}>
                Suivi chéques/effects émis
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ listStyle: 'none', margin: '0.5rem 0', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ marginRight: '0.5rem' }}>
                <SettingsIcon />
              </motion.div>
              Settings
            </motion.li>
          </ul>
        </div>
      </Grid>
      <Grid item>
        <div className='bottom'>
          <div className='colorOptions'></div>
          <div className='colorOptions'></div>
        </div>
      </Grid>
    </Grid>
  )
}

export default Sidebar;
