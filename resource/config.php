<?php

session_start();
$wallets = ['5a1e99e7cfda6efab7bc3e42427e937dcc6daf6d448339d32327d1c80b30413f','fbf7c74c78a6df0624b8cb41543bb0b86470c40073ceee27be806e52d202cb0d'];
$_SESSION["amount"] = 4500000;
$_SESSION["wallets"] = serialize($wallets);