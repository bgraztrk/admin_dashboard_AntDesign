import Typography from 'antd/es/typography/Typography';
import React from 'react'

function Footer() {
  return (
    <footer className='Footer'>
      <div class="waves">
            <div class="wave" id="wave1"></div>
            <div class="wave" id="wave2"></div>
            <div class="wave" id="wave3"></div>
            <div class="wave" id="wave4"></div>
            <div class="wave" id="wave5"></div>
            <div class="wave" id="wave6"></div>
      </div>
      <Typography.Link href='http://wecodeit.com.tr/' style={{color:'white'}}>&copy;KEMAL BUGRA OZTURK | FULL STACK WEB DEVELOPER</Typography.Link>
    </footer>
  )
}

export default Footer;
