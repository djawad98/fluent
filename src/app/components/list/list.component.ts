import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse, Bank, Transaction } from 'src/app/common/app.model';
import { UiService } from 'src/app/common/services/ui.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(private uiService: UiService, private router: Router){}


  transactions = this.uiService.transactions;
  banks = this.uiService.banks;
  remaining = this.uiService.remaining;

  ngOnInit(){
    this.uiService.getBanks()
    this.uiService.getTransactions(history.state.shouldResetTransactions);
    this.uiService.calculateRemaining()
  }

  editItem(item: Transaction){
    this.router.navigate(['edit'],{state: item})
  }

  onBankChange(bank: Bank){
    this.uiService.onBankChange(bank)
  }

  onPaidChange(transaction: Transaction){
    this.uiService.onPaidChange(transaction).subscribe()
  }
}
