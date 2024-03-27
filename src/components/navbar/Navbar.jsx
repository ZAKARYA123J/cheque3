import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='navbar' style={{  height: '60px'}}>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='Search...' />
          <SearchIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageIcon className='icon' />
            Francais
          </div>
          <div className="item">
            <Brightness4Icon className='icon' />
          </div>
          <div className="item">
            <NotificationsActiveIcon className='icon' />
            <div className='counter'>1</div>
          </div>
          <div className="item">
            <MessageIcon className='icon' />
            <div className='counter'>2</div>
          </div>
          <div className="item">
            <img src='https://www.iriset.in/tms/uploads/profile/profile.png' alt="user" className='avatar' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar