import { Component, OnInit } from '@angular/core';
import { createMask } from '@ngneat/input-mask';
import { of } from 'rxjs';
import { ApiService } from './common/services/api.service';
import { Bank, UiService } from './common/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UiService, ApiService]
})
export class AppComponent implements OnInit {

  constructor(private uiService: UiService){}

  ayande = 10000;
  melli = 25000;

  currencyInputMask = createMask({
    rightAlign: false,
    alias: 'numeric',
    groupSeparator: ',',
    // digits: 0,
    // digitsOptional: false,
    // prefix: '$ ',
    placeholder: '0',
  });


  transactions = this.uiService.transactions;
  banks = this.uiService.banks;
  remaining = this.uiService.remaining;

  ngOnInit(){}

  onBankChange(bank: Bank){
    this.uiService.onBankChange(bank)
  }

}
