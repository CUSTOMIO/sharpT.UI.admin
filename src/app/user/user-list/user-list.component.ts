import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StandardService, UserService } from 'src/app/core/dataService';
import { Standard, UsersDetail } from 'src/app/core/model';

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

  // Filter Data
  public standards: Standard[];
  public filterStandardId = '';
  public filterStatus = '';

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

  constructor(private userService: UserService,
              private standardService: StandardService) { }
  ngOnInit() {
    this.getUserCount();

    this.userService.getUsers(
      this.userPerPage,
      1,
      this.filterStandardId,
      this.filterStatus).subscribe(this.observer)

    this.standardService.getStandard()
      .subscribe(res => {
        this.standards = res;
      });
  }

  onChangedPage (pageData: PageEvent) {
    this.isLoading = true;

    this.userService.getUsers(
      pageData.pageSize,
      pageData.pageIndex + 1,
      this.filterStandardId,
      this.filterStatus).subscribe(this.observer);

    this.pageIndex = pageData.pageIndex + 1;
  }

  standardIdFilter (id) {
    console.log(id);
    this.filterStandardId = id;
  }


  isActiveFilter(value: string) {
  console.log(value);
    this.filterStatus = value;
  }

  setFilter() {
    console.log('clicked');

    this.getUserCount();

    this.userService.getUsers(
      this.userPerPage,
      1,
      this.filterStandardId,
      this.filterStatus).subscribe(this.observer);
  }

  private getUserCount() {
    this.userService.getUserCount(
      this.filterStandardId,
      this.filterStatus)
      .subscribe(res => {
        this.count = res.count;
      })
  }

  applyFilter(event: Event) {
    this.isLoading = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSource[0].userDoc.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isLoading = false;
  }

}
