import CONFIG from '@/config';
import {LOCAL_STORAGE} from '@/constants';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';

/**
 ** - import LanguageDetector from 'i18next-browser-languagedetector';
 ** - Don't want to use this?
 ** - Have a look at the Quick start guide for passing in lng and translations on init
 **/

import resourcesToBackend from 'i18next-resources-to-backend';

const localResources = {
    en: {
        translation: {
            welcome: 'Hello'
        }
    },
    vi: {
        translation: {
            welcome: 'Xin chào'
        }
    }
};

i18n
    /**
     ** - Load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
     ** - Learn more: https://github.com/i18next/i18next-http-backend
     ** - Want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
     **/
    .use(ChainedBackend)
    /**
     ** - Detect user language
     ** - Learn more: https://github.com/i18next/i18next-browser-languageDetector
     **/
// .use(LanguageDetector)
    /**
     ** - Pass the i18n instance to react-i18next.
     **/
    .use(initReactI18next)

    /**
     ** - Initialize i18next
     ** - For all options read: https://www.i18next.com/overview/configuration-options
     **/
    .init({
        lng: window.localStorage.getItem(LOCAL_STORAGE.LNG) || 'vi',
        fallbackLng: 'en',
        preload: ['en', 'vi'],
        backend: {
            backends: [
                HttpBackend, // if a namespace can't be loaded via normal http-backend loadPath, then the inMemoryLocalBackend will try to return the correct resources
                resourcesToBackend(localResources)
            ],
            backendOptions: [{
                loadPath: `${CONFIG.http.baseURL}/locales/{{lng}}/{{ns}}`
            }]
        },

        debug: CONFIG.isDevelopment,

        interpolation: {
            escapeValue: false, // Not needed for React as it escapes by default.
        }
    });

export default i18n;
