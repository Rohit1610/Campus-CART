"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import ProductCard from "@/components/product-card"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [priceRange, setPriceRange] = useState([0, 100])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in a real app, this would come from your API
  const allProducts = [
    {
      id: "1",
      name: "Computer Science Textbook",
      price: 45.99,
      image: "Book Image",
      category: "Books",
      sellerType: "student" as const,
      sellerName: "Alex Johnson",
      stock: 8,
    },
    {
      id: "2",
      name: "Wireless Headphones",
      price: 79.99,
      image: "Headphones Image",
      category: "Electronics",
      sellerType: "student" as const,
      sellerName: "Jamie Smith",
      stock: 3,
    },
    {
      id: "3",
      name: "Engineering Society Hoodie",
      price: 35.0,
      image: "Hoodie Image",
      category: "Clothing",
      sellerType: "society" as const,
      sellerName: "Engineering Society",
      stock: 25,
    },
    {
      id: "4",
      name: "Graphing Calculator",
      price: 89.99,
      image: "Calculator Image",
      category: "Electronics",
      sellerType: "student" as const,
      sellerName: "Taylor Wilson",
      stock: 0,
    },
    {
      id: "5",
      name: "Biology Lab Manual",
      price: 24.99,
      image: "Manual Image",
      category: "Books",
      sellerType: "student" as const,
      sellerName: "Sam Parker",
      stock: 12,
    },
    {
      id: "6",
      name: "Portable Charger",
      price: 29.99,
      image: "Charger Image",
      category: "Electronics",
      sellerType: "student" as const,
      sellerName: "Jordan Lee",
      stock: 7,
    },
    {
      id: "7",
      name: "Drama Club T-Shirt",
      price: 19.99,
      image: "T-Shirt Image",
      category: "Clothing",
      sellerType: "society" as const,
      sellerName: "Drama Club",
      stock: 15,
    },
    {
      id: "8",
      name: "Desk Lamp",
      price: 34.99,
      image: "Lamp Image",
      category: "Accessories",
      sellerType: "student" as const,
      sellerName: "Riley Thompson",
      stock: 4,
    },
  ]

  const categories = [
    "All Categories",
    "Books",
    "Electronics",
    "Clothing",
    "Accessories",
    "Food & Drinks",
    "Event Tickets",
  ]

  // Filter products based on search query
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      if (!query) {
        setFilteredProducts(allProducts)
      } else {
        const filtered = allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.sellerName.toLowerCase().includes(query.toLowerCase()),
        )
        setFilteredProducts(filtered)
      }
      setIsLoading(false)
    }, 500)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the URL with the search query
    // For now, we'll just filter the products directly
    if (!searchQuery.trim()) {
      setFilteredProducts(allProducts)
    } else {
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sellerName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProducts(filtered)
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{query ? `Search Results for "${query}"` : "All Products"}</h1>
          <p className="text-muted-foreground">
            {isLoading
              ? "Searching products..."
              : `Found ${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"}`}
          </p>
        </div>

        <div className="w-full md:w-auto flex gap-2">
          <form onSubmit={handleSearch} className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="sr-only">
              Search
            </Button>
          </form>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue="All Categories">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <div className="pt-4">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setPriceRange(value as number[])}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Seller Type</Label>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="student" defaultChecked />
                      <label
                        htmlFor="student"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Student Sellers
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="society" defaultChecked />
                      <label
                        htmlFor="society"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Society Sellers
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Condition</Label>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="new" defaultChecked />
                      <label
                        htmlFor="new"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        New
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="used" defaultChecked />
                      <label
                        htmlFor="used"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Used
                      </label>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filters */}
        <div className="hidden md:block w-64 space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Category</h3>
            <Select defaultValue="All Categories">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Price Range</h3>
            <div className="pt-4">
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                onValueChange={(value) => setPriceRange(value as number[])}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Seller Type</h3>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="student-desktop" defaultChecked />
                <label
                  htmlFor="student-desktop"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Student Sellers
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="society-desktop" defaultChecked />
                <label
                  htmlFor="society-desktop"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Society Sellers
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Condition</h3>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="new-desktop" defaultChecked />
                <label
                  htmlFor="new-desktop"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  New
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="used-desktop" defaultChecked />
                <label
                  htmlFor="used-desktop"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Used
                </label>
              </div>
            </div>
          </div>

          <Button className="w-full">Apply Filters</Button>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredProducts.length}</span> products
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted aspect-square rounded-md mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No products found</h2>
              <p className="text-muted-foreground mb-6">We couldn't find any products matching your search criteria.</p>
              <Button onClick={() => setFilteredProducts(allProducts)}>View All Products</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
