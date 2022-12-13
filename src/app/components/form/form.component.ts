import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { en_US, NzI18nService, fa_IR } from 'ng-zorro-antd/i18n';
import { FormValue, Transaction } from 'src/app/common/app.model';
import { UiService } from 'src/app/common/services/ui.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  myform = new FormGroup({
    description: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    isPaid: new FormControl(false),
  })

  isEditMode = false;
  editableItemId:number = -1;

  isFormLoading = this.uiService.formLoading;

  constructor(private i18n: NzI18nService, private route: ActivatedRoute, private uiService: UiService) {
    this.i18n.setLocale(en_US)
    if (Object.keys(history.state).length > 1) {
      this.isEditMode = true;
      const editableItem = history.state as Transaction;
      this.editableItemId = editableItem.id;
      this.descriptionControl?.patchValue(editableItem.description)
      this.amountControl?.patchValue(editableItem.amount)
      this.isPaidControl?.patchValue(editableItem.isPaid)
      this.dateControl?.patchValue(new Date(editableItem.date))
    } else {
      this.isEditMode = false;
    }
  }

  submitForm() {
    if (this.isEditMode) {
      this.editItem()
    } else {
      this.addItem();
    }
  }

  get descriptionControl() {
    return this.myform.get('description')
  }

  get amountControl() {
    return this.myform.get('amount')
  }

  get dateControl() {
    return this.myform.get('date')
  }

  get isPaidControl() {
    return this.myform.get('isPaid')
  }

  isFormValid() {
    return true;
  }

  addItem() {

    if (this.isFormValid()) {

      const data = {
        description: this.descriptionControl?.value,
        amount: this.amountControl?.value,
        date: this.dateControl?.value,
        isPaid: this.isPaidControl?.value,
      } as FormValue;
      this.uiService.addItem(data).subscribe()
    }

  }

  editItem() {
    if (this.isFormValid()) {

      const data = {
        description: this.descriptionControl?.value,
        amount: this.amountControl?.value,
        date: this.dateControl?.value,
        isPaid: this.isPaidControl?.value,
        id: this.editableItemId
      } as FormValue;
      this.uiService.editItem(data).subscribe()
    }
  }


}
