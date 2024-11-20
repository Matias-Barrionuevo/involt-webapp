import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneratedInvoices from '@/modules/Invoices/components/List/Generated/GeneratedInvoices';
import { Plus } from 'lucide-react';

const InvoicesGeneratedPage = () => {
  return (
    <section className="h-full w-full px-8 py-4 mt-2 shadow-lg border rounded-3xl">
      <main>
        <Tabs defaultValue="generated-invoice">
          <TabsList className="gap-6 bg-transparent justify-between border-border w-full">
            <TabsTrigger value="generated-invoice">Generated</TabsTrigger>
            <Button className="">
              <Plus></Plus>
              New Invoice
            </Button>
          </TabsList>
          <TabsContent value="generated-invoice">
            <GeneratedInvoices />
          </TabsContent>
        </Tabs>
      </main>
    </section>
  );
};

export default InvoicesGeneratedPage;
