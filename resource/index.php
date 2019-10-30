<?php
session_start();

header('Content-Type: application/json');
if (isset($_POST["JSON"])) {

  $response = new stdClass();
  $request = json_decode($_POST["JSON"]);
  if ($request->operation == "record_transaction") {
    if ($request->from == $request->to) {
      $wallets = unserialize($_SESSION["wallets"]);
      array_push($wallets, $request->from);
      $_SESSION["wallets"] = serialize($wallets);
      http_response_code(200);
      $response->status = true;
      echo json_encode($response);
      exit;
    } else {
      $wallets = unserialize($_SESSION["wallets"]);
      if (in_array($request->to, $wallets)) {
        if ($_SESSION["amount"] - $request->amount < 0) {
          $response->status = false;
          $response->message = "El monto es mayor al saldo de la cuenta";
        } else {
          $_SESSION["amount"] -= $request->amount;
          http_response_code(200);
          $response->status = true;
        }
      } else {
        $response->status = false;
        $response->message = "La direccion de wallet no existe";
      }
      echo json_encode($response);
      exit;
    }
  }
  if ($request->operation == 'get_funding') {
    $wallets = unserialize($_SESSION["wallets"]);
    if (in_array($request->account, $wallets)) {
      http_response_code(200);

      $response->status = true;
      $response->amount = $_SESSION["amount"];
    } else {
      $response->status = false;
    }
    echo json_encode($response);
    exit;
  }
}
