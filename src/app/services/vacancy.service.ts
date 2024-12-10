import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Vacancy } from '../types';

const ApiUrl =   'https://pasha-task.netlify.app/.netlify/functions/api'


@Injectable({
  providedIn: 'root',
})

export class VacancyService {

  constructor(private apiService: ApiService) {}

  getVacancies = (url: string, params?: any): Observable<Vacancy[]> => {
    return this.apiService.get(ApiUrl + url, {
      ...params,
      responseType: 'json',
    });
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
