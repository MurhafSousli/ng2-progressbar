import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NgProgressConfig } from 'ngx-progressbar';
// import { NgProgressConfig } from '../../../../../ngx-progressbar/src/public-api';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  options: NgProgressConfig = {
    min: 8,
    max: 100,
    speed: 200,
    trickleSpeed: 300,
    debounceTime: 0,
    ease: 'linear',
    spinnerPosition: 'right',
    direction: 'ltr+',
    color: 'red',
    fixed: true,
    meteor: true,
    spinner: true,
    thick: false
  };

  preventAbuse = new Subject<boolean>();
  startedClass = new Subject<boolean>();
  endedClass = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  onProgressStarted() {
    this.startedClass.next(true);
    setTimeout(() => {
      this.startedClass.next(false);
    }, 800);
  }

  onProgressCompleted() {
    this.endedClass.next(true);
    setTimeout(() => {
      this.endedClass.next(false);
    }, 800);
  }

  testHttp() {
    this.preventAbuse.next(true);

    this.http.get('https://reqres.in/api/users?delay=1')
      .subscribe(() => {
        setTimeout(() => {
          this.preventAbuse.next(false);
        }, 800);
      });
  }

}
