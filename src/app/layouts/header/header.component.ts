import { Component } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzImageModule, NzAnchorModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
