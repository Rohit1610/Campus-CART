import Link from "next/link"
import { Store, Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Store className="h-6 w-6" />
            <span className="font-bold text-xl">Campus Cart</span>
          </div>
          <p className="text-muted-foreground mb-4">
            The marketplace for university students to buy and sell items within the campus community.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/shop/books" className="text-muted-foreground hover:text-foreground transition-colors">
                Books
              </Link>
            </li>
            <li>
              <Link href="/shop/electronics" className="text-muted-foreground hover:text-foreground transition-colors">
                Electronics
              </Link>
            </li>
            <li>
              <Link href="/shop/clothing" className="text-muted-foreground hover:text-foreground transition-colors">
                Clothing
              </Link>
            </li>
            <li>
              <Link href="/societies" className="text-muted-foreground hover:text-foreground transition-colors">
                Society Merchandise
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Account</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors">
                Register
              </Link>
            </li>
            <li>
              <Link href="/account/orders" className="text-muted-foreground hover:text-foreground transition-colors">
                Orders
              </Link>
            </li>
            <li>
              <Link href="/seller/register" className="text-muted-foreground hover:text-foreground transition-colors">
                Become a Seller
              </Link>
            </li>
            <li>
              <Link href="/seller/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Seller Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <span className="text-muted-foreground">support@campuscart.com</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <span className="text-muted-foreground">(123) 456-7890</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-12 pt-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Campus Cart. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
