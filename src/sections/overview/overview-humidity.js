import PropTypes from 'prop-types';
import {Avatar, Box, Card, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import GaugeChart from 'react-gauge-chart'
import {CloudIcon} from "@heroicons/react/24/outline";

export const OverviewHumidity = (props) => {
  {/* Card height and Humidity Value */}
  const { sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>

            {/* Label */}
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Humidity
            </Typography>

            {/* Value as Percentage */}
            <Typography variant="h4">
              {value}%
            </Typography>

          </Stack>

          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            {/* Icon */}
            <SvgIcon>
              <CloudIcon />
            </SvgIcon>
          </Avatar>

        </Stack>

        {/* Percentage Gauge */}
        <Box sx={{ mt: 3 }}>
          <GaugeChart id="gauge-chart1"
          animate={true}
          nrOfLevels={30}
          colors={['#EA4228']}
          percent={value / 100}
          textColor="#00000000"
          needleColor="#345243" />
        </Box>

      </CardContent>
    </Card>
  );
};

OverviewHumidity.propTypes = {
  value: PropTypes.number,
  sx: PropTypes.object
};

