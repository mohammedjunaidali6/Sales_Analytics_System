
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    amount: 299.99,
    status: "completed",
    date: "2024-01-15",
    items: 3,
  },
  {
    id: "ORD-002", 
    customer: "Sarah Johnson",
    amount: 156.50,
    status: "processing",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Mike Davis",
    amount: 89.99,
    status: "shipped",
    date: "2024-01-14",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Emily Brown",
    amount: 445.00,
    status: "completed",
    date: "2024-01-14",
    items: 5,
  },
  {
    id: "ORD-005",
    customer: "Alex Wilson",
    amount: 67.25,
    status: "pending",
    date: "2024-01-13",
    items: 2,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const RecentOrders = () => {
  return (
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{order.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{order.customer}</p>
              <p className="text-sm text-muted-foreground">{order.id} • {order.items} items</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="font-medium">${order.amount}</p>
            <Badge className={getStatusColor(order.status)} variant="secondary">
              {order.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
