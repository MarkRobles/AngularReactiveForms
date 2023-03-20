import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, AbstractControlOptions,FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


import { Customer } from './customer';

function emailMatcher(c: AbstractControl): { [key: string]: boolean }| null{ 
  const emailCotrol = c.get('email');
  const confirmCotrol = c.get('confirmEmail');

  if (emailCotrol?.pristine || confirmCotrol?.pristine) { 
    return null;
  }

  if (emailCotrol?.value === confirmCotrol?.value) { 
    return null;
  }
  return {'match':true}


}

function ratingRange(min: number, max: number): ValidatorFn {//To add parameters to a custom validator function we wrap  it 

  return (c: AbstractControl): { [key: string]: boolean } | null => {//this is the custom validator fucntion, we return the function itself
    if (c.value != null && (isNaN(c.value) || c.value < min || c.value > max)) {

      return { 'range': true };
    } else
      return null;

  }
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customer = new Customer();
  emailMessage?: string;

  get addresses(): FormArray { 
    return <FormArray>this.customerForm.get('addresses');
  }

  private validationMessages:any = {
    required: 'Please enter your email address.',
    email:'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) { }

  // firstName = new FormControl;
  // lastName = new FormControl;
  // email = new FormControl;
  // sendCatalog = new FormControl(true);


  ngOnInit() {
    //Here we use FormBuilder service to shorten the sintaxis. Now you don´t have to initalize FormGroup and FormControl. FormBuilder do it for you.
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.minLength(3)]],
      lastName: ['', [Validators.required,Validators.minLength(5)]],
     // lastName: { value: 'n/a', disabled: true },//different way of initialize
      emailGroup: this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          confirmEmail:['',Validators.required],
      }, {validator:emailMatcher}as AbstractControlOptions), 
      phone: '',
      notification: 'email',
     rating:[null,ratingRange(1,5)],
      sendCatalog: true,
      addresses:    this.fb.array([this.buildAddress()])
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

    this.customerForm.get('notification')?.valueChanges.subscribe(
      value => this.setNotification(value)
    );

    

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl?.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value=> this.setMessage(emailControl)
    )
  }


  addAddress():void {
    this.addresses.push(this.buildAddress());
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
  

  buildAddress(): FormGroup { 
return  this.fb.group({
  addressType: 'home',
  street: '',
  street2: '',
  city: '',
  state: '',
  zip:''
})

  }

  populateTestData(): void {
    //setValue() requires we set the value of every form control. If you need to st just some control use setPatch
    this.customerForm.patchValue({
      firstName: 'Pepe ',
      lastName: 'Pecas',
      email:'pepepecas@gmail.com',
      sendCatalog:false
    });
   }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setMessage(c: AbstractControl):void {
this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
}

  

  setNotification(notifyVia: string): void { 
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia == 'text') {
      phoneControl?.setValidators(Validators.required);
    } else { 
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }

}
