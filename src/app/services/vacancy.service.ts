import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Vacancy } from '../types';

@Injectable({
  providedIn: 'root',
})
export class VacancyService {
  constructor(private apiService: ApiService) {}

  getVacancies = (url: string, params?: any): Observable<Vacancy[]> => {
    return this.apiService.get('http://localhost:3000' + url, {
      ...params,
      responseType: 'json',
    });
  };

  getVacancyById = (url: string, vacancyId: string): Observable<Vacancy[]> => {
    return this.apiService.get(
      'http://localhost:3000' + url + '/' + vacancyId,
      {
        responseType: 'json',
      }
    );
  };

  getQuestions = (url: string, params?: any): Observable<Vacancy[]> => {
    return this.apiService.get('http://localhost:3000' + url, {
      ...params,
      responseType: 'json',
    });
  };

  uploadCv = (url: string, params?: any): Observable<Vacancy[]> => {
    return this.apiService.post('http://localhost:3000' + url, {
      ...params,
      responseType: 'json',
    });
  };
}
