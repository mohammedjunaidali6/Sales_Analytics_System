
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "./RevenueChart";
import { TopProductsChart } from "./TopProductsChart";
import { RecentOrders } from "./RecentOrders";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    activeCustomers: 0,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const updateStats = () => {
      setStats({
        totalRevenue: Math.floor(Math.random() * 100000) + 150000,
        totalOrders: Math.floor(Math.random() * 500) + 1200,
        avgOrderValue: Math.floor(Math.random() * 200) + 120,
        activeCustomers: Math.floor(Math.random() * 100) + 450,
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      description: "+12% from last month",
      icon: DollarSign,
      trend: "+12%",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      description: "+8% from last month",
      icon: ShoppingCart,
      trend: "+8%",
    },
    {
      title: "Avg Order Value",
      value: `$${stats.avgOrderValue}`,
      description: "+5% from last month",
      icon: TrendingUp,
      trend: "+5%",
    },
    {
      title: "Active Customers",
      value: stats.activeCustomers.toLocaleString(),
      description: "+15% from last month",
      icon: Users,
      trend: "+15%",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your sales performance and recent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.trend}</span> {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <TopProductsChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentOrders />
        </CardContent>
      </Card>
    </div>
  );
};
