$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text("Enter New Comment")
  modal.find('.modal-body input').val("")
})

function addComment() {
	var name = document.getElementById("recipient-name").value;
	var comment = document.getElementById("message-text").value;
	var commentList = document.getElementById("commentHistory");
	var newNameItem = document.createElement("li");
	newNameItem.setAttribute("class", "names");
	var newCommentItem = document.createElement("li");
	newCommentItem.setAttribute("class", "comments");
	var nameText = document.createTextNode(name);
	var commentText = document.createTextNode(comment);
	newNameItem.appendChild(nameText);
	newCommentItem.appendChild(commentText);
	commentList.appendChild(newNameItem);
	commentList.appendChild(newCommentItem);
	$('#exampleModal').modal('hide');
	document.getElementById("message-text").value = "";
}