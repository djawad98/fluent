import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable, of, tap } from 'rxjs';


import { createClient, PostgrestResponse } from '@supabase/supabase-js'
import { ApiResponse, Bank, BankDto, convertApiResponse, FormValue, toBank, toTransaction, Transaction, TransactionDto } from '../app.model';
import { convertToParamMap } from '@angular/router';

const supabaseUrl = 'https://njxjryiegvgdijjllzvl.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qeGpyeWllZ3ZnZGlqamxsenZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA3NDIzMzMsImV4cCI6MTk4NjMxODMzM30.0WQdQl3ZxVDgtTDEbNy-oVAgEfE9-tDvY7kC66pM7B8";
const supabase = createClient(supabaseUrl, supabaseKey)


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  mockedTransactions = of([
    {
      id: 0,
      created_at: '',
      description: 'بابت بدهی به خاله',
      amount: 100000,
      isPaid: false,
    },
    {
      id: 1,
      created_at: '',
      description: 'قسط دندانپزشکی',
      amount: 600000,
      isPaid: true,
    },
  ])

  constructor() {}

  getTransactions(): Observable<ApiResponse<Transaction>> {
    return from(supabase.from('items').select('*').order('created_at')).pipe(map((response: ApiResponse<TransactionDto>) => {

      return convertApiResponse<TransactionDto,Transaction>(response, toTransaction)

      
    }))
    // return this.mockedTransactions;
  }

  getBanks(): Observable<ApiResponse<Bank>> {
    return from(supabase.from('banks').select('*')).pipe(map((response: ApiResponse<BankDto>) => {
      return convertApiResponse<BankDto,Bank>(response, toBank)
    }))
    
    // return of([
    //   {
    //     id: 0,
    //     label: 'ملی',
    //     balance: 100000,
    //   },
    //   {
    //     id: 1,
    //     label: 'آینده',
    //     balance: 2000000,
    //   },
    // ]);

  }


  addItem(data: FormValue) {
    console.log('asdfasdf')
    return from(supabase
      .from('items')
      .insert([
        { description: data.description, isPaid: data.isPaid, amount: data.amount },
      ])).pipe(map((response: PostgrestResponse<any>) => {
        return response.data;
      }))

    return this.mockedTransactions.pipe(map(transactions => {
      transactions.push({
        id: Math.floor(Math.random() * 100),
        created_at: data.date.toString(),
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
        created_at: data.date.toString(),
        description: data.description,
        amount: data.amount,
        isPaid: data.isPaid,
      })
      return transactions
    }))
  }
}
