
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { OrderManagement } from "@/components/orders/OrderManagement";
import { ProductRecommendations } from "@/components/products/ProductRecommendations";
import { Button } from "@/components/ui/button";
import { LogOut, Package, BarChart3, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  // Check for saved session
  useEffect(() => {
    const savedUser = localStorage.getItem("sales_app_user");
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsAuthenticated(true);
    localStorage.setItem("sales_app_user", username);
    toast({
      title: "Welcome back!",
      description: `Successfully logged in as ${username}`,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("sales_app_user");
    setActiveTab("dashboard");
    toast({
      title: "Logged out",
      description: "Successfully logged out",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "products", label: "Products", icon: Package },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Sales Manager</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {currentUser}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="bg-card border-b border-border p-2 md:hidden">
        <div className="flex space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className="flex-1"
              >
                <Icon className="h-4 w-4 mr-1" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="flex max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-card border-r border-border min-h-screen">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "orders" && <OrderManagement />}
          {activeTab === "products" && <ProductRecommendations />}
        </main>
      </div>
    </div>
  );
};

export default Index;
