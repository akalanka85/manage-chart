import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../modals/order';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getData(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.baseUrl}`);
  }
}
