import ProductCard from "@/components/product-card"

export default function FeaturedProducts() {
  // Mock data - in a real app, this would come from your API
  const products = [
    {
      id: "1",
      name: "Computer Science Textbook",
      price: 45.99,
      image: "Book Image",
      category: "Books",
      sellerType: "student" as const,
      sellerName: "Alex Johnson",
      stock: 8,
      isFeatured: true,
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
      isFeatured: true,
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
      isFeatured: true,
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
      isFeatured: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
