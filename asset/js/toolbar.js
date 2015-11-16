function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}

/**
 * Close toolbar when user scrolls
 **/
jQuery(window).scroll(function(e) {
	if( !jQuery("#b-acc-toolbarWrap").hasClass('close-toolbar'))
		jQuery("#b-acc-toolbarWrap").toggleClass("close-toolbar"); 
}); 
	
jQuery(document).ready(function($){
    var ajaxUrl = 'index.php?option=com_ajax&module=baccessibility&format=json&method=get';
	var data = {
		action: 'b_acc_toolbar_ajax',
	    // security : acptAjax.security,
	};
	$.post(ajaxUrl, data, function(response) {
		$("body").prepend(response);
        // alert ( response.data );
		
		/**
		 * Keyboard navigation
		 **/
		$("#b-acc-keyboard").click(function() {
			$("a, button").not("#b-acc-toolbarWrap button, #b-acc-toolbarWrap a").first().focus();
			$("#b-acc-toolbarWrap").addClass("close-toolbar");
		});
		/**
		 * font sizer
		 **/
		
		var customtags = jQuery('#b-acc-fontsizer').attr('data-size-tags');
		var customjump = parseInt($('#b-acc-fontsizer').attr('data-size-jump'));
		
		//increase
		
		$("#b-acc-fontsizer button.big-letter").click(function() {
			$( customtags ).each(function () {
				var fontsize;
				fontsize = parseInt($(this).css('font-size'));
				$(this).css({ 'font-size': (fontsize + customjump) + 'px' });
	     	});
	     	$(".b-acc-font-reset").removeClass('b-acc-hide');
	 	});
	 	
	 	// decrease
	 	
	 	$("#b-acc-fontsizer button.small-letter").click(function () {
	 		$( customtags ).each(function () {
	 			var fontsize;
	 			fontsize = parseInt($(this).css('font-size'));
	 			$(this).css({ 'font-size': (fontsize - customjump) + 'px' });
	     	});
	     	$(".b-acc-font-reset").removeClass('b-acc-hide');
		});
		
		// reset to default
		
		$(".b-acc-font-reset").click(function() {
	 		$( customtags ).each(function () {
	 			var fontsize;
	 			fontsize = parseInt($(this).css('font-size'));
	 			$(this).attr("style","");
	 				
	     	});
	     	// hide reset button after pressing
	     	$(".b-acc-font-reset").addClass('b-acc-hide');
		});
			
		$(".b-acc_hide_toolbar").click(function(event){
			
			$("#b-acc-toolbarWrap").toggleClass("close-toolbar");
			
			if($("#b-acc-toolbarWrap").hasClass('close-toolbar')){
				$("#b-acc-toolbarWrap a, #b-acc-toolbarWrap button, #b-acc-toolbarWrap h3").attr('tabindex', '-1');
			}
			else {
				$("#b-acc-toolbarWrap a, #b-acc-toolbarWrap button, #b-acc-toolbarWrap h3").attr('tabindex', '0');
			}
			
		});
		
		/**
		 * contrast
		 **/
		
		var b_acc_dark = readCookie('b-acc_dark');
		var b_acc_bright = readCookie('b-acc_bright');
		var b_acc_grayscale = readCookie('b-acc_grayscale');
		
		$( '.b-acc-dark-btn' ).click( function () {
			eraseCookie('b-acc_bright');
			eraseCookie('b-acc_grayscale');
			createCookie('b-acc_dark','dark',1);
			
		 	$( 'body' )
		 		.removeClass( 'b-acc-bright' )
		 		.removeClass( 'b-acc-grayscale' )
		 		.addClass( 'b-acc-dark' );
		 	
		 	$( '.b-acc-contrast-reset' ).removeClass( 'b-acc-hide' );
		});
			
		$( '.b-acc-bright-btn' ).click( function () {
			eraseCookie( 'b-acc_dark' );
			eraseCookie( 'b-acc_grayscale' );
			createCookie('b-acc_bright','bright',1);
			
			$( 'body' )
				.removeClass( 'b-acc-dark' )
				.removeClass( 'b-acc-grayscale' )
				.addClass( 'b-acc-bright' );
				
			$( '.b-acc-contrast-reset' ).removeClass( 'b-acc-hide' );
		});
		
		$( '.b-acc-grayscale' ).click( function () {
			eraseCookie( 'b-acc_dark' );
			eraseCookie( 'b-acc_bright' );
			createCookie('b-acc_grayscale','grayscale',1);
			
			$( 'body' )
				.removeClass( 'b-acc-dark' )
				.removeClass( 'b-acc-bright' )
				.addClass("b-acc-grayscale");
				
			$('.b-acc-contrast-reset').removeClass('b-acc-hide');
			
		});
		
		$( '.b-acc-contrast-reset' ).click( function () {
			eraseCookie( 'b-acc_dark' );
			eraseCookie( 'b-acc_bright' );
			eraseCookie( 'b-acc_grayscale' );
			
			$(this).addClass( 'b-acc-hide' );
			
			$( 'body' )
				.removeClass( 'b-acc-dark' )
				.removeClass( 'b-acc-bright' )
				.removeClass( 'b-acc-grayscale' );
		});
		
		if ( b_acc_dark ) {
			$( 'body' )
				.removeClass( 'b-acc-bright' )
				.removeClass( 'b-acc-grayscale' )
				.addClass( 'b-acc-dark' );
				
			$( '.b-acc-contrast-reset' ).removeClass( 'b-acc-hide' );
		}
		
		if( b_acc_bright ) {
			$( 'body' )
				.removeClass( 'b-acc-dark' )
				.removeClass( 'b-acc-grayscale' )
				.addClass( 'b-acc-bright' );
				
			$( '.b-acc-contrast-reset' ).removeClass( 'b-acc-hide' );
		}
		
		if( b_acc_grayscale ) {
			$( 'body' )
				.removeClass( 'b-acc-dark' )
				.removeClass( 'b-acc-bright' )
				.addClass( 'b-acc-grayscale' );
				
			$( '.b-acc-contrast-reset' ).removeClass( 'b-acc-hide' );
		}
		
		/**
		 * Links
		 **/
		 
		// add underline
		
		var underlines = $('#b-acc_toolbar').attr('data-underlines');
		if( underlines == 1 ) {
			$("a").css('text-decoration', 'underline');
		}
		
		// toggle underline
		
		$(".b-acc-toggle-underline").toggle(function () {
		    $('a').css('text-decoration', 'underline');
		}, function() {
			$('a').css('text-decoration', 'none');
		});
	});
});