<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: oformlenie_zaivki/index.php');
    exit;
}

$fuo        = trim($_POST['FUO'] ?? '');
$email      = trim($_POST['mail'] ?? '');
$phon       = trim($_POST['telofon'] ?? '');
$job_title  = trim($_POST['job'] ?? '');
$department = trim($_POST['departamet'] ?? '');
$dostup     = $_POST['dostup'] ?? '';
$priority   = $_POST['prioritet'] ?? '';
$srok       = $_POST['srok'] ?? '';
$date       = $_POST['data'] ?? date('Y-m-d');
$chel       = trim($_POST['goals'] ?? '');
$komm_user  = trim($_POST['komm'] ?? '');

// Кто создаёт заявку
$userId = $_SESSION['user_id'] ?? null;

if ($fuo === '' || $email === '') {
    die('Заполните обязательные поля: ФИО и email');
}

$stmt = $pdo->prepare("
    INSERT INTO z (FUO, email, phon, job_title, department, dostup, priority, srok, date, chel, komm_user, status, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
");
$stmt->execute([
    $fuo,
    $email,
    $phon,
    $job_title,
    $department,
    $dostup,
    $priority,
    $srok,
    $date,
    $chel,
    $komm_user,
    $userId
]);

header('Location: zaivki_tabl/index.php');
exit;