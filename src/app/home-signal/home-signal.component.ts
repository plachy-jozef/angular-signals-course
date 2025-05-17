import { Component, effect, EffectRef, signal, WritableSignal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'home-signal',
  imports: [MatTabsModule],
  templateUrl: './home-signal.component.html',
  styleUrl: './home-signal.component.scss'
})
export class HomeSignalComponent {
  counter: WritableSignal<number> = signal(0);

  effectRef: EffectRef | null = null;

  constructor() {
    this.effectRef = effect(() => {
      console.log('Counter changed:', this.counter());
    });
  }

  increment() {
    this.counter.update(value => value + 1);
  }

  cleanup() {
    this.effectRef?.destroy();
  }

}
