/*
attributes of a fire point:
- lattitude
- longitude
- acq_date
- acq_time
- confidence
    - need to set limits for modis to change to l/n/h
- frp
- brightness
    - need to combine the two channels
- day/night
*/

const lowConfidence = 20;
const highConfidence = 80;

type FirePixel = {
    lattitude: number;
    longitude: number;
    acq_date: number;
    acq_time: number;
    confidence: string;
    frp: number;
    brightness: number;
    day_night: string;
};

