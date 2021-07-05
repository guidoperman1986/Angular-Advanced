import { AfterContentInit, Component, ContentChildren, QueryList, OnDestroy, OnInit } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { Subscription } from 'rxjs';
import { Tab } from "../tab/tab.interface";


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  // @ContentChildren(TabComponent) tab: TabComponent; // accedo desde el padre al hijo, hace referencia a un solo hijo
  
  @ContentChildren(TabComponent) public tabs:QueryList<TabComponent>;
  private tabClickSubscriptions: Subscription[] = [];

  constructor() { }

  ngOnDestroy(): void {
    if (this.tabClickSubscriptions){
      this.tabClickSubscriptions.forEach(tab => {
        tab.unsubscribe();        
      });
    }
  }

  // 
  ngAfterContentInit(): void { 
    // despues
    this.tabs.forEach(tab=>{
      let subscription = tab.onClick.subscribe(()=>{
        console.log(`tab ${tab.title} content`);
      });

      this.tabClickSubscriptions.push(subscription);
    });

    this.selectTab(this.tabs.first);

    // antes
    /* if (this.tab) {
      console.log(this.tab);
      this.addTab(this.tab);
      this.tabClickSubscription = this.tab.onClick.subscribe(()=>{console.log('tab content click detec')})
    } */
  }

  ngOnInit() {
  }

  selectTab(tab:Tab) {
    this.tabs.forEach(tab=> tab.isActive = false);
    tab.isActive = true;
  }
  

}
