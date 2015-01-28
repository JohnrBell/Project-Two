console.log("### js.js linked ###");

//GETS A LIST OF CATEGORIES
function getCategories(){
	$.ajax({
		url: '/categories',
		type: 'GET',
		dataType: 'json'
	}).done(function(data){	
		var searchtemplate = $('#searchtemplate').html();
		($('#categories')).after(searchtemplate);
		for (var i=0;i<data.length;i++){
			var category_template = $('#category_template').html();
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
		$('#save').before("<select class='form-control' id=categorySelect></select><br>");
		$('#categorySelect').append("<option>Please Select a Category</option>");
	 	for (var i=0;i<data.length;i++){
			$('#categorySelect').append('<option id='+data[i].id+'>'+data[i].name+'</option>');
		}//close for loop
		valtoselect2 =  $('#contacts h1')[0].innerText;
		$('#categorySelect').val(valtoselect2);
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
		$('#contacts').append("<h1>"+data.name+"</h1><br>");
		data = data.contacts;
		var modalbutton = $('#mymodalbutton').html();
		for (var i=0;i<data.length;i++){
			$('#contacts').append(Mustache.render(templateToUse,data[i]));
			($('.contact .btn').last()).before(modalbutton);
			
			template = makeMap(data[i].address)
			$('.row #maphere').last().append(template)
		}//close for loop	
			$('#contacts h1').hide()
			=$('#contacts h1').fadeIn(1000);
			$('.contact').hide();
			$('.contact').fadeIn(1000);

		var addContactForm = $('#addcontacttemplate').html();
		$('#contacts').append(addContactForm);

		getRandomPic();
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
		console.log('getting category #'+data.category_id);
		var contact_template = $('#contact_template').html();
		getContacts(data.category_id,contact_template);
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
		var contact_template = $('#contact_template').html();
		getContacts(whatcategory,contact_template);
	})//close .done
}

//GETS A RANDOM PICTURE URL FROM RANDOMUSER.ME
function getRandomPic(){
	$.ajax({
	  url: 'http://api.randomuser.me/',
	  dataType: 'json'
	}).done(function(data){
		imgSrc = data.results[0].user.picture.medium;
	  console.log('finished fetching: '+imgSrc);
	  $('input#add_picture').attr('value', imgSrc);
	})
}

function makeMap(address){
	var maptemplate = $('#mapdisplay').html()
	var address = {address: address}
	address.address = address.address.replace(/ /g,"+")
	address.address = address.address.replace(/,/g,"")
	var template = Mustache.render(maptemplate,address)
	return template;
}



// ***EVENT LISTENERS*** ***EVENT LISTENERS*** ***EVENT LISTENERS***

//BUTTON - VIEW CONTACTS FOR SPECIFIC CATEGORY
	$('#categories').on('click', '#expand', function(event){
		var id = $(event.toElement).data("category-id");
		console.log('clicked on expand category #'+id);
		var contact_template = $('#contact_template').html();
		getContacts(id, contact_template);
	})//close getContacts click


//BUTTON - DELETE ON SPECIFIC CONTACT
	$('#contacts').on('click', '#delete', function(event){
		idofpersontodelete = this.parentElement.getAttribute("data-contact-id");
		categoryid = this.parentElement.getAttribute('data-category-id');
		console.log("trying to delete person #"+idofpersontodelete);
		$.ajax({
			url: ('/contacts/'+idofpersontodelete),
			type: 'DELETE'
		}).done(function(data){
			var contact_template = $('#contact_template').html();
			getContacts(categoryid,contact_template);
		})
	})//close deleteContact click


//BUTTON - EDIT ON SPECIFIC CONTACT
	$('#contacts').on('click', '#edit', function(event){
		idofpersontoedit = this.parentElement.getAttribute("data-contact-id");
		console.log("trying to edit person #"+idofpersontoedit);
		$.ajax({
			url: ('/contacts/'+idofpersontoedit),
			type: 'GET'
		}).done(function(data){
			var edit_contact_template = $('#edit_contact_template').html();
			$('.modal-body').empty();
			$('.modal-body').append(Mustache.render(edit_contact_template,data));
			makeCategorySelect();
		})
	})//close editContact click


//BUTTON - CANCEL ON EDIT FORM
	$('body').on('click', '#cancel', function(event){
		this.parentElement.parentElement.parentElement.remove();
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
			id = this.parentElement.parentElement.parentElement.getAttribute('data-contact-id');
			saveEditChanges(id);
		}
	})//close edit save click


//BUTTON - ADD NEW SUBMIT
	$('body').on('click', '#addnew', function(event){	
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
			categoryid = $('.contact')[0].getAttribute('data-category-id');
			addNew(categoryid);
			console.log('clicked on add new person to category #'+categoryid);
		}
	})//close addnew click


//BUTTON - SEARCH!
$('body').on('click', '#submitsearch', function(event){
	event.preventDefault();
if ($('#search-bar').val() == ""){
	alert("Enter something to look for, dummy.")
}else{
		console.log('submit search request')
		$.ajax({
		url: '/contacts',
		type: 'GET',
		dataType: 'json'
	}).done(function(data){	
		var searchstring = ($('#search-bar').val());
		$('#search-bar').val("");
		var arrofresults = [];
		searchstring = new RegExp(searchstring,'i');
		for (var i=0;i<data.length;i++){	
			if ((data[i].name).search(searchstring) != -1 ){
				arrofresults.push(data[i]);
			}			
		}

		$('#contacts').empty();
		$('#contacts').append("<h1>Search Results</h1><br>");
		for (var i=0;i<arrofresults.length;i++){
			var templateToUse = $('#contact_template').html();
			var modalbutton = $('#mymodalbutton').html();
			$('#contacts').append(Mustache.render(templateToUse,arrofresults[i]));
			$('#delete').remove();
		}//close for loop	
			$('#contacts h1').hide()
			$('#contacts h1').fadeIn(1000);
			$('.contact').hide();
			$('.contact').fadeIn(1000);
			getRandomPic();
})//close .done
}
})//close search click



getCategories()


