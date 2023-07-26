// Get the input element and image preview element
const fileInput = document.getElementById('file-input');
const preview = document.getElementById('imagePreview');
const avatar  = document.querySelector('#avatar');
const getSchool = document.getElementById('school');
const displaySchool = document.getElementById('displaySchool');
const getTrack = document.getElementById('track');
const displayTrack = document.getElementById('displayTrack');
const altSchoolID = document.getElementById('altSchoolID');
const altName = document.getElementById('altName');


const idCard = document.getElementById("idcard");
const downloadBtn = document.getElementById("downloadBtn");

const msgElement = document.getElementById('msg');
const jpgformat = document.getElementById('jpg-format');
const pngformat = document.getElementById('png-format');


const schools = {
  'engineering':['Frontend Engineering', 'Backend Engineering', 'Cloud Engineering'],
  'product': ['Product Design', 'Product Management', 'Product Marketing'],
  'data': ['Data Analytics', 'Data Science', 'Data Engineering'],
}

const { engineering, product, data } = schools;

const engineeringValues = Object.values(engineering);
const productValues = Object.values(product);
const dataValues = Object.values(data);

const format = '';



//preview image function
const previewImageFn = (e) => {
  const file = e.target.files[0];

  // Check if the file is an image
  if (file && file.type.startsWith('image/')) {
    // Create a FileReader object
    const reader = new FileReader();

    // Set the FileReader callback function
    reader.onload = function(e) {
      console.log(e);
      // Update the source of the image preview
      avatar.style.display = 'none';
      preview.style.display = 'block';
      preview.src = e.target.result;
    }

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
}

// Add an event listener to the input element
fileInput.addEventListener('change', previewImageFn);



function createOptionElement(params) {
  if(Array.isArray(params)){
    params.forEach(value => {
      const optionElement = document.createElement('option');
      if(!checkIfOptionExit(value)){
        optionElement.textContent = value;
        optionElement.value = value;
        getTrack.appendChild(optionElement);
      }
    });
  }
}


function checkIfOptionExit(optionValue) {
  const itemToMatch = optionValue;

  let matchFound = false;

  for (let i = 0; i < getTrack.options.length; i++) {
    const option = getTrack.options[i];
    
    if (option.value === itemToMatch) {
        matchFound = true;
        break;
    }
  }

  return matchFound;

}

const removeOptionElment = () => {
  selectedOption = document.getElementById('defaultTrack');
  for (let i = getTrack.options.length - 1; i >= 0; i--) {
    const option = getTrack.options[i];
    if(option.value !== selectedOption.value){
      getTrack.removeChild(option);

    }
  }
}

/**
 * 
 * choose school function: this function 
 * this function removes existing option value
 * and create a new one for based on the type of school selected
 */


const chooseSchool = (e)=>{

  getTrack.disabled = false;
  
  switch (getSchool.value) {
    case 'Engineering':
      removeOptionElment();
      createOptionElement(engineeringValues);
      break;
    case 'Product':
      removeOptionElment();
      createOptionElement(productValues);
      break;
    case 'Data':
      removeOptionElment();
        createOptionElement(dataValues);
     break;
  }

}

//call the chooseSchool function when a change event is triggered
getSchool.addEventListener('change', chooseSchool);

function getIdCardValidDuration(startMonth=null, startYear=null) {
  currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  let nextYear, month;
  if(startMonth == null){
    startMonth = currentDate.getMonth();
  }
  if(startYear == null){
      startYear = currentDate.getFullYear();
  }

  if (currentMonth >= startMonth) { // April starts at index 0
    nextYear = currentYear + 1;
   
  } else {
    nextYear = currentYear;
  }

  month = formatMonths(startMonth);

  let displayDate =  month+' '+ nextYear;
  document.querySelector('.date').innerHTML = displayDate;
  
}

const formatMonths = (monthNumber) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let currentMonth = months[monthNumber];
  return currentMonth;
}
// js months starts from the 0 index there for january = 0 and april = 3;
getIdCardValidDuration(3, 2023);

function saveCardData() {
    alert('Are sure about this');
    displaySchool.innerHTML =  getSchool.value;
    displayTrack.innerHTML =  getTrack.value;
    getSchool.style.display = 'none';
    getTrack.style.display = 'none';
    displaySchool.style.display = 'block';
    displayTrack.style.display = 'block';

    altName.removeAttribute("contenteditable");
    altSchoolID.removeAttribute("contenteditable");
}


function checkIfFormatIsSelected() {
  let msg = 'ID card details is saved, click the download button to grab your ALTSCHOOL Identity Card';
 
    let def;
    if(jpgformat.checked){
      def = jpgformat.value;
    }else if(pngformat.checked){
      def = pngformat.value;
    }


  if(def === '' || def === undefined || def === null){
    msgElement.style.display = 'block';
    msgElement.innerText = 'Please select a format';
    msgElement.style.color = 'red';
    return false;   
  }else{
    msgElement.style.display = 'block';
    msgElement.innerHTML = msg;
    msgElement.style.color = 'black';
    return true
  }

 
}

function downloadIdCard(){
  saveCardData();
  if(checkIfFormatIsSelected()){
    let imgType,ext;
    let checkedFormat = document.querySelector('input[name="format"]:checked');

    switch (checkedFormat.value) {
      case 'png':
        downloadAsPNG();
        break;
      case 'jpeg':
        downloadAsJpeg();
        break;
    }

    // if(checkedFormat.value == 'png'){
    //   domtoimage.toBlob(idCard)
    //   .then(function (blob) {
    //       window.saveAs(blob, 'altschool-ID-Card.png');
    //   });
    // }else if(checkedFormat.value == 'jpeg'){
    //   domtoimage.toJpeg(idCard, { quality: 0.95 })
    //   .then(function (dataUrl) {
    //       var link = document.createElement('a');
    //       link.download = 'altschool-ID-Card.jpeg';
    //       link.href = dataUrl;
    //       link.click();
    //   });
    // }
    
   
   
  }
  
}

function downloadAsPNG(){
  domtoimage.toPng(idCard, {
    width: idCard.clientWidth * 2,
    height: idCard.clientHeight * 2,
    style: { transform: 'scale('+2+')', transformOrigin: 'top left'}
  })
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = 'altschool-ID-Card.png';
    link.href = dataUrl;
    link.click();
  })
  .catch(function (error) {
      console.error('oops, something went wrong!', error);
  });
}

function downloadAsJpeg(){
  console.log(domtoimage);
  console.log(idCard);

  debugger

  domtoimage.toJpeg(idCard, { 
    width: idCard.clientWidth * 2,
    height: idCard.clientHeight * 2,
    style: { transform: 'scale('+2+')', transformOrigin: 'top left'}
  })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-altschool-ID-Card.jpeg';
        link.href = dataUrl;
        link.click();
    });

}







