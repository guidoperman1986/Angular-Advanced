import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {
  public isAddTimerVisible: boolean;
  public time: number;
  public timers: Array<number> = [];
  /* public isEndTimerAlertVisible = false; */


  /* @ViewChild(SimpleAlertViewComponent) alert: SimpleAlertViewComponent; */
  @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;

  @ViewChild('timerInput') timeInput: ElementRef;

  constructor(private cdRef: ChangeDetectorRef, private renderer: Renderer2) { 
    this.timers = [3, 20, 185]
  }
  ngAfterViewInit(): void {
    // this.timeInput.nativeElement.setAttribute('placeholder', 'enter seconds');
    // this.timeInput.nativeElement.classList.add('time-in');

    this.renderer.setAttribute(this.timeInput.nativeElement, 'placeholder', 'enter seconds');
    this.renderer.addClass(this.timeInput.nativeElement, 'time-in');

    this.alerts.forEach(item=>{
      if (!item.title){
        item.title = "Hi";
        item.message = "Hello World";
      }
    });
    this.cdRef.detectChanges();
  }

  ngAfterContentInit(): void {
    /* this.alert.title = "Hola";
    this.alert.message = "Hola"; */
  }

  public showAddTimer(){
    this.isAddTimerVisible = true;
    setTimeout(()=>{
      // this.timeInput.nativeElement.focus();
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus()
    });
  }

  public hideAddTimer(){
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert(){
    /* this.isEndTimerAlertVisible = true; */
    this.alerts.first.show();
  }

  /* public hideEndTimerAlert(){
    this.isEndTimerAlertVisible = false;
  } */

  public submitAddTimer(){
    this.timers.push(this.time);
    this.hideAddTimer();
  }

}
