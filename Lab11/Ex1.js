
attributes = "Shelah;22;22.5;-21.5";
theSeparator = ';';
parts = attributes.split(theSeparator);

// parts =['Shelah', 22, 22.5, -21.5];

//for (i = 0; i < parts.length; i++) {
  parts.forEach(fucntion (item,index) {
    console.log( (typeof item == 'string' && item.length > 0)?true:false )});
  
// }

function printIt(item, index) {
  console.log(`${item} isNonNegInt ${isNonNegInt(item,true)}` );
}
console.log(parts.join(theSeparator));


function isNonNegInt(q, return_errors = false) {
  errors = []; // assume no errors at first
  if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
  if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
  if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
  return return_errors ? errors : (errors.length == 0);
}

