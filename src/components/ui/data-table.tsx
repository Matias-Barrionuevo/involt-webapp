import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
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
import { Skeleton } from '@/components/ui/skeleton';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  query: (params?: {
    pagination?: PaginationState;
    sorting?: SortingState;
    columnFilters?:
      | ColumnFiltersState
      | {
          id: string;
          value: unknown[] | null;
        }[];
    globalFilter?: string;
  }) => Promise<{ data: { data: TData[]; total: number } }>;
  queryKey: string[];
  showPagination?: boolean;
  pageSize?: number;
  showSearch?: boolean;
  searchPlaceholder?: string;
  filterableColumns?: {
    id: keyof TData;
    multipleFilter?: boolean;
    title: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
}

const dataFallback: any = [];

export function DataTable<TData, TValue>({
  columns,
  query,
  queryKey,
  showPagination = true,
  pageSize = 5,
  filterableColumns,
  showSearch = true,
  searchPlaceholder = '',
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState<string>('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const { data, isLoading } = useCustomQuery(query, {
    queryKey: [...queryKey, pagination, sorting, columnFilters, globalFilter],
    params: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const table = useReactTable({
    data: data?.data ?? dataFallback,
    columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      pagination,
      globalFilter,
    },
    enableRowSelection: true,
    manualPagination: true,
    manualFiltering: true,
    enableGlobalFilter: true,
    pageCount: Math.ceil((data?.total || 0) / pagination.pageSize),
    onGlobalFilterChange: setGlobalFilter,
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

  const TableSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: pageSize }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );

  return (
    <div className="space-y-4 py-4">
      {(filterableColumns || showSearch) && (
        <DataTableToolbar
          table={table}
          filterableColumns={filterableColumns}
          searchPlaceholder={searchPlaceholder}
        />
      )}
      {isLoading ? (
        <div>
          <TableSkeleton />
        </div>
      ) : (
        <div className="rounded-md border w-full">
          <div className="relative max-h-[300px] md:max-h-[500px] lg:max-h-[650px] w-full overflow-auto">
            <Table className="min-w-full w-full">
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
                        <TableCell key={cell.id} className="whitespace-nowrap">
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
      )}
      {showPagination && !isLoading && (
        <DataTablePagination table={table} total={data?.total} />
      )}
    </div>
  );
}
