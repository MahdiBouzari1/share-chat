import React from "react";
import "./Sidebaroption.css";

function Sidebaroption({ active, text, Icon, onClick }) {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`} onClick={onClick}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default Sidebaroption;
