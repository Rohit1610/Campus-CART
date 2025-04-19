"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Share2, ShoppingCart, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("Navy Blue")
  const [selectedSize, setSelectedSize] = useState("L")
  const [quantity, setQuantity] = useState(1)
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Mock product data - in a real app, this would come from your API
  const product = {
    id: params.id,
    name: "Engineering Society Hoodie",
    price: 35.0,
    description:
      "Official Engineering Society hoodie for the current academic year. Made with high-quality cotton blend material for comfort and durability. Features the Engineering Society logo on the front and the university crest on the back.",
    longDescription:
      "This premium hoodie is perfect for showing your Engineering Society pride around campus. The hoodie is made from a 80% cotton and 20% polyester blend, making it both comfortable and durable for everyday wear. The ribbed cuffs and hem provide a snug fit, while the adjustable drawstring hood offers extra warmth when needed. Available in sizes S through XXL, this hoodie runs true to size with a slightly relaxed fit that's perfect for layering.",
    images: ["Hoodie Front Image", "Hoodie Back Image", "Hoodie Detail Image", "Hoodie Worn Image"],
    category: "Clothing",
    sellerType: "society",
    sellerName: "Engineering Society",
    sellerRating: 4.8,
    condition: "New",
    inStock: true,
    stock: 25,
    colors: ["Navy Blue", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    reviews: [
      {
        id: "1",
        user: "Alex Johnson",
        rating: 5,
        date: "2023-10-15",
        comment: "Great quality hoodie! The material is thick and warm, perfect for winter on campus.",
      },
      {
        id: "2",
        user: "Jamie Smith",
        rating: 4,
        date: "2023-09-28",
        comment:
          "Nice design and comfortable fit. Runs slightly large so I'd recommend sizing down if you're between sizes.",
      },
      {
        id: "3",
        user: "Taylor Wilson",
        rating: 5,
        date: "2023-11-02",
        comment: "Love representing the Engineering Society with this hoodie. Gets lots of compliments around campus!",
      },
    ],
  }

  const addToCart = () => {
    if (product.stock <= 0) {
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
      const existingItemIndex = existingCartItems.findIndex((item: any) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        existingCartItems[existingItemIndex].quantity += quantity
      } else {
        // Add new product to cart
        existingCartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity: quantity,
          seller: product.sellerName,
          sellerType: product.sellerType,
        })
      }

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(existingCartItems))

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })

      setIsAddingToCart(false)

      // Force a reload to update cart count in header
      window.dispatchEvent(new Event("storage"))
    }, 500)
  }

  const submitReview = () => {
    if (!reviewText.trim()) {
      toast({
        title: "Review required",
        description: "Please enter your review before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingReview(true)

    // Simulate submitting review
    setTimeout(() => {
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      })

      setReviewText("")
      setIsSubmittingReview(false)
    }, 1000)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2 space-y-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-muted-foreground text-lg">{product.images[selectedImage]}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square bg-muted rounded-md overflow-hidden flex items-center justify-center text-xs p-1 ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <span className="text-muted-foreground">{image}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
            <span>/</span>
            <Link href={`/shop/${product.category.toLowerCase()}`} className="hover:underline">
              {product.category}
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.sellerRating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.sellerRating} ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>

          <div className="space-y-6 mb-6">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <Select defaultValue={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-medium mb-2">Size</h3>
              <Select defaultValue={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <Select
                defaultValue="1"
                onValueChange={(value) => setQuantity(Number.parseInt(value))}
                disabled={product.stock <= 0}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(Math.min(5, product.stock))].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {product.stock > 0 && product.stock <= 5 && (
                <p className="text-xs text-amber-500 mt-1">Only {product.stock} left in stock</p>
              )}
              {product.stock <= 0 && <p className="text-xs text-destructive mt-1">Out of stock</p>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button className="flex-1" size="lg" onClick={addToCart} disabled={product.stock <= 0 || isAddingToCart}>
              {isAddingToCart ? (
                "Adding..."
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-4 w-4" />
              Add to Wishlist
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Badge variant="outline" className="rounded-sm">
              {product.condition}
            </Badge>
            <Badge variant="outline" className="rounded-sm">
              {product.sellerType === "society" ? "Society Seller" : "Student Seller"}
            </Badge>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Campus Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Free pickup at the Student Union or $2 delivery to campus residences
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="mb-12">
        <Tabs defaultValue="details">
          <TabsList className="mb-6">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
            <TabsTrigger value="seller">Seller Information</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <h2 className="text-2xl font-bold">Product Details</h2>
            <p>{product.longDescription}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>80% cotton, 20% polyester blend</li>
                  <li>Ribbed cuffs and hem</li>
                  <li>Adjustable drawstring hood</li>
                  <li>Front kangaroo pocket</li>
                  <li>Engineering Society logo on front</li>
                  <li>University crest on back</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Care Instructions</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Machine wash cold</li>
                  <li>Tumble dry low</li>
                  <li>Do not bleach</li>
                  <li>Do not iron decoration</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <Button onClick={() => document.getElementById("write-review")?.scrollIntoView({ behavior: "smooth" })}>
                Write a Review
              </Button>
            </div>

            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{review.user}</span>
                    <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>

            <div id="write-review" className="mt-8 border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Write a Review</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewRating(rating)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            rating <= reviewRating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="review">Your Review</Label>
                  <Textarea
                    id="review"
                    placeholder="Share your experience with this product..."
                    className="mt-2"
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>
                <Button onClick={submitReview} disabled={isSubmittingReview}>
                  {isSubmittingReview ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seller" className="space-y-4">
            <h2 className="text-2xl font-bold">About the Seller</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Logo</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{product.sellerName}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.sellerRating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{product.sellerRating} seller rating</span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              The Engineering Society is one of the largest student organizations on campus, representing all
              engineering students. We organize social events, professional development workshops, and sell official
              merchandise to fund our activities.
            </p>
            <Button variant="outline" asChild>
              <Link href={`/societies/${product.sellerName.toLowerCase().replace(/\s+/g, "-")}`}>
                View All Products from {product.sellerName}
              </Link>
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
