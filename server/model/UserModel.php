<?php
require_once __DIR__ . '/../Database.php';

class UserModel{
    private $pdo;

    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    public function createUser($username){
        $statement = $this->pdo->prepare("INSERT OR IGNORE INTO users (username) VALUES (:username)");
        $statement->execute(['username' => $username]);
    }

    public function getUser($username){
        $statement = $this->pdo->prepare();
        $statement->execute(['username' => $username]);

        return $statement->fetch(PDO::FETCH_ASSOC);
    }
}

?>