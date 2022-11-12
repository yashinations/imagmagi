class application_singleton{
	constructor(){
		//pull canvas element from dom
		let canvas = document.getElementById("canvas");
		let context = canvas.getContext("2d");
		//pull file upload button
		let file_input_button = document.getElementById("file-input-button");
		//associate function when click occurs on upload
		file_input_button.addEventListener("click",this.file_input_click);
		//get file input element
		let file_input = document.getElementById("hidden-file-input");
		//for naming conventions we are iterating each file
		let count = 0;
		//pass scope into file function
		let that = this;
		file_input.addEventListener("change",function(){that.file_input_change(context,count++);});
	}
	file_input_click(){
		//trigger file input element when button clicked, so we can custom format upload button
		let file_input = document.getElementById("hidden-file-input");	
		file_input.click();
	}
	//trigger after upload adds new file
	file_input_change(context,count){
		//get file from input element
		let img_file = document.getElementById('hidden-file-input').files[0];	
		let file_name = img_file.name.toLowerCase();
		let file_name_array = file_name.split('.');
		if(file_name_array.length > 1){
			let extension = file_name_array[1];			
			if (['jpg','jpeg','bmp','png','gif'].indexOf(extension) < 0){
				this.change_prompt(3);
				return;
			}
			let reader = new FileReader();
			reader.readAsDataURL(img_file);
			//get scope
			let that = this;
			//once file read trigger 
			reader.onload = (function(evnt){that.image_file_load(evnt,context,count)});
		}
		else{
			this.change_prompt(2);
		}
	}
	//trigger when image file loaded vs image object intialled
	image_file_load(evt,context,count){
		if(evt.target.readyState == FileReader.DONE) {
			let img = new Image();
			img.src = evt.target.result;
			//get scope			
			let that = this;
			img.onload = (function(){that.image_data_load(img,context,count)});
		}
	}
	//trigger when image object intialled vs file loaded
	image_data_load(img,context,count){
		//center image
		let x = 0;
		let y = 0;
		if(img.width > img.height){
			let height = context.canvas.height * (img.height / img.width);
			y = (context.canvas.height - height) / 2;
			img.width = context.canvas.width;
			img.height = height;
		}
		else{				
			let width = context.canvas.width * (img.width / img.height);
			x = (context.canvas.width - width) / 2;
			img.width = width;
			img.height = context.canvas.height;
		}
		//get color data minus greenscreen
		let data = this.remove_green_data(img);	
		//clean canvas
		context.clearRect(0,0,context.canvas.width,context.canvas.height)
		//display on canvas
		context.putImageData(data,x,y);
		//get hidden anchor tag
		let image_download_anchor = document.getElementById("image-hidden-download");
		//store b64 data from canvas in anchor tag
		image_download_anchor.src = context.canvas.toDataURL()
		//get initially hidden download button
		let file_download_button = document.getElementById("file-download-button");
		//only display if hidden
		if (!count){
			//once download is displayed it stays
			file_download_button.style.display = "inline";			
			//get scope			
			let that = this;
			//only associate once
			file_download_button.addEventListener("click",(function(){that.file_download(that,count)}));	
		}
		//prompt download option
		this.change_prompt(1);							
	}
	//trigger for download button
	file_download(that,count){
		//get base 64 from uri
		let image_download_anchor = document.getElementById("image-hidden-download");
		let full_b64 = image_download_anchor.src;
		//get just b64 string, no mime type
		let b64_pair = full_b64.split(",");
		//edge case
		if(b64_pair.length > 1){			
			let pure_b64 = b64_pair[1];		
			let b_array = that.b64_to_ba(pure_b64)
			//concat itorator with file name
			let file_name = "aylabs_verdecide" + count + ".png";
			that.download_blob("image/png",file_name,b_array);
		}
		else{
			that.change_prompt(2)
		}
	}
	//remove green pixels
	remove_green_data(img){
		let data = get_image_data(img)
		let color_data = data.data;
		//set min max thresholds
		let green_min =110;
		let not_green_max = 110;
		//loop through pixels - rgba
		for(let i = 0; i < color_data.length; i += 4){
			let curr_pixel_data = new pixel(color_data[i],color_data[i+1], color_data[i+2],color_data[i+3]);
			//if within thresholds max alpha
		    if(curr_pixel_data.green > green_min && 
				curr_pixel_data.red < not_green_max &&
				curr_pixel_data.blue < not_green_max)
			  
			{
				color_data[i+3] = 0;
			}			
		}
		return data;
	}
	
	//download bit array as mime file
	download_blob(content_type, file_name, data) {
		var blob = new Blob(data, { type: content_type });
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(blob, file_name);
		}
		else {
			var elem = window.document.createElement('a');
			elem.href = window.URL.createObjectURL(blob);
			elem.download = file_name;
			document.body.appendChild(elem);
			elem.click();
			document.body.removeChild(elem);
		}
	}
	//get bit array from base 64 string
	b64_to_ba(b64_data, contentType)
	{
		let slice_size = 512;
		let byte_characters = atob(b64_data);
		let byte_arrays = [];	
	    for (let offset = 0; offset < byte_characters.length; offset += slice_size) {
			let slice = byte_characters.slice(offset, offset + slice_size);
			let byte_numbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
			  byte_numbers[i] = slice.charCodeAt(i);
			}
			let byte_array = new Uint8Array(byte_numbers);
			byte_arrays.push(byte_array);
		}
		return byte_arrays;
	}
	//update prompt element with instructions
	change_prompt(prompt_index){
		let prompts = ["upload greenscreen image","download image","an unexpected error has occured","please only upload image files"];
		let workflow_prompt = document.getElementById("workflow-prompt");
		workflow_prompt.innerHTML = prompts[prompt_index];		
	}
}
//contain stack and heap
let application;
function initialize(){
	application	= new application_singleton();
}