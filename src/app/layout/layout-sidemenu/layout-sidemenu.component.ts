import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService, ReachUsService, UserService } from 'src/app/core/dataService';

@Component({
  selector: 'app-layout-sidemenu',
  templateUrl: './layout-sidemenu.component.html',
  styleUrls: ['./layout-sidemenu.component.scss']
})
export class LayoutSidemenuComponent implements OnInit {
  contentMargin = 200;
  isExpanded = true;
  isMenuOpen = true;
  isShowing = false;
  showSubmenu: boolean = false;
  unreadReadUs: number;
  unverfiedUser: number;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private reachUsService: ReachUsService,
    private userService: UserService  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    // Counters
    this.reachUsService.reachUsUnreadCount()
      .subscribe(res => {
        this.unreadReadUs = res.count;
      });

    this.userService.getUserUnverifiedCount()
      .subscribe(res => {
        this.unverfiedUser = res.count;
      })

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 200;
    }
  }
  logout() {
    this.authService.logout();
  }
}
