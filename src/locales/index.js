// others but default language - en

import { addLocaleData } from 'react-intl'
import locale_en from 'react-intl/locale-data/en'
import locale_vi from 'react-intl/locale-data/vi'
import locale_tr from 'react-intl/locale-data/tr'
import locale_fr from 'react-intl/locale-data/fr'
import locale_nl from 'react-intl/locale-data/nl'
import locale_ja from 'react-intl/locale-data/ja'

import { enUS, vi, fr, nl, ja  } from 'date-fns/locale'
import tr from 'date-fns/locale/tr'

import messages_en from './langs/en.json'
import messages_vi from './langs/vi.json'
import messages_tr from './langs/tr.json'
import messages_fr from './langs/fr.json'
import messages_nl from './langs/nl.json'
import messages_ja from './langs/ja.json'

addLocaleData([...locale_en, ...locale_vi, ...locale_tr, ...locale_fr, ...locale_nl, ...locale_ja])

export const messsages = {
    'en': messages_en,
    'vi': messages_vi,
    'tr': messages_tr,
    'fr': messages_fr,
    'nl': messages_nl,
    'ja': messages_ja,
}

export const locales = {
    'en': 'English',
    'vi': 'Tiếng Việt',
    'tr': 'Türkçe',
    'fr': 'Français',
    'nl': 'Nederlands',
    'ja': '日本語',
}

export const LANGUAGES = {
    en: enUS,
    tr,
    vi,
    fr,
    nl,
    ja,
}
