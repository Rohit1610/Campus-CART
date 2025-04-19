import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary/70 text-primary-foreground">
        <div className="container flex flex-col md:flex-row items-center py-12 md:py-24">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Campus Shopping Made Easy</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md mx-auto md:mx-0">
              Buy and sell textbooks, electronics, and more within your university community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/seller/register">Become a Seller</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-[4/3] bg-primary-foreground/10 rounded-lg overflow-hidden">
              {/* This would be an image in a real implementation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary-foreground/30 text-sm">Hero Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
