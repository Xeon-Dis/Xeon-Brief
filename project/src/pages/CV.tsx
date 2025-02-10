import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Mail, Phone, MapPin, Globe } from 'lucide-react';

const CV = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={`min-h-screen pt-24 ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">John Doe</h1>
              <h2 className="text-2xl text-primary mb-4">Logo Designer</h2>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 234 567 890</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>www.johndoe.com</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              <Download className="w-4 h-4" />
              Download CV
            </button>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Professional Summary
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experienced logo designer with a proven track record of creating unique and memorable brand identities. Skilled in various design tools and techniques, with a strong understanding of color theory, typography, and brand strategy.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Work Experience
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Senior Logo Designer</h4>
                  <p className="text-primary">Creative Studio • 2020 - Present</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
                    <li>Led the design team in creating over 100 successful brand identities</li>
                    <li>Managed client relationships and presentations</li>
                    <li>Mentored junior designers and conducted workshops</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Logo Designer</h4>
                  <p className="text-primary">Design Agency XYZ • 2018 - 2020</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
                    <li>Created logos and brand identities for various clients</li>
                    <li>Collaborated with the marketing team on brand strategy</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Education
              </h3>
              <div>
                <h4 className="font-semibold">BFA in Graphic Design</h4>
                <p className="text-primary">Design University • 2019</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Brand Strategy', 'Typography', 'Color Theory', 'Vector Graphics', 'Client Communication'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CV;