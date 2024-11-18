import { Invoice } from '@/modules/Invoices/services/invoices.type';

export const InvoiceListTransform = (invoices: Invoice[]) =>
  invoices.map((inv) => ({
    ...inv,
    invoiceId: `INV-${inv.seqId}`,
    contact: inv.from.email,
  }));
