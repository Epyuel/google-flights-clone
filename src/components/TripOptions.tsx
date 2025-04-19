import React from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

interface TripOptionsProps {
    type: string;
    handleFlightType: (event: SelectChangeEvent) => void

}

const TripOptions: React.FC<TripOptionsProps> = ({ type, handleFlightType }) => {
    return (
        <div className="pt-6 md:pt-0 md:pl-6">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">
                    Economy
                </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={type}
                    onChange={handleFlightType}
                    label="Age"
                >
                    <MenuItem value="economy">
                        <em>Economy</em>
                    </MenuItem>
                    <MenuItem value={"premium_economy"}>Premium Economy</MenuItem>
                    <MenuItem value={"business"}>Business</MenuItem>
                    <MenuItem value={"first"}>First</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default TripOptions;
