<?php

// Данные для подключения к Open Server
$host = '127.0.0.1'; // Адрес сервера (локальный)
$db   = 'Baza_PP04'; // Укажите имя ВАШЕЙ базы данных
$user = 'root'; // Стандартный пользователь Open Server
$pass = ''; // Пароль в Open Server по умолчанию пустой
$charset = 'utf8mb4'; // Кодировка для корректного отображения русского языка

// Настройки параметров PDO
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Включает вывод ошибок SQL
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Возвращает данные в виде ассоциативного массива
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Отключает эмуляцию подготовленных запросов
];

try {
    // Создаем подключение
    $pdo = new PDO($dsn, $user, $pass, $options);
    
} catch (\PDOException $e) {
    // Если что-то пошло не так, выводим ошибку
    die("Ошибка подключения к базе данных: " . $e->getMessage());
} 

?>