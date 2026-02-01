'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CyberModal } from '@/components/cyber/cyber-modal'
import { CyberButton } from '@/components/cyber/cyber-button'
import { CyberCard } from '@/components/cyber/cyber-card'
import { CyberInput } from '@/components/cyber/cyber-input'
import { ChevronIcon } from '@/components/cyber'

interface HelpSupportModalProps {
  isOpen: boolean
  onClose: () => void
}

const faqItems = [
  {
    question: 'How do I track a custom workout?',
    answer: 'Go to the Workouts tab and click the "Custom" button. You can add exercises, set duration, and difficulty level for your custom protocol.',
  },
  {
    question: 'Can I sync with fitness devices?',
    answer: 'CyberFit supports integration with most neural implants and smart wearables. Go to Settings > Devices to connect your chrome.',
  },
  {
    question: 'How are calories calculated?',
    answer: 'Calorie calculations are based on your body metrics, workout intensity, and duration. We use advanced algorithms to provide accurate estimates.',
  },
  {
    question: 'Can I create custom meal plans?',
    answer: 'Yes! Navigate to the Diet tab and click "Add Meal" to create custom entries with full macro breakdown.',
  },
  {
    question: 'How do I reset my progress?',
    answer: 'Go to Privacy & Security > Data and select "Clear History". Note that this action cannot be undone.',
  },
]

export function HelpSupportModal({ isOpen, onClose }: HelpSupportModalProps) {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'feedback'>('faq')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({ subject: '', message: '' })
  const [feedbackForm, setFeedbackForm] = useState({ rating: 0, feedback: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleContactSubmit = () => {
    if (contactForm.subject && contactForm.message) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setContactForm({ subject: '', message: '' })
      }, 3000)
    }
  }

  const handleFeedbackSubmit = () => {
    if (feedbackForm.rating > 0) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFeedbackForm({ rating: 0, feedback: '' })
      }, 3000)
    }
  }

  const tabs = [
    { id: 'faq' as const, label: 'FAQ' },
    { id: 'contact' as const, label: 'Contact' },
    { id: 'feedback' as const, label: 'Feedback' },
  ]

  return (
    <CyberModal isOpen={isOpen} onClose={onClose} title="Help & Support">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-3 font-mono text-xs uppercase tracking-wider rounded-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground cyber-border'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* FAQ Section */}
        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CyberCard 
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm font-semibold text-foreground pr-4">{item.question}</p>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronIcon className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-foreground/70 mt-3 pt-3 border-t border-border">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CyberCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-sm flex items-center justify-center cyber-border">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-mono text-lg font-bold text-primary">Message Sent!</p>
                <p className="text-sm text-foreground/60 mt-2">We will get back to you soon.</p>
              </motion.div>
            ) : (
              <>
                <CyberInput
                  label="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="What do you need help with?"
                />
                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe your issue or question..."
                    rows={5}
                    className="w-full bg-card/80 border-2 border-primary/50 px-4 py-3 font-sans text-foreground text-base cyber-clip-sm outline-none transition-all duration-300 focus:border-primary focus:shadow-[0_0_20px_rgba(252,233,79,0.3)] resize-none"
                  />
                </div>
                <CyberButton onClick={handleContactSubmit} className="w-full">
                  Send Message
                </CyberButton>
              </>
            )}

            <CyberCard className="p-4 bg-muted/30">
              <p className="font-mono text-xs text-foreground/70 mb-2">Other Ways to Reach Us:</p>
              <div className="space-y-1 text-xs text-foreground/60">
                <p>Email: support@cyberfit.nc</p>
                <p>Response Time: 24-48 hours</p>
              </div>
            </CyberCard>
          </motion.div>
        )}

        {/* Feedback Section */}
        {activeTab === 'feedback' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-sm flex items-center justify-center cyber-border">
                  <span className="text-3xl">★</span>
                </div>
                <p className="font-mono text-lg font-bold text-primary">Thanks for the Feedback!</p>
                <p className="text-sm text-foreground/60 mt-2">Your input helps us improve CyberFit.</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center">
                  <p className="font-mono text-sm text-foreground mb-4">How would you rate CyberFit?</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setFeedbackForm(prev => ({ ...prev, rating: star }))}
                        className={`text-3xl transition-colors ${
                          star <= feedbackForm.rating ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        ★
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">
                    {feedbackForm.rating === 0 && 'Tap to rate'}
                    {feedbackForm.rating === 1 && 'Poor'}
                    {feedbackForm.rating === 2 && 'Fair'}
                    {feedbackForm.rating === 3 && 'Good'}
                    {feedbackForm.rating === 4 && 'Great'}
                    {feedbackForm.rating === 5 && 'Excellent!'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Additional Feedback (Optional)
                  </label>
                  <textarea
                    value={feedbackForm.feedback}
                    onChange={(e) => setFeedbackForm(prev => ({ ...prev, feedback: e.target.value }))}
                    placeholder="Tell us what you think..."
                    rows={4}
                    className="w-full bg-card/80 border-2 border-primary/50 px-4 py-3 font-sans text-foreground text-base cyber-clip-sm outline-none transition-all duration-300 focus:border-primary focus:shadow-[0_0_20px_rgba(252,233,79,0.3)] resize-none"
                  />
                </div>

                <CyberButton 
                  onClick={handleFeedbackSubmit} 
                  className="w-full"
                  disabled={feedbackForm.rating === 0}
                >
                  Submit Feedback
                </CyberButton>
              </>
            )}
          </motion.div>
        )}
      </div>
    </CyberModal>
  )
}
