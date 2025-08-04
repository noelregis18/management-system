/**
 * Help Component
 * 
 * This component provides help documentation and support information.
 * Users can find answers to common questions about the timetable application.
 */

import React, { useState } from 'react'
import { HelpCircle, Search, Book, MessageCircle, Mail, ChevronDown, ChevronRight } from 'lucide-react'

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)

  // FAQ data relevant to our timetable app
  const faqs = [
    {
      id: 1,
      question: 'How do I view my timetable?',
      answer: 'Navigate to the Timetable page from the sidebar. You can switch between Weekly, Daily, and List views using the view buttons at the top of the page.'
    },
    {
      id: 2,
      question: 'How do I enable weekends in the timetable?',
      answer: 'Go to Settings > Timetable Settings and check the "Show Weekends" option. This will display Monday and Sunday in your timetable view.'
    },
    {
      id: 3,
      question: 'What does "No Lunch Break" mean on Monday and Sunday?',
      answer: 'Monday and Sunday are holidays, so there is no lunch break scheduled. The system automatically shows "No Lunch Break" for these days when weekends are enabled.'
    },
    {
      id: 4,
      question: 'How do I change the default view of the timetable?',
      answer: 'Go to Settings > Timetable Settings and select your preferred default view (Weekly, Daily, or List) from the "Default View" dropdown.'
    },
    {
      id: 5,
      question: 'Can I customize the time slots?',
      answer: 'Yes, you can modify the start and end times in Settings > Timetable Settings. The timetable will automatically adjust to your preferred time range.'
    }
  ]

  /**
   * Filter FAQs based on search term
   */
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  /**
   * Toggle FAQ expansion
   */
  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId)
  }

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">
          Find answers to common questions about using the Timetable Manager.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help topics or FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Quick Start Guide */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 rounded-lg mr-4">
                <Book className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Quick Start Guide</h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <p>1. <strong>Dashboard:</strong> View your semester overview and quick statistics</p>
              <p>2. <strong>Timetable:</strong> Check your class schedule in Weekly, Daily, or List view</p>
              <p>3. <strong>Settings:</strong> Customize your timetable preferences and notifications</p>
              <p>4. <strong>Help:</strong> Find answers to common questions (you're here!)</p>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Contact our support team.
            </p>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Contact via Email:</h4>
              <div className="space-y-2">
                <a 
                  href="mailto:noel.regis04@gmail.com"
                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  noel.regis04@gmail.com
                </a>
                <a 
                  href="mailto:mdrakqibalam@gmail.com"
                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  mdrakqibalam@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">App Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium">1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help