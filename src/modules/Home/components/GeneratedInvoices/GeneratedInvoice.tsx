import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/modules/Home/components/GeneratedInvoices/Columns';
import { getInvoices } from '@/modules/Invoices/services/invoices.service';

const GeneratedInvoice = () => {
  const data = [
    {
      id: 'TASK-8782',
      title:
        "You can't compress the program without quantifying the open-source SSD pixel!",
      status: 'in progress',
      label: 'documentation',
      priority: 'medium',
    },
    {
      id: 'TASK-7878',
      title:
        'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
      status: 'backlog',
      label: 'documentation',
      priority: 'medium',
    },
    {
      id: 'TASK-7839',
      title: 'We need to bypass the neural TCP card!',
      status: 'todo',
      label: 'bug',
      priority: 'high',
    },
    {
      id: 'TASK-5562',
      title:
        'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
      status: 'backlog',
      label: 'feature',
      priority: 'medium',
    },
    {
      id: 'TASK-8686',
      title:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
      status: 'canceled',
      label: 'feature',
      priority: 'medium',
    },
  ];

  return (
    <DataTable columns={columns} query={getInvoices} showPagination={false} />
  );
};

export default GeneratedInvoice;
