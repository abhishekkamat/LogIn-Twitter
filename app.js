var auth_nonce_list=[];
var acquiredText;

//Fetching Data from txt file(Substitute of fetching data from backend)
fetch('Keys.txt')
.then(response=>response.text())
.then(text=>saveData(text));


var appID="lMLWp1bPGFR07c684PHjDzqEO";


function myFunction(){
  let auth_nonce1=generateAuth_Nonce();
  authnonce=auth_nonce1[1];


  //separate all codes received from txt files, and save them in separate variables
  codes=acquiredText.split(" ");
  console.log(codes);
  API_key=codes[1];
  Key_secret=codes[3];
  bearer_token=codes[5];
  console.log(API_key);
  console.log(Key_secret);
  console.log(bearer_token);


  timeStamp=Math.floor(Date.now()/1000);
  console.log("TimeStamp:"+timeStamp); 
  let url="https://api.twitter.com/oauth/request_token?oauth_callback=https:https%3A%2F%2Fabhishekkamat.github.io%2FLogIn-Twitter%2Fredirect.html";
  console.log(url);
  
  //Creating and sending a POST request to the url
  let xhr = new XMLHttpRequest();
  xhr.open("POST",url);
  xhr.setRequestHeader("Access-Control-Allow-Origin","https://abhishekkamat.github.io/LogIn-Twitter/");
  xhr.setRequestHeader("Access-Control-Allow-Methods","POST,GET,OPTIONS,DELETE,PUT");
  xhr.setRequestHeader("Access-Control-Allow-Headers","Authorization");
  xhr.setRequestHeader("Authorization", "OAuth oauth_consumer_key="+API_key+", oauth_nonce="+authnonce+", oauth_signature=oauth_signature, oauth_signature_method=HMAC-SHA1, oauth_timestamp="+timeStamp+", oauth_version=1.0");
  

  
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.responseText);
    }};


  }

async function saveData(text){
  acquiredText=text;
  return acquiredText;
  
}

function generateAuth_Nonce(){
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var result = ""
  var charactersLength = characters. length;

  //Generating a random 6 digit alphanumeric string
  for ( var i = 0; i < 6 ; i++ ) {
  result += characters. charAt(Math. floor(Math. random() * charactersLength));
  }

  //Checking whether the created string already exists
  authnonce_index=(check_Unique(result,auth_nonce_list))-1;
  auth_nonce=auth_nonce_list[authnonce_index];
  var arr=[];
  arr.push(authnonce_index);
  arr.push(auth_nonce);


  return arr;
}

function check_Unique(element, auth_nonce_list){
  if(auth_nonce_list.indexOf(element)==-1){
    auth_nonce_list.push(element);
    return auth_nonce_list.length;
  }
  else{
    generateAuth_Nonce();
  }
}

