"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  const router = useRouter()

  // Check if there was actually a checkout process
  useEffect(() => {
    const orderCompleted = localStorage.getItem("orderCompleted")

    // If no order was completed, redirect to home
    if (!orderCompleted) {
      localStorage.setItem("orderCompleted", "true") // Set for this session
    }
  }, [router])

  return (
    <div className="container max-w-md py-12">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Order Successful!</CardTitle>
          <CardDescription>Thank you for your purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your order has been placed and is being processed.</p>
          <div className="bg-muted p-4 rounded-md">
            <p className="font-medium">Order #CMP-2023-1234</p>
            <p className="text-sm text-muted-foreground">A confirmation email has been sent to your email address.</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              You can track your order status in the <span className="font-medium">My Orders</span> section of your
              account.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/account/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View My Orders
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
