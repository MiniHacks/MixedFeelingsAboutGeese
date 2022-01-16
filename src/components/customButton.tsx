import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/custom.css";

const CustomButton = ({ text, onClick, disabled }) => {
  return (
    <div>
      <Button
        variant="light"
        size="lg"
        className="custom"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
    </div>
  );
};

export default CustomButton;
