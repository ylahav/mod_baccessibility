// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function ($, window, document, undefined) {

    "use strict";

    // Create the defaults once
    var pluginName = "baccessibility",
            defaults = {
                //propertyName: "value",
                //links underline
                lu_elm:".b-acc-toggle-underline",
                lu_tags: "a",
                //contrast
                ct_dark_elm: ".b-acc-dark-btn",
                ct_bright_elm: ".b-acc-bright-btn",
                ct_grayscale_elm: ".b-acc-grayscale",
                ct_reset_elm: ".b-acc-contrast-reset",
                //toolbar
                tb_wrapper_elm: "#b-acc-toolbarWrap",
                tb_btn_elm: ".b-acc_hide_toolbar",
                //fontsizer
                fs_tags: "p,a,li,h1,h2,h3,h4",
                fs_size_jump: 2,
                fs_increase_elm: "#b-acc-fontsizer button.big-letter",
                fs_decrease_elm: "#b-acc-fontsizer button.small-letter",
                fs_reset_elm: ".b-acc-font-reset",
                

            };

    // plugin constructor
    function Plugin(element, options) {
        this.element = element;
        
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
        
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            
            //console.log("start init baccessesibility");

            this.initToolbar(this.settings);
            this.initFontSizer(this.settings);
            this.initContrast(this.settings);
            this.initLinksUnderline(this.settings);
                        
            //console.log("end init baccessesibility");
            
        },
                
        initToolbar: function (plg_settings){
            
            $(plg_settings.tb_btn_elm).click(function (event) {
                
                $(plg_settings.tb_wrapper_elm).toggleClass("close-toolbar");

                if ($(plg_settings.tb_wrapper_elm).hasClass('close-toolbar')) {
                    $(plg_settings.tb_wrapper_elm).children("a, button,h3").attr('tabindex', '-1');
                }
                else {
                    $(plg_settings.tb_wrapper_elm).children("a, button,h3").attr('tabindex', '0');
                }

            });
        },
        
        initLinksUnderline: function(plg_settings){
                        
            if( $(plg_settings.tb_wrapper_elm).attr('data-underlines') ) {
                $(plg_settings.lu_tags).css('text-decoration', 'underline');
            }

            // toggle underline

            $(plg_settings.lu_elm).toggle(function () {
                $(plg_settings.lu_tags).css('text-decoration', 'underline');
            }, function() {
                $(plg_settings.lu_tags).css('text-decoration', 'none');
            });
        },
        
        initContrast: function(plg_settings){
            
            var b_acc_dark =  localStorage.getItem('b-acc_dark');
            var b_acc_bright = localStorage.getItem('b-acc_bright');
            var b_acc_grayscale = localStorage.getItem('b-acc_grayscale');
            
            //dark mode
            $( plg_settings.ct_dark_elm ).click( function () {
                localStorage.removeItem('b-acc_bright');
                localStorage.removeItem('b-acc_grayscale');
                localStorage.setItem('b-acc_dark','dark',1);

                $( 'body' )
                    .removeClass( 'b-acc-bright b-acc-grayscale' )
                    .addClass( 'b-acc-dark' );

                $( plg_settings.ct_reset_elm ).removeClass( 'b-acc-hide' );
            });
            
            //bright mode
            $( plg_settings.ct_bright_elm ).click( this ,function () {
                localStorage.removeItem( 'b-acc_dark' );
                localStorage.removeItem( 'b-acc_grayscale' );
                localStorage.setItem('b-acc_bright','bright',1);

                $( 'body' )
                    .removeClass( 'b-acc-dark b-acc-grayscale' )
                    .addClass( 'b-acc-bright' );

                $( plg_settings.ct_reset_elm).removeClass( 'b-acc-hide' );
            });
            
            //grayscale
            $( plg_settings.ct_grayscale_elm ).click( function () {
                localStorage.removeItem( 'b-acc_dark' );
                localStorage.removeItem( 'b-acc_bright' );
                localStorage.setItem('b-acc_grayscale','grayscale',1);

                $( 'body' )
                        .removeClass( 'b-acc-dark b-acc-bright' )
                        .addClass("b-acc-grayscale");

                $( plg_settings.ct_reset_elm).removeClass('b-acc-hide');

            });
            
            //contrast reset
            $(plg_settings.ct_reset_elm ).click(this, function () {
            
                localStorage.removeItem( 'b-acc_dark' );
                localStorage.removeItem( 'b-acc_bright' );
                localStorage.removeItem( 'b-acc_grayscale' );

                $(plg_settings.ct_reset_elm).addClass( 'b-acc-hide' );

                $( 'body' ).removeClass( 'b-acc-dark b-acc-bright b-acc-grayscale' );
            });
            
            //initialize from localStorage
            if ( b_acc_dark ) {
                $( 'body' )
                    .removeClass( 'b-acc-bright b-acc-grayscale' )
                    .addClass( 'b-acc-dark' );

                $( plg_settings.ct_reset_elm ).removeClass( 'b-acc-hide' );
            }

            if( b_acc_bright ) {
                $( 'body' )
                    .removeClass( 'b-acc-dark b-acc-grayscale' )
                    .addClass( 'b-acc-bright' );

                $( plg_settings.ct_reset_elm ).removeClass( 'b-acc-hide' );
            }

            if( b_acc_grayscale ) {
                $( 'body' )
                    .removeClass( 'b-acc-dark b-acc-bright' )
                    .addClass( 'b-acc-grayscale' );

                $( plg_settings.ct_reset_elm ).removeClass( 'b-acc-hide' );
            }
            
        },
                
        initFontSizer: function (plg_settings) {
            
            //increase
            $(plg_settings.fs_increase_elm).click(function () {

                $(plg_settings.fs_tags).filter(function (index, elm) {

                    $(elm).css('font-size', function () {
                        return parseInt($(elm).css('font-size')) + plg_settings.fs_size_jump + 'px';
                    });
                });

                $(plg_settings.fs_reset_elm).removeClass('b-acc-hide');

            });

            // decrease
            $(plg_settings.fs_decrease_elm).click(function () {

                $(plg_settings.fs_tags).filter(function (index) {
                    $(this).css('font-size', function () {
                        return parseInt($(this).css('font-size')) - plg_settings.fs_size_jump + 'px';
                    });
                });

                $(plg_settings.fs_reset_elm).removeClass('b-acc-hide');

            });

            // reset to default
            $(plg_settings.fs_reset_elm).click(function () {

                $(plg_settings.fs_tags).filter(function (index) {
                    $(this).attr("style", "");
                });
                // hide reset button after pressing
                $(plg_settings.fs_reset_elm).addClass('b-acc-hide');

            });
        }
        
        
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);

//activate plugin after dom ready
jQuery(document).ready(function ($) {
    $(this).baccessibility();
});