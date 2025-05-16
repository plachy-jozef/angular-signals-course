import { Component, signal, WritableSignal } from '@angular/core';
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
  values: WritableSignal<number[]> = signal<number[]>([0]);

  append() {
    this.values.update((values: number[]): number[] => ([
      ...values,
      values[values.length - 1] + 1
    ]))
  }
}
