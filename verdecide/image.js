//custom functions for image and pixel data
function get_image_data(src_img){
	let temp_canvas = document.createElement('canvas');
	let temp_ctx = temp_canvas.getContext('2d');
	temp_canvas.width = src_img.width;
	temp_canvas.height = src_img.height;
	temp_ctx.drawImage(src_img,0,0,src_img.width,src_img.height);
	return temp_ctx.getImageData(0,0,src_img.width,src_img.height);
}
function get_pixel_color (p){
	let red_hex = (p.red).toString(16);
	let green_hex = (p.green).toString(16);
	let blue_hex = (p.blue).toString(16);
	let result = "#";
	result += yash_math.pad_zeros(red_hex,2);
	result += yash_math.pad_zeros(green_hex,2);
	result += yash_math.pad_zeros(blue_hex,2);
	return result;
}