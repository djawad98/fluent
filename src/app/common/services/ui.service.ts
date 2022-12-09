import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { ApiService } from './api.service';


export type Transaction = {
  date: Date,
  description: string,
  amount: number,
  isPaid: boolean,
}


export type Bank = {
  id: number,
  label: string,
  balance: number,
}

@Injectable({
  providedIn: 'root'
})
export class UiService {

  transactions: Observable<Transaction[]> = this.apiService.getTransactions();
  banks: Observable<Bank[]> = this.apiService.getBanks();
  remaining!: Observable<number>;


  constructor(private apiService: ApiService) {
    this.calculateRemaining(this.transactions,this.banks);
  }

  onBankChange(bank: Bank){
    const changedBanks = this.banks.pipe(map(banks => {
      return banks.map(b => {
        if(b.id = bank.id){
          b.balance = bank.balance
        }
        return b;
      })
    }))

    this.calculateRemaining(this.transactions,changedBanks)
  }

  calculateRemaining(transactions: Observable<Transaction[]>, banks: Observable<Bank[]>) {
    this.remaining = combineLatest([transactions, banks])
      .pipe(map(([transactions, banks]) => {
        const sumNotPaidTransactions = transactions.filter(t => !t.isPaid).map(t => t.amount).reduce((res, curr) => res + curr, 0);
        const sumBankBalance = banks.map(t => t.balance).reduce((res, curr) => res + curr, 0);
        return sumBankBalance - sumNotPaidTransactions;
      }))
  }


}
