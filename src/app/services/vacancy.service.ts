import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Vacancy } from '../types';

@Injectable({
  providedIn: 'root',
})
const ApiUrl =   process.env['API_URL'] || "http://localhost:3000"

export class VacancyService {

  constructor(private apiService: ApiService) {}

  getVacancies = (url: string, params?: any): Observable<Vacancy[]> => {
    return this.apiService.get(ApiUrl + url, {
      ...params,
      responseType: 'json',
    });
  };

  getVacancyById = (url: string, vacancyId: string): Observable<Vacancy[]> => {
    return this.apiService.get(
      ApiUrl + url + '/' + vacancyId,
      {
        responseType: 'json',
      }
    );
  };

  getQuestions = (url: string, params?: any): Observable<Vacancy[]> => {
    return this.apiService.get(ApiUrl + url, {
      ...params,
      responseType: 'json',
    });
  };

  uploadCv = (url: string, params?: any): Observable<Vacancy[]> => {
    return this.apiService.post(ApiUrl + url, {
      ...params,
      responseType: 'json',
    });
  };
}
