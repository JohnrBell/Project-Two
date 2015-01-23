console.log("JS Linked...");


function getCategories(){
	$.ajax({
		url: '/categories',
		type: 'GET',
		dataType: 'json'
	}).done(function(data){
		
		for (var i=0;i<data.length;i++){
			stringtoput = ('<li class="category" id='+data[i].id+'>'+data[i].name+"<br>")
			stringtoput += ('<button class="expand">View Contacts</button><br><br>')
			$("#categories").append(stringtoput)
		}
		addEventListener()

	})//close .done
}//close getCategories


function getContacts(fromWhatCategoryID,whatTemplatetoPut){
	$.ajax({
		url: ('/categories/'+fromWhatCategoryID),
		type: 'GET',
		dataType: 'json'
	}).done(function(data){

		$("#contact").empty()
		for (i=0;i<data.contacts.length;i++){
			person = data.contacts[i]
			$('#contact').append(Mustache.render(whatTemplatetoPut,person))
		}
		if (whatTemplatetoPut == contact_template){
			$('#contact').append("<button id=edit>Edit</button><br>")
		}
		addEventListener()

	})//close .done
}//close getContacts


function saveContact(data){
	tosend = JSON.stringify(data)
	$.ajax({
		url: ('/contacts/'+data.id),
		type: 'PUT',
		data: tosend
	}).done(function(){
		getContacts(data.category_id, contact_template)

	})//close .done
}//close saveContact





getCategories()





// ***TEMPLATES***

var contact_template = "\
<div id={{id}} class={{category_id}}>\
<img align=left src={{picture}}>\
{{name}}<br>\
Age- {{age}}<br>\
Address - {{address}}<br>\
Cell - {{phone_number}}<br>\
<br><br></div>"

var edit_contact_template = "\
<div id={{id}} class={{category_id}}>\
<input id=name value='{{name}}'><br>\
<input id=age value='{{age}}'><br>\
<input id=address value='{{address}}'><br>\
<input id=cell value='{{phone_number}}'><br>\
<input id=picture size=60 value='{{picture}}'><br>\

<button class=save>Save</button><br><br></div>"


// <select id=movie-select>\
// <option value="">Select a movie...</option>\
// </select>\
// ***ADD EVENT LISTENERS***

function addEventListener(){
	$('.expand').on('click', function(event){
		id = this.parentElement.id
		getContacts(id,contact_template)
		console.log('clicked expand on category '+id)
	})//close getContacts click

	$('#edit').on('click', function(event){
		id = this.parentNode.children[0].className
		getContacts(id,edit_contact_template)
	})//close getContacts click

	$('.save').on('click', function(event){
		console.log('clicked save')		
		data = {
			id: this.parentElement.id,
			name : this.parentElement.children[0].value,
			age : this.parentElement.children[2].value,
			address : this.parentElement.children[4].value,
			phone_number : this.parentElement.children[6].value,
			picture : this.parentElement.children[8].value,
			category_id: this.parentElement.className
		}
		saveContact(data)
	})//close getContacts click
}//close addEventListener