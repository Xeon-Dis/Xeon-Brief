import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <nav className={`fixed w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm ${
      i18n.language === 'ar' ? 'font-arabic' : 'font-sans'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              LOGO
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['home', 'about', 'portfolio', 'cv', 'request', 'contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'home' ? '/' : `/${item}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === (item === 'home' ? '/' : `/${item}`)
                      ? 'text-primary'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  {t(`nav.${item}`)}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle Language"
            >
              <Languages className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;