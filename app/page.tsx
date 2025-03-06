import Header from '@/components/header'
import Hero from '@/components/hero'
import Features from '@/components/features'
import Reviews from "../components/reviews"
import FAQ from "../components/faq"
import Download from '@/components/download'
import Footer from '@/components/footer'
import Image from "next/image"
import clsx from 'clsx'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 gradient-scroll" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white">
        <Header />
        <main className="relative">
          <Hero />
          
          {/* New Trusted By section with Showcase */}
          <section className="py-20">
            <div className="container mx-auto px-2">
              <h2 className="text-1xl md:text-3xl font-semibold text-center mb-8">
                Trusted by students at
              </h2>

              {/* Logos section */}
              <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 mb-12">
                <Image
                  src="/website-mygrade/ubc.png"
                  alt="University of British Columbia"
                  width={160}
                  height={40}
                  className="h-14 w-auto opacity-70 hover:opacity-100 transition-opacity brightness-0 invert"
                />
                <Image
                  src="/uoft.png"
                  alt="University of Toronto"
                  width={160}
                  height={40}
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity brightness-0 invert"
                />
                <Image
                  src="/queens.png"
                  alt="Queens University"
                  width={160}
                  height={80}
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity brightness-0 invert"
                />
                <Image
                  src="/western.png"
                  alt="Western University"
                  width={160}
                  height={80}
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity brightness-0 invert"
                />
              </div>

              <p className="text-center text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-16">
                Join thousands of students who use MyGrade to stay on top of their academic journey. 
                Our app helps you track your GPA, manage assignments, and analyze course materials with AI - 
                all in one place.
              </p>

              {/* App Showcase */}
              <div className="relative w-full max-w-5xl mx-auto">
                <div className={clsx(
                  "relative rounded-2xl overflow-hidden",
                  "border border-white/10 backdrop-blur-sm",
                  "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
                  "transition-all duration-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
                  "before:absolute before:inset-0",
                  "before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
                  "before:animate-gradient-shift"
                )}>
                  <Image
                    src="/app-showcase.png"
                    alt="App Interface Showcase"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-2xl"
                    priority
                  />
                  
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </section>

          <Features />
          <Testimonials />
          <FAQ />
          <Download />
        </main>
        <Footer />
      </div>
      
      {/* 3D Icons with floating animation */}
      <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
        {/* Graduation cap - top left */}
        <div className="absolute top-[15%] left-[15%] w-40 h-40 opacity-45 animate-float">
          <Image
            src="/graduationcap.png"
            alt="Graduation Cap"
            width={160}
            height={160}
            className="w-full h-full object-contain glow"
          />
        </div>
        
        {/* A+ grade - top right */}
        <div className="absolute top-[20%] right-[15%] w-32 h-32 opacity-45 animate-float-delay">
          <Image
            src="/aplus.png"
            alt="A+ Grade"
            width={128}
            height={128}
            className="w-full h-full object-contain glow"
          />
        </div>
        
        {/* Books - bottom center */}
        <div className="absolute bottom-[10%] left-[40%] w-36 h-36 opacity-45 animate-float-delay">
          <Image
            src="/books.png"
            alt="Books"
            width={144}
            height={144}
            className="w-full h-full object-contain glow"
          />
        </div>
      </div>
    </div>
  )
}

