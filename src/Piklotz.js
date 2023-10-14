import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import CryptoJS from "crypto-js";
import { useLocalStorage } from "usehooks-ts";
import letters from "./letters.json";

const Piklotz = () => {
  const { person } = useParams();
  const [isCardFliped, setIsCardFliped] = useState(false);
  const [isPhonePressed, setIsPhonePressed] = useLocalStorage(
    "isPhonePressed",
    false
  );
  const [isLogoPressed, setIsLogoPressed] = useLocalStorage(
    "isLogoPressed",
    false
  );

  // Add useEffect from here
  const encrypted = CryptoJS.AES.encrypt(`נסיון`, "secret key").toString();
  // const encrypted = letters[person].letter;

  const decryptedBytes = CryptoJS.AES.decrypt(encrypted, "secret key");
  const decryptedLetter = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const startOfLetter = letters[person].start_of_letter;

  const amountOfWordsInLetter = decryptedLetter.split(" ").length;
  const phonePress = () => {
    setIsPhonePressed(true);
  };

  const logoPress = () => {
    setIsLogoPressed(true);
    setIsCardFliped(true);
  };

  console.log(amountOfWordsInLetter);
  const chooseFontSizeClass = (amountOfWords) => {
    let fontSize;

    switch (true) {
      case amountOfWords <= 90:
        fontSize = "xl";
        break;
      case amountOfWords < 120:
        fontSize = "lg";
        break;
      case amountOfWords < 150:
        fontSize = "md";
        break;
      case amountOfWords < 200:
        fontSize = "sm";
        break;
      default:
        fontSize = "xs";
        break;
    }

    return `text-${fontSize}`;
  };

  console.log(chooseFontSizeClass(amountOfWordsInLetter));

  return (
    <div className={`container ${isCardFliped ? "flip" : ""}`}>
      <div className="card">
        <div className="front">
          {!isLogoPressed && (
            <img
              alt="logo press"
              className="press"
              style={{ transform: "rotateZ(130deg)", left: 40, top: 60 }}
              src={require("./assets/press-button.png")}
            />
          )}
          {!isPhonePressed && (
            <img
              alt="phone press"
              className="press"
              style={{ transform: "rotateZ(-50deg)", right: 15, bottom: 50 }}
              src={require("./assets/press-button.png")}
            />
          )}
          <div id="logo" onClick={logoPress}></div>
          <a id="phone" href="tel:+972 546232883" onClick={phonePress}>
            ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎{" "}
          </a>
        </div>
        <div className="back" onClick={() => setIsCardFliped(false)}>
          <section id="letter">
            <h1
              className={chooseFontSizeClass(amountOfWordsInLetter)}
              id="letter-title"
            >
              {startOfLetter}
            </h1>
            <p
              className={chooseFontSizeClass(amountOfWordsInLetter)}
              id="letter-content"
            >
              {decryptedLetter}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Piklotz;
