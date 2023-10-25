import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardContent, Stack, Typography} from '@mui/material';

function Records(props) {
    const location = useLocation();
    const date = location.state.date
    const [loading, setLoading] = useState(true)
    const [records, setRecords] = useState([])

    useEffect(() => {
        const FormData2 = require('form-data');
        let data = new FormData();
        data.append('date', date);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/sensordata_date/',
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
            {records.map(rec =>
                <Card sx={{height: '100%', width: '50%'}} key={rec.id}>
                  <CardContent>
                    <Stack
                      alignItems="flex-centre"
                      direction="row"
                      justifyContent="space-evenly"
                      spacing={3}
                    >
                        <Typography >
                            {rec.temp}
                        </Typography>
                        <Typography >
                             {rec.humidity}
                        </Typography>
                        <Typography >
                             {rec.create_at}
                        </Typography>
                    </Stack>
                  </CardContent>
                </Card>
            )}
        </div>
    );
}

export default Records;