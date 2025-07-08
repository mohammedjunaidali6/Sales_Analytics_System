
import { useState } from "react";
import { Order, OrderItem } from "./OrderManagement";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface CreateOrderFormProps {
  onSubmit: (order: Omit<Order, "id" | "date">) => void;
}

const availableProducts = [
  { id: "1", name: "Laptop Pro", price: 299.99 },
  { id: "2", name: "Wireless Mouse", price: 78.25 },
  { id: "3", name: "USB Cable", price: 15.99 },
  { id: "4", name: "Monitor 4K", price: 399.99 },
  { id: "5", name: "Keyboard RGB", price: 129.99 },
];

export const CreateOrderForm = ({ onSubmit }: CreateOrderFormProps) => {
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState<Order["status"]>("pending");
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = () => {
    setItems([...items, { id: "", name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof OrderItem, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // If product is selected, auto-fill name and price
    if (field === "id") {
      const product = availableProducts.find(p => p.id === value);
      if (product) {
        updatedItems[index].name = product.name;
        updatedItems[index].price = product.price;
      }
    }
    
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customer.trim() || items.length === 0) {
      return;
    }

    const order: Omit<Order, "id" | "date"> = {
      customer: customer.trim(),
      status,
      amount: calculateTotal(),
      items: items.filter(item => item.id && item.quantity > 0),
    };

    onSubmit(order);
    
    // Reset form
    setCustomer("");
    setStatus("pending");
    setItems([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer">Customer Name</Label>
          <Input
            id="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Enter customer name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={(value: Order["status"]) => setStatus(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Order Items</CardTitle>
            <Button type="button" variant="outline" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Product</Label>
                <Select 
                  value={item.id} 
                  onValueChange={(value) => updateItem(index, "id", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Total</Label>
                <div className="h-10 flex items-center font-medium">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeItem(index)}
                  className="h-10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No items added yet. Click "Add Item" to get started.
            </div>
          )}

          {items.length > 0 && (
            <div className="text-right">
              <div className="text-2xl font-bold">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={!customer.trim() || items.length === 0}>
          Create Order
        </Button>
      </div>
    </form>
  );
};
