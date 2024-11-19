import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/modules/Home/components/PendingInvoices/Columns';
import { getPendingInvoices } from '@/modules/Invoices/services/invoices.service';

const PendingInvoice = () => {
  return (
    <DataTable
      columns={columns}
      query={getPendingInvoices}
      queryKey={['invoice-pending']}
      showPagination={false}
    />
  );
};

export default PendingInvoice;
