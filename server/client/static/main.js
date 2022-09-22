// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByClassName("listItem");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('.listContainer');
list.addEventListener('click', function(ev) {
  if (ev.target.className.includes('listItem')) {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  const inputValue = document.getElementById("myInput").value;
  let listItem = document.createElement('div')
  listItem.classList.add('listItem');
  listItem.innerHTML =  inputValue
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.querySelector(".listContainer").appendChild(listItem);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  listItem.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}