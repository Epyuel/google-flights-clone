import React, { useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

interface AirportOption {
    id: string;
    name: string;
}

interface AirportSelectorProps {
    label: string;
    airport: string | null;
    setAirport: React.Dispatch<React.SetStateAction<string | null>>;
    setAirportId: React.Dispatch<React.SetStateAction<string>>;
}

const AirportSelector: React.FC<AirportSelectorProps> = ({ label, airport, setAirport, setAirportId }) => {
    const [options, setOptions] = useState<AirportOption[]>([]);
    const [inputValue, setInputValue] = useState("");

    const fetchAirports = useCallback(
        debounce(async (query: string) => {
            try {
                const response = await axios.get(`https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`, {
                    headers: {
                        "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
                        "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
                    },
                });
                setOptions(response.data.data || []);
            } catch (error) {
                console.error("Error fetching airport data:", error);
            }
        }, 300),
        []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 2) fetchAirports(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder={label}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={() => {
                    const selectedOption = options.find((opt) => opt.name === inputValue);
                    if (selectedOption) {
                        setAirport(selectedOption.name);
                        setAirportId(selectedOption.id);
                    }
                }}
            />
        </div>
    );
};

export default AirportSelector;
