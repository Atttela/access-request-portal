// ===== Общие утилиты =====
const msg = document.getElementById('validMsg');

function showMsg(text, type) {
    if (!msg) return;
    msg.textContent = text;
    msg.className = 'valid-msg ' + type;
    setTimeout(() => { msg.className = 'valid-msg'; }, 3000);
}

function setState(input, ok) {
    if (!input) return;
    if (ok) {
        input.classList.remove('error');
        input.classList.add('success');
    } else {
        input.classList.remove('success');
        input.classList.add('error');
    }
}

// ===== Валидаторы =====
function validFio(value) {
    const v = value.trim();
    if (!v) return 'Введите ФИО';
    const parts = v.split(/\s+/);
    if (parts.length < 2) return 'Введите минимум имя и фамилию через пробел';
    if (parts.length > 3) return 'Максимум 3 слова (Фамилия Имя Отчество)';
    for (let p of parts) {
        if (!/^[А-Яа-яЁёA-Za-z\-]+$/.test(p)) return 'Только буквы и дефис';
        if (p.replace(/-/g, '').length < 2) return 'Каждая часть минимум 2 буквы';
    }
    return null;
}

function validEmail(value) {
    const v = value.trim();
    if (!v) return 'Введите email';
    if (!v.includes('@')) return 'Почта должна содержать @';
    return null;
}

function validPassReg(value) {
    if (!value) return 'Введите пароль';
    if (value.length < 6) return 'Пароль минимум 6 символов';
    if (!/[A-Za-z]/.test(value)) return 'Пароль должен содержать буквы';
    if (!/[0-9]/.test(value)) return 'Пароль должен содержать цифры';
    return null;
}

function validPassVhod(value) {
    if (!value) return 'Введите пароль';
    if (value.length < 6) return 'Пароль минимум 6 символов';
    return null;
}

// ===== Работа с хранилищем =====
function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (exists) return 'Пользователь с такой почтой уже зарегистрирован';
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return null;
}

function findUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
}

// ===== Определяем страницу по наличию полей =====
const form = document.querySelector('form');
const inputFio = document.querySelector('input[name="fullname"]');
const inputEmail = document.querySelector('input[name="email"]');
const inputPass = document.querySelector('input[name="password"]');

// ===== СТРАНИЦА РЕГИСТРАЦИИ =====
if (inputFio && inputEmail && inputPass && form) {
    inputFio.addEventListener('blur', () => {
        const e = validFio(inputFio.value);
        setState(inputFio, !e);
        if (e) showMsg(e, 'error');
    });

    inputEmail.addEventListener('blur', () => {
        const e = validEmail(inputEmail.value);
        setState(inputEmail, !e);
        if (e) showMsg(e, 'error');
    });

    inputPass.addEventListener('blur', () => {
        const e = validPassReg(inputPass.value);
        setState(inputPass, !e);
        if (e) showMsg(e, 'error');
    });

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const e1 = validFio(inputFio.value);
    //     const e2 = validEmail(inputEmail.value);
    //     const e3 = validPassReg(inputPass.value);

    //     setState(inputFio, !e1);
    //     setState(inputEmail, !e2);
    //     setState(inputPass, !e3);

    //     if (e1) return showMsg(e1, 'error');
    //     if (e2) return showMsg(e2, 'error');
    //     if (e3) return showMsg(e3, 'error');

    //     const user = {
    //         fullname: inputFio.value.trim(),
    //         email: inputEmail.value.trim(),
    //         password: inputPass.value
    //     };

    //     const saveErr = saveUser(user);
    //     if (saveErr) return showMsg(saveErr, 'error');

    //     showMsg('Регистрация успешна! Теперь войдите в учетную запись.', 'success');
    // });
}

// ===== СТРАНИЦА ВХОДА =====
if (!inputFio && inputEmail && inputPass && form) {
    inputEmail.addEventListener('blur', () => {
        const e = validEmail(inputEmail.value);
        if (e) showMsg(e, 'error');
    });

    inputPass.addEventListener('blur', () => {
        const e = validPassVhod(inputPass.value);
        if (e) showMsg(e, 'error');
    });

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const e1 = validEmail(inputEmail.value);
    //     const e2 = validPassVhod(inputPass.value);

    //     if (e1) return showMsg(e1, 'error');
    //     if (e2) return showMsg(e2, 'error');

    //     const user = findUser(inputEmail.value.trim(), inputPass.value);
    //     if (!user) return showMsg('Записи не существует', 'error');

    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     showMsg('Вход выполнен! С возвращением, ' + user.fullname, 'success');
    // });

    // ===== Кнопка "далее" =====
    const knopkaDalee = document.getElementById('knopkaDalee');

    function proverkaDalee() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const emailVveden = inputEmail.value.trim().toLowerCase();
        const passVveden = inputPass.value;
        if (!currentUser) return false;
        if (currentUser.email.toLowerCase() !== emailVveden) return false;
        if (currentUser.password !== passVveden) return false;
        return true;
    }

    // if (knopkaDalee) {
    //     knopkaDalee.addEventListener('click', (e) => {
    //         if (!proverkaDalee()) {
    //             e.preventDefault();
    //             alert('Зарегистрируйтесь или проверьте корректность введения данных');
    //         }
    //     });
    // }
}