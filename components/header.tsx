import Image from "next/image"
import Link from "next/link"
import { QrCodeIcon } from "@heroicons/react/24/solid"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-1 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/60 via-pink-500/50 to-blue-500/60 opacity-75 blur-lg group-hover:blur-xl transition-all duration-300 group-hover:scale-110"></div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/appstore-removebg-uICieJVNfPaCvBZHBRsnYAED4vbaq5.png"
              alt="MyGrade"
              width={60}
              height={60}
              className="w-16 h-16 relative"
              unoptimized
            />
          </div>
          <span className="text-white font-bold text-2xl">MyGrade</span>
        </Link>
        <Link
          href="#download"
          className="bg-white text-blue-600 font-semibold py-3 px-4 rounded-full text-sm hover:bg-blue-50 transition-colors duration-300 flex items-center gap-2 group"
        >
          Try for $0
          <QrCodeIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </header>
  )
}

