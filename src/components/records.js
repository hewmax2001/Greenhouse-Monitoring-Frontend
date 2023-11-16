import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, Card, CardContent, Stack, Typography} from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Records(props) {

    {/* Location and Navigate methods*/}
    {/* Location allows you to get state data*/}
    const location = useLocation();

    {/* Navigation allows you to navigate to another page through JavaScript code */}
    const navigate = useNavigate();

    {/* Getting the appropriate date for the page from state memory*/}
    const date = location.state.date

    {/* Boolean if the given date of the page is today*/}
    const [isToday, setIsToday] = useState(false)

    {/* Array of sensor data records*/}
    const [records, setRecords] = useState([])

    {/* Strings to represent the dates before and after the date of the day, in ISO format */}
    const [prevDateStr, setPrev] = useState("")
    const [nextDateStr, setNext] = useState("")

    {/* Today as a date object*/}
    const today = new Date();
    {/* The date of the page's state as a date object*/}
    const dateObj = new Date(date)

    {/* The date objects before and after dateObj */}
    const datePrev = new Date()
    const dateNext = new Date()

    {/* Setting prev and next date accordingly */}
    datePrev.setDate(dateObj.getDate() - 1)
    dateNext.setDate(dateObj.getDate() + 1)

    {/* Requesting data of all sensor data record corresponding with state's date */}
    useEffect(() => {
        document.title = 'Records';
        {/* Setting date strings */}
        setPrev(getPreviousDay(dateObj).toISOString().slice(0, 10))
        setNext(getNextDay(dateObj).toISOString().slice(0, 10))

        let dateStr = dateObj.toISOString().slice(0, 10)
        let todayStr = today.toISOString().slice(0, 10)

        {/* Checking and setting today boolean */}
        if (dateStr == todayStr) {
            setIsToday(true)
        } else {
            setIsToday(false)
        }

        {/* Form data containing the date to request from */}
        const FormData2 = require('form-data');
        let data = new FormData();
        console.log(date)
        data.append('date', date);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://mxhew.pythonanywhere.com/api/sensordata_date/',
            headers: {},
            data: data
        };

        axios(config)
            .then((response) => {
                setRecords(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [date]);


    {/* Get date before parameter */}
    function getPreviousDay(date = new Date()) {
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
        return previous;
    }

    {/* Get date after parameter */}
    function getNextDay(date = new Date()) {
        const next = new Date(date.getTime());
        next.setDate(date.getDate() + 1);
        return next;
    }

    {/* Navigate to records page with different date in state */}
    function changeDate(chgDate) {
        navigate('/records', {state: {date: chgDate.toISOString().slice(0, 10)}})
    }

    return (


        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
        }}>

            {/* Date Navigation Elements */}
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-evenly"
                spacing={1}
            >
                {/* Previous Date Button */}
                <Link to={"/records"} state={{date: prevDateStr}}>
                    <Button variant="contained" onClick={(key) => changeDate(datePrev)}>Prev</Button>
                </Link>

                {/* Date Picker */}
                <DatePicker
                    selected={dateObj} // Selected date is the date in state memory
                    maxDate={today} // Cannot select a date in the future
                    onChange={(date) => changeDate(date)} // Changes date upon selecting a value
                    withPortal
                />

                {/* Next Date Button */}
                {
                    // If today, disable Next Date Button
                    isToday ? <Button variant="contained" disabled>Next</Button>
                        :
                        // Else
                        <Link to={"/records"} state={{date: nextDateStr}}>
                            <Button variant="contained" onClick={(key) => changeDate(dateNext)}>Next</Button>
                        </Link>
                }
            </Stack>

            {/* Records column */}
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                {/* For each sensor data record */}
                {records.reverse().map(rec =>
                    <Card sx={{height: '100%', width: '100%'}} variant="outlined" key={rec.id}>
                        <CardContent>
                            <Stack
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                                spacing={1}
                            >
                                {/* Temperature */}
                                <div>
                                    <Typography sx={{ fontWeight: 'bold', typography: { sm: 'body4' } }}>
                                        Temperature:
                                    </Typography>
                                    <p>{rec.temp}°C</p>
                                </div>
                                {/* Humidity */}
                                <div>
                                    <Typography sx={{ fontWeight: 'bold', typography: { sm: 'body4' } }}>
                                        Humidity:
                                    </Typography>
                                    <p>{rec.humidity}%</p>
                                </div>
                                {/* Soil Moisture */}
                                <div>
                                    <Typography sx={{ fontWeight: 'bold', typography: { sm: 'body4' } }}>
                                        Soil Moisture:
                                    </Typography>
                                    <p>{rec.soil_moisture}%</p>
                                </div>
                                {/* Light Intensity */}
                                <div>
                                    <Typography sx={{ fontWeight: 'bold', typography: { sm: 'body4' } }}>
                                        Light Intensity:
                                    </Typography>
                                    <p>{rec.light_intensity}</p>
                                </div>
                                {/* Date/Time */}
                                <div>
                                    <Typography sx={{ fontWeight: 'bold', typography: { sm: 'body4' } }}>
                                        Date/Time:
                                    </Typography>
                                    <p>{rec.formatted_date}</p>
                                </div>
                            </Stack>
                        </CardContent>
                    </Card>
                )}
            </Stack>
        </Box>
    );
}

export default Records;