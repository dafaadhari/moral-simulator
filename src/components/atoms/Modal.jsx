import { useEffect } from 'react';

// Modal modern: backdrop navy gelap + panel vanilla bersih.
// Tutup via klik backdrop atau tombol Escape.
export const Modal = ({ isOpen, onClose, title, children, actions }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="bg-vanilla-50 rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-2xl font-bold text-navy-900 mb-4 tracking-tight">
          {title}
        </h3>
        <div className="text-navy-900/75 mb-8">{children}</div>
        {actions && (
          <div className="flex flex-col sm:flex-row justify-end gap-3">{actions}</div>
        )}
      </div>
    </div>
  );
};
