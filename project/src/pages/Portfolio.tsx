import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

const projects = [
  {
    id: 1,
    title: 'Tech Startup Logo',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
  },
  {
    id: 2,
    title: 'Organic Food Brand',
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
  },
  {
    id: 3,
    title: 'Fashion Brand Identity',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
  },
  {
    id: 4,
    title: 'Sports Equipment Logo',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800',
  }
];

const categories = ['All', 'Technology', 'Food & Beverage', 'Fashion', 'Sports'];

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className={`min-h-screen pt-24 ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-8">Portfolio</h1>

          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4"
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold text-center px-4">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>

          {selectedProject && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full p-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Category: {selectedProject.category}
                </p>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;