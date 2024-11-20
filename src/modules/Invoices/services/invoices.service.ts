import axiosInstance, { CustomError } from '@/api/axiosInstance';
import { INVOICES_URL } from '@/api/services.constants';
import {
  INVOICE_TYPES,
  INVOICES_STATUS,
} from '@/modules/Invoices/services/constants/invoices.constants';
import { GetInvoiceParams } from '@/modules/Invoices/services/invoices.type';
import {
  InvoiceListParamsTransform,
  InvoiceListTransform,
} from '@/modules/Invoices/services/Transforms';

export const getGeneratedInvoices = async (
  params?: GetInvoiceParams
): Promise<{ data: any }> => {
  try {
    const paramsTransform = InvoiceListParamsTransform(params);
    const { data } = await axiosInstance.get(`${INVOICES_URL}`, {
      params: {
        ...paramsTransform,
        filter: INVOICE_TYPES.GENERATED,
      },
    });
    const result = InvoiceListTransform(data.invoices);

    return { data: { data: result, total: data.total } };
  } catch (error) {
    const customError = error as CustomError;

    throw customError;
  }
};

export const getReceivedInvoices = async (
  params?: GetInvoiceParams
): Promise<{ data: any }> => {
  try {
    const paramsTransform = InvoiceListParamsTransform(params);
    const { data } = await axiosInstance.get(`${INVOICES_URL}`, {
      params: { ...paramsTransform, filter: INVOICE_TYPES.RECEIVED },
    });

    const result = InvoiceListTransform(data.invoices);

    return { data: { data: result, total: data.total } };
  } catch (error) {
    const customError = error as CustomError;

    throw customError;
  }
};

export const getPendingInvoices = async (
  params?: GetInvoiceParams
): Promise<{ data: any }> => {
  try {
    const paramsTransform = InvoiceListParamsTransform(params);
    const { data } = await axiosInstance.get(`${INVOICES_URL}`, {
      params: {
        ...paramsTransform,
        status: INVOICES_STATUS.PENDING,
      },
    });

    const result = InvoiceListTransform(data.invoices);

    return { data: { data: result, total: data.total } };
  } catch (error) {
    const customError = error as CustomError;

    throw customError;
  }
};

export const getReceivedPaidInvoices = async (
  params?: GetInvoiceParams
): Promise<{ data: any }> => {
  try {
    const paramsTransform = InvoiceListParamsTransform(params);
    const { data } = await axiosInstance.get(`${INVOICES_URL}`, {
      params: {
        ...paramsTransform,
        filter: INVOICE_TYPES.RECEIVED,
        status: INVOICES_STATUS.PAID,
      },
    });

    const result = InvoiceListTransform(data.invoices);

    return { data: { data: result, total: data.total } };
  } catch (error) {
    const customError = error as CustomError;

    throw customError;
  }
};
