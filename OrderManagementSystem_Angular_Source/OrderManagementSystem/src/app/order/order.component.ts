import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderDTO, OrderPayload } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: OrderDTO[] = [];
  editingId: number | null = null;
  message = '';
  loading = false;
  apiError = false;
  order: OrderPayload = this.emptyOrder();

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private emptyOrder(): OrderPayload {
    return {
      customerName: '',
      productName: '',
      quantity: 1,
      price: 0,
      orderDate: new Date().toISOString().slice(0, 10),
      status: 'PENDING'
    };
  }

  get total(): number {
    return Number(this.order.quantity || 0) * Number(this.order.price || 0);
  }

  loadOrders(): void {
    this.loading = true;
    this.apiError = false;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (error: unknown) => {
        this.loading = false;
        this.apiError = true;
        this.message = 'Could not connect to the backend API. Check that the backend is running and the API URL is correct.';
        console.error('Loading orders failed', error);
      }
    });
  }

  saveOrder(): void {
    if (!this.order.customerName.trim() || !this.order.productName.trim() ||
        Number(this.order.quantity) < 1 || Number(this.order.price) < 0) {
      this.message = 'Please fill all fields correctly.';
      return;
    }

    const payload: OrderPayload = {
      ...this.order,
      customerName: this.order.customerName.trim(),
      productName: this.order.productName.trim(),
      quantity: Number(this.order.quantity),
      price: Number(this.order.price),
      totalAmount: Number(this.order.quantity) * Number(this.order.price)
    };

    this.loading = true;
    this.message = '';
    const request = this.editingId !== null
      ? this.orderService.updateOrder(this.editingId, payload)
      : this.orderService.createOrder(payload);

    request.subscribe({
      next: () => {
        this.message = this.editingId !== null ? 'Order updated successfully.' : 'Order created successfully.';
        this.clearForm(false);
        this.loadOrders();
      },
      error: (error: unknown) => {
        this.loading = false;
        this.message = 'Unable to save the order. Verify the backend endpoint and request fields.';
        console.error('Saving order failed', error);
      }
    });
  }

  editOrder(item: OrderDTO): void {
    if (item.orderId === undefined) {
      this.message = 'This order does not contain an order ID, so it cannot be edited.';
      return;
    }
    this.order = {
      customerName: item.customerName ?? '',
      productName: item.productName ?? '',
      quantity: Number(item.quantity ?? 1),
      price: Number(item.price ?? 0),
      orderDate: item.orderDate ?? new Date().toISOString().slice(0, 10),
      status: item.status ?? 'PENDING'
    };
    this.editingId = item.orderId;
    this.message = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteOrder(id: number | undefined): void {
    if (id === undefined) {
      this.message = 'This order does not contain an order ID, so it cannot be deleted.';
      return;
    }
    if (!confirm('Delete this order?')) return;

    this.loading = true;
    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.message = 'Order deleted successfully.';
        if (this.editingId === id) this.clearForm(false);
        this.loadOrders();
      },
      error: (error: unknown) => {
        this.loading = false;
        this.message = 'Unable to delete the order. Check the backend API.';
        console.error('Deleting order failed', error);
      }
    });
  }

  clearForm(clearMessage = true): void {
    this.order = this.emptyOrder();
    this.editingId = null;
    if (clearMessage) this.message = '';
  }

  trackByOrderId(_index: number, item: OrderDTO): number | undefined {
    return item.orderId;
  }
}
