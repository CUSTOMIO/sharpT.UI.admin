(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Pmxt:function(t,e,a){"use strict";a.r(e),a.d(e,"ExaminationDetailModule",function(){return X});var n=a("ofXK"),i=a("PCNd"),o=a("tyNb"),r=a("M9IT"),c=a("+0xr"),d=a("3Pt+"),b=a("FKr1"),s=a("0IaG"),l=a("fXoL"),m=a("RiFG"),p=a("AytR"),u=a("lJxs"),f=a("rW8v"),g=a("tk/3");let h=(()=>{class t{constructor(t){this.http=t}academicYear(){return this.http.get(`${p.a.api_endpoint}/academicYear`).pipe(Object(u.a)(t=>t.map(t=>new f.a(t))))}}return t.\u0275fac=function(e){return new(e||t)(l.Yb(g.b))},t.\u0275prov=l.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var x=a("NFeN"),C=a("f0Cb"),O=a("XiUz"),D=a("kmnG"),v=a("d3UM"),T=a("qFsG"),U=a("iadO"),M=a("bTqV");function P(t,e){if(1&t&&l.Pb(0,"mat-option",22),2&t){const t=e.$implicit;l.lc("value",t.id)("innerHTML",t.name,l.vc)}}function w(t,e){if(1&t&&l.Pb(0,"mat-option",22),2&t){const t=e.$implicit;l.lc("value",t.id)("innerHTML",t.name,l.vc)}}function S(t,e){if(1&t&&l.Pb(0,"mat-option",22),2&t){const t=e.$implicit;l.lc("value",t.id)("innerHTML",t.startYear+"-"+t.endYear,l.vc)}}function k(t,e){if(1&t){const t=l.Vb();l.Ub(0,"form",5),l.cc("ngSubmit",function(){return l.uc(t),l.gc().onSubmit()}),l.Ub(1,"div",6),l.Ub(2,"div",7),l.Ub(3,"mat-label"),l.Cc(4,"Examination Name : "),l.Tb(),l.Tb(),l.Ub(5,"div",8),l.Ub(6,"mat-form-field",9),l.Ub(7,"mat-select",10),l.Bc(8,P,1,2,"mat-option",11),l.Tb(),l.Tb(),l.Tb(),l.Tb(),l.Ub(9,"div",6),l.Ub(10,"div",7),l.Ub(11,"mat-label"),l.Cc(12,"Standard : "),l.Tb(),l.Tb(),l.Ub(13,"div",8),l.Ub(14,"mat-form-field",9),l.Ub(15,"mat-select",12),l.Bc(16,w,1,2,"mat-option",11),l.Tb(),l.Tb(),l.Tb(),l.Tb(),l.Ub(17,"div",6),l.Ub(18,"div",7),l.Ub(19,"mat-label"),l.Cc(20,"Academic Year : "),l.Tb(),l.Tb(),l.Ub(21,"div",8),l.Ub(22,"mat-form-field",9),l.Ub(23,"mat-select",13),l.Bc(24,S,1,2,"mat-option",11),l.Tb(),l.Tb(),l.Tb(),l.Tb(),l.Ub(25,"div",6),l.Ub(26,"div",7),l.Ub(27,"mat-label"),l.Cc(28,"Total Marks : "),l.Tb(),l.Tb(),l.Ub(29,"div",8),l.Ub(30,"mat-form-field",9),l.Pb(31,"input",14),l.Tb(),l.Tb(),l.Tb(),l.Ub(32,"div",6),l.Ub(33,"div",7),l.Ub(34,"mat-label"),l.Cc(35,"Start On : "),l.Tb(),l.Tb(),l.Ub(36,"div",8),l.Ub(37,"mat-form-field",15),l.Pb(38,"input",16),l.Pb(39,"mat-datepicker-toggle",17),l.Pb(40,"mat-datepicker",null,18),l.Tb(),l.Tb(),l.Tb(),l.Ub(42,"div",6),l.Ub(43,"div",7),l.Ub(44,"mat-label"),l.Cc(45,"End On : "),l.Tb(),l.Tb(),l.Ub(46,"div",8),l.Ub(47,"mat-form-field",15),l.Pb(48,"input",19),l.Pb(49,"mat-datepicker-toggle",17),l.Pb(50,"mat-datepicker",null,20),l.Tb(),l.Tb(),l.Tb(),l.Ub(52,"button",21),l.Cc(53),l.Tb(),l.Tb()}if(2&t){const t=l.sc(41),e=l.sc(51),a=l.gc();l.lc("formGroup",a.editForm),l.Db(8),l.lc("ngForOf",a.examination),l.Db(8),l.lc("ngForOf",a.standard),l.Db(8),l.lc("ngForOf",a.academicYear),l.Db(14),l.lc("matDatepicker",t),l.Db(1),l.lc("for",t),l.Db(9),l.lc("matDatepicker",e),l.Db(1),l.lc("for",e),l.Db(4),l.Ec(" ","edit"===a.data.mode?"Update":"Add"," ")}}const _={parse:{dateInput:"DD/MM/YYYY"},display:{dateInput:"DD/MM/YYYY",monthYearLabel:"MMMM YYYY",dateA11yLabel:"LL",monthYearA11yLabel:"MMMM YYYY"}};let Y=(()=>{class t{constructor(t,e,a,n,i,o,r){this.data=t,this.dialogRef=e,this.formBuilder=a,this.standardService=n,this.examinationService=i,this.examinationDetailService=o,this.academicYearService=r,this.isLoading=!0,this.editForm=a.group({examinationId:[,[d.r.required]],standardId:[,[d.r.required]],academicYearId:[,[d.r.required]],startOn:[,[d.r.required]],endOn:[,[d.r.required]],totalMarks:[,[d.r.required,d.r.pattern(/^-?(0|[1-9]\d*)?$/)]]}),"edit"===t.mode&&(this.startOn=new Date(t.examinationDetail.startOn),this.endOn=new Date(t.examinationDetail.endOn),this.editForm.get("standardId").setValue(t.examinationDetail.standardId),this.editForm.get("startOn").setValue(this.startOn),this.editForm.get("endOn").setValue(this.endOn),this.editForm.get("totalMarks").setValue(t.examinationDetail.totalMarks),this.editForm.get("examinationId").setValue(t.examinationDetail.examinationId),this.editForm.get("academicYearId").setValue(t.examinationDetail.academicYearId))}ngOnInit(){this.standardService.getStandard().subscribe(t=>{this.standard=t}),this.examinationService.examination().subscribe(t=>{this.examination=t}),this.academicYearService.academicYear().subscribe(t=>{this.academicYear=t}),this.isLoading=!1}onSubmit(){if(!this.editForm.valid)return;this.isLoading=!0;const t={next:t=>{t.message&&this.dialogRef.close({data:t.message}),this.isLoading=!1},error:t=>{console.error(t),this.isLoading=!1}};"edit"===this.data.mode?this.examinationDetailService.postEditExaminationDetail(this.editForm.value,this.data.examinationDetail.id).subscribe(t):"new"===this.data.mode&&(this.examinationDetailService.postAddExaminationDetail(this.editForm.value).subscribe(t),console.log(this.editForm.value))}closeDialog(){this.dialogRef.close()}}return t.\u0275fac=function(e){return new(e||t)(l.Ob(s.a),l.Ob(s.d),l.Ob(d.d),l.Ob(m.e),l.Ob(m.d),l.Ob(m.c),l.Ob(h))},t.\u0275cmp=l.Ib({type:t,selectors:[["ng-component"]],features:[l.Cb([{provide:b.e,useValue:_}])],decls:8,vars:1,consts:[[1,"header"],[1,"mat-subheading-2"],[3,"click"],[1,"container"],["class","pt-20",3,"formGroup","ngSubmit",4,"ngIf"],[1,"pt-20",3,"formGroup","ngSubmit"],[1,"wrapper"],["fxFlex","35",1,"label"],["fxFlex","65",1,"input"],["appearance","standard"],["formControlName","examinationId"],[3,"value","innerHTML",4,"ngFor","ngForOf"],["formControlName","standardId"],["formControlName","academicYearId"],["matInput","","formControlName","totalMarks"],["appearance","fill",1,"date"],["matInput","","formControlName","startOn",3,"matDatepicker"],["matSuffix","",3,"for"],["startOn",""],["matInput","","formControlName","endOn",3,"matDatepicker"],["endOn",""],["type","submit","mat-flat-button","","color","accent"],[3,"value","innerHTML"]],template:function(t,e){1&t&&(l.Ub(0,"div",0),l.Ub(1,"h1",1),l.Cc(2,"Examination Detail"),l.Tb(),l.Ub(3,"mat-icon",2),l.cc("click",function(){return e.closeDialog()}),l.Cc(4,"close"),l.Tb(),l.Tb(),l.Pb(5,"mat-divider"),l.Ub(6,"div",3),l.Bc(7,k,54,9,"form",4),l.Tb()),2&t&&(l.Db(7),l.lc("ngIf",e.data.examinationDetail))},directives:[x.a,C.a,n.k,d.s,d.n,d.f,O.b,D.e,D.b,v.a,d.m,d.e,n.j,T.b,d.c,U.e,U.h,D.f,U.d,M.a,b.n],styles:[".header[_ngcontent-%COMP%]{margin-bottom:10px}.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{float:left}.header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:0;cursor:pointer}.container[_ngcontent-%COMP%]{margin:0 auto 25px;width:100%}.container[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%]{height:50px;align-items:center}.container[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{text-align:right;padding-top:16px;margin-right:20px}.container[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]{width:180px}.container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:block;margin:10px auto 0}"]}),t})();function I(t,e){1&t&&(l.Ub(0,"th",21),l.Cc(1," Name "),l.Tb())}function F(t,e){if(1&t&&(l.Ub(0,"td",22),l.Cc(1),l.Tb()),2&t){const t=e.$implicit;l.Db(1),l.Ec(" ",t.examinationName," ")}}function y(t,e){1&t&&(l.Ub(0,"th",21),l.Cc(1," Standard "),l.Tb())}function L(t,e){if(1&t&&(l.Ub(0,"td",22),l.Cc(1),l.Tb()),2&t){const t=e.$implicit;l.Db(1),l.Ec(" ",t.standardName," ")}}function B(t,e){1&t&&(l.Ub(0,"th",21),l.Cc(1," Start On "),l.Tb())}function E(t,e){if(1&t&&(l.Ub(0,"td",22),l.Cc(1),l.Tb()),2&t){const t=e.$implicit;l.Db(1),l.Ec(" ",t.startOn," ")}}function R(t,e){1&t&&(l.Ub(0,"th",21),l.Cc(1," End On "),l.Tb())}function N(t,e){if(1&t&&(l.Ub(0,"td",22),l.Cc(1),l.Tb()),2&t){const t=e.$implicit;l.Db(1),l.Ec(" ",t.endOn," ")}}function A(t,e){1&t&&(l.Ub(0,"th",21),l.Cc(1," Total Marks "),l.Tb())}function $(t,e){if(1&t&&(l.Ub(0,"td",22),l.Cc(1),l.Tb()),2&t){const t=e.$implicit;l.Db(1),l.Ec(" ",t.totalMarks," ")}}function z(t,e){1&t&&(l.Ub(0,"th",21),l.Cc(1," Updated At "),l.Tb())}function V(t,e){if(1&t&&(l.Ub(0,"td",22),l.Cc(1),l.Tb()),2&t){const t=e.$implicit;l.Db(1),l.Ec(" ",t.updatedAt," ")}}function q(t,e){1&t&&l.Pb(0,"th",21)}function G(t,e){if(1&t){const t=l.Vb();l.Ub(0,"td",22),l.Ub(1,"i",23),l.cc("click",function(){l.uc(t);const a=e.$implicit;return l.gc().openDialog(a,"edit")}),l.Tb(),l.Tb()}}function H(t,e){1&t&&l.Pb(0,"tr",24)}function j(t,e){1&t&&l.Pb(0,"tr",25)}const J=[{path:"",component:(()=>{class t{constructor(t,e){this.examinationDetailService=t,this.dialog=e,this.displayedColumns=["name","standard","startOn","endOn","totalMarks","updatedAt","edit"],this.examinationDetailPerPage=20,this.pageSizeOptions=[20,50,100],this.pageIndex=1,this.isLoading=!0,this.observer={next:t=>{this.dataSource=new c.k(t),t.forEach(t=>{t.startOn=new Date(t.startOn).toDateString(),t.endOn=new Date(t.endOn).toDateString(),t.updatedAt=new Date(t.updatedAt).toDateString()}),this.isLoading=!1},error:t=>console.error("Observer got an error: "+t)}}ngOnInit(){this.examinationDetailService.getExaminationDetail(this.examinationDetailPerPage,1).subscribe(this.observer)}onChangedPage(t){this.isLoading=!0,this.examinationDetailService.getExaminationDetail(t.pageSize,t.pageIndex+1).subscribe(this.observer),this.pageIndex=t.pageIndex+1}applyFilter(t){this.isLoading=!0,this.dataSource.filter=t.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage(),this.isLoading=!1}openDialog(t,e){this.dialog.open(Y,{disableClose:!0,width:"450px",data:{examinationDetail:t,mode:e}}).afterClosed().subscribe(t=>{t&&(this.examinationDetailService.getExaminationDetail(this.examinationDetailPerPage,this.pageIndex).subscribe(this.observer),this.count+=1)})}}return t.\u0275fac=function(e){return new(e||t)(l.Ob(m.c),l.Ob(s.b))},t.\u0275cmp=l.Ib({type:t,selectors:[["ng-component"]],viewQuery:function(t,e){if(1&t&&l.Gc(r.a,1),2&t){let t;l.rc(t=l.dc())&&(e.paginator=t.first)}},decls:37,vars:6,consts:[[1,"container"],[1,"filter-div"],["appearance","standard",1,"filter-input"],["matInput","","placeholder","filterlist...",3,"keyup"],["input",""],[1,"add-icon"],["mat-flat-button","","color","primary",3,"click"],[1,"mat-elevation-z8"],["mat-table","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","standard"],["matColumnDef","startOn"],["matColumnDef","endOn"],["matColumnDef","totalMarks"],["matColumnDef","updatedAt"],["matColumnDef","edit"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",3,"length","pageSizeOptions","pageSize","page"],["mat-header-cell",""],["mat-cell",""],[1,"far","fa-edit","text-dark",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(l.Ub(0,"div",0),l.Ub(1,"div",1),l.Ub(2,"div"),l.Ub(3,"mat-form-field",2),l.Ub(4,"mat-label"),l.Cc(5,"Filter"),l.Tb(),l.Ub(6,"input",3,4),l.cc("keyup",function(t){return e.applyFilter(t)}),l.Tb(),l.Tb(),l.Tb(),l.Ub(8,"div",5),l.Ub(9,"button",6),l.cc("click",function(){return e.openDialog({},"new")}),l.Cc(10,"New"),l.Tb(),l.Tb(),l.Tb(),l.Ub(11,"div",7),l.Ub(12,"table",8),l.Sb(13,9),l.Bc(14,I,2,0,"th",10),l.Bc(15,F,2,1,"td",11),l.Rb(),l.Sb(16,12),l.Bc(17,y,2,0,"th",10),l.Bc(18,L,2,1,"td",11),l.Rb(),l.Sb(19,13),l.Bc(20,B,2,0,"th",10),l.Bc(21,E,2,1,"td",11),l.Rb(),l.Sb(22,14),l.Bc(23,R,2,0,"th",10),l.Bc(24,N,2,1,"td",11),l.Rb(),l.Sb(25,15),l.Bc(26,A,2,0,"th",10),l.Bc(27,$,2,1,"td",11),l.Rb(),l.Sb(28,16),l.Bc(29,z,2,0,"th",10),l.Bc(30,V,2,1,"td",11),l.Rb(),l.Sb(31,17),l.Bc(32,q,1,0,"th",10),l.Bc(33,G,2,0,"td",11),l.Rb(),l.Bc(34,H,1,0,"tr",18),l.Bc(35,j,1,0,"tr",19),l.Tb(),l.Ub(36,"mat-paginator",20),l.cc("page",function(t){return e.onChangedPage(t)}),l.Tb(),l.Tb(),l.Tb()),2&t&&(l.Db(12),l.lc("dataSource",e.dataSource),l.Db(22),l.lc("matHeaderRowDef",e.displayedColumns),l.Db(1),l.lc("matRowDefColumns",e.displayedColumns),l.Db(1),l.lc("length",e.count)("pageSizeOptions",e.pageSizeOptions)("pageSize",e.examinationDetailPerPage))},directives:[D.b,D.e,T.b,M.a,c.j,c.c,c.e,c.b,c.g,c.i,r.a,c.d,c.a,c.f,c.h],styles:[".filter-div[_ngcontent-%COMP%]{width:100%;height:80px;display:inline-block;padding:5px 0;border-radius:20px 20px 0 0;background-color:#a2d6f91a;box-shadow:0 5px 5px -3px #0000001a,0 8px 10px 1px #00000012,0 3px 14px 2px #0000000f}.filter-div[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%]{margin-left:20px;float:left;max-width:300px}.filter-div[_ngcontent-%COMP%]   .add-icon[_ngcontent-%COMP%]{margin:25px 20px 0 0;float:right}.container[_ngcontent-%COMP%]{width:95%;margin:50px auto 100px}.container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}.container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{width:16.6666666667%}"]}),t})()}];let K=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({imports:[[o.f.forChild(J)],o.f]}),t})(),X=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({providers:[],imports:[[n.c,i.a,K]]}),t})()}}]);