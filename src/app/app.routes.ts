import { Routes } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ApplyFormComponent } from './apply-form/apply-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cv',
    component: CvComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'apply/:id',
    component: ApplyFormComponent,
  },
];
