// gather all cropzee dependencies and append on webpage
window.cropzeeReturnImage = [];
var dependencies =
      '<!-- canvas-toBlob.js -->'
    + '<script src="https://cdn.jsdelivr.net/gh/eligrey/canvas-toBlob.js@latest/canvas-toBlob.min.js" defer></script>'
    + '<!-- FileSaver.js -->'
    + '<script src="https://cdn.jsdelivr.net/gh/eligrey/FileSaver.js@latest/dist/FileSaver.min.js" defer></script>'
    + '<script src="/assets/js/croppie.js"></script>';
$("body").after(dependencies);
// used jQuery.fn.extend() method to provide new methods that can be chained to the jQuery() function
// in our case - $(element).cropzee()
var $uploadCrop;

		function readFile(input) {
 			if (input.files && input.files[0]) {
	            var reader = new FileReader();
	            
	            reader.onload = function (e) {
					$('.upload-demo').addClass('ready');
	            	$uploadCrop.croppie('bind', {
	            		url: e.target.result
	            	}).then(function(){
	            		console.log('jQuery bind complete');
	            	});
	            	
	            }
	            
	            reader.readAsDataURL(input.files[0]);
	        }
	        else {
		        swal("Sorry - you're browser doesn't support the FileReader API");
		    }
		}

		$uploadCrop = $('#upload-demo').croppie({
			viewport: {
				width: 200,
				height: 200,
				type: 'square'
            },
            boundary: {
                width: 300,
                height: 300
            },
			enableExif: true
		});

		$(document).on('change', '#profile-image-upload',function () { 
            readFile(this);
            setTimeout(function(){
                
                // the css-only modal is called via href see https://hunzaboy.github.io/Light-Modal/#
                //window.location = window.location.href + "#cropzee-modal";
                // function to trigger croppr.js on picture in modal
                $('#cropzee-modal').modal('show');
                
                //cropzeeTriggerCroppr();
                console.log('croppr triggered');
            }, 50);
        });
		$('.upload-result').on('click', function (ev) {
			$uploadCrop.croppie('result', {
				type: 'canvas',
				size: 'viewport'
			}).then(function (resp) {
                var img = '<img src="'+resp+'"/>';
                $("#preview-zone").html(img);
                $("#profile_image").val(resp);
                $('#cropzee-modal').modal('hide');
			});
		});

