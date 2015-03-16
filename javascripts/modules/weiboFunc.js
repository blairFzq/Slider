//微博的功能
define(['../modules/unit'],function(u){
   return{
       /*点击评论，通过json绘制评论div*/
       getCommentDiv:function(json){
        var wbHandle = document.createElement("div");
        wbHandle.className = "wb_handle";

        var content = document.createElement("div");
        content.className = "comment_content";

        var ul = document.createElement("ul");
        ul.className= "comment_content comment_ul";
        var alli="";
        for(var i=0;i<4;i++){
            if(i==3){
                var li = "<li class='last'><img src='http://tp4.sinaimg.cn/2189395835/50/5666429278/0'>" +
                    "<div class='comment_text'><p><span class='user'>張萩玥:" +
                    "</span>中国和外国的嘛，当然啦</p><p class='time'>9分钟前" +
                    "<span class='C_reply'>回复</span></p></div></li>";
            }
            else{
                var li = "<li><img src='http://tp4.sinaimg.cn/2189395835/50/5666429278/0'>" +
                    "<div class='comment_text'><p><span class='user'>張萩玥:" +
                    "</span>中国和外国的嘛，当然啦</p><p class='time'>9分钟前" +
                    "<span class='C_reply'>回复</span></p></div></li>";
            }

            alli +=li;
        }
        ul.innerHTML = alli;
        liarrays = ul.getElementsByTagName("li");
        for(i=0;i<4;i++){
            liarrays[i].onclick = function(event){
                this.commentRely.call(this,event);
            }
        }

        var postComment ="<div class='post_comment'>" +
            "<img src='http://tp4.sinaimg.cn/2189395835/50/5666429278/0'"+
            "alt='' /><form action=''><textarea type='text'/></textarea><span class='icon_smile'>微笑</span>"+
            "<input type='checkbox' /><label for='postwb'>同时转发到我的微博</label><input type='submit'" +
            " value='评论' class='comment_input' /></form></div>";

        content.innerHTML = postComment;
        content.appendChild(ul);
        wbHandle.appendChild(content);
        return wbHandle;

    },
       /*若无回复则添加回复，有则隐藏*/
       commentRely:function(e){
        var event = e || window.event;
        var targetDom = event.srcElement || event.target;
        if(targetDom.className == "C_reply"){
            //如果有有回复框则隐藏
            var lastChild = u.getLastChild(this);
            if(lastChild.className == "reply"){
                lastChild.style.display = "none";
            }
            else{
                var reply = getCommentreplyDiv();
                this.appendChild(reply);
            }
        }
    },
      /*点击评论里面的回复，绘制回复的表单*/
      getCommentreplyDiv:function() {
        var reply =" <div class='comment_reply post_comment'><form action=''>" +
            "<textarea type='text'/></textarea>"+
            "<span class='icon_smile'>微笑</span> <input type='checkbox'/>" +
            "<label for='postwb'>同时转发到我的微博</label>" +
            "<input type='submit' value='评论' class='comment_input' /></form></div>";

        var div = document.createElement("div");
        div.className = "reply";
        div.innerHTML = reply;
        return div;
    }
   };
});