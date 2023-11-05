import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";

const Front = ({ isLogoPressed, isPhonePressed, logoPress, phonePress }) => {
  return (
    <div className="front">
      {!isLogoPressed && (
        <FaHandPointRight
          className="press"
          style={{ transform: "rotateZ(30deg)", left: 32, top: 60 }}
        />
      )}
      {!isPhonePressed && (
        <FaHandPointLeft
          className="press"
          style={{ transform: "rotateZ(30deg)", right: 10, bottom: 48 }}
        />
      )}
      <div id="logo" className="pressable" onClick={logoPress}></div>
      <a id="phone" href="tel:+972 546232883" onClick={phonePress}>
        ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎{" "}
      </a>
    </div>
  );
};

export default Front;
