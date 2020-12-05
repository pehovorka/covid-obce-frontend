<?php 

/**
 *
 * Get corresponding municipality name from DB
 * 
 * @param mixed $targetUrl Find record by target url
 *
 */
function getMunicipalityNameFromDB($municipalityCode)
{

    if (is_numeric($municipalityCode)){
    try {
        $pdo = new PDO('sqlite:.obec_kod_nazev.db');
        $stmt = $pdo->prepare('SELECT obec_nazev FROM obec_kod_nazev WHERE obec_kod = :obec_kod');
        $stmt->execute(array('obec_kod' => $municipalityCode));

        $result = $stmt->fetch();

        if ($result[0] !== null) {
            return $result[0];
        } else {
            return false;
        }
    } catch (PDOException $e) {
        //echo 'ERROR: ' . $e->getMessage();
        return false;
    }
}
return false;
}

function isSharePage(){
    $uri = $_SERVER["REQUEST_URI"];
    if (substr( $uri, 0, 6 ) === "/obec/"){
        return true;
    }
    return false;
}

function getTitle() {
    if (isSharePage()){
        $uri = $_SERVER["REQUEST_URI"];
        $municipalityCode = substr( $uri, 6, 12 );
        $municipalityName = getMunicipalityNameFromDB($municipalityCode);
        if ($municipalityName){
            return $municipalityName. " - COVID v obcích";
        }
        return "COVID v obcích";
    }
    return "COVID v obcích";
  }

ob_start(); // Start output buffering
include "index.html";
$replacementString = ob_get_clean(); // Store output in variable, and stop output-buffering
echo str_replace("___TITLE___", getTitle(), $replacementString);


?>