import { useState } from "react";
import { FaArrowCircleLeft, FaImage } from "react-icons/fa";
import { MdTextSnippet } from "react-icons/md";
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

const Back = ({
  setIsCardFliped,
  amountOfWordsInLetter,
  letterTitle,
  letterContent,
}) => {
  const [isImgShown, setIsImgShown] = useState(false);

  console.log(chooseFontSizeClass(amountOfWordsInLetter));
  return (
    <div className="back">
      <img
        src={require("../assets/images/gal.jpg")}
        alt="with person"
        id="photo"
        className={isImgShown ? "fly-in" : "fly-out"}
      />
      <section id="letter">
        <h1
          className={chooseFontSizeClass(amountOfWordsInLetter)}
          id="letter-title"
        >
          {letterTitle}
        </h1>
        <p
          className={chooseFontSizeClass(amountOfWordsInLetter)}
          id="letter-content"
        >
          {letterContent}
        </p>
      </section>
      <footer id="back-footer">
        <FaArrowCircleLeft
          style={{
            transform: "rotateY(180deg)",
          }}
          className="pressable back-icon"
          color="fff"
          fontSize={40}
          onClick={() => setIsCardFliped(false)}
        />
        {isImgShown ? (
          <MdTextSnippet
            className="pressable back-icon"
            color="fff"
            fontSize={50}
            onClick={() => setIsImgShown((isImageShown) => !isImageShown)}
          />
        ) : (
          <FaImage
            className="pressable back-icon"
            color="fff"
            fontSize={50}
            onClick={() => setIsImgShown((isImageShown) => !isImageShown)}
          />
        )}
      </footer>
    </div>
  );
};

export default Back;
