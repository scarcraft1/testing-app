import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ImagePickerComponent } from './components';

@NgModule({
  declarations: [
    ImagePickerComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [
    ImagePickerComponent
  ]
})
export class SharedModule { }
