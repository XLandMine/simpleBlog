//obj {
//    btnId: 闇�瑕佷紶鍏ヤ竴涓笂浼犳寜閽甀D锛堝繀浼狅級
//    dragUpload: 鎷栨嫿涓婁紶鍖哄煙id(閫変紶)
//    UploadProgress锛� 涓婁紶鏃剁殑鏂规硶锛岃繑鍥炰笂浼犺繘搴�
//    FileUploaded锛� 涓婁紶鎴愬姛鐨勬柟娉曪紝杩斿洖涓�浜涙湁鐢ㄧ殑淇℃伅
//}
function fileUpload(obj) {
    $.ajax({
        url: "mediaPick/upload",
        type:"get",
        dataType: "json",
        success: function (data) {
            if (data.status != "1") {
                var uptoken = data.data.token;
                var domain = data.data.baseUrl;
                options(uptoken, domain, obj);
            } else {
                //if (data.error == "鏃犳晥鐨凾oken"){
                //    window.location.href = "login.html";
                //}
            }
        }
    });
    function options(uptoken, domain ,obj) {
        Qiniu.tokenInfo = {isExpired: function () {return true;}};
        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',    //涓婁紶妯″紡,渚濇閫�鍖�
            browse_button: obj.btnId,       //涓婁紶閫夋嫨鐨勭偣閫夋寜閽紝**蹇呴渶**
            uptoken: uptoken,            //Ajax璇锋眰upToken鐨刄rl锛�**寮虹儓寤鸿璁剧疆**锛堟湇鍔＄鎻愪緵锛�
            domain: domain,   //bucket 鍩熷悕锛屼笅杞借祫婧愭椂鐢ㄥ埌锛�**蹇呴渶**
            get_new_uptoken: false,  //璁剧疆涓婁紶鏂囦欢鐨勬椂鍊欐槸鍚︽瘡娆￠兘閲嶆柊鑾峰彇鏂扮殑token
            container: 'container',           //涓婁紶鍖哄煙DOM ID锛岄粯璁ゆ槸browser_button鐨勭埗鍏冪礌锛�
            max_file_size: '100mb',           //鏈�澶ф枃浠朵綋绉檺鍒�
            flash_swf_url: 'js/plupload/Moxie.swf',  //寮曞叆flash,鐩稿璺緞
            max_retries: 3,                   //涓婁紶澶辫触鏈�澶ч噸璇曟鏁�
            dragdrop: true,                   //寮�鍚彲鎷栨洺涓婁紶
            drop_element: (obj.dragUpload || "container"),        //鎷栨洺涓婁紶鍖哄煙鍏冪礌鐨処D锛屾嫋鏇虫枃浠舵垨鏂囦欢澶瑰悗鍙Е鍙戜笂浼�
            chunk_size: '4mb',                //鍒嗗潡涓婁紶鏃讹紝姣忕墖鐨勪綋绉�
            auto_start: true,                 //閫夋嫨鏂囦欢鍚庤嚜鍔ㄤ笂浼狅紝鑻ュ叧闂渶瑕佽嚜宸辩粦瀹氫簨浠惰Е鍙戜笂浼�
            unique_names: true,

            init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        obj.FilesAdded && obj.FilesAdded(up, file, obj.index);
                    });
                },
                'BeforeUpload': function(up, file) {
                    obj.BeforeUpload && obj.BeforeUpload(up, file, obj.index);
                },
                'UploadProgress': function(up, file) {
                    obj.UploadProgress && obj.UploadProgress(file.percent, obj.index);
                },
                'FileUploaded': function(up, file, info) {
                    info = JSON.parse(info);
                    var reInfo = {
                        url : domain + info.key,
                        size : info.fsize,
                        w : info.w,
                        h : info.h,
                        type : file.type,
                        md5: info.hash,
                        name: file.name
                    };
                    obj.FileUploaded && obj.FileUploaded(reInfo, obj.index);
                },
                'Error': function(up, err, errTip) {
                    obj.Error && obj.Error(up, file);
                },
                'UploadComplete': function() {
                    obj.UploadComplete && obj.UploadComplete(up, file);
                },
                'Key': function(up, file) {
                    obj.Key && obj.Key(up, file);
                }
            }
        });
    }
}