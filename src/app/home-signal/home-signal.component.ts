import { Component, computed, signal, WritableSignal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'home-signal',
  imports: [MatTabsModule],
  templateUrl: './home-signal.component.html',
  styleUrl: './home-signal.component.scss'
})
export class HomeSignalComponent {
  counter: WritableSignal<number> = signal(0);

  tenXCounter = computed(() => {
    const value = this.counter();
    return value * 10;
  })

  increment() {
    this.counter.update(value => value + 1);
  }
}
