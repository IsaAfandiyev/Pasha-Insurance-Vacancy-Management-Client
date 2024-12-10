import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyFormService } from '../services/apply-form.service';
import { CommonModule } from '@angular/common';
import {
  NzFormControlComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { VacancyService } from '../services/vacancy.service';

@Component({
  selector: 'app-apply-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NzFormLabelComponent,
    NzFormControlComponent,
  ],
  templateUrl: './apply-form.component.html',
  styleUrl: './apply-form.component.scss',
})
export class ApplyFormComponent {
  vacancyId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applyFormService: ApplyFormService,
    private vacancyService: VacancyService
  ) {}

  formSubmit(e: any) {
    const formValues = e.value;

    this.applyFormService.setData({ ...formValues, vacancyId: this.vacancyId });
    this.router.navigate(['/test']);
  }

  fetchVacancy(id: string): void {
    this.vacancyService.getVacancyById('/vacancy', id).subscribe({
      error: () => {
        this.router.navigate(['/']);
      },
    });
  }

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchVacancy(this.vacancyId);
  }
}
