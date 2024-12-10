import { Component } from '@angular/core';
import { VacancyService } from '../services/vacancy.service';
import { Vacancy } from '../types';
import { CardComponent } from '../components/card/card.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CardComponent, NzGridModule, YouTubePlayerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private vacancyService: VacancyService) {}

  vacancies: Vacancy[] = [];

  fetchVacancies() {
    this.vacancyService.getVacancies('/vacancies').subscribe({
      next: (vacancies: Vacancy[]) => {
        this.vacancies = vacancies;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.fetchVacancies();
  }
}
