import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={`min-h-screen pt-24 ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-8">About Me</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                I'm a passionate logo designer with over 5 years of experience in creating unique and memorable brand identities. My approach combines creativity with strategic thinking to deliver designs that not only look great but also effectively communicate your brand's message.
              </p>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Skills</h2>
                <div className="grid grid-cols-2 gap-4">
                  {['Logo Design', 'Brand Identity', 'Typography', 'Color Theory', 'Vector Graphics', 'Client Communication'].map((skill) => (
                    <div key={skill} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Briefcase className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">Experience</h3>
                    <p className="text-gray-600 dark:text-gray-300">Senior Logo Designer at Creative Studio (2020-Present)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <GraduationCap className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">Education</h3>
                    <p className="text-gray-600 dark:text-gray-300">BFA in Graphic Design, Design University (2019)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">Awards</h3>
                    <p className="text-gray-600 dark:text-gray-300">Best Brand Identity Design (2022)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;