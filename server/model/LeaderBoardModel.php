<?php
require_once __DIR__ . '/../Database.php';

class LeaderBoardModel{
    private $pdo;

    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    public function getLeaderboard(){
        $statement = $this->pdo->query("
            SELECT
                RANK() OVER (ORDER BY points DESC, wins DESC) AS rank,
                username,
                points,
                wins
            FROM users
            ORDER BY points DESC, wins DESC 
            ");
        return $statement->fetchAll(PDO::FETCH_ASSOC);    
    }
}

?>