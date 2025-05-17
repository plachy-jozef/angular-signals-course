import { afterNextRender, Component, effect, inject, Injector, signal, WritableSignal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'home-signal',
  imports: [MatTabsModule],
  templateUrl: './home-signal.component.html',
  styleUrl: './home-signal.component.scss'
})
export class HomeSignalComponent {
  counter: WritableSignal<number> = signal(0);

  injector = inject(Injector);

  constructor() {
    afterNextRender(() => {

      effect(() => {
        console.log('Counter changed:', this.counter());
      }, {
        injector: this.injector
      });
    });
  }

  increment() {
    this.counter.update(value => value + 1);
  }

}
