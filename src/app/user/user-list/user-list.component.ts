import { Component, OnInit, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "src/app/core/dataService";
import { UsersDetail } from "src/app/core/model";

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
  })

export class UserListComponent implements OnInit{

  // Table
  public displayedColumns: string[] = ['firstName', 'email', 'standardName', 'isVerified', 'createdAt'];
  public dataSource: MatTableDataSource<UsersDetail>;

  // Paginator
  private pageIndex = 1;
  public userPerPage = 20;
  public pageSizeOptions = [20, 50, 100];
  public count: number;


  // Loading 
  public isLoading = true;

  @ViewChild(MatSort) sort: MatSort;

  private observer = {
    next: (x) => {
      x.forEach(data => {
        data.createdAt = new Date(data.createdAt).toDateString();
      })
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    },
    error: err => console.error('Observer got an error: ' + err)
  };

  constructor(private userService: UserService){

  }
  ngOnInit() {
    this.userService.getUserCount()
      .subscribe(res => {
        this.count = res.count;
      })
    this.userService.getUsers(this.userPerPage, 1).subscribe(this.observer)
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.userService.getUsers(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
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
