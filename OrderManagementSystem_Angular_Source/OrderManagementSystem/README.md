# OrderManagementSystem — Angular Frontend

This is the Angular 18 frontend project, renamed to **OrderManagementSystem**. It includes an order dashboard and REST API integration for listing, creating, updating, and deleting orders.

## Requirements
- Node.js (LTS recommended)
- npm
- Your backend server running

## Run the frontend
Open a terminal in the folder containing `package.json` and run:

```bash
npm install
npm start
```

Angular CLI will serve the app locally (normally at `http://localhost:4200`).

## Connect to your backend
Open `src/app/order/order.service.ts` and update:

```ts
private readonly apiUrl = 'http://localhost:8080/api/orders';
```

to your backend's actual base URL and controller mapping.

The frontend currently expects these REST endpoints:
- `GET /api/orders` — return a JSON array of orders
- `POST /api/orders` — create an order
- `PUT /api/orders/{id}` — update an order
- `DELETE /api/orders/{id}` — delete an order

The UI request model uses `orderId`, `customerName`, `productName`, `quantity`, `price`, and `orderDate` (optional `status` / `totalAmount`). If your backend DTO uses different names or a nested `orderDetails` structure, adapt the payload in `order.service.ts` / `order.component.ts`.

## CORS
If the frontend runs at `http://localhost:4200` and backend at another origin such as `http://localhost:8080`, enable CORS in your backend for the frontend origin. Keep the backend's actual port and route mapping.

## About the supplied EMS.zip
The supplied `EMS.zip` contains Eclipse workspace metadata (`.metadata`) only; it does not contain Java source code, controllers, entities, or backend configuration. Therefore this frontend is API-ready but cannot be mapped and tested against your specific backend until the backend source project is supplied.
