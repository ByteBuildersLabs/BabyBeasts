import github from '../../img/github-sign.png';
import twitter from '../../img/twitter.png';
import unity from '../../img/unity.png';
import starknet from '../../img/stark.png';
import rolo from '../../img/rol.jpg';
import juan from '../../img/Juan.jpg';
import cox from '../../img/marco.jpeg';
import luis from '../../img/Luis.png';
import daniel from '../../img/daniel.jpeg';

import './main.css';

function Footer() {
  return (
    <>
      <div className='team mt-5 mb-4'>
        <a href='https://github.com/RolandoDrRobot' target='_blank'>
          <img src={rolo} className='footer-team' />
        </a>
        <a href='https://github.com/juandiegocv27' target='_blank'>
          <img src={juan} className='footer-team' />
        </a>
        <a href='https://github.com/coxmars' target='_blank'>
          <img src={cox} className='footer-team' />
        </a>
        <a href='https://github.com/jimenezz22' target='_blank'>
          <img src={luis} className='footer-team' />
        </a>
        <a href='https://github.com/danielcdz' target='_blank'>
          <img src={daniel} className='footer-team' />
        </a>
      </div>
      <div className="footer mb-3">
        <a href='https://github.com/orgs/ByteBuildersLabs/repositories' target='_blank'>
          <img src={github} className='footer-logo' />
        </a>
        <a href='https://x.com/0xByteBeasts' target='_blank'>
          <img src={twitter} className='footer-logo' />
        </a>
        <a href='https://unity.com/' target='_blank'>
          <img src={unity} className='footer-logo' />
        </a>
        <a href='https://www.starknet.io/' target='_blank'>
          <img src={starknet} className='footer-logo' />
        </a>
        <a href='https://www.dojoengine.org/' target='_blank'>
          <img src='https://book.dojoengine.org/dojo-logo.svg' height={18} />
        </a>
      </div>
    </>
  )
}

export default Footer;
