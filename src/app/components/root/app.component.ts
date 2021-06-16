import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'testing-app 2';
  public menu = { titulo: 'titulo', valor: 3 };

  public log(obj: any): void {
    console.log(obj);
  }

  public onTitleChanged(title: string = 'titulo') {
    this.title = title;
    this.menu = { titulo: title, valor: 3 };
    // this.menu.titulo = title;
    // this.menu[2] = 8712638712683;
  }
}
