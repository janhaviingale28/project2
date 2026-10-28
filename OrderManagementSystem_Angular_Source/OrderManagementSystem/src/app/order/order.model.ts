export interface OrderDetailDTO {
  detailId?: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderDTO {
  orderId?: number;
  customerName: string;
  productName: string;
  quantity: number;
  price: number;
  orderDate: string;
  status?: string;
  totalAmount?: number;
  orderDetails?: OrderDetailDTO[];
}

export type OrderPayload = Omit<OrderDTO, 'orderId'>;
