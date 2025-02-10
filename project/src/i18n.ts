import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            home: 'Home',
            about: 'About',
            portfolio: 'Portfolio',
            cv: 'CV',
            request: 'Request Logo',
            contact: 'Contact'
          },
          hero: {
            greeting: 'Hello, I\'m',
            profession: 'Logo Designer',
            cta: 'View My Work'
          }
        }
      },
      ar: {
        translation: {
          nav: {
            home: 'الرئيسية',
            about: 'عني',
            portfolio: 'أعمالي',
            cv: 'السيرة الذاتية',
            request: 'اطلب شعار',
            contact: 'اتصل بي'
          },
          hero: {
            greeting: 'مرحباً، أنا',
            profession: 'مصمم شعارات',
            cta: 'شاهد أعمالي'
          }
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;