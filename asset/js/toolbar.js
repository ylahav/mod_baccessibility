function createLocalStorage(name,value,days) {
    var expires;
    if (days) {
		expires = "";var expirationMS = days * 24 * 60 * 60 * 1000;
	} else {
        expires = "";
    }
    var record = {value: JSON.stringify(value), timestamp: new Date().getTime() + expirationMS}
	localStorage.setItem( name, JSON.stringify(record) );
}
function readLocalStorage(name) {
    var record;
	var nameEQ = name + "=";
    try {
        record = JSON.parse( localStorage.getItem( name ) );
    } catch( e ) {
        record = null;
    }
	if (record) {
        if (new Date().getTime() < record.timestamp) {
            if (record.value.length != 2) { /* 2 means two quotes */
                return nameEQ + record.value;
            }
        }
    }
	return null;
}
function eraseLocalStorage(name) {
	createLocalStorage(name,"",-1);
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
		
		var b_acc_dark = readLocalStorage('b-acc_dark');
		var b_acc_bright = readLocalStorage('b-acc_bright');
		var b_acc_grayscale = readLocalStorage('b-acc_grayscale');
		
		$( '.b-acc-dark-btn' ).click( function () {
			eraseLocalStorage('b-acc_bright');
			eraseLocalStorage('b-acc_grayscale');
			createLocalStorage('b-acc_dark','dark',1);
			
		 	$( 'body' )
		 		.removeClass( 'b-acc-bright' )
		 		.removeClass( 'b-acc-grayscale' )
		 		.addClass( 'b-acc-dark' );
		 	
		 	$( '.b-acc-contrast-reset' ).removeClass( 'b-acc-hide' );
		});
			
		$( '.b-acc-bright-btn' ).click( function () {
			eraseLocalStorage( 'b-acc_dark' );
			eraseLocalStorage( 'b-acc_grayscale' );
			createLocalStorage('b-acc_bright','bright',1);
			
			$( 'body' )
				.removeClass( 'b-acc-dark' )
				.removeClass( 'b-acc-grayscale' )
				.addClass( 'b-acc-bright' );
				
			$( '.b-acc-contrast-reset' ).removeClass( 'b-acc-hide' );
		});
		
		$( '.b-acc-grayscale' ).click( function () {
			eraseLocalStorage( 'b-acc_dark' );
			eraseLocalStorage( 'b-acc_bright' );
			createLocalStorage('b-acc_grayscale','grayscale',1);
			
			$( 'body' )
				.removeClass( 'b-acc-dark' )
				.removeClass( 'b-acc-bright' )
				.addClass("b-acc-grayscale");
				
			$('.b-acc-contrast-reset').removeClass('b-acc-hide');
			
		});
		
		$( '.b-acc-contrast-reset' ).click( function () {
			eraseLocalStorage( 'b-acc_dark' );
			eraseLocalStorage( 'b-acc_bright' );
			eraseLocalStorage( 'b-acc_grayscale' );
			
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