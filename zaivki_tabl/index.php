<?php
session_start();

require '../database.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['set_status'])) {
    $id     = (int)($_POST['id'] ?? 0);
    $status = (int)($_POST['status'] ?? -1);

    if ($id > 0 && in_array($status, [0, 1])) {
        $upd = $pdo->prepare("UPDATE z SET status = ? WHERE id = ?");
        $upd->execute([$status, $id]);
    }

    header('Location: index.php');
    exit;
}


// Кто это — админ или обычный?
$isAdmin = ($_SESSION['admin_status'] ?? 0) == 1;

// Разный запрос в зависимости от роли
if ($isAdmin) {
    // Админ — все заявки
    $stmt = $pdo->query("SELECT * FROM z ORDER BY id DESC");
    $zayavki = $stmt->fetchAll();
} else {
    // Пользователь — только свои
    $stmt = $pdo->prepare("SELECT * FROM z WHERE user_id = ? ORDER BY id DESC");
    $stmt->execute([$_SESSION['user_id'] ?? 0]);
    $zayavki = $stmt->fetchAll();
}

$slovDostup = [
    '1c'     => 'Доступ к 1С',
    'pochta' => 'Доступ к корпоративной почте',
    'crm'    => 'Доступ к CRM',
    'server' => 'Доступ к файловому серверу',
];
$slovPrioritet = [
    'nizkiy'  => 'Низкий (плановый)',
    'sredniy' => 'Средний (стандартный)',
    'visokiy' => 'Высокий',
];
$slovSrok = [
    'bessrochno' => 'Бессрочно',
    '1mes'       => '1 месяц',
    '3mes'       => '3 месяца',
    '6mes'       => '6 месяцев',
    '1god'       => '1 год',
];
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body data-is-admin="<?= $isAdmin ? '1' : '0' ?>">
    <header class="hed"> <!--начало хедера, вариант 2-->
        <a href="../main/index.php"><div class="logo_hed"></div></a>
        <div class="knop1"> <a href="../o_kompanii/index.php"> О компании </a> </div>
        <div class="knop2"> <a href="../kontakt/index.php"> Контакты </a> </div>
        <div class="knop3"> <a href="../zaivki_tabl/index.php"> Заявки </a> </div>
        <div class="fon_knop4">
            <div class="knop4" style="color: #FFFFFF;">
                <?php if (isset($_SESSION['user_id'])): ?>
                    <a href="../oformlenie_zaivki/index.php" class="a_kn">Оформить заявку</a>
                <?php else: ?>
                    <a href="../vxod/index.php" class="a_kn">Вход/Регистрация</a>
                <?php endif; ?>
            </div>
        </div>
        <?php if (isset($_SESSION['user_id'])): ?>
            <a href="../vixod/index.php" class="knop_vihod" title="Выйти"></a>
        <?php endif; ?>
    </header> <!--конец хедера, вариант 2-->

<div class="pustota" id="pustota">
<?php if (empty($zayavki)): ?>
    <div class="text_48p" id="pustotaText">Заявок нет</div>
<?php else: ?>
    <table id="tablica">
        <thead>
            <tr>
                <th>ФИО</th>
                <th>Статус заявки</th>
                <th>Тип доступа</th>
                <th>Срок</th>
                <th>Дата</th>
                <th>Действие</th>
            </tr>
        </thead>
        <tbody id="tablicaBody">
<?php foreach ($zayavki as $z): ?>
    <tr>
        <td><?= htmlspecialchars($z['FUO']) ?></td>
        <td>
            <?php if ($z['status'] == 1): ?>
                <span class="status-ok">Одобрено</span>
            <?php else: ?>
                <span class="status-no">Отклонено</span>
            <?php endif; ?>
        </td>
        <td><?= htmlspecialchars($slovDostup[$z['dostup']] ?? $z['dostup']) ?></td>
        <td><?= htmlspecialchars($slovSrok[$z['srok']] ?? $z['srok']) ?></td>
        <td><?= htmlspecialchars($z['date']) ?></td>
        <td>
              <a href="#" class="otkryt-modal"
                   data-id="<?= $z['id'] ?>"
                   data-fio="<?= htmlspecialchars($z['FUO']) ?>"
                   data-mail="<?= htmlspecialchars($z['email']) ?>"
                   data-telofon="<?= htmlspecialchars($z['phon']) ?>"
                   data-job="<?= htmlspecialchars($z['job_title']) ?>"
                   data-departamet="<?= htmlspecialchars($z['department']) ?>"
                   data-dostup="<?= htmlspecialchars($z['dostup']) ?>"
                   data-prioritet="<?= htmlspecialchars($z['priority']) ?>"
                   data-srok="<?= htmlspecialchars($z['srok']) ?>"
                   data-data="<?= htmlspecialchars($z['date']) ?>"
                   data-goals="<?= htmlspecialchars($z['chel']) ?>"
                   data-komm="<?= htmlspecialchars($z['komm_user']) ?>"
                   data-status="<?= htmlspecialchars($z['status']) ?>"
                >Просмотр</a>
            </td>
        </tr>
    <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>
</div>

<div class="modal" id="modal">
    <div class="modal-content">
        <span class="modal-close" id="modalClose">&times;</span>
        <div id="modalBody"> </div>
    </div>
</div>

    <footer class="fyt"> <!--начало футера-->

<div class="blok_1_foot"> <!--1 блок футера-->
 <a href="../main/index.php"><div class="logo_foot"></div></a>
<div class="podpis_foot text_20p"> <b>2026 ТехноСофт© - Все права защищены</b></div>
</div> <!--1 блок футера конец-->

<div class="blok_2foot"> <!--2 блок футера-->

    <div class="for_knop_foot"> <!--начало дива для кнопок футера-->
    <div class="knop_foot1 "> <a href="../o_kompanii/index.php" class="text_32p"> О компании</a> </div>
    <div class="knop_foot1 "> <a href="../kontakt/index.php" class="text_32p"> Контакты</a> </div>
    <div class="knop_foot1 "> <a href="../zaivki_tabl/index.php" class="text_32p"> Заявки</a> </div>
    </div> <!--конец дива для кнопок футера-->

    
    <div class="for_cot-cet_foot"> <!--начало родителя для сотсетей во втором блоке-->
<a href="https://max.ru/"> <div class="logo_max"> </div></a>
<a href="https://workspace.google.com/intl/ru/gmail/"> <div class="logo_pocht"> </div></a>
<a href="https://vk.ru/?u=2&to=L2luZGV4LnBocA--"> <div class="logo_vk"> </div></a>
    </div><!--конец родителя для сотсетей во втором блоке-->
    <div class="text_20p text_foot2"> <b>Улица 40 лет Победы, 3/1, с. Кашкарагаиха, Тальменский район, Алтайский край.</b></div>
</div> <!--2 блок футера конец-->

<div class="blok_3foot"> <!--3 блок футера-->
    <div class="karta_foot"></div>
<div class="fon_knop_foot"> <div class="knop4" style="color: #FFFFFF;"> <a href="../vxod/index.php" class="a_kn"> Вход/Регистрация </a> </div></div>
</div> <!--3 блок футера конец-->

    </footer> <!-- конец футера-->
    
</body>
<script src="script.js"></script>
</html>