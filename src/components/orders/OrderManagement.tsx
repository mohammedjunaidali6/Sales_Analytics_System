
import { useState } from "react";
import { OrderList } from "./OrderList";
import { CreateOrderForm } from "./CreateOrderForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
  date: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: "John Smith",
      amount: 299.99,
      status: "completed",
      date: "2024-01-15",
      items: [
        { id: "1", name: "Laptop Pro", quantity: 1, price: 299.99 }
      ]
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson", 
      amount: 156.50,
      status: "processing",
      date: "2024-01-15",
      items: [
        { id: "2", name: "Wireless Mouse", quantity: 2, price: 78.25 }
      ]
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateOrder = (newOrder: Omit<Order, "id" | "date">) => {
    const order: Order = {
      ...newOrder,
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
    };
    setOrders([order, ...orders]);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Order Management</h2>
          <p className="text-muted-foreground">
            Manage and track all sales orders
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
            </DialogHeader>
            <CreateOrderForm onSubmit={handleCreateOrder} />
          </DialogContent>
        </Dialog>
      </div>

      <OrderList 
        orders={orders}
        onUpdateOrder={handleUpdateOrder}
        onDeleteOrder={handleDeleteOrder}
      />
    </div>
  );
};
