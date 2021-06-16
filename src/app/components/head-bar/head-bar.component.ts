import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent implements OnInit {

  @Input() Titulo = 'titulo';

  @Output() searchTermChanged = new EventEmitter<string>();

  constructor() { }

  public onSubmit(searchTerm: string = '') {
    this.searchTermChanged.emit(searchTerm);
    return false;
  }

  ngOnInit(): void { }

}
