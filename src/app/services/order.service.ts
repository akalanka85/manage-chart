import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../modals/order';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
}
