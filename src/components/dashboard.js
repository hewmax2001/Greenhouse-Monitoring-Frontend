import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { OverviewTemperature } from '../sections/overview/overview-temperature';
import { OverviewSoilMoisture } from '../sections/overview/overview-soil-moisture';
import { OverviewHumidity } from '../sections/overview/overview-humidity';
import { OverviewLight } from '../sections/overview/overview-light';
import React, {useEffect, useState} from "react";
import axios from "axios";
import { RenderLineChart } from "./LineChart2"
import {Card, CardContent} from "@mui/material";

const now = new Date();


const Dashboard = () => {
  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [soil, setSoil] = useState(0)
  const [light, setLight] = useState(0)
  const [weekTemp, setWeekTemp] = useState([])
  const [weekHum, setWeekHum] = useState([])
  const [weekSoil, setWeekSoil] = useState([])
  const [weekLight, setWeekLight] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://mxhew.pythonanywhere.com/api/sensordata_latest/',
      headers: {}
    };

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

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://mxhew.pythonanywhere.com/api/sensordata_week/',
      headers: {}
    };

    axios(config)
        .then((response) => {
          if (response.data) {
            for (let i = 0; i < response.data.length; i++) {
              let item = response.data[i]
              weekTemp[i] = { name: item.create_at, uv: item.temp, pv: 2400, amt: 2400 }
              weekHum[i] = { name: item.create_at, uv: item.humidity }
              weekSoil[i] = { name: item.create_at, uv: item.soil_moisture }
              weekLight[i] = { name: item.create_at, uv: item.light_intensity }
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
          <Grid
              xs={12}
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
          <Grid
              xs={12}
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
          <Grid
              xs={12}
              sm={6}
              lg={3}
          >
            <OverviewSoilMoisture
                sx={{height: '100%'}}
                value={soil}
            />
          </Grid>
          <Grid
              xs={12}
              sm={6}
              lg={3}
          >
            <OverviewLight
                sx={{height: '100%'}}
                value={light}
            />
          </Grid>
          <Grid
              xs={12}
              md={12}
              lg={12}
          >
            <h1>Avg data past 7 days</h1>
          </Grid>
          <Grid
              xs={12}
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
          <Grid
              xs={12}
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
          <Grid
              xs={12}
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
        </Grid>
      </Container>
    </Box>
    }
  </>);
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
