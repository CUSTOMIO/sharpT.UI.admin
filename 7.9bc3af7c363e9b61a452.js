(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{zd2S:function(t,e,n){"use strict";n.r(e),n.d(e,"ExaminationTypeModule",function(){return G});var i=n("ofXK"),a=n("PCNd"),o=n("tyNb"),c=n("M9IT"),r=n("Dh3D"),s=n("+0xr"),d=n("3Pt+"),b=n("0IaG"),l=n("fXoL"),m=n("RiFG"),p=n("NFeN"),g=n("f0Cb"),u=n("bv9b"),f=n("XiUz"),h=n("kmnG"),x=n("qFsG"),C=n("1jcm"),v=n("bTqV");function P(t,e){1&t&&l.Pb(0,"mat-progress-bar",6)}function T(t,e){if(1&t){const t=l.Vb();l.Ub(0,"form",7),l.cc("ngSubmit",function(){return l.uc(t),l.gc().onSubmit()}),l.Ub(1,"div",8),l.Ub(2,"div",9),l.Ub(3,"mat-label"),l.Cc(4,"Name : "),l.Tb(),l.Tb(),l.Ub(5,"div",10),l.Ub(6,"mat-form-field",11),l.Pb(7,"input",12),l.Tb(),l.Tb(),l.Tb(),l.Ub(8,"div",8),l.Ub(9,"div",9),l.Ub(10,"mat-label"),l.Cc(11,"Status : "),l.Tb(),l.Tb(),l.Ub(12,"div",13),l.Pb(13,"mat-slide-toggle",14),l.Tb(),l.Tb(),l.Ub(14,"button",15),l.Cc(15),l.Tb(),l.Tb()}if(2&t){const t=l.gc();l.lc("formGroup",t.editForm),l.Db(15),l.Ec(" ","edit"===t.data.mode?"Update":"Add"," ")}}let w=(()=>{class t{constructor(t,e,n,i){this.data=t,this.dialogRef=e,this.formBuilder=n,this.examinationService=i,this.isLoading=!0,this.editForm=n.group({name:[,[d.t.required]],isActive:[,[d.t.required]]}),"edit"===t.mode&&(this.editForm.get("name").setValue(t.examinationType.name),this.editForm.get("isActive").setValue(t.examinationType.isActive))}ngOnInit(){this.isLoading=!1}onSubmit(){if(console.log("Clicked"),!this.editForm.valid)return;console.log("Passed"),this.isLoading=!0;const t={next:t=>{t.message&&this.dialogRef.close({data:t.message}),this.isLoading=!1},error:t=>{console.error(t),this.isLoading=!1}};"edit"===this.data.mode?this.examinationService.postEditExamination(this.editForm.value,this.data.examinationType.id).subscribe(t):"new"===this.data.mode&&this.examinationService.postAddExamination(this.editForm.value).subscribe(t)}closeDialog(){this.dialogRef.close()}}return t.\u0275fac=function(e){return new(e||t)(l.Ob(b.a),l.Ob(b.d),l.Ob(d.e),l.Ob(m.d))},t.\u0275cmp=l.Ib({type:t,selectors:[["ng-component"]],decls:9,vars:2,consts:[[1,"header"],[1,"mat-subheading-2"],[3,"click"],["mode","indeterminate",4,"ngIf"],[1,"container"],["class","pt-20",3,"formGroup","ngSubmit",4,"ngIf"],["mode","indeterminate"],[1,"pt-20",3,"formGroup","ngSubmit"],[1,"wrapper"],["fxFlex","35",1,"label"],["fxFlex","65",1,"input"],["appearance","standard"],["matInput","","formControlName","name"],["fxFlex","65"],["formControlName","isActive","color","primary",1,"side-toggle"],["type","submit","mat-flat-button","","color","accent"]],template:function(t,e){1&t&&(l.Ub(0,"div",0),l.Ub(1,"h1",1),l.Cc(2,"Edit Course"),l.Tb(),l.Ub(3,"mat-icon",2),l.cc("click",function(){return e.closeDialog()}),l.Cc(4,"close"),l.Tb(),l.Tb(),l.Pb(5,"mat-divider"),l.Bc(6,P,1,0,"mat-progress-bar",3),l.Ub(7,"div",4),l.Bc(8,T,16,2,"form",5),l.Tb()),2&t&&(l.Db(6),l.lc("ngIf",e.isLoading),l.Db(2),l.lc("ngIf",e.data.examinationType))},directives:[p.a,g.a,i.k,u.a,d.u,d.o,d.g,f.b,h.e,h.b,x.b,d.c,d.n,d.f,C.a,v.a],styles:["button[_ngcontent-%COMP%]{display:block;margin:10px auto}.header[_ngcontent-%COMP%]{margin-bottom:10px}.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{float:left}.header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:0;cursor:pointer}.container[_ngcontent-%COMP%]{margin:0 auto 25px;width:100%}.container[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%]{height:50px;align-items:center}.container[_ngcontent-%COMP%]   .wrapper[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{text-align:right;padding-top:16px;margin-right:20px}.container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:block;margin:10px auto 0}"]}),t})();var O=n("znSr");function S(t,e){1&t&&l.Pb(0,"mat-progress-bar",21)}function U(t,e){1&t&&(l.Ub(0,"th",22),l.Cc(1," Name "),l.Tb())}function y(t,e){if(1&t&&(l.Ub(0,"td",23),l.Cc(1),l.Tb()),2&t){const t=e.$implicit;l.Db(1),l.Ec(" ",t.name," ")}}function D(t,e){1&t&&(l.Ub(0,"th",22),l.Cc(1," Status "),l.Tb())}function M(t,e){if(1&t&&(l.Ub(0,"td",23),l.Pb(1,"i",24),l.Tb()),2&t){const t=e.$implicit;l.Db(1),l.lc("ngClass",t.isActive?"fa-check\n            text-success":"fa-times text-danger")}}function _(t,e){1&t&&(l.Ub(0,"th",22),l.Cc(1,"Created At"),l.Tb())}function k(t,e){if(1&t&&(l.Ub(0,"td",23),l.Cc(1),l.Tb()),2&t){const t=e.$implicit;l.Db(1),l.Ec(" ",t.createdAt," ")}}function A(t,e){1&t&&(l.Ub(0,"th",22),l.Cc(1,"Updated At"),l.Tb())}function I(t,e){if(1&t&&(l.Ub(0,"td",23),l.Cc(1),l.Tb()),2&t){const t=e.$implicit;l.Db(1),l.Ec(" ",t.updatedAt," ")}}function L(t,e){1&t&&l.Pb(0,"th",25)}function B(t,e){if(1&t){const t=l.Vb();l.Ub(0,"td",23),l.Ub(1,"i",26),l.cc("click",function(){l.uc(t);const n=e.$implicit;return l.gc().openDialog(n,"edit")}),l.Tb(),l.Tb()}}function F(t,e){1&t&&l.Pb(0,"tr",27)}function E(t,e){1&t&&l.Pb(0,"tr",28)}const R=[{path:"",component:(()=>{class t{constructor(t,e){this.examinationService=t,this.dialog=e,this.title="Examination-Types",this.displayedColumns=["name","isActive","createdAt","updatedAt","edit"],this.examinationTypePerPage=20,this.pageSizeOptions=[10,25,100],this.pageIndex=1,this.isLoading=!0,this.observer={next:t=>{this.dataSource=new s.k(t),t.forEach(t=>{t.createdAt=new Date(t.createdAt).toLocaleString(),t.updatedAt=new Date(t.updatedAt).toLocaleString()}),this.dataSource.sort=this.sort,this.isLoading=!1},error:t=>console.error(t)}}ngOnInit(){this.examinationService.examinationCount().subscribe(t=>{this.count=t.count}),this.examinationService.getExamination(this.examinationTypePerPage,1).subscribe(this.observer)}onChangedPage(t){this.isLoading=!0,this.examinationService.getExamination(t.pageSize,t.pageIndex+1).subscribe(this.observer),this.pageIndex=t.pageIndex+1}applyFilter(t){this.isLoading=!0,this.dataSource.filter=t.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage(),this.isLoading=!1}openDialog(t,e){this.dialog.open(w,{width:"450px",data:{examinationType:t,mode:e}}).afterClosed().subscribe(t=>{t&&(this.examinationService.getExamination(this.examinationTypePerPage,this.pageIndex).subscribe(this.observer),this.count+=1)})}}return t.\u0275fac=function(e){return new(e||t)(l.Ob(m.d),l.Ob(b.b))},t.\u0275cmp=l.Ib({type:t,selectors:[["ng-component"]],viewQuery:function(t,e){if(1&t&&(l.Gc(c.a,1),l.Gc(r.a,1)),2&t){let t;l.rc(t=l.dc())&&(e.paginator=t.first),l.rc(t=l.dc())&&(e.sort=t.first)}},decls:32,vars:7,consts:[["mode","indeterminate",4,"ngIf"],[1,"container"],[1,"filter-div"],["appearance","standard",1,"filter-input"],["matInput","","placeholder","filterlist...",3,"keyup"],["input",""],[1,"add-icon"],["mat-flat-button","","color","primary",3,"click"],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","isActive"],["matColumnDef","createdAt"],["matColumnDef","updatedAt"],["matColumnDef","edit"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",3,"length","pageSizeOptions","pageSize","page"],["mode","indeterminate"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],[1,"fas","fa-md",3,"ngClass"],["mat-header-cell",""],[1,"far","fa-edit","text-dark",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(l.Bc(0,S,1,0,"mat-progress-bar",0),l.Ub(1,"div",1),l.Ub(2,"div",2),l.Ub(3,"div"),l.Ub(4,"mat-form-field",3),l.Ub(5,"mat-label"),l.Cc(6,"Filter"),l.Tb(),l.Ub(7,"input",4,5),l.cc("keyup",function(t){return e.applyFilter(t)}),l.Tb(),l.Tb(),l.Tb(),l.Ub(9,"div",6),l.Ub(10,"button",7),l.cc("click",function(){return e.openDialog({},"new")}),l.Cc(11,"New"),l.Tb(),l.Tb(),l.Tb(),l.Ub(12,"div",8),l.Ub(13,"table",9),l.Sb(14,10),l.Bc(15,U,2,0,"th",11),l.Bc(16,y,2,1,"td",12),l.Rb(),l.Sb(17,13),l.Bc(18,D,2,0,"th",11),l.Bc(19,M,2,1,"td",12),l.Rb(),l.Sb(20,14),l.Bc(21,_,2,0,"th",11),l.Bc(22,k,2,1,"td",12),l.Rb(),l.Sb(23,15),l.Bc(24,A,2,0,"th",11),l.Bc(25,I,2,1,"td",12),l.Rb(),l.Sb(26,16),l.Bc(27,L,1,0,"th",17),l.Bc(28,B,2,0,"td",12),l.Rb(),l.Bc(29,F,1,0,"tr",18),l.Bc(30,E,1,0,"tr",19),l.Tb(),l.Ub(31,"mat-paginator",20),l.cc("page",function(t){return e.onChangedPage(t)}),l.Tb(),l.Tb(),l.Tb()),2&t&&(l.lc("ngIf",e.isLoading),l.Db(13),l.lc("dataSource",e.dataSource),l.Db(16),l.lc("matHeaderRowDef",e.displayedColumns),l.Db(1),l.lc("matRowDefColumns",e.displayedColumns),l.Db(1),l.lc("length",e.count)("pageSizeOptions",e.pageSizeOptions)("pageSize",e.examinationTypePerPage))},directives:[i.k,h.b,h.e,x.b,v.a,s.j,r.a,s.c,s.e,s.b,s.g,s.i,c.a,u.a,s.d,r.b,s.a,i.i,O.a,s.f,s.h],styles:[".filter-div[_ngcontent-%COMP%]{width:100%;height:80px;display:inline-block;padding:5px 0;border-radius:20px 20px 0 0;background-color:#a2d6f91a;box-shadow:0 5px 5px -3px #0000001a,0 8px 10px 1px #00000012,0 3px 14px 2px #0000000f}.filter-div[_ngcontent-%COMP%]   .filter-input[_ngcontent-%COMP%]{margin-left:20px;float:left;max-width:300px}.filter-div[_ngcontent-%COMP%]   .add-icon[_ngcontent-%COMP%]{margin:25px 20px 0 0;float:right}.container[_ngcontent-%COMP%]{width:95%;margin:50px auto 100px}.container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}.container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{width:25%;text-align:center}"]}),t})()}];let z=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({imports:[[o.f.forChild(R)],o.f]}),t})(),G=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({providers:[],imports:[[i.c,a.a,z]]}),t})()}}]);