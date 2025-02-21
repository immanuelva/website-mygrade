import Image from "next/image"

export default function Download() {
  return (
    <section id="download" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-12">Get it free</h2>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-Oc9yKxrnX1GpmNGfvxXbcIc7BypxI4.png"
              alt="QR Code"
              width={200}
              height={200}
              className="mb-4"
            />
            <p className="text-lg font-semibold">Scan on iPhone</p>
          </div>
        </div>
        <p className="mt-8 text-xl">-or-</p>
        <button className="mt-8 bg-white text-blue-600 font-semibold py-3 px-8 rounded-full text-lg inline-flex items-center hover:bg-blue-50 transition-colors duration-300">
          <span className="mr-2">For iPhone</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
          </svg>
        </button>
      </div>
    </section>
  )
}

