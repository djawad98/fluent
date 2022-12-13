import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, combineLatest, finalize, map, Observable, of, tap } from 'rxjs';
import { Bank, FormValue, Transaction } from '../app.model';
import { State } from '../state.model';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class UiService {

  transactions$ = new State<Transaction[]>();
  banks$ = new State<Bank[]>();
  remaining$ = new State<number>();

  formLoading$ = new State<boolean>();

  get formLoading() {
    return this.formLoading$.get();
  }


  constructor(private stateService: StateService, private router: Router) {
    this.formLoading$.set(of(false))
  }

  getTransactions(reset = false) {
    return this.stateService.getTransactions(reset).pipe(map(response => {
      if (!response.error) {
        return response.data
      }
      throw undefined;
    }))
  }

  getBanks(reset = false) {
    return this.stateService.getBanks(reset).pipe(
      map(response => {
        if (!response.error) {
          return response.data
        }
        throw undefined;
      })
    )
  }


  get remaining() {
    return this.remaining$.get()
  }


  calculateRemaining() {
    this.remaining$.set(combineLatest([this.getTransactions(), this.getBanks()])
      .pipe(map(([transactions, banks]) => {
        const sumNotPaidTransactions = transactions.filter(t => !t.isPaid).map((t: Transaction) => t.amount).reduce((res: number, curr: number) => res + curr, 0);
        const sumBankBalance = banks.map(t => t.balance).reduce((res: number, curr: number) => res + curr, 0);
        return sumBankBalance - sumNotPaidTransactions;
      })))

  }

  onBankChange(bank: Bank) {

    this.banks$.set(this.getBanks().pipe(map(banks => {
      return banks.map(b => {
        if (b.id === bank.id) {
          b.balance = +bank.balance;
        }
        return b;
      });

    })))

    this.calculateRemaining()
  }

  onPaidChange(transaction: Transaction) {

    this.transactions$.set(this.getTransactions().pipe(map(transactions => {
      return transactions.map(t => {
        if (t.id === transaction.id) {
          t.isPaid = transaction.isPaid;
        }
        return t;
      });
    })))

    this.calculateRemaining()
  }


  addItem(data: FormValue) {
    this.formLoading$.set(of(true))
    return this.stateService.addItem(data).pipe(
      tap((response) => {
        if(response.status >= 200 && response.status < 300){
          this.router.navigate(['/'], { state: { shouldResetTransactions: true } })
        } else {
          alert(response.error?.message)
        }
      }),
      finalize(() => {
        this.formLoading$.set(of(false))
      }),
      
      )
  }

  editItem(data: FormValue) {
    this.formLoading$.set(of(true))
    return this.stateService.editItem(data).pipe(
      tap((response) => {
        if(response.status >= 200 && response.status < 300){
          this.router.navigate(['/'], { state: { shouldResetTransactions: true } })
        } else {
          alert(response.error?.message)
        }
      }),
      finalize(() => {
        this.formLoading$.set(of(false))
      }))
  }

}
