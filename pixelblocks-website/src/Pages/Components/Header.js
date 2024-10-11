import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../CSS/Desktop/Header.css";
import Button from "../PIXELBLOCKS-GUI/Components/Button";

export default function Header() {

  const [headerHiddenState, setHeaderHiddenState] = useState(false);

  return (
      headerHiddenState === false ? <div className="header">
        <nav className="nav">
            <Link to='/'>
                <Button text={'pixelblocks'} />
            </Link>

            <Link to='/link'>
                <Button text={'link'} type={'link'} />
            </Link>


            <Link to='/play'>
                <Button text={'play'} />
            </Link>
        </nav>
      </div> : ""
  );
}