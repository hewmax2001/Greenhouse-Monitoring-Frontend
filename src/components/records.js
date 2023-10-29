import {useLocation} from "react-router-dom";
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

    useEffect(() => {
        let dateObj = new Date(date)
        let dateStr = dateObj.toISOString().slice(0, 10)
        let todayStr = today.toISOString().slice(0, 10)

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

    return (
        <div>
            <Stack
              alignItems="flex-center"
              direction="row"
              justifyContent="space-evenly"
              spacing={3}
            >
                <Button variant="contained">Previous</Button>
                {
                  isToday? <Button variant="contained" disabled>Next</Button>
                      :
                <Button variant="contained" >Next</Button>
                }
            </Stack>
            {records.map(rec =>
                <div>
                <Card sx={{height: '100%', width: '100%'}} key={rec.id}>
                  <CardContent>
                    <Stack
                      alignItems="flex-center"
                      direction="row"
                      justifyContent="space-evenly"
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
                    <br/>
                </div>
            )}
        </div>
    );
}

export default Records;