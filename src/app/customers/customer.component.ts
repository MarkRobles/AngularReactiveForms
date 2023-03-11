import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl} from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customer = new Customer();

  constructor() { }

  firstName = new FormControl;
  lastName = new FormControl;
  email = new FormControl;
  sendCatalog = new FormControl(true);


  ngOnInit()   {
    this.customerForm = new FormGroup(
      {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        sendCatalog: this.sendCatalog
      }
    );
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
}
