import coinIcon from '../../img/orb.gif';
import fight from '../../img/fight.png';
import './main.css';

function Play() {
  return (
    <>
      <div className="new-contract">
        <div className="new-contract-box section-tab yellow-border">
          <div className="section-title title-style-two text-center">
            <span>Byte Builders Labs</span>
            <h2>Tamaguchi <span>BabyBeast</span></h2>
          </div>
          <div className='d-flex align-items-center mt-4 mb-2'>
            <div className='col-9 mb-3 text-left'>
              <p className={'title'}>
                You play, feed, sleep and more
                <span> Look at It, otherwise It'll die</span>
              </p>
            </div>
            <div className='col-3 d-flex justify-content-end'>
              <img className="section-tab-pet" src={coinIcon} alt="" />
            </div>
          </div>
          <div className="new yellow-border">
            <img src={fight} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Play;
