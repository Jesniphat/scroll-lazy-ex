import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fact } from '../_model/fact.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactService {

  constructor(private http: HttpClient) { }

  getRandomFact(page: number = 0): Observable<Fact[]> {
    const month = Math.floor(Math.random() * 11) + 1;
    let maxDay = 30;
    if (month === 2) {
      maxDay = 27;
    } else if ([4, 6, 9, 11].includes(month)) {
      maxDay = 29;
    }
    const day = Math.floor(Math.random() * maxDay) + 1;
    const data = this.http.get<Fact[]>('http://localhost:3000/api/paging?page=' + page);
    return data;
  }
}
