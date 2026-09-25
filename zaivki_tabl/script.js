// Определяем, админ ли текущий пользователь
const isAdmin = document.body.dataset.isAdmin === '1';

// ===== Модальное окно =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('otkryt-modal')) {
        e.preventDefault();
        const d = e.target.dataset;

        // Определяем текущий статус
        const statusText = d.status == 1 ? 'Одобрено' : 'Отклонено';
        const statusClass = d.status == 1 ? 'status-ok' : 'status-no';

        document.getElementById('modalBody').innerHTML = `
            <div class="blok2">
                <div class="for_1blok_form">
                    <div class="zag_rod">
                        <div class="dek number_fon text_48p"><b>1</b></div>
                        <div class="tex2 text_36p"><b>Основные данные</b></div>
                    </div>
                    <div class="text_20p"><b>ФИО</b> - ${d.fio || ''}</div>
                    <div class="text_20p"><b>email</b> - ${d.mail || ''}</div>
                    <div class="text_20p"><b>Телефон</b> - ${d.telofon || ''}</div>
                    <div class="text_20p"><b>Должность</b> - ${d.job || ''}</div>
                    <div class="text_20p"><b>Отдел/Департамент</b> - ${d.departamet || ''}</div>
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
                                <div><input type="radio" name="m_dostup" value="1c" ${d.dostup === '1c' ? 'checked' : ''} disabled><label> Доступ к 1С</label></div>
                                <div><input type="radio" name="m_dostup" value="pochta" ${d.dostup === 'pochta' ? 'checked' : ''} disabled><label> Доступ к корпоративной почте</label></div>
                                <div><input type="radio" name="m_dostup" value="crm" ${d.dostup === 'crm' ? 'checked' : ''} disabled><label> Доступ к CRM</label></div>
                                <div><input type="radio" name="m_dostup" value="server" ${d.dostup === 'server' ? 'checked' : ''} disabled><label> Доступ к файловому серверу</label></div>
                            </div>
                        </div>
                        <div class="m_col">
                            <div class="text_20p zag2"><b>Приоритет</b></div>
                            <div class="radio-group">
                                <div><input type="radio" name="m_prioritet" value="nizkiy" ${d.prioritet === 'nizkiy' ? 'checked' : ''} disabled><label> Низкий (плановый)</label></div>
                                <div><input type="radio" name="m_prioritet" value="sredniy" ${d.prioritet === 'sredniy' ? 'checked' : ''} disabled><label> Средний (стандартный)</label></div>
                                <div><input type="radio" name="m_prioritet" value="visokiy" ${d.prioritet === 'visokiy' ? 'checked' : ''} disabled><label> Высокий</label></div>
                            </div>
                        </div>
                        <div class="m_col">
                            <div class="text_20p zag2"><b>Срок предоставления доступа</b></div>
                            <div class="radio-group">
                                <div><input type="radio" name="m_srok" value="bessrochno" ${d.srok === 'bessrochno' ? 'checked' : ''} disabled><label> Бессрочно</label></div>
                                <div><input type="radio" name="m_srok" value="1mes" ${d.srok === '1mes' ? 'checked' : ''} disabled><label> 1 месяц</label></div>
                                <div><input type="radio" name="m_srok" value="3mes" ${d.srok === '3mes' ? 'checked' : ''} disabled><label> 3 месяца</label></div>
                                <div><input type="radio" name="m_srok" value="6mes" ${d.srok === '6mes' ? 'checked' : ''} disabled><label> 6 месяцев</label></div>
                                <div><input type="radio" name="m_srok" value="1god" ${d.srok === '1god' ? 'checked' : ''} disabled><label> 1 год</label></div>
                            </div>
                        </div>
                        <div class="m_col">
                            <div class="text_20p zag2"><b>Дата</b></div>
                            <div class="text_20p">${d.data || ''}</div>
                        </div>
                    </div>
                </div>

                <div class="for_3blok_form">
                    <div class="zag_rod">
                        <div class="dek number_fon text_48p"><b>3</b></div>
                        <div class="tex2 text_36p"><b>Цель и комментарии</b></div>
                    </div>
                    <div class="row">
                        <div class="field"><label class="text_20p"><b>Цели</b></label><div class="text_20p">${d.goals || ''}</div></div>
                        <div class="field"><label class="text_20p"><b>Комментарии</b></label><div class="text_20p">${d.komm || ''}</div></div>
                    </div>
                </div>

                ${isAdmin ? `
                <div class="for_4blok_form">
                    <div class="zag_rod">
                        <div class="dek number_fon text_48p"><b>4</b></div>
                        <div class="tex2 text_36p"><b>Статус заявки</b></div>
                    </div>

                    <div class="text_20p" style="margin-bottom: 20px;">
                        <b>Текущий статус:</b>
                        <span class="${statusClass}">${statusText}</span>
                    </div>

                    <form method="POST" action="index.php" class="status-form">
                        <input type="hidden" name="id" value="${d.id}">
                        <input type="hidden" name="set_status" value="1">

                        <button type="submit" name="status" value="1" class="btn-status btn-ok">
                            ✔ Положительно
                        </button>

                        <button type="submit" name="status" value="0" class="btn-status btn-no">
                            ✘ Отрицательно
                        </button>
                    </form>
                </div>
                ` : ''}
            </div>
        `;
        document.getElementById('modal').classList.add('aktivno');
    }

    if (e.target.id === 'modalClose' || e.target.id === 'modal') {
        document.getElementById('modal').classList.remove('aktivno');
    }
});