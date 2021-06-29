import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {

  @HostBinding('class')
  @Input('class')
  public className: string = 'input-group mb-2';

  constructor() { }

  ngOnInit(): void {
  }

}
