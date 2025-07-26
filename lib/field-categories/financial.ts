import { FieldCategory } from "../types";

export const financial: FieldCategory = {
  name: "Financial",
  icon: "DollarSign",
  fields: [
    { id: "accountNumber", label: "Account Number", type: "string", example: "1234567890" },
    { id: "accountType", label: "Account Type", type: "string", example: "Savings" },
    { id: "bankName", label: "Bank Name", type: "string", example: "Chase Bank" },
    { id: "routingNumber", label: "Routing Number", type: "string", example: "021000021" },
    { id: "balance", label: "Balance", type: "number", example: "5000.00" },
    { id: "creditScore", label: "Credit Score", type: "number", example: "750" },
    { id: "creditLimit", label: "Credit Limit", type: "number", example: "10000" },
    { id: "currency", label: "Currency", type: "string", example: "USD" },
    { id: "taxId", label: "Tax ID", type: "string", example: "12-3456789" },
    { id: "investmentType", label: "Investment Type", type: "string", example: "Stocks" },
    { id: "portfolioValue", label: "Portfolio Value", type: "number", example: "100000" },
    { id: "mortgageAmount", label: "Mortgage Amount", type: "number", example: "300000" },
    { id: "loanType", label: "Loan Type", type: "string", example: "Personal" },
    { id: "interestRate", label: "Interest Rate", type: "number", example: "3.5" },
    { id: "paymentMethod", label: "Payment Method", type: "string", example: "Credit Card" }
  ]
};