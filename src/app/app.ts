import { Component } from '@angular/core';
import { LayoutShellComponent } from './shared/ui/layout-shell/layout-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
