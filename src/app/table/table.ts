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
  hasAction = input.required<boolean>();
  actionText = input<string>('View Details');
  action = output<any>();

  onAction(item: any) {
    this.action.emit(item);
  }
}
