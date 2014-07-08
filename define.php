<?

    // DEFINES =====================================================================
    // Override the DALF default page (usually default.html)
    defined("DALF_DEFAULT_PAGE") || define("DALF_DEFAULT_PAGE", "/index.html");

    // Turn on lite mode (e.g. disable higher-level DALF landing page features)
    defined("DALF_LITE") || define("DALF_LITE", true);

    // Turn off the dev database (for program testing that requires access to LIVE immediate data)
    defined("DALF_DISALLOW_DEVDB") || define("DALF_DISALLOW_DEVDB", true);

    // DALF auto-senses test and dev to use the devdb01.  This flag will also include staging
    defined("DALF_STAGING_USES_DEVDB") || define("DALF_STAGING_USES_DEVDB", true);
    
    // DALF honors current urls when processing referIDs (jump pages)
    defined("DALF_STICKY_JUMP_URL") || define("DALF_STICKY_JUMP_URL", true);

    // BOOTSTRAP =====================================================================

    // Natural/Default split test
    /*$programsinplay = array(
    	'webdefault_400',
    	'webdefault_401',
    );
    $selection = mt_rand(0, sizeof($programsinplay)-1);
    define("SUGGESTEDREFERID", $programsinplay[$selection]);
    */

    //  The core define file takes care of all the base visit tracking, database connections, etc.
    require_once("{$_SERVER['BaseIncludesPath']}/define_core.php") ;

    // Place any other global defines you need for this site here
    require_once("{$_SERVER['BaseIncludesPath']}/leads/class.%%COMPANYNAME%%lead.php");    
  
    require_once(BASE_INCLUDE_DIR . "debug.inc");
    
