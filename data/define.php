<?

    // DEFINES =====================================================================
    // Override the DALF default page (usually default.html)
    define("DALF_DEFAULT_PAGE", "/index.html");

    // Turn on lite mode (e.g. disable higher-level DALF landing page features)
    define("DALF_LITE", true);

    // Turn off the dev database (for program testing that requires access to LIVE immediate data)
    define("DALF_DISALLOW_DEVDB", true);

    // DALF auto-senses test and dev to use the devdb01.  This flag will also include staging
    define("DALF_STAGING_USES_DEVDB", true);
    
    // DALF honors current urls when processing referIDs (jump pages)
    define("DALF_STICKY_JUMP_URL", true);

    // BOOTSTRAP =====================================================================

    //  The core define file takes care of all the base visit tracking, database connections, etc.
    require_once("{$_SERVER['BaseIncludesPath']}/define_core.php") ;

    // Place any other global defines you need for this site here
    require_once("{$_SERVER['BaseIncludesPath']}/leads/class.homeinsurancelead.php");

    // Chat hour logic. All hours are in CST.
    $currentDay = date('w');
    $currentTime = DateTime::createFromFormat('H:i', date('H:i'));
    $showChat = false;
    $articulate_config_id = '53f747d64fc3dd8a544b932b';

    // Monday - Friday hours in military time (10 AM to 10 PM EST for this site)
    // Note: make sure to start 5 minutes earlier than opening hour so chats are waiting when agents come in. End one minute early.
    if($currentDay >= 1 && $currentDay <= 5) {
        $chatStartTime = DateTime::createFromFormat('H:i', '8:55');
        $chatEndTime = DateTime::createFromFormat('H:i', '17:59');

        // Check to see if it is during chat hours.
        if ($currentTime >= $chatStartTime && $currentTime <= $chatEndTime) {
            $showChat = true;
        } else {
            $showChat = false;
        }
    }

    if(isset($_GET['showChat'])) {
        $showChat = (bool)$_GET['showChat'];
    }

    if (isset($_GET['showProactive'])) {
        $overrideChatProactiveDelayTime = 1;
    }

    // Test overrides..
    if(isset($_GET['lp'])) {
        $_SESSION['Marketing']['AffiliateCode'] = $_GET['lp'];
    }

    if(isset($_GET['zip'])){
        $zip = (int) strip_tags($_GET['zip']);
    } elseif (isset($_SESSION['Hailo']['RedirectOriginalRequestURIParams']) && !isset($_SESSION['ProcessedParams'])){
        // These are coming from quote lab and we want to pre-populate the lead form

        //place the request
        $params = $_SESSION['Hailo']['RedirectOriginalRequestURIParams'];

        $zip = (int) $params['zip'];

        try {
            $ZipResult = DB_Common_Corporate_ZipCodes::fetch_one_default_cached($zip);
        } catch (Exception $e) {}

        if($ZipResult) {
            $_SESSION['Contact']['StreetAddress'] = strip_tags($params['address']);
            $_SESSION['Contact']['City'] = $ZipResult->City;
            $_SESSION['Contact']['State'] = $ZipResult->State;
            $_SESSION['Contact']['ZipCode'] = $ZipResult->ZipCode;
            $_SESSION['Contact']['FirstName'] = strip_tags($params['firstname']);
            $_SESSION['Contact']['LastName'] = strip_tags($params['lastname']);
            $_SESSION['Contact']['NumOfClaims'] = strip_tags($params['claims']);
        }
        //Make sure we only do this once so they can override it if they want
        $_SESSION['ProcessedParams'] = 1;
    }
    
  
    require_once(BASE_INCLUDE_DIR . "debug.inc");
    
