import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Bank, Transaction } from './ui.service';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    // this.http.get<Transaction[]>()

    return of([
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
    ]);
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
}
