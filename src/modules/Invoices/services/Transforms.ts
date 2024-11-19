import { INVOICE_TYPES } from '@/modules/Invoices/services/constants/invoices.constants';
import { Invoice } from '@/modules/Invoices/services/invoices.type';

export const InvoiceListTransform = (invoices: Invoice[]) =>
  invoices.map((inv) => ({
    ...inv,
    invoiceId: `INV-${inv.seqId}`,
    to: inv?.to?.email ?? '',
    from: inv?.from?.email ?? '',
    contactSender:
      inv.type === INVOICE_TYPES.GENERATED ? inv.to?.email : inv.from?.email,
  }));
