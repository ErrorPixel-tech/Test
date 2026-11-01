export function uniModalka() {
  let activeModal = null;
  let trigger = null;

  const open = (modal, btn) => {
    if (!modal || activeModal) return;

    activeModal = modal;
    trigger = btn;

    modal.hidden = false;
    document.body.classList.add('modal-open');

    // Фокус на первый интерактивный элемент
    const focusable = modal.querySelector(
      'input, textarea, select, button:not([data-close-modal]), [tabindex]:not([tabindex="-1"])'
    );
    (focusable || modal.querySelector('.modal__dialog')).focus?.();
  };

  const close = () => {
    if (!activeModal) return;

    const modal = activeModal;
    activeModal = null;

    modal.hidden = true;
    document.body.classList.remove('modal-open');

    // Сброс формы
    modal.querySelector('form')?.reset();

    // Возврат фокуса
    if (trigger && document.contains(trigger)) trigger.focus();
    trigger = null;
  };

  // Делегирование кликов
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-open-modal]');
    if (openBtn) {
      const key = openBtn.dataset.openModal;
      const modal = document.querySelector(`[data-modal="${key}"]`);
      open(modal, openBtn);
      return;
    }

    if (e.target.closest('[data-close-modal]')) {
      close();
    }
  });

  // Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Закрываем после submit (демо)
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    close();
  });
};