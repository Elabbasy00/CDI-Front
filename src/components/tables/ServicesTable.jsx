import React, { useMemo } from 'react';
import ReactTable from './BasicTable';
import PropTypes from 'prop-types';

function ServicesTable({ data }) {
  const columns = useMemo(
    () => [
      {
        header: 'Code',
        accessorKey: 'code'
      },
      {
        header: 'Description',
        accessorKey: 'description'
      },
      {
        header: 'Price',
        accessorKey: 'price'
      },
      {
        header: 'Flag',
        accessorKey: 'flags'
      }
    ],
    []
  );

  return <ReactTable {...{ data: data ?? [], columns, striped: true }} />;
}

export default ServicesTable;

ServicesTable.propTypes = { data: PropTypes.array };
