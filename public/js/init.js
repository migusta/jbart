$(document).ready(function(){

	var sliderTO=setTimeout(slideBG,5000);
	$("#slider-nav li").click(function(){
		var index=$(this).attr("index");
		$("#slider-nav li.active").removeClass("active");
		$(this).addClass("active");
		$("#slider").attr("index",index);
		changeSliderBG(index);
		clearTimeout(sliderTO);
		sliderTO=setTimeout(slideBG,6000);
	});
	});

//таймер смены слайдера
function slideBG(){
		var index=$("#slider").attr("index");
		$("#slider-nav li.active").removeClass("active");
		index++;
		$("#slider-nav li[index='"+index+"']").addClass("active");
		if (index>5) index=1;
		changeSliderBG(index);
		sliderTO=setTimeout(slideBG,6000);
	}
//смена фона слайдера
function changeSliderBG(index)
{
	$("#slider").attr("index",index);
	var bgUrl=$("#slider-nav li[index="+index+"]").attr("imgurl");
	$("#slider").stop().animate({opacity: 0},1000,function(){
		$(this).css({'background-image': 'url('+bgUrl+')'})
		           .animate({opacity: 1},{duration:1000});
	});
}
//функции показа галереи
function closeFullImg(){
	 		$("#full-img").hide();
	 		$("body").css("overflow","auto");
}
function openFullImg(sID){
	var bigImgUrl=$("div.thumb a[index="+sID+"]").attr("bigimg");
	// console.log(bigImgUrl)
	$("#full-img").show();
	$("#full-img img").attr("src",bigImgUrl);
	$("body").css("overflow","hidden");	 
	updateLinks(parseInt(sID));
}

function updateLinks(iID){
	if (iID>1)
		{$("a.prev").show();$("a.prev").attr("previd",iID-1);}
	else $("a.prev").hide();
	var newNextID=iID+1;
	if ($("div.thumb a[index="+newNextID+"]").length!=0)
		$("a.next").show();
	else $("a.next").hide();
	$("a.next").attr("nextid",newNextID);
}

function showPrevImg(){
	var iID=parseInt($("a.prev").attr("previd"));
	var bigImgUrl=$("div.thumb a[index="+iID+"]").attr("bigimg");
	updateLinks(iID);	
	$("#full-img img").attr("src",bigImgUrl);
}
function showNextImg(){
	var iID=parseInt($("a.next").attr("nextid"));
	var bigImgUrl=$("div.thumb a[index="+iID+"]").attr("bigimg");
	var newID=iID+1;
	updateLinks(iID);	
	$("#full-img img").attr("src",bigImgUrl);
}
//форма контактов

function validateName(obj){
	var text=obj.value;
	if($.trim(text)!="")
		{$(obj).removeClass("error");
		return true}
	else {$(obj).addClass("error");return false;}

}
function validateEmail(obj) {
	var email=obj.value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email))
    	{$(obj).removeClass("error");
		return true}
	else {$(obj).addClass("error");return false;}
}

function validateForm(){
	var successName=true;
	var successEmail=true;

	$("#contact :input[required]").each(function(){
		if($(this).attr("type")=="text") successName=validateName(this);
		if($(this).attr("type")=="email") successEmail=validateName(this);
	});
	if(successName&&successEmail) {
		$("#contact").html("<h3>Thank you for contact me.</h3>");
		// var name=$.trim($("#c-name").value());
		// var email=$.trim($("#c-email").value());
		// var message=$.trim($("#c-message").value());

		// var url="/feedback?name="+name+"&email="+email+"&message="+message;
		// console.log(url);
		// //отправляем запрос
		// xhr = new XMLHttpRequest();
		// xhr.open( "GET", url, false );
		// xhr.onload = function() {
		// if (xhr.readyState == 4) {
		// // console.log(xhr.responseText)
		// var newId = JSON.parse(xhr.responseText).id //переводим текст в объект и берем ключ
		// if(newId != undefined)
		// 	$("#contact").html("<h3>Thank you for contact me.</h3>");
		// }
		// }
		// xhr.send( null );


	}
}


jQuery("#contact-form").on('submit',function(e){
  e.preventDefault();

  var data={ action: 'contact',
  'name.full': $("input[name='name.full']").val(),
  email: $("input[name='email']").val(),
  message: $("textarea[name='message']").val() };

  console.log(data);

  $.ajax({
  	type: "POST",
  	url: "/",
  	data: data
  }).done((res)=>{
	$("#contact-form").html("Thanks for getting in touch.");
});
});

