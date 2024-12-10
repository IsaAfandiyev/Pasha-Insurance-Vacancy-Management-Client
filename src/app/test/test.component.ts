import { Component } from '@angular/core';
import { ApplyFormService } from '../services/apply-form.service';
import { Application, Question, Vacancy } from '../types';
import { Router } from '@angular/router';
import { VacancyService } from '../services/vacancy.service';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../components/loading/loading.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    NzTabsModule,
    NzRadioModule,
    FormsModule,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  constructor(
    private applyFormService: ApplyFormService,
    private router: Router,
    private vacancyService: VacancyService
  ) {}

  application!: Application;
  status: 'welcome' | 'questions' | 'cv' | 'finish' | 'failed' = 'welcome';
  questions: Question[] = [];
  step = 0;
  disabledTabs: boolean[] = [];
  currentAnswer?: string;
  answers: string[] = [];

  selectedFile: File | null = null;
  fileError: string = '';

  timer: any;
  questionTimer = 60;
  questionTimerDisplay = '';

  loading = false;

  onTestStart() {
    this.loading = true;
    const timer = setInterval(() => {
      const minutes = Math.floor(this.questionTimer / 60);
      const seconds = this.questionTimer % 60;

      this.questionTimerDisplay = `${minutes}:${seconds
        .toString()
        .padStart(2, '0')}`;

      this.questionTimer--;

      if (this.questionTimer < 0) {
        clearInterval(timer);
        this.questionTimerDisplay = "Time's up!";
        this.status = 'failed';
      }
    }, 1000);
    this.status = 'questions';
    this.loading = false;
  }

  fetchQuestions(vacancyId: string) {
    this.loading = true;
    this.vacancyService.getQuestions('/test/' + vacancyId).subscribe({
      next: (questions: any) => {
        this.questions = questions;
        this.questionTimer = questions.length * 60;

        this.initializeTabs();
        this.currentAnswer = this.questions[0].options[0];
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  initializeTabs() {
    this.disabledTabs = this.questions.map((_, index) => index !== 0);
  }

  goToNextTab(currentIndex: number, tabset: any) {
    this.disabledTabs[currentIndex] = true;
    if (currentIndex + 1 < this.questions.length) {
      this.disabledTabs[currentIndex + 1] = false;
      setTimeout(() => tabset.setSelectedIndex(currentIndex + 1), 0);
    }

    if (this.currentAnswer) {
      this.answers.push(this.currentAnswer);
    }

    this.currentAnswer = this.questions[currentIndex + 1].options[0];
  }

  onOptionChange(selectedOption: any) {
    this.currentAnswer = selectedOption;
  }

  onFinishTest() {
    if (this.currentAnswer) {
      this.answers.push(this.currentAnswer);
    }

    this.status = 'cv';
  }

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.fileError = ''; // Clear any previous errors

    // File validation
    if (this.selectedFile) {
      if (!this.isValidFile(this.selectedFile)) {
        this.fileError =
          'Invalid file type or size. Please upload an image (max 5MB).';
        this.selectedFile = null; // Reset selected file
        return;
      }
    }
  }

  // Validate file (size and type)
  isValidFile(file: File): boolean {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    // Check file size and type
    if (file.size > maxSize) {
      return false;
    }
    if (!allowedTypes.includes(file.type)) {
      return false;
    }
    return true;
  }

  // Upload file to the backend
  onUpload(): void {
    if (!this.selectedFile) {
      this.fileError = 'Please select a file first!';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.loading = true;
    this.vacancyService.uploadCv('/upload', formData).subscribe({
      next: () => {
        this.status = 'finish';
      },
      error: (error) => {
        console.error('File upload failed', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  ngOnInit() {
    this.application = this.applyFormService.getData() as Application;

    if (this.application) {
      this.fetchQuestions(this.application.vacancyId);
    } else {
      this.router.navigate(['/']);
    }
  }
}
