import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ApiService } from './common/services/api.service';
import { Bank, Transaction, UiService } from './common/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UiService, ApiService]
})
export class AppComponent implements OnInit {

  constructor(private uiService: UiService){}


  transactions = this.uiService.transactions;
  banks = this.uiService.banks;
  remaining = this.uiService.remaining;

  ngOnInit(){}

  onBankChange(bank: Bank){
    this.uiService.onBankChange(bank)
  }

  onPaidChange(transaction: Transaction){
    this.uiService.onPaidChange(transaction)
  }

}
