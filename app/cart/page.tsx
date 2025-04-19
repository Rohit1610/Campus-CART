"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, MinusCircle, PlusCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  seller: string
  sellerType: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const { toast } = useToast()

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const items = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems") || "[]") : []
    setCartItems(items)
  }, [])

  // Update localStorage whenever cart items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    // Trigger storage event to update cart count in header
    window.dispatchEvent(new Event("storage"))
  }, [cartItems])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const applyCoupon = () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)

    // Simulate coupon application
    setTimeout(() => {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or has expired.",
        variant: "destructive",
      })
      setIsApplyingCoupon(false)
    }, 1000)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 5.0 : 0
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any items to your cart yet.</p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                          <span className="text-muted-foreground text-xs">{item.image}</span>
                        </div>
                        <div>
                          <Link href={`/product/${item.id}`} className="font-medium hover:underline">
                            {item.name}
                          </Link>
                          <div className="text-sm text-muted-foreground">
                            Seller: {item.seller} ({item.sellerType === "society" ? "Society" : "Student"})
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <MinusCircle className="h-4 w-4" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <PlusCircle className="h-4 w-4" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Coupon code"
                  className="w-40"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button variant="outline" onClick={applyCoupon} disabled={isApplyingCoupon || !couponCode.trim()}>
                  {isApplyingCoupon ? "Applying..." : "Apply"}
                </Button>
              </div>
              <Button variant="outline" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">We Accept</h3>
                <div className="flex gap-2">
                  <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Visa</span>
                  </div>
                  <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">MC</span>
                  </div>
                  <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Amex</span>
                  </div>
                  <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">PayPal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
