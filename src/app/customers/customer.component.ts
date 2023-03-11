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

  // populateTestData(): void {
  //   //setValue() requires we set the value of every form control. If you need to st just some control use patchValue()
  //   this.customerForm.setValue({
  //     firstName: 'Pepe ',
  //     lastName: 'Pecas',
  //     email: 'pepepecas@gmail.com',
  //     sendCatalog:false
  //   });
  // }
  
  populateTestData(): void {
    //setValue() requires we set the value of every form control. If you need to st just some control use setPatch
    this.customerForm.patchValue({
      firstName: 'Pepe ',
      lastName: 'Pecas',
      sendCatalog:false
    });
   }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
}