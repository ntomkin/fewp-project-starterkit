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
    return $results;
  }

  function setup() {
    //  Creates record table
    pg_execute($this->getConnection(), 'CREATE TABLE IF NOT EXISTS records (
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


# This function reads your DATABASE_URL config var and returns a connection
# string suitable for pg_connect. Put this in your app.
// function pg_connection_string_from_database_url() {
//   extract(parse_url($_ENV["DATABASE_URL"]));
//   return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
// }

# Here we establish the connection. Yes, that's all.
// $pg_conn = pg_connect(pg_connection_string_from_database_url());

# Now let's use the connection for something silly just to prove it works:
// $result = pg_query($pg_conn, "SELECT relname FROM pg_stat_user_tables WHERE schemaname='public'");

// print "<pre>\n";
// if (!pg_num_rows($result)) {
//       print("Your connection is working, but your database is empty.\nFret not. This is expected for new apps.\n");
// } else {
//   print "Tables in your database:\n";
//   while ($row = pg_fetch_row($result)) { print("- $row[0]\n"); }
// }
// print "\n";
?>