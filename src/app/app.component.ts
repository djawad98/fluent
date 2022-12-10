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
export class AppComponent {


}
