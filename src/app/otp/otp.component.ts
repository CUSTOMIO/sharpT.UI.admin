import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OtpService } from '../core/dataService/otp/otp.service';
import { Otp } from '../core/model';

@Component({
  selector: 'otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  title = 'Standard';
  public isLoading: boolean = true;
  public standard: Otp[];
  
  //Paginator
  displayedColumns: string[] = ['email', 'otp', 'isVerified', 'createdAt', 'updatedAt'];
  dataSource: MatTableDataSource<Otp>;
  
  otpPerPage = 20;
  pageSizeOptions = [20, 50, 100];
  pageIndex: number = 1;
  public count: number;

  //Dialog
  public standardId: number;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  private observer = {
    next: (data: Otp[]) => {
      data.forEach(data => {
        data.createdAt = new Date(data.createdAt).toLocaleString();
        data.updatedAt = new Date(data.updatedAt).toLocaleString();
      })
      this.dataSource = new MatTableDataSource(data);
      this.isLoading = false;
    },
    error: err => console.error('Observer got an error: ' + err)
  };

  constructor(
    private otpService: OtpService
  ) { }

  ngOnInit() {
    this.otpService.otpCount()
    .subscribe(data => {
      this.count = data.count
    },
    err => {
      console.log(err)
    })
    this.otpService.getOtp(this.otpPerPage, 1).subscribe(this.observer);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.otpService.getOtp(pageData.pageSize, pageData.pageIndex + 1).subscribe(this.observer);
    this.pageIndex = pageData.pageIndex + 1;
  }

  applyFilter(event: Event) {
    this.isLoading = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.isLoading = false;
  }
}
