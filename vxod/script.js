document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email    = form.querySelector('input[name="email"]').value.trim();
        const password = form.querySelector('input[name="password"]').value;

        if (!email || !email.includes('@')) {
            alert('Некорректный email');
            return;
        }
        if (!password) {
            alert('Введите пароль');
            return;
        }

        const formData = new FormData();
        formData.append('ajax', '1');
        formData.append('email', email);
        formData.append('password', password);

        fetch('index.php', {
            method: 'POST',
            body: formData
        })
        .then(r => r.json())
        .then(res => {
            if (res.ok) {
                window.location.href = '../oformlenie_zaivki/index.php';
            } else {
                alert(res.error || 'Ошибка входа');
                if (res.redirect) {
                    window.location.href = res.redirect;
                }
            }
        })
        .catch(err => alert('Ошибка сети: ' + err.message));
    });
});