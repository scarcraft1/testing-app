import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  private privateForm!: FormGroup;
  @Input()
  public get form(): FormGroup {
    return this.privateForm;
  }
  public set form(form: FormGroup) {
    this.privateForm = form as FormGroup;
  }

  @Input()
  public submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
