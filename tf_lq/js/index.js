// var service = "http://www.carrefour.cn/mobile/api/";
// var service = "http://172.31.8.193:8090/mobile/api/";
var service = "/mobile/api/";
var lock = false;

var mobile, name, verifyCode, time;

function noteTestshow(messages){
	$('.note-message').html(messages);
	$('.note').removeClass('hide');

	setTimeout(function(){
		$('.note').addClass('hide');
	}, 3000);
}

function isWeixinBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua)) ? true : false;
}

function getCoupon(mobile, name, verifyCode, callback){
	$.ajax({
		type: "GET",
		headers: {
			'language': 'zh-CN'
		},
		url: service + "weChatActivity/getWeChatCoupon",
		dataType: "JSON",
		data: {
			param: '{"mobile":' + '"' + mobile  + '"' + ',"name":' + '"' + name + '"' + ',"verifyCode":' + '"' + verifyCode  + '"' + ',"couponType":3}'
		},
		success: callback,
		error: function(){
			lock = false;
		}
	});
}

function getVerifyCode (mobile, callback){
	$.ajax({
		type: "GET",
		headers: {
			'language': 'zh-CN'
		},
		url: service + "weChatActivity/getVerifyCode",
		dataType: "JSON",
		data: {
			param: "{mobile: "+ mobile + "}"
		},
		success: callback,
		error: function(){
			lock = false;
		}
	});
}

function countdownTime(){
	$('.get-verify-code').addClass('hide');
	$('.countdown').removeClass('hide');
	var countdown = 60;
	time = setInterval(function() {
		if (countdown == '0') {
			clearInterval(time);
			$('.get-verify-code').removeClass('hide');
			$('.countdown').addClass('hide');
			$('.time').html(60);
			return;
		}else{
			countdown--;
			$('.time').html(countdown);
		}
		
	}, 1000);
}

function getCookieByName(name) {
    var cookies = document.cookie,
        nameStartIndex,
        cookieStartIndex,
        cookieEndIndex,
        cookie;

    if (!cookies) return undefined;

    nameStartIndex = cookies.indexOf(name + '=');

    if (nameStartIndex > -1) {
        cookieStartIndex = nameStartIndex + name.length + 1;
        cookieEndIndex = cookies.indexOf(';', cookieStartIndex);

        if (cookieEndIndex === -1) {
            cookieEndIndex = cookies.length;
        }

        cookie = unescape(cookies.substring(cookieStartIndex, cookieEndIndex));
    }

    return cookie;
}

$(function() {
	
	// if (isWeixinBrowser() && window.wx) {
 //        wx.config({
 //            // debug: true,
 //            appId: getCookieByName('appId'),
 //            timestamp: getCookieByName('timestamp'),
 //            nonceStr: getCookieByName('nonceStr'),
 //            signature: getCookieByName('signature')
 //        });
 //    } else {
 //        alert('请使用微信浏览打开');
	// }

	// // 获取验证码
	// $('.get-verify-code').on('click', function(){

	// 	mobile = $('.mobile').val();
	// 	if(mobile.length !== 11){
	// 		noteTestshow('请输入正确的手机号');
	// 		return;
	// 	}

	// 	if(lock){
	// 		return;
	// 	}
	// 	lock = true;

	// 	// showLoading();
	// 	getVerifyCode(mobile, function(response){
	// 		noteTestshow(response.message);
	// 		lock = false;
	// 		if(response.data){
	// 			countdownTime();
	// 			noteTestshow("短信已发送至" + mobile);
	// 			$('.get-coupon').removeClass("hide");
	// 			$('.get-coupon2').addClass("hide");
	// 		}
	// 	});
		
	// });

	// // 领取优惠券
	// $(".get-coupon").on('click', function(){
	// 	name = $('.name').val();
	// 	verifyCode = $('.verifyCode').val();
	// 	mobile = $('.mobile').val();
	// 	if(!name){
	// 		noteTestshow('请输入姓名');
	// 		return;
	// 	}
	// 	if(verifyCode.length !== 6){
	// 		noteTestshow('请输入正确的验证码');
	// 		return;
	// 	}
	// 	if(mobile.length !== 11){
	// 		noteTestshow('请输入正确的手机号');
	// 		return;
	// 	}

	// 	if(lock){
	// 		return;
	// 	}
	// 	lock = true;

	// 	getCoupon(mobile, name, verifyCode, function(response){
	// 		lock = false;
	// 		if(response.data == true){
	// 			$('.page2').removeClass('hide');
	// 			$('.logo').hide();
	// 			$('.get-verify-code').removeClass('hide');
	// 			$('.countdown').addClass('hide');
	// 			$('.get-coupon2').removeClass("hide");
	// 			$('.get-coupon').addClass("hide");
	// 			noteTestshow("优惠券已绑定成功");
	// 			clearInterval(time)
	// 		} else {
	// 			noteTestshow(response.message);
	// 		}
	// 	});

	// });

	$("input").blur(function(){
	    window.scroll(0,0);
	});
	
});
