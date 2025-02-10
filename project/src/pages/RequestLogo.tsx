import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const steps = ['Project Details', 'Brand Information', 'Budget & Timeline'];

const RequestLogo = () => {
  const { i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDescription: '',
    industry: '',
    targetAudience: '',
    budget: '',
    deadline: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className={`min-h-screen pt-24 ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-8">Request a Logo</h1>

          <div className="mb-8">
            <div className="flex justify-between items-center relative">
              {steps.map((step, index) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm mt-2">{step}</span>
                </div>
              ))}
              <div className="absolute top-4 left-0 h-0.5 bg-gray-200 dark:bg-gray-700 w-full -z-10" />
              <div
                className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-300 -z-10"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Description</label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      rows={4}
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Target Audience</label>
                    <input
                      type="text"
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Reference Materials</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        Drag and drop files here or click to browse
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    >
                      <option value="">Select a range</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2000">$1,000 - $2,000</option>
                      <option value="2000+">$2,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-2 rounded-lg border-2 border-primary text-primary ${
                  currentStep === 0 ? 'invisible' : ''
                }`}
              >
                Previous
              </button>
              <button
                type={currentStep === steps.length - 1 ? 'submit' : 'button'}
                onClick={currentStep === steps.length - 1 ? undefined : nextStep}
                className="px-6 py-2 rounded-lg bg-primary text-white"
              >
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestLogo;