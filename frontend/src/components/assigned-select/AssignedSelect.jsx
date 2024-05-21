import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/system';
import { useAssignChartsMutation, useGetSpeciaListQuery } from 'redux/chart/chartSlice';
import { openSnackbar } from 'api/snackbar';

function AssignedSelect({ rowSelection }) {
  const { data } = useGetSpeciaListQuery();
  const [assignCharts] = useAssignChartsMutation();
  const [value, setValue] = React.useState('');

  const assginTo = async () => {
    if (!value || rowSelection.length === 0) return;
    let toServer = {
      specialist_id: value,
      chart_ids: []
    };

    for (const row of rowSelection) {
      toServer.chart_ids.push(row.original.id);
    }
    assignCharts(toServer)
      .unwrap()
      .then(() => {
        openSnackbar({
          open: true,
          message: 'Charts assigned',
          variant: 'alert',

          alert: {
            color: 'success'
          },

          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          transition: 'SlideLeft'
        });
      })
      .catch((e) => {
        openSnackbar({
          open: true,
          message: e?.message,
          variant: 'alert',

          alert: {
            color: 'error'
          },

          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          transition: 'SlideLeft'
        });
      });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ padding: 2 }}>
      <FormControl sx={{ minWidth: '25ch' }}>
        <InputLabel>Assgin To</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="hi"
          id="demo-simple-select"
          value={value}
          placeholder="Assign To"
          onChange={(event) => setValue(event.target.value)}
        >
          {data?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item?.user}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={assginTo} variant="contained">
        Assign
      </Button>
    </Stack>
  );
}

export default AssignedSelect;

AssignedSelect.propTypes = { rowSelection: PropTypes.array };
