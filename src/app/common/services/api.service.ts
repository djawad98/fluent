import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Bank, FormValue, Transaction } from './ui.service';
import { transCompatFormat } from 'ng-zorro-antd/date-picker';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  mockedTransactions = of([
    {
      id: 0,
      date: new Date(),
      description: 'بابت بدهی به خاله',
      amount: 100000,
      isPaid: false,
    },
    {
      id: 1,
      date: new Date(),
      description: 'قسط دندانپزشکی',
      amount: 600000,
      isPaid: true,
    },
  ])

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    // this.http.get<Transaction[]>()

    return this.mockedTransactions;
  }

  getBanks(): Observable<Bank[]> {

    return of([
      {
        id: 0,
        label: 'ملی',
        balance: 100000,
      },
      {
        id: 1,
        label: 'آینده',
        balance: 2000000,
      },
    ]);

  }


  addItem(data: FormValue) {
    return this.mockedTransactions.pipe(map(transactions => {
      transactions.push({
        id: Math.floor(Math.random() * 100),
        date: data.date,
        description: data.description,
        amount: data.amount,
        isPaid: data.isPaid,
      })
      return transactions
    }))
  }

  editItem(data: FormValue) {
    return this.mockedTransactions.pipe(map(transactions => {
      transactions.push({
        id: Math.floor(Math.random() * 100),
        date: data.date,
        description: data.description,
        amount: data.amount,
        isPaid: data.isPaid,
      })
      return transactions
    }))
  }
}
