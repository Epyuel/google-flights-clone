import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AirlineSeatLegroomReducedIcon from '@mui/icons-material/AirlineSeatLegroomReduced';
import UsbIcon from '@mui/icons-material/Usb';
import PublicIcon from '@mui/icons-material/Public';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useState } from 'react';

dayjs.extend(weekday);
dayjs.extend(localizedFormat);

export interface Flight {
    airlineLogo: string;
    airlineName: string;
    departureTime: string;   
    arrivalTime: string;       
    durationInMinutes: number;
    originId: string;
    destinationId: string;
    origin: string;
    destination: string;
    originCity: string;
    destinationCity: string;
    stops: string;        
    price: string;            
}

const FlightAccordion = ({flight,tripType}:{flight:Flight,tripType:string}) => {
  const departureTime = dayjs(flight.departureTime).format('hh:mm A');  
  const arrivalTime = dayjs(flight.arrivalTime).format('hh:mm A');  
  const [isOpen,setIsOpen] = useState(false);
  return (
    <Accordion 
      onChange={(_,expanded)=>setIsOpen(expanded)}
      sx={{
        boxShadow: 'none',
        border: '1px solid #E2E8F0',
        borderRadius: '12px !important',
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: 0,
        },
        backgroundColor: '#FFFFFF',
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon sx={{ 
            color: '#9b87f5',
            transform: 'scale(1.2)',
            transition: 'transform 0.3s ease-in-out',
            '.Mui-expanded &': {
              transform: 'rotate(180deg) scale(1.2)',
            }
          }} />
        }
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          '&.Mui-expanded': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottom: '1px solid #E2E8F0',
          },
          minHeight: '104px',
          '& .MuiAccordionSummary-content': {
            margin: '12px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src={flight.airlineLogo} alt="KLM" style={{ width: '32px', height: '32px' }} />
          <Box>
            <Typography 
              sx={{ 
                fontWeight: 500,
                fontSize: '16px',
                color: '#1A1F2C',
                fontFamily: '"Inter", sans-serif'
              }}
            >
              { !isOpen ? `${departureTime} - ${arrivalTime}`: `Return · ${dayjs(flight.arrivalTime).format('ddd, MMM D')}`}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ color: '#1A1F2C' }}>{}</Typography>
        <Box sx={{ textAlign: 'left' }}>
            <Typography sx={{ color: '#1A1F2C' }}>{formatDuration(flight.durationInMinutes)}</Typography>
            <Typography sx={{ fontSize: '14px', color: '#8E9196' }}>{flight.originId} - {flight.destinationId}</Typography>
          </Box>
        <Typography sx={{ color: '#1A1F2C' }}>{flight.stops}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,marginRight:'1rem' }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontWeight: 500, color: '#1A1F2C' }}>{flight.price}</Typography>
            <Typography sx={{ fontSize: '14px', color: '#8E9196' }}>{tripType}</Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: '16px 24px',
          backgroundColor: '#FFFFFF',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          color: '#8E9196',
          fontSize: '14px',
          lineHeight: '1.5'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{display: 'flex', gap:'0.5rem'}}>
                <div className="flex flex-col items-center space-y-2 mt-1">
                    <div className="w-3 h-3 m-0 rounded-full border border-gray-300"></div>
                    <div className="w-1 h-1 m-0 rounded-full bg-gray-300"></div>
                    <div className="w-1 h-1 m-0 rounded-full bg-gray-300"></div>
                    <div className="w-1 h-1 m-0 rounded-full bg-gray-300"></div>
                    <div className="w-1 h-1 m-0 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 m-0 rounded-full border border-gray-300"></div>
                </div>
                <Box>
                    <Typography sx={{ color: '#1A1F2C', mb: 1 }}>{departureTime} · {flight.origin}</Typography>
                    <Typography sx={{ color: '#8E9196', mb: 1.5 }}>Travel time: {formatDuration(flight.durationInMinutes)}</Typography>
                    <Typography sx={{ color: '#1A1F2C', mb: 2 }}>{arrivalTime}· {flight.destination}</Typography>
                    <Typography sx={{ color: '#8E9196', fontSize:'13px' }}>{flight.originCity} · Economy · Embraer 195 E2 · KL 1011</Typography>
                    <Typography sx={{ color: '#8E9196',fontSize:'13px' }}>Plane and crew by {flight.originCity}</Typography>
                </Box>
            </Box>
            <Box className='!text-sm'>
                <span className='flex gap-2 align-middle'>
                    <AirlineSeatLegroomReducedIcon sx={{fontSize:'17px'}}/>
                    <Typography sx={{ color: '#8E9196', mb: 1, fontSize:'14px' }}>Below average legroom (29 in)</Typography>
                </span>
                <span className='flex gap-2 align-middle'>
                    <UsbIcon sx={{fontSize:'17px'}}/>
                    <Typography sx={{ color: '#8E9196', mb: 1, fontSize:'14px' }}>In-seat USB outlet</Typography>
                </span>
                <span className='flex gap-2 align-middle'>
                    <PublicIcon sx={{fontSize:'17px'}}/>
                    <Typography sx={{ color: '#8E9196', fontSize:'14px' }}>Emissions estimate: 50 kg CO2e</Typography>
                </span>
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FlightAccordion;

function formatDuration(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
  
    if (hrs && mins) return `${hrs} hr ${mins} min`;
    if (hrs) return `${hrs} hr`;
    return `${mins} min`;
}