import { useI18n } from '../i18n';

function LoadingOverlay({ show, text }) {
  const { t } = useI18n();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35">
      <div className="rounded-2xl bg-white px-6 py-5 text-center shadow-2xl">
        <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
        <p className="text-sm font-medium text-slate-700">{text || t('Loading...')}</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
