import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/modules/Invoices/components/List/Received/Columns';
import { INVOICES_STATUS } from '@/modules/Invoices/services/constants/invoices.constants';
import { getReceivedInvoices } from '@/modules/Invoices/services/invoices.service';

const ReceivedInvoices = () => {
  return (
    <DataTable
      columns={columns}
      query={getReceivedInvoices}
      queryKey={['invoice-received']}
      pageSize={10}
      searchPlaceholder="Search by name, email, number..."
      filterableColumns={[
        {
          id: 'status',
          multipleFilter: false,
          title: 'Status',
          options: [
            { label: INVOICES_STATUS.PENDING, value: INVOICES_STATUS.PENDING },
            {
              label: INVOICES_STATUS.PROCESSING,
              value: INVOICES_STATUS.PROCESSING,
            },
            {
              label: INVOICES_STATUS.REJECTED,
              value: INVOICES_STATUS.REJECTED,
            },
            { label: INVOICES_STATUS.VOIDED, value: INVOICES_STATUS.VOIDED },
          ],
        },
      ]}
    />
  );
};

export default ReceivedInvoices;
