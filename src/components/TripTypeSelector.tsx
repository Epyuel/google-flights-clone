import React from "react";
import { Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from "@mui/material";
import { CompareArrows } from "@mui/icons-material";

interface TripTypeSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

const TripTypeSelector: React.FC<TripTypeSelectorProps> = ({ value, onChange }) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <div className="pt-6 md:pt-0 md:pl-6">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">
                    <CompareArrows /> Round trip{" "}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={handleChange}
                    label="Trip"
                >
                    <MenuItem value="Round trip">
                        <em>Round trip</em>
                    </MenuItem>
                    <MenuItem value={"One way"}>One way</MenuItem>
                    <MenuItem value={"Multi-city"}>Multi-way</MenuItem>
                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
            </FormControl>
        </div>
    );
};

export default TripTypeSelector;
