<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

require '../database.php';

if (isset($_SESSION['user_id'])) {
    header('Location: ../oformlenie_zaivki/index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ajax'])) {
    header('Content-Type: application/json; charset=utf-8');

    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['ok' => false, 'error' => 'Некорректный email']);
        exit;
    }
    if ($password === '') {
        echo json_encode(['ok' => false, 'error' => 'Введите пароль']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        echo json_encode([
            'ok' => false,
            'error' => 'Пользователя с таким email не существует',
            'redirect' => '../registr/index.php'
        ]);
        exit;
    }

    if ($user['passworld'] !== $password) {
        echo json_encode(['ok' => false, 'error' => 'Неверный пароль']);
        exit;
    }

    $_SESSION['user_id']      = $user['id'];
    $_SESSION['admin_status'] = (int)$user['admin_status'];

    echo json_encode(['ok' => true]);
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
     <header class="hed">

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
    </header>

<div class="roditel">
    <div class="blok">
        <div class="zag text_36p"><b>Вход</b></div>
        <form method="POST">

  <div class="field">
    <label> <b>Email*</b></label>
    <input type="email" name="email" required >
  </div>

  <div class="field">
    <label> <b>Пароль*</b></label>
    <input type="password" name="password" required>
  </div>

<button class="text_20p" type="submit">Войти</button>
        </form>
          <a href="../registr/index.php" class="text_20p">регистрация</a>
        
    </div>
</div>


<div class="dek kryg1"></div>
<div class="dek kryg2"></div>
<div class="dek kryg3"></div>
<div class="dek kryg4"></div>
<div class="dek kryg5"></div>
<div class="dek kryg6"></div>

   <footer class="fyt">

<div class="blok_1_foot">
 <a href="../main/index.php"><div class="logo_foot"></div></a>
<div class="podpis_foot text_20p"> <b>2026 ТехноСофт© - Все права защищены</b></div>
</div>

<div class="blok_2foot">

    <div class="for_knop_foot">
    <div class="knop_foot1 "> <a href="../o_kompanii/index.php" class="text_32p"> О компании</a> </div>
    <div class="knop_foot1 "> <a href="../kontakt/index.php" class="text_32p"> Контакты</a> </div>
    <div class="knop_foot1 "> <a href="../zaivki_tabl/index.php" class="text_32p"> Заявки</a> </div>
    </div>

    
    <div class="for_cot-cet_foot">
<a href="https://max.ru/"> <div class="logo_max"> </div></a>
<a href="https://workspace.google.com/intl/ru/gmail/"> <div class="logo_pocht"> </div></a>
<a href="https://vk.ru/?u=2&to=L2luZGV4LnBocA--"> <div class="logo_vk"> </div></a>
    </div>
    <div class="text_20p text_foot2"> <b>Улица 40 лет Победы, 3/1, с. Кашкарагаиха, Тальменский район, Алтайский край.</b></div>
</div>

<div class="blok_3foot">
    <div class="karta_foot"></div>
<div class="fon_knop_foot"> <div class="knop4" style="color: #FFFFFF;"> <a href="../vxod/index.php" class="a_kn"> Вход/Регистрация </a> </div></div>
</div>

    </footer>

    <div class="valid-msg" id="validMsg"></div>
</body>
<script src="script.js"></script>
</html>