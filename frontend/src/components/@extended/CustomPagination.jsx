import React from 'react';
// import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Box, Pagination } from '@mui/material';

function CustomPaginationComponent({ onChange, currentPage, count, countPerPage }) {
  const countPages = Math.ceil(count / countPerPage) || 1;

  const onNext = () => {
    if (data?.next) {
      onChange(currentPage + 1);
    }
  };
  const onPrev = () => {
    if (data?.previous) {
      onChange(currentPage - 1);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 1
      }}
    >
      <Pagination
        variant="combined"
        showFirstButton
        showLastButton
        color="primary"
        count={countPages}
        onChange={(event, val) => onChange(val - 1)}
        defaultPage={1}
        page={currentPage + 1}
      />
    </Box>
  );
}

export default CustomPaginationComponent;

CustomPaginationComponent.propTypes = {
  onChange: PropTypes.func,
  currentPage: PropTypes.number,
  count: PropTypes.array,
  countPerPage: PropTypes.number
};
