"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "How does the GPA calculator work?",
    answer:
      "Our GPA calculator takes into account your course credits and grades to compute your overall GPA. Simply input your course information, and the app will do the rest!",
  },
  {
    question: "Is the AI syllabus scanner accurate?",
    answer:
      "Yes, our AI syllabus scanner uses advanced machine learning algorithms to extract key information from your syllabus with high accuracy. However, we always recommend double-checking important details.",
  },
  // {
  //   question: "Can I sync my data across devices?",
  //   answer:
  //     "Yes, you can sync your data across all your devices. Simply sign in with your account and your information will be automatically synchronized.",
  // },
  {
    question: "Is there a mobile app?",
    answer:
      "Yes, our app is available on the ios platform. You can download it from the respective app stores. Coming to other platforms soon!",
  },
  {
    question: "What are the pricing options?",
    answer:
      "We offer a free tier with essential features, and a premium plan with advanced features for power users. Check our pricing page for detailed information.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/10">
              <button
                className="flex justify-between items-center w-full text-left py-6 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-xl">{faq.question}</span>
                <Plus 
                  className={`w-6 h-6 transition-transform ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="pb-6">
                  <p className="text-white/70">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

