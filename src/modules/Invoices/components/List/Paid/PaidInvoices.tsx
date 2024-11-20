import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/modules/Invoices/components/List/Paid/Columns';
import { getReceivedPaidInvoices } from '@/modules/Invoices/services/invoices.service';

const PaidInvoices = () => {
  return (
    <DataTable
      columns={columns}
      query={getReceivedPaidInvoices}
      queryKey={['invoice-received', 'paid']}
      pageSize={10}
      searchPlaceholder="Search by name, email, number..."
    />
  );
};

export default PaidInvoices;
