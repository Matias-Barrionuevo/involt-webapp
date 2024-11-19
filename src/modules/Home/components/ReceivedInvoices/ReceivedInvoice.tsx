import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/modules/Home/components/ReceivedInvoices/Columns';
import { getReceivedInvoices } from '@/modules/Invoices/services/invoices.service';

const ReceivedInvoice = () => {
  return (
    <DataTable
      columns={columns}
      query={getReceivedInvoices}
      queryKey={['invoice-received']}
      showPagination={false}
    />
  );
};

export default ReceivedInvoice;
