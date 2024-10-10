import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../CSS/Header.css'

function Header() {

  const [headerHiddenState, setHeaderHiddenState] = useState(false);

  if (document.location.href.indexOf("/pixelblocks") > 0 && headerHiddenState === false) {
    setHeaderHiddenState(true);
  }

  return (
    <div className={`header header-${headerHiddenState ? 'hide' : 'show'}`} >
        <ul className='nav'>
            <li className='nav-button'>
                <Link to="/" className='nav-link'>pixelblocks</Link>
            </li>
            <li className='nav-button'>
                <Link to="/link" className='nav-link'>link</Link>
            </li>
            <li className='nav-button'>
                <Link to="/link" className='nav-link'>link</Link>
            </li>
            <li className='nav-button'>
                <Link to="/pixelblocks" className='nav-link' onClick={() => {
                    if(headerHiddenState === false) {
                        setHeaderHiddenState(true)
                    }
                }}>piay</Link>
            </li>
        </ul>
    </div>
  )
}

export default Header