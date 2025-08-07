export interface StockFinancialStatements {
  fiscalDateEnding: string;
  reportedCurrency: string;
  grossProfit: number;
  totalRevenue: number;
  costOfRevenue: number;
  costofGoodsAndServicesSold: number;
  operatingIncome: number;
  sellingGeneralAndAdministrative: number;
  researchAndDevelopment: number;
  operatingExpenses: number;
  investmentIncomeNet: string | null;
  netInterestIncome: number;
  interestIncome: number;
  interestExpense: number;
  nonInterestIncome: string | null;
  otherNonOperatingIncome: string | null;
  depreciation: string | null;
  depreciationAndAmortization: number;
  incomeBeforeTax: number;
  incomeTaxExpense: number;
  interestAndDebtExpense: string | null;
  netIncomeFromContinuingOperations: number;
  comprehensiveIncomeNetOfTax: string | null;
  ebit: number;
  ebitda: number;
  netIncome: number;
}
