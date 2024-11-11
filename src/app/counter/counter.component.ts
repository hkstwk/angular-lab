import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset, undo } from '../store/counter.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  imports: [
    AsyncPipe
  ],
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  count$;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = this.store.select('count');
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  undo() {
    this.store.dispatch(undo());
  }
}
