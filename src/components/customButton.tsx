import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/custom.css';

const CustomButton = () => {
    return (
        <div>
            <Button variant="light" size="lg" className="custom">
                find out now
            </Button>
        </div>
    );
};

export default CustomButton;