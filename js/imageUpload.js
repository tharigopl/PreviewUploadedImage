$(document).ready(function($) {
	$.extend( true, jQuery.fn, { 
		/** Create image preview box **/
		imagePreview: function( options ){			
			var defaults = {};
		if( options ){
			$.extend( true, defaults, options );
		}
		$.each( this, function(){
			var $this = $( this );
			$this.bind( 'change', function( evt ){
				if( $.browser.msie ){
					$('.image-preview-loaded').remove();
					$preview = $('.image-upload');
					$('.imgtab').css('padding-left','22px');
					$('.image-upload').css({
							filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+$( this ).val()+"', sizingMethod='scale')",
							width: 115,
							height: 115
						});
					}else{
						var files = evt.target.files; // FileList object
						// Loop through the FileList and render image files as thumbnails.
						for (var i = 0, f; f = files[i]; i++) {
							// Only process image files.
							if (!f.type.match('image.*')) {
								continue;
							}
							var reader = new FileReader();
							// Closure to capture the file information.
							reader.onload = (function(theFile) {
								return function(e) {
								// Render thumbnail.
								$('#imageURL').attr('src',e.target.result);			
								};
							})(f);
							// Read in the image file as a data URL.
							reader.readAsDataURL(f);
						}
					}
				});
			});
		}	
	});
	$( '#fileinput' ).imagePreview();
});