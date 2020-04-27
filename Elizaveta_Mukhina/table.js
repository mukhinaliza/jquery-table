$(document).ready(function(){ 
 addProduct();
 sortProduct();

});


function addProduct(){
	$(".btnAddNew").click(function(){
$(".addModal").fadeIn();
});
	$(".cancel").click(function(){
$(".addModal").fadeOut();
});
	$("#forShowBlock").change(function(){
var checkBoxRus = "<div class='form-group form-check' id='checkRussia'><input type='checkbox' class='form-check-input checkAll'><label class='form-check-label' for='checkAll'>Select All</label><br><input type='checkbox' class='form-check-input' id='checkMsk'><label class='form-check-label' for='checkMsk'>Moscow</label><br><input type='checkbox' class='form-check-input' id='checkSpb'><label class='form-check-label' for='checkSpb'>St.Petersburg</label><br><input type='checkbox' class='form-check-input' id='checkPsk'><label class='form-check-label' for='checkPsk'>Pskov</label><br></div>"
var checkBoxBelarus = "<div class='form-group form-check' id='checkBelarus'><input type='checkbox' class='form-check-input checkAll'><label class='form-check-label' for='checkAll'>Select All</label><br><input type='checkbox' class='form-check-input' id='checkMinsk'><label class='form-check-label' for='checkMinsk'>Minsk</label><br><input type='checkbox' class='form-check-input' id='checkBrest'><label class='form-check-label' for='checkBrest'>Brest</label><br><input type='checkbox' class='form-check-input' id='checkGomel'><label class='form-check-label' for='checkGomel'>Gomel</label><br></div>"
var checkBoxUsa = "<div class='form-group form-check' id='checkUsa'><input type='checkbox' class='form-check-input checkAll'><label class='form-check-label' for='checkAll'>Select All</label><br><input type='checkbox' class='form-check-input' id='checkWash'><label class='form-check-label' for='checkWash'>Washington</label><br><input type='checkbox' class='form-check-input' id='checkNY'><label class='form-check-label' for='checkNY'>New-York</label><br><input type='checkbox' class='form-check-input' id='checkChicago'><label class='form-check-label' for='checkChicago'>Chicago</label><br></div>"
if($(this).val() === "russia"){
$(checkBoxRus).insertAfter(".form-group__select");
	$("#checkRussia").show();
	$(".saveAdd").click(function(){
	$("#checkRussia").remove();
});
}
else{
	$("#checkRussia").remove();
}
if($(this).val() === "belarus"){
$(checkBoxBelarus).insertAfter(".form-group__select");
	$("#checkBelarus").show();
}
else{
	$("#checkBelarus").remove();
}
if($(this).val() === "usa"){
$(checkBoxUsa).insertAfter(".form-group__select");
	$("#checkUsa").show();
}
else{
	$("#checkUsa").remove();
}
$(".checkAll").click(function(){
if  (!$(this).is(":checked")){
              $(".form-check-input").removeAttr("checked");
        }
        else{
             $(".form-check-input").attr("checked","checked");
       }
});
});
	
$("#formValid").submit(function(event){
event.preventDefault();
var validName = false;
var validEmail = false;
var validCount = false;
var validPrice = false;
var searchExp = />(.*?)</gi;
var mailExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var numExp = /\d/;
var product = new Array();
	product[0] = $(".inputName").val();
	product[1] = +($(".inputCount").val());
	product[2] = +($(".inputPrice").val());
    product[3] = $(".inputEmail").val();
if(!product[0].replace(/\s/g, "") || (product[0].length < 5 || product[0].length >= 15)){
$(".messageForName").html("<span class='err'> Name length must be up 5 to 15 characters</span>");
$(".inputName").addClass("invalid");
validName = false
}
else{
	setTimeout(function(){ $(".messageForName").fadeOut(); }, 200);
	setTimeout(function(){ $(".inputName").removeClass("invalid"); }, 200);
	validName = true;
}
if(!product[3].replace(/\s/g, "") || !mailExp.test(product[3])){
$(".messageForEmail").html("<span class='err'>Invalid E-mail</span>");
$(".inputEmail").addClass("invalid");
validEmail = false
}
else{
	setTimeout(function(){ $(".messageForEmail").fadeOut(); }, 200);
	setTimeout(function(){ $(".inputEmail").removeClass("invalid"); }, 200);
	validEmail = true;
}
if(product[1] <= 0 || !numExp.test(product[1])){
$(".messageForCount").html("<span class='err'>Enter the correct number</span>");
$(".inputCount").addClass("invalid");
validCount = false;
}
else{
	setTimeout(function(){ $(".messageForCount").fadeOut(); }, 200);
	setTimeout(function(){ $(".inputCount").removeClass("invalid"); }, 200);
	validCount = true;
}
if(product[2] <= 0 || !numExp.test(product[2])){
$(".messageForPrice").html("<span class='err'>Enter the correct number</span>");
$(".inputPrice").addClass("invalid");
validPrice = false;
}
else{
	setTimeout(function(){ $(".messageForPrice").fadeOut(); }, 200);
	setTimeout(function(){ $(".inputPrice").removeClass("invalid"); }, 200);
	validPrice = true;
}

if(validName == true && validEmail == true && validCount == true && validPrice == true){
var addTable = "<tbody><tr><th scope='row'><button type='button' class='btn btn-link name'>"+ product[0] +"</button></th><td ><span class='badge badge-pill badge-secondary count' style='float:right'>"+ product[1] +"</span></td><td class='price'>"+ "$"+ product[2] +"</td><td><button type='button' class='btn btn-outline-secondary btnEditProduct'>Edit</button> <button type='button' class='btn btn-outline-secondary btnDeleteProduct'>Delete</button></td><span class='email-hide'>"+product[3]+"</span></tr></tbody>";
$("#table").append(addTable);
$(".inputName").val("");
$(".inputCount").val("");
$(".inputPrice").val("");
$(".inputEmail").val("");
$(".addModal").hide();
}

editProduct();
delProduct();
infoProduct();
});
}


function delProduct(){
$(".btnDeleteProduct").click(function(){
$(".delModal").fadeIn();
var delProductName = $(this).parents("tr").find(".name").text();
$(".modal-content__text").html(`Are you sure you want to delete ${delProductName}?`);
var thisBtn = this;
$(".delYes").click(function(){
$(thisBtn).parents("tr").remove();
$(".delModal").fadeOut();
});
});
$(".delNo").click(function(){
$(".delModal").fadeOut();
});
}



function editProduct(){
$(".btnEditProduct").click(function(){
$(".editModal").fadeIn();
var findName = $(this).parents("tr").find(".name");
var findEmail = $(this).parents("tr").find(".email-hide");
var findCount = $(this).parents("tr").find(".count");
var findPrice = $(this).parents("tr").find(".price");
var getName = $("#inputNameEdit");
var getEmail = $("#inputEmailEdit");
var getCount = $("#inputCountEdit");
var getPrice = $("#inputPriceEdit");
getName.val(findName.html());
getEmail.val(findEmail.html());
getCount.val(findCount.html());
getPrice.val(findPrice.html());

$("#forEditBlock").change(function(){
var editCheckBoxRus = "<div class='form-group form-check__edit' id='editCheckRussia'><input type='checkbox' class='form-check-input checkAll'><label class='form-check-label' for='checkAll'>Select All</label><br><input type='checkbox' class='form-check-input' id='checkMsk'><label class='form-check-label' for='checkMsk'>Moscow</label><br><input type='checkbox' class='form-check-input' id='checkSpb'><label class='form-check-label' for='checkSpb'>St.Petersburg</label><br><input type='checkbox' class='form-check-input' id='checkPsk'><label class='form-check-label' for='checkPsk'>Pskov</label><br></div>"
var editCheckBoxBelarus = "<div class='form-group form-check__edit' id='editCheckBelarus'><input type='checkbox' class='form-check-input checkAll'><label class='form-check-label' for='checkAll'>Select All</label><br><input type='checkbox' class='form-check-input' id='checkMinsk'><label class='form-check-label' for='checkMinsk'>Minsk</label><br><input type='checkbox' class='form-check-input' id='checkBrest'><label class='form-check-label' for='checkBrest'>Brest</label><br><input type='checkbox' class='form-check-input' id='checkGomel'><label class='form-check-label' for='checkGomel'>Gomel</label><br></div>"
var editCheckBoxUsa = "<div class='form-group form-check__edit' id='editCheckUsa'><input type='checkbox' class='form-check-input checkAll'><label class='form-check-label' for='checkAll'>Select All</label><br><input type='checkbox' class='form-check-input' id='checkWash'><label class='form-check-label' for='checkWash'>Washington</label><br><input type='checkbox' class='form-check-input' id='checkNY'><label class='form-check-label' for='checkNY'>New-York</label><br><input type='checkbox' class='form-check-input' id='checkChicago'><label class='form-check-label' for='checkChicago'>Chicago</label><br></div>"
if($(this).val() === "russia"){
$(editCheckBoxRus).insertBefore(".modal-button__form2");
	$("#editCheckRussia").show();
}
else{
	$("#editCheckRussia").remove();
}
if($(this).val() === "belarus"){
$(editCheckBoxBelarus).insertBefore(".modal-button__form2");
	$("#editCheckBelarus").show();
}
else{
	$("#editCheckBelarus").remove();
}
if($(this).val() === "usa"){
$(editCheckBoxUsa ).insertBefore(".modal-button__form2");
	$("#editCheckUsa").show();
}
else{
	$("#editCheckUsa").remove();
}
$(".checkAll").click(function(){
if  (!$(this).is(":checked")){
              $(".form-check-input").removeAttr("checked");
        }
        else{
             $(".form-check-input").attr("checked","checked");
       }
});
});

$("#formValidEdit").submit(function(event){
event.preventDefault();
var validName = false;
var validEmail = false;
var validCount = false;
var validPrice = false;
var searchExp = />(.*?)</gi;
var mailExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var numExp = /\d/;
if(!getName.val().replace(/\s/g, "") || (getName.val().length < 5 || getName.val().length >= 15)){
$(".messageForNameEdit").html("<span class='err'> Name length must be up 5 to 15 characters</span>");
$("#inputNameEdit").addClass('invalid');
validName = false
}
else{
	setTimeout(function(){ $(".messageForNameEdit").fadeOut(); }, 200);
	setTimeout(function(){ $("#inputNameEdit").removeClass('invalid'); }, 200);
	validName = true;
}
if(!getEmail.val().replace(/\s/g, "") || !mailExp.test(getEmail.val())){
$(".messageForEmailEdit").html("<span class='err'>Invalid E-mail</span>");
$("#inputEmailEdit").addClass('invalid');
validEmail = false
}
else{
	setTimeout(function(){ $(".messageForEmailEdit").fadeOut(); }, 200);
	setTimeout(function(){ $("#inputEmailEdit").removeClass('invalid'); }, 200);
	validEmail = true;
}
if(getCount.val() <= 0 || !numExp.test(getCount.val())){
$(".messageForCountEdit").html("<span class='err'>Enter the correct number</span>");
$("#inputCountEdit").addClass('invalid');
validCount = false;
}
else{
	setTimeout(function(){ $(".messageForCountEdit").fadeOut(); }, 200);
	setTimeout(function(){ $("#inputCountEdit").removeClass('invalid'); }, 200);
	validCount = true;
}
if(getPrice.val() <= 0 || !numExp.test(getPrice.val())){
$(".messageForPriceEdit").html("<span class='err'>Enter the correct number</span>");
$("#inputPriceEdit").addClass('invalid');
validPrice = false;
}
else{
	setTimeout(function(){ $(".messageForPriceEdit").fadeOut(); }, 200);
	setTimeout(function(){ $("#inputPriceEdit").removeClass('invalid'); }, 200);
	validPrice = true;
}
if(validName == true && validEmail == true && validCount == true && validPrice == true){
findName.html(getName.val());
findEmail.html(getEmail.val());
findCount.html(getCount.val());
findPrice.html(getPrice.val());

$(".editModal").fadeOut();
}
});
});

$(".cancel").click(function(){
$(".editModal").fadeOut();
}); 
}



function infoProduct(){
$(".name").click(function(){
$(".infoModal").fadeIn();
var findName = $(this).parents("tr").find(".name");
var findEmail = $(this).parents("tr").find(".email-hide");
var findCount = $(this).parents("tr").find(".count");
var findPrice = $(this).parents("tr").find(".price");
var getName = $(".inputNameInfo");
var getEmail = $(".inputEmailInfo");
var getCount = $(".inputCountInfo");
var getPrice = $(".inputPriceInfo");
getName.val(findName.html());
getEmail.val(findEmail.html());
getCount.val(findCount.html());
getPrice.val(findPrice.html());
});

$(".cancel").click(function(){
$(".infoModal").fadeOut();
}); 
}


function sortProduct(){
$(".btn-link").click(function(){
	$("#hide").hide(function(){
	$("#hide").fadeOut();
	$("#show").fadeIn();
});
});
$("th").click(function(){
	$("#hide").fadeIn();
	$("#show").fadeOut();
    var table = $(this).parents('table').eq(0);
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
    if (!this.asc){
    	rows = rows.reverse();
    }
    for (var i = 0; i < rows.length; i++){
    	table.append(rows[i]);
    }
});
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    }
}
function getCellValue(row, index){
 return $(row).children('td').eq(index).text();
  }
  }



   $("#search").keyup(function(){
    	searchProduct($(this).val());
    });
    function searchProduct(value){
   $("#table tbody tr").each(function(){
   	var found = "false";
   	$(this).each(function(){
   		 if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
   found = "true";
   }
       	});  
   	if(found == "true"){
   		$(this).show();
   	}
   	else{
   		$(this).hide();
   	}

    });
}


