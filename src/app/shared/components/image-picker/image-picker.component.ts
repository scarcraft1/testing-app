import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImgFile } from 'src/app/core/types';
@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImagePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImagePickerComponent),
      multi: true,
    },
  ],
})
export class ImagePickerComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  private subscriptions: Subscription[] = [];
  private get file(): ImgFile | undefined {
    return this.image;
  }
  private set file(val: ImgFile | undefined) {
    this.image = val;
    this.cd.detectChanges();
    console.log('this.image', this.image);
    this.onChange(this.image);
    this.onTouch();
    this.onValidate();
  }
  private fr: FileReader = new FileReader();

  private image?: ImgFile;

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
      this.fr.onloadend = () => {
        if (this.fr.result) {
          this.file = {
            name: files[0].name
              .split('.')
              .reverse()
              .slice(-1)
              .reverse()
              .join(''),
            extension: files[0].name.split('.').reverse()[0],
            size: files[0].size,
            src: this.fr.result as string,
          };
        } else {
          this.file = undefined;
        }
      };
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.filter((sub) => sub).forEach((sub) => sub.unsubscribe());
  }

  writeValue(obj?: ImgFile): void {
    this.image = obj;
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
