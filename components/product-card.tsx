"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  sellerType: "student" | "society"
  sellerName: string
  stock: number
  isFeatured?: boolean
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  sellerType,
  sellerName,
  stock,
  isFeatured,
}: ProductCardProps) {
  const { toast } = useToast()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const addToCart = () => {
    if (stock <= 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    setIsAddingToCart(true)

    // Simulate adding to cart
    setTimeout(() => {
      // Get existing cart items from localStorage
      const existingCartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems") || "[]")
        : []

      // Check if product already exists in cart
      const existingItemIndex = existingCartItems.findIndex((item: any) => item.id === id)

      if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        existingCartItems[existingItemIndex].quantity += 1
      } else {
        // Add new product to cart
        existingCartItems.push({
          id,
          name,
          price,
          image,
          quantity: 1,
          seller: sellerName,
          sellerType,
        })
      }

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(existingCartItems))

      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      })

      setIsAddingToCart(false)

      // Force a reload to update cart count in header
      window.dispatchEvent(new Event("storage"))
    }, 500)
  }

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <Link href={`/product/${id}`} className="block aspect-square overflow-hidden">
          <div className="bg-muted w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground text-sm">{image}</span>
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
        {isFeatured && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="mr-2">
              Featured
            </Badge>
          </div>
        )}
        {stock <= 0 && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link href={`/product/${id}`} className="font-medium hover:underline">
              {name}
            </Link>
            <div className="text-sm text-muted-foreground">
              {sellerType === "society" ? "Society" : "Student"}: {sellerName}
            </div>
          </div>
          <div className="font-semibold">${price.toFixed(2)}</div>
        </div>
        <div className="text-xs text-muted-foreground">Category: {category}</div>
        {stock > 0 && stock <= 5 && <div className="text-xs text-amber-500 mt-1">Only {stock} left in stock</div>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" onClick={addToCart} disabled={stock <= 0 || isAddingToCart}>
          {isAddingToCart ? (
            "Adding..."
          ) : stock <= 0 ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
