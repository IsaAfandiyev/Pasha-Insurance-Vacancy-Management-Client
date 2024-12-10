export interface Vacancy {
  id: string;
  title: string;
  description: string;
  companyName: string;
  category: string;
  companyLogo: string;
  viewCount: number;
}

export interface VacancyParams {
  isActive: boolean;
  category: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phoneNumber: number;
  vacancyId: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  answer: string;
}
