import { createContext, useContext, useMemo, useRef, useState } from 'react';

const ToastContext = createContext({
  showToast: () => {},
});

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-[110] -translate-x-1/2">
          <div
            className={`animate-slide-up rounded-xl px-4 py-3 text-sm font-medium shadow-xl ${
              toast.type === 'error' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
            }`}
          >
            {toast.message}
          </div>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
