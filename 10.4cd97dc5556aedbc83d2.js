(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{tY1l:function(t,e,n){"use strict";n.r(e),n.d(e,"StandardModule",function(){return q});var i=n("ofXK"),a=n("PCNd"),o=n("tyNb"),r=n("M9IT"),c=n("+0xr"),d=n("3Pt+"),s=n("0IaG"),b=n("fXoL"),l=n("RiFG"),u=n("NFeN"),m=n("f0Cb"),g=n("bv9b"),p=n("XiUz"),f=n("kmnG"),h=n("qFsG"),C=n("d3UM"),v=n("1jcm"),S=n("bTqV"),T=n("FKr1");function U(t,e){1&t&&b.Pb(0,"mat-progress-bar",6)}function P(t,e){if(1&t&&(b.Ub(0,"mat-option",20),b.Cc(1),b.Tb()),2&t){const t=e.$implicit;b.lc("value",t.id)("innerHTML",t.name,b.vc),b.Db(1),b.Ec(" ",t.name," ")}}function x(t,e){if(1&t){const t=b.Vb();b.Ub(0,"form",7),b.cc("ngSubmit",function(){return b.uc(t),b.gc().onSubmit()}),b.Ub(1,"div",8),b.Ub(2,"div",9),b.Ub(3,"mat-label"),b.Cc(4,"Name : "),b.Tb(),b.Tb(),b.Ub(5,"div",10),b.Ub(6,"mat-form-field",11),b.Pb(7,"input",12),b.Tb(),b.Tb(),b.Tb(),b.Ub(8,"div",8),b.Ub(9,"div",9),b.Ub(10,"mat-label"),b.Cc(11,"Description : "),b.Tb(),b.Tb(),b.Ub(12,"div",10),b.Ub(13,"mat-form-field",11),b.Pb(14,"input",13),b.Tb(),b.Tb(),b.Tb(),b.Ub(15,"div",8),b.Ub(16,"div",9),b.Ub(17,"mat-label"),b.Cc(18,"Course : "),b.Tb(),b.Tb(),b.Ub(19,"div",10),b.Ub(20,"mat-form-field",11),b.Ub(21,"mat-select",14),b.Bc(22,P,2,3,"mat-option",15),b.Tb(),b.Tb(),b.Tb(),b.Tb(),b.Ub(23,"div",8),b.Ub(24,"div",9),b.Ub(25,"mat-label"),b.Cc(26,"Subject Selection : "),b.Tb(),b.Tb(),b.Ub(27,"div",16),b.Pb(28,"mat-slide-toggle",17),b.Tb(),b.Tb(),b.Ub(29,"div",8),b.Ub(30,"div",9),b.Ub(31,"mat-label"),b.Cc(32,"Active Status : "),b.Tb(),b.Tb(),b.Ub(33,"div",16),b.Pb(34,"mat-slide-toggle",18),b.Tb(),b.Tb(),b.Ub(35,"button",19),b.Cc(36),b.Tb(),b.Tb()}if(2&t){const t=b.gc();b.lc("formGroup",t.editForm),b.Db(22),b.lc("ngForOf",t.course),b.Db(14),b.Ec(" ","edit"===t.data.mode?"Update":"Add"," ")}}let w=(()=>{class t{constructor(t,e,n,i,a){this.data=t,this.dialogRef=e,this.formBuilder=n,this.courseService=i,this.standardService=a,this.isLoading=!0,this.editForm=n.group({name:[,[d.r.required]],courseId:["",[d.r.required]],isActive:[!1,[d.r.required]],allowSubjectSelection:[!1,[d.r.required]],description:["",[d.r.required]]}),"edit"===t.mode&&(this.editForm.controls.name.setValue(t.standard.name),this.editForm.controls.courseId.setValue(t.standard.courseId),this.editForm.controls.isActive.setValue(t.standard.isActive),this.editForm.controls.allowSubjectSelection.setValue(t.standard.allowSubjectSelection),this.editForm.controls.description.setValue(t.standard.description))}ngOnInit(){this.courseService.getCourse().subscribe(t=>{this.course=t,this.isLoading=!1})}onSubmit(){if(!this.editForm.valid)return;this.isLoading=!0;const t={next:t=>{null!==t.message&&this.dialogRef.close({data:t.message}),this.isLoading=!1},error:t=>{console.error(t),this.isLoading=!1}};"edit"===this.data.mode?this.standardService.postEditStandard(this.editForm.value,this.data.standard.id).subscribe(t):"new"===this.data.mode&&(console.log(this.editForm.value),this.standardService.postAddStandard(this.editForm.value).subscribe(t))}closeDialog(){this.dialogRef.close()}}return t.\u0275fac=function(e){return new(e||t)(b.Ob(s.a),b.Ob(s.d),b.Ob(d.d),b.Ob(l.b),b.Ob(l.f))},t.\u0275cmp=b.Ib({type:t,selectors:[["ng-component"]],decls:9,vars:2,consts:[[1,"header"],[1,"mat-subheading-2"],[3,"click"],["mode","indeterminate",4,"ngIf"],[1,"container"],["class","pt-20",3,"formGroup","ngSubmit",4,"ngIf"],["mode","indeterminate"],[1,"pt-20",3,"formGroup","ngSubmit"],[1,"wrapper"],["fxFlex","35",1,"label"],["fxFlex","65",1,"input"],["appearance","standard"],["matInput","","formControlName","name"],["matInput","","formControlName","description"],["formControlName","courseId"],[3,"value","innerHTML",4,"ngFor","ngForOf"],["fxFlex","65"],["formControlName","allowSubjectSelection","color","primary",1,"side-toggle"],["formControlName","isActive","color","primary",1,"side-toggle"],["type","submit","mat-flat-button","","color","accent"],[3,"value","innerHTML"]],template:function(t,e){1&t&&(b.Ub(0,"div",0),b.Ub(1,"h1",1),b.Cc(2,"Edit Standard"),b.Tb(),b.Ub(3,"mat-icon",2),b.cc("click",function(){return e.closeDialog()}),b.Cc(4,"close"),b.Tb(),b.Tb(),b.Pb(5,"mat-divider"),b.Bc(6,U,1,0,"mat-progress-bar",3),b.Ub(7,"div",4),b.Bc(8,x,37,3,"form",5),b.Tb()),2&t&&(b.Db(6),b.lc("ngIf",e.isLoading),b.Db(2),b.lc("ngIf",e.data.standard))},directives:[u.a,m.a,i.k,g.a,d.s,d.n,d.f,p.b,f.e,f.b,h.b,d.c,d.m,d.e,C.a,i.j,v.a,S.a,T.n],styles:["button[_ngcontent-%COMP%]{display:block;margin:10px auto}.header[_ngcontent-%COMP%]{margin-bottom:10px}.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{float:left}.header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:0;cursor:pointer}.container[_ngcontent-%COMP%]{margin:0 auto 25px;width:100%}.container[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%]{height:50px;align-items:center}.container[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{text-align:right;padding-top:16px;margin-right:20px}.container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:block;margin:10px auto 0}.container[_ngcontent-%COMP%]   .side-toggle[_ngcontent-%COMP%]{transform:translateY(50%)}"]}),t})();var O=n("znSr");function M(t,e){1&t&&b.Pb(0,"mat-progress-bar",22)}function D(t,e){1&t&&(b.Ub(0,"th",23),b.Cc(1," Name "),b.Tb())}function _(t,e){if(1&t&&(b.Ub(0,"td",24),b.Cc(1),b.Tb()),2&t){const t=e.$implicit;b.Db(1),b.Ec(" ",t.name," ")}}function F(t,e){1&t&&(b.Ub(0,"th",23),b.Cc(1," Course "),b.Tb())}function I(t,e){if(1&t&&(b.Ub(0,"td",24),b.Cc(1),b.Tb()),2&t){const t=e.$implicit;b.Db(1),b.Ec(" ",t.courseName," ")}}function y(t,e){1&t&&(b.Ub(0,"th",23),b.Cc(1," Subject selection "),b.Tb())}function k(t,e){if(1&t&&(b.Ub(0,"td",24),b.Pb(1,"i",25),b.Tb()),2&t){const t=e.$implicit;b.Db(1),b.lc("ngClass",t.allowSubjectSelection?"fa-check\n            text-success":"fa-times text-danger")}}function B(t,e){1&t&&(b.Ub(0,"th",23),b.Cc(1," Status "),b.Tb())}function L(t,e){if(1&t&&(b.Ub(0,"td",24),b.Pb(1,"i",25),b.Tb()),2&t){const t=e.$implicit;b.Db(1),b.lc("ngClass",t.isActive?"fa-check\n            text-success":"fa-times text-danger")}}function A(t,e){1&t&&(b.Ub(0,"th",23),b.Cc(1," Updated At "),b.Tb())}function R(t,e){if(1&t&&(b.Ub(0,"td",24),b.Cc(1),b.Tb()),2&t){const t=e.$implicit;b.Db(1),b.Ec(" ",t.updatedAt," ")}}function j(t,e){1&t&&b.Pb(0,"th",23)}function N(t,e){if(1&t){const t=b.Vb();b.Ub(0,"td",24),b.Ub(1,"i",26),b.cc("click",function(){b.uc(t);const n=e.$implicit;return b.gc().openDialog(n,"edit")}),b.Tb(),b.Tb()}}function z(t,e){1&t&&b.Pb(0,"tr",27)}function E(t,e){1&t&&b.Pb(0,"tr",28)}const G=[{path:"",component:(()=>{class t{constructor(t,e){this.standardService=t,this.dialog=e,this.displayedColumns=["name","course","isActive","allowSubjectSelection","updatedAt","edit"],this.standardPerPage=20,this.pageSizeOptions=[20,50,100],this.pageIndex=1,this.isLoading=!0,this.observer={next:t=>{this.dataSource=new c.k(t),t.forEach(t=>{t.updatedAt=new Date(t.updatedAt).toDateString()}),this.isLoading=!1},error:t=>console.error(t)}}ngOnInit(){this.standardService.standardCount().subscribe(t=>{this.count=t.count},t=>{console.log(t)}),this.standardService.getAdminStandard(this.standardPerPage,1).subscribe(this.observer)}onChangedPage(t){this.isLoading=!0,this.standardService.getAdminStandard(t.pageSize,t.pageIndex+1).subscribe(this.observer),this.pageIndex=t.pageIndex+1}applyFilter(t){this.isLoading=!0,this.dataSource.filter=t.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage(),this.isLoading=!1}openDialog(t,e){this.dialog.open(w,{width:"450px",data:{standard:t,mode:e}}).afterClosed().subscribe(t=>{t&&(this.standardService.getAdminStandard(this.standardPerPage,this.pageIndex).subscribe(this.observer),this.count+=1)})}}return t.\u0275fac=function(e){return new(e||t)(b.Ob(l.f),b.Ob(s.b))},t.\u0275cmp=b.Ib({type:t,selectors:[["ng-component"]],viewQuery:function(t,e){if(1&t&&b.Gc(r.a,1),2&t){let t;b.rc(t=b.dc())&&(e.paginator=t.first)}},decls:36,vars:7,consts:[["mode","indeterminate",4,"ngIf"],[1,"container"],[1,"filter-div"],["appearance","standard",1,"filter-input"],["matInput","","placeholder","filterlist...",3,"keyup"],["input",""],[1,"add-icon"],["mat-flat-button","","color","primary",3,"click"],[1,"fas","fa-plus"],[1,"mat-elevation-z8"],["mat-table","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","course"],["matColumnDef","allowSubjectSelection"],["matColumnDef","isActive"],["matColumnDef","updatedAt"],["matColumnDef","edit"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",3,"length","pageSizeOptions","pageSize","page"],["mode","indeterminate"],["mat-header-cell",""],["mat-cell",""],[1,"fas","fa-md",3,"ngClass"],[1,"far","fa-edit","text-dark",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(b.Bc(0,M,1,0,"mat-progress-bar",0),b.Ub(1,"div",1),b.Ub(2,"div",2),b.Ub(3,"div"),b.Ub(4,"mat-form-field",3),b.Ub(5,"mat-label"),b.Cc(6,"Filter"),b.Tb(),b.Ub(7,"input",4,5),b.cc("keyup",function(t){return e.applyFilter(t)}),b.Tb(),b.Tb(),b.Tb(),b.Ub(9,"div",6),b.Ub(10,"button",7),b.cc("click",function(){return e.openDialog({},"new")}),b.Cc(11," New "),b.Pb(12,"i",8),b.Tb(),b.Tb(),b.Tb(),b.Ub(13,"div",9),b.Ub(14,"table",10),b.Sb(15,11),b.Bc(16,D,2,0,"th",12),b.Bc(17,_,2,1,"td",13),b.Rb(),b.Sb(18,14),b.Bc(19,F,2,0,"th",12),b.Bc(20,I,2,1,"td",13),b.Rb(),b.Sb(21,15),b.Bc(22,y,2,0,"th",12),b.Bc(23,k,2,1,"td",13),b.Rb(),b.Sb(24,16),b.Bc(25,B,2,0,"th",12),b.Bc(26,L,2,1,"td",13),b.Rb(),b.Sb(27,17),b.Bc(28,A,2,0,"th",12),b.Bc(29,R,2,1,"td",13),b.Rb(),b.Sb(30,18),b.Bc(31,j,1,0,"th",12),b.Bc(32,N,2,0,"td",13),b.Rb(),b.Bc(33,z,1,0,"tr",19),b.Bc(34,E,1,0,"tr",20),b.Tb(),b.Ub(35,"mat-paginator",21),b.cc("page",function(t){return e.onChangedPage(t)}),b.Tb(),b.Tb(),b.Tb()),2&t&&(b.lc("ngIf",e.isLoading),b.Db(14),b.lc("dataSource",e.dataSource),b.Db(19),b.lc("matHeaderRowDef",e.displayedColumns),b.Db(1),b.lc("matRowDefColumns",e.displayedColumns),b.Db(1),b.lc("length",e.count)("pageSizeOptions",e.pageSizeOptions)("pageSize",e.standardPerPage))},directives:[i.k,f.b,f.e,h.b,S.a,c.j,c.c,c.e,c.b,c.g,c.i,r.a,g.a,c.d,c.a,i.i,O.a,c.f,c.h],styles:[".filter-div[_ngcontent-%COMP%]{width:100%;height:80px;display:inline-block;padding:5px 0;border-radius:20px 20px 0 0;background-color:#a2d6f91a;box-shadow:0 5px 5px -3px #0000001a,0 8px 10px 1px #00000012,0 3px 14px 2px #0000000f}.filter-div[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%]{margin-left:20px;float:left;max-width:300px}.filter-div[_ngcontent-%COMP%]   .add-icon[_ngcontent-%COMP%]{margin:25px 20px 0 0;float:right}.container[_ngcontent-%COMP%]{width:95%;margin:50px auto 100px}.container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}.container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{width:20%;text-align:center}"]}),t})()}];let V=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=b.Mb({type:t}),t.\u0275inj=b.Lb({imports:[[o.f.forChild(G)],o.f]}),t})(),q=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=b.Mb({type:t}),t.\u0275inj=b.Lb({providers:[],imports:[[i.c,V,a.a]]}),t})()}}]);