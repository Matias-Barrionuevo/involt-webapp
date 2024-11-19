import axiosInstance from '@/api/axiosInstance';
import { INVOICES_URL } from '@/api/services.constants';
import {
  INVOICE_TYPES,
  INVOICES_STATUS,
} from '@/modules/Invoices/services/constants/invoices.constants';
import { InvoiceListTransform } from '@/modules/Invoices/services/Transforms';
import { ColumnFiltersState } from '@tanstack/react-table';

export const getGeneratedInvoices = async (params: {
  limit: string;
  offset: string;
  orderBy: string;
  search: string;
  columnFilters: ColumnFiltersState;
  filter: string;
}): Promise<{ data: object }> => {
  console.log(params.columnFilters);

  const [columnFilter] = params.columnFilters;

  const { data, problem } = await axiosInstance.get(`${INVOICES_URL}`, {
    params: {
      limit: params.limit,
      orderBy: params.orderBy,
      filter: INVOICE_TYPES.GENERATED,
      status: columnFilter?.value?.[0],
    },
  });

  if (problem) {
    throw problem;
  }

  const result = InvoiceListTransform(data.invoices);

  return { data: { data: result, total: data.total } };
};

export const getReceivedInvoices = async (params: {
  limit: string;
  offset: string;
  orderBy: string;
  search: string;
  filterStatus: string;
  filter: string;
}): Promise<{ data: object }> => {
  const { data, problem } = await axiosInstance.get(`${INVOICES_URL}`, {
    params: { ...params, filter: INVOICE_TYPES.RECEIVED },
  });

  if (problem) {
    throw problem;
  }

  const result = InvoiceListTransform(data.invoices);

  return { data: { data: result, total: data.total } };
};

export const getPendingInvoices = async (params: {
  limit: string;
  offset: string;
  orderBy: string;
  search: string;
  columnFilters: [];
  filter: string;
}): Promise<{ data: object }> => {
  const { data, problem } = await axiosInstance.get(`${INVOICES_URL}`, {
    params: {
      ...params,
      status: INVOICES_STATUS.PENDING,
    },
  });

  if (problem) {
    throw problem;
  }

  const result = InvoiceListTransform(data.invoices);

  return { data: { data: result, total: data.total } };
};

// export const getGeneratedInvoices = async ({
//   limit,
//   offset,
//   orderBy = ORDER_BY,
//   search = '',
//   filterStatus,
// }) => {
//   const { data, problem } = await privateGet({
//     endpoint: INVOICES_URL,
//     params: {
//       filter: INVOICE_TYPES.GENERATED,
//       ...(limit && { limit }),
//       ...(offset && { offset }),
//       ...(search && { search }),
//       ...(filterStatus && { status: filterStatus }),
//       orderBy,
//     },
//   });

//   if (problem) {
//     throw problem;
//   }

//   const result = Transforms.InvoicesListTransform(
//     data?.invoices,
//     INVOICE_TYPES.GENERATED
//   );

//   const { total, totalByStatus } = Transforms.TotalInvoicesTransform(
//     data?.total,
//     data?.totalStatus
//   );

//   return {
//     invoices: result,
//     total,
//     totalPending: totalByStatus[INVOICES_STATUS.PENDING],
//     problem: null,
//   };
// };
