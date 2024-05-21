import React, { useMemo } from 'react';
import ReactTable from './BasicTable';
import PropTypes from 'prop-types';

function MedicationsTable({ data }) {
  const columns = useMemo(
    () => [
      {
        header: 'Code',
        accessorKey: 'med_code'
      },
      {
        header: 'Description',
        accessorKey: 'email'
      },
      {
        header: 'Course',
        accessorKey: 'med_course'
      },
      {
        header: 'Dose',
        accessorKey: 'med_dose'
      },
      {
        header: 'Price',
        accessorKey: 'med_price'
      },
      {
        header: 'Unit',
        accessorKey: 'med_unit'
      }
    ],
    []
  );

  return <ReactTable {...{ data: data ?? [], columns, striped: true }} />;
}

export default MedicationsTable;

MedicationsTable.propTypes = { data: PropTypes.array };
