import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do Mentevale storytelling circles work?",
      answer: "Each 60-minute session follows a carefully crafted five-phase journey. We begin with induction to create a safe space, followed by an AI-narrated anchor story that sets the theme. Participants then share personal stories during circle reflection, which our AI weaves into a collective narrative. We close with a blessing and shared artifact that participants can keep."
    },
    {
      question: "What makes this different from other group experiences?",
      answer: "Mentevale combines the ancient power of storytelling circles with modern AI facilitation. Unlike meditation or journaling apps, we focus on collective resonance - the magic that happens when stories are shared and witnessed by others. Our AI doesn't replace human connection; it enhances it by helping weave individual experiences into meaningful collective narratives."
    },
    {
      question: "How many people are in each circle?",
      answer: "Each circle hosts 3-5 participants maximum to ensure intimate connection and meaningful participation. This size allows everyone to share authentically while maintaining the cozy, safe feeling essential for vulnerable storytelling."
    },
    {
      question: "What if I'm nervous about sharing personal stories?",
      answer: "It's completely natural to feel nervous! Our AI guide creates a welcoming environment, and you can start by listening and sharing only what feels comfortable. Many participants find that the supportive atmosphere naturally encourages openness. You're always in control of what you share."
    },
    {
      question: "Are the themes different for different groups?",
      answer: "Yes! We tailor themes to resonate with specific communities - corporate professionals might explore work-life balance, digital nomads might share travel stories, university students might discuss future aspirations, and senior citizens might reflect on life wisdom. This ensures relevant, meaningful conversations."
    },
    {
      question: "Can I attend circles with the same people repeatedly?",
      answer: "While our scheduling system creates diverse groups for each session, you may occasionally find yourself in circles with familiar faces. This can create beautiful continuity in storytelling relationships. Our unlimited monthly plan makes it easy to participate regularly."
    },
    {
      question: "Is my privacy protected during sessions?",
      answer: "Absolutely. We use end-to-end encryption for all communications, and our AI processes stories in real-time without storing personal details. Sessions are not recorded unless explicitly requested by all participants. Your stories remain yours."
    },
    {
      question: "What technology do I need to participate?",
      answer: "You need a device with internet access, a microphone, and optionally a camera. We support all modern browsers and provide simple audio/video controls. No special software installation required - everything runs smoothly in your web browser."
    },
    {
      question: "How does the AI story weaving work?",
      answer: "Our AI listens to the themes and emotions in shared stories, then creates a collective narrative that honors each participant's contribution while revealing common threads and insights. It's like having a skilled storyteller capture the essence of your circle's wisdom in a beautiful, personalized tale."
    },
    {
      question: "What happens if someone doesn't show up?",
      answer: "Circles can run with as few as 3 participants, so we rarely need to cancel. If a circle drops below minimum attendance, we'll offer you priority booking for the next available session or a full refund if you paid per session."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <HelpCircle className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-300">
            Everything you need to know about Mentevale storytelling circles
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                {openQuestion === index ? (
                  <ChevronUp className="h-5 w-5 text-amber-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-amber-400 flex-shrink-0" />
                )}
              </button>
              
              {openQuestion === index && (
                <div className="px-6 pb-6">
                  <p className="text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-slate-300 mb-8">
            We're here to help you feel confident about joining your first circle
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center space-x-2 bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
          >
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;