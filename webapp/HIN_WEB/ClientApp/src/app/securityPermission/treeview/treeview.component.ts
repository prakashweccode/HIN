import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'tree-view',
  template: `
<div class="w3-row">
  <div class="w3-full tree">
    <ng-template #nodeTemplateRef let-node>
      <li class="parent_li">
        <span (click)="node.children && node.children.length > 0 ? toggleNode(node) : ''" (contextmenu)="openContext($event, node)">
          <i *ngIf="node.children && node.children.length > 0" [ngClass]="node.showChildren ? 'fa fa-minus-circle' : 'fa fa-plus-circle'" aria-hidden="true"></i>
          {{node.name}}
          <i *ngIf="node.statGrant" class="fa fa-unlock-alt" aria-hidden="true" style="color: green; margin-left: 10px;"></i>  
          <i *ngIf="node.statRead" class="fa fa-lock" aria-hidden="true" style="color: blue; margin-left: 10px;"></i>  
          <i *ngIf="node.statHide" class="fa fa-ban" aria-hidden="true" style="color: red; margin-left: 10px;"></i>  
        </span>

        <ul [hidden]="!node.showChildren" *ngIf="node.children && node.children.length > 0">
          <ng-template ngFor [ngForOf]="node.children" [ngForTemplate]="nodeTemplateRef"></ng-template>
        </ul>
      </li>
    </ng-template>

    <ul *ngIf="nodeData.length > 0" >
      <ng-template [ngTemplateOutlet]="nodeTemplateRef" [ngTemplateOutletContext]="{$implicit: nodeData[0]}"></ng-template>
    </ul>

  </div>
</div>

<div [ngStyle]="{'left.px': xPosition, 'top.px': yPosition, 'position':'absolute'}" *ngIf="showMenu">
    <ul class="ui-menu ui-widget ui-widget-content ui-corner-all">
        <li class="ui-menu-item">
            <a href="javascript:void(0);" class="ui-corner-all" (click)="updateData(1)" style="color: black"><i class="fa fa-unlock-alt" style="color: green"></i> Write</a>
        </li>
        <li class="ui-menu-item">
            <a href="javascript:void(0);" class="ui-corner-all" (click)="updateData(2)" style="color: black"><i class="fa fa-lock" style="color: blue"></i> Read</a>
        </li>
        <li class="ui-menu-item">
            <a href="javascript:void(0);" class="ui-corner-all" (click)="updateData(3)" style="color: black"><i class="fa fa-ban" style="color: red"></i> Revoked</a>
        </li>
    </ul>
</div>
  `,
  styles: [`
    .tree {
    min-height: 20px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}

    .tree li {
        list-style-type: none;
        margin: 0;
        padding: 1px;
        position: relative;
    }

    .tree ul ul li:hover {
        background: rgba(0,0,0,.015);
    }

    .tree li:after, .tree li:before {
        content: '';
        left: -20px;
        position: absolute;
        right: auto;
    }

    .tree li:before {
        border-left: 1px solid #999;
        bottom: 50px;
        height: 100%;
        top: 0px;
        width: 1px;
        -webkit-transition: "border-color 0.1s ease 0.1s";
        -moz-transition: "border-color 0.1s ease 0.1s";
        -o-transition: "border-color 0.1s ease 0.1s";
        transition: "border-color 0.1s ease 0.1s";
    }

    .tree li:after {
        border-top: 1px solid #999;
        height: 20px;
        top: 13px;
        width: 22px;
    }

    .tree li span {
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border: 1px dotted #999;
        border-radius: 5px;
        display: inline-block;
        padding: 3px 8px;
        text-decoration: none;
        -webkit-transition: color .2s ease .1s,background-color .2s ease .1s,border-color .3s ease .2s;
        -moz-transition: color .2s ease .1s,background-color .2s ease .1s,border-color .3s ease .2s;
        -o-transition: color .2s ease .1s,background-color .2s ease .1s,border-color .3s ease .2s;
        transition: color .2s ease .1s,background-color .2s ease .1s,border-color .3s ease .2s;
    }

    .tree li.parent_li > span {
        cursor: pointer;
        /*padding: 0;*/
    }

    .tree > ul > li::after, .tree > ul > li:before {
        border: 0;
    }

    .tree li:last-child::before {
        height: 19px;
    }

    .tree li.parent_li > span:hover, .tree li.parent_li > span:hover + ul li span {
        background: #eee;
        border: 1px solid #94a0b4;
        color: #000;
    }

    .tree > ul {
        padding-left: 0;
    }

    .tree ul ul {
        padding-left: 30px;
        padding-top: 0px;
    }

    .tree li.parent_li > span:hover {
        background-color: #4caf50;
        color: #fff;
    }

        .tree li.parent_li > span:hover + ul li::before {
            border-left-color: #d9efda;
        }

        .tree li.parent_li > span:hover + ul li::after {
            border-top-color: #d9efda;
        }

        .tree li.parent_li > span:hover + ul li span {
            background: #c6efc8 !important;
            border: 1px solid #4caf50;
            color: #000;
        }


.ui-menu {
    width: 155px;
    padding: 2px;
    -webkit-box-shadow: 0 2px 4px rgba(30,30,100,.25);
    -moz-box-shadow: 0 2px 4px rgba(30,30,100,.25);
    box-shadow: 0 2px 4px rgba(30,30,100,.25);
    background: #fff;
    border: 1px solid rgba(0,0,0,.2);
    z-index: 1;
}

.ui-menu .ui-state-disabled {
    margin: .4em 0 .2em !important;
    background: none !important;
    color: #999 !important;
    font-weight: 400 !important;
    cursor: default;
}

.ui-menu {
  list-style: none;
  margin: 0;
  display: block;
  outline: 0;
}

.ui-menu .ui-menu {
    margin-top: -3px;
    position: absolute;
    list-style: none;
}

.ui-menu .ui-menu-item {
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
    list-style-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);
}

.ui-menu .ui-menu-divider {
    margin: 5px -2px 5px -2px;
    height: 0;
    font-size: 0;
    line-height: 0;
    border-width: 1px 0 0;
}

.ui-menu .ui-menu-item a {
    text-decoration: none;
    display: block;
    padding: 2px .4em;
    line-height: 1.5;
    min-height: 0;
    font-weight: 400;
}

.ui-menu .ui-menu-item a.ui-corner-all {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
}

.ui-menu .ui-menu-item a.ui-state-active, .ui-menu .ui-menu-item a.ui-state-focus, .ui-menu .ui-menu-item a.ui-widget-content {
    font-weight: 700;
    margin: 0;
    background-color: #428BCA;
    border-color: #357EBD;
    color: #FFF;
    display: block;
    white-space: nowrap;
}

.ui-menu .ui-menu-item a.ui-state-active {
    padding: 1px .4em;
}

.ui-menu .ui-state-disabled {
    line-height: 1.5;
}

.ui-menu .ui-state-disabled a {
    cursor: default;
}

.ui-menu-icons {
  position: relative;
}

.ui-menu-icons .ui-menu-item a {
    position: relative;
    padding-left: 2em;
}

.ui-menu .ui-icon {
  position: absolute;
  top: .2em;
  left: .2em;
}

.ui-menu .ui-menu-icon {
  position: static;
  float: right;
}

.ui-menu {
  margin-bottom: 2em;
}

.ui-menu-item:before, .ui-menu-item:after {
  border: none !important;
}

.ui-menu-item:hover {
  background-color: #4caf50;  
  color: #fff;
}
  `]
})

export class TreeviewComponent {

  @Input() nodeData: any;
  @Input() treeData: any;

  showMenu: boolean = false;
  xPosition: number = 0;
  yPosition: number = 0;
  currentSelect: any;
  tempArr: any[] = [];

  constructor() { }

  toggleNode(node: any): void {
    node.showChildren = !node.showChildren;
  }

  openContext(event, node): void {
    event.preventDefault();

    let posx = 0;
    let posy = 0;

    if (!event) event = window.event;

    if (event.pageX || event.pageY) {
      posx = event.pageX;
      posy = event.pageY;
    } else if (event.clientX || event.clientY) {
      posx = event.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy = event.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    this.xPosition = posx;
    this.yPosition = posy;
    this.showMenu = true;
    this.currentSelect = node;
    return;
  }

  updateData(select: number): void {
    switch (select) {
      case 1:
        this.currentSelect.statGrant = true;
        this.currentSelect.statHide = false;
        this.currentSelect.statRead = false;
        break;
      case 2:
        this.currentSelect.statGrant = false;
        this.currentSelect.statHide = false;
        this.currentSelect.statRead = true;
        break;
      case 3:
        this.currentSelect.statGrant = false;
        this.currentSelect.statHide = true;
        this.currentSelect.statRead = false;
        break;
    }

    if (this.currentSelect.children) {
      this.updateChildren(this.currentSelect.children, this.currentSelect.statGrant, this.currentSelect.statRead, this.currentSelect.statHide);
      if (this.currentSelect.parent !== '-1') {
        this.updateParent(this.treeData, this.currentSelect.parent, select);
      }
    }
    else {
      this.updateParent(this.treeData, this.currentSelect.parent, select);
    }

  }

  updateChildren(arr: any, statGrant: boolean, statRead: boolean, statHide: boolean): void {
    arr.forEach((element) => {
      element.statGrant = statGrant;
      element.statRead = statRead;
      element.statHide = statHide;
      if (element.children) {
        this.updateChildren(element.children, statGrant, statRead, statHide);
      }
    });
  }

  updateParent(arr: any, parentId: string, select: number): void {
    arr.forEach((element) => {
      if (element.idPermis === parentId) {
        switch (select) {
          case 1:
            element.statGrant = true;
            break;
          case 2:
            element.statRead = true;
            break;
          case 3:
            element.statHide = true;
            break;
        }

        this.getVerifyStatus().forEach((status) => {
          if (element[status.value] === true) {
            this.tempArr = [];
            this.getChildrenStatus(element.children, status.value)
            if (this.tempArr.findIndex(x => x === true) === -1) {
              element[status.value] = false;
            }
          }
        });

        if (element.parent !== "-1") {
          this.updateParent(this.treeData, element.parent, select);
        }
        return;
      }
      else if (element.children) {
        this.updateParent(element.children, parentId, select);
      }
    });
  }

  getVerifyStatus(): any[] {
    return [{ key: 1, value: "statGrant" }, { key: 2, value: "statRead" }, { key: 3, value: "statHide" }];
  }

  getChildrenStatus(arr: any, prop: string) {
    arr.forEach((element) => {
      this.tempArr.push(element[prop])
      if (element.children && element.children.length > 0) {
        this.getChildrenStatus(element.children, prop);
      }
    });
  }

  @HostListener("document:click", ["$event"])
  onClick(event) {
    if (this.showMenu) {
      this.showMenu = !this.showMenu;
    }
  }

}
