import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "src/app/core/dataService";
import { UsersDetail } from "src/app/core/model";

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
  })

export class UserListComponent implements OnInit{

  public isLoading = true;

  displayedColumns: string[] = ['username', 'email', 'standard','verified', 'enrolledOn'];
  dataSource: MatTableDataSource<UsersDetail>;
  userPersonalDoc: object;

  userPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex = 1;
  public count: number;

  private observer = {
    next: (x) => {
      x.forEach(data => {
        data.createdAt = new Date(data.createdAt).toDateString()
      })
      this.dataSource = new MatTableDataSource(x);
      this.isLoading = false;
      console.log(this.dataSource)
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
    // this.dataSource[0].userDoc.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isLoading = false;
  }

}