import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Loader } from './common/components/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Banking-Demo');
}
