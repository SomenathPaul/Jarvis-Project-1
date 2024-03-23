// var tablinks = document.getElementsByClassName("tab-links");
// var tabcontents = document.getElementsByClassName("tab-contents");

// function opentab(tabname){
//     for(tablink of tablinks){
//         tablink.classList.remove("avtive-link");
//     }
//     for(tabcontent of tabcontents){
//         tabcontent.classList.remove("active-tab");
//     }
//     event.currentTarget.classList.add("avtive-link");
//     document.getElementById(tabname).classList.add("active-tab");
// }

function toggle() {
    var blur = document.querySelector('.blur');
    blur.classList.toggle('active');
    var popup = document.querySelector('.popup');
    popup.classList.toggle('active');
}


// automatically scroll functionality
function autoScroll(element, duration) {
  const scrollHeight = element.scrollHeight;
  const scrollStep = Math.PI / (duration / 15);
  let scrollCount = 0;
  let scrollPosition = 0;

  const scrollInterval = setInterval(function() {
    if (scrollPosition < scrollHeight) {
      scrollPosition = Math.round(scrollHeight * Math.sin(scrollCount));
      element.scrollTop = scrollPosition;
      scrollCount += scrollStep;
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}

const scrollContainer = document.querySelector('.scroll-container');
autoScroll(scrollContainer, 50000); // Adjust duration as needed (in milliseconds)

// active jarvis auto speech
function activateMIC() {
  var button = document.querySelector('.talk');
  button.classList.add('active');
  setTimeout(function() {
      button.classList.remove('active');
  }, 20000); // 3000 milliseconds = 3 seconds
}