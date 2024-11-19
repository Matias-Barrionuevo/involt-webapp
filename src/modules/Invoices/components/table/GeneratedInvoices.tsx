import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/modules/Invoices/components/table/Columns';
import { INVOICES_STATUS } from '@/modules/Invoices/services/constants/invoices.constants';
import { getGeneratedInvoices } from '@/modules/Invoices/services/invoices.service';

const GeneratedInvoices = () => {
  return (
    <DataTable
      columns={columns}
      query={getGeneratedInvoices}
      queryKey={['invoice-generated']}
      pageSize={10}
      filterableColumns={[
        {
          id: 'status',
          multipleFilter: false,
          title: 'Status',
          options: [
            { label: INVOICES_STATUS.PENDING, value: INVOICES_STATUS.PENDING },
            {
              label: INVOICES_STATUS.REJECTED,
              value: INVOICES_STATUS.REJECTED,
            },
            { label: INVOICES_STATUS.PAID, value: INVOICES_STATUS.PAID },
            { label: INVOICES_STATUS.VOIDED, value: INVOICES_STATUS.VOIDED },
          ],
        },
      ]}
    />
  );
};

export default GeneratedInvoices;
