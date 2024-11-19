import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import CurrencyFormat from '@/components/ui/currency-format';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { Invoice } from '@/modules/Invoices/services/invoices.type';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'invoiceId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div>{row.getValue('invoiceId')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'sender',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sender" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-[#858584] text-white uppercase text-xs">
            {row.getValue('sender')}
          </AvatarFallback>
        </Avatar>
        {row.getValue('sender')}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
        className="text-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-end">{row.getValue('createdAt')}</div>
    ),
  },
  {
    accessorKey: 'amount',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="text-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-end">
        <CurrencyFormat amount={row.getValue('amount')} />
      </div>
    ),
  },
  {
    accessorKey: 'status',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Badge>{row.getValue('status')}</Badge>
      </div>
    ),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
