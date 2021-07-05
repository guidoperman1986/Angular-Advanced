import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TabsComponent } from 'app/tabs/tabs.component';
import { Tab } from "./tab.interface";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, Tab {

  @Input() title:string;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  public isActive:boolean = false;

  // con esta forma accedo del hijo al padre, pero cuando @ContentChild esta implementado en el padre
  // no puede inyectarse la referencia en el hijo como esta hecho aca.
  /* constructor(public tabs: TabsComponent) { }

  ngOnInit() {
    this.tabs.addTab(this); 
  } */

  constructor() {}

  ngOnInit() {}

  clickTabContent(){
    this.onClick.emit();

  }

}
