import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Bank, FormValue, Transaction } from '../app.model';
import { State } from '../state.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private apiService: ApiService) { }


  transactions$ = new State<ApiResponse<Transaction>>();
  getTransactions(reset = false): Observable<ApiResponse<Transaction>> {
    return this.transactions$.getWithResetCondition(reset, this.apiService.getTransactions())
  }

  banks$ = new State<ApiResponse<Bank>>();
  getBanks(reset = false): Observable<ApiResponse<Bank>> {
    return this.banks$.getWithResetCondition(reset, this.apiService.getBanks())
  }

  addItem(data: FormValue) {
    return this.apiService.addItem(data);
  }

  editItem(data: FormValue){
    return this.apiService.editItem(data)
  }
}
