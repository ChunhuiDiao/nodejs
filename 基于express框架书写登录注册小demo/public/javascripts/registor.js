$(function(){
	//产生验证码
	$("#registor").find(".createCode").html(createCode());
	
	$("#registor").on("blur","input",function(){
		//验证手机号码
		
		if($(this).attr("class") == "phonenum"){
			var str = $(this).attr("class");
			if($(this).val() == ""){
				$(this).css("margin-bottom","0");
				$(this).parent().find('.'+str+'').html("请输入手机号码");
				$(this).val("");
			}else{
				//验证手机号码的长度
				if($(this).val().length != 11){
					$(this).css("margin-bottom","0");
					$(this).parent().find('.'+str+'').html("请输入正确的手机号码");
					$(this).val("");
				}else{
					//正则验证手机号码是否符合规则
					if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($(this).val()))){
						$(this).css("margin-bottom","0");
						$(this).val("");
						$(this).parent().find('.'+str+'').html("请输入正确的手机号码")
					}else{
						$(this).css("margin-bottom","30px");
						$(this).parent().find('.'+str+'').html("")
					}
				}

				//判定是否重名
				if($(this) != ""){
					$.ajax({
						method:"post",
						type:"json",
						url:"/users/ajax",
						data:"phonenum="+$(this).val(),
						success:function(data){
							if(data != ""){
								$("#registor").find(".phonenum").eq(0).val("");
								alert("该手机号码已存在,请重新输入")
							}
						}
					})
				}
				
			}
		//验证验证码
		}else if($(this).attr("class") == "code"){
			var str = $(this).attr("class");

			
			if($(this).val() != $("#registor").find(".createCode").eq(0).html()){
				$(this).css("margin-bottom","0");
				$("#registor").find(".createCode").css("margin-top","-43px");
				$(this).parent().find('.'+str+'').html("验证码错误，请重新输入");
				$(this).val("");
				$("#regeistor").find(".createCode").html(createCode());
			}else{
				$(this).css("margin-bottom","30px");
				$(this).parent().find('.'+str+'').html("");
				$("#registor").find(".createCode").css("margin-top","-73px");
			}
		//验证用户名
		}else if($(this).attr("class") == "username"){
			var str = $(this).attr("class");
			if($(this).val() == ""){
				$(this).css("margin-bottom","0px");
				$(this).parent().find('.'+str+'').html("请输入用户名");
				$(this).val("");
			}else{
				if(!(/^\+?[1-9][0-9]*$/.test($(this).val()))){
					
					if(/^[a-zA-Z0-9_-]{4,16}$/.test($(this).val())){
					
					$(this).css("margin-bottom","30px");
					$(this).parent().find('.'+str+'').html("");
					
					}else{
						if(!($(this).val().length > 4 &&$ (this).val().length <16)){
							$(this).css("margin-bottom","0px");
							$(this).parent().find('.'+str+'').html("用户名为4-16组成");
							$(this).val("");
						}else{
							$(this).css("margin-bottom","0px");
							$(this).parent().find('.'+str+'').html("用户名只可由中英文，数字及‘-’‘_’符号组成");
							$(this).val("");
						}
						
					}
				}else{
					$(this).css("margin-bottom","0px");
					$(this).parent().find('.'+str+'').html("用户名不能为纯数字");
					$(this).val("");
				}
				
			}
			if($(this).val() != ""){

					$.ajax({
						method:"post",
						type:"json",
						url:"/users/ajax_name",
						data:"username="+$(this).val(),
						success:function(data){
							if(data != ""){
								$("#registor").find(".username").eq(0).val("");
								alert("该用户名已存在,请重新输入")
							}
						}
					})
				}
		//验证密码	
		}else if($(this).attr("class") == "password"){
			var str = $(this).attr("class");
			if($(this).val() == ""){
				$(this).css("margin-bottom","0px");
				$(this).parent().find('.'+str+'').html("请输入密码");
				$(this).val("");
			}else{
				if(/^[a-zA-Z0-9]{6,16}$/.test($(this).val())){
					
					$(this).css("margin-bottom","30px");
					$(this).parent().find('.'+str+'').html("");
					
				}else{
					if(!($(this).val().length > 4 &&$ (this).val().length <16)){
						$(this).css("margin-bottom","0px");
						$(this).parent().find('.'+str+'').html("密码为6-16组成");
						$(this).val("");
					}else{
						$(this).css("margin-bottom","0px");
						$(this).parent().find('.'+str+'').html(" 密码必须由英文，数字符号组成");
						$(this).val("");
					}
					
				}
			}
		}
	})

})
//产生简单的数字验证码
function createCode(){
	var sum = "";
	var num = "";
	for(var i = 0; i < 4; i++){
		num = parseInt(Math.random()*10);
		sum += num + "";
	}
	return sum;
}
