import { Star } from "lucide-react"

const reviews = [
  {
    text: "This app has completely transformed how I manage my courses. The GPA calculator is a lifesaver!",
    author: "Alex, Stanford University",
    rating: 5,
  },
  {
    text: "The AI syllabus scanner saved me hours of work. Highly recommended for all students!",
    author: "Emma, MIT",
    rating: 5,
  },
  {
    text: "I've never been so organized with my coursework. This app is a game-changer.",
    author: "Michael, Harvard University",
    rating: 5,
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-blue-800 bg-opacity-50 p-6 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-blue-100 mb-4">{review.text}</p>
              <p className="text-blue-300 font-semibold">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

