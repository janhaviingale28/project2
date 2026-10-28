import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO, OrderPayload } from './order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  // Change this URL to match your backend server and controller mapping.
  private readonly apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(this.apiUrl);
  }

  createOrder(order: OrderPayload): Observable<OrderDTO> {
    return this.http.post<OrderDTO>(this.apiUrl, order);
  }

  updateOrder(id: number, order: OrderPayload): Observable<OrderDTO> {
    return this.http.put<OrderDTO>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
