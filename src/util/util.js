/**
 * Created by tl on 2018/3/7.
 */
export function getCookie(name){
  let arr,reg = new RegExp("(^|)"+name+"=([^;]*)(;|$)");
  //new RegExp("(^| )userInfo=([^;]*)(;|$)").exec(document.cookie)[2]
  if(arr = document.cookie.match(reg)){
    return (arr[2]);
  }else{
    return null;
  }
}

