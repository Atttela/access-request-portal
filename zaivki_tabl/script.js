function vyvestiZayavki() {
    const tbody = document.getElementById('tablicaBody');
    const pustotaText = document.getElementById('pustotaText');
    const tablica = document.getElementById('tablica');
    if (!tbody) return;

    const zaivki = JSON.parse(localStorage.getItem('zaivki') || '[]');
    tbody.innerHTML = '';

    if (zaivki.length === 0) {
        if (pustotaText) pustotaText.style.display = 'block';
        if (tablica) tablica.style.display = 'none';
        return;
    }

    if (pustotaText) pustotaText.style.display = 'none';
    if (tablica) tablica.style.display = 'table';

    const slovDostup = {'1c': 'Доступ к 1С', 'pochta': 'Доступ к корпоративной почте', 'crm': 'Доступ к CRM', 'server': 'Доступ к файловому серверу'};
    const slovPrioritet = {'nizkiy': 'Низкий (плановый)', 'sredniy': 'Средний (стандартный)', 'visokiy': 'Высокий'};
    const slovSrok = {'bessrochno': 'Бессрочно', '1mes': '1 месяц', '3mes': '3 месяца', '6mes': '6 месяцев', '1god': '1 год'};

    zaivki.forEach((z, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${z.FUO || ''}</td>
            <td>${slovPrioritet[z.prioritet] || z.prioritet || ''}</td>
            <td>${slovDostup[z.dostup] || z.dostup || ''}</td>
            <td>${slovSrok[z.srok] || z.srok || ''}</td>
            <td>${z.data || ''}</td>
            <td><a href="#" class="otkryt-modal" data-index="${index}">Просмотр</a></td>
        `;
        tbody.appendChild(tr);
    });
}

vyvestiZayavki();

// ===== Модальное окно =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('otkryt-modal')) {
        e.preventDefault();
        const index = e.target.dataset.index;
        const zaivki = JSON.parse(localStorage.getItem('zaivki') || '[]');
        const z = zaivki[index];
        if (!z) return;

        document.getElementById('modalBody').innerHTML = `
            <div class="blok2">
                <div class="for_1blok_form">
                    <div class="zag_rod">
                        <div class="dek number_fon text_48p"><b>1</b></div>
                        <div class="tex2 text_36p"><b>Основные данные</b></div>
                    </div>
                    <div class="text_20p"><b>ФИО</b> - ${z.FUO || ''}</div>
                    <div class="text_20p"><b>email</b> - ${z.mail || ''}</div>
                    <div class="text_20p"><b>Телефон</b> - ${z.telofon || ''}</div>
                    <div class="text_20p"><b>Должность</b> - ${z.job || ''}</div>
                    <div class="text_20p"><b>Отдел/Департамент</b> - ${z.departamet || ''}</div>
                </div>

                <div class="for_2blok_form">
                    <div class="zag_rod">
                        <div class="dek number_fon text_48p"><b>2</b></div>
                        <div class="tex2 text_36p"><b>Параметры заявки</b></div>
                    </div>
                    <div class="m_row">
                        <div class="m_col">
                            <div class="text_20p zag2"><b>Доступ к</b></div>
                            <div class="radio-group">
                                <div><input type="radio" name="m_dostup" value="1c" ${z.dostup === '1c' ? 'checked' : ''} disabled><label> Доступ к 1С</label></div>
                                <div><input type="radio" name="m_dostup" value="pochta" ${z.dostup === 'pochta' ? 'checked' : ''} disabled><label> Доступ к корпоративной почте</label></div>
                                <div><input type="radio" name="m_dostup" value="crm" ${z.dostup === 'crm' ? 'checked' : ''} disabled><label> Доступ к CRM</label></div>
                                <div><input type="radio" name="m_dostup" value="server" ${z.dostup === 'server' ? 'checked' : ''} disabled><label> Доступ к файловому серверу</label></div>
                            </div>
                        </div>
                        <div class="m_col">
                            <div class="text_20p zag2"><b>Приоритет</b></div>
                            <div class="radio-group">
                                <div><input type="radio" name="m_prioritet" value="nizkiy" ${z.prioritet === 'nizkiy' ? 'checked' : ''} disabled><label> Низкий (плановый)</label></div>
                                <div><input type="radio" name="m_prioritet" value="sredniy" ${z.prioritet === 'sredniy' ? 'checked' : ''} disabled><label> Средний (стандартный)</label></div>
                                <div><input type="radio" name="m_prioritet" value="visokiy" ${z.prioritet === 'visokiy' ? 'checked' : ''} disabled><label> Высокий</label></div>
                            </div>
                        </div>
                        <div class="m_col">
                            <div class="text_20p zag2"><b>Срок предоставления доступа</b></div>
                            <div class="radio-group">
                                <div><input type="radio" name="m_srok" value="bessrochno" ${z.srok === 'bessrochno' ? 'checked' : ''} disabled><label> Бессрочно</label></div>
                                <div><input type="radio" name="m_srok" value="1mes" ${z.srok === '1mes' ? 'checked' : ''} disabled><label> 1 месяц</label></div>
                                <div><input type="radio" name="m_srok" value="3mes" ${z.srok === '3mes' ? 'checked' : ''} disabled><label> 3 месяца</label></div>
                                <div><input type="radio" name="m_srok" value="6mes" ${z.srok === '6mes' ? 'checked' : ''} disabled><label> 6 месяцев</label></div>
                                <div><input type="radio" name="m_srok" value="1god" ${z.srok === '1god' ? 'checked' : ''} disabled><label> 1 год</label></div>
                            </div>
                        </div>
                        <div class="m_col">
                            <div class="text_20p zag2"><b>Дата</b></div>
                            <div class="text_20p">${z.data || ''}</div>
                        </div>
                    </div>
                </div>

                <div class="for_3blok_form">
                    <div class="zag_rod">
                        <div class="dek number_fon text_48p"><b>3</b></div>
                        <div class="tex2 text_36p"><b>Цель и комментарии</b></div>
                    </div>
                    <div class="row">
                        <div class="field"><label class="text_20p"><b>Цели</b></label><div class="text_20p">${z.goals || ''}</div></div>
                        <div class="field"><label class="text_20p"><b>Комментарии</b></label><div class="text_20p">${z.komm || ''}</div></div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('modal').classList.add('aktivno');
    }

    if (e.target.id === 'modalClose' || e.target.id === 'modal') {
        document.getElementById('modal').classList.remove('aktivno');
    }
});