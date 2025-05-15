import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'home-signal',
  imports: [MatTabsModule],
  templateUrl: './home-signal.component.html',
  styleUrl: './home-signal.component.scss'
})
export class HomeSignalComponent {
  counter = signal(0);

  increment() {
    this.counter.set(this.counter() + 1);
  }
}
