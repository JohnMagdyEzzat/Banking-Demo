import { CurrencyPipe, KeyValuePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [KeyValuePipe, CurrencyPipe, NgClass],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  cardData = input.required<any[]>();
  cardHeaderElements = input.required<string[]>();
  cardBodyElements = input.required<string[]>();
  cardFooterElements = input.required<string[]>();
}
