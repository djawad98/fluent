import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, combineLatest, finalize, map, Observable, of, take, tap } from 'rxjs';
import { Bank, FormValue, Transaction } from '../app.model';
import { State } from '../state.model';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class UiService {

  private transactions$ = new State<Transaction[]>();
  private banks$ = new State<Bank[]>();
  private remaining$ = new State<number>();

  private formLoading$ = new State<boolean>();
  private isPaidChangeLoading$ = new State<boolean>();

  get formLoading() {
    return this.formLoading$.get();
  }

  get isPaidChangeLoading() {
    return this.isPaidChangeLoading$.get();
  }

  get banks(){
    return this.banks$.get();
  }

  get transactions(){
    return this.transactions$.get();
  }


  constructor(private stateService: StateService, private router: Router) {}

  getTransactions(reset = false) {
    this.transactions$.set(this.stateService.getTransactions(reset).pipe(map(response => {
      if (!response.error) {
        return response.data
      }
      throw undefined;
    })))
  }

  getBanks(reset = false) {
    this.banks$.set(this.stateService.getBanks(reset).pipe(
      map(response => {
        if (!response.error) {
          return response.data
        }
        throw undefined;
      })
    ))
  }


  get remaining() {
    return this.remaining$.get()
  }


  calculateRemaining() {
    this.remaining$.set(combineLatest([this.transactions$.get(), this.banks$.get()])
      .pipe(map(([transactions, banks]) => {
        const sumNotPaidTransactions = transactions.filter(t => !t.isPaid).map((t: Transaction) => t.amount).reduce((res: number, curr: number) => res + curr, 0);
        const sumBankBalance = banks.map(t => t.balance).reduce((res: number, curr: number) => res + curr, 0);
        return sumBankBalance - sumNotPaidTransactions;
      })))

  }

  onBankChange(bank: Bank) {

    this.banks$.set(this.banks$.get().pipe(map(banks => {
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

    transaction.isPaidLoading = true;
    return this.stateService.onPaidChange(transaction).pipe(
      map(response => {

        if (response.status >= 200 && response.status < 300) {
          this.transactions$.set(this.transactions$.get().pipe(take(1),map(transactions => {
            return transactions.map(t => {
              if (t.id === transaction.id) {
                t.isPaid = !t.isPaid;
              }
              return t;
            });
          })))

          this.calculateRemaining()

        } else {
          alert(response.error?.message)
        }
      }),
      finalize(() => {
        transaction.isPaidLoading = false;
      })
    )
  }


  addItem(data: FormValue) {
    this.formLoading$.set(of(true))
    return this.stateService.addItem(data).pipe(
      tap((response) => {
        if (response.status >= 200 && response.status < 300) {
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
        if (response.status >= 200 && response.status < 300) {
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
