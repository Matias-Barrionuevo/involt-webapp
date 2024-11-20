import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PaidInvoices from '@/modules/Invoices/components/List/Paid/PaidInvoices';
import ReceivedInvoices from '@/modules/Invoices/components/List/Received/ReceivedInvoices';
import { Plus } from 'lucide-react';

const InvoicesReceivedPage = () => {
  return (
    <section className="h-full w-full px-8 py-4 mt-2 shadow-lg border rounded-3xl">
      <main>
        <Tabs defaultValue="received-received">
          <TabsList className="bg-transparent justify-between border-border w-full">
            <div className="flex gap-6">
              <TabsTrigger value="received-received">Received</TabsTrigger>
              <TabsTrigger value="received-paid">Paid</TabsTrigger>
            </div>
            <Button>
              <Plus></Plus>
              New Invoice
            </Button>
          </TabsList>
          <TabsContent value="received-received">
            <ReceivedInvoices />
          </TabsContent>
          <TabsContent value="received-paid">
            <PaidInvoices />
          </TabsContent>
        </Tabs>
      </main>
    </section>
  );
};

export default InvoicesReceivedPage;
