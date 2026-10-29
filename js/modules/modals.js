export function initModals() {

    // MODALKA

    const login = document.getElementById('login');
    const openLoginBtn = document.getElementById('openLoginBtn');
    const closeLoginBtn = document.getElementById('closeLoginBtn');

    // Open
    openLoginBtn.addEventListener('click', () => {
        login.classList.add('active');
    });
    // Close
    closeLoginBtn.addEventListener('click', () => {
        login.classList.remove('active');
    });
    // Close 2
    login.addEventListener('click', (e) => {
        if (e.target === login) {
            login.classList.remove('active');
        }
    })

    // MODALKA 2
    const register = document.getElementById('register');
    const openRegisterBtn = document.getElementById('openRegisterBtn');
    const closeRegisterBtn = document.getElementById('closeRegisterBtn');

    // Open
    openRegisterBtn.addEventListener('click', () => {
        register.classList.add('active');
    });
    // Close
    closeRegisterBtn.addEventListener('click', () => {
        register.classList.remove('active');
    });
    // Close 2
    register.addEventListener('click', (e) => {
        if (e.target === register) {
            register.classList.remove('active');
        }
    })

    // MODALKA 3
    const submit = document.getElementById('consultation');
    const openSubmitBtn = document.getElementById('openSubmitBtn');
    const closeSubmitBtn = document.getElementById('closeSubmitBtn');

    // Open
    openSubmitBtn.addEventListener('click', () => {
        submit.classList.add('active');
    });
    // Close
    closeSubmitBtn.addEventListener('click', () => {
        submit.classList.remove('active');
    });
    // Close 2
    submit.addEventListener('click', (e) => {
        if (e.target === submit) {
            submit.classList.remove('active');
        }
    })


}