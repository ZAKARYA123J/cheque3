import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
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
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>OWR CONNECT</span>
        </div>
        <hr />
      </Grid>
      <Grid item>
        <div className='center'>
          <ul style={{ padding: 0 }}>
            <p className="title" style={{ fontWeight: 'bold', margin: '1rem', textAlign: 'center' }}>MAIN MENU</p>
            <li style={{ listStyle: 'none', margin: '0.5rem 0' }}>
              <Link to={'/'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                <DashboardIcon style={{ marginRight: '0.5rem' }} />
                Home
              </Link>
            </li>
            <p className="title" style={{ fontWeight: 'bold', margin: '1rem', textAlign: 'center' }}>LISTS MENU</p>
            <li style={{ listStyle: 'none', margin: '0.5rem 0' }}>
              <Link to={'banque'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                <BsBankIcon style={{ marginRight: '0.5rem' }} />
                Banques
              </Link>
            </li>
            <li style={{ listStyle: 'none', margin: '0.5rem 0' }}>
              <Link to={'compte'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                <MdAccountCircleIcon style={{ marginRight: '0.5rem' }} />
                Comptes
              </Link>
            </li>
            <li style={{ listStyle: 'none', margin: '0.5rem 0' }}>
              <Link to={'carnet'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                <BiDockTopIcon style={{ marginRight: '0.5rem' }} />
                Carnets
              </Link>
            </li>
            <p className="title" style={{ fontWeight: 'bold', margin: '1rem', textAlign: 'center' }}>OTHER MENU</p>
            <li style={{ listStyle: 'none', margin: '0.5rem 0', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
              <QueryStatsIcon style={{ marginRight: '0.5rem' }} />
              <Link to={'cheque'} style={{ textDecoration: 'none' }}>
                Suivi chéques/effects émis
              </Link>
            </li>
            <li style={{ listStyle: 'none', margin: '0.5rem 0', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
              <SettingsIcon style={{ marginRight: '0.5rem' }} />
              Settings
            </li>
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
