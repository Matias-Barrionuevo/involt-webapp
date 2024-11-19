import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: {
    id: keyof TData;
    title: string;
    multipleFilter?: boolean;
    options: {
      label: string;
      value: string;
    }[];
  }[];
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchValue, setSearchValue] = useState<string>('');

  // Debounce function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Apply debounce to setGlobalFilter
  const debouncedSetGlobalFilter = useMemo(
    () => debounce((value: string) => table.setGlobalFilter(value), 500),
    [table]
  );

  // Update global filter when searchValue changes
  useEffect(() => {
    debouncedSetGlobalFilter(searchValue);
  }, [searchValue, debouncedSetGlobalFilter]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filterableColumns.map(({ id, multipleFilter, title, options }) => {
          const column = table.getColumn(id as string);
          return (
            column && (
              <DataTableFacetedFilter
                key={id as string}
                multipleFilter={multipleFilter}
                column={column}
                title={title}
                options={options}
              />
            )
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setSearchValue('');
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}
