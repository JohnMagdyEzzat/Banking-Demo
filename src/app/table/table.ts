import { Component, input, output } from '@angular/core';
import { CapitalizePipe } from '../common/pipes/capitalize-pipe';

@Component({
  selector: 'app-table',
  imports: [CapitalizePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  headers = input.required<string[]>();
  data = input.required<any[]>();
  viewDetails = output<any>();

  onViewDetails(item: any) {
    this.viewDetails.emit(item);
  }
}
