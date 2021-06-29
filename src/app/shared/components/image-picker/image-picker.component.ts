import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {

  public imgSrc: string = 'https://via.placeholder.com/150';
  public imgAlt: string = '';
  public placeholder: string = 'Seleccione una imagen...';

  @HostBinding('id')
  @Input('id')
  public get parentId(): string { return ''; }
  public set parentId(id: string) {
    this.id = id || this.id;
  }

  public id: string = 'file-input';

  constructor() { }

  ngOnInit(): void {
  }

}
