import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { en_US, NzI18nService, fa_IR } from 'ng-zorro-antd/i18n';
import { FormValue } from 'src/app/common/app.model';
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

  isFormLoading = this.uiService.formLoading;

  constructor(private i18n: NzI18nService, private route: ActivatedRoute, private uiService: UiService) {
    this.i18n.setLocale(en_US)

    // this.route.data.subscribe(console.log)
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

  addItem() {
    // console.log(this.descriptionControl && this.descriptionControl.dirty,
    //   this.amountControl && !this.amountControl?.dirty,
    //   this.dateControl && !this.dateControl.dirty,
    //   this.isPaidControl && !this.isPaidControl.dirty)
    // if (
    //   this.descriptionControl && !this.descriptionControl.dirty &&
    //   this.amountControl && !this.amountControl?.dirty &&
    //   this.dateControl && !this.dateControl.dirty &&
    //   this.isPaidControl && !this.isPaidControl.dirty
    // ) {

      const data = {
        description: this.descriptionControl?.value,
        amount: this.amountControl?.value,
        date: this.dateControl?.value,
        isPaid: this.isPaidControl?.value,
      } as FormValue;
      this.uiService.addItem(data).subscribe()
    // }

  }

  editItem() {
    if (
      this.descriptionControl?.value &&
      this.amountControl?.value &&
      this.dateControl?.value &&
      this.isPaidControl?.value
    ) {

      const data = {
        description: this.descriptionControl?.value,
        amount: this.amountControl?.value,
        date: this.dateControl?.value,
        isPaid: this.isPaidControl?.value,
      }
      this.uiService.editItem(data)
    }

  }
}