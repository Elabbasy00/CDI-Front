import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from '@mui/material';
import { ClockCircleOutlined, PictureOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { openSnackbar } from 'api/snackbar';

function CDIIntelligence() {
  const [expanded, setExpanded] = useState('');
  const handleChange = (str) => {
    if (str === expanded) setExpanded('');
    else setExpanded(str);
  };
  return (
    <Box>
      <Box
        sx={{
          '& .MuiAccordion-root': {
            borderColor: 'theme.palette.divider',
            '& .MuiAccordionSummary-root': {
              bgcolor: 'transparent',
              flexDirection: 'row'
            },
            '& .MuiAccordionDetails-root': {
              borderColor: 'theme.palette.divider'
            },
            '& .Mui-expanded': {
              color: 'theme.palette.primary.main'
            }
          }
        }}
      >
        <Accordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <SmileOutlined />
              <Typography variant="h6">85025 (BLOOD COUNT COMPLETE AUTO&AUTO DIFRNTL WBC)</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Typography variant="h5">Lorem ipsum dolor sit amet,</Typography>
              <CopyToClipboard
                text={'ahmed sdasd sad asdasdsa dasdasda'}
                onCopy={() =>
                  openSnackbar({
                    open: true,
                    message: 'Text Copied',
                    variant: 'alert',

                    alert: {
                      color: 'success'
                    },

                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    transition: 'SlideLeft'
                  })
                }
              >
                <Typography sx={{ cursor: 'pointer' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                  lobortis eget.
                </Typography>
              </CopyToClipboard>
              <CopyToClipboard
                text={'ahmed sdasd sad asdasdsa dasdasda'}
                onCopy={() =>
                  openSnackbar({
                    open: true,
                    message: 'Text Copied',
                    variant: 'alert',

                    alert: {
                      color: 'success'
                    },

                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    transition: 'SlideLeft'
                  })
                }
              >
                <Typography sx={{ cursor: 'pointer' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                  lobortis eget.
                </Typography>
              </CopyToClipboard>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <UserOutlined />
              <Typography variant="h6">Accordion 02</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={() => handleChange('panel3')}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <ClockCircleOutlined />
              <Typography variant="h6">Accordion 03</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={() => handleChange('panel4')}>
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PictureOutlined />
              <Typography variant="h6">Accordion 04</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default CDIIntelligence;
