import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  newsletterForm = new FormGroup({
    emailNewsletterInput: new FormControl('votre email')
  });

  ngOnInit(): void {

    this.showForm();
  }


  showForm() {
    console.log(this.newsletterForm);
  }

}
