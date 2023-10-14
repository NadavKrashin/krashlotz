import React, { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import CryptoJS from "crypto-js";
import { useLocalStorage } from "usehooks-ts";
import letters from "../letters.json";
import Front from "./Front";
import Back from "./Back";

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

  // const encrypted = CryptoJS.AES.encrypt("נדב", "secret key").toString();

  const decryptLetter = useCallback((encryptedLetter) => {
    const decryptedLetterBytes = CryptoJS.AES.decrypt(
      encryptedLetter,
      "secret key"
    );

    return decryptedLetterBytes.toString(CryptoJS.enc.Utf8);
  }, []);

  const personData = useMemo(() => {
    const data = letters[person];

    return { ...data, letter: decryptLetter(data.letter) };
  }, [person, decryptLetter]);

  const phonePress = () => {
    setIsPhonePressed(true);
  };

  const logoPress = () => {
    setIsLogoPressed(true);
    setIsCardFliped(true);
  };

  return (
    <div className={`container ${isCardFliped ? "flip" : ""}`}>
      <div className="card">
        <Front
          isLogoPressed={isLogoPressed}
          isPhonePressed={isPhonePressed}
          logoPress={logoPress}
          phonePress={phonePress}
        />
        <Back setIsCardFliped={setIsCardFliped} personData={personData} />
      </div>
    </div>
  );
};

export default Piklotz;
