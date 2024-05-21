import ProtoType from 'prop-types';
import { Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { openSnackbar } from 'api/snackbar';
import React, { useState } from 'react';
import { useCreateQueryMutation, useGetUserQueryTemplateQuery } from 'redux/chart/chartSlice';

function QueryAddForm({ mrnId }) {
  const [query, setQuery] = useState({
    subject: '',
    body: '',
    type: 'sent'
  });
  const onChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  const { data: templates } = useGetUserQueryTemplateQuery();
  const [createQuery] = useCreateQueryMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const toServer = { ...query, mrn: mrnId };
    createQuery(toServer)
      .unwrap()
      .then(() => {
        openSnackbar({
          open: true,
          message: 'Query Added',
          variant: 'alert',

          alert: {
            color: 'success'
          },

          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          transition: 'SlideLeft'
        });
        setQuery({
          subject: '',
          body: '',
          type: 'sent'
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
    <Grid container component="form" sx={{ my: 2 }} spacing={2} onSubmit={onSubmit}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Query Template</InputLabel>
          <Select id="demo-simple-select" name="template" onChange={(e) => onChange({ target: { name: 'body', value: e.target.value } })}>
            {templates?.map((template) => (
              <MenuItem key={template.id} value={template.body}>
                {template.subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined" required>
          <InputLabel htmlFor="querySubject">Query Subject</InputLabel>
          <OutlinedInput onChange={onChange} name="subject" value={query.subject} id="querySubject" />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined" required>
          <InputLabel htmlFor="queryBody">Query Body</InputLabel>
          <OutlinedInput name="body" value={query.body} onChange={onChange} id="queryBody" multiline rows={4} />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" sx={{ mx: 'auto' }}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default QueryAddForm;

QueryAddForm.propTypes = { mrnId: ProtoType.number };
