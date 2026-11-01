export function register() {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const toggleBtn = document.getElementById('signup-toggle-password');
    const submitBtn = document.getElementById('signup-submit-btn');
    const statusEl = document.getElementById('signup-form-status');

    // ===== Регулярка для email (упрощённая, для клиента) =====
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // ===== Утилиты =====
    function setError(input, message) {
        const errorEl = document.getElementById(`${input.id}-error`);
        errorEl.textContent = message;
        input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function clearError(input) {
        setError(input, '');
    }

    // ===== Правила валидации =====
    const validators = {
        name(value) {
            const v = value.trim();
            if (!v) return 'Введите имя';
            if (v.length < 2) return 'Минимум 2 символа';
            return '';
        },
        email(value) {
            const v = value.trim();
            if (!v) return 'Введите email';
            if (!EMAIL_RE.test(v)) return 'Неверный формат email';
            return '';
        },
        password(value) {
            if (!value) return 'Введите пароль';
            if (value.length < 8) return 'Минимум 8 символов';
            return '';
        },
    };

    function validateField(input) {
        const validator = validators[input.name];
        if (!validator) return true;
        const message = validator(input.value);
        setError(input, message);
        return !message;
    }

    // ===== Валидация на blur и input (после первой ошибки) =====
    [nameInput, emailInput, passwordInput].forEach((input) => {
        let touched = false;

        input.addEventListener('blur', () => {
            touched = true;
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (touched) validateField(input);
            // Если поле стало валидным — сразу убираем ошибку
            if (input.getAttribute('aria-invalid') === 'true') {
                validateField(input);
            }
        });
    });

    // ===== Показать/скрыть пароль =====
    toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        toggleBtn.setAttribute('aria-pressed', String(isPassword));
        toggleBtn.setAttribute('aria-label', isPassword ? 'Скрыть пароль' : 'Показать пароль');
    });

    // ===== Отправка =====
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Проверяем все поля
        const fields = [nameInput, emailInput, passwordInput];
        const allValid = fields.map(validateField).every(Boolean);

        if (!allValid) {
            // Фокус на первое невалидное поле
            const firstInvalid = fields.find((f) => f.getAttribute('aria-invalid') === 'true');
            firstInvalid?.focus();
            return;
        }

        // UI: состояние загрузки
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn__text').textContent = 'Отправка...';
        submitBtn.querySelector('.btn__spinner').hidden = false;
        statusEl.textContent = '';
        statusEl.className = 'auth__status';

        try {
            // 🔌 Заглушка. Замените на реальный endpoint.
            // const response = await fetch('/api/register', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     name: nameInput.value.trim(),
            //     email: emailInput.value.trim(),
            //     password: passwordInput.value,
            //   }),
            // });
            // if (!response.ok) throw new Error('Сервер вернул ошибку');

            await new Promise((resolve) => setTimeout(resolve, 800)); // имитация запроса

            statusEl.textContent = 'Готово! Проверьте почту для подтверждения.';
            statusEl.classList.add('auth__status--success');
            form.reset();
            fields.forEach(clearError);
        } catch (error) {
            statusEl.textContent = 'Не удалось отправить. Попробуйте позже.';
            statusEl.classList.add('auth__status--error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn__text').textContent = 'Создать аккаунт';
            submitBtn.querySelector('.btn__spinner').hidden = true;
        }
    });
}