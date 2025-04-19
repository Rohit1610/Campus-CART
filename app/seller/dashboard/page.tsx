"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function SellerDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  // Mock data - in a real app, this would come from your API
  const stats = {
    revenue: {
      value: 1245.89,
      change: 12.5,
      trend: "up" as const,
    },
    orders: {
      value: 42,
      change: 8.2,
      trend: "up" as const,
    },
    products: {
      value: 15,
      change: 0,
      trend: "neutral" as const,
    },
    visitors: {
      value: 324,
      change: -4.5,
      trend: "down" as const,
    },
  }

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Alex Johnson",
      product: "Computer Science Textbook",
      date: "2023-11-15",
      amount: 45.99,
      status: "completed" as const,
    },
    {
      id: "ORD-002",
      customer: "Jamie Smith",
      product: "Engineering Society Hoodie",
      date: "2023-11-14",
      amount: 35.0,
      status: "processing" as const,
    },
    {
      id: "ORD-003",
      customer: "Taylor Wilson",
      product: "Wireless Headphones",
      date: "2023-11-12",
      amount: 79.99,
      status: "completed" as const,
    },
    {
      id: "ORD-004",
      customer: "Riley Thompson",
      product: "Graphing Calculator",
      date: "2023-11-10",
      amount: 89.99,
      status: "completed" as const,
    },
    {
      id: "ORD-005",
      customer: "Jordan Lee",
      product: "Computer Science Textbook",
      date: "2023-11-08",
      amount: 45.99,
      status: "cancelled" as const,
    },
  ]

  const topProducts = [
    {
      id: "1",
      name: "Computer Science Textbook",
      category: "Books",
      price: 45.99,
      sold: 12,
      stock: 8,
    },
    {
      id: "3",
      name: "Engineering Society Hoodie",
      category: "Clothing",
      price: 35.0,
      sold: 10,
      stock: 25,
    },
    {
      id: "2",
      name: "Wireless Headphones",
      category: "Electronics",
      price: 79.99,
      sold: 8,
      stock: 3,
    },
    {
      id: "4",
      name: "Graphing Calculator",
      category: "Electronics",
      price: 89.99,
      sold: 6,
      stock: 4,
    },
    {
      id: "5",
      name: "Biology Lab Manual",
      category: "Books",
      price: 24.99,
      sold: 5,
      stock: 12,
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your products, track orders, and view analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/seller/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.value.toFixed(2)}</div>
            <div className="flex items-center pt-1">
              {stats.revenue.trend === "up" ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : stats.revenue.trend === "down" ? (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              ) : null}
              <p
                className={`text-xs ${
                  stats.revenue.trend === "up"
                    ? "text-green-500"
                    : stats.revenue.trend === "down"
                      ? "text-red-500"
                      : "text-muted-foreground"
                }`}
              >
                {stats.revenue.change > 0 ? "+" : ""}
                {stats.revenue.change}% from previous period
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders.value}</div>
            <div className="flex items-center pt-1">
              {stats.orders.trend === "up" ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : stats.orders.trend === "down" ? (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              ) : null}
              <p
                className={`text-xs ${
                  stats.orders.trend === "up"
                    ? "text-green-500"
                    : stats.orders.trend === "down"
                      ? "text-red-500"
                      : "text-muted-foreground"
                }`}
              >
                {stats.orders.change > 0 ? "+" : ""}
                {stats.orders.change}% from previous period
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.products.value}</div>
            <div className="flex items-center pt-1">
              {stats.products.trend === "up" ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : stats.products.trend === "down" ? (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              ) : null}
              <p
                className={`text-xs ${
                  stats.products.trend === "up"
                    ? "text-green-500"
                    : stats.products.trend === "down"
                      ? "text-red-500"
                      : "text-muted-foreground"
                }`}
              >
                {stats.products.change > 0 ? "+" : ""}
                {stats.products.change}% from previous period
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.visitors.value}</div>
            <div className="flex items-center pt-1">
              {stats.visitors.trend === "up" ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : stats.visitors.trend === "down" ? (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              ) : null}
              <p
                className={`text-xs ${
                  stats.visitors.trend === "up"
                    ? "text-green-500"
                    : stats.visitors.trend === "down"
                      ? "text-red-500"
                      : "text-muted-foreground"
                }`}
              >
                {stats.visitors.change > 0 ? "+" : ""}
                {stats.visitors.change}% from previous period
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/seller/orders">View All</Link>
              </Button>
            </div>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <Link href={`/seller/orders/${order.id}`} className="hover:underline">
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "completed"
                            ? "default"
                            : order.status === "processing"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/seller/products">View All</Link>
              </Button>
            </div>
            <CardDescription>Your best-selling products</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <Link href={`/seller/products/${product.id}`} className="hover:underline">
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.sold} units</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="analytics">
            <div className="flex items-center justify-between">
              <CardTitle>Performance</CardTitle>
              <TabsList>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>Track your sales and inventory performance</CardDescription>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart3 className="h-10 w-10 mb-2" />
                <p>Sales Analytics Chart</p>
                <p className="text-xs">(This would be a real chart in a production app)</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="inventory" className="space-y-4">
            <div className="flex mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9" />
              </div>
              <Button className="ml-2" variant="outline">
                Filter
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <Link href={`/seller/products/${product.id}`} className="hover:underline">
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={product.stock < 5 ? "destructive" : "outline"}>{product.stock} in stock</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/seller/products/${product.id}/edit`}>Edit</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  )
}
