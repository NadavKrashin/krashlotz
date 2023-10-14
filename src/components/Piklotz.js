import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import CryptoJS from "crypto-js";
import { useLocalStorage } from "usehooks-ts";
import letters from "../letters.json";
import Front from "./Front";
import Back from "./Back";

const Piklotz = () => {
  const { person } = useParams();
  const [isCardFliped, setIsCardFliped] = useState(true);
  const [isPhonePressed, setIsPhonePressed] = useLocalStorage(
    "isPhonePressed",
    false
  );
  const [isLogoPressed, setIsLogoPressed] = useLocalStorage(
    "isLogoPressed",
    false
  );

  // const encrypted = CryptoJS.AES.encrypt(`נסיון`, "secret key").toString();
  const encrypted = letters[person].letter;

  const decryptedBytes = CryptoJS.AES.decrypt(encrypted, "secret key");
  const letterContent = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const letterTitle = letters[person].start_of_letter;
  const amountOfWordsInLetter = letterContent.split(" ").length;

  const phonePress = () => {
    setIsPhonePressed(true);
  };

  const logoPress = () => {
    setIsLogoPressed(true);
    setIsCardFliped(true);
  };

  console.log(amountOfWordsInLetter);

  return (
    <div className={`container ${isCardFliped ? "flip" : ""}`}>
      <div className="card">
        <Front
          isLogoPressed={isLogoPressed}
          isPhonePressed={isPhonePressed}
          logoPress={logoPress}
          phonePress={phonePress}
        />
        <Back
          setIsCardFliped={setIsCardFliped}
          amountOfWordsInLetter={amountOfWordsInLetter}
          letterTitle={letterTitle}
          letterContent={letterContent}
        />
      </div>
    </div>
  );
};

export default Piklotz;
