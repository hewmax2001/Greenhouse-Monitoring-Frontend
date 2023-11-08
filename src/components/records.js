import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, Card, CardContent, Stack, Typography} from '@mui/material';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Records(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const date = location.state.date
    const [loading, setLoading] = useState(true)
    const [isToday, setIsToday] = useState(false)
    const [records, setRecords] = useState([])
    const [prevDateStr, setPrev] = useState("")
    const [nextDateStr, setNext] = useState("")
    const today = new Date();
    const dateObj = new Date(date)
    const datePrev = new Date()
    const dateNext = new Date()

    datePrev.setDate(dateObj.getDate() - 1)
    dateNext.setDate(dateObj.getDate() + 1)

    useEffect(() => {

        let dateStr = dateObj.toISOString().slice(0, 10)
        let todayStr = today.toISOString().slice(0, 10)

        setPrev(getPreviousDay(dateObj).toISOString().slice(0, 10))
        setNext(getNextDay(dateObj).toISOString().slice(0, 10))


        if (dateStr == todayStr) {
            setIsToday(true)
        }
        else {
            setIsToday(false)
        }
        const FormData2 = require('form-data');
        let data = new FormData();
        data.append('date', date);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://mxhew.pythonanywhere.com/api/sensordata_date/',
                headers: {

                },
                data: data
            };

            axios(config)
                .then((response) => {
                    setRecords(response.data)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                });
    }, [date]);

    function getPreviousDay(date = new Date()) {
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);

        return previous;
    }

    function getNextDay(date = new Date()) {
        const next = new Date(date.getTime());
        next.setDate(date.getDate() + 1);

        return next;
    }

    function changeDate(chgDate) {
        navigate('/records', {state: {date : chgDate.toISOString().slice(0, 10)}})
    }

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
        }}>

            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-evenly"
              spacing={3}
            >
                <Link to={"/records"} state={{date: prevDateStr}}>
                    <Button variant="contained" onClick={(key) => changeDate(datePrev)}>{prevDateStr}</Button>
                </Link>
                <DatePicker
                    selected={dateObj}
                    maxDate={today}
                    onChange={(date) => changeDate(date)} //only when value has changed
                />
                {
                  isToday? <Button variant="contained" disabled>{nextDateStr}</Button>
                      :
                <Link to={"/records"} state={{date: nextDateStr}}>
                    <Button variant="contained" onClick={(key) => changeDate(dateNext)}>{nextDateStr}</Button>
                </Link>
                }
            </Stack>
             <Stack
                      direction="column"
                      justifyContent="flex-start"
                        alignItems="center"
                      spacing={1}
                    >
                {records.map(rec =>
                    <Card sx={{height: '100%', width: '100%'}} variant="outlined" key={rec.id}>
                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="space-evenly"
                            alignItems="center"
                          spacing={3}
                        >
                            <Typography variant="h5">
                                ID: {rec.id}
                            </Typography>
                            <Typography >
                                Temperature: {rec.temp}°C
                            </Typography>
                            <Typography >
                                 Humidity: {rec.humidity}%
                            </Typography>
                            <Typography >
                                 Soil Moisture: {rec.soil_moisture}%
                            </Typography>
                            <Typography >
                                 Light Intensity: {rec.light_intensity}
                            </Typography>
                            <Typography >
                                 Date/Time: {rec.formatted_date}
                            </Typography>
                        </Stack>
                      </CardContent>
                    </Card>

                )}
             </Stack>

        </Box>
    );
}

export default Records;