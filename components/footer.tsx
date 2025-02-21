import Image from "next/image"
import Link from "next/link"
import { Instagram, InstagramIcon as Tiktok } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 text-center">
      <div className="container mx-auto px-4">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/appstore-removebg-uICieJVNfPaCvBZHBRsnYAED4vbaq5.png"
          alt="MyGrade"
          width={60}
          height={60}
          className="mx-auto mb-4 w-15 h-15"
        />
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/press" className="text-gray-400 hover:text-white transition-colors">
            Press
          </Link>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Instagram size={24} />
          </a>
        </div>
        <p className="text-gray-400">&copy; {new Date().getFullYear()} MyGrade</p>
      </div>
    </footer>
  )
}

