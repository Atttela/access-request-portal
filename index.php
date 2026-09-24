<?php

require './database.php';
 $lol=$pdo->query("select * from users ");
 $users = $lol-> fetch();
 print_r ($users); 




