import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent implements OnInit {
  public submitted = false

  @Input() Titulo = 'titulo';

  @Output() searchTermChanged = new EventEmitter<string>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  public onSubmit(): false {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.invalid) { return false; }

    // this.form.value
    this.searchTermChanged.emit(this.form.value.search);
    this.searchTermChanged.emit(this.form.get('search')?.value);
    return false;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: ['ajhsgdhasdg', Validators.maxLength(5)]
    })
  }

}
