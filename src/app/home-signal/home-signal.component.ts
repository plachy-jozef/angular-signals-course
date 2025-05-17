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
    this.effectRef = effect((onCleanup) => {
      const counter = this.counter();

      const timeout = setTimeout(() => {
        console.log(`counter value: ${ counter }`);
      }, 1000);

      onCleanup(() => {
        console.log(`Calling clear timeout`);
        // Clear the timeout if the effect is cleaned up before it runs
        clearTimeout(timeout);
      });
    });
  }

  increment() {
    this.counter.update(value => value + 1);
  }

  cleanup() {
    console.log('Cleaning up effect');
    this.effectRef?.destroy();
  }

}
