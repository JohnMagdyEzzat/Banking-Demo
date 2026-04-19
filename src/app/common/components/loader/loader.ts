import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  loader = inject(LoaderService);
}
