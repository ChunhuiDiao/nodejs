$(function(){
	$("#login").on("blur","input",function(){
			if($(this).attr("class") == "username"){
				var str = $(this).attr("class");
				if($(this).val() == ""){
			 			$(this).css("margin-bottom","0");
			 			$(this).parent().find('.'+str+'').html("请输入手机号码/邮箱/用户名");
			 			$(this).val("");
			 	}else{
			 		if(/^\+?[1-9][0-9]*$/.test($(this).val())){
						//验证手机号码的长度
						if($(this).val().length != 11){
							$(this).css("margin-bottom","0");
							$(this).parent().find('.'+str+'').html("请输入正确的手机号码");
							$(this).val("");
						}else{
							//正则验证手机号码是否符合规则
							if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($(this).val()))){
								$(this).css("margin-bottom","0");
								$(this).val("");
								$(this).parent().find('.'+str+'').html("请输入正确的手机号码")
							}else{
								$(this).css("margin-bottom","30px");
								$(this).parent().find('.'+str+'').html("")
							}
						}		
					}else{
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
					}
			 	}
			}else if($(this).attr("class") == "password"){
				var str = $(this).attr("class");
				if($(this).val() == ""){
					$(this).css("margin-bottom","0px");
					$(this).parent().find('.'+str+'').html("请输入密码");
					$(this).val("");
				}else{
					if(/^[a-zA-Z0-9]{8,16}$/.test($(this).val())){
						
						$(this).css("margin-bottom","30px");
						$(this).parent().find('.'+str+'').html("");
						
					}else{
						if(!($(this).val().length > 4 &&$ (this).val().length <16)){
							$(this).css("margin-bottom","0px");
							$(this).parent().find('.'+str+'').html("用户名为4-16组成");
							$(this).val("");
						}else{
							$(this).css("margin-bottom","0px");
							$(this).parent().find('.'+str+'').html("用户名只可由中英文，数字符号组成");
							$(this).val("");
						}
						
					}
				}
			}	
	})
})

