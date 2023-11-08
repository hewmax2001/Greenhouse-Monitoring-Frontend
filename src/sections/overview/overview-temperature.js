import PropTypes from 'prop-types';
import {Avatar, Box, Card, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import GaugeChart from 'react-gauge-chart'
import {SunIcon} from "@heroicons/react/24/outline";

export const OverviewTemperature = (props) => {
  {/* Card height and Temperature Value */}
  const { difference, positive = false, sx, value } = props;

  {/* Highest value of temperature is 50 (100%) */}
  const tempPercentModifier = 50;

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
              Temperature
            </Typography>

            {/* Value as Percentage */}
            <Typography variant="h4">
              {value * 2}%
            </Typography>

            {/* Value as Celsius */}
            <Typography variant="h5">
              {value}°C
            </Typography>

          </Stack>

          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            {/* Icon */}
            <SvgIcon>
              <SunIcon />
            </SvgIcon>
          </Avatar>

        </Stack>

        {/* Percentage Gauge */}
        <Box sx={{ mt: 3 }}>
          <GaugeChart id="gauge-chart1"
          nrOfLevels={30}
          colors={['#EA4228']}
          animate={true}
          percent={value / tempPercentModifier}
          textColor="#00000000"
          needleColor="#345243" />
        </Box>

      </CardContent>
    </Card>
  );
};

OverviewTemperature.prototypes = {
  sx: PropTypes.object,
  value: PropTypes.number.isRequired
};
