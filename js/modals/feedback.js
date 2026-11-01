export function feedback() {
    const form = document.getElementById('feedback-contact-form');
    const phoneInput = document.getElementById('feedback-phone');
    const emailInput = document.getElementById('feedback-email');
    const commentInput = document.getElementById('feedback-comment');
    const counterEl = document.getElementById('feedback-comment-counter');
    const submitBtn = document.getElementById('feedback-submit-btn');
    const statusEl = document.getElementById('feedback-form-status');

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const COMMENT_MIN = 10;
    const COMMENT_MAX = 500;

    // ===== Утилиты =====
    function setError(input, message) {
        const errorEl = document.getElementById(`${input.id}-error`);
        errorEl.textContent = message;
        input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    // ===== Маска телефона (простая, для РФ-формата) =====
    function formatPhone(value) {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (!digits) return '';
        // 8XXXXXXXXXX → 7XXXXXXXXXX
        const d = digits.startsWith('8') ? '7' + digits.slice(1) : digits;
        let out = '+7';
        if (d.length > 1) out += ' (' + d.slice(1, 4);
        if (d.length >= 5) out += ') ' + d.slice(4, 7);
        if (d.length >= 8) out += '-' + d.slice(7, 9);
        if (d.length >= 10) out += '-' + d.slice(9, 11);
        return out;
    }

    phoneInput.addEventListener('input', () => {
        const pos = phoneInput.selectionStart;
        const before = phoneInput.value.length;
        phoneInput.value = formatPhone(phoneInput.value);
        const after = phoneInput.value.length;
        // грубая, но рабочая корректировка курсора при вставке
        const newPos = pos + (after - before);
        phoneInput.setSelectionRange(newPos, newPos);
    });

    // ===== Валидаторы =====
    function validatePhone(input) {
        const digits = input.value.replace(/\D/g, '');
        if (!digits) return setError(input, 'Введите телефон'), false;
        if (digits.length < 11) return setError(input, 'Введите номер полностью'), false;
        setError(input, '');
        return true;
    }

    function validateEmail(input) {
        const v = input.value.trim();
        if (!v) return setError(input, 'Введите email'), false;
        if (!EMAIL_RE.test(v)) return setError(input, 'Неверный формат email'), false;
        setError(input, '');
        return true;
    }

    function validateComment(input) {
        const v = input.value.trim();
        if (!v) return setError(input, 'Напишите пару слов'), false;
        if (v.length < COMMENT_MIN) return setError(input, `Минимум ${COMMENT_MIN} символов`), false;
        setError(input, '');
        return true;
    }

    const validators = {
        phone: validatePhone,
        email: validateEmail,
        comment: validateComment,
    };

    // ===== Валидация на blur/input =====
    [phoneInput, emailInput, commentInput].forEach((input) => {
        let touched = false;
        input.addEventListener('blur', () => {
            touched = true;
            validators[input.name]?.(input);
        });
        input.addEventListener('input', () => {
            if (touched) validators[input.name]?.(input);
            if (input.getAttribute('aria-invalid') === 'true') {
                validators[input.name]?.(input);
            }
        });
    });

    // ===== Счётчик символов =====
    function updateCounter() {
        counterEl.textContent = `${commentInput.value.length} / ${COMMENT_MAX}`;
    }
    commentInput.addEventListener('input', updateCounter);
    updateCounter();

    // ===== Отправка =====
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fields = [phoneInput, emailInput, commentInput];
        const allValid = fields
            .map((f) => validators[f.name]?.(f) ?? true)
            .every(Boolean);

        if (!allValid) {
            fields.find((f) => f.getAttribute('aria-invalid') === 'true')?.focus();
            return;
        }

        // UI: загрузка
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn__text').textContent = 'Отправка...';
        submitBtn.querySelector('.btn__spinner').hidden = false;
        statusEl.textContent = '';
        statusEl.className = 'auth__status';

        try {
            // 🔌 Заглушка. Замените на реальный endpoint.
            // const response = await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     phone: phoneInput.value.trim(),
            //     email: emailInput.value.trim(),
            //     comment: commentInput.value.trim(),
            //   }),
            // });
            // if (!response.ok) throw new Error('Сервер вернул ошибку');

            await new Promise((r) => setTimeout(r, 800));

            statusEl.textContent = 'Спасибо! Я свяжусь с вами в ближайшее время.';
            statusEl.classList.add('auth__status--success');
            form.reset();
            fields.forEach((f) => setError(f, ''));
            updateCounter();
        } catch (error) {
            statusEl.textContent = 'Не удалось отправить. Попробуйте позже.';
            statusEl.classList.add('auth__status--error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn__text').textContent = 'Отправить';
            submitBtn.querySelector('.btn__spinner').hidden = true;
        }
    });
}