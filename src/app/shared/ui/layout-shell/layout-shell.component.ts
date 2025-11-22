import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BalanceBadgeComponent } from '../balance-badge/balance-badge.component';

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, BalanceBadgeComponent],
  templateUrl: './layout-shell.component.html',
  styleUrl: './layout-shell.component.scss',
})
export class LayoutShellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
