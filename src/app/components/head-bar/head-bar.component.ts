import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent implements OnInit {

  @Input() Titulo = 'titulo';

  @Output() TituloChange = new EventEmitter<string>();

  constructor() { }

  public pulsarBoton(titulo: string = 'titulo') {
    this.TituloChange.emit(titulo);
    return false;
  }

  ngOnInit(): void { }

}
