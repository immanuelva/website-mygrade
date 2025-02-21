import { Wand2, ArrowUpRight, User2, Calculator, Zap } from "lucide-react"

const features = [
  {
    icon: Wand2,
    title: "Easy to use",
    description: "Simple and intuitive interface for all your academic needs",
  },
  {
    icon: ArrowUpRight,
    title: "Automatic progression",
    description: "Track your progress automatically as you complete courses",
  },
  {
    icon: User2,
    title: "GPA tracker",
    description: "Keep track of your academic performance in real-time",
  },
  {
    icon: Calculator,
    title: "Grade calculator",
    description: "Calculate your potential grades and plan your academic goals",
  },
  {
    icon: Zap,
    title: "AI Syllabus Import",
    description: "Instantly scan and import your course syllabus using AI technology",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl text-gray-400 text-center mb-4 font-bold">More to love</h3>
        
        <div className="max-w-3xl mx-auto space-y-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center gap-6 group hover:bg-white/5 p-4 rounded-xl transition-colors"
            >
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center
                  ${index === 0 && 'bg-yellow-500/20 text-yellow-500'}
                  ${index === 1 && 'bg-green-500/20 text-green-500'}
                  ${index === 2 && 'bg-blue-500/20 text-blue-500'}
                  ${index === 3 && 'bg-orange-500/20 text-orange-500'}
                  ${index === 4 && 'bg-pink-500/20 text-pink-500'}
                `}>
                  <feature.icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-1 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

