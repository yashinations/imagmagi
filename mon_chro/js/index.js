var colors_chosen = 0;
function split_class_string(classes_string){
	var class_array = classes_string.split(" ");
	return class_array;
}
function search_class_array(class_array,find){
	for (classname_iterator in class_array){
		if (class_array[classname_iterator].indexOf(find.trim()) > -1){
			return class_array[classname_iterator];
		}
	}
}
function get_b64_promise(file) {
  return new Promise((resolve, reject) => {
    
  });
}
function fileToImage(file){
	const reader = new FileReader();
    reader.readAsDataURL(file);	
	reader.onload = function(event){
		var image_object = new Image();
		image_object.onload = function(){filter_photo(image_object);};		
		image_object.src = event.target.result;
	}
}
function toggle_color_menu(color_menu, choice_made){
	color_menu.toggle();
	choice_made.toggle();
}/*
function update_photo_submit_display(){			
	if(colors_chosen == 2){
		$(".upload_photo").removeClass("invisible");
	}
	else if (!$(".upload_photo").hasClass("invisible")){
		$(".upload_photo").addClass("invisible");
	}
}*/
function validate_file(input){
	if (input == null || input == undefined)
	{
		return false;
	}
	return ((input.get(0).files ? input.get(0).files.length : 1) > 0);
}
function validate_extenstion(label){
	//var extension = 
	if(label.substr(label.length - 4) == ".jpg" 
		|| label.substr(label.length - 4) == ".png" 
		|| label.substr(label.length - 4) == ".bmp" 
		|| label.substr(label.length - 5) == ".jpeg"){
		return true;
	}	
	else{
		$(".loading_overlay").hide();
		$(".file-extension").fadeTo(2000, 500).slideUp(500, function(){			
			$(".file-extension").slideUp(500);
		});
		return false;
	}
}
function get_aspect_ratio(length1, length2){
	var aspect_ratio = length2 / length1;
	if (length1 < length2){
		aspect_ratio = length1 / length2;
	}
	return aspect_ratio;
}
function get_image_canvas(image_object){		
	var canvas = $('<canvas></canvas>')[0];	
	var aspect_ratio = get_aspect_ratio(image_object.width,image_object.height);
	var image_max_size = window.innerWidth - (window.innerWidth / 100);
	var aspect_ratio = get_aspect_ratio(image_object.width,image_object.height);	
	var width = (image_max_size * aspect_ratio);
	var height = image_max_size;	
	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		isMobile = true;
	}	
	if(isMobile){
		image_max_size = window.visualViewport.width - (window.visualViewport.width / 100);
		width = (image_max_size * aspect_ratio);
		height = image_max_size;	
	}
	canvas.width = width;
	canvas.height = height;	
	return canvas;
}
function filter_photo(image_object){
	var canvas = get_image_canvas(image_object);
	var context = canvas.getContext('2d');
	context.drawImage(image_object,0,0,canvas.width,canvas.height);
	var image_data = context.getImageData(0,0,canvas.width,canvas.height)
	var data = image_data.data;
	var hot_color = $(".color_choice." + get_color_from_classes($(".hot_color_containter")))
	var mid_hot_red = $(hot_color).data("hot-color-red");
	var mid_hot_green = $(hot_color).data("hot-color-green");
	var mid_hot_blue = $(hot_color).data("hot-color-blue");
	var base_hot_red = parseInt(mid_hot_red * .25);
	var base_hot_green = parseInt(mid_hot_green * .25);
	var base_hot_blue = parseInt(mid_hot_blue * .25);
	var low_hot_red = parseInt(mid_hot_red * .75);
	var low_hot_green = parseInt(mid_hot_green * .75);
	var low_hot_blue = parseInt(mid_hot_blue * .75);
	var high_hot_red = (mid_hot_red * 1.25 >= 255 ? 255 : parseInt(mid_hot_red * 1.25));
	var high_hot_green = (mid_hot_green * 1.25 >= 255 ? 255 : parseInt(mid_hot_green * 1.25));
	var high_hot_blue = (mid_hot_blue * 1.25 >= 255 ? 255 : parseInt(mid_hot_blue * 1.25));
	var color_threshhold_max = 0;
	for (var i = 0; i < data.length; i += 4){
		var red = data[i];
		var green = data[i + 1];
		var blue = data[i + 2];
		if(red > color_threshhold_max){
			color_threshhold_max = red;
		}
		if(green > color_threshhold_max){
			color_threshhold_max = green;
		}
		if(blue > color_threshhold_max){
			color_threshhold_max = blue;
		}
	}
	for (var i = 0; i < data.length; i += 4){
		var red = data[i];
		var green = data[i + 1];
		var blue = data[i + 2];
		if(red > parseInt(color_threshhold_max / 4) * 3 || green > parseInt(color_threshhold_max / 4) * 3 || blue > parseInt(color_threshhold_max / 4) * 3){
			data[i] = high_hot_red;
			data[i + 1] = high_hot_green;
			data[i + 2] = high_hot_blue
		}		
		else if(red > parseInt(color_threshhold_max / 2) || green > parseInt(color_threshhold_max / 2) || blue > parseInt(color_threshhold_max / 2)){
			data[i] = mid_hot_red;
			data[i + 1] = mid_hot_green;
			data[i + 2] = mid_hot_blue
		}
		else if(red > parseInt(color_threshhold_max / 4) || green > parseInt(color_threshhold_max / 4) || blue > parseInt(color_threshhold_max / 4)){
			data[i] = low_hot_red;
			data[i + 1] = low_hot_green;
			data[i + 2] = low_hot_blue
		} 
		else{
			data[i] = base_hot_red;
			data[i + 1] = base_hot_green;
			data[i + 2] = base_hot_blue
		}
	}
	context.putImageData(image_data, 0, 0);
	var watermark = "gentlep.us";
	context.fillStyle = "tan";
	context.font = "12px helvetica";
	var watermark_x = canvas.width - context.measureText(watermark).width - 15;
	var watermark_y = canvas.height - 5;
	context.fillText(watermark, watermark_x,watermark_y)	
	var filtered_image_data = canvas.toDataURL("image/jpeg");
	$(".display_filtered_photo").attr("src",filtered_image_data);
	$(".loading_overlay").hide();
	$(".step_1").hide();
	$(".step_2").show();
	if(window.innerWidth < window.innerHeight){
		$(".display_filtered_photo").css("height","auto");
		$(".display_filtered_photo").css("width","100%");
	}
}
function get_color_from_classes(clicked_element){
	var color_classes = $(clicked_element).attr('class');
	var color_class = search_class_array(split_class_string(color_classes),"pick_");
	return color_class;
}
$(document).ready(
	function(){		
		$(".color_choice").click(function(){
			var container = $(this).closest('div');
			var choice_made_div = $(container).find(".choice_made");
			var color_table = $(container).find('table');	
			toggle_color_menu(color_table,choice_made_div);	
			choice_made_div.addClass(get_color_from_classes(this));
			$("body").addClass("static_" + get_color_from_classes(this));
			colors_chosen++;
			$('#submit_photo').click();
		});
		$(".snapchat-icon").attr("transform","scale(" + (window.innerWidth < 800 ? (window.innerWidth / 800) : 1) + ")");
		$(".googleplus-icon").attr("transform","scale(" + (window.innerWidth < 800 ? (window.innerWidth / 800) : 1) + ")");
		$(".reddit-icon").attr("transform","scale(" + (window.innerWidth < 800 ? (window.innerWidth / 800) : 1) + ")");		
		$(".pinterest-icon").attr("transform","scale(" + (window.innerWidth < 800 ? (window.innerWidth / 800) : 1) + ")");
		$(".mail-icon").attr("transform","scale(" + (window.innerWidth < 800 ? (window.innerWidth / 800) : 1) + ")");
		$(".facebook-icon").attr("transform","scale(" + (window.innerWidth < 800 ? (window.innerWidth / 800) : 1) + ")");
		$(".twitter-icon").attr("transform","scale(" + (window.innerWidth < 800 ? (window.innerWidth / 800) : 1) + ")");
		$(".tumblr-icon").attr("transform","scale(" + (window.innerWidth < 800 ? (window.innerWidth / 800) : 1) + ")");		
		$(".instagram-icon").attr("transform","scale(" + (window.innerWidth < 800 ? (window.innerWidth / 800) : 1) + ")");
		$(".save-icon").attr("transform","scale(" + (window.innerWidth < 800 ? (window.innerWidth / 800) : 1) + ")");
	}
);
$(document).on('change', ':file', function() {
	$(".loading_overlay").show();
	var input = $(this);
	if(validate_file(input)){		
		var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		if(validate_extenstion(label)){
			var file = input.get(0).files[0];
			fileToImage(file);
		}
	}
});  
var theFile = document.getElementById('theFile');
function file_initialize()
{
	document.body.onfocus = checkIt;
	console.log('initializing');
}
	
function checkIt()
{
	if(theFile == null) {
		var container = $(".custom-container");
		var choice_made_div = $(container).find(".choice_made");
		var color_table = $(container).find('table');	
		toggle_color_menu(color_table,choice_made_div);	
	}
}		