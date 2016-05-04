$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text("Enter New Comment")
  modal.find('.modal-body input').val("")
})

//array that contains all of the comment objects
var commentArray = [];
//will hold the current id of the button that was pressed.
var buttonID = "";

var commentNumber;

function addComment() {
	var name = document.getElementById("recipient-name").value;
	var password = document.getElementById("recipient-password").value;
	var comment = document.getElementById("message-text").value;
	//creates the current comment object based on user's click.
	var commentObject = {
		userName: name,
		userPassword: password,
		userComment: comment
	}
	//puts the current comment at the end of the array
	commentArray.push(commentObject);

	//coding to throw the current comment and name into HTML
	var commentList = document.getElementById("commentHistory");
	var newNameItem = document.createElement("div");
	newNameItem.setAttribute("class", "names");
	newNameItem.setAttribute("id","name" + commentArray.length);
	var newCommentItem = document.createElement("div");
	newCommentItem.setAttribute("class", "comments");
	newCommentItem.setAttribute("id", "comment" + commentArray.length);
	var nameText = document.createTextNode(name);
	var commentText = document.createTextNode(comment);
	newNameItem.appendChild(nameText);
	//Create edit comment button that will be pull up a modal.
	var editButton = document.createElement("button");
	editButton.setAttribute("type","button");
	editButton.setAttribute("class","editButton");
	editButton.setAttribute("id","editButton" + commentArray.length);
	editButton.setAttribute("data-toggle","modal");
	editButton.setAttribute("data-target","#exampleModal2");
	editButton.setAttribute("data-whatever","Name");
	editButton.setAttribute("onclick","getID()");
	var editButtonText = document.createTextNode("Edit");
	editButton.appendChild(editButtonText);
	newNameItem.appendChild(editButton);
	newCommentItem.appendChild(commentText);
	commentList.appendChild(newNameItem);
	commentList.appendChild(newCommentItem);
	//close the modal after comment is submitted
	$('#exampleModal').modal('hide');
	document.getElementById("message-text").value = "";

}
//function is called on click of edit button.  Will determine the
//id of which button was clicked.
function getID () {
	var e = window.event,
	btn = e.target || e.srcElement;
	buttonID = btn.id;
	var commentNumberText = buttonID.substring(10,buttonID.length);
	console.log(commentNumberText);
	commentNumber = Number(commentNumberText);
	document.getElementById("recipient-password2").value = "";
	console.log(btn.id);
}
//function is called when password is submitted the first time
function checkPassword2() {
	var password2 = document.getElementById("recipient-password2").value;
	console.log(password2);
	if (!(password2 === commentArray[commentNumber-1].userPassword)) {
		$('#exampleModal2').modal('hide');
		document.getElementById("recipient-password2").value = "";
		$('#exampleModal3').modal('show');
		document.getElementById("recipient-password3").value = "";
	}
	else {
		editComment2();
	}
}
//function is called when password is submitted after the first time
function checkPassword3() {
	var password3 = document.getElementById("recipient-password3").value;
	if (!(password3 === commentArray[commentNumber-1].userPassword)) {
		$('#exampleModal3').modal('show');
		document.getElementById("recipient-password3").value = "";
		$('#exampleModal3').modal('show');
	}
	else {
		editComment3();
	}
}
function editComment2() {
	$('#exampleModal2').modal('hide');
	document.getElementById("recipient-name4").value = commentArray[commentNumber-1].userName;
	document.getElementById("message-text4").value = commentArray[commentNumber-1].userComment;
	$('#exampleModal4').modal('show');
}
function editComment3() {
	$('#exampleModal3').modal('hide');
	document.getElementById("recipient-name4").value = commentArray[commentNumber-1].userName;
	document.getElementById("message-text4").value = commentArray[commentNumber-1].userComment;
	$('#exampleModal4').modal('show');
}
function submitNewComment() {
	commentArray[commentNumber-1].userComment = document.getElementById("message-text4").value;
	document.getElementById("comment" + commentNumber).innerHTML = commentArray[commentNumber-1].userComment;
	$('#exampleModal4').modal('hide');
}