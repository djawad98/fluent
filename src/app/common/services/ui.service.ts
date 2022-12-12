import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, finalize, map, Observable, of, tap } from 'rxjs';
import { Bank, FormValue, Transaction } from '../app.model';
import { State } from '../state.model';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class UiService {

  transactions$ = new State<Transaction[]>();
  banks$ = new State<Bank[]>();
  remaining$ = new State<number>();

  formLoading$ = new State<boolean>();

  get formLoading(){
    return this.formLoading$.get();
  }

  
  constructor(private apiService: ApiService, private router: Router) {
    this.calculateRemaining()
    this.formLoading$.set(of(false))
  }

  transactions = this.apiService.getTransactions().pipe(map(response => {
    if(!response.error){
      return response.data
    }
    throw undefined;
  }))

  banks = this.apiService.getBanks().pipe(map(response => {
    if(!response.error){
      return response.data
    }
      throw undefined;
  }))


  get remaining(){
    return this.remaining$.get()
  }


  calculateRemaining(){
    // this.remaining$.set(combineLatest([this.transactions, this.banks])
    // .pipe(map(([transactions, banks]) => {
    //   const sumNotPaidTransactions = transactions.filter(t => !t.isPaid).map((t: Transaction) => t.amount).reduce((res: number, curr:number) => res + curr, 0);
    //   const sumBankBalance = banks.map(t => t.balance).reduce((res: number, curr: number) => res + curr, 0);
    //   return sumBankBalance - sumNotPaidTransactions;
    // })))

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
    this.formLoading$.set(of(true))
    return this.apiService.addItem(data).pipe(
      tap(() => {
        this.router.navigate(['/'])
      }),
      finalize(() => {
      this.formLoading$.set(of(false))
    }))
  }

  editItem(data: FormValue){
    this.formLoading$.set(of(true))
    return this.apiService.editItem(data).pipe(
      tap(() => {
        this.router.navigate(['/'])
      }),
      finalize(() => {
      this.formLoading$.set(of(false))
    }))
  }

}
