<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 0);  

require '../database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ajax'])) {
    header('Content-Type: application/json; charset=utf-8');

    $fullname = trim($_POST['fullname'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';


    if ($fullname === '') {
        echo json_encode(['ok' => false, 'error' => 'Введите ФИО']);
        exit;
    }
    $parts = preg_split('/\s+/', $fullname);
    if (count($parts) < 2) {
        echo json_encode(['ok' => false, 'error' => 'Введите минимум имя и фамилию через пробел']);
        exit;
    }
    if (count($parts) > 3) {
        echo json_encode(['ok' => false, 'error' => 'Максимум 3 слова (Фамилия Имя Отчество)']);
        exit;
    }
    foreach ($parts as $p) {
        if (!preg_match('/^[А-Яа-яЁёA-Za-z\-]+$/u', $p)) {
            echo json_encode(['ok' => false, 'error' => 'ФИО: только буквы и дефис']);
            exit;
        }
        if (mb_strlen(str_replace('-', '', $p)) < 2) {
            echo json_encode(['ok' => false, 'error' => 'ФИО: каждая часть минимум 2 буквы']);
            exit;
        }
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['ok' => false, 'error' => 'Некорректный email']);
        exit;
    }


    if (strlen($password) < 6) {
        echo json_encode(['ok' => false, 'error' => 'Пароль минимум 6 символов']);
        exit;
    }

    if (!preg_match('/[0-9]/', $password)) {
        echo json_encode(['ok' => false, 'error' => 'Пароль должен содержать цифры']);
        exit;
    }


    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode([
            'ok' => false,
            'error' => 'Пользователь с таким email уже зарегистрирован',
            'redirect' => '../vxod/index.php'
        ]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO users (FUO, email, passworld, admin_status)
            VALUES (?, ?, ?, 0)
        ");
        $stmt->execute([$fullname, $email, $password]);

        echo json_encode(['ok' => true]);
    } catch (PDOException $e) {
        echo json_encode(['ok' => false, 'error' => 'Ошибка БД: ' . $e->getMessage()]);
    }
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
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

<div class="roditel">
    <div class="blok">
        <div class="zag text_36p"><b>Регистрация</b></div>
        <form method="POST">
            <div class="field">
    <label> <b>ФИО*</b></label>
    <input type="text" name="fullname" required>
  </div>

  <div class="field">
    <label> <b>Email*</b></label>
    <input type="email" name="email" required>
  </div>

  <div class="field">
    <label> <b>Пароль*</b></label>
    <input type="password" name="password" required>
  </div>

<button type="submit">Зарегистрироваться</button>
        </form>
</div>
    </div>
</div>

<div class="dek kryg1"></div>
<div class="dek kryg2"></div>
<div class="dek kryg3"></div>
<div class="dek kryg4"></div>
<div class="dek kryg5"></div>
<div class="dek kryg6"></div>


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

    <div class="valid-msg" id="validMsg"></div>
</body>
<script src="script.js"></script>
</html>