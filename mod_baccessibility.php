<?php
/**
 * B-Accessibility Module Entry Point
 * 
 * @package    Joomla
 * @subpackage Modules
 * @license    GNU/GPL, see LICENSE.php
 * mod_baccessibility is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
 
// No direct access
defined('_JEXEC') or die;

// Include the syndicate functions only once
require_once dirname(__FILE__) . '/helper.php';
 
$doc = JFactory::getDocument();
$modBaseUrl = Juri::base() . 'modules/mod_baccessibility';

$doc->addStyleSheet( $modBaseUrl . '/asset/css/style.css' );

if( $params->get('use_awesome') ) {
    $doc->addStyleSheet( $params['awesome_path'] );
}

//$doc->addScript( $modBaseUrl . '/asset/js/toolbar.js' );
$doc->addScript( $modBaseUrl . '/asset/js/baccessibility.jquery.js' );
$doc->addScript( $modBaseUrl . '/asset/js/grayscale.js' );

require JModuleHelper::getLayoutPath('mod_baccessibility');