// console.log("hello world");

function toggleContentDisplay(element_id) {

    var theElement = document.getElementById(element_id);
    if (theElement.style.display === "block") {
        theElement.style.display = "none";
    }

    else{
        theElement.style.display = "block";
    }
}

function showContentMenu() {

    document.getElementById("contentMenu").style.width = "200px";
    // document.getElementById("contentMenu").style.height = "200px";
   document.getElementById("menuIcon").style.width="0";

   //document.getElementById(//expand and collapse marign of big box for readability.

    // document.getElementById("menuIcon").style.display = "none";
   }
 

function hideContentMenu () {

    document.getElementById("contentMenu").style.width = "0";
    document.getElementById("menuIcon").style.width="25px";

}

