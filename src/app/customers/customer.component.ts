import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder} from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customer = new Customer();

  constructor(private fb: FormBuilder) { }

  // firstName = new FormControl;
  // lastName = new FormControl;
  // email = new FormControl;
  // sendCatalog = new FormControl(true);


  ngOnInit() {
    //Here we use FormBuilder service to shorten the sintaxis. Now you don´t have to initalize FormGroup and FormControl. FormBuilder do it for you.
    this.customerForm = this.fb.group({
      firstName: '',
      lastName: '',
     // lastName: { value: 'n/a', disabled: true },//different way of initialize
      email: '',
      sendCatalog:true
    });

//Formgroup approach
    // this.customerForm = new FormGroup(
    //   {
    //     firstName: this.firstName,
    //     lastName: this.lastName,
    //     email: this.email,
    //     sendCatalog: this.sendCatalog
    //   }
    // );
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
