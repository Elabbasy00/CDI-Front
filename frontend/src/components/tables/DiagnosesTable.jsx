import React, { useMemo } from 'react';
import ReactTable from './BasicTable';
import PropTypes from 'prop-types';

function DiagnosesTable({ data }) {
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
        header: 'Condition',
        accessorKey: 'condition'
      }
    ],
    []
  );

  return <ReactTable {...{ data: data ?? [], columns, striped: true }} />;
}

export default DiagnosesTable;

DiagnosesTable.propTypes = { data: PropTypes.array };
