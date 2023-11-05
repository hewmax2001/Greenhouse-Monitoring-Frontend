import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, CardContent, Stack, Typography} from '@mui/material';

function Records(props) {
    const location = useLocation();
    const date = location.state.date
    const [loading, setLoading] = useState(true)
    const [isToday, setIsToday] = useState(false)
    const [records, setRecords] = useState([])
    const today = new Date();
    const dateObj = new Date(date)
    const datePrev = new Date()
    const dateNext = new Date()

    datePrev.setDate(dateObj.getDate() - 1)
    dateNext.setDate(dateObj.getDate() + 1)
    const datePrevStr = datePrev.toISOString().slice(0, 10)
    const dateNextStr = dateNext.toISOString().slice(0, 10)

    useEffect(() => {

        let dateStr = dateObj.toISOString().slice(0, 10)
        let todayStr = today.toISOString().slice(0, 10)
        let test = new Date()
        test.setDate(dateObj.getDate() - 30)
        console.log(test.toISOString().slice(0, 10))

        if (dateStr == todayStr) {
            setIsToday(true)
        }
        const FormData2 = require('form-data');
        let data = new FormData();
        data.append('date', date);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://mxhew.pythonanywhere.com/api/sensordata_date/',
                headers: {

                },
                data: data
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setRecords(response.data)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                });
    }, [date]);

    function changeDate(chgDate) {
        console.log(chgDate.toISOString().slice(0, 10))
    }

    return (
        <div>
            <Stack
              alignItems="flex-center"
              direction="row"
              justifyContent="space-evenly"
              spacing={3}
            >
                <Link to={"/records"} state={{date: datePrev.toISOString().slice(0, 10)}}>
                    <Button variant="contained" onClick={(key) => changeDate(datePrev)}>{datePrevStr}</Button>
                </Link>
                <Typography variant="h4">
                    {date}
                </Typography>
                {
                  isToday? <Button variant="contained" disabled>{dateNextStr}</Button>
                      :
                <Link to={"/records"} state={{date: dateNext.toISOString().slice(0, 10)}}>
                    <Button variant="contained" onClick={(key) => changeDate(dateNext)}>{dateNextStr}</Button>
                </Link>
                }
            </Stack>
             <Stack
                      direction="column"
                      justifyContent="flex-start"
                        alignItems="flex-center"
                      spacing={1}
                    >
                {records.map(rec =>
                    <div>
                    <Card sx={{height: '100%', width: '80%'}} variant="outlined" key={rec.id}>
                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="space-evenly"
                            alignItems="flex-center"
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
                                 Date: {rec.create_at}
                            </Typography>
                        </Stack>
                      </CardContent>
                    </Card>

                    </div>
                )}
             </Stack>
        </div>
    );
}

export default Records;