import { Component, input, output } from '@angular/core';
import { CapitalizePipe } from '../common/pipes/capitalize-pipe';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CapitalizePipe, CurrencyPipe, NgClass],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  headers = input.required<string[]>();
  customeHeaders = input<string[]>();
  data = input.required<any[]>();
  actions = input.required<any[]>();
  action = output<any>();

  onAction(item: any, action: any) {
    this.action.emit({ item, action });
  }

  hasActions() {
    return this.actions().length > 0;
  }
}
