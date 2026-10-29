export function initTheme() {

    // THEME
    const btn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (!btn) return; // Защита, если кнопки нет на странице

    btn.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        if (navigator.vibrate) navigator.vibrate(8);
    });

    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    // КОСТЫЛЬ УДАЛИТЬ
    document.addEventListener('DOMContentLoaded', () => {
        btn.click();
    });
}

