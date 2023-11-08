import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import {SunIcon} from "@heroicons/react/24/outline";

export const OverviewLight = (props) => {
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
              variant="overline"
            >
              Light Intensity
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <SunIcon/>
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewLight.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};