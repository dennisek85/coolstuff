import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) {

  }

  getInfo() {
    return this.http.get('/api/coolstuff');
  }

  updateInfo(colorInDb, color, number) {
    console.log('Firing updateInfo()')
    const data = {
      color: color,
      number: number
    }
    return this.http.put(`/api/coolstuff/${colorInDb}`, data);
  }
}
