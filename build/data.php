<?php
require_once('../vendor/autoload.php');

//  Allows us to communicate with this PHP script from our front-end application
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//  Establish a connection to database
$db = new DatabaseConnection();

//  Determine the type of incoming request
switch($_SERVER["REQUEST_METHOD"]) {

  case "PUT": //  Request: Update a row

    //  Get parameters posted to this script
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
    $column = filter_input(INPUT_POST, 'column', FILTER_SANITIZE_ENCODED);
    $value = filter_input(INPUT_POST, 'value', FILTER_SANITIZE_ENCODED);
    
    //  Use DatabaseConnection to make the update
    $db->update($id, $column, $value);

    break;
  
  case "DELETE": //  Request: Delete a row

    //  Get parameters posted to this script
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

    //  Use DatabaseConnection to delete the row
    $db->delete($id);

    break;

  case "POST": //  Request: Insert a row

    //  Get parameters posted to this script
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_ENCODED);
    $amazingLevel = filter_input(INPUT_POST, 'amazing_level', FILTER_VALIDATE_INT);
    $country = filter_input(INPUT_POST, 'country', FILTER_SANITIZE_ENCODED);

    //  Use DatabaseConnection to create the row
    $db->create($name, $amazingLevel, $country);

    break;

  case "GET": //  Request: Get a row

    //  Get parameters posted to this script
    $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

    //  Use DatabaseConnection to get the row
    $db->get($id);

    break;
}

$dbc = new DatabaseConnection();

$record = $dbc->get(1);


//  -------------------------------------------------------------------------
//
//  HandleRequest: 
//  Provides a way return results to front-end application from database. 
//
//  Usage:
//  return HandleRequest::parse($data);
//
//  -------------------------------------------------------------------------

class HandleRequest {
  public static function parse($data) {
    try {
      $result = [
        'status' => 'OK',
        'data' => $data
      ];
    } catch(Exception $exception) {
      $result = [
        'status' => 'ERROR',
        'data' => null
      ];
    }
    
    return json_encode($result);
  }
}

//  -------------------------------------------------------------------------
//
//  DatabaseConnection: 
//  Provides a way to create, update, delete rows in a table called 'records'. 
//
//  Usage:
//  $db = new DatabaseConnection();
//
//  Getting a row: 
//  $db->get(1); 
//
//  Getting all rows:
//  $db->all();
//
//  Deleting a row:
//  $db->delete(1);
//
//  Creating a row:
//  $db->create("Kylie Minogue", 10, "Australia");
//
//  Updating a row:
//  $db->update(1, "name", "2 Unlimited");
//
//  -------------------------------------------------------------------------

class DatabaseConnection {
  public $connection;

  function __construct() {
    
    $this->connect();

    if(!$this->test()) {
      $this->setup();
      return;
    }

    //  Prepare SQL statement for creating a row in the records table
    pg_prepare($this->getConnection(), "create_record", "INSERT INTO records (name, amazing_level, country) VALUES ($1, $2, $3) RETURNING id;");

    //  Prepare SQL statement for updating a row in the records table
    pg_prepare($this->getConnection(), "update_record", "UPDATE records SET `name` = $2, `amazing_level` = $3, `country` = $4 WHERE id = $1;");

    //  Prepare SQL statement for dropping a table called 'records'
    pg_prepare($this->getConnection(), "drop_records", "DROP TABLE records;");

    //  Prepare SQL statement for creating a table called 'records'
    pg_prepare($this->getConnection(), "create_table", "CREATE TABLE IF NOT EXISTS records (
      id SERIAL PRIMARY KEY,
      name CHARACTER VARYING(100),
      amazing_level INT,
      country CHARACTER VARYING(100)
    );");
  }
  
  //  Get a row from the records table
  public function get($id) {
    //  Get a specific row by 'id', return as an associative array
    $results = pg_query_params($this->getConnection(), "SELECT * FROM records WHERE id = $1 ORDER BY name LIMIT 1", array($id));
    $row = pg_fetch_assoc($results, 0);

    return $row;
  }

  //  Gets all rows from the records table
  public function all() {
    //  Get all rows, return them as an associative array
    $results = pg_query($this->getConnection(), "SELECT * FROM records ORDER BY name");
    $rows = pg_fetch_assoc($results);

    return $rows;
  }

  //  Creates a row in the records table
  public function create($name, $amazingLevel, $country) {
    try {
      //  Execute prepared statement
      $result = pg_execute($this->getConnection(), "create_record", array($name, $amazingLevel, $country));

      //  Return ID of created row
      return pg_fetch_array($result)[0];
    } catch(Exception $e) {
      return FALSE;
    }
  }

  //  Updates a row in the records table
  public function update($id, $name, $amazingLevel, $country) {
    try {
      //  Execute prepared statement
      pg_execute($this->getConnection(), "update_record", array($id, $name, $amazingLevel, $country));

      return TRUE;
    } catch(Exception $e) {
      return FALSE;
    }
  }

  //  Drops the records table
  public function drop() {
    try {
      //  Only try to run if the table exists
      if(!$this->test()) return;

      //  Execute prepared statement
      pg_execute($this->getConnection(), "drop_records", array());

      return TRUE;
    } catch(Exception $e) {
      return FALSE;
    }
  }

  //  Create table 'records'
  function createTable() {
    try {
      //  Execute prepared statement
      pg_execute($this->getConnection(), "create_table", array());

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

    $this->createTable();

    //  Create some fake records
    $this->create("Sugababes", 9, "England");
    $this->create("Kylie Minogue", 10, "Australia");
    $this->create("2 Unlimited", 8, "Germany");
    $this->create("Brooklyn Bounce", 7, "United States");
  }

}
