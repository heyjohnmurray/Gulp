<?

function load_csv($file) {
	$fd = fopen($file, 'r');
	$data = array();

	$headers = fgetcsv($fd);
	$headerCount = count($headers);

	while($row = fgetcsv($fd)) {
		$rowData = array();
		for($i = 0; $i < $headerCount; $i++) {
			$rowData[$headers[$i]] = $row[$i];
		}

		$data[] = $rowData;
	}

	fclose($fd);
	return $data;
}

$people = load_csv($argv[1]);

$skipTicketTypes = array(
	"Volunteers",
	"Sponsors"
);

$db = new PDO('mysql:host=localhost;dbname=BlendConf', 'root');
$stmt = $db->prepare("INSERT INTO Users(FirstName, LastName, Email) VALUES (:FirstName, :LastName, :Email)");

foreach($people as $person) {
	if (!in_array($person['Ticket'], $skipTicketTypes) &&
		$person['Ticket First Name'] &&
		$person['Ticket Last Name']) {

		echo $person['Ticket'] . ' ' .
			$person['Ticket First Name'] . " " .
			$person['Ticket Last Name'] .
			$person['Ticket Email'] .
			"\n";

		$stmt->execute(array(
			":FirstName" => $person['Ticket First Name'],
			":LastName"  => $person['Ticket Last Name'],
			":Email"     => $person['Ticket Email']));
	}
}
