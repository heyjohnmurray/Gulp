<?
    /*
     * Inject meta html tags (robots, description, keyword, canonical, title). Robots and canonical will only
     * show up if we are not on a WordPress site.
     *
     * NOTE: this include is specifically for $metaRobots, $metaDescription, $metaKeywords, $canonicalURL, $headerTitle
     * 	     if you need to add additional meta, that would go in _header-meta-additional.php
     */
	%%META%%
?>