import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
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
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator {

  private destroy$ = new Subject<boolean>();
  private fr: FileReader = new FileReader();
  private file?: ImgFile;

  @ViewChild('FileInput')
  private fileInput?: ElementRef<HTMLInputElement>;

  public id: string = 'file-input';
  @HostBinding('id')
  @Input('id')
  public get parentId(): string {
    return '';
  }
  public set parentId(id: string) {
    this.id = id || this.id;
  }

  @Input()
  public maxSize: number = 20;
  @Input()
  public maxNameLength: number = 100;

  public get imgSrc(): string {
    return this.file?.src || 'https://via.placeholder.com/150';
  }
  public get placeholder(): string {
    return this.file?.name || 'Seleccione una imagen...';
  }

  @HostBinding('attr.disabled')
  public isDisabled = false;

  public onChange: (val?: any) => any = () => { };
  public onTouch: (val?: any) => any = () => { };
  public onValidate: () => void = () => { };

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.fileInput) {
      const fileChange$ = fromEvent(this.fileInput?.nativeElement, 'change').pipe(
        filter(() => !this.isDisabled),
        map($event => ($event.target as HTMLInputElement).files?.[0]),
        tap(file => { if (file) { this.fr.readAsDataURL(file); } else { this.file = undefined } }),
        takeUntil(this.destroy$),
      );
      const fileReaded$ = fromEvent(this.fr, 'loadend').pipe(
        map($event => ($event.target as FileReader).result as string),
        withLatestFrom(fileChange$),
        takeUntil(this.destroy$),
        map(([content, metadata]) => !metadata ? undefined : <ImgFile>{
          type: metadata?.type,
          name: metadata?.name,
          size: metadata?.size,
          src: content
        })
      );
      fileReaded$.subscribe(image => {
        this.file = image;
        this.onChange(this.file);
        this.onTouch();
        this.onValidate();
        this.cd.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  writeValue(obj?: ImgFile): void {
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
    if (!control.value) { return null; }
    let errors: ValidationErrors | null = null;
    if (!(control.value as ImgFile).type.startsWith('image')) {
      errors = Object.assign(errors || {}, { invalidType: { type: (control.value as ImgFile).type, accept: 'image/*' } });
    }
    if (Number(((control.value as ImgFile).size / 1024 / 1024).toFixed(4)) > this.maxSize) {
      errors = Object.assign(errors || {}, { invalidSize: { size: (control.value as ImgFile).size, maxSize: this.maxSize } });
    }
    if ((control.value as ImgFile).name.length > this.maxNameLength) {
      errors = Object.assign(errors || {}, { invalidNameLength: { nameLength: (control.value as ImgFile).name.length, maxNameLength: this.maxNameLength } });
    }

    return errors;
  }
}
