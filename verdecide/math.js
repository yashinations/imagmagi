class yash_math_override{
	pad_zeros = function(s,z){
		let zeros = z - s.length;
		if(zeros > 0){
			let zero_str = "0";
			for(let i = 1; i < zeros; i++){
				zero_str += "0"
			}
			return zero_str + s;
		}
		return s;
	}
	line_line = function(x1,y1,x2,y2,x3,y3,x4,y4) {
	  let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
	  let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
	  return (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1);
	}
}
let yash_math = new yash_math_override();