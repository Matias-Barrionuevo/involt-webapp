import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCustomQuery } from '@/hooks/useCustomQuery';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  query: (params: {
    page: number;
    pageSize: number;
    sorting: SortingState;
    filters: ColumnFiltersState;
  }) => Promise<{ data: TData[]; pageCount: number }>;
  showPagination?: boolean;
  pageSize?: number;
  filterableColumns?: {
    id: keyof TData;
    title: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
}

const dataE = [];

export function DataTable<TData, TValue>({
  columns,
  query,
  showPagination = true,
  pageSize = 5,
  filterableColumns,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const { data, isLoading } = useCustomQuery(query, {
    queryKey: ['invoices-generated'],
    params: {
      limit: '5',
      orderBy: '-createdAt',
      filter: 'generated',
    },
  });

  const table = useReactTable({
    data: data?.data ?? dataE,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    manualPagination: true,
    pageCount: Math.ceil(data?.total ?? 0 / pageSize),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4 py-4">
      {filterableColumns && (
        <DataTableToolbar table={table} filterableColumns={filterableColumns} />
      )}
      <div className="rounded-md border w-full">
        <div className="relative max-h-[500px] w-full overflow-y-auto overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="whitespace-nowrap rounded-md"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {showPagination && <DataTablePagination table={table} />}
    </div>
  );
}
