import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import GaugeChart from 'react-gauge-chart'
import {BeakerIcon} from "@heroicons/react/24/outline";

export const OverviewSoilMoisture = (props) => {
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
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Soil Moisture
            </Typography>
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
            <SvgIcon>
              <BeakerIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
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
