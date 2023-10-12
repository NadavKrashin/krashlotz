import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import CryptoJS from "crypto-js";
import { useLocalStorage } from "usehooks-ts";

const Piklotz = () => {
  const { person } = useParams();
  const encrypted = CryptoJS.AES.encrypt(
    "איזה אלופה את אין עלייך בעולם הזה",
    "secret key"
  ).toString();

  console.log(encrypted);
  const decryptedBytes = CryptoJS.AES.decrypt(encrypted, "secret key");
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

  console.log(decryptedText);

  console.log(person);
  const [isCardFliped, setIsCardFliped] = useState(false);
  const [isPhonePressed, setIsPhonePressed] = useLocalStorage(
    "isPhonePressed",
    false
  );
  const [isLogoPressed, setIsLogoPressed] = useLocalStorage(
    "isLogoPressed",
    false
  );
  // const [isPhonePressed, setIsPhonePressed] = useState(
  //   !!localStorage.getItem("isPhonePressed")
  // );
  // const [isLogoPressed, setIsLogoPressed] = useState(
  //   !!localStorage.getItem("isLogoPressed")
  // );

  const phonePress = () => {
    setIsPhonePressed(true);
    // setI
    // localStorage.setItem("isPhonePressed", true);
  };

  const logoPress = () => {
    setIsLogoPressed(true);
    // localStorage.setItem("isLogoPressed", true);
    setIsCardFliped(true);
  };

  //check how to style, how to click a transpart button, and how to add class on click
  return (
    <div className={`container ${isCardFliped ? "flip" : ""}`}>
      <div className="card">
        <div className="front">
          {!isLogoPressed && (
            <img
              alt="logo press"
              className="press"
              style={{ transform: "rotateZ(140deg)", left: 45, top: 20 }}
              src={require("./assets/press-button.png")}
            />
          )}
          {!isPhonePressed && (
            <img
              alt="phone press"
              className="press"
              style={{ transform: "rotateZ(-70deg)", right: -12, bottom: 10 }}
              src={require("./assets/press-button.png")}
            />
          )}
          <div id="logo" onClick={logoPress}></div>
          <a id="phone" href="tel:+972 546232883" onClick={phonePress}>
            ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎{" "}
          </a>
        </div>
        <div className="back" onClick={() => setIsCardFliped(false)}>
          <h1>Back of card</h1>
          <p>Additional info</p>
        </div>
      </div>
    </div>
  );
};

export default Piklotz;
