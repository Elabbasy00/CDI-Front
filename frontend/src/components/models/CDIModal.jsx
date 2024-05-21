import { Button, Dialog, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';

import DialogTitle from '@mui/material/DialogTitle';
import { CloseOutlined } from '@ant-design/icons';

import CDIIntelligence from 'components/cards/CDIIntelligence';

function CDIModal() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="contained" onClick={toggle}>
        CDI INTELLIGENCE
      </Button>
      <Dialog onClose={toggle} open={open}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: '1px solid {theme.palette.divider}' }}
        >
          <Grid item>
            <DialogTitle>CDI INTELLIGENCE</DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={toggle}>
              <CloseOutlined />
            </IconButton>
          </Grid>
        </Grid>
        <CDIIntelligence />
      </Dialog>
    </>
  );
}

export default CDIModal;
