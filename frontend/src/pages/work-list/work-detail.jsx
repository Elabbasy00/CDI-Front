import PropTypes from 'prop-types';

import { Accordion, AccordionDetails, AccordionSummary, Divider, FormControlLabel, Grid, Stack, Switch } from '@mui/material';
import Box from '@mui/material/Box';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Transitions from 'components/@extended/Transitions';
import MainCard from 'components/MainCard';
import CDIIntelligence from 'components/cards/CDIIntelligence';
import PatientDetail from 'components/cards/PatientDetail';
import CDIModal from 'components/models/CDIModal';
import DiagnosesTable from 'components/tables/DiagnosesTable';
import MedicationsTable from 'components/tables/MedicationsTable';
import ServicesTable from 'components/tables/ServicesTable';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useGetChartDetailQuery, useGetChartQuerysQuery } from 'redux/chart/chartSlice';
import QueryAddForm from 'components/froms/QueryAddForm';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function WorkDetail() {
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState('');
  const [showCdi, setShowCdi] = useState(false);
  const { id } = useParams();
  const { data } = useGetChartDetailQuery(id);
  const { data: chartQuerys } = useGetChartQuerysQuery(id);

  const handelMainTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  const handelSubTabsChange = (str) => {
    if (str === expanded) setExpanded('');
    else setExpanded(str);
  };

  const handelToggleCdi = (value) => {
    setShowCdi(value);
  };

  return (
    <>
      <PatientDetail data={data} />

      <MainCard
        title={<FormControlLabel control={<Switch onChange={(e, val) => handelToggleCdi(val)} />} label="Show CDI" labelPlacement="end" />}
        secondary={<CDIModal />}
        sx={{ mt: 4 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={showCdi ? 12 : 0} md={showCdi ? 6 : 0} sx={{ display: showCdi ? 'flex' : 'none', marginTop: { xs: 0, md: 8 } }}>
            <Transitions type="fade" direction="right" in={showCdi}>
              <CDIIntelligence />
            </Transitions>
          </Grid>
          <Grid item xs={12} md={showCdi ? 6 : 12}>
            <Tabs value={value} onChange={handelMainTabsChange} aria-label="work-sheet-taps">
              <Tab label="Worksheet" {...a11yProps(0)} />
              <Tab label="Query" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Box>
                <Accordion expanded={expanded === 'notes'} onChange={() => handelSubTabsChange('notes')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography variant="h6">Notes</Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      <Typography variant="h6" color="text.secondary">
                        Clinical Notes
                      </Typography>
                      <Divider />
                      <Typography sx={{ cursor: 'pointer' }}>{data?.note?.note_clinical}</Typography>
                      <Typography variant="h6" color="text.secondary">
                        Waiver Notes
                      </Typography>
                      <Divider />
                      <Typography sx={{ cursor: 'pointer' }}>{data?.note?.note_waiver}</Typography>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'medications'} onChange={() => handelSubTabsChange('medications')}>
                  <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography variant="h6">Medications</Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <MedicationsTable data={data?.medications} />
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'diagnosis'} onChange={() => handelSubTabsChange('diagnosis')}>
                  <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography variant="h6">Diagnosis</Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DiagnosesTable data={data?.diagnoses} />
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'services'} onChange={() => handelSubTabsChange('services')}>
                  <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography variant="h6">Services</Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ServicesTable data={data?.services} />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box>
                {chartQuerys?.map((query) => (
                  <Accordion key={query.id} expanded={expanded === query.id} onChange={() => handelSubTabsChange(query.id)}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="h5">
                          {query.type} on ({query.date})
                        </Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={2}>
                        <Typography variant="h6" color="text.secondary">
                          {query.subject}
                        </Typography>
                        <Divider />
                        <Typography sx={{ cursor: 'pointer' }}>{query.body}</Typography>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
              <QueryAddForm mrnId={id} />
            </TabPanel>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}

export default WorkDetail;

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
