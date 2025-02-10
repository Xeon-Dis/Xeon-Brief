import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Download, Send, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(TextPlugin);

const Home = () => {
  const { t, i18n } = useTranslation();
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(textRef.current, {
      duration: 2,
      text: t('hero.profession'),
      ease: "none",
    });
  }, [t]);

  return (
    <div className={`min-h-screen pt-16 ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between py-20"
        >
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('hero.greeting')} <span className="text-primary">John Doe</span>
            </h1>
            <p ref={textRef} className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8"></p>
            
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg"
              >
                <Download className="w-5 h-5" />
                Download CV
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg"
              >
                <Send className="w-5 h-5" />
                Contact Me
              </motion.button>
            </div>

            <div className="flex gap-4 mt-8">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mt-8 md:mt-0"
          >
            <div className="relative w-80 h-80 mx-auto">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&h=800"
                alt="Profile"
                className="w-full h-full object-cover rounded-full shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;