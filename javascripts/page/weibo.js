require.config({
        paths: {
            jquery: '../lib/jquery-1.10.2'
        }
 }
);

require(["../modules/unit","../modules/weiboFunc",'jquery'],function(u,wFunc,$){
    var weibo = {
        init:function(){
            this.picResize();
            this.weiboFunc();

        },
//微博图片的缩略功能开始
        picResize:function(){

            var smallPicBox = $('.pic-box');
            var bigPicBox= $(".big-pic");

//点击小图大图展示
            for(var j=0;j<smallPicBox.length;j++){
                var smallPicImg = smallPicBox[j].getElementsByTagName("img");
                if(smallPicImg.length == 1){
                    //表示只有一张图片的时候
                    smallPicImg[0].onlyOne = 1;
                }
                else{
                    for( var i = 0;i<smallPicImg.length;i++){
                        smallPicImg[i].index = i;
                    }
                }
                smallPicBox[j].index = j;
//事件委托
                smallPicBox[j].onclick = function(event){
                    var event = event||window.event;
                    var targetDom = event.target||event.srcELement;
                    this.pageNow = targetDom.index;
                    this.style.display = "none";
                    var bigPic = bigPicBox[this.index];
                    bigPic.style.display = "block";
                    //把图片的路径从小换成大
                    bigPic.getElementsByTagName("img")[0].src = u.replaceStrPart(targetDom.src,"thumbnail","bmiddle");
                    //如果只有一张图片，让最小面的选择小图区域隐藏
                    if(targetDom.onlyOne){
                        u.getNodeByClassName(bigPic,"small_choose_box")[0].style.display = "none";
                        u.addClassName(u.getNodeByClassName(bigPic,"pic")[0],"onlyOnePic");
                    }
                    else{
                        u.getNodeByClassName(bigPic,"pic")[0].pageNow = this.pageNow;
                    }
                    if(this.pageNow >= 3 && this.pageNow<=6){
                        var choose_box_ul = u.getNodeByClassName(this.parentNode,"stage_box_ul")[0];
                        u.startMove(choose_box_ul,-60*(this.pageNow-3),"left");
                    }
                };
            }
//点击大图片，小图片显示
            for(var l=0;l<bigPicBox.length;l++){
                var bigPic = u.getNodeByClassName(bigPicBox[l],"pic")[0];
                bigPic.index = l;
//利用事件委托，完成图片缩放、左右点击播放功能
                bigPic.onclick = function(event){
                    var event = event||window.event;
                    var targetDom = event.target||event.srcELement;
                    var targetDomClassname = targetDom.className;
                    switch (targetDomClassname){
                        case 'rightCover':
                            var img = this.getElementsByTagName("img")[0];
                            if(smallPicBox[this.index].getElementsByTagName("li").length == this.pageNow){return ;}
                            else{this.pageNow++;}
                            if(this.pageNow >= 3 && this.pageNow<=6){
                                var choose_box_ul = u.getNodeByClassName(this.parentNode,"stage_box_ul")[0];
                                u.startMove(choose_box_ul,-60*(this.pageNow-3),"left");
                            }
                            var bigImgSrc = u.replaceStrPart(smallPicBox[this.index].getElementsByTagName("img")[this.pageNow].src,"thumbnail","bmiddle");
                            img.src = bigImgSrc;
                            //img.src = smallPicBox[this.index].getElementsByTagName("img")[this.pageNow].src;
                            break;
                        case 'leftCover':var img = this.getElementsByTagName("img")[0];
                            if(this.pageNow == 0){return ;}
                            else{this.pageNow--;}
                            if(this.pageNow >= 3 && this.pageNow<=6){
                                var choose_box_ul = u.getNodeByClassName(this.parentNode,"stage_box_ul")[0];
                                u.startMove(choose_box_ul,-60*(this.pageNow-3),"left");
                            }
                            var bigImgSrc = u.replaceStrPart(smallPicBox[this.index].getElementsByTagName("img")[this.pageNow].src,"thumbnail","bmiddle");
                            img.src = bigImgSrc;
                            //img.src = smallPicBox[this.index].getElementsByTagName("img")[this.pageNow].src;
                            break;
                        case 'img': bigPicBox[this.index].style.display ="none";
                            smallPicBox[this.index].style.display ="block";break;
                    }
                };

            }
//图片的缩略功能结束

//大图片左右点击功能开始
            var sChooseBox =$(".small_choose_box");
            for(i=0;i<sChooseBox.length;i++){
                sChooseBox[i].onclick = function(event){
                    var event = event || window.event;
                    var targetDom = event.target||event.srcElement;
                    var chooseBoxUl = u.getNodeByClassName(this,"stage_box_ul")[0];
                    switch (targetDom.className){
                        case 'pre':if(parseInt(u.getStyle(chooseBoxUl,"left")) <= 0){
                            u.startMove(chooseBoxUl,0,"left");}break;
                        case'next':if(parseInt(u.getStyle(chooseBoxUl,"left"))>=-300){
                            u.startMove(chooseBoxUl,-300,"left"); }break;
                    }
                };
                var liImg = sChooseBox[i].getElementsByTagName("li");
                for(j=0;j<liImg.length;j++){
                    liImg[j].onmouseover = function(){
                        u.startMove(this,1,"opacity")
                    };
                    liImg[j].onmouseout = function(){
                        u.startMove(this,0.5,"opacity")
                    };
                    liImg[j].index = j;
                    liImg[j].onclick = function(event){
                        var event = event || window.event;
                        var pic = u.getPreNode(this.parentNode.parentNode.parentNode);
                        var img = pic.getElementsByTagName("img")[0];
                        //当前页属性加在pic元素上的
                        pic.pageNow = this.index;
                        var bigImgSrc = u.replaceStrPart(this.getElementsByTagName("img")[0].src,"thumbnail","bmiddle");
                        img.src = bigImgSrc;
                        //img.src  = this.getElementsByTagName("img")[0].src;
                        if(event.stopPropagation){event.stopPropagation();}
                        else{event.cancleBubble = true;}
                    }

                }
            }
        },
//微博四个功能：收藏转发赞评论
        weiboFunc:function(){

            var weiboCard = u.getChildByClassname(document.getElementById("weibo"), "wb-card");
            for (l = 0, len = weiboCard.length; l < len; l++) {
                var weiboHandle = u.getChildByClassname(u.getChildByClassname(weiboCard[l], "wb-content"), "wb_handle");
                weiboHandle.onclick = function(event) {
                    var weiboId = this.getAttribute("status_id");
                    var userid = this.getAttribute("userid");

                    var event = event || window.event;
                    var targetDom = event.srcElement || event.target;
                    switch (targetDom.getAttribute("action_type")) {
                        //收藏功能
                        case "collection":
                            var collection = document.getElementById("collection");
                            var cancle_coll = document
                                .getElementById("cancle_coll");

                            var scrollTop = document.body.scrollTop
                                || document.documentElement.scrollTop;
                            if (this.collection == undefined) {
                                collection.style.display = "block";
                                cancle_coll.style.display = "none";
                                collection.style.top = event.clientY + scrollTop
                                    + -270 + "px";
                                collection.style.left = event.clientX + -120 + "px";
                                this.collection = "true";
                            } else {
                                collection.style.display = "none";
                                cancle_coll.style.top = event.clientY + scrollTop
                                    + -120 + "px";
                                cancle_coll.style.left = event.clientX - 120 + "px";
                                cancle_coll.style.display = "block";
                            }
                            break;
                        case "forward":
                            break;
                        //评论功能
                        case "comment":
                            //把写好的死数据显示出来；
                            var comment = u.getNextNode(this);
                            if (comment !== null) {
                                this.parentNode.removeChild(comment);
                            } else {
                                //请求ajax,得到json绘制评论div
                                var parent = this.parentNode;
                                var commentDiv = wFunc.getCommentDiv();
                                parent.appendChild(commentDiv);
                            }
                            //                        getAjax("get", "CommentsOfStatusServlet", function(
                            //                                response) {
                            //                            console.log("評論" + response);
                            //                        }, "status_id=" + weiboId + "&uid=" + userid);
                            break;
                        case "liked":
                            //第一次点击赞和点击赞之后
                            var likedNum = targetDom.innerHTML.replace(/[^0-9]/ig,
                                "");
                            if (this.liked == undefined || this.liked == "false") {
                                if (likedNum == "") {
                                    likedNum = 0;
                                }
                                targetDom.innerHTML = "赞 " + (++likedNum);
                                this.liked = "true";
                            } else {
                                if (likedNum == 1) {
                                    targetDom.innerHTML = "赞 "
                                } else {
                                    targetDom.innerHTML = "赞 " + (--likedNum);
                                }
                                this.liked = "false";
                            }
                            break;
                    }
                };
            }
        }
//微博弹出转发小框框
//        getRepost:function(){
//            "use strict";
//            var oSelectAcc = document.getElementById('selectAcc');
//            var oAccGroup = document.getElementById('accGroup');
//            var oRet = document.getElementById('ret');
//            var oCloseRet = document.getElementById('closeRet');
//            var oShade = document.getElementById('shade');
//            var oRetArticle = document.getElementById('retArticle').getElementsByTagName('p')[0];
//            var oRetArea = document.getElementById('retArea');
//            /*弹出弹窗*/
//            $(document).on('click','a.openRet',function(){
//                var $contentRight = $(this).parent().siblings('.content-right');
//                /*如果点击已被转发微博的转发键*/
//                if(!$contentRight[0]){
//                    var $retweeted = $(this).parent().parent();
//                    var sourceName = $retweeted.siblings('.wb-name').children()[0].innerHTML;
//                    oRetArticle.innerHTML = '<b>'+sourceName+': </b>'+$retweeted.siblings('.wb-text')[0].innerHTML;
//                    oRetArea.innerHTML = '';
//                }else{
//                    var $wbTexts = $contentRight.find('.wb-text');
//                    /*被点击转发的微博的所有者*/
//                    var ownerName = $contentRight.find('.wb-name a')[0].innerHTML;
//                    /*如果这条是转发的微博*/
//                    if($contentRight.find('.wb_expand')[0]){
//                        var sourceName = $contentRight.find('.wb-name a')[1].innerHTML;
//                        oRetArticle.innerHTML = '<b>'+sourceName+': </b>'+$wbTexts[1].innerHTML;
//                        oRetArea.innerHTML = '//@'+ownerName+':'+$wbTexts[0].innerHTML;
//                    }else{
//                        oRetArticle.innerHTML = '<b>@'+ownerName+': </b>'+$wbTexts[0].innerHTML;
//                        oRetArea.innerHTML = '';
//                    }
//                }
//                oRet.style.display='block';
//                oShade.style.display='block';
//            });
//            oSelectAcc.onclick = function(ev){
//                oAccGroup.style.display=='none'?
//                    oAccGroup.style.display='block' : oAccGroup.style.display='none';
//            };
//            oCloseRet.onclick = function(){
//                oRet.style.display='none';
//                oShade.style.display='none';
//            };
//            $('.buttonGroup').on('click','button',function(){
//                $('.retToOption').removeClass('activeOption');
//                this.className+=' activeOption';
//            });
//            $(oAccGroup).on('click','li',function(){
//                var selectName = this.innerHTML;
//                selectAcc.innerHTML=selectName+' <i class="icon icon-angle-down"></i>';
//                oAccGroup.style.display='none';
//            });
//        }
    };

//微博页面初始化
    weibo.init();
});