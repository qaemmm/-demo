function getLocale() {
  if (typeof window === 'undefined') return 'en-US';
  return window.localStorage.getItem('suki_lang') === 'zh' ? 'zh-CN' : 'en-US';
}

export function formatCurrency(value) {
  return `₱${Number(value).toLocaleString(getLocale())}`;
}

export function formatNumber(value) {
  return Number(value).toLocaleString(getLocale());
}

export function formatPoints(value) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${Number(value).toLocaleString(getLocale())}`;
}
