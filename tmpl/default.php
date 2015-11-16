<?php 
// No direct access
defined('_JEXEC') or die; ?>

<nav id="b-acc-toolbarWrap" role="navigation" class="b-acc-hide <?php echo $params['toolbar_side']; ?>">
	<button tabindex="0" class="b-acc_hide_toolbar $params['toolbar_position']; b-acc-icon-<?php echo $params['icon_size']; ?>">
		<span>Accessibility</span>
	</button>
	
	<ul id="b-acc_toolbar" data-underlines="0">
        <?php if ($module->showtitle) : ?>
            <h3 tabindex="0"><?php echo $module->title; ?></h3>
        <?php endif; ?>
        <li id="b-acc-fontsizer" data-size-tags="<?php echo $params['fontsizer_tags']; ?>" data-size-jump="<?php echo $params['fontsizer_size']; ?>">
			<button class="small-letter" tabindex="0">Decrease font size</button>
			<button class="big-letter" tabindex="0">Increase font size</button>
			<button class="b-acc-font-reset b-acc-hide" tabindex="0">Default font sizes</button>
		</li>
		<li id="b-acc-contrast">
			<button class="b-acc-bright-btn" tabindex="0">Bright contrast</button>
			<button class="b-acc-dark-btn" tabindex="0">Dark contrast</button>
			<button class="b-acc-grayscale" tabindex="0">Grayscale</button>
			<button class="b-acc-contrast-reset b-acc-normal" tabindex="0">Reset contrast</button>
		</li>
		<li id="b-acc-keyboard-navigation">
			<button id="b-acc-keyboard" tabindex="0">Keyboard Navigation</button>
		</li>
		<li id="b-acc-links">
			<button class="b-acc-toggle-underline" tabindex="0">Toggle underline</button>
		</li>
	</ul>
</nav>
