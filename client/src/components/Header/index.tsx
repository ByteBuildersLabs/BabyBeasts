import ControllerConnectButton from '../../ControllerConnectButton';
import monster from '../../img/logo.jpg';

import './main.css';

function Header() {

  return (
    <>
      <nav className="navbar">
        <div className='container'>
          <div className="logo d-flex align-items-center mb-2">
            <a href="/"><img src={monster} height="70" alt="Logo" /></a>
            <h2>BYTE <span>BEASTS</span></h2>
          </div>
          <ControllerConnectButton />
        </div>
      </nav>
    </>
  )
}

export default Header;
