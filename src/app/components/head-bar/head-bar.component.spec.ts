import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { HeadBarComponent } from './head-bar.component';

describe('HeadBarComponent', () => {
  let component: HeadBarComponent;
  let fixture: ComponentFixture<HeadBarComponent>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadBarComponent ],
      imports: [ ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit new text when search', () => {
    spy = spyOn(component.searchTermChanged, 'emit');
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelector('input[type="search"]').value = 'hola';
    fixture.detectChanges();
    compiled.querySelector('button[type="submit"]').click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
