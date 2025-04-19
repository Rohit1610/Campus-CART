import Link from "next/link"
import { Book, Laptop, Shirt, Backpack, Coffee, Ticket } from "lucide-react"

export default function CategoryGrid() {
  const categories = [
    {
      name: "Books",
      icon: Book,
      href: "/shop/books",
      color: "bg-blue-100 dark:bg-blue-950",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Electronics",
      icon: Laptop,
      href: "/shop/electronics",
      color: "bg-amber-100 dark:bg-amber-950",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      name: "Clothing",
      icon: Shirt,
      href: "/shop/clothing",
      color: "bg-green-100 dark:bg-green-950",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      name: "Accessories",
      icon: Backpack,
      href: "/shop/accessories",
      color: "bg-purple-100 dark:bg-purple-950",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "Food & Drinks",
      icon: Coffee,
      href: "/shop/food-drinks",
      color: "bg-red-100 dark:bg-red-950",
      textColor: "text-red-600 dark:text-red-400",
    },
    {
      name: "Event Tickets",
      icon: Ticket,
      href: "/shop/tickets",
      color: "bg-teal-100 dark:bg-teal-950",
      textColor: "text-teal-600 dark:text-teal-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="flex flex-col items-center justify-center p-6 rounded-xl transition-all hover:scale-105"
        >
          <div className={`p-4 rounded-full ${category.color} mb-3`}>
            <category.icon className={`h-6 w-6 ${category.textColor}`} />
          </div>
          <span className="font-medium">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
