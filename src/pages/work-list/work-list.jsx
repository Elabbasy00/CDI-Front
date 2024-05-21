import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';

// third-party
import {
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  flexRender,
  useReactTable,
  sortingFns,
  getSortedRowModel
} from '@tanstack/react-table';
import { compareItems, rankItem } from '@tanstack/match-sorter-utils';

// project import

import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import {
  CSVExport,
  DebouncedInput,
  EmptyTable,
  Filter,
  HeaderSort,
  IndeterminateCheckbox,
  RowSelection,
  SelectColumnSorting
} from 'components/third-party/react-table';
import { Box, Button } from '@mui/material';
import { useGetQueryListQuery } from 'redux/chart/chartSlice';
import CustomPaginationComponent from 'components/@extended/CustomPagination';
import { Link, useNavigate } from 'react-router-dom';
import AssignedSelect from 'components/assigned-select/AssignedSelect';
import MuiLink from '@mui/material/Link';
export const fuzzyFilter = (row, columnId, value, addMeta) => {
  // rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // store the ranking info
  addMeta(itemRank);

  // return if the item should be filtered in/out
  return itemRank.passed;
};

export const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;

  // only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId], rowB.columnFiltersMeta[columnId]);
  }

  // provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns }) {
  const navigate = useNavigate();
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState([
    {
      id: 'age',
      desc: false
    }
  ]);

  const { data } = useGetQueryListQuery({ sorting: sorting?.[0]?.desc ? `-${sorting?.[0].id}` : sorting?.[0]?.id, page: page * 12 });

  const changePage = useCallback((page) => {
    setPage(page);
  }, []);

  const table = useReactTable({
    data: data?.data ?? [],
    columns,

    state: {
      columnFilters,
      globalFilter,
      sorting,
      rowSelection
    },

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    // manualSorting: true,
    // manualFiltering: true,
    enableRowSelection: true,
    manualPagination: true,
    getSortedRowModel: getSortedRowModel()
  });

  let headers = [];
  table.getAllColumns().map(
    (columns) =>
      columns.accessorKey &&
      headers.push({
        label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
        // @ts-ignore
        key: columns.columnDef.accessorKey
      })
  );
  return (
    <MainCard content={false}>
      <AssignedSelect rowSelection={table.getSelectedRowModel().flatRows} />

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data?.data?.length} records...`}
        />

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
          <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />
          <CSVExport
            {...{
              data:
                table.getSelectedRowModel().flatRows.map((row) => row.original).length === 0
                  ? table.getCoreRowModel().rows.map((d) => d.original)
                  : table.getSelectedRowModel().flatRows.map((row) => row.original),
              headers,
              filename: 'sorting.csv'
            }}
          />
        </Stack>
      </Stack>

      <ScrollX>
        <RowSelection selected={Object.keys(rowSelection).length} />
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                      Object.assign(header.column.columnDef.meta, {
                        className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                      });
                    }

                    return (
                      <TableCell
                        style={{ minWidth: header?.column?.columnDef?.minWidth, maxWidth: header?.column?.columnDef?.maxWidth }}
                        key={header.id}
                        {...header.column.columnDef.meta}
                        onClick={header.column.getToggleSortingHandler()}
                        {...(header.column.getCanSort() &&
                          header.column.columnDef.meta === undefined && {
                            className: 'cursor-pointer prevent-select'
                          })}
                      >
                        {header.isPlaceholder ? null : (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                            {header.column.getCanSort() && <HeaderSort column={header.column} />}
                          </Stack>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      if (e.target.tagName === 'TD') navigate(`/work-list/${row.original.id}`);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length}>
                    <EmptyTable msg="No Data" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => (
                    <TableCell key={footer.id} {...footer.column.columnDef.meta}>
                      {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </Table>
        </TableContainer>
      </ScrollX>
      <CustomPaginationComponent onChange={changePage} count={data?.count} currentPage={page} countPerPage={12} />
    </MainCard>
  );
}

// ==============================|| REACT TABLE - FILTERING ||============================== //

export default function WorkingListTable() {
  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      {
        header: 'PID',
        footer: 'PID',
        accessorKey: 'code',
        minWidth: '80px',
        maxWidth: '80px'
      },
      {
        header: 'Assigned to',
        footer: 'Assigned to',
        accessorKey: 'specialist',
        minWidth: '120px'
      },
      {
        header: 'Encounter Date',
        footer: 'Encounter Date',
        accessorKey: 'encounter_date',
        minWidth: '150px',
        filterFn: fuzzyFilter,
        sortingFn: fuzzySort
      },
      {
        header: 'Patient Age',
        footer: 'Patient Age',
        accessorKey: 'demographics.patient_age'
        // meta: {
        //   className: 'cell-right'
        // }
      },
      {
        header: 'Patient Gender',
        footer: 'Patient Gender',
        accessorKey: 'demographics.patient_gender',
        minWidth: '150px'
        // meta: {
        //   className: 'cell-right'
        // }
      },
      {
        header: 'Manual Pirorty',
        footer: 'Manual Pirorty',
        accessorKey: 'manual_priority',
        minWidth: '150px'
        // meta: {
        //   className: 'cell-right'
        // }
      },
      {
        header: 'Total Cost',
        footer: 'Total Cost',
        accessorKey: 'total_cost'
        // meta: {
        //   className: 'cell-right'
        // }
      },
      {
        header: 'Flags',
        footer: 'Flags',
        accessorKey: 'flags_count'
        // meta: {
        //   className: 'cell-right'
        // }
      },
      {
        header: 'Status',
        footer: 'Status',
        accessorKey: 'status',
        cell: (props) => {
          switch (props.getValue()) {
            case 'Not Reviewed':
              return <Chip color="error" label="Not Reviewed" size="small" variant="light" />;
            case 'Pending Query':
              return <Chip color="success" label="Pending Query" size="small" variant="light" />;

            default:
              return <Chip color="info" label={props.getValue()} size="small" variant="light" />;
          }
        }
      },
      {
        header: 'Physician',
        footer: 'Physician',
        accessorKey: 'phyicisian_name'
        // cell: (props) => <LinearWithLabel value={props.getValue()} sx={{ minWidth: 75 }} />
      },
      {
        header: 'Speciallity',
        footer: 'Speciallity',
        accessorKey: 'specialist_name'
      },
      {
        header: 'Facility',
        footer: 'Facility',
        accessorKey: 'facility_name'
      },
      {
        id: 'view',
        header: 'Action',
        hidden: false,
        cell: ({ row }) => {
          return (
            <Link to={`/work-list/${row.original.id}`}>
              <Button variant="contained">View</Button>
            </Link>
          );
        }
      }
    ],
    []
  );

  return <ReactTable {...{ columns }} />;
}

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array };
