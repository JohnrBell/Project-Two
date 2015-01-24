console.log("### js.js linked ###");

//GETS A LIST OF CATEGORIES
function getCategories(){
	$.ajax({
		url: '/categories',
		type: 'GET',
		dataType: 'json'
	}).done(function(data){	
		for (var i=0;i<data.length;i++){
			$('#categories').append(Mustache.render(category_template,data[i]));
		}//close for loop
	})//close .done
}//close getCategories

//MAKES THE DROP DOWN SELECTOR WITH CATEGORIES IN IT
function makeCategorySelect(){
	$.ajax({
		url: '/categories',
		type: 'GET',
		dataType: 'json'
	}).done(function(data){	
		$('#editcontact div').append("<select class='form-control' id=categorySelect></select>")
		$('#categorySelect').append("<option>Please Select a Category</option>")
	 	for (var i=0;i<data.length;i++){
			$('#categorySelect').append('<option id='+data[i].id+'>'+data[i].name+'</option>');
		}//close for loop
	})//close .done
}//close getCategories

//GETS A LIST OF CONTACTS WITHIN A CATEGORY
function getContacts(whatCategoryId,templateToUse){
	$.ajax({
		url: ('/categories/'+whatCategoryId),
		type: 'GET',
		dataType: 'json'
	}).done(function(data){
		$('#contacts').empty();
		$('#contacts').append("<h1>"+data.name+"</h1>")
		data = data.contacts;
		for (var i=0;i<data.length;i++){
			$('#contacts').append(Mustache.render(templateToUse,data[i]));
		}//close for loop	
		$('#contacts').append(addContactForm)
		getRandomPic()
	})//close .done
}//close getContacts

//SAVES THE CHANGES FROM EDIT FORM
function saveEditChanges(idofpersontoedit){
	data = {
		id: $('#id').val(),
		name: $('#name').val(),
		age: $('#age').val(),
		address: $('#address').val(),
		phone_number: $('#cell').val(),
		picture: $('#picture').val(),
		category_id: $('#categoryid').val()
	}
	$.ajax({
		url: ('/contacts/'+idofpersontoedit),
		type: 'PUT',
		dataType: 'json',
		data: data
	}).done(function(data){
		console.log('getting category #'+data.category_id)
		getContacts(data.category_id,contact_template)
	})//close .done
}//close saveEditChanges

//CREATES A NEW CONTACT IN A SPECIFIC CATEGORY
function addNew(whatcategory){
	data = {
		name: $('#add_name').val(),
		age: $('#add_age').val(),
		address: $('#add_address').val(),
		phone_number: $('#add_cell').val(),
		picture: $('#add_picture').val(),
		category_id: whatcategory
	}
	$.ajax({
		url: '/contacts',
		type: 'POST',
		dataType: 'json',
		data: data
	}).done(function(data){
		getContacts(whatcategory,contact_template)
	})//close .done
}

//GETS A RANDOM PICTURE URL FROM RANDOMUSER.ME
function getRandomPic(){
	$.ajax({
	  url: 'http://api.randomuser.me/',
	  dataType: 'json'
	}).done(function(data){
		imgSrc = data.results[0].user.picture.medium
	  console.log('finished fetching: '+imgSrc);
	  $('input#add_picture').attr('value', imgSrc)
	})
}









// ***EVENT LISTENERS*** ***EVENT LISTENERS*** ***EVENT LISTENERS***

//BUTTON - VIEW CONTACTS FOR SPECIFIC CATEGORY
	$('#categories').on('click', '#expand', function(event){
		$('#editcontact').remove()
		var id = $(event.toElement).data("category-id");
		console.log('clicked on expand category #'+id);
		getContacts(id, contact_template);
	})//close getContacts click


//BUTTON - EDIT ON SPECIFIC CONTACT
	$('#contacts').on('click', '#edit', function(event){
		idofpersontoedit = this.parentElement.getAttribute("data-contact-id")
		console.log("trying to edit person #"+idofpersontoedit)
		$.ajax({
			url: ('/contacts/'+idofpersontoedit),
			type: 'GET'
		}).done(function(data){
			$('body').append(Mustache.render(edit_contact_template,data))	
			makeCategorySelect()
		})
	})//close editContact click


//BUTTON - DELETE ON SPECIFIC CONTACT
	$('#contacts').on('click', '#delete', function(event){
		idofpersontodelete = this.parentElement.getAttribute("data-contact-id")
		categoryid = this.parentElement.getAttribute('data-category-id')
		console.log("trying to delete person #"+idofpersontodelete)
		$.ajax({
			url: ('/contacts/'+idofpersontodelete),
			type: 'DELETE'
		}).done(function(data){
					getContacts(categoryid,contact_template)
		})
	})//close deleteContact click


//BUTTON - CANCEL ON EDIT FORM
	$('body').on('click', '#cancel', function(event){
		this.parentElement.parentElement.parentElement.remove()
	})//close edit cancel click


//BUTTON - SAVE ON EDIT FORM 
	$('body').on('click', '#save', function(event){
		event.preventDefault()
		if (
			($('#name').val() == '') |
			($('#age').val() == '') |
			($('#address').val() == '') |
			($('#cell').val() == '') |
			($('#categorySelect option:selected').val()=="Please Select a Category")
			)
		{
			alert('Error: Please fill out all info.');
		}else{
				id = this.parentElement.parentElement.parentElement.getAttribute('data-contact-id')
				saveEditChanges(id);
				this.parentElement.parentElement.parentElement.remove()
		}
	})//close edit save click


//BUTTON - SUBMIT ON ADD NEW FORM
	$('body').on('click', '#addnew', function(event){	
		// debugger
		event.preventDefault()
		if (
			($('#add_name').val() == '') |
			($('#add_age').val() == '') |
			($('#add_address').val() == '') |
			($('#add_cell').val() == '')
			)
		{
			alert('Error: Please fill out all info.');
		}else{
			categoryid = this.parentElement.parentElement.parentElement.parentElement.children[1].getAttribute('data-category-id')
			addNew(categoryid)
			console.log('clicked on add new person to category #'+categoryid);
		}
	})//close addnew click














// ***TEMPLATES*** ***TEMPLATES*** ***TEMPLATES*** ***TEMPLATES***

var category_template = "\
<li id=category>\
{{name}}<br>\
</li>\
<button id=expand class='btn btn-primary' data-category-id={{id}}>View Contacts</button>\
<br><br>"

var contact_template = "\
<div class=contact data-contact-id={{id}} data-category-id={{category_id}}>\
<img align=left src={{picture}}>\
{{name}}<br>\
Age- {{age}}<br>\
Address - {{address}}<br>\
Cell - {{phone_number}}<br>\
<button class='btn btn-info' id=edit>Edit</button> \
<button class='btn btn-danger' id=delete>Delete</button><br>\
<br><br><br><br></div>"

var edit_contact_template = "\
<form class='form form-horizontal'>\
<center>\
<div class='form-group' id=editcontact data-contact-id={{id}} data-category-id={{category_id}}><br>\
<center><div class='blah'>\
<input class='form-control' id=name value='{{name}}'><br>\
<input class='form-control' id=age value='{{age}}'><br>\
<input class='form-control' id=address value='{{address}}'><br>\
<input class='form-control' id=cell value='{{phone_number}}'><br>\
<input class='form-control' id=picture size=60 value='{{picture}}'><br>\
<button class='btn btn-primary' id=save>Save</button> \
<button class='btn btn-danger' id=cancel>Cancel</button><br><br>\
<input type=hidden id=id value='{{id}}'>\
<input type=hidden id=categoryid value='{{category_id}}'>\
</div></div></form>"

var addContactForm = "\
<form class='form form-horizontal'>\
<div class='form-group' id=addcontact>\
<div class='col-md-7'>\
<h3>Add a Contact</h3>\
<input class='form-control' id=add_name placeholder='name'><br>\
<input class='form-control' id=add_age placeholder='age'><br>\
<input class='form-control' id=add_address placeholder='address'><br>\
<input class='form-control' id=add_cell placeholder='phone_number'><br>\
<input class='form-control' id=add_picture size=60 placeholder='attempting to fetch a picture url'><br>\
<button class='btn btn-primary' id=addnew>Save</button>\
</div></div></form>"

getCategories()