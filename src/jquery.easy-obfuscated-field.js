/*! Easy Obfuscated Field (c) Aaron Gustafson (@AaronGustafson). MIT License. https://github.com/easy-designs/jquery.easy-obfuscated-field.js */

/* Easy Obfuscated Field
 * 
 * To use the script, call the `easyObfuscatedField` method
 * on your jQuery collection:
 * 
 * 	$('input').easyObfuscatedField();
 * 
 **/
;(function($){
	
	var script_name = 'easyObfuscatedField',
		observing_key = script_name + '-observing',
		defaults = {
			visible_suffix: '-visible'
		};
	
	function prep_obfuscation( $field, opt )
	{
		var name	= $field.attr( 'name' ),
			$hide	= $field
						.clone()
						// normally I’d set the type to hidden,
						// but IE doesn’t like it
						.hide()
						.attr( 'name', name )
						.removeAttr( 'id' )
						.removeAttr( 'required' );

		// remove patterns (if set)
		// currently running this separately as IE10 is apparently
		// throwing an error with it chained on the above
		if ( $hide.is( '[pattern]' ) )
		{
			$hide.removeAttr( 'pattern' );
		}

		$field
			.attr( 'name', name + opt.visible_suffix )
			.after( $hide );
	}
	
	$.fn.easyObfuscatedField = function( config )
	{
		config = $.extend( defaults, config );
		
		var $this = $(this),
			selector = $this.selector,
			$body = $('body'),
			observing = $body.data( observing_key ) || [];
		
		// do the prep work for the obfuscator
		$this.each(function(){
		
			prep_obfuscation( $(this), config );
		
		});
		
		// only set up one observer per body
		if ( $.inArray( selector, observing ) > -1 )
		{
			return $this;
		}
		
		// make a note that we’ll be observing this new selector
		observing.push( selector );
		
		$body
			// focus returns the value of the unobfuscated field (if it exists)
			// it also preps the field if we did not catch it on DOM ready
			.on( 'focus', selector, function(){
				
				var $this	= $(this),
					name = $this.attr('name'),
					$hidden,
					val;
            
				if ( name.indexOf( config.visible_suffix ) < 0 )
				{
					prep_obfuscation( $this );
				}
            
				$hidden = $( 'input[name=' + name.replace( config.visible_suffix, '' ) + ']' );
            
				if ( $hidden.length &&
					 ( val = $hidden.val() ) != '' )
				{
					$this.val( val );
				}
            
			 })
			.on( 'blur', selector, function(){
            
				var $this	= $(this),
					val		= $this.val(),
					i;
            
				// update the hidden field
				$('input[name=' + $this.attr('name').replace( config.visible_suffix, '' ) + ']')
					.val(val);
            
				// obfuscate the visible field
				if ( val.length > 3 )
				{
					val	= val.split('');
					i	= val.length - 3;
					while ( i-- )
					{
						val[i] = '*';
					}
					$this.val(val.join(''));
				}
            
			 })
			.data( observing_key, observing );
		
		// now return
		return $this;
		
	};
	
}(jQuery));