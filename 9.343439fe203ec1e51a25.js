(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{ikiF:function(t,e,n){"use strict";n.r(e),n.d(e,"OtpModule",function(){return z});var i=n("ofXK"),o=n("tyNb"),a=n("M9IT"),c=n("Dh3D"),r=n("+0xr"),s=n("fXoL"),d=n("AytR"),p=n("rW8v"),l=n("lJxs"),b=n("tk/3");let u=(()=>{class t{constructor(t){this.http=t}getOtp(t,e){return this.http.get(`${d.a.api_endpoint}/otp?pageSize=${t}&page=${e}`).pipe(Object(l.a)(t=>t.map(t=>new p.i(t))))}otpCount(){return this.http.get(`${d.a.api_endpoint}/otpCount`)}}return t.\u0275fac=function(e){return new(e||t)(s.Yb(b.b))},t.\u0275prov=s.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var g=n("kmnG"),f=n("qFsG"),h=n("bv9b"),m=n("znSr");function C(t,e){1&t&&s.Pb(0,"mat-progress-bar",18)}function P(t,e){1&t&&(s.Ub(0,"th",19),s.Cc(1," Email "),s.Tb())}function O(t,e){if(1&t&&(s.Ub(0,"span",23),s.Cc(1),s.Tb()),2&t){const t=s.gc().$implicit;s.nc("routerLink","/user/",t.userId,""),s.Db(1),s.Ec(" ",t.email," ")}}function x(t,e){if(1&t&&(s.Ub(0,"span"),s.Cc(1),s.Tb()),2&t){const t=s.gc().$implicit;s.Db(1),s.Ec(" ",t.email," ")}}function w(t,e){if(1&t&&(s.Ub(0,"td",20),s.Bc(1,O,2,2,"span",21),s.Bc(2,x,2,1,"span",22),s.Tb()),2&t){const t=e.$implicit;s.Db(1),s.lc("ngIf",t.userId),s.Db(1),s.lc("ngIf",null===t.userId)}}function M(t,e){1&t&&(s.Ub(0,"th",19),s.Cc(1," Otp "),s.Tb())}function _(t,e){if(1&t&&(s.Ub(0,"td",20),s.Cc(1),s.Tb()),2&t){const t=e.$implicit;s.Db(1),s.Ec(" ",t.otp," ")}}function S(t,e){1&t&&(s.Ub(0,"th",19),s.Cc(1," Verified "),s.Tb())}function v(t,e){if(1&t&&(s.Ub(0,"td",20),s.Pb(1,"i",24),s.Tb()),2&t){const t=e.$implicit;s.Db(1),s.lc("ngClass",t.isVerified?"fa-check\n              text-success":"fa-times text-danger")}}function D(t,e){1&t&&(s.Ub(0,"th",19),s.Cc(1,"Created At"),s.Tb())}function T(t,e){if(1&t&&(s.Ub(0,"td",20),s.Cc(1),s.Tb()),2&t){const t=e.$implicit;s.Db(1),s.Ec(" ",t.createdAt," ")}}function U(t,e){1&t&&(s.Ub(0,"th",19),s.Cc(1,"Updated At"),s.Tb())}function y(t,e){if(1&t&&(s.Ub(0,"td",20),s.Cc(1),s.Tb()),2&t){const t=e.$implicit;s.Db(1),s.Ec(" ",t.updatedAt," ")}}function I(t,e){1&t&&s.Pb(0,"tr",25)}function k(t,e){1&t&&s.Pb(0,"tr",26)}const B=[{path:"",component:(()=>{class t{constructor(t){this.otpService=t,this.title="Standard",this.isLoading=!0,this.displayedColumns=["email","otp","isVerified","createdAt","updatedAt"],this.otpPerPage=20,this.pageSizeOptions=[20,50,100],this.pageIndex=1,this.observer={next:t=>{t.forEach(t=>{t.createdAt=new Date(t.createdAt).toLocaleString(),t.updatedAt=new Date(t.updatedAt).toLocaleString()}),this.dataSource=new r.k(t),this.dataSource.sort=this.sort,this.isLoading=!1},error:t=>console.error("Observer got an error: "+t)}}ngOnInit(){this.otpService.otpCount().subscribe(t=>{this.count=t.count},t=>{console.log(t)}),this.otpService.getOtp(this.otpPerPage,1).subscribe(this.observer)}onChangedPage(t){this.isLoading=!0,this.otpService.getOtp(t.pageSize,t.pageIndex+1).subscribe(this.observer),this.pageIndex=t.pageIndex+1}applyFilter(t){this.isLoading=!0,this.dataSource.filter=t.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage(),this.isLoading=!1}}return t.\u0275fac=function(e){return new(e||t)(s.Ob(u))},t.\u0275cmp=s.Ib({type:t,selectors:[["otp"]],viewQuery:function(t,e){if(1&t&&(s.Gc(a.a,1),s.Gc(c.a,1)),2&t){let t;s.rc(t=s.dc())&&(e.paginator=t.first),s.rc(t=s.dc())&&(e.sort=t.first)}},decls:29,vars:7,consts:[["mode","indeterminate",4,"ngIf"],[1,"container"],[1,"filter-div"],["appearance","standard",1,"filter-input"],["matInput","","placeholder","filterlist...",3,"keyup"],["input",""],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","email"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","otp"],["matColumnDef","isVerified"],["matColumnDef","createdAt"],["matColumnDef","updatedAt"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",3,"length","pageSizeOptions","pageSize","page"],["mode","indeterminate"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["class","user-exist",3,"routerLink",4,"ngIf"],[4,"ngIf"],[1,"user-exist",3,"routerLink"],[1,"fas","fa-md",3,"ngClass"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(s.Bc(0,C,1,0,"mat-progress-bar",0),s.Ub(1,"div",1),s.Ub(2,"div",2),s.Ub(3,"div"),s.Ub(4,"mat-form-field",3),s.Ub(5,"mat-label"),s.Cc(6,"Filter"),s.Tb(),s.Ub(7,"input",4,5),s.cc("keyup",function(t){return e.applyFilter(t)}),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Ub(9,"div",6),s.Ub(10,"table",7),s.Sb(11,8),s.Bc(12,P,2,0,"th",9),s.Bc(13,w,3,2,"td",10),s.Rb(),s.Sb(14,11),s.Bc(15,M,2,0,"th",9),s.Bc(16,_,2,1,"td",10),s.Rb(),s.Sb(17,12),s.Bc(18,S,2,0,"th",9),s.Bc(19,v,2,1,"td",10),s.Rb(),s.Sb(20,13),s.Bc(21,D,2,0,"th",9),s.Bc(22,T,2,1,"td",10),s.Rb(),s.Sb(23,14),s.Bc(24,U,2,0,"th",9),s.Bc(25,y,2,1,"td",10),s.Rb(),s.Bc(26,I,1,0,"tr",15),s.Bc(27,k,1,0,"tr",16),s.Tb(),s.Ub(28,"mat-paginator",17),s.cc("page",function(t){return e.onChangedPage(t)}),s.Tb(),s.Tb(),s.Tb()),2&t&&(s.lc("ngIf",e.isLoading),s.Db(10),s.lc("dataSource",e.dataSource),s.Db(16),s.lc("matHeaderRowDef",e.displayedColumns),s.Db(1),s.lc("matRowDefColumns",e.displayedColumns),s.Db(1),s.lc("length",e.count)("pageSizeOptions",e.pageSizeOptions)("pageSize",e.otpPerPage))},directives:[i.k,g.b,g.e,f.b,r.j,c.a,r.c,r.e,r.b,r.g,r.i,a.a,h.a,r.d,c.b,r.a,o.c,i.i,m.a,r.f,r.h],styles:[".filter-div[_ngcontent-%COMP%]{width:100%;height:80px;display:inline-block;padding:5px 0;border-radius:20px 20px 0 0;background-color:#a2d6f91a;box-shadow:0 5px 5px -3px #0000001a,0 8px 10px 1px #00000012,0 3px 14px 2px #0000000f}.filter-div[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%]{margin-left:20px;float:left;max-width:300px}.container[_ngcontent-%COMP%]{width:95%;margin:50px auto 100px}.container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}.container[_ngcontent-%COMP%]   .user-exist[_ngcontent-%COMP%]{color:#000;cursor:pointer;text-decoration:underline;-webkit-text-decoration-color:grey;text-decoration-color:grey}.container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{width:25%;text-align:center}.container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child, .container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{padding-left:0}.container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(2), .container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(3), .container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(2), .container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(3){width:12%}.container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child, .container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child{padding-right:0}"]}),t})()}];let L=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.Mb({type:t}),t.\u0275inj=s.Lb({imports:[[o.f.forChild(B)],o.f]}),t})();var A=n("PCNd");let z=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.Mb({type:t}),t.\u0275inj=s.Lb({providers:[],imports:[[i.c,L,A.a]]}),t})()}}]);