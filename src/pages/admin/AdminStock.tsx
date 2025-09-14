import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface Stock {
  id: string;
  detergentType: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
}

export default function AdminStock() {
  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: "1",
      detergentType: "Standard",
      currentStock: 150,
      minThreshold: 50,
      unit: "kg",
    },
    {
      id: "2",
      detergentType: "Hypoallergenic",
      currentStock: 85,
      minThreshold: 30,
      unit: "kg",
    },
    {
      id: "3",
      detergentType: "Fabric Softener",
      currentStock: 45,
      minThreshold: 20,
      unit: "L",
    },
    {
      id: "4",
      detergentType: "Stain Remover",
      currentStock: 25,
      minThreshold: 15,
      unit: "L",
    },
  ]);

  const [updateAmounts, setUpdateAmounts] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const updateStock = (stockId: string, amount: number) => {
    setStocks(stocks.map(stock => 
      stock.id === stockId 
        ? { ...stock, currentStock: Math.max(0, stock.currentStock + amount) }
        : stock
    ));
    
    const stockItem = stocks.find(s => s.id === stockId);
    toast({
      title: "Stock Updated",
      description: `${stockItem?.detergentType} stock ${amount > 0 ? 'increased' : 'decreased'} by ${Math.abs(amount)} ${stockItem?.unit}`,
    });
  };

  const handleCustomUpdate = (stockId: string) => {
    const amount = parseInt(updateAmounts[stockId] || "0");
    if (amount !== 0) {
      updateStock(stockId, amount);
      setUpdateAmounts({...updateAmounts, [stockId]: ""});
    }
  };

  const getStockStatus = (stock: Stock) => {
    if (stock.currentStock <= stock.minThreshold) {
      return <Badge variant="destructive">Low Stock</Badge>;
    } else if (stock.currentStock <= stock.minThreshold * 1.5) {
      return <Badge variant="secondary" className="bg-warning text-warning-foreground">Medium</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-success text-success-foreground">Good</Badge>;
    }
  };

  const getStockPercentage = (stock: Stock) => {
    const maxStock = stock.minThreshold * 3; // Assuming max is 3x threshold
    return (stock.currentStock / maxStock) * 100;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation userType="admin" />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Stock Management</h1>
          <p className="text-muted-foreground">Monitor and update detergent and supply inventory levels</p>
        </div>

        <Card className="card-elegant mb-6">
          <CardHeader>
            <CardTitle>Detergent Stock Levels</CardTitle>
            <CardDescription>Current inventory status and stock management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Detergent Type</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Quick Actions</TableHead>
                    <TableHead>Custom Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stocks.map((stock) => (
                    <TableRow key={stock.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{stock.detergentType}</TableCell>
                      <TableCell>
                        <span className="text-lg font-semibold">{stock.currentStock}</span>
                        <span className="text-sm text-muted-foreground ml-1">{stock.unit}</span>
                      </TableCell>
                      <TableCell>{getStockStatus(stock)}</TableCell>
                      <TableCell>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              stock.currentStock <= stock.minThreshold 
                                ? 'bg-destructive' 
                                : stock.currentStock <= stock.minThreshold * 1.5
                                ? 'bg-warning'
                                : 'bg-success'
                            }`}
                            style={{ width: `${Math.min(getStockPercentage(stock), 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Min: {stock.minThreshold} {stock.unit}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStock(stock.id, -10)}
                            disabled={stock.currentStock <= 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStock(stock.id, 10)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <Input
                            type="number"
                            placeholder="±Amount"
                            className="w-20 h-8"
                            value={updateAmounts[stock.id] || ""}
                            onChange={(e) => setUpdateAmounts({
                              ...updateAmounts,
                              [stock.id]: e.target.value
                            })}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleCustomUpdate(stock.id)}
                            disabled={!updateAmounts[stock.id]}
                          >
                            Update
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stocks.map((stock, index) => (
            <Card 
              key={stock.id} 
              className="card-elegant"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{stock.detergentType}</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stock.currentStock}</span>
                  <span className="text-sm text-muted-foreground">{stock.unit}</span>
                </div>
              </CardHeader>
              <CardContent>
                {getStockStatus(stock)}
                <div className="mt-3 flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStock(stock.id, -5)}
                    disabled={stock.currentStock <= 0}
                    className="flex-1"
                  >
                    -5
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStock(stock.id, 5)}
                    className="flex-1"
                  >
                    +5
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-elegant mt-6">
          <CardHeader>
            <CardTitle>Stock Alerts</CardTitle>
            <CardDescription>Items that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stocks
                .filter(stock => stock.currentStock <= stock.minThreshold)
                .map(stock => (
                  <div key={stock.id} className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div>
                      <p className="font-medium text-destructive">{stock.detergentType}</p>
                      <p className="text-sm text-muted-foreground">
                        Only {stock.currentStock} {stock.unit} remaining (below threshold of {stock.minThreshold} {stock.unit})
                      </p>
                    </div>
                    <Button size="sm" variant="destructive">
                      Reorder
                    </Button>
                  </div>
                ))}
              {stocks.filter(stock => stock.currentStock <= stock.minThreshold).length === 0 && (
                <p className="text-center text-muted-foreground py-4">All stock levels are adequate</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}