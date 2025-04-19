import { Autocomplete, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import { Dayjs } from 'dayjs';

interface OriginProps {
    origin: string | null;
    originInputValue: string;
    destination: string | null;
    destinationInputValue: string;
    departure: Dayjs | null;
    returnDate: Dayjs | null;
    originOptions: Array<any>;
    destinationOptions: Array<any>;
    setOrigin: (value: any | null) => void;
    setOriginInputValue: (value: string) => void;
    setDestination: (value: any | null) => void;
    setDestinationInputValue: (value: string) => void;
    setDeparture: (value: Dayjs | null) => void;
    setReturnDate: (value: Dayjs | null) => void;
    setOriginId: (id: string) => void;
    setDestinationId: (id: string) => void;
    setOriginSkyId: (skyId: string) => void;
    setDestinationSkyId: (skyId: string) => void;
}

const Origin: React.FC<OriginProps> = ({
    origin,
    originInputValue,
    destination,
    destinationInputValue,
    departure,
    returnDate,
    originOptions,
    destinationOptions,
    setOrigin,
    setOriginInputValue,
    setDestination,
    setDestinationInputValue,
    setDeparture,
    setReturnDate,
    setOriginId,
    setDestinationId,
    setOriginSkyId,
    setDestinationSkyId,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-2 border border-gray-200 p-2 rounded">
                {/* Origin Autocomplete */}
                <div className="flex rounded bg-none items-center p-2 ">
                    <Autocomplete
                        id="origin-autocomplete"
                        value={origin}
                        inputValue={originInputValue}
                        onInputChange={(_event, newInputValue) => setOriginInputValue(newInputValue)}
                        sx={{ width: 200 }}
                        options={originOptions}
                        getOptionLabel={(option: any) => option?.presentation?.suggestionTitle || ""}
                        onChange={(_event, value: any | null) => {
                            setOrigin(value);
                            setOriginId(value?.entityId || "");
                            setOriginSkyId(value?.skyId);
                        }}
                        renderInput={(params) => <TextField {...params} label="Where from?" />}
                    />
                </div>

                {/* Destination Autocomplete */}
                <div className="flex rounded bg-none items-center p-2 ">
                    <Autocomplete
                        id="destination-autocomplete"
                        value={destination}
                        inputValue={destinationInputValue}
                        onInputChange={(_event, newInputValue) => setDestinationInputValue(newInputValue)}
                        sx={{ width: 200 }}
                        options={destinationOptions}
                        getOptionLabel={(option: any) => option?.presentation?.suggestionTitle || ""}
                        onChange={(_event, value: any | null) => {
                            setDestination(value);
                            setDestinationId(value?.entityId || "");
                            setDestinationSkyId(value?.skyId);
                        }}
                        renderInput={(params) => <TextField {...params} label="Where to?" />}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border border-gray-200 p-2 rounded">
                {/* Departure Date Picker */}
                <div className="flex rounded bg-none items-center p-2 ">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Departure"
                            value={departure}
                            onChange={(newValue) => setDeparture(newValue)}
                        />
                    </LocalizationProvider>
                </div>

                {/* Return Date Picker */}
                <div className="flex rounded bg-none items-center p-2 ">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Return"
                            value={returnDate}
                            onChange={(newValue) => setReturnDate(newValue)}
                        />
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    );
};

export default Origin;
