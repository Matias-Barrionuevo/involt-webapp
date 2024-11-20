import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/modules/Home/components/GeneratedInvoices/Columns';
import { getGeneratedInvoices } from '@/modules/Invoices/services/invoices.service';

const GeneratedInvoice = () => {
  return (
    <DataTable
      columns={columns}
      query={getGeneratedInvoices}
      queryKey={['invoice-generated']}
      showSearch={false}
      showPagination={false}
    />
  );
};

export default GeneratedInvoice;
