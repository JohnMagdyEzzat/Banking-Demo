export interface ITransaction {
  id: string;
  accountId: string;
  date: string;
  type: string;
  amount: number;
  merchant: string;
  category: string;
}

export const TransactionType = {
  // why api call if it is a static value?
  code: ['Debit', 'Credit'],
  label: ['Debit', 'Credit'],
};

export const TRANSACTIONCATEGORIESARRAY = [
  // why api call if it is a static value?
  'Groceries',
  'Bills',
  'Shopping',
  'Transfer',
  'Income',
  'Fees',
  'Entertainment',
];
