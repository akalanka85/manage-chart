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

  getData(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }
}
