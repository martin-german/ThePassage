<?php
// Create db with PDO (PHP Data Object)
class Database{
    private static $pdo = null;
    
    public static function getConnection(){
        if(self::$pdo === null){
            try {
                //Use absolute path instead of relative to not get error
                //$pdo = new PDO('sqlite:mydb.sqlite');
            
                self::$pdo = new PDO('sqlite:' . __DIR__  . '/mydb.sqlite');
                self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                //echo "Database created/connected successfully!"; 
            } catch (PDOException $e) {
                die("Error: " . $e->getMessage());
            }
        }
        return self::$pdo;
    }
}
?>
