import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneratedInvoice from '@/modules/Home/components/GeneratedInvoices/GeneratedInvoice';

const HomePage = () => {
  return (
    <section className="h-full w-full p-8 shadow-lg rounded-3xl">
      <header>
        <h6>Recent Activity</h6>
      </header>
      <main className="py-6">
        <Tabs defaultValue="generated-invoice">
          <TabsList className="gap-6 bg-transparent  border-border">
            <TabsTrigger value="generated-invoice">
              Generated Invoices
            </TabsTrigger>
            <TabsTrigger value="received-invoice">
              Received Invoices
            </TabsTrigger>
            <TabsTrigger value="pending-invoice">Pending Invoices</TabsTrigger>
          </TabsList>
          <TabsContent value="generated-invoice">
            <GeneratedInvoice />
          </TabsContent>
          <TabsContent value="received-invoice"></TabsContent>
          <TabsContent value="pending-invoice"></TabsContent>
        </Tabs>
      </main>
    </section>
  );
};

export default HomePage;
