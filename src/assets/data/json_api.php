<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if($_SERVER["REQUEST_METHOD"] == 'POST') {
  $postdata = file_get_contents("php://input");
  if(empty($postdata)){
    echo json_encode(['success' => false, 'message'=> 'file do not exist', 'data' => $postdata]);
    exit();
  }
  $postRequest = (array)(json_decode($postdata));
  $data = $postRequest['data'] ?? '';
  $filename =$postRequest['file'];
  $newJsonString = json_encode($data);
  file_put_contents($filename, $newJsonString);
  echo json_encode(['success' => true, 'message'=> 'saved', 'data' => $newJsonString]);
} else {
  echo json_encode(['success' => false, 'message'=> 'post data invalid', 'data' => $_REQUEST['data']]);
}
exit();
