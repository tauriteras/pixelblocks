import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../BACKEND/Firebase";

import '../CSS/Desktop/GameLogin.css'

import Button from "./Components/Button.js";

function GameLogin({ setGamePage }) {
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [credentialsErrorMessage, setCredentialsErrorMessage] = useState("");

  const handleLoginClick = () => {
    if (
      document.querySelector("#email-input") !== null &&
      document.querySelector("#password-input") !== null
    ) {
      signInWithEmailAndPassword(
        auth,
        document.querySelector("#email-input").value,
        document.querySelector("#password-input").value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log("LOGIN SUCCESS", user);
          setShowCredentialsError(false);
          setGamePage("worldselector");
        })
        .catch((error) => {
          const errorCode = error.code;
          // console.log("LOGIN ERROR", errorCode);
          if (
            errorCode === "auth/invalid-email" ||
            errorCode === "auth/incorrect-credential"
          ) {
            setCredentialsErrorMessage("incorrect email or password");
            setShowCredentialsError(true);
          }
        });
    } else {
      setCredentialsErrorMessage("no email or password");
      setShowCredentialsError(true);
    }
  };

  const handleGuestClick = useCallback(() => {
    setGamePage("worldselector");
  }, [setGamePage]);

  return (
    <div className="backdrop">
      <div className="game-login">
        <Link to='/' >
        <Button
        type={'quit'}
        color={'red'}
        text={'x'} />
        </Link>

        <form className="login-form">
          <span className="login-textbox">
            <label htmlFor="email-input" className="login-label">
              email
            </label>
            <input
              type="email"
              id="email-input"
              className="login-text-input"
            ></input>
          </span>
          <span className="login-textbox">
            <label htmlFor="password-input" className="login-label">
              password
            </label>
            <input
              type="password"
              id="password-input"
              className="login-text-input"
            ></input>
          </span>

          <div className="error-container">
            {" "}
            {showCredentialsError ? (
              <p className="error-text">{credentialsErrorMessage}</p>
            ) : (
              ""
            )}
          </div>

          <Button
            text="login"
            textWeight='bold'
            color="orange"
            onClick={() => handleLoginClick()}
          />
        </form>

        <div className="line-div">
          <hr className="line"></hr>
        </div>

        <Button
          text="play as guest"
          onClick={() => handleGuestClick()}
        />
      </div>
    </div>
  );
}

export default GameLogin;
