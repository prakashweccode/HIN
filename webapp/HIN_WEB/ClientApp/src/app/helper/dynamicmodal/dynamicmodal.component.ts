import { Component, OnInit, ViewChild, ViewContainerRef, Input, ComponentFactoryResolver, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-dynamicmodal',
  templateUrl: './dynamicmodal.component.html',
  styleUrls: ['./dynamicmodal.component.css']
})
export class DynamicmodalComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  @Input() componentCont: any;
  @Input() toggle: boolean;
  private componentRef: ComponentRef<{}>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    
    
  }
  closeToggle() {
    this.toggle = !this.toggle;
  }
  loadComponent(comp) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(comp);
    this.componentRef = this.container.createComponent(factory);
  }
}
