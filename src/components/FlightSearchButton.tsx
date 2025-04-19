import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface FlightSearchButtonProps {
    onClick: () => void;
    isLoading: boolean;
}

const FlightSearchButton: React.FC<FlightSearchButtonProps> = ({ onClick, isLoading }) => {
    return (
        <Button onClick={onClick} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Search Flights"}
        </Button>
    );
};

export default FlightSearchButton;
