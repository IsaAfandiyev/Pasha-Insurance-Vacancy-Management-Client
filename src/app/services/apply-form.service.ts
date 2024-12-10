import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApplyFormService {
  private state: any;

  setData(data: any) {
    this.state = data;
  }

  getData() {
    return this.state;
  }
}
