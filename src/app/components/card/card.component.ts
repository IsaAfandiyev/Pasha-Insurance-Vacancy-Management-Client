import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Vacancy } from '../../types';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NzCardModule, NzAnchorModule, RouterLink, NzIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() vacancy!: Vacancy;
}
