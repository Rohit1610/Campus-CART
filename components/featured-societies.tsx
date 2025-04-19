import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FeaturedSocieties() {
  // Mock data - in a real app, this would come from your API
  const societies = [
    {
      id: "1",
      name: "Computer Science Society",
      description: "Official merchandise from the CS Society including hoodies, t-shirts, and stickers.",
      image: "CS Society Image",
      productCount: 12,
    },
    {
      id: "2",
      name: "Engineering Society",
      description: "Engineering-themed apparel and accessories for engineering students and enthusiasts.",
      image: "Engineering Society Image",
      productCount: 8,
    },
    {
      id: "3",
      name: "Drama Club",
      description: "Merchandise from the latest productions and performances by the university Drama Club.",
      image: "Drama Club Image",
      productCount: 15,
    },
    {
      id: "4",
      name: "Sports Association",
      description: "Official university sports gear including jerseys, equipment, and fan merchandise.",
      image: "Sports Association Image",
      productCount: 20,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {societies.map((society) => (
        <Card key={society.id} className="overflow-hidden">
          <div className="aspect-[4/3] bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">{society.image}</span>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1">{society.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{society.description}</p>
            <div className="text-xs font-medium">{society.productCount} products</div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full" variant="outline" size="sm">
              <Link href={`/societies/${society.id}`}>View Products</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
