import React, { useCallback } from "react";

import "../CSS/GameLogin.css";
import { Link } from "react-router-dom";

function GameLogin({ setGamePage }) {
  const handleLoginClick = useCallback(() => {
      setGamePage("worldselector");
    },
    [setGamePage]
  );

  const handleGuestClick = useCallback(() => {
      setGamePage("worldselector");
    },
    [setGamePage]
  );

  return (
    <div className="backdrop">

    <Link to='/' className="quit-button">X</Link>

      <div className="game-login">
        <form className="login-form">
          <span className="login-textbox">
            <label htmlFor="username-input" className="login-label">
              username
            </label>
            <input
              type="text"
              id="username-input"
              className="login-text-input"
            ></input>
          </span>
          <span className="login-textbox">
            <label htmlFor="password-input" className="login-label">
              password
            </label>
            <input
              type="text"
              id="password-input"
              className="login-text-input"
            ></input>
          </span>

          <h2
            type="button"
            className="login-button"
            onClick={() => handleLoginClick()}
          >
            login
          </h2>
        </form>

        <hr></hr>

        <h3 className="guest-login-button" onClick={() => handleGuestClick()}>
          play as guest
        </h3>
      </div>
    </div>
  );
}

export default GameLogin;
