import React from "react";
import { useParams } from "react-router-dom";

const Piklotz = () => {
  const { person } = useParams();

  return <div className="Piklotz">hello {person}</div>;
};

export default Piklotz;
