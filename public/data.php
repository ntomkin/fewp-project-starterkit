<?php
require_once('../vendor/autoload.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$dbc = new DatabaseConnection();
$dbc->get(1);

try {
  $result = [
    'status' => 'OK',
    'record' => [
      'name' => 'Kylie Minogue', 
      'amazing_level' => '10',
      'country' => 'Australia',
    ]
  ];
} catch(Exception $exception) {
  $result = [
    'status' => 'ERROR',
    'record' => null
  ];
}

echo json_encode($result);


class DatabaseConnection {
  public $connection;

  function __construct() {
    $this->connect();

    if(!$this->test()) $this->setup();
  }

  public function get($id) {
    //  We both know this isn't good enough, as it isn't filtering. Please make sure you do that :)
    $results = pg_query($this->getConnection(), "SELECT * FROM records WHERE id = $id");
    $row = pg_fetch_row($results, 0);

    return json_encode($row);
  }

  function connect() {
    $this->connection = pg_connect($this->getConnectionString());
  }

  function getConnection() {
    return $this->connection;
  }

  function test() {
    //  Test if records table exists
    $results = pg_query($this->getConnection(), "SELECT * FROM records LIMIT 1");
    return pg_num_rows($results);
  }

  function setup() {
    //  Creates record table
    $this->getConnection()->exec('CREATE TABLE IF NOT EXISTS records (
      id SERIAL PRIMARY KEY,
      name CHARACTER VARYING(100),
      amazing_level INT,
      country CHARACTER VARYING(100)
    );');
  }

  function getConnectionString() {
    extract(parse_url($_ENV["DATABASE_URL"]));
    return "user=$user password=$pass host=$host dbname=" . substr($path, 1);
  }

}