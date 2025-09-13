import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do mentehub storytelling circles work?",
      answer: "Each 60-minute session follows a carefully crafted five-phase journey. We begin with induction to create a safe space, followed by an AI-narrated anchor story that sets the theme. Participants then share personal stories during circle reflection, which our AI weaves into a collective narrative. We close with a blessing and shared artifact that participants can keep."
    },
    {
      question: "What makes this different from other group experiences?",
      answer: "mentehub combines the ancient power of storytelling circles with modern AI facilitation. Unlike meditation or journaling apps, we focus on collective resonance - the magic that happens when stories are shared and witnessed by others. Our AI doesn't replace human connection; it enhances it by helping weave individual experiences into meaningful collective narratives."
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
      answer: "Yes! We offer various themes like Anxiety, Burnout, Loneliness, Wisdom, Work-Life Balance, and Life Transitions. Each theme creates relevant, meaningful conversations tailored to specific experiences and challenges, ensuring participants connect over shared journeys."
    },
    {
      question: "Can I attend circles with the same people repeatedly?",
      answer: "While our scheduling system creates diverse groups for each session, you may occasionally find yourself in circles with familiar faces. This can create beautiful continuity in storytelling relationships. Our unlimited monthly plan makes it easy to participate regularly and build deeper connections."
    },
    {
      question: "Is my privacy protected during sessions?",
      answer: "Absolutely. We use end-to-end encryption for all communications, and our AI processes stories in real-time without storing personal details. Sessions are not recorded unless explicitly requested by all participants. Your stories remain yours, shared only in the sacred space of your circle."
    },
    {
      question: "What technology do I need to participate?",
      answer: "You need a device with internet access, a microphone, and optionally a camera (video is at your discretion). We support all modern browsers and provide simple audio/video controls. No special software installation required - everything runs smoothly in your web browser."
    },
    {
      question: "How does the AI story weaving work?",
      answer: "Our AI listens to the themes and emotions in shared stories, then creates a collective narrative that honors each participant's contribution while revealing common threads and insights. It's like having a skilled storyteller capture the essence of your circle's wisdom in a beautiful, personalized tale that you can keep forever."
    },
    {
      question: "What happens if someone doesn't show up?",
      answer: "Circles can run with as few as 3 participants, so we rarely need to cancel. If a circle drops below minimum attendance, we'll offer you priority booking for the next available session or a full refund if you paid per session. We understand life happens and work to accommodate everyone."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full mb-6 animate-soft-glow">
            <HelpCircle className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600">
            Everything you need to know about mentehub storytelling circles
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-slate-800 pr-4">
                  {faq.question}
                </h3>
                {openQuestion === index ? (
                  <ChevronUp className="h-5 w-5 text-blue-500 flex-shrink-0 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-blue-500 flex-shrink-0 transition-transform duration-300" />
                )}
              </button>
              
              {openQuestion === index && (
                <div className="px-6 pb-6 animate-fade-in-up">
                  <div className="pt-4 border-t border-slate-200/30">
                    <p className="text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-slate-600 mb-8">
              We're here to help you feel confident about joining your first circle
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;