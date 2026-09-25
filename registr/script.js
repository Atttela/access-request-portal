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
    if (!/[0-9]/.test(value)) return 'Пароль должен содержать цифры';
    return null;
}

function validPassVhod(value) {
    if (!value) return 'Введите пароль';
    if (value.length < 6) return 'Пароль минимум 6 символов';
    return null;
}

// ===== Отправка формы регистрации =====
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Данные из формы
        const fullname = form.querySelector('input[name="fullname"]').value;
        const email    = form.querySelector('input[name="email"]').value;
        const password = form.querySelector('input[name="password"]').value;

        // Клиентская валидация — alert!
        let err = validFio(fullname);
        if (err) { alert(err); return; }

        err = validEmail(email);
        if (err) { alert(err); return; }

        err = validPassReg(password);
        if (err) { alert(err); return; }

        // Отправка на сервер
        const formData = new FormData();
        formData.append('ajax', '1');
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('password', password);

        fetch('index.php', {
            method: 'POST',
            body: formData
        })
        .then(r => r.json())
        .then(res => {
            if (res.ok) {
                alert('Регистрация успешна! Сейчас перекинет на страницу входа.');
                window.location.href = '../vxod/index.php';
            } else {
                alert(res.error || 'Ошибка регистрации');
                if (res.redirect) {
                    window.location.href = res.redirect;
                }
            }
        })
        .catch(err => {
            alert('Ошибка сети: ' + err.message);
        });
    });
});