import { Component, inject, input, OnInit, output } from '@angular/core';
import { ITransaction } from '../interfaces/transactionInterface';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monthly-insights',
  imports: [CurrencyPipe],
  templateUrl: './monthly-insights.html',
  styleUrl: './monthly-insights.css',
})
export class MonthlyInsights implements OnInit {
  transactions = input.required<ITransaction[]>();
  back = output<void>();
  resultByMonth: {
    totals: Record<string, number>;
    highest: {
      category: string;
      value: number;
    };
    totalDebit: number;
    totalCredit: number;
    month: string;
  }[] = [];

  ngOnInit(): void {
    this.resultByMonth = Object.entries(this.getResultByMonth()).map(([month, data]) => ({
      month,
      ...data,
    }));
  }

  getResultByMonth() {
    return this.transactions().reduce(
      (acc, transaction) => {
        const dateObj = new Date(transaction.date);
        const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;

        // Ensure month bucket exists
        if (!acc[monthKey]) {
          acc[monthKey] = {
            totals: {} as Record<string, number>,
            highest: { category: '', value: 0 },
            totalDebit: 0,
            totalCredit: 0,
          };
        }

        if (transaction.type === 'Debit') {
          // Update debit sum
          acc[monthKey].totalDebit += transaction.amount;

          // Update category totals
          const newTotal = (acc[monthKey].totals[transaction.category] || 0) + transaction.amount;
          acc[monthKey].totals[transaction.category] = newTotal;

          // Update highest if needed
          if (newTotal > acc[monthKey].highest.value) {
            acc[monthKey].highest = { category: transaction.category, value: newTotal };
          }
        } else if (transaction.type === 'Credit') {
          // Update credit sum
          acc[monthKey].totalCredit += transaction.amount;
        }

        return acc;
      },
      {} as Record<
        string,
        {
          totals: Record<string, number>;
          highest: { category: string; value: number };
          totalDebit: number;
          totalCredit: number;
        }
      >,
    );
  }

  goBack() {
    this.back.emit();
  }
}
