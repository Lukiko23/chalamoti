'use client';

import { useTranslation } from '@/i18n/LanguageContext';
import { Lang } from '@/i18n/translations';

const languages: { code: Lang; label: string; flag: string }[] = [
  { code: 'fr', label: 'FR', flag: '\ud83c\uddeb\ud83c\uddf7' },
  { code: 'en', label: 'EN', flag: '\ud83c\uddec\ud83c\udde7' },
  { code: 'ka', label: 'GEO', flag: '\ud83c\uddec\ud83c\uddea' },
];

interface LanguageSwitcherProps {
  scrolled?: boolean;
}

export default function LanguageSwitcher({ scrolled = true }: LanguageSwitcherProps) {
  const { lang, setLang } = useTranslation();

  return (
    <div className="flex items-center gap-0.5 rounded-full bg-cream/60 backdrop-blur-sm p-0.5 border border-cream">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
            lang === code
              ? 'bg-wine text-white shadow-sm'
              : scrolled
                ? 'text-charcoal/60 hover:text-wine hover:bg-white/50'
                : 'text-charcoal/50 hover:text-wine hover:bg-white/50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
