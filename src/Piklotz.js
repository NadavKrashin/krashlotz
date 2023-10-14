import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import CryptoJS from "crypto-js";
import { useLocalStorage } from "usehooks-ts";
import letters from "./letters.json";

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
  // const encrypted = CryptoJS.AES.encrypt(`הפעם הראשונה ששמעתי עלייך זה כשסוואמפ אמר לי בסגל הקודם שזכיתי לקבל אותך בצוות ושאת אלופה, ודוגרי אני לא מבין אותו היית די בינונית כאילו…
  // סתם סתם תרגמת את האתר יפה…
  // ביקשת לתכנת איתי אז ברור שהייתי חייב להביא אותך למערכת הכי טובה בבסמחח. תבטיחי לי שאת מתכנת לשם מעבר ללהוסיף את השם שלך אוקיי? ואיך אפשר לשכוח את העיצוב המהממם של קראש אין?
  // טוב טוב עכשיו ברצינות אני חולהההה עלייך בטירוף באמת באמת. רציתי ממש שתגיעי לסגל שלנו ואיזה מזל שזה באמת קרה.
  // את שוברת מצחוק ומרימה את האווירה בטירוף, ואת לא מפסיקה ללמוד ולהשתפר כי רואים כמה איכפת לך. רצית לעשות את העיצוב של קראש אין ולקחת את זה באמת ברצינות ולמדת מעצמך וזה רק מוכיח את הטענה שלי. גם אני כשהגעתי לבסמח הייתי לחוצי ומוודא הכל 20 פעם מראש, מנסח דברים שבא לי להגיד בnotes ומקווה לא לפשל, ובגלל זה את מזכירה לי את עצמי בקטע הזה וזה חמוד ברמות. את תראי שסגל הבא וככל שהזמן יעבור הדברים יבואו לך יותר בקלות ואת תיהי מעולה.
  // אני מקנא בסגל שקיבל אותך, ואני אתגעגע להחתים אותך ולהעיף אותך מהכיסא שלי, אבל בטוח שאשמע ממך עוד.`,
  //   "secret key"
  // ).toString();

  // console.log(encrypted);
  const decryptedBytes = CryptoJS.AES.decrypt(
    letters[person].letter,
    "secret key"
  );
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
              class={chooseFontSizeClass(amountOfWordsInLetter)}
              id="letter-title"
            >
              {startOfLetter}
            </h1>
            <p
              class={chooseFontSizeClass(amountOfWordsInLetter)}
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
