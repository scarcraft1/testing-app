import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  @Input() public menu: string[] = ['hola', 'como', 'estas'];
  @Output() public categoriesSelectedChange = new EventEmitter<string[]>();
  public selectedCategories: string[] = [];

  public set categorySelected(category: string) {
    if (this.selectedCategories.indexOf(category) > -1) {
      this.selectedCategories = this.selectedCategories.filter(
        (i) => i !== category
      );
    } else {
      this.selectedCategories = this.selectedCategories.concat(category);
    }
    this.categoriesSelectedChange.emit(this.selectedCategories);
  }

  constructor() {}

  ngOnInit(): void {}
}
