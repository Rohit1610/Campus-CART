import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeaturedProducts from "@/components/featured-products"
import FeaturedSocieties from "@/components/featured-societies"
import HeroBanner from "@/components/hero-banner"
import CategoryGrid from "@/components/category-grid"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroBanner />

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <CategoryGrid />
      </section>

      <section className="my-12">
        <Tabs defaultValue="featured" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Discover Products</h2>
            <TabsList>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="societies">Society Merch</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="featured">
            <FeaturedProducts />
          </TabsContent>
          <TabsContent value="societies">
            <FeaturedSocieties />
          </TabsContent>
        </Tabs>
      </section>

      <section className="my-12 bg-muted rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Become a Seller</h2>
          <p className="text-lg mb-6">
            Have items to sell? Join Campus Cart as a seller and reach thousands of students on campus!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Card className="flex-1">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Student Seller</h3>
                <p className="mb-4">Sell your used textbooks, electronics, and more</p>
                <Button className="w-full" asChild>
                  <Link href="/register">Register as Student</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Society Seller</h3>
                <p className="mb-4">Sell official merchandise for your campus society</p>
                <Button className="w-full" asChild>
                  <Link href="/register">Register as Society</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
