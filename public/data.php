<?php
require_once('../vendor/autoload.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$dbc = new DatabaseConnection();

$record = $dbc->get(1);

try {
  $result = [
    'status' => 'OK',
    'record' => $record
  ];
} catch(Exception $exception) {
  $result = [
    'status' => 'ERROR',
    'record' => null
  ];
}

echo json_encode($result);


class HandleRequest {
  function __construct() {
    
  }
}


class DatabaseConnection {
  public $connection;

  function __construct() {
    $this->connect();
    if(!$this->test()) $this->setup();
  }
  
  //  Get a row from the records table
  public function get($id) {
    //  We both know this isn't good enough, as it isn't filtering. Please make sure you do that :)
    $results = pg_query($this->getConnection(), "SELECT * FROM records WHERE id = $id ORDER BY name LIMIT 1");
    $row = pg_fetch_assoc($results, 0);
    return $row;
  }

  //  Gets all rows from the records table
  public function all() {
    //  We both know this isn't good enough, as it isn't filtering. Please make sure you do that :)
    $results = pg_query($this->getConnection(), "SELECT * FROM records ORDER BY name");
    $rows = pg_fetch_assoc($results);
    return $rows;
  }

  //  Creates a row in the records table
  public function create($name, $amazingLevel, $country) {
    try {
      pg_prepare($this->getConnection(), "create_record", "INSERT INTO records (name, amazing_level, country) VALUES ($1, $2, $3);");
      pg_execute($this->getConnection(), "create_record", array($name, $amazingLevel, $country));
      return TRUE;
    } catch(Exception $e) {
      return FALSE;
    }
  }

  //  Establish connection to database
  function connect() {
    $this->connection = pg_connect($this->getConnectionString());
  }

  //  Get reference to current connection
  function getConnection() {
    return $this->connection;
  }

  //  Get database connection string
  function getConnectionString() {
    extract(parse_url($_ENV["DATABASE_URL"]));
    return "user=$user password=$pass host=$host dbname=" . substr($path, 1);
  }

  //  Test if records table exists
  function test() {
    $results = pg_query($this->getConnection(), "SELECT * FROM records LIMIT 1");
    return $results ? TRUE : FALSE;
  }

  //  Creates record table and inserts a few fake records
  function setup() {
    
    //  Don't run if things are all setup
    if($this->test()) return;

    //  Prepare SQL statement for creating a table called 'records'
    pg_prepare($this->getConnection(), "create_table", "CREATE TABLE IF NOT EXISTS records (
      id SERIAL PRIMARY KEY,
      name CHARACTER VARYING(100),
      amazing_level INT,
      country CHARACTER VARYING(100)
    );");

    //  Execute prepared statement
    pg_execute($this->getConnection(), "create_table", array());

    //  Create some fake records
    $this->create("Kylie Minogue", 10, "Australia");
    $this->create("Sugababes", 9, "England");
    $this->create("2 Unlimited", 8, "Germany");
    $this->create("Brooklyn Bounce", 8, "United States");
  }

}
