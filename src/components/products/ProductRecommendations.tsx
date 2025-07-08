
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  stock: number;
  category: string;
  performance: "high" | "medium" | "low";
  trend: "up" | "down" | "stable";
}

export const ProductRecommendations = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Laptop Pro",
      sales: 142,
      revenue: 42580,
      stock: 25,
      category: "Electronics",
      performance: "high",
      trend: "up"
    },
    {
      id: "2", 
      name: "Wireless Mouse",
      sales: 98,
      revenue: 7663,
      stock: 45,
      category: "Electronics",
      performance: "medium",
      trend: "stable"
    },
    {
      id: "3",
      name: "USB Cable",
      sales: 87,
      revenue: 1391,
      stock: 120,
      category: "Accessories",
      performance: "medium", 
      trend: "down"
    },
    {
      id: "4",
      name: "Monitor 4K",
      sales: 45,
      revenue: 17995,
      stock: 8,
      category: "Electronics",
      performance: "high",
      trend: "up"
    },
    {
      id: "5",
      name: "Keyboard RGB",
      sales: 33,
      revenue: 4289,
      stock: 15,
      category: "Electronics", 
      performance: "low",
      trend: "down"
    },
    {
      id: "6",
      name: "Tablet Case",
      sales: 12,
      revenue: 359,
      stock: 67,
      category: "Accessories",
      performance: "low",
      trend: "down"
    }
  ]);

  // AI-powered recommendations (manual logic simulation)
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Top performers to promote
    const topPerformers = products
      .filter(p => p.performance === "high" && p.trend === "up")
      .slice(0, 3);
    
    if (topPerformers.length > 0) {
      recommendations.push({
        type: "promote",
        title: "Boost High Performers",
        description: "Increase marketing budget for these trending products",
        products: topPerformers,
        priority: "high"
      });
    }

    // Low stock alerts
    const lowStock = products.filter(p => p.stock < 20);
    if (lowStock.length > 0) {
      recommendations.push({
        type: "restock",
        title: "Low Stock Alert", 
        description: "These products need immediate restocking",
        products: lowStock,
        priority: "urgent"
      });
    }

    // Underperforming products
    const underperforming = products
      .filter(p => p.performance === "low" && p.trend === "down")
      .slice(0, 3);
    
    if (underperforming.length > 0) {
      recommendations.push({
        type: "optimize",
        title: "Optimize Underperformers",
        description: "Consider promotional pricing or bundle deals",
        products: underperforming,
        priority: "medium"
      });
    }

    return recommendations;
  };

  const [recommendations, setRecommendations] = useState(generateRecommendations());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRecommendations(generateRecommendations());
    }, 30000);

    return () => clearInterval(interval);
  }, [products]);

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium": 
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-red-500 bg-red-50";
      case "high":
        return "border-orange-500 bg-orange-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Product Intelligence</h2>
        <p className="text-muted-foreground">
          AI-powered recommendations and product performance analytics
        </p>
      </div>

      {/* AI Recommendations */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">AI Recommendations</h3>
        {recommendations.map((rec, index) => (
          <Card key={index} className={`border-l-4 ${getPriorityColor(rec.priority)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {rec.type === "restock" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                    {rec.type === "promote" && <Star className="h-5 w-5 text-green-500" />}
                    {rec.type === "optimize" && <TrendingUp className="h-5 w-5 text-yellow-500" />}
                    {rec.title}
                  </CardTitle>
                  <CardDescription>{rec.description}</CardDescription>
                </div>
                <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                  {rec.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {rec.products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-2 bg-white rounded border">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{product.name}</span>
                      <Badge className={getPerformanceColor(product.performance)} variant="secondary">
                        {product.performance}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getTrendIcon(product.trend)}
                      <span>{product.sales} sales</span>
                      {rec.type === "restock" && (
                        <span className="text-red-600 font-medium">({product.stock} left)</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Performance Analysis</CardTitle>
          <CardDescription>Detailed analytics for all products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPerformanceColor(product.performance)} variant="secondary">
                      {product.performance}
                    </Badge>
                    {getTrendIcon(product.trend)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Sales</p>
                    <p className="font-medium">{product.sales} units</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-medium">${product.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Stock Level</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(product.stock / 150) * 100} className="flex-1" />
                      <span className={`font-medium ${product.stock < 20 ? 'text-red-600' : ''}`}>
                        {product.stock}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg. Order Value</p>
                    <p className="font-medium">${(product.revenue / product.sales).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
