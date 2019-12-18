// Bonus script til en cookie counter

cookieName = "Counter";
function doCookie() {

  var today = new Date()
  var expires = new Date()
  // Gældende for 1 år
  expires.setTime(today.getTime() + 24*365*3600000)

  if (document.cookie) {
     index = document.cookie.indexOf(cookieName);
     } 
   else { 
     index = -1;
     }
  if (index == -1) {
     document.cookie=cookieName+"=1; " + 
           " expires=" + expires.toGMTString() ;
     } 
  else {
     countbegin = (document.cookie.indexOf("=", index) + 1);
     countend = document.cookie.indexOf(";", index);
     if (countend == -1) {
        countend = document.cookie.length;
        }
     count = eval(document.cookie.substring(countbegin, countend)) + 1;
     document.cookie=cookieName+"="+count+"; " +
           " expires=" + expires.toGMTString();

     }
  }

function getTimes() {
  count=0;
  if(document.cookie) {
    index = document.cookie.indexOf(cookieName);
    if (index != -1) {
       countbegin = (document.cookie.indexOf("=", index) + 1);
       countend = document.cookie.indexOf(";", index);
       if (countend == -1) {
          countend = document.cookie.length;
          }
       count = document.cookie.substring(countbegin, countend);
       }
    }
  return(count);
  }


  // Udkommentér disse, for at få det vist på siden

/* document.write("You have accessed this page <b>"+getTimes()+"</b> times.");

if (getTimes()==0) {
   document.write("Welcome! This is your first time here");
   }  */