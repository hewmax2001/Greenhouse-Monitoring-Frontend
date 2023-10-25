import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import {Avatar, Box, Card, CardContent, Stack, SvgIcon, Typography} from '@mui/material';
import GaugeChart from 'react-gauge-chart'
import {SunIcon} from "@heroicons/react/24/outline";

export const OverviewTemperature = (props) => {
  const { difference, positive = false, sx, value } = props;
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
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Temperature
            </Typography>
            <Typography variant="h4">
              {value * 2}%
            </Typography>
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
            <SvgIcon>
              <SunIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >

          </Stack>
        )}
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
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
