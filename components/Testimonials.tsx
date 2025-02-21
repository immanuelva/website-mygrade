import React from 'react';

interface TestimonialProps {
  text: string;
  author: string;
  school: string;
}

const Testimonial = ({ text, author, school }: TestimonialProps) => (
  <div className="bg-indigo-800/40 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 hover:bg-indigo-800/50 border border-indigo-700/30">
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-100 mb-4">{text}</p>
    <div className="text-indigo-300">
      <span className="font-medium">{author}</span>
      <span className="mx-2">•</span>
      <span className="text-indigo-400">{school}</span>
    </div>
  </div>
);

export default function Testimonials() {
  const testimonials = [
    {
      text: "This app has completely transformed how I manage my courses. The GPA calculator is a lifesaver!",
      author: "Alex",
      school: "Stanford University"
    },
    {
      text: "The AI syllabus scanner saved me hours of work. Highly recommended for all students!",
      author: "Emma",
      school: "MIT"
    },
    {
      text: "I've never been so organized with my coursework. This app is a game-changer.",
      author: "Michael",
      school: "Harvard University"
    }
  ];

  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        What Students Say
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
} 