import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "../core/dataService";
import { User } from "../core/model";

@Component({
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
  })

export class UserComponent implements OnInit{

  public isLoading: boolean = true;

  displayedColumns: string[] = ['username', 'email'];
  dataSource: MatTableDataSource<User>;

  userPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex: number = 1;
  public count: number;

  private observer = {
    next: (x: User[]) => {
      this.dataSource = new MatTableDataSource(x);
      this.isLoading = false;
    },
    error: err => console.error('Observer got an error: ' + err)
  };

  constructor(private userService: UserService){

  }
  ngOnInit(){    
    this.userService.getUsers(this.userPerPage, 1).subscribe(this.observer)
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.userService.getUsers(this.userPerPage, 1).subscribe(this.observer);
    this.pageIndex = pageData.pageIndex + 1;
  }

  applyFilter(event: Event) {
    this.isLoading = true;
    console.log(this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isLoading = false;
  }

}