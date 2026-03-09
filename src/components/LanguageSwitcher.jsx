import { useI18n } from '../i18n';

function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div className={`inline-flex rounded-lg border border-slate-200 bg-white p-1 text-xs shadow-sm ${className}`}>
      <button
        className={`rounded-md px-2 py-1 font-semibold ${lang === 'en' ? 'bg-brand text-white' : 'text-slate-600'}`}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        className={`rounded-md px-2 py-1 font-semibold ${lang === 'zh' ? 'bg-brand text-white' : 'text-slate-600'}`}
        onClick={() => setLang('zh')}
      >
        {t('中文')}
      </button>
    </div>
  );
}

export default LanguageSwitcher;

