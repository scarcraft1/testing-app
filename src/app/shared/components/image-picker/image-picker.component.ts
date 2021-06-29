import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImgFile } from 'src/app/core/types';
@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  private subscriptions: Subscription[] = [];
  private file?: ImgFile;
  private fr: FileReader = new FileReader();

  private fileUploaded$ = fromEvent(this.fr, 'loadend').pipe(
    map(($event) => $event.target as FileReader),
    map((fr) => fr.result as string)
  );

  public id: string = 'file-input';
  @HostBinding('id')
  @Input('id')
  public get parentId(): string {
    return '';
  }
  public set parentId(id: string) {
    this.id = id || this.id;
  }

  public isDisabled = false;
  public onChange: (val?: any) => any = (val?: any) => {};
  public onTouch: (val?: any) => any = (val?: any) => {};
  public onValidate: () => void = () => {};

  public get imgSrc(): string {
    return this.file?.src || 'https://via.placeholder.com/150';
  }
  public get placeholder(): string {
    return this.file
      ? `${this.file.name}.${this.file.extension}`
      : 'Seleccione una imagen...';
  }

  constructor(private cd: ChangeDetectorRef) {}

  public onFileChange(files: FileList | null) {
    if (files) {
      this.fr.readAsDataURL(files[0]);
    } else {
      this.file = undefined;
    }
    // this.file = files?.[0];
    // const fr = new FileReader();
    // fr.onloadend = ($event) => {
    //   this.imgSrc = fr.result as string;
    //   console.log('img', this.imgSrc);
    //   this.cd.detectChanges();
    // }
    // fr.readAsDataURL(this.file as any)
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.fileUploaded$.subscribe((result) => {
        this.file = {
          extension: '',
          name: '',
          size: 0,
          src: result,
        };
        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.filter((sub) => sub).forEach((sub) => sub.unsubscribe());
  }
  writeValue(obj: ImgFile): void {
    this.file = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  registerOnValidatorChange?(fn: () => void) {
    this.onValidate = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(control.value);
    return null;
  }
}
