import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';

export interface Invoice {
  id: string;
  from: From;
  to: To;
  reminderAttempts: ReminderAttempts;
  status: string;
  version: string;
  paymentDetails: PaymentDetail[];
  amount: number;
  asset: string;
  description: string;
  comments: Comment[];
  items: Item[];
  dueDate: string;
  hash: string;
  createdAt: string;
  updatedAt: string;
  seqId: string;
  type: string;
  withdrawDetails?: WithdrawDetails;
}

interface WithdrawDetails {
  default: boolean;
  alias: string;
  type: string;
  asset: string;
  details: Details;
  updatedAt: string;
  createdAt: string;
  id: string;
}

interface Details {
  address: string;
  destination: string;
  assetName: string;
  assetShortName: string;
  assetGroup: string;
  network: string;
}

interface Item {
  total: number;
  quantity: number;
  price: number;
  name: string;
}

interface Comment {
  description: string;
  date: string;
}

interface PaymentDetail {
  kind: string;
}

interface ReminderAttempts {
  attempts: number;
}

interface To {
  extra: Extra;
  email: string;
  name: string;
  kind: string;
  isPingUser: boolean;
  clientRelation: string;
}

interface Extra {
  role: string;
  industry: string;
  alias: string;
}

interface From {
  email: string;
  name: string;
  kind: string;
}

export interface ColumnFilter {
  id: string;
  value: unknown[] | null;
}

export interface GetInvoiceParams {
  pagination?: PaginationState;
  sorting?: SortingState;
  columnFilters?: ColumnFilter[] | ColumnFiltersState;
  globalFilter?: string;
}
