import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleType } from 'src/app/core/types';
import { ProductItem } from '../../models';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  public item?: ProductItem;
  public titulo: string = '';
  public roles: RoleType[] = [];

  public get isAdmin() {
    return (this.roles || []).includes(RoleType.Admin);
  }

  public get isDeveloper() {
    return (this.roles || []).includes(RoleType.Developer);
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  public onVolverClick() {
    this.router.navigate(['../../', this.item?.id, 'details'], {
      relativeTo: this.route,
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.titulo = data.titulo;
      this.item = data.product;
      this.roles = data.userRoles;
      console.log(data, this.roles);
    });
  }
}
