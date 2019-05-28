import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, BehaviorSubject, AsyncSubject, ReplaySubject} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        //Replay subject:- Replay subject will print the intermediate values as well. 
        // Doesn't matter whether mark as completed or not
        const subject = new ReplaySubject();

        const series$ = subject.asObservable();

        series$.subscribe(val => console.log('First sub: ' + val));

       //emitting values
      
        subject.next(1);
        subject.next(2);
        subject.next(3);
        
       // subject.complete();

        
        // This will also emit the last value not the intermediate value.
        setTimeout(() => {
            series$.subscribe(val => console.log('2nd sub: ' + val));
            subject.next(4);
        
        }, 3000);
        
    }
    
    //Output
    // First sub: 1
    // First sub: 2
    // First sub: 3
    // 2nd sub: 1
    // 2nd sub: 2
    // 2nd sub: 3
    // First sub: 4
    // 2nd sub: 4

}






