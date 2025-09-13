<?php
require_once __DIR__ . '/../model/UserModel.php';
require_once __DIR__ . '/../model/LeaderBoardModel.php';
require_once __DIR__ . '/../Database.php';

class UserController{
    private $user;
    private $leaderboard;

    public function __construct(){
        $pdo = Database::getConnection();

        $this->user = new UserModel($pdo);
        $this->leaderboard = new LeaderBoardModel($pdo);
    }
    
    public function handleRequest(){
        session_start();

        if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
            $username = trim($_POST['username']);
            $_SESSION['username'] = $username;
            $this->user->createUser($username);
            header("Location: index.php");
            exit;
        }
        if(isset($_SESSION['username'])){
            $user = $this->user->getUser($_SESSION['username']);
            $leaderboard = $this->leaderboard->getLeaderboard();
            include __DIR__ . '/../view/form.php';
        } else include __DIR__ . '/../view/leaderboard.php';
    }

}
?>