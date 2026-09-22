
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

