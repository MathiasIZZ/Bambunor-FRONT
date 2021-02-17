import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;

  constructor(private myForm: FormBuilder) { }

  ngOnInit(): void {

    this.contactForm = this.myForm.group( {

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      message: ['', Validators.required]
    });



 // END INIT
  }

  onSubmit() {
    console.log(this.contactForm);
  }

}
