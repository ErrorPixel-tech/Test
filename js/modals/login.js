export function login() {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const rememberInput = document.getElementById('login-remember');
    const toggleBtn = document.getElementById('login-toggle-password');
    const submitBtn = document.getElementById('login-submit-btn');
    const statusEl = document.getElementById('login-form-status');

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // ===== Восстановить сохранённый email при загрузке =====
    // (только email, пароль НИКОГДА не храним в localStorage)
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberInput.checked = true;
    }

    // ===== Утилиты ошибок =====
    function setError(input, message) {
        const errorEl = document.getElementById(`${input.id}-error`);
        errorEl.textContent = message;
        input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validateField(input) {
        if (input.name === 'email') {
            const v = input.value.trim();
            if (!v) return setError(input, 'Введите email'), false;
            if (!EMAIL_RE.test(v)) return setError(input, 'Неверный формат email'), false;
        }
        if (input.name === 'password') {
            if (!input.value) return setError(input, 'Введите пароль'), false;
        }
        setError(input, '');
        return true;
    }

    // ===== Валидация =====
    [emailInput, passwordInput].forEach((input) => {
        let touched = false;
        input.addEventListener('blur', () => { touched = true; validateField(input); });
        input.addEventListener('input', () => {
            if (touched) validateField(input);
            if (input.getAttribute('aria-invalid') === 'true') validateField(input);
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

        const fields = [emailInput, passwordInput];
        const allValid = fields.map(validateField).every(Boolean);

        if (!allValid) {
            fields.find((f) => f.getAttribute('aria-invalid') === 'true')?.focus();
            return;
        }

        // UI: загрузка
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn__text').textContent = 'Вход...';
        submitBtn.querySelector('.btn__spinner').hidden = false;
        statusEl.textContent = '';
        statusEl.className = 'auth__status';

        try {
            // 🔌 Заглушка. Замените на реальный endpoint.
            // const response = await fetch('/api/login', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   credentials: 'include', // важно для cookie-сессии
            //   body: JSON.stringify({
            //     email: emailInput.value.trim(),
            //     password: passwordInput.value,
            //     remember: rememberInput.checked,
            //   }),
            // });
            // if (!response.ok) throw new Error('Неверные данные');

            await new Promise((r) => setTimeout(r, 800)); // имитация

            // «Запомнить меня» на клиенте — только email для удобства.
            // Реальное продление сессии — на сервере (cookie maxAge).
            if (rememberInput.checked) {
                localStorage.setItem('rememberedEmail', emailInput.value.trim());
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            statusEl.textContent = 'Успешный вход! Перенаправляем...';
            statusEl.classList.add('auth__status--success');
            // window.location.href = '/dashboard';
        } catch (error) {
            statusEl.textContent = 'Неверный email или пароль.';
            statusEl.classList.add('auth__status--error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn__text').textContent = 'Войти';
            submitBtn.querySelector('.btn__spinner').hidden = true;
        }
    });
}