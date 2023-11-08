import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import GaugeChart from 'react-gauge-chart'
import {BeakerIcon} from "@heroicons/react/24/outline";

export const OverviewSoilMoisture = (props) => {
  {/* Card height and Soil Moisture Value */}
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >

          {/* Label */}
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Soil Moisture
            </Typography>

            {/* Value */}
            <Typography variant="h4">
              {value}%
            </Typography>

          </Stack>

          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            {/* Icon */}
            <SvgIcon>
              <BeakerIcon />
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

OverviewSoilMoisture.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
