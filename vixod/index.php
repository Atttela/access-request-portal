<?php
session_start();
session_destroy();
header('Location: ../vxod/index.php');
exit;