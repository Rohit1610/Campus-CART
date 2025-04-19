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
  Search,
  AlertTriangle,
  Shield,
  Settings,
  User,
  Store,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  // Mock data - in a real app, this would come from your API
  const stats = {
    revenue: {
      value: 24580.75,
      change: 18.2,
      trend: "up" as const,
    },
    orders: {
      value: 842,
      change: 12.5,
      trend: "up" as const,
    },
    users: {
      value: 1254,
      change: 5.3,
      trend: "up" as const,
    },
    reports: {
      value: 12,
      change: -25.0,
      trend: "down" as const,
    },
  }

  const recentUsers = [
    {
      id: "USR-001",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "student-seller",
      joinDate: "2023-11-10",
      status: "active" as const,
    },
    {
      id: "USR-002",
      name: "Jamie Smith",
      email: "jamie.smith@example.com",
      role: "buyer",
      joinDate: "2023-11-12",
      status: "active" as const,
    },
    {
      id: "USR-003",
      name: "Engineering Society",
      email: "eng.society@university.edu",
      role: "society-seller",
      joinDate: "2023-11-05",
      status: "active" as const,
    },
    {
      id: "USR-004",
      name: "Taylor Wilson",
      email: "taylor.wilson@example.com",
      role: "student-seller",
      joinDate: "2023-11-08",
      status: "suspended" as const,
    },
    {
      id: "USR-005",
      name: "Riley Thompson",
      email: "riley.thompson@example.com",
      role: "buyer",
      joinDate: "2023-11-15",
      status: "active" as const,
    },
  ]

  const reportedItems = [
    {
      id: "RPT-001",
      product: "Fake Designer Hoodie",
      seller: "Taylor Wilson",
      reportedBy: "Jamie Smith",
      date: "2023-11-14",
      reason: "Counterfeit item",
      status: "pending" as const,
    },
    {
      id: "RPT-002",
      product: "Broken Headphones",
      seller: "Alex Johnson",
      reportedBy: "Riley Thompson",
      date: "2023-11-13",
      reason: "Item not as described",
      status: "investigating" as const,
    },
    {
      id: "RPT-003",
      product: "Outdated Textbook",
      seller: "Jordan Lee",
      reportedBy: "Sam Parker",
      date: "2023-11-12",
      reason: "Misleading description",
      status: "resolved" as const,
    },
    {
      id: "RPT-004",
      product: "Unauthorized Merchandise",
      seller: "Unknown Seller",
      reportedBy: "University Official",
      date: "2023-11-10",
      reason: "Unauthorized use of university logo",
      status: "resolved" as const,
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, monitor platform activity, and maintain site content</p>
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.value.toFixed(2)}</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <p className="text-xs text-green-500">+{stats.revenue.change}% from previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders.value}</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <p className="text-xs text-green-500">+{stats.orders.change}% from previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.value}</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <p className="text-xs text-green-500">+{stats.users.change}% from previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reported Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reports.value}</div>
            <div className="flex items-center pt-1">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500 rotate-180" />
              <p className="text-xs text-green-500">{stats.reports.change}% from previous period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Users</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/users">View All</Link>
              </Button>
            </div>
            <CardDescription>Recently registered users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {user.role === "student-seller"
                          ? "Student Seller"
                          : user.role === "society-seller"
                            ? "Society Seller"
                            : "Buyer"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "destructive"}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/users/${user.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Reported Items</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/reports">View All</Link>
              </Button>
            </div>
            <CardDescription>Items reported by users for review</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{item.product}</div>
                        <div className="text-xs text-muted-foreground">Seller: {item.seller}</div>
                      </div>
                    </TableCell>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "resolved"
                            ? "default"
                            : item.status === "investigating"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/reports/${item.id}`}>Review</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="platform">
            <div className="flex items-center justify-between">
              <CardTitle>Platform Management</CardTitle>
              <TabsList>
                <TabsTrigger value="platform">Overview</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>Manage platform settings and monitor system health</CardDescription>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="platform" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">User Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Users</span>
                    <span className="font-medium">{stats.users.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Student Sellers</span>
                    <span className="font-medium">458</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Society Sellers</span>
                    <span className="font-medium">32</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Buyers</span>
                    <span className="font-medium">764</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                    <Link href="/admin/users">
                      <User className="mr-2 h-4 w-4" />
                      Manage Users
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Product Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Products</span>
                    <span className="font-medium">1,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Student Products</span>
                    <span className="font-medium">876</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Society Products</span>
                    <span className="font-medium">369</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reported Items</span>
                    <span className="font-medium">{stats.reports.value}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                    <Link href="/admin/products">
                      <Package className="mr-2 h-4 w-4" />
                      Manage Products
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Society Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Societies</span>
                    <span className="font-medium">32</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending Approval</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Societies</span>
                    <span className="font-medium">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Suspended</span>
                    <span className="font-medium">1</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                    <Link href="/admin/societies">
                      <Store className="mr-2 h-4 w-4" />
                      Manage Societies
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="h-[300px] flex items-center justify-center bg-muted rounded-md mt-6">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart3 className="h-10 w-10 mb-2" />
                <p>Platform Analytics Dashboard</p>
                <p className="text-xs">(This would be a real chart in a production app)</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="flex mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search security logs..." className="pl-9" />
              </div>
              <Button className="ml-2" variant="outline">
                Filter
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Security Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-500" />
                      <span>System Security Status</span>
                    </div>
                    <Badge>Secure</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Failed Login Attempts (24h)</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Suspicious Activities (24h)</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Security Scan</span>
                      <span className="font-medium">Today, 03:45 AM</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/admin/security">
                      <Shield className="mr-2 h-4 w-4" />
                      View Security Dashboard
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">General Settings</h3>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/admin/settings/general">
                          <Settings className="mr-2 h-4 w-4" />
                          Manage General Settings
                        </Link>
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Payment Settings</h3>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/admin/settings/payment">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Manage Payment Settings
                        </Link>
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Email Templates</h3>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/admin/settings/email">
                          <Settings className="mr-2 h-4 w-4" />
                          Manage Email Templates
                        </Link>
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Site Content</h3>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/admin/settings/content">
                          <Settings className="mr-2 h-4 w-4" />
                          Manage Site Content
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  )
}
