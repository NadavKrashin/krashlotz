import { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { MdTextSnippet, MdImage, MdImageNotSupported } from "react-icons/md";
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
  personData: { start_of_letter, letter, img },
}) => {
  const [isImgShown, setIsImgShown] = useState(false);
  console.log(img);
  const amountOfWordsInLetter = letter.split(" ").length;
  console.log(amountOfWordsInLetter);
  console.log(chooseFontSizeClass(amountOfWordsInLetter));
  return (
    <div className="back">
      <img
        src={require(`../assets/images/${img}`)}
        alt="with person"
        id="photo"
        className={isImgShown ? "fly-in" : ""}
      />
      <section id="letter">
        <h1
          className={chooseFontSizeClass(amountOfWordsInLetter)}
          id="letter-title"
        >
          {start_of_letter}
        </h1>
        <p
          className={chooseFontSizeClass(amountOfWordsInLetter)}
          id="letter-content"
        >
          {letter}
        </p>
      </section>
      <footer id="back-footer">
        <FaArrowCircleLeft
          style={{
            transform: "rotateY(180deg)",
          }}
          className="pressable back-icon"
          onClick={() => setIsCardFliped(false)}
        />
        {isImgShown ? (
          <MdImageNotSupported
            className="pressable back-icon"
            onClick={() => setIsImgShown(false)}
          />
        ) : (
          <MdImage
            className="pressable back-icon"
            onClick={() => setIsImgShown(true)}
          />
        )}
      </footer>
    </div>
  );
};

export default Back;
