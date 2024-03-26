import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { BsBank } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { BiDockTop } from "react-icons/bi";
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className='sidebar'style={{maxWidth:'20%'}}>
        <div className='top'>
          <span className='logo'>OWR CONNECT</span>
        </div>
        <hr />
        <div className='center'>
          <ul>
            <p className="title">MAIN MENU</p>
            <li>
              <Link to={'/'} style={{textDecoration:'none'}}>
              <DashboardIcon className='icon' />
              <span>Home</span>
              </Link>
            </li>
            <p className="title">LISTS MENU</p>
            <li>
              <Link to={'banque'}  style={{textDecoration:'none'}}>
              <BsBank className='icon' />
              <span>Bnaques</span>
              </Link>
            </li>
            <li>
              <Link to={'compte'} style={{textDecoration:'none'}}>
              <MdAccountCircle className='icon' />
              <span>Comptes</span>
              </Link>
            </li>
            <li>
              <Link to={'carnet'}  style={{textDecoration:'none'}}>
              <BiDockTop className='icon' />
              <span>carnets</span>
              </Link>
            </li>
            <p className="title">OTHER MENU</p>
            <li>
              <QueryStatsIcon className='icon' />
              <span>Suivi chéques/effects émis</span>
            </li>
          
           
            <li>
              <SettingsIcon className='icon' />
              <span>Settings</span>
            </li>
           
          </ul>
        </div>
        <div className='bottom'>
          <div className='colorOptions'></div>
          <div className='colorOptions'></div>
        </div>
    </div>
  )
}

export default Sidebar