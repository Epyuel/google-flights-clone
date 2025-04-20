import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";

interface PassengerSelectorProps {
    passenger: number;
    setPassenger: React.Dispatch<React.SetStateAction<number>>;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ passenger, setPassenger }) => {
    return (
        <div className="pt-6 md:pt-0 md:pl-6">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 24 }}>
                <InputLabel id="demo-simple-select-standard-label">
                    <PersonOutline />{" "}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={passenger}
                    onChange={(e) => setPassenger(Number(e.target.value))}
                    label="Passenger"
                >
                    <MenuItem value={1}>
                        1
                    </MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    {/* <MenuItem value={3}>4</MenuItem> */}
                </Select>
            </FormControl>
        </div>
    );
};

export default PassengerSelector;
