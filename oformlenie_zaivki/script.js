function ochistka() {
    document.querySelector('input[name="FUO"]').value = '';
    document.querySelector('input[name="mail"]').value = '';
    document.querySelector('input[name="telofon"]').value = '';
    document.querySelector('input[name="job"]').value = '';
    document.querySelector('input[name="departamet"]').value = '';

    document.querySelectorAll('input[name="dostup"]').forEach(radio => {
        radio.checked = false;
    });
    document.querySelectorAll('input[name="prioritet"]').forEach(radio => {
        radio.checked = false;
    });
    document.querySelectorAll('input[name="srok"]').forEach(radio => {
        radio.checked = false;
    });

    document.querySelector('input[name="data"]').value = '';
    document.querySelector('input[name="goals"]').value = '';
    document.querySelector('input[name="komm"]').value = '';
}

//  Валидация телефона
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.querySelector('input[name="telofon"]');
    if (!phoneInput) return;

    // При фокусе: если пусто — подставляем +7
    phoneInput.addEventListener('focus', () => {
        if (phoneInput.value.trim() === '') {
            phoneInput.value = '+7 ';
        }
    });

    // При вводе: считаем цифры, если больше 11 — не даём печатать
    phoneInput.addEventListener('input', (e) => {
        let value = phoneInput.value;

        // Считаем только цифры
        const digits = value.replace(/\D/g, '');

        // Если цифр больше 11 — обрезаем
        if (digits.length > 11) {
            // Оставляем только первые 11 цифр и восстанавливаем формат
            const truncated = digits.slice(0, 11);

            // Восстанавливаем с форматированием
            phoneInput.value = formatPhone(truncated);
            return;
        }

        // Автоматически  +7 если стёрли
        if (!value.startsWith('+7') && value.length > 0) {
            phoneInput.value = '+7 ' + value.replace(/^\+?7?\s*/, '');
        }
    });

    // При отправке формы — валидация
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const phone = phoneInput.value;
            const digits = phone.replace(/\D/g, '');

            // Должно быть ровно 11 цифр, и начинаться с 7
            if (digits.length !== 11 || !digits.startsWith('7')) {
                e.preventDefault();
                alert('Некорректный номер телефона. Введите 11 цифр, начиная с +7');
                phoneInput.focus();
                return;
            }
        });
    }
});

// Функция форматирования: 79991234567 → +7 (999) 123-45-67
function formatPhone(digits) {
    // digits = "79991234567"
    if (digits.length === 0) return '+7 ';
    if (digits.length === 1) return '+7';

    const rest = digits.slice(1); 
    let result = '+7 ';

    if (rest.length > 0) result += '(' + rest.slice(0, 3);
    if (rest.length >= 3) result += ') ';
    if (rest.length > 3) result += rest.slice(3, 6);
    if (rest.length > 6) result += '-' + rest.slice(6, 8);
    if (rest.length > 8) result += '-' + rest.slice(8, 10);

    return result;
}