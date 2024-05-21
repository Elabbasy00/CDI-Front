import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';

import MainCard from 'components/MainCard';

import Transitions from 'components/@extended/Transitions';
import { WarningOutlined } from '@ant-design/icons';

export default function PatientDetail({ data }) {
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Transitions type="slide" direction="down" in={true}>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <Stack spacing={2.5}>
            <MainCard title="Patient Details">
              <List sx={{ py: 0 }}>
                <ListItem divider={!downSm}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Demographics</Typography>
                        <Typography variant="h5">
                          {data?.demographics?.patient_gender} - {data?.demographics?.patient_age}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Encounter Date</Typography>
                        <Typography variant="h5">{data?.encounter?.date}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item sm={6} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">WorkSheet Status</Typography>
                        <Typography variant="h5">{data?.status}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!downSm}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Flags</Typography>
                        <Typography color="red">
                          <WarningOutlined />
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Flag Count</Typography>
                        <Typography variant="h5">{data?.flags_count}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Manual Priority</Typography>
                        <Typography variant="h5">{data?.manual_priority}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem divider={!downSm}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Physician</Typography>
                        <Typography variant="h5">{data?.phyicisian_name}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Specialty</Typography>
                        <Typography variant="h5">{data?.speciality_name}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Facility</Typography>
                        <Typography variant="h5">{data?.facility_name}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Stack>
        </Grid>
      </Grid>
    </Transitions>
  );
}

PatientDetail.propTypes = { data: PropTypes.object };
