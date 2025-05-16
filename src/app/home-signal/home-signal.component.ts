import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

type Counter = {
  value: number
}

@Component({
  selector: 'home-signal',
  imports: [MatTabsModule],
  templateUrl: './home-signal.component.html',
  styleUrl: './home-signal.component.scss'
})
export class HomeSignalComponent {
  counter = signal<Counter>({
    value: 0
  });

  increment() {
    this.counter
      .update((value: Counter) => ({ ...value, value: value.value + 1 }));
  }
}
