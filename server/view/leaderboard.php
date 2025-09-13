<?php
require_once __DIR__ . '/../model/LeaderBoardModel.php';
require_once __DIR__ . '/../Database.php';

$pdo = Database::getConnection();

$leaderboardModel = new LeaderBoardModel($pdo);
$result = $leaderboardModel->getLeaderboard();
if($result && $result->num_rows > 0){
echo "<table>
    <tr>
        <th>Rank</th>
        <th>Username</th>
        <th>Points</th>
        <th>Wins</th>
    </tr>";

while($row = $result->fetch(PDO::FETCH_ASSOC)){
    echo "<tr>
        <td>{$row['rank']}</td>
        <td>{$row['username']}</td>
        <td>{$row['points']}</td>
        <td>{$row['wins']}</td>
    </tr>";
}

echo "</table>";
} else {
    echo "0 results";
}
?>
