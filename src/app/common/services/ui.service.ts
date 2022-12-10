import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { State } from '../state.model';
import { ApiService } from './api.service';


export type Transaction = {
  id: number,
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

export interface FormValue {
  date: Date,
  description: string,
  amount: number,
  isPaid: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class UiService {

  transactions$ = new State<Transaction[]>();
  banks$ = new State<Bank[]>();
  remaining$ = new State<number>();

  get transactions(){
    return this.transactions$.get()
  }

  get banks(){
    return this.banks$.get()
  }

  get remaining(){
    return this.remaining$.get()
  }

  constructor(private apiService: ApiService) {
    this.transactions$.set(this.apiService.getTransactions())
    this.banks$.set(this.apiService.getBanks())

    this.calculateRemaining()
  }

  calculateRemaining(){
    this.remaining$.set(combineLatest([this.transactions, this.banks])
    .pipe(map(([transactions, banks]) => {
      const sumNotPaidTransactions = transactions.filter(t => !t.isPaid).map(t => t.amount).reduce((res, curr) => res + curr, 0);
      const sumBankBalance = banks.map(t => t.balance).reduce((res, curr) => res + curr, 0);
      return sumBankBalance - sumNotPaidTransactions;
    })))

  }

  onBankChange(bank: Bank){
    
    this.banks$.set(this.banks.pipe(map(banks => {
      return banks.map(b => {
        if(b.id === bank.id){
          b.balance = +bank.balance;
        }
        return b;
      });

    })))

    this.calculateRemaining()
  }

  onPaidChange(transaction: Transaction){
    
    this.transactions$.set(this.transactions.pipe(map(transactions => {
      return transactions.map(t => {
        if(t.id === transaction.id){
          t.isPaid = transaction.isPaid;
        }
        return t;
      });
    })))

    this.calculateRemaining()
  }


  addItem(data: FormValue){
    this.apiService.addItem(data)
  }

  editItem(data: FormValue){
    this.apiService.editItem(data)
  }

}
