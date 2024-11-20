import { INVOICE_TYPES } from '@/modules/Invoices/services/constants/invoices.constants';
import {
  GetInvoiceParams,
  Invoice,
} from '@/modules/Invoices/services/invoices.type';

export const InvoiceListTransform = (invoices: Invoice[]) =>
  invoices.map((inv) => ({
    ...inv,
    invoiceId: `INV-${inv.seqId}`,
    to: inv?.to?.email ?? '',
    from: inv?.from?.email ?? '',
    contactSender:
      inv.type === INVOICE_TYPES.GENERATED ? inv.to?.email : inv.from?.email,
  }));

export const InvoiceListParamsTransform = (params: GetInvoiceParams = {}) => {
  const { pagination, sorting = [], columnFilters = [], globalFilter } = params;

  const orderBy = `${sorting[0]?.desc ? '-' : ''}${sorting[0]?.id ?? ''}`;
  const status = (columnFilters as any)[0]?.value?.[0] ?? null;

  return {
    limit: pagination?.pageSize,
    offset: pagination?.pageIndex,
    ...(status && { status }),
    ...(orderBy && { orderBy }),
    ...(globalFilter && { search: globalFilter }),
  };
};
