'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
  labels: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
  };
  formTitle: string;
}

export default function ContactForm({ labels, formTitle }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/contact/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-8 lg:p-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {formTitle}
      </h2>
      
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
          <p className="text-gray-600 mb-4">Thank you for contacting us. We'll get back to you soon.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-primary-500 hover:text-primary-700 font-medium"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {submitError}
            </div>
          )}
          
          <div>
            <label className="input-label">{labels.name}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field bg-white"
              placeholder={labels.name}
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label className="input-label">{labels.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field bg-white"
              placeholder="email@example.com"
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label className="input-label">{labels.subject}</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="input-field bg-white"
              placeholder={labels.subject}
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label className="input-label">{labels.message}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="input-field bg-white"
              placeholder={`${labels.message}...`}
              required
              disabled={submitting}
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="inline mr-2 w-5 h-5" />
                {labels.submit}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}