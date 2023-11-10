import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewTemperature } from '../sections/overview/overview-temperature';
import { OverviewSoilMoisture } from '../sections/overview/overview-soil-moisture';
import { OverviewHumidity } from '../sections/overview/overview-humidity';
import { OverviewLight } from '../sections/overview/overview-light';
import React, {useEffect, useState} from "react";
import axios from "axios";
import { RenderLineChart } from "./LineChart"
import {Card, CardContent} from "@mui/material";


const Dashboard = () => {

  {/* Values of the latest Sensor data record */}
  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [soil, setSoil] = useState(0)
  const [light, setLight] = useState(0)

  {/* Arrays of the average sensor data records from the past 7 days */}
  const [weekTemp, setWeekTemp] = useState([])
  const [weekHum, setWeekHum] = useState([])
  const [weekSoil, setWeekSoil] = useState([])
  const [weekLight, setWeekLight] = useState([])

  {/* Loading variable stop the rest of the page loading if true */}
  const [loading, setLoading] = useState(true)

  {/* Requesting both latest sensor data and average values for last 7 days */}
  useEffect(() => {

    {/* Request config: Latest sensor data */}
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://mxhew.pythonanywhere.com/api/sensordata_latest/',
      headers: {}
    };

    {/*
    Sending request...
    Setting state variables to response data
    */}
    axios(config)
        .then((response) => {
          if (response.data) {
            setTemperature(response.data.temp)
            setHumidity(response.data.humidity)
            setSoil(response.data.soil_moisture)
            setLight(response.data.light_intensity)
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  {/* Request config: Average values last 7 days */}
  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://mxhew.pythonanywhere.com/api/sensordata_week/',
      headers: {}
    };

    {/*
    Sending request...
    Iterating through response data array and setting state array.
    Reversing the state arrays to get proper format.
    Set loading to false (all data has been received)
    */}
    axios(config)
        .then((response) => {
          if (response.data) {
            for (let i = 0; i < response.data.length; i++) {
              let item = response.data[i]
              weekTemp[i] = { name: item.date_only, uv: item.temp }
              weekHum[i] = { name: item.date_only, uv: item.humidity }
              weekSoil[i] = { name: item.date_only, uv: item.soil_moisture }
              weekLight[i] = { name: item.date_only, uv: item.light_intensity }
            }
            weekTemp.reverse()
            weekHum.reverse()
            weekSoil.reverse()
            weekLight.reverse()
            setLoading(false)
          }
        })
        .catch((error) => {

        });
  }, []);

  return (
  <>
    <Head>
      <title>
        Overview | Devias Kit
      </title>
    </Head>
      {/*If loading is true: do not load rest of page*/}
      {
        loading? <p> Loading </p>
          :
        <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8
            }}
        >
          <Container maxWidth="xl">
            <Grid
                container
                spacing={3}
            >

              {/* Latest Value components START*/}

              {/* Overview Temperature */}

              <Grid
                  xs={6}
                  sm={6}
                  lg={3}
              >
                <OverviewTemperature
                    difference={12}
                    positive
                    sx={{height: '100%'}}
                    value={temperature}
                />
              </Grid>

              {/* Overview Humidity */}

              <Grid
                  xs={6}
                  sm={6}
                  lg={3}
              >
                <OverviewHumidity
                    difference={16}
                    positive={false}
                    sx={{height: '100%'}}
                    value={humidity}
                />
              </Grid>

              {/* Overview Soil Moisture */}

              <Grid
                  xs={6}
                  sm={6}
                  lg={3}
              >
                <OverviewSoilMoisture
                    sx={{height: '100%'}}
                    value={soil}
                />
              </Grid>

              {/* Overview Light Intensity */}

              <Grid
                  xs={6}
                  sm={6}
                  lg={3}
              >
                <OverviewLight
                    sx={{height: '100%'}}
                    value={light}
                />
              </Grid>

              {/* Latest Value components END */}

              {/* Past 7 Days BEGIN */}

              <Grid
                  xs={12}
                  md={12}
                  lg={12}
              >
                <h1>Avg data past 7 days</h1>
              </Grid>

              {/* Temperature */}

              <Grid
                  xs={6}
                  md={8}
                  lg={6}
              >
                <Card sx={{height: '100%'}}>
                    <CardContent>
                      <h2>Temperature °C</h2>
                      <RenderLineChart
                        data={weekTemp}
                      />
                   </CardContent>
                </Card>
              </Grid>

              {/* Humidity */}

              <Grid
                  xs={6}
                  md={8}
                  lg={6}
              >
               <Card sx={{height: '100%'}}>
                    <CardContent>
                      <h2>Humidity</h2>
                      <RenderLineChart
                        data={weekHum}
                      />
                   </CardContent>
                </Card>
              </Grid>

              {/* Soil Moisture */}

              <Grid
                  xs={6}
                  md={8}
                  lg={6}
              >
                <Card sx={{height: '100%'}}>
                    <CardContent>
                      <h2>Soil Moisture</h2>
                      <RenderLineChart
                        data={weekSoil}
                      />
                   </CardContent>
                </Card>
              </Grid>

              {/* Light Intensity */}

              <Grid
                  xs={12}
                  md={8}
                  lg={6}
              >
                <Card sx={{height: '100%'}}>
                    <CardContent>
                      <h2>Light Intensity</h2>
                      <RenderLineChart
                        data={weekLight}
                      />
                   </CardContent>
                </Card>
              </Grid>

              {/* Past 7 Days END */}

            </Grid>
          </Container>
        </Box>
      }
  </>);
};

export default Dashboard;
