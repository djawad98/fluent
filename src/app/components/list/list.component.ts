import { Component } from '@angular/core';
import { Bank, Transaction } from 'src/app/common/app.model';
import { UiService } from 'src/app/common/services/ui.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(private uiService: UiService){}


  transactions = this.uiService.transactions;
  banks = this.uiService.banks;
  remaining = this.uiService.remaining;

  ngOnInit(){
  }

  onBankChange(bank: Bank){
    this.uiService.onBankChange(bank)
  }

  onPaidChange(transaction: Transaction){
    this.uiService.onPaidChange(transaction)
  }
}
