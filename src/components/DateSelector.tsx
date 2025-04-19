import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

interface DatePickersProps {
    departure: Dayjs | null;
    setDeparture: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    returnDate: Dayjs | null;
    setReturnDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

const DatePickers: React.FC<DatePickersProps> = ({ departure, setDeparture, returnDate, setReturnDate }) => {
    return (
        <div>
            <DatePicker label="Departure Date" value={departure} onChange={setDeparture} />
            <DatePicker label="Return Date" value={returnDate} onChange={setReturnDate} />
        </div>
    );
};

export default DatePickers;
