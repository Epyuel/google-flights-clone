import { useState, useEffect, useCallback } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

import { Search } from "@mui/icons-material";
import axios from "axios";
import { Dayjs } from "dayjs";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import debounce from 'lodash.debounce';
import TripTypeSelector from "./customForm/TripTypeSelector";
import PassengerSelector from "./customForm/PassengerSelector";
import TripOptions from "./customForm/TripOptions";
import Origin from "./origin";
import FlightsGrid from "./FlightsResults";
import { Flight } from "./FlightAccordion";
export interface AirportOption {
  id: string;
  name: string;
  iataCode: string;
  skyId: string;
}

export default function SearchBar() {
  const [trip, setTrip] = useState<string>("round trip");
  const [passenger, setPassenger] = useState<number>(1);
  const [type, setType] = useState<string>("economy");

  const [departure, setDeparture] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

  const [origin, setOrigin] = useState<string | null>(null);
  const [originInputValue, setOriginInputValue] = useState<string>("");
  const [destinationInputValue, setDestinationInputValue] = useState<string>("");
  const [destination, setDestination] = useState<string | null>(null);

  const [flights, setFlights] = useState<Flight[]>([]);

  const [originId, setOriginId] = useState<string>("");
  const [destinationId, setDestinationId] = useState<string>("");
  const [originOptions, setOriginOptions] = useState<AirportOption[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<AirportOption[]>([]);

  const [originSkyId, setOriginSkyId] = useState<string>("");
  const [destinationSkyId, setDestinationSkyId] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  const handleFlightType = (event: SelectChangeEvent) => {
    console.log(event.target.value)
    setType(event.target.value);
  };

  // Shared function to fetch airports based on input value
  // Memoize the fetchAirports function
  const fetchAirports = useCallback(async (query: string) => {
    try {
      const response = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`,
        {
          headers: {
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
            "X-RapidAPI-Key": import.meta.env.VITE_FLIGHTS_API,
          },
        }
      );
      return response.data.data || []; // Return empty array if no data
    } catch (error) {
      console.error("Error fetching airport data:", error);
      setSnackbarMessage("Error fetching airport data.");
      setSnackbarOpen(true);
      return [];
    }
  }, []);


  const fetchOriginOptions = useCallback(
    debounce(async (query: string) => {
      const options = await fetchAirports(query);
      setOriginOptions(options);
    }, 300), // Debounce delay of 300ms
    [fetchAirports]
  );


  const fetchDestinationOptions = useCallback(
    debounce(async (query: string) => {
      const options = await fetchAirports(query);
      setDestinationOptions(options);
    }, 300),
    [fetchAirports]
  );

  useEffect(() => {
    if (originInputValue.length > 0) {
      fetchOriginOptions(originInputValue);
    }
    if (originInputValue.length === 0) {
      setOriginOptions([])
    }
  }, [originInputValue, fetchOriginOptions]);

  useEffect(() => {
    if (destinationInputValue.length > 0) {
      fetchDestinationOptions(destinationInputValue);
    }
  }, [destinationInputValue, fetchDestinationOptions]);

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
      params: {
        originSkyId: originSkyId,
        destinationSkyId: destinationSkyId,
        originEntityId: originId,
        destinationEntityId: destinationId,
        date: departure ? departure.format("YYYY-MM-DD") : "",
        returnDate: returnDate ? returnDate.format("YYYY-MM-DD"):"",
        cabinClass: type.toLowerCase(),
        adults: `${passenger}`,
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US'
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_FLIGHTS_API,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    };
    
    setIsLoading(true)
    try {
      const response = await axios.request(options);
      setFlights((response?.data?.data?.itineraries?.slice(0,50)??[]).map(transformFlightData))
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      {/* Search form */}

      <div className="container mx-auto flex justify-center items-center p-2 md:p-0">
        <div className="border border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-row md:flex-row">
            <TripTypeSelector value={trip} onChange={setTrip} />
            <PassengerSelector passenger={passenger} setPassenger={setPassenger} />
            <TripOptions type={type} handleFlightType={handleFlightType} />
          </div>
          <Origin
            origin={origin}
            originInputValue={originInputValue}
            destination={destination}
            destinationInputValue={destinationInputValue}
            departure={departure}
            returnDate={returnDate}
            originOptions={originOptions}
            destinationOptions={destinationOptions}
            setOrigin={setOrigin}
            setOriginInputValue={setOriginInputValue}
            setDestination={setDestination}
            setDestinationInputValue={setDestinationInputValue}
            setDeparture={setDeparture}
            setReturnDate={setReturnDate}
            setOriginId={setOriginId}
            setDestinationId={setDestinationId}
            setOriginSkyId={setOriginSkyId}
            setDestinationSkyId={setDestinationSkyId}
          />
        </div>
      </div>
      <div className="flex justify-center mt-[-20px]">
        <button
          onClick={handleSearch}
          className="flex justify-items-center px-3 gap-2 p-2 border w-28 rounded-full bg-blue-500 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} color="inherit" />
              <p className="my-auto">{"Search"}</p>
            </>
          ) : (
            <>
              <Search />
              <p className="my-auto">{"Search"}</p>
            </>
          )}
        </button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>

      {/* Search results */}
      <FlightsGrid flightsData={flights} tripType={trip} />
    </>
  );
}

function transformFlightData(raw: any): any {
  const leg = raw.legs?.at(0) || {};
  return {
    airlineLogo: leg?.carriers?.marketing?.at(0)?.logoUrl || "",
    airlineName: leg?.carriers?.marketing?.at(0)?.name || "",
    originId: leg?.origin?.id || "",
    destinationId: leg?.destination?.id || "",

    departureTime: leg?.departure || "",
    arrivalTime: leg?.arrival || "",
    durationInMinutes: leg?.durationInMinutes || "",
    origin: leg?.origin?.name || "",
    destination: leg?.destination?.name || "",
    originCity: leg?.origin?.city??"",
    destinationCity: leg?.destination?.city??"",
    stops: leg?.stopCount
      ? `${leg?.stopCount} stop${leg?.stopCount > 1 ? "s" : ""}`
      : "Nonstop",
    
    price: raw?.price?.formatted || "$0",
  };
}
