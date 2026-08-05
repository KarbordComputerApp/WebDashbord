var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

window.addEventListener("pageshow", function (event) {
    var historyTraversal = event.persisted ||
        (typeof window.performance != "undefined" &&
            window.performance.navigation.type === 2);
    if (historyTraversal && isFirefox == false) {
        // Handle page restore.
        window.location.reload();
    }
});

/*
localStorage.removeItem("Karbord_LoginData");
localStorage.removeItem("Karbord_PublicData");
localStorage.removeItem("Karbord_DashbordData");
*/

var apiAccount = 'http://127.0.0.1:902/api/';   //test
//var apiAccount = 'http://192.168.0.106:902/api/';   //local 106
//var apiAccount = 'http://128.65.188.74:802/api/';   //public
//var apiAccount = 'http://185.208.174.64:902/api/';  // interanet



var tiketUrl = 'http://localhost:51091/';
//var tiketUrl = 'http://192.168.0.114:903/';


var urlPage_Login = localStorage.getItem("urlLogin");
var urlPage_Dashbord = localStorage.getItem("urlDashbord");
var urlPage_Index = localStorage.getItem("urlIndex")
var urlPage_Setting = localStorage.getItem("urlSetting")
var urlPage_Erja = localStorage.getItem("urlErja")

var hrefPage = "/";
var hrefWindows = window.location.href.split('/');
if (hrefWindows[3] != "") {
    var hrefPage = '/' + hrefWindows[3] + '/' + hrefWindows[4];
}

var isMobile = window.innerWidth <= 768;
window.onresize = () => {
    if (window.innerWidth <= 768) {// switch to mobile
        isMobile = true;
        grid.opts.disableOneColumnMode = true;
    } else {
        isMobile = false;
        grid.opts.disableOneColumnMode = false;
    }
}

var loginDataDefult =
{
    machineId: null,
    lastMachineId: null,
    apiAccount: apiAccount,
    userName: "",
    password: "",
    account_UserName: "",
    account_Password: "",
    userNameAccount: "",
    baseValue: {
        ace: "",
        defultGroup: null,
        groupsData: [],
    },
    salAcc: "",
    salFct: "",
    salInv: "",
    inbox: 0,
    ip: "",
    countryLogin: "",
    city: "",
    version: sessionStorage.ver,
};

var loginData_Save = localStorage.getItem("Karbord_LoginData");
if (loginData_Save != null && loginData_Save != "[{}]" && loginData_Save.toString() != "null" && loginData_Save.toString() != "") {
    loginData = JSON.parse(loginData_Save);
    if (loginData.length > 0) {
        if (loginData[0].apiAddress == null) {
            loginData = loginDataDefult;
        }
        else {
            loginData = loginData[0];
            var server = loginData.apiAddress;
            var ace = loginData.baseValue.ace;
            var userName = loginData.userName;
            var userNameFa = loginData.userNameFa;
            var companyName = loginData.companyName;
            var password = loginData.password;
            account_UserName = loginData.account_UserName;
            account_Password = loginData.account_Password;
            defultGroup = loginData.baseValue.defultGroup;

            $('#userNameFa').text(userNameFa);
            $('#coName_TitleMenu').val(companyName);
            $('#ace_TitleMenu').val('نرم افزار ' + loginData.progCaption);
        }
    }
    else {
        loginData = loginDataDefult;
    }
    /*$('#userNameHome').text(
        sessionStorage.CoName + ' - سال ' + (sal == "0" ? "" : sal)
    );
    $('#ace_TitleMenu').val(sessionStorage.aceName);
    $('#group_TitleMenu').val(group == "0" ? translate('انتخاب نشده') : group);
    $('#sal_TitleMenu').val(sal == "0" ? translate('انتخاب نشده') : sal);
    */
}
else {
    loginData = loginDataDefult;
    // window.location.href = urlPage_Login;
}

//localStorage.removeItem("Karbord_PublicData");
var publicData_Save = localStorage.getItem("Karbord_PublicData");
if (publicData_Save != null && publicData_Save != "[{}]" && publicData_Save.toString() != "null" && publicData_Save.toString() != "") {
    publicData = JSON.parse(publicData_Save);
    publicData = publicData[0];
    var sal = '';
    var group = '';
    var aceErj = prog_Web2;
    var salErj = '0000';
}


$("#fs").change(function () {
    $('body').css("font-family", $(this).val());
});

$("#size").change(function () {
    $('body').css("font-size", $(this).val() + "px");
});

window.onbeforeunload = function () {
    SaveVariant();
};

function SaveVariant() {
    var myJsonString = JSON.stringify([loginData]);
    localStorage.setItem("Karbord_LoginData", myJsonString);

    if (hrefPage == urlPage_Dashbord) {
        myJsonString = JSON.stringify([publicData]);
        localStorage.setItem("Karbord_PublicData", myJsonString);

        var myJsonString = JSON.stringify(dashbordData)
        localStorage.setItem("Karbord_DashbordData", myJsonString);
    }
}


function SetUrlAccount(serverAccount) {
    AccountUri = serverAccount + 'Account/'; // آدرس حساب
    MessageUri = serverAccount + 'Account/Messages/'; // آدرس پیام ها
}
SetUrlAccount(loginData.apiAccount);

function SetUrl(server) {
    LinkFDocADocUri = server + '/api/Link/LinkFDocADoc/';
    DeleteDocInUseUri = server + '/api/Web_Data/DeleteDocInUse/';
    SaveDocInUseUri = server + '/api/Web_Data/SaveDocInUse/';
    TimeUri = server + '/api/Web_Data/Time/'; // آدرس  ساعت سرور
    SendEmailUri = server + '/api/Web_Data/SendEmail/';
    SmsandEmailUri = server + '/api/Web_Data/SmsandEmail/'; //لیست اطلاعات ایمیل   
    DocInUseUri = server + '/api/Web_Data/DocInUse/';
    LinkFDocIDocUri = server + '/api/Link/LinkFDocIDoc/';
    LinkIDocADocUri = server + '/api/Link/LinkIDocADoc/';
    LinkIDocFDocUri = server + '/api/Link/LinkIDocFDoc/';
    VstrUri = server + '/api/Web_Data/Vstr/';
    ParamUri = server + '/api/Web_Data/Param/'; // آدرس پارامتر
    ChangeDatabaseUri = server + '/api/Web_Data/ChangeDatabase/'; // آدرس بازسازی اطلاعات
    ChangeDatabaseConfigUri = server + '/api/Web_Data/ChangeDatabaseConfig'; // آدرس بازسازی اطلاعات کانفیگ
    DatabseSalUrl = server + '/api/Web_Data/DatabseSal/'; // آدرس دیتابیس های سال
    AccessUri = server + '/api/Web_Data/AccessUser/'; // آدرس سطح دسترسی
    AccessReportUri = server + '/api/Web_Data/AccessUserReport/'; // آدرس سطح دسترسی گزارشات
    AccessReportErjUri = server + '/api/Web_Data/AccessUserReportErj/'; // آدرس سطح دسترسی گزارشات
    CountTableUri = server + '/api/Web_Data/CountTable/'; // تعداد رکورد ها 
    RprtColsSaveUri = server + '/api/Web_Data/RprtColsSave/'; // آدرس ذخیره ستون ها 
    LogOutUri = server + '/api/Web_Data/LogOut'; // خروج کاربر
    LoginTestUri = server + '/api/Web_Data/LoginTest'; // تست ورود کاربر
    RprtColsUri = server + '/api/Web_Data/RprtCols/'; // آدرس مشخصات ستون ها
    RprtColsDefultUri = server + '/api/Web_Data/RprtColsDefult/'; // آدرس مشخصات ستون های پیش فرض
    PrintFormsUri = server + '/api/Web_Data/PrintForms/'; // آدرس فرم های چاپ
    DeletePrintFormUri = server + '/api/Web_Data/DeletePrintForm/'; // آدرس حذف فرم های چاپ
    SavePrintFormUri = server + '/api/Web_Data/SavePrintForm/'; // آدرس ذخیره فرم های چاپ
    TestSavePrintFormUri = server + '/api/Web_Data/TestSavePrintForm/'; // آدرس تست ذخیره فرم های چاپ
    SelectedPrintFormUri = server + '/api/Web_Data/SelectedPrintForm/'; // آدرس انتخاب فرم چاپ
    SelectedAccessGhimatPrintFormUri = server + '/api/Web_Data/SelectedAccessGhimatPrintForm/'; // آدرس دسترسی قیمت فرم چاپ
    DateUri = server + '/api/Web_Data/Date/'; // آدرس  تاریخ سرور
    DictionaryUri = server + '/api/Web_Data/Web_Dictionary/'; // آدرس  دیکشنری
    V_Del_ADocUri = server + '/api/Web_Data/V_Del_ADoc/'; //  آدرس حذف سند کنترل 
    LogXUri = server + '/api/Web_Data/LogX/'; //  آدرس لاگ 
    SaveADoc_RelatedGroupUri = server + '/api/ADocData/SaveADoc_RelatedGroup/'; // آدرس ذخیره سند در گروه وابسته 
    SaveFDoc_RelatedGroupUri = server + '/api/FDocData/SaveFDoc_RelatedGroup/'; // آدرس ذخیره یند فاکتوردر جدول اصلی 
    SaveFDoc_SamaneMakeDocUri = server + '/api/FDocData/SaveFDoc_SamaneMakeDoc/'; // آدرس ذخیره سامانه 
}

if (loginData.apiAddress != null) {
    SetUrl(loginData.apiAddress);
}

function ChangeDatabaseConfig(lockNumber) {
    ajaxFunction(changeDatabaseConfigUri + '/' + lockNumber + '/true', 'GET', null, true).done(function (data) {
        if (data == 'OK') {
            return showNotification(translate('خطا در بازسازی اطلاعات'), 0);
        } else {
            return showNotification(translate('بازسازی اطلاعات با موفقیت انجام شد'), 1);
        }
    });
}

async function ChangeDatabase(lockNumber, ace, group, sal, auto) {
    await ajaxFunction(ChangeDatabaseUri + ace + '/' + sal + '/' + group + '/' + auto + '/' + lockNumber, 'GET', null, true).done(function (data) {
        ViewLoading(false);
        if (data == "OK") {
            showNotification(translate('بازسازی اطلاعات با موفقیت انجام شد'), 1);
        } else {

            if (data.search(translate("لطفا منتظر بمانید")) > 0) {
                return showNotification(data, 0);
            }
            else if (data == "UseLog") {
                showNotification(translate('اطلاعات در حال بازسازی است. لطفا منتظر بمانید'), 2);
            }
            else {
                if (ace == prog_Web8) {
                    return showNotification(translate('اشکال در ایجاد بانک اطلاعاتی . مطمئن باشید که سال مالی') + ' ' + sal + ' ' + translate('برای تمام سیستم ها ایجاد کرده اید') + " <br /> <br />" + data, 0);
                } else {
                    return showNotification(translate('خطا در بازسازی اطلاعات') + " <br /> <br />" + data, 0);
                }
            }
        }
    });

}

function ViewLoading(show) {
    var display = $('#loadingsite').css('display');
    if (show && display == "none") {
        $('#loadingsite').attr('class', 'page-proccess-wrapper');
        $('#loadingsite').css('display', 'block');
    }
    else if (show == false && display == "block") {
        $('#loadingsite').css('display', 'none');
        $('#loadingsite').attr('class', 'page-loader-wrapper');
    }
}

function ajaxFunction(uri, method, data, sync, error) {
    if (account_UserName == null) {
        return showNotification(translate('تنظیمات اتصال را وارد کنید'));
    }
    return $.ajax({
        type: method,
        async: sync == null ? false : sync,
        encoding: 'UTF-8',
        beforeSend: function () {
            if (sync == true) {
                ViewLoading(true);
            }
        },
        url: uri,
        dataType: 'json',

        cache: false,
        timeout: 300000,
        onLoading: showLoad(),
        headers: {
            'userName': account_UserName,
            'password': account_Password,
            'userKarbord': userName,
            'device': "Web"
        },
        complete: function () {
            var n = uri.search("ChangeDatabase");
            if (sync == true && n == -1) {
                ViewLoading(false);
            }
        },
        //async: true,
        //crossDomain: true,
        //cache: false,
        contentType: 'application/json',
        //contentType: 'application/x-www-form-urlencoded',
        // xhrFields: { withCredentials: true },
        data: data ? JSON.stringify(data) : null
        //data: data ? data : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        error != false ?
            showNotification(translate('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید') + '</br>' + textStatus + ' : ' + errorThrown, 3)
            : null;
    });
}

function ajaxFunctionAccount(uri, method, sync, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        async: sync == null ? false : sync,
        beforeSend: function () {
            if (sync == true) {
                ViewLoading(true);
            }
        },
        cache: false,
        timeout: 30000,
        complete: function () {
            if (sync == true) {
                ViewLoading(false);
            }
        },
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        showNotification(translate('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید') + '</br>' + textStatus + ' : ' + errorThrown, 3);
    });
}

function ajaxFunctionOther(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        async: false,
        cache: false,
        timeout: 30000,
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        showNotification(translate('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید') + '</br>' + textStatus + ' : ' + errorThrown, 3);
    });
}

function ajaxFunctionUpload(uri, data, sync) {
    return $.ajax({
        url: uri,
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        async: sync == null ? false : sync,
        beforeSend: function () {
            if (sync == true) {
                ViewLoading(true);
            }
        },

        headers: {
            'userName': account_UserName,
            'password': account_Password,
            'userKarbord': userName,
            'device': 'Web',
        },
        success: function (fileName) {
        },
        complete: function () {
            var n = uri.search("ChangeDatabase");
            if (sync == true && n == -1) {
                ViewLoading(false);
            }
        },
        xhr: function () {
            var fileXhr = $.ajaxSettings.xhr();
            if (fileXhr.upload) {
                $("progress").show();
                fileXhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        $("#fileProgress").attr({
                            value: e.loaded,
                            max: e.total
                        });
                    }
                }, false);
            }
            return fileXhr;
        }
    });
}

function ajaxFunctionPos(uri, method, data, sync, error) {
    return $.ajax({
        type: method,
        async: sync == null ? false : sync,
        encoding: 'UTF-8',
        beforeSend: function () {
            if (sync == true) {
                ViewLoading(true);
            }
        },
        url: uri,
        dataType: 'json',
        cache: false,
        timeout: 300000,
        onLoading: showLoad(),
        headers: {
            'userName': account_UserName,
            'password': account_Password,
            'userKarbord': userName,
            'device': "Web"
        },
        complete: function () {
            var n = uri.search("ChangeDatabase");
            if (sync == true && n == -1) {
                ViewLoading(false);
            }
        },
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
        error != false ?
            showNotification(translate('اشکال در دریافت اطلاعات از سرور . لطفا عملیات را دوباره انجام دهید') + '</br>' + textStatus + ' : ' + errorThrown, 3)
            : null;
    });
}

/*
Fct_or_Inv = localStorage.getItem('Fct_or_Inv');
sessionStorage.userNameFa = localStorage.getItem('userNameFa');
sessionStorage.CoName = localStorage.getItem('CoName');
sessionStorage.aceName = localStorage.getItem('aceName');
*/

/*
if (window.matchMedia('screen and (max-width: 768px)').matches) {
    var a = 10;
}

var w = screen.width;
var h = screen.height;
var ratio = window.devicePixelRatio || 1;
var w = screen.width * ratio;
var h = screen.height * ratio;
var a = navigator.userAgent;
var ratio = window.devicePixelRatio || 1;
var is_touch_device = 'ontouchstart' in document.documentElement;
var touch_status = (is_touch_device) ? 'touch' : 'no-touch';
touch_status = ' ts:' + touch_status;
var width_height = 'wh:' + screen.width + 'x' + screen.height;
var client_width_height = ' cwh:' + document.documentElement.clientWidth + 'x' + document.documentElement.clientHeight;
var rw = screen.width * ratio;
var rh = screen.height * ratio;
var ratio_width_height = ' r:' + ratio + ' rwh:' + rw + 'x' + rh;
var data_string = width_height + client_width_height + ratio_width_height + touch_status;

*/






if (loginData.logoutmin != 0) {
    setInterval(LogOut, loginData.logoutmin * 60000);
}
function LogOut() {
    if (userName != '' && userName != null && hrefPage != urlPage_Login) {
        var LogOutObject = {
            MachineId: loginData.machineId,
            UserCode: userName,
            ProgName: ace
        };
        ajaxFunction(LogOutUri, 'POST', LogOutObject).done(function (data) {
            //RemoveUseSanad(ace, sal, '', 0);
            //RemoveUseSanad(aceErj, salErj, '', 0);
            userName = '';
            loginData.userName = "";
            loginData.password = "";
            publicData.listForms = "";
            SaveVariant();
            window.location.href = urlPage_Login;
        });
    }
}

$('#LogOut').click(function () {
    LogOut();
});

$('#LogOutSetting').click(function () {
    LogOut();
});


function FindParamValue(list, node, key) {
    var data = list.where(c => c.Key == key && c.Node == node)
    if (data.length > 0) {
        return data[0].Param
    }
    return "";
}


function IsNull(key, value) {
    return key == null ? value : key;
}

function getRprtAllCols(ace, group, sal, userName) {
    if (dataGroup[group] == null) {
        dataGroup[group] = {};
    }
    if (dataGroup[group][sal] == null) {
        dataGroup[group][sal] = {};
    }

    if (dataGroup[group][sal]["Columns"] == null) {
        ajaxFunction(RprtColsUri + ace + '/' + sal + '/' + group + '/all/' + userName, 'GET').done(function (data) {
            //data = TranslateData(data);
            var defultColumn = data.filter(s => s.UserCode == "*Default*");
            var userColumn = data.filter(s => s.UserCode == userName);
            if (userColumn.length == 0) {
                userColumn = defultColumn;
            }
            var item = { "dataDefult": defultColumn, "dataUser": userColumn };
            dataGroup[group][sal]["Columns"] = item;
        });
    }
    /*
    if (CheckGroupErj(group)) {
        ajaxFunction(RprtColsUri + aceErj + '/' + salErj + '/' + group + '/all/' + userName, 'GET').done(function (data) {
            data = TranslateData(data);
            localStorage.removeItem('RprtColsErj');
            localStorage.setItem('RprtColsErj', JSON.stringify(data))
        });
    }*/
}


function getRprtCols(group, sal, rprtId, username) {
    var columns = dataGroup[group][sal].Columns.dataUser;
    var result = columns.filter(c => c.RprtId == rprtId && c.UserCode == username && c.Name != "");

    if (result.length == 0) {
        columns = dataGroup[group][sal].Columns.dataDefult;
        result = columns.filter(c => c.RprtId == rprtId && c.UserCode == "*Default*" && c.Name != "");
    }

    var listA = result.where(c => c.Position > 0);
    var listB = result.where(c => c.Position == 0);
    listA.sort(function (a, b) {
        return (a.Position > b.Position) ? 1 : -1
    });
    for (var i = 0; i < listB.length; i++) {
        listA.add(listB[i]);
    }

    return listA;
}



function getRprtColsErj(rprtId, username) {
    data = JSON.parse(localStorage.getItem('RprtColsErj'));
    result = data.filter(s => s.RprtId == rprtId && s.UserCode == username);
    if (result.length == 0)
        result = data.filter(s => s.RprtId == rprtId && s.UserCode == "*Default*");
    return result;
}



async function GetParam(ace, group, sal, refresh, async = false) {
    const param = "params";
    if (dataGroup[group] == null) {
        dataGroup[group] = {};
    }
    if (dataGroup[group][sal] == null) {
        dataGroup[group][sal] = {};
    }
    if (dataGroup[group][sal].replaceDatabase == null)  {
        dataGroup[group][sal].replaceDatabase = false;
        await ChangeDatabase(loginData.lockNumber, ace, group, sal, true);
        dataGroup[group][sal].replaceDatabase = true;
    }

    if (dataGroup[group][sal][param] == null || refresh == true) {
        await ajaxFunction(ParamUri + ace + '/' + sal + '/' + group, 'GET', null, async).done(function (data) {
            var item = { "data": data };
            item.CoName = FindParamValue(data, "CoName", "Value");
            item.BeginDate = FindParamValue(data, "SalMali", "BeginDate");
            item.EndDate = FindParamValue(data, "SalMali", "EndDate");
            item.Deghat = FindParamValue(data, "Deghat", "Deghat");
            dataGroup[group][sal][param] = item;
        });
    }
}

GetAccess_Account(ace);
if (loginData.erj_Access != "")
    GetAccess_Account(prog_Web2);

function GetAccess_Account(prog) {
    if (hrefPage != urlPage_Login) {
        const param = "accountAccess_" + prog;
        if (dataGroup[param] == null) {
            var afiAccess = prog == prog_Web1 ? loginData.afi1_Access : prog == prog_Web2 ? loginData.erj_Access : prog == prog_Web8 ? loginData.afi8_Access : null;
            if (afiAccess == "*") {
                var item = { "*": true };
                dataGroup[param] = item;
            }
            else {
                var afiList = afiAccess.split("*");
                var item = {};
                for (var i = 0; i < afiList.length; i++) {
                    if (afiList[i] != "") {
                        item[afiList[i].toUpperCase()] = true;
                    }
                }
                dataGroup[param] = item;
            }
        }
    }
}


async function GetAccess_Group(prog, group) {

    var acountGroup = false;
    var erjOnly = loginData.baseValue.groupsData.where(c => c.ErjOnly == true && c.Code == group);
    if (erjOnly.length > 0 && prog != prog_Web2) {
        prog = prog_Web2;
    }


    if (prog == prog_Web1 && loginData.afi1_Group.includes(group)) {
        acountGroup = true;
    }
    else if (prog == prog_Web2 && loginData.erj_Group.includes(group)) {
        acountGroup = true;
    }
    else if (prog == prog_Web8 && loginData.afi8_Group.includes(group)) {
        acountGroup = true;
    }



    if (acountGroup) {



        if (dataGroup[group] == null) {
            dataGroup[group] = {};
        }

        if (dataGroup[group]["Access_" + prog] == null) {
            if (userName == user_Ace) {
                dataGroup[group]["Access_" + prog] = { "*": true };
                userModeErj = "ADMIN";
            }
            else {
                await ajaxFunction(AccessUri + prog + '/' + group + '/' + userName, 'GET', null, true).done(function (data) {
                    if (data.length > 0) {
                        var item = {};
                        if (data == "Not access to the group") {
                            return showNotification("دسترسی ندارید", 0);
                        }
                        else {

                            var modeErj = data.where(c => c.OrgProgName == prog_Erj && c.TrsName.toUpperCase() == "ADMIN");
                            if (modeErj.length > 0)
                                userModeErj = "ADMIN";
                            else
                                userModeErj = "USER";


                            for (var i = 0; i < data.length; i++) {
                                if (data[i].TrsName != null) {
                                    var trsName = data[i].TrsName.toUpperCase();
                                    item[data[i].OrgProgName.toUpperCase() + '_' + trsName] = true;

                                    /*if (item.code == access_DOC || item.code == access_RPRT) {
                                        var progs = loginData.progAccess.split('-');
                                        for (var i = 0; i < progs.length; i++) {
                                            item[progs[i].toUpperCase() + '_' + trsName] = true;
                                        }
                                    }
                                    else {
                                        item[data[i].OrgProgName.toUpperCase() + '_' + trsName] = true;
                                    }
                                     if (trsName == access_DOC || trsName == access_RPRT) {
                                         var progs = loginData.accessProg;
                                         if (progs['Afi1'] == true) {
                                             item[prog_Afi.toUpperCase() + '_' + trsName] = true;
                                         }
                                         if (progs['Acc5'] == true) {
                                             item[prog_Acc.toUpperCase() + '_' + trsName] = true;
                                         }
                                         if (progs['Fct5'] == true) {
                                             item[prog_Fct.toUpperCase() + '_' + trsName] = true;
                                         }
                                         if (progs['Inv5'] == true) {
                                             item[prog_Inv.toUpperCase() + '_' + trsName] = true;
                                         }
                                         if (progs['Erj1'] == true) {
                                             item[prog_Erj.toUpperCase() + '_' + trsName] = true;
                                         }
                                     }*/
                                }
                            }
                            dataGroup[group]["Access_" + prog] = item;

                            uri = prog == prog_Web2 ? AccessReportErjUri : AccessReportUri;
                            ajaxFunction(uri + prog + '/' + group + '/' + userName, 'GET', true).done(function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].Trs == true) {
                                        item[access_RPRT + '_' + data[i].Code.toUpperCase()] = true;
                                    }
                                }
                                dataGroup[group]["Access_" + prog] = item;
                            });
                        }
                    }
                });
            }
        }
        return true;
    }

}



function IsAccountAccess(prog, trs) {
    var accountAccess = dataGroup["accountAccess_" + prog];
    return accountAccess['*'] == null ? IsNull(accountAccess[trs.toUpperCase()], false) : true;
}

async function IsAccessTrs(prog, orgProg, group, trs, parent) {
    trs = trs.toUpperCase();
    if (userName == user_Ace) {
        return true;
    }
    await GetAccess_Group(prog, group);
    var groupAccess = dataGroup[group]["Access_" + prog];
    if (groupAccess != null) {
        if (prog == prog_Web1) {
            if (groupAccess[prog_Afi.toUpperCase() + '_ADMIN'])
                return true;
        }
        if (prog == prog_Web2) {
            if (groupAccess[prog_Erj.toUpperCase() + '_ADMIN'])
                return true;
        }
        if (prog == prog_Web8) {
            if (orgProg == prog_Acc && groupAccess[prog_Acc.toUpperCase() + '_ADMIN'])
                return true;
            else if (orgProg == prog_Fct && groupAccess[prog_Fct.toUpperCase() + '_ADMIN'])
                return true;
            else if (orgProg == prog_Inv && groupAccess[prog_Inv.toUpperCase() + '_ADMIN'])
                return true;
        }

        try {
            var param = orgProg.toUpperCase() + '_' + trs;
            if (param == ('ADMIN_' + orgProg)) {
                return true;
            }
            else {
                if (parent == access_RPRT) {
                    param = access_RPRT + '_' + trs;
                }
                return IsNull(groupAccess[param], false)
            }
        } catch (error) {
            alert('IsAccountAccess : ' + error)
            var a = error;
        }
    }
    else
        return false;
}


function ReplaceTrs(trs) {
    if (trs == "TChk_Sum") {
        trs = "TChk";
    }
    else if (trs == "TarazFasli_Chart") {
        trs = "TrzFKala_S";
    }
    else if (trs == "TrzFKala_Chart") {
        trs = "TrzFKala_S";
    }
    else if (trs == "ErjDocB_Last") {
        trs = "ErjDocErja";
    }
    return trs;
}

function ReplaceGroup(group) {
    group = parseInt(group);
    return group < 10 ? "0" + group : group
}

async function IsAccess(prog, orgProg, group, trs, parent) {
    trs = ReplaceTrs(trs);
    var isAccount = parent == "" ? true : IsAccountAccess(prog, trs);
    var isTrs = await IsAccessTrs(prog, orgProg, group, trs, parent);
    if (isTrs && isAccount) {
        return true;
    }
    return false;
};

//loginData.progAccess
/*
var accessMode_Public = [
    { code: access_DOC, caption: "ثبت اسناد", prog: loginData.accessProg, parent: "" },
    { code: access_ADOC, caption: "اسناد حسابداری", prog: [{ code: prog_Fct, access: true }], parent: "" },
    { code: access_FSDOC, caption: "اسناد فروش", prog: [{ code: prog_Fct, access: true }], parent: "" },
    { code: access_FPDOC, caption: "اسناد خرید", prog: [{ code: prog_Fct, access: true }], parent: "" },
    { code: access_RPRT, caption: "گزارشات", prog: loginData.accessProg, parent: "" },
    { code: "TChk_Sum", caption: "چک‌ها پرداختنی به تفکیک بانک", prog: [{ code: prog_Acc, access: true }], parent: access_RPRT },
    { code: "TChk", caption: "صورت خلاصه چک ها", prog: [{ code: prog_Acc, access: true }], parent: access_RPRT },
    { code: "TrzAcc", caption: "تراز حساب", prog: [{ code: prog_Acc, access: true }], parent: access_RPRT },
    { code: "Dftr", caption: "دفتر حساب", prog: [{ code: prog_Acc, access: true }], parent: access_RPRT },
    { code: "ADocR", caption: "دفتر روزنامه", prog: [{ code: prog_Acc, access: true }], parent: access_RPRT },
    { code: "AGMkz", caption: "گردش مراکز هزینه", prog: [{ code: prog_Acc, access: true }], parent: access_RPRT },
    { code: "AGOpr", caption: "گردش پروژه ها", prog: [{ code: prog_Acc, access: true }], parent: access_RPRT },
    { code: "GrdZAcc", caption: "گردش زیر حساب ها", prog: [{ code: prog_Acc, access: true }], parent: access_RPRT },
    { code: "KhlAcc", caption: "صورت خلاصه حساب ها", prog: [{ code: prog_Acc, access: true }], parent: access_RPRT },
    { code: "KhlZAcc", caption: "صورت خلاصه زیر حساب ها", prog: [{ code: prog_Acc, access: true }], parent: access_RPRT },
    { code: "TarazFasli_Chart", caption: "نمودار فروش", prog: [{ code: prog_Fct, access: true }], parent: access_RPRT },
    { code: "TrzFKala_Chart", caption: "بیشترین فروش کالا", prog: [{ code: prog_Fct, access: true }], parent: access_RPRT },
    { code: "TrzFCust_S", caption: "تراز فروش به خریداران", prog: [{ code: prog_Fct, access: true }], parent: access_RPRT },
    { code: "TrzFCust_P", caption: "تراز خرید از فروشندگان", prog: [{ code: prog_Fct, access: true }], parent: access_RPRT },

    //{ code: "TrzFCust_S", caption: "مانده حساب خریداران", prog: [{ code: prog_Fct, access: true }], parent: access_RPRT },
    // { code: "TrzFCust_P", caption: "مانده حساب فروشندگان", prog: [{ code: prog_Fct, access: true }], parent: access_RPRT },
    //{ code: "TrzFKala_S", caption: "بیشترین فروش کالا" , prog: [{ code: prog_Fct, access: true }], parent: access_RPRT},
    { code: "TrzFKala_S", caption: "تراز فروش کالاها", prog: [{ code: prog_Fct, access: true }], parent: access_RPRT },
    { code: "TrzFKala_P", caption: "تراز خرید کالاها", prog: [{ code: prog_Fct, access: true }], parent: access_RPRT },
    { code: "FDocR_S", caption: "ریز گردش اسناد فروش", prog: [{ code: prog_Fct, access: true }], parent: access_RPRT },
    { code: "FDocR_P", caption: "ریز گردش اسناد خرید", prog: [{ code: prog_Fct, access: true }], parent: access_RPRT },
    { code: "Krdx", caption: "کاردکس کالا", prog: [{ code: prog_Inv, access: true }], parent: access_RPRT },
    { code: "IDocR", caption: "ریز گردش اسناد انبارداری", prog: [{ code: prog_Inv, access: true }], parent: access_RPRT },
    { code: "TrzIKala", caption: "موجودی کالا", prog: [{ code: prog_Inv, access: true }], parent: access_RPRT },
    { code: "TrzIKalaExf", caption: "موجودی کالا به تفکیک ویژگی", prog: [{ code: prog_Inv, access: true }], parent: access_RPRT },
    { code: "ErjDocK", caption: "فهرست پرونده ها", prog: [{ code: prog_Erj, access: true }], parent: access_RPRT },
    { code: "ErjDocB_Last", caption: "لیست ارجاعات پرونده ها", prog: [{ code: prog_Erj, access: true }], parent: access_RPRT },
];*/

var accessMode_Public = [
    { code: access_DOC, caption: "ثبت اسناد", prog: loginData.progAccess, parent: "" },
    { code: access_ADOC, caption: "اسناد حسابداری", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: "" },
    { code: access_FSDOC, caption: "اسناد فروش", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: "" },
    { code: access_FPDOC, caption: "اسناد خرید", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: "" },
    { code: access_RPRT, caption: "گزارشات", prog: loginData.progAccess, parent: "" },
    { code: "TChk_Sum", caption: "چک‌ها پرداختنی به تفکیک بانک", prog: ace == prog_Web1 ? prog_Afi : prog_Acc, parent: access_RPRT },
    { code: "TChk", caption: "صورت خلاصه چک ها", prog: ace == prog_Web1 ? prog_Afi : prog_Acc, parent: access_RPRT },
    { code: "TrzAcc", caption: "تراز حساب", prog: ace == prog_Web1 ? prog_Afi : prog_Acc, parent: access_RPRT },
    { code: "Dftr", caption: "دفتر حساب", prog: ace == prog_Web1 ? prog_Afi : prog_Acc, parent: access_RPRT },
    { code: "ADocR", caption: "دفتر روزنامه", prog: ace == prog_Web1 ? prog_Afi : prog_Acc, parent: access_RPRT },
    { code: "AGMkz", caption: "گردش مراکز هزینه", prog: ace == prog_Web1 ? prog_Afi : prog_Acc, parent: access_RPRT },
    { code: "AGOpr", caption: "گردش پروژه ها", prog: ace == prog_Web1 ? prog_Afi : prog_Acc, parent: access_RPRT },
    { code: "GrdZAcc", caption: "گردش زیر حساب ها", prog: ace == prog_Web1 ? prog_Afi : prog_Acc, parent: access_RPRT },
    { code: "KhlAcc", caption: "صورت خلاصه حساب ها", prog: ace == prog_Web1 ? prog_Afi : prog_Acc, parent: access_RPRT },
    { code: "KhlZAcc", caption: "صورت خلاصه زیر حساب ها", prog: ace == prog_Web1 ? prog_Afi : prog_Acc, parent: access_RPRT },
    { code: "TarazFasli_Chart", caption: "نمودار فروش", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT },
    { code: "TrzFKala_Chart", caption: "بیشترین فروش کالا", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT },
    { code: "TrzFCust_S", caption: "تراز فروش به خریداران", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT },
    { code: "TrzFCust_P", caption: "تراز خرید از فروشندگان", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT },
    //{ code: "TrzFCust_S", caption: "مانده حساب خریداران", prog:  ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT },
    // { code: "TrzFCust_P", caption: "مانده حساب فروشندگان", prog:  ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT },
    //{ code: "TrzFKala_S", caption: "بیشترین فروش کالا" , prog:  ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT},
    { code: "TrzFKala_S", caption: "تراز فروش کالاها", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT },
    { code: "TrzFKala_P", caption: "تراز خرید کالاها", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT },
    { code: "FDocR_S", caption: "ریز گردش اسناد فروش", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT },
    { code: "FDocR_P", caption: "ریز گردش اسناد خرید", prog: ace == prog_Web1 ? prog_Afi : prog_Fct, parent: access_RPRT },
    { code: "Krdx", caption: "کاردکس کالا", prog: ace == prog_Web1 ? prog_Afi : prog_Inv, parent: access_RPRT },
    { code: "IDocR", caption: "ریز گردش اسناد انبارداری", prog: ace == prog_Web1 ? prog_Afi : prog_Inv, parent: access_RPRT },
    { code: "TrzIKala", caption: "موجودی کالا", prog: ace == prog_Web1 ? prog_Afi : prog_Inv, parent: access_RPRT },
    { code: "TrzIKalaExf", caption: "موجودی کالا به تفکیک ویژگی", prog: ace == prog_Web1 ? prog_Afi : prog_Inv, parent: access_RPRT },
    { code: "ErjDocK", caption: "فهرست پرونده ها", prog: prog_Erj, parent: access_RPRT },
    { code: "ErjDocB_Last", caption: "لیست ارجاعات پرونده ها", prog: prog_Erj, parent: access_RPRT },
];
loginData.progAccess

if (hrefPage != urlPage_Login) {

}





var caption_Cust = "";
var caption_CustS = "";
if (loginData.fct_or_Inv != null) {
    var caption_Cust = loginData.fct_or_Inv.toUpperCase() == prog_Inv ? "تحویل دهنده/ گیرنده" : "خریدار/فروشنده";
    var caption_CustS = loginData.fct_or_Inv.toUpperCase() == prog_Inv ? "تحویل دهندگان/ گیرندگان" : "خریداران/فروشندگان";
}


$("#BaseCustCaption").text(translate(caption_CustS));
$("#AccessRefresh").hide();

if (sessionStorage.versionTitle == "ورژن تست") {
    $("#AccessRefresh").show();
}

function showLoad() {

}

if (loginData.apiAddress != null) {
    var dict = localStorage.getItem('dict');
    if (dict != null)
        dict = JSON.parse(dict);
    else {
        ajaxFunction(DictionaryUri, 'GET', false, false).done(function (data) {
            a = '{\"en\":{';
            for (var i = 0; i < data.length; i++) {
                a += '"' + data[i].Fa + '": "' + data[i].En + '",';
            }
            a += '"":""'
            a += "},"
            a += '\"ar\": { }}';
            loginData.dict = a;
            dict = JSON.parse(a);
        });
    }
}
loginData.ModeInsertSanad = "New";
var ModeInsertSanad = "New";

if (ModeInsertSanad == "New") {
    $("#ModeInsertSanad").val(0);
}
else {
    $("#ModeInsertSanad").val(1);
}


$("#ModeInsertSanad").change(function () {
    if ($('#ModeInsertSanad').val() == 0) {
        loginData.ModeInsertSanad = "New";
    }
    else {
        loginData.ModeInsertSanad = "Old";
    }
});







var DefultLang = localStorage.getItem('DefultLang');

if (DefultLang == "en") {
    $("#SelectLang").val(1);
    lang = 'en';
    dir_lang = 'ltr';
}
else {
    $("#SelectLang").val(0);
    lang = 'fa';
    dir_lang = 'rtl';
}

var lastSelectLang = $('#SelectLang').val();
$("#SelectLang").change(function () {

    multilang = localStorage.getItem('multilang');
    if (multilang != 'true') {
        $('#SelectLang').val(lastSelectLang);
        return showNotification('دسترسی ندارید', 0);
    }

    if ($('#SelectLang').val() == 1) {
        loginData.DefultLang = "en";
    }
    else {
        loginData.DefultLang = "fa";
    }
    location.reload();
});



//lang = 'fa';

//dir_lang = 'rtl';

function translate(text) {
    if (lang == 'fa' || lang == null || dict == null)
        return text
    else {
        dic = dict[lang][text];
        if (dic == null) {
            return '! ' + text + ' !';
        }
        else
            return dic;
    }
}

function TranslateData(data) {
    if (lang == 'fa')
        return data
    else {
        var tempData = data;
        for (var i = 0; i < data.length; i++) {
            if (tempData[i].Translate == 1) {
                trans = dict[lang][tempData[i].Name];
                if (trans != null)
                    tempData[i].Name = trans;
                else
                    tempData[i].Name = '!! ' + tempData[i].Name + ' !!';
            }
        }
        return tempData;
    }
}

var mes_Refresh = translate('تایید به روز رسانی');
var mes_Delete = translate('تایید حذف');
var text_Yes = translate('بله');
var text_No = translate('خیر');
var mes_SaveRelatedGroup = translate('تایید ذخیره در گروه وابسته');
var mes_DefultColumns = translate('تایید ستون های پیش فرض');



if (lang == 'en') {
    $("body").addClass("right-to-left");
    $(".date").addClass("right-to-left");
    $("body").removeClass("rtlSite");

    $(".sidebar").css({ left: 0 });
    $(".navbar-header").css({ float: "left" });
    $(".navbar-header").css({ "border-top-left-radius": 0 });
    $(".navbar-header").css({ "border-top-right-radius": "50px" });


    $("#leftsidebar").css({ "border-bottom-left-radius": "0px" });
    $("#leftsidebar").css({ "border-bottom-right-radius": "50px" });


    $(".sidemenu-collapse").css({ "padding-left": "44px" });
    $(".sidemenu-collapse").css({ "padding-right": "20px" });


    $("#navbar_Buttom").removeClass("pull-right");
    $("#navbar_Buttom").addClass("pull-left");

    $("#navbar_Menu").removeClass("navbar-right");
    $("#navbar_Menu").addClass("navbar-left");

    $("#content").removeClass("content");
    $("#content").addClass("contentltr");

    $(".form-control").addClass("right-to-left");

    $(".form-label").css({ "left": "0px" });

    $(".menu-toggle").addClass("menu-toggleltr");

    $(".useBlank").css({ "padding-left": "50px" });
    $(".useBlank").css({ "padding-right": "9px" });
    $(".useBlank").css({ "font-family": "Merriweather-Light" });
    $("button").css({ "font-family": "Merriweather-Light" });


    $("button").removeClass("pull-left");
    $("button").addClass("pull-right");

    $(".panel_AllSettingColumns").css({ "direction": "rtl" });


    $("#buttom-header-dropdown").css({ "left": "unset", "right": "15px" });
    $("#refreshKala img").css({ "margin-right": "10px" });
    $("#refreshAcc img").css({ "margin-right": "10px" });
    $("#refreshCust img").css({ "margin-right": "10px" });
    $("#refreshADocH img").css({ "margin-right": "10px" });
    $("#refreshFDocH img").css({ "margin-right": "10px" });
    $("#refreshErjDocH img").css({ "margin-right": "10px" });
    $("#refreshIdocH img").css({ "margin-right": "10px" });
    // $("#buttom-footer-grid-arrow").css({ "direction": "rtl" });

    $(".nextPage-img").attr("src", "/Content/img/list/streamline-icon-navigation-back.png");
    $(".previousPage-img").attr("src", "/Content/img/list/streamline-icon-navigation-next.png");
    $(".lastPage-img").attr("src", "/Content/img/list/streamline-icon-navigation-first.png");

    $(".firstPage-img").attr("src", "/Content/img/list/streamline-icon-navigation-last.png");

    $("#logoMenu").attr("src", "/Content/img/Logo_En.jpg");
    $("#LogoLogin").attr("src", "/Content/img/Login/LogoLogin_En.png");


    $("#footer-grid-rowcount").removeClass("pull-left");
    $("#footer-grid-rowcount").css({ "float": "right" });


    $(".panel_Arrow").css({ "text-align": "right" });
    $(".panel_CountRecord").css({ "text-align": "right" });

    $(".panel_CountRecord_Sanad").addClass("pull-right");


    $(".tableFix").addClass("tableFixltr");
    $(".tableFix").removeClass("tableFix");

    $("select").css({ "font-family": "Merriweather-Light" });

    $("#titleVerNumber").css({ "font-family": "Merriweather-Light" });
    $("#titleVer").css({ "font-family": "Merriweather-Light" });
    $("span").css({ "font-family": "Merriweather-Light" });
    $(".dropdown-menu").addClass("dropdown-menultr");
    // $(".dropdown-menu").removeClass("dropdown-menu");
    $(".popover mds-bootstrap-persian-datetime-picker-popover fade show bs-popover-top").css({ "font-family": "Merriweather-Light" });


}
else {
    $(".panel_CountRecord_Sanad").addClass("pull-left");
}



var ShowNewTab = localStorage.getItem('NewTab');

if (ShowNewTab == "ShowNewTab") {
    $("#NewTab").val(1);
    $('.useBlank').attr('target', '_blank');
}
else {
    $("#NewTab").val(0);
    $('.useBlank').attr('target', '_self');
}


$("#NewTab").change(function () {

    if ($('#NewTab').val() == 1) {
        loginData.NewTab = "ShowNewTab";
        $('.useBlank').attr('target', '_blank');
    }
    else {
        loginData.NewTab = "NotShowNewTab";
        $('.useBlank').attr('target', '_self');
    }
});




var FirstPageUrl = localStorage.getItem('FirstPageUrl');


if (FirstPageUrl == 1) {
    $("#FirstPageUrl").val(1);
}
else {
    $("#FirstPageUrl").val(0);
}


$("#FirstPageUrl").change(function () {
    FirstPageUrl = $('#FirstPageUrl').val();
    loginData.FirstPageUrl = "FirstPageUrl";
});





/*
if (ShowNewTab == "ShowNewTab" && (hrefPage != urlPage_Index && hrefPage != urlPage_Setting && hrefPage != urlPage_Dashbord)) {
    $("#P_Setting").css({ display: "none" });
    //$("#P_Home").css({ display: "none" });
    $("body").addClass("side-closed");
    $("body").addClass("submenu-closed");
    $(".sidebar-user-panel").css({ display: "none" });
}
else {
    $("#P_Setting").css({ display: "block" });
    //$("#P_Home").css({ display: "block" });
    $("body").removeClass("side-closed");
    $("body").removeClass("submenu-closed");
    $(".sidebar-user-panel").css({ display: "block" });
}*/
if (!$("body").hasClass("side-closed")) {
    $("body").addClass("side-closed");
    $("body").addClass("submenu-closed");
    $(".sidebar-user-panel").css({ display: "none" });
    $("#P_Setting").css({ display: "none" });
}

if (ShowNewTab == "ShowNewTab" && hrefPage == urlPage_Index) {
    //$("#P_Home").css({ display: "none" });
}

if (ShowNewTab == "ShowNewTab" && hrefPage == urlPage_Setting) {
    $("#P_Setting").css({ display: "none" });
}

if (ShowNewTab == "ShowNewTab" && hrefPage == urlPage_Dashbord) {
    $("#P_Setting").css({ display: "none" });
}



















sessionStorage.CoName = localStorage.getItem("CoName");

sessionStorage.BeginDateAcc = localStorage.getItem("BeginDateAcc");
sessionStorage.BeginDateFct = localStorage.getItem("BeginDateFct");
sessionStorage.BeginDateInv = localStorage.getItem("BeginDateInv");
sessionStorage.EndDateAcc = localStorage.getItem("EndDateAcc");
sessionStorage.EndDateFct = localStorage.getItem("EndDateFct");
sessionStorage.EndDateInv = localStorage.getItem("EndDateInv");

sessionStorage.DeghatAcc = localStorage.getItem("DeghatAcc");
sessionStorage.DeghatFct = localStorage.getItem("DeghatFct");
sessionStorage.DeghatInv = localStorage.getItem("DeghatInv");

sessionStorage.InvDefult = localStorage.getItem("InvDefult");
sessionStorage.GPriceDefultS = localStorage.getItem("GPriceDefultS");
sessionStorage.GPriceDefultP = localStorage.getItem("GPriceDefultP");
sessionStorage.GPriceDefultI = localStorage.getItem("GPriceDefultI");


sessionStorage.ADOC_TestZeroPrice = localStorage.getItem("ADOC_TestZeroPrice");
sessionStorage.ADOC_TestTraf = localStorage.getItem("ADOC_TestTraf");
sessionStorage.ADOC_TestCheck = localStorage.getItem("ADOC_TestCheck");

sessionStorage.FDOCSO_TestCust = localStorage.getItem("FDOCSO_TestCust");
sessionStorage.FDOCSP_TestCust = localStorage.getItem("FDOCSP_TestCust");
sessionStorage.FDOCS_TestCust = localStorage.getItem("FDOCS_TestCust");
sessionStorage.FDOCSR_TestCust = localStorage.getItem("FDOCSR_TestCust");
sessionStorage.FDOCSH_TestCust = localStorage.getItem("FDOCSH_TestCust");
sessionStorage.FDOCSE_TestCust = localStorage.getItem("FDOCSE_TestCust");
sessionStorage.FDOCPO_TestCust = localStorage.getItem("FDOCPO_TestCust");
sessionStorage.FDOCPP_TestCust = localStorage.getItem("FDOCPP_TestCust");
sessionStorage.FDOCP_TestCust = localStorage.getItem("FDOCP_TestCust");
sessionStorage.FDOCPR_TestCust = localStorage.getItem("FDOCPR_TestCust");

sessionStorage.FDOCSO_TestZeroAmount = localStorage.getItem("FDOCSO_TestZeroAmount");
sessionStorage.FDOCSP_TestZeroAmount = localStorage.getItem("FDOCSP_TestZeroAmount");
sessionStorage.FDOCS_TestZeroAmount = localStorage.getItem("FDOCS_TestZeroAmount");
sessionStorage.FDOCSR_TestZeroAmount = localStorage.getItem("FDOCSR_TestZeroAmount");
sessionStorage.FDOCSH_TestZeroAmount = localStorage.getItem("FDOCSH_TestZeroAmount");
sessionStorage.FDOCSE_TestZeroAmount = localStorage.getItem("FDOCSE_TestZeroAmount");
sessionStorage.FDOCPO_TestZeroAmount = localStorage.getItem("FDOCPO_TestZeroAmount");
sessionStorage.FDOCPP_TestZeroAmount = localStorage.getItem("FDOCPP_TestZeroAmount");
sessionStorage.FDOCP_TestZeroAmount = localStorage.getItem("FDOCP_TestZeroAmount");
sessionStorage.FDOCPR_TestZeroAmount = localStorage.getItem("FDOCPR_TestZeroAmount");

sessionStorage.FDOCSO_TestZeroPrice = localStorage.getItem("FDOCSO_TestZeroPrice");
sessionStorage.FDOCSP_TestZeroPrice = localStorage.getItem("FDOCSP_TestZeroPrice");
sessionStorage.FDOCS_TestZeroPrice = localStorage.getItem("FDOCS_TestZeroPrice");
sessionStorage.FDOCSR_TestZeroPrice = localStorage.getItem("FDOCSR_TestZeroPrice");
sessionStorage.FDOCSH_TestZeroPrice = localStorage.getItem("FDOCSH_TestZeroPrice");
sessionStorage.FDOCSE_TestZeroPrice = localStorage.getItem("FDOCSE_TestZeroPrice");
sessionStorage.FDOCPO_TestZeroPrice = localStorage.getItem("FDOCPO_TestZeroPrice");
sessionStorage.FDOCPP_TestZeroPrice = localStorage.getItem("FDOCPP_TestZeroPrice");
sessionStorage.FDOCP_TestZeroPrice = localStorage.getItem("FDOCP_TestZeroPrice");
sessionStorage.FDOCPR_TestZeroPrice = localStorage.getItem("FDOCPR_TestZeroPrice");

sessionStorage.FDOCSO_TestInv = localStorage.getItem("FDOCSO_TestInv");
sessionStorage.FDOCSP_TestInv = localStorage.getItem("FDOCSP_TestInv");
sessionStorage.FDOCS_TestInv = localStorage.getItem("FDOCS_TestInv");
sessionStorage.FDOCSR_TestInv = localStorage.getItem("FDOCSR_TestInv");
sessionStorage.FDOCSH_TestInv = localStorage.getItem("FDOCSH_TestInv");
sessionStorage.FDOCSE_TestInv = localStorage.getItem("FDOCSE_TestInv");
sessionStorage.FDOCPO_TestInv = localStorage.getItem("FDOCPO_TestInv");
sessionStorage.FDOCPP_TestInv = localStorage.getItem("FDOCPP_TestInv");
sessionStorage.FDOCP_TestInv = localStorage.getItem("FDOCP_TestInv");
sessionStorage.FDOCPR_TestInv = localStorage.getItem("FDOCPR_TestInv");


sessionStorage.IDOCI_TestThvl = localStorage.getItem("IDOCI_TestThvl");
sessionStorage.IDOCO_TestThvl = localStorage.getItem("IDOCO_TestThvl");

sessionStorage.IDOCI_TestZeroAmount = localStorage.getItem("IDOCI_TestZeroAmount");
sessionStorage.IDOCO_TestZeroAmount = localStorage.getItem("IDOCO_TestZeroAmount");

sessionStorage.AllInvSameNo = localStorage.getItem("AllInvSameNo");

sessionStorage.IDOCIAmountAfterBarCode = localStorage.getItem("IDOCIAmountAfterBarCode");
sessionStorage.IDOCOAmountAfterBarCode = localStorage.getItem("IDOCOAmountAfterBarCode");

sessionStorage.FDOCSOAmountAfterBarCode = localStorage.getItem("FDOCSOAmountAfterBarCode");
sessionStorage.FDOCSPAmountAfterBarCode = localStorage.getItem("FDOCSPAmountAfterBarCode");
sessionStorage.FDOCSAmountAfterBarCode = localStorage.getItem("FDOCSAmountAfterBarCode");
sessionStorage.FDOCSRAmountAfterBarCode = localStorage.getItem("FDOCSRAmountAfterBarCode");
sessionStorage.FDOCSHAmountAfterBarCode = localStorage.getItem("FDOCSHAmountAfterBarCode");
sessionStorage.FDOCSEAmountAfterBarCode = localStorage.getItem("FDOCSEAmountAfterBarCode");
sessionStorage.FDOCPOAmountAfterBarCode = localStorage.getItem("FDOCPOAmountAfterBarCode");
sessionStorage.FDOCPPAmountAfterBarCode = localStorage.getItem("FDOCPPAmountAfterBarCode");
sessionStorage.FDOCPAmountAfterBarCode = localStorage.getItem("FDOCPAmountAfterBarCode");
sessionStorage.FDOCPRAmountAfterBarCode = localStorage.getItem("FDOCPRAmountAfterBarCode");


sessionStorage.InvRegKalaInv_SFCT = localStorage.getItem("InvRegKalaInv_SFCT");
sessionStorage.InvRegKalaInv_SRFCT = localStorage.getItem("InvRegKalaInv_SRFCT");
sessionStorage.InvRegKalaInv_PFCT = localStorage.getItem("InvRegKalaInv_PFCT");
sessionStorage.InvRegKalaInv_PRFCT = localStorage.getItem("InvRegKalaInv_PRFCT");




if (ace == prog_Web8) {
    sessionStorage.Move_SCONT = localStorage.getItem("Move_SCONT");
    sessionStorage.Move_SORD = localStorage.getItem("Move_SORD");
    sessionStorage.Move_SPFCT = localStorage.getItem("Move_SPFCT");
    sessionStorage.Move_SFCT = localStorage.getItem("Move_SFCT");
    sessionStorage.Move_SRFCT = localStorage.getItem("Move_SRFCT");
    sessionStorage.Move_SHVL = localStorage.getItem("Move_SHVL");
    sessionStorage.Move_SEXT = localStorage.getItem("Move_SEXT");
    sessionStorage.Move_PCONT = localStorage.getItem("Move_PCONT");
    sessionStorage.Move_PORD = localStorage.getItem("Move_PORD");
    sessionStorage.Move_PPFCT = localStorage.getItem("Move_PPFCT");
    sessionStorage.Move_PFCT = localStorage.getItem("Move_PFCT");
    sessionStorage.Move_PRFCT = localStorage.getItem("Move_PRFCT");
}
else {
    sessionStorage.Move_SPFCT = localStorage.getItem("Move_SPFCT");
    sessionStorage.Move_SFCT = localStorage.getItem("Move_SFCT");
    sessionStorage.Move_SRFCT = localStorage.getItem("Move_SRFCT");
    sessionStorage.Move_PPFCT = localStorage.getItem("Move_PPFCT");
    sessionStorage.Move_PFCT = localStorage.getItem("Move_PFCT");
    sessionStorage.Move_PRFCT = localStorage.getItem("Move_PRFCT");
}

var TahieShode_Acc5;
var TahieShode_Fct5;
var TahieShode_Inv5;



if (ace == prog_Web8) {
    TahieShode_Acc5 = prog_Acc;
    TahieShode_Fct5 = prog_Fct;
    TahieShode_Inv5 = prog_Inv;
}
else if (ace == prog_Web1) {
    TahieShode_Acc5 = prog_Afi;
    TahieShode_Fct5 = prog_Afi;
    TahieShode_Inv5 = prog_Afi;
}






$('#TextUserName').text(userName);
var access = JSON.parse(localStorage.getItem('Access'));
var accessReport = JSON.parse(localStorage.getItem("AccessReport"));

var accessErj = JSON.parse(localStorage.getItem("AccessErj"));
var accessReportErj = JSON.parse(localStorage.getItem("AccessReportErj"));

var salMaliList = JSON.parse(localStorage.getItem("SalMaliList"));

var lockNumber = localStorage.getItem("lockNumber");

const MODECODE_ADOC_A = 1;
const MODECODE_ADOC_EFT = 2;
const MODECODE_ADOC_EKH = 3;
const MODECODE_ADOC_SODZYN = 4;


const titlePrice = ' ریال ';

var listFilter;

var colorRadif = '#d9d9d9';

var ListColumns;

var printName;
var printPublic;
var printVariable = "";
var resTestSavePrintForm = "";


//var id_Autocomplete;
$(".autocomplete").select(function () {

});


$(".autocomplete").click(function () {
    //   $("#p_Statement").hide();
});











function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}



//var MachineId = localStorage.getItem("MachineIdKarbord");
if (loginData.machineIdKarbord == null) {
    var d = new Date();
    id = d.getDate() + d.getTime();
    loginData.machineIdKarbord = id;
}



ParamList = ko.observableArray([]); // پارامتر ها
DatabseSalList = ko.observableArray([]); // دیتابیس های سال
AccessList = ko.observableArray([]); // سطح دسترسی
AccessListReport = ko.observableArray([]); // سطح دسترسی گزارشات

PrintFormsList = ko.observableArray([]); // لیست چاپ 


MessageList = ko.observableArray([]);





$("#Btn_ShowMessage").click(function () {
    if ((lockNumber != '' || lockNumber != null) && sessionStorage.Login == "OK") {
        getMessageList();
    }
});

//Get Message List
function getMessageList() {
    ajaxFunction(MessageUri + lockNumber, 'GET').done(function (data) {
        MessageList(data);
    });
}


selectMessage = function (item) {
    $('#titleMessage').text(item.title);
    $('#bodyMessage').val(item.body);
    $('#modal-Message').modal('show');
}






if (ace == prog_Web1) {
    sessionStorage.MODECODE_FDOC_SO = 0;
    sessionStorage.MODECODE_FDOC_SP = 51;
    sessionStorage.MODECODE_FDOC_S = 52;
    sessionStorage.MODECODE_FDOC_SR = 53;
    sessionStorage.MODECODE_FDOC_SH = 0;
    sessionStorage.MODECODE_FDOC_SE = 0;
    sessionStorage.MODECODE_FDOC_PO = 0;
    sessionStorage.MODECODE_FDOC_PP = 54;
    sessionStorage.MODECODE_FDOC_P = 55;
    sessionStorage.MODECODE_FDOC_PR = 56;
    $('#FDOC_SO').attr('hidden', '');
    $('#FDOC_SH').attr('hidden', '');
    $('#FDOC_SE').attr('hidden', '');
    $('#FDOC_PO').attr('hidden', '');
} else {
    sessionStorage.MODECODE_FDOC_SO = 'SORD';
    sessionStorage.MODECODE_FDOC_SP = 'SPFCT';
    sessionStorage.MODECODE_FDOC_S = 'SFCT';
    sessionStorage.MODECODE_FDOC_SR = 'SRFCT';
    sessionStorage.MODECODE_FDOC_SH = 'SHVL';
    sessionStorage.MODECODE_FDOC_SE = 'SEXT';
    sessionStorage.MODECODE_FDOC_PO = 'PORD';
    sessionStorage.MODECODE_FDOC_PP = 'PPFCT';
    sessionStorage.MODECODE_FDOC_P = 'PFCT';
    sessionStorage.MODECODE_FDOC_PR = 'PRFCT';
    $('#FDOC_SO').removeAttr('hidden', '');
    $('#FDOC_SH').removeAttr('hidden', '');
    $('#FDOC_SE').removeAttr('hidden', '');
    $('#FDOC_PO').removeAttr('hidden', '');
}


const MODECODE_FDOC_SandSR = 81;
const MODECODE_FDOC_PandPR = 82;

const MODECODE_IDOC_AVAL = 101;
const MODECODE_IDOC_I = 102;
const MODECODE_IDOC_ISR = 103;
const MODECODE_IDOC_O = 104;
const MODECODE_IDOC_OPR = 105;
const MODECODE_IDOC_IMOVE = 106;
const MODECODE_IDOC_OMOVE = 107;
const MODECODE_IDOC_IP = 108;
const MODECODE_IDOC_OS = 109;
const MODECODE_IDOC_IMAHSOOL = 110;
const MODECODE_IDOC_OMAVAD = 111;



//تنظیمات هشدار ها

var afiAccessApi;
var erjAccessApi;
var erjGroupApi;


afiaccess = [false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false
]


/*
tempAccess = localStorage.getItem("afi1Access");
if (ace != prog_Web2 && ace != null) {
    if (tempAccess == "null" || tempAccess == "" || tempAccess == null) {
        afiAccessApi = localStorage.getItem('afi8Access');
        if (afiAccessApi != '*')
            afiAccessApi = afiAccessApi.split("*")
    }
    else {
        afiAccessApi = localStorage.getItem('afi1Access');
        if (afiAccessApi != '*')
            afiAccessApi = afiAccessApi.split("*")
        //afiAccessApi = localStorage.getItem('afi1Access').split("*")
    }


    if (afiAccessApi == '*') {
        for (var i = 0; i <= countAccess; i++) {
            afiaccess[i] = true;
        }
    }
    else {



        for (var i = 0; i <= countAccess; i++) {
            afiAccessApi[i] == 'SFCT' ? afiaccess[AP_SFCT] = true : null;
            afiAccessApi[i] == 'SPFCT' ? afiaccess[AP_SPFCT] = true : null;
            afiAccessApi[i] == 'SRFCT' ? afiaccess[AP_SRFCT] = true : null;
            afiAccessApi[i] == 'PFCT' ? afiaccess[AP_PFCT] = true : null;
            afiAccessApi[i] == 'PPFCT' ? afiaccess[AP_PPFCT] = true : null;
            afiAccessApi[i] == 'PRFCT' ? afiaccess[AP_PRFCT] = true : null;
            afiAccessApi[i] == 'IIDOC' ? afiaccess[AP_IIDOC] = true : null;
            afiAccessApi[i] == 'IODOC' ? afiaccess[AP_IODOC] = true : null;
            afiAccessApi[i] == 'TrzIKala' ? afiaccess[AP_TrzIKala] = true : null;
            afiAccessApi[i] == 'TrzIKalaExf' ? afiaccess[AP_TrzIKalaExf] = true : null;
            afiAccessApi[i] == 'IDocR' ? afiaccess[AP_IDocR] = true : null;
            afiAccessApi[i] == 'FDocR_S' ? afiaccess[AP_FDocR_S] = true : null;
            afiAccessApi[i] == 'FDocR_P' ? afiaccess[AP_FDocR_P] = true : null;
            afiAccessApi[i] == 'TrzAcc' ? afiaccess[AP_TrzAcc] = true : null;
            afiAccessApi[i] == 'Dftr' ? afiaccess[AP_Dftr] = true : null;
            afiAccessApi[i] == 'ADocR' ? afiaccess[AP_ADocR] = true : null;
            afiAccessApi[i] == 'TChk' ? afiaccess[AP_TChk] = true : null;
            afiAccessApi[i] == 'TrzFKala_S' ? afiaccess[AP_TrzFKala_S] = true : null;
            afiAccessApi[i] == 'TrzFKala_P' ? afiaccess[AP_TrzFKala_P] = true : null;
            afiAccessApi[i] == 'TrzFCust_S' ? afiaccess[AP_TrzFCust_S] = true : null;
            afiAccessApi[i] == 'TrzFCust_P' ? afiaccess[AP_TrzFCust_P] = true : null;
            afiAccessApi[i] == 'ADOC' ? afiaccess[AP_ADOC] = true : null;
            afiAccessApi[i] == 'SFORD' ? afiaccess[AP_SFORD] = true : null;
            afiAccessApi[i] == 'SHVL' ? afiaccess[AP_SHVL] = true : null;
            afiAccessApi[i] == 'SEXT' ? afiaccess[AP_SEXT] = true : null;
            afiAccessApi[i] == 'PFORD' ? afiaccess[AP_PFORD] = true : null;
            afiAccessApi[i] == 'Krdx' ? afiaccess[AP_Krdx] = true : null;
            afiAccessApi[i] == 'Kala' ? afiaccess[AP_Kala] = true : null;
            afiAccessApi[i] == 'Cust' ? afiaccess[AP_Cust] = true : null;
            afiAccessApi[i] == 'Acc' ? afiaccess[AP_Acc] = true : null;
            afiAccessApi[i] == 'Mkz' ? afiaccess[AP_Mkz] = true : null;
            afiAccessApi[i] == 'Opr' ? afiaccess[AP_Opr] = true : null;
            afiAccessApi[i] == 'AGMkz' ? afiaccess[AP_AGMkz] = true : null;
            afiAccessApi[i] == 'AGOpr' ? afiaccess[AP_AGOpr] = true : null;
            afiAccessApi[i] == 'Arz' ? afiaccess[AP_Arz] = true : null;
            afiAccessApi[i] == 'ZAcc' ? afiaccess[AP_ZAcc] = true : null;
            afiAccessApi[i] == 'GrdZAcc' ? afiaccess[AP_GrdZAcc] = true : null;
            afiAccessApi[i] == 'KhlAcc' ? afiaccess[AP_KhlAcc] = true : null;
            afiAccessApi[i] == 'KhlZAcc' ? afiaccess[AP_KhlZAcc] = true : null;
        }
    }

    if (ace == prog_Web1) {
        afiaccess[AP_TrzIKalaExf] = false; //TrzIKalaExf
        afiaccess[AP_SFORD] = false; //SFORD
        afiaccess[AP_SHVL] = false; //SHVL
        afiaccess[AP_SEXT] = false; //SEXT
        afiaccess[AP_PFORD] = false; //PFORD
        afiaccess[AP_KhlAcc] = false; //AP_KhlAcc
        afiaccess[AP_KhlZAcc] = false; //AP_KhlZAcc
    }

}

if (localStorage.getItem("erjAccess") != null && localStorage.getItem("erjAccess") != "") {
    erjAccessApi = localStorage.getItem("erjAccess");
    if (erjAccessApi != '*')
        erjAccessApi = localStorage.getItem("erjAccess").split("*")

    erjGroupApi = localStorage.getItem("erjList").split("-")
}

*/


function CheckGroupErj(GroupName) {
    if (GroupName == '') {
        return false;
    }
    else {
        if (erjGroupApi != null) {
            for (var i = 0; i < erjGroupApi.length; i++) {
                if (erjGroupApi[i] == GroupName)
                    return true;
            }
        }
        else
            return false;
    }
    return false;
}


erjaccess = [false, false, false, false, false, false]

if (CheckGroupErj(group) == true) {
    if (erjAccessApi == '*') {
        for (var i = 0; i < 5; i++)
            erjaccess[i] = true
    }
    else {
        for (var i = 0; i < 5; i++) {
            erjAccessApi[i] == 'ErjDocK' ? erjaccess[0] = true : null;
            erjAccessApi[i] == 'ErjDocErja' ? erjaccess[1] = true : null;
            erjAccessApi[i] == 'ErjDoc' ? erjaccess[2] = true : null;
            erjAccessApi[i] == 'Erja_Resive' ? erjaccess[3] = true : null;
            erjAccessApi[i] == 'Erja_Send' ? erjaccess[4] = true : null;
        }
    }
}

sessionStorage.placementFrom = 'top';
sessionStorage.placementAlign = 'right';
sessionStorage.animateEnter = '';
sessionStorage.animateExit = '';
sessionStorage.colorName = 'alert-danger';

$("#ADOC").hide();

$("#FDOC_SO").hide();
$("#FDOC_SP").hide();
$("#FDOC_S").hide();
$("#FDOC_SR").hide();
$("#FDOC_SH").hide();
$("#FDOC_SE").hide();
$("#FDOC_PO").hide();
$("#FDOC_PP").hide();
$("#FDOC_P").hide();
$("#FDOC_PR").hide();

$("#IDOC_I").hide();
$("#IDOC_O").hide();

$("#ErjaDOC").hide();


$("#TrzAcc").hide();
$("#Dftr").hide();
$("#ADocR").hide();
$("#TChk").hide();
$("#GrdZAcc").hide();
$("#KhlAcc").hide();
$("#KhlZAcc").hide();


$("#FDocR_S").hide();
$("#FDocR_P").hide();
$("#TrzFKala_S").hide();
$("#TrzFKala_P").hide();
$("#TrzFCust_S").hide();
$("#TrzFCust_P").hide();


$("#TrzIKala").hide();
$("#TrzIKalaExf").hide();
$("#IDocR").hide();
$("#Krdx").hide();

$("#ErjDocK").hide();
$("#ErjDocB_Last").hide();


$("#Dashbord").hide();
$("#Base_Menu").hide();
$("#ADOC_Menu").hide();
$("#FDOC_Menu").hide();
$("#IDOC_Menu").hide();
$("#AReport_Menu").hide();
$("#FReport_Menu").hide();
$("#IReport_Menu").hide();
$("#EReport_Menu").hide();
$("#ErjaDOC_Menu").hide();
$("#P_NotificationErja").hide();

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}


function CountTable(tableName, ModeCode, InOut) {
    ajaxFunction(CountTableUri + ace + '/' + sal + '/' + group + '/' + tableName + '/' + ModeCode + '/' + InOut, 'GET').done(function (dataCount) {
        count = dataCount;
    });
    return count;
}



function SearchArry(Node, Key, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].Node === Node && myArray[i].Key === Key) {
            return myArray[i].Param;
        }
    }
    return '';
}

function SearchMode(name, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].Name === name) {
            return myArray[i].Code;
        }
    }
    return '';
}

function SearchKey(key, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].Key === key) {
            return myArray[i].Value;
        }
    }
    return '';
}

/*
function SetSelectProgram(group, sal) {

    if (loginData.apiAddress == '' || loginData.apiAddress == null) {
        showNotification(translate('دوباره لاگین کنید'), 0);
        //Swal.fire({ type: 'info', title: 'خطا در ورود به نرم افزار', text: 'دوباره لاگین کنید' });
        return false;
    }

    if (ace == '0' || ace == null) {
        showNotification(translate('نرم افزار را انتخاب کنید'), 0);
        //Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'نرم افزار را انتخاب کنید' });
        return false;
    }
    if (group == '0' || group == null) {
        showNotification(translate('گروه را انتخاب کنید'), 0);
        //Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'گروه را انتخاب کنید' });
        return false;
    }
    if (sal == '0' || sal == null) {
        showNotification(translate('سال را انتخاب کنید'), 0);
        //Swal.fire({ type: 'info', title: 'خطا در ورود اطلاعات', text: 'سال را انتخاب کنید' });
        return false;
    }
    try {

        localStorage.setItem('ace', ace);
        localStorage.setItem('group', group);
        localStorage.setItem('sal', sal);

        $('#SaveParam').attr('disabled', 'disabled');

        getParamList();
        getAccessList(true);

        if (ace != prog_Web2)
            getDataVstr();

        $('#SaveParam').removeAttr('disabled');

        localStorage.setItem("ModeCode", '');
        sessionStorage.ModeCode = '';


        getRprtAllCols();

        return true;
    } catch (e) {
        $('#SaveParam').removeAttr('disabled');
        showNotification(translate('خطای ورود') + ' ' + e, 0);
        //Swal.fire({ type: 'danger', title: 'خطای ورود', text: e });
        return false;
    }
}




$("#SaveParam").click(function () {
    group = $("#DropGroup").val();
    sal = $("#DropSal").val();
    SaveParam(group, sal);
});



function SaveParam(group, sal) {
    if (sal == '0000')
        ace = prog_Web2
    else {
        if (localStorage.getItem('afi1List') == 'null' && localStorage.getItem('afi8List') != 'null')
            ace = prog_Web8;
        else
            ace = prog_Web1
    }

    localStorage.setItem('ace', ace);
    localStorage.setItem('group', group);
    localStorage.setItem('sal', sal);

    if (group == '0' || group == null)
        return showNotification(translate('گروه را انتخاب کنید'), 0);

    if (sal == '0' || sal == null)
        return showNotification(translate('سال را انتخاب کنید'), 0);


    //ajaxFunction(ChangeDatabaseFourzeroUri + ace + '/' + group + '/true/' + lockNumber, 'GET', null, true).done(function (data) {});

    ajaxFunction(ChangeDatabaseUri + ace + '/' + sal + '/' + group + '/true/' + lockNumber, 'GET', null, true).done(function (data) {

        localStorage.removeItem('AccStatus');
        localStorage.removeItem('FctStatus');
        localStorage.removeItem('InvStatus');
        localStorage.removeItem('ErjDocYears');

        localStorage.removeItem('Mahramaneh');
        localStorage.removeItem('ErjStatus');


        localStorage.setItem("listKalaUse", "0");
        localStorage.setItem("listCustUse", "0");
        localStorage.setItem("listAccUse", "0");
        localStorage.setItem("listOprUse", "0");
        localStorage.setItem("listMkzUse", "0");
        localStorage.setItem("listArzUse", "0");
        localStorage.setItem("listZAccUse", "0");
        localStorage.setItem("listSanadHesabUse", "0")
        localStorage.setItem("listFactorUse", "0")
        localStorage.setItem("listSanadAnbarUse", "0")
        localStorage.setItem("listErjDocHUse", "0")

        ViewLoading(false);

        if (data != "OK") {

            if (data.search(translate("لطفا منتظر بمانید")) > 0) {
                return showNotification(data, 0);
            }
            else if (data == "UseLog") {
                showNotification(translate('اطلاعات در حال بازسازی است. لطفا منتظر بمانید'), 2);
            }
            else {
                if (ace == prog_Web8) {
                    return showNotification(translate('اشکال در ایجاد بانک اطلاعاتی . مطمئن باشید که سال مالی') + ' ' + sal + ' ' + translate('برای تمام سیستم ها ایجاد کرده اید') + ' ' + " <br /> <br />" + data, 0);
                } else {
                    return showNotification(translate('اشکال در ایجاد بانک اطلاعاتی') + data, 0);
                }
            }
        }


        SetSelectProgram(group, sal);
    });
}

*/
$("#repairDatabase").click(function () {
    group = $("#DropGroup").val();
    sal = $("#DropSal").val();

    if (group == '0' || group == null)
        return showNotification(translate('گروه را انتخاب کنید'), 0);

    if (sal == '0' || sal == null)
        return showNotification(translate('سال را انتخاب کنید'), 0);

    Swal.fire({
        title: translate('بازسازی بانک اطلاعاتی'),
        text: translate("آیا اطلاعات گروه") + ' ' + group + ' ' + translate("سال") + ' ' + sal + translate("بازسازی شود ؟"),
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        cancelButtonText: text_No,
        allowOutsideClick: false,
        confirmButtonColor: '#d33',
        confirmButtonText: text_Yes
    }).then((result) => {
        if (result.value) {

            Swal.fire({
                title: translate('تایید نهایی'),
                text: translate("در زمان بازسازی کاربران دیگر دچار اختلال می شوند . آیا بازسازی انجام شود ؟"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {

                    // ajaxFunction(ChangeDatabaseFourzeroUri + ace + '/' + group + '/false/' + lockNumber, 'GET', null, true).done(function (data) { });
                    ajaxFunction(ChangeDatabaseUri + ace + '/' + sal + '/' + group + '/false/' + lockNumber, 'GET', null, true).done(function (data) {
                        ViewLoading(false);
                        if (data == "OK") {
                            showNotification(translate('بازسازی اطلاعات با موفقیت انجام شد'), 1);
                        } else {

                            if (data.search(translate("لطفا منتظر بمانید")) > 0) {
                                return showNotification(data, 0);
                            }
                            else if (data == "UseLog") {
                                showNotification(translate('اطلاعات در حال بازسازی است. لطفا منتظر بمانید'), 2);
                            }
                            else {
                                if (ace == prog_Web8) {
                                    return showNotification(translate('اشکال در ایجاد بانک اطلاعاتی . مطمئن باشید که سال مالی') + ' ' + sal + ' ' + translate('برای تمام سیستم ها ایجاد کرده اید') + " <br /> <br />" + data, 0);
                                } else {
                                    return showNotification(translate('خطا در بازسازی اطلاعات') + " <br /> <br />" + data, 0);
                                }
                            }
                            //showNotification(data, 0);
                        }
                    });
                }
            })
        }
    })

});





$("#repairDatabaseConfig").click(function () {
    Swal.fire({
        title: translate('بازسازی اطلاعات سیستم'),
        text: translate("آیا اطلاعات بازسازی شود ؟"),
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        cancelButtonText: text_No,
        allowOutsideClick: false,
        confirmButtonColor: '#d33',
        confirmButtonText: text_Yes
    }).then((result) => {
        if (result.value) {

            Swal.fire({
                title: translate('تایید نهایی'),
                text: translate("در زمان بازسازی کاربران دیگر دچار اختلال می شوند . آیا بازسازی انجام شود ؟"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,
                allowOutsideClick: false,
                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    ajaxFunction(ChangeDatabaseConfigUri + '/' + lockNumber + '/false', 'GET', null, true).done(function (data) {
                        ViewLoading(false);
                        if (data == "OK") {
                            showNotification(translate('بازسازی اطلاعات با موفقیت انجام شد'), 1);
                        }
                        else if (data == "UseLog") {
                            showNotification(translate('اطلاعات در حال بازسازی است. لطفا منتظر بمانید'), 2);
                        }
                        else {
                            if (data.search(translate("لطفا منتظر بمانید")) > 0)
                                return showNotification(data, 0);
                            else
                                return showNotification(translate('خطا در بازسازی اطلاعات') + ' ' + " <br /> <br />" + data, 0);
                        }
                    });
                }
            })
        }
    })

});


function getProgName(value) {
    if (ace == prog_Web8) {
        if (value == 'A')
            return prog_Acc;
        else if (value == 'S')
            return prog_Fct;
        else if (value == 'P')
            return prog_Inv;
    }
    else if (ace == prog_Web1)
        return prog_Afi;
    else
        return 'نامشخص';
}



/*
//Get Param List
async function getParamList() {
    ajaxFunction(ParamUri + ace + '/' + sal + '/' + group, 'GET', null, false).done(function (data) {
        ParamList(data);
        $('#information').hide();
        if (self.ParamList().length > 0) {

            sessionStorage.CoName = SearchArry("CoName", "Value", self.ParamList());
            localStorage.setItem("CoName", sessionStorage.CoName);
            $('#coName_TitleMenu').val(sessionStorage.CoName);

            sessionStorage.BeginDate = SearchArry("SalMali", "BeginDate", self.ParamList());
            localStorage.setItem("BeginDateAcc", sessionStorage.BeginDate);
            localStorage.setItem("BeginDateFct", sessionStorage.BeginDate);
            localStorage.setItem("BeginDateInv", sessionStorage.BeginDate);

            sessionStorage.EndDate = SearchArry("SalMali", "EndDate", self.ParamList());
            localStorage.setItem("EndDateAcc", sessionStorage.EndDate);
            localStorage.setItem("EndDateFct", sessionStorage.EndDate);
            localStorage.setItem("EndDateInv", sessionStorage.EndDate);

            sessionStorage.Deghat = SearchArry("Deghat", "Deghat", self.ParamList());
            localStorage.setItem("DeghatAcc", sessionStorage.Deghat);
            localStorage.setItem("DeghatFct", sessionStorage.Deghat);
            localStorage.setItem("DeghatInv", sessionStorage.Deghat);





            sessionStorage.InvDefult = SearchArry("Inv", "Default", self.ParamList());
            localStorage.setItem("InvDefult", sessionStorage.InvDefult);
            sessionStorage.GPriceDefultS = SearchArry("KalaPriceS", "Default", self.ParamList());
            localStorage.setItem("GPriceDefultS", sessionStorage.GPriceDefultS);
            sessionStorage.GPriceDefultP = SearchArry("KalaPriceP", "Default", self.ParamList());
            localStorage.setItem("GPriceDefultP", sessionStorage.GPriceDefultP);
            sessionStorage.GPriceDefultI = SearchArry("KalaPriceI", "Default", self.ParamList());
            localStorage.setItem("GPriceDefultI", sessionStorage.GPriceDefultI);


            sessionStorage.ADOC_TestZeroPrice = SearchArry("ADOC_TestZeroPrice", "ADOC_TestZeroPrice", self.ParamList());
            localStorage.setItem("ADOC_TestZeroPrice", sessionStorage.ADOC_TestZeroPrice);
            sessionStorage.ADOC_TestTraf = SearchArry("ADOC_TestTraf", "ADOC_TestTraf", self.ParamList());
            localStorage.setItem("ADOC_TestTraf", sessionStorage.ADOC_TestTraf);
            sessionStorage.ADOC_TestCheck = SearchArry("ADOC_TestCheck", "ADOC_TestCheck", self.ParamList());
            localStorage.setItem("ADOC_TestCheck", sessionStorage.ADOC_TestCheck);

            sessionStorage.FDOCSO_TestCust = SearchArry("FDOCSO_TestCust", "FDOCSO_TestCust", self.ParamList());
            localStorage.setItem("FDOCSO_TestCust", sessionStorage.FDOCSO_TestCust);
            sessionStorage.FDOCSP_TestCust = SearchArry("FDOCSP_TestCust", "FDOCSP_TestCust", self.ParamList());
            localStorage.setItem("FDOCSP_TestCust", sessionStorage.FDOCSP_TestCust);
            sessionStorage.FDOCS_TestCust = SearchArry("FDOCS_TestCust", "FDOCS_TestCust", self.ParamList());
            localStorage.setItem("FDOCS_TestCust", sessionStorage.FDOCS_TestCust);
            sessionStorage.FDOCSR_TestCust = SearchArry("FDOCSR_TestCust", "FDOCSR_TestCust", self.ParamList());
            localStorage.setItem("FDOCSR_TestCust", sessionStorage.FDOCSR_TestCust);
            sessionStorage.FDOCSH_TestCust = SearchArry("FDOCSH_TestCust", "FDOCSH_TestCust", self.ParamList());
            localStorage.setItem("FDOCSH_TestCust", sessionStorage.FDOCSH_TestCust);
            sessionStorage.FDOCSE_TestCust = SearchArry("FDOCSE_TestCust", "FDOCSE_TestCust", self.ParamList());
            localStorage.setItem("FDOCSE_TestCust", sessionStorage.FDOCSE_TestCust);
            sessionStorage.FDOCPO_TestCust = SearchArry("FDOCPO_TestCust", "FDOCPO_TestCust", self.ParamList());
            localStorage.setItem("FDOCPO_TestCust", sessionStorage.FDOCPO_TestCust);
            sessionStorage.FDOCPP_TestCust = SearchArry("FDOCPP_TestCust", "FDOCPP_TestCust", self.ParamList());
            localStorage.setItem("FDOCPP_TestCust", sessionStorage.FDOCPP_TestCust);
            sessionStorage.FDOCP_TestCust = SearchArry("FDOCP_TestCust", "FDOCP_TestCust", self.ParamList());
            localStorage.setItem("FDOCP_TestCust", sessionStorage.FDOCP_TestCust);
            sessionStorage.FDOCPR_TestCust = SearchArry("FDOCPR_TestCust", "FDOCPR_TestCust", self.ParamList());
            localStorage.setItem("FDOCPR_TestCust", sessionStorage.FDOCPR_TestCust);

            sessionStorage.FDOCSO_TestZeroAmount = SearchArry("FDOCSO_TestZeroAmount", "FDOCSO_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCSO_TestZeroAmount", sessionStorage.FDOCSO_TestZeroAmount);
            sessionStorage.FDOCSP_TestZeroAmount = SearchArry("FDOCSP_TestZeroAmount", "FDOCSP_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCSP_TestZeroAmount", sessionStorage.FDOCSP_TestZeroAmount);
            sessionStorage.FDOCS_TestZeroAmount = SearchArry("FDOCS_TestZeroAmount", "FDOCS_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCS_TestZeroAmount", sessionStorage.FDOCS_TestZeroAmount);
            sessionStorage.FDOCSR_TestZeroAmount = SearchArry("FDOCSR_TestZeroAmount", "FDOCSR_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCSR_TestZeroAmount", sessionStorage.FDOCSR_TestZeroAmount);
            sessionStorage.FDOCSH_TestZeroAmount = SearchArry("FDOCSH_TestZeroAmount", "FDOCSH_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCSH_TestZeroAmount", sessionStorage.FDOCSH_TestZeroAmount);
            sessionStorage.FDOCSE_TestZeroAmount = SearchArry("FDOCSE_TestZeroAmount", "FDOCSE_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCSE_TestZeroAmount", sessionStorage.FDOCSE_TestZeroAmount);
            sessionStorage.FDOCPO_TestZeroAmount = SearchArry("FDOCPO_TestZeroAmount", "FDOCPO_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCPO_TestZeroAmount", sessionStorage.FDOCPO_TestZeroAmount);
            sessionStorage.FDOCPP_TestZeroAmount = SearchArry("FDOCPP_TestZeroAmount", "FDOCPP_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCPP_TestZeroAmount", sessionStorage.FDOCPP_TestZeroAmount);
            sessionStorage.FDOCP_TestZeroAmount = SearchArry("FDOCP_TestZeroAmount", "FDOCP_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCP_TestZeroAmount", sessionStorage.FDOCP_TestZeroAmount);
            sessionStorage.FDOCPR_TestZeroAmount = SearchArry("FDOCPR_TestZeroAmount", "FDOCPR_TestZeroAmount", self.ParamList());
            localStorage.setItem("FDOCPR_TestZeroAmount", sessionStorage.FDOCPR_TestZeroAmount);

            sessionStorage.FDOCSO_TestZeroPrice = SearchArry("FDOCSO_TestZeroPrice", "FDOCSO_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCSO_TestZeroPrice", sessionStorage.FDOCSO_TestZeroPrice);
            sessionStorage.FDOCSP_TestZeroPrice = SearchArry("FDOCSP_TestZeroPrice", "FDOCSP_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCSP_TestZeroPrice", sessionStorage.FDOCSP_TestZeroPrice);
            sessionStorage.FDOCS_TestZeroPrice = SearchArry("FDOCS_TestZeroPrice", "FDOCS_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCS_TestZeroPrice", sessionStorage.FDOCS_TestZeroPrice);
            sessionStorage.FDOCSR_TestZeroPrice = SearchArry("FDOCSR_TestZeroPrice", "FDOCSR_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCSR_TestZeroPrice", sessionStorage.FDOCSR_TestZeroPrice);
            sessionStorage.FDOCSH_TestZeroPrice = SearchArry("FDOCSH_TestZeroPrice", "FDOCSH_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCSH_TestZeroPrice", sessionStorage.FDOCSH_TestZeroPrice);
            sessionStorage.FDOCSE_TestZeroPrice = SearchArry("FDOCSE_TestZeroPrice", "FDOCSE_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCSE_TestZeroPrice", sessionStorage.FDOCSE_TestZeroPrice);
            sessionStorage.FDOCPO_TestZeroPrice = SearchArry("FDOCPO_TestZeroPrice", "FDOCPO_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCPO_TestZeroPrice", sessionStorage.FDOCPO_TestZeroPrice);
            sessionStorage.FDOCPP_TestZeroPrice = SearchArry("FDOCPP_TestZeroPrice", "FDOCPP_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCPP_TestZeroPrice", sessionStorage.FDOCPP_TestZeroPrice);
            sessionStorage.FDOCP_TestZeroPrice = SearchArry("FDOCP_TestZeroPrice", "FDOCP_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCP_TestZeroPrice", sessionStorage.FDOCP_TestZeroPrice);
            sessionStorage.FDOCPR_TestZeroPrice = SearchArry("FDOCPR_TestZeroPrice", "FDOCPR_TestZeroPrice", self.ParamList());
            localStorage.setItem("FDOCPR_TestZeroPrice", sessionStorage.FDOCPR_TestZeroPrice);

            sessionStorage.FDOCSO_TestInv = SearchArry("FDOCSO_TestInv", "FDOCSO_TestInv", self.ParamList());
            localStorage.setItem("FDOCSO_TestInv", sessionStorage.FDOCSO_TestInv);
            sessionStorage.FDOCSP_TestInv = SearchArry("FDOCSP_TestInv", "FDOCSP_TestInv", self.ParamList());
            localStorage.setItem("FDOCSP_TestInv", sessionStorage.FDOCSP_TestInv);
            sessionStorage.FDOCS_TestInv = SearchArry("FDOCS_TestInv", "FDOCS_TestInv", self.ParamList());
            localStorage.setItem("FDOCS_TestInv", sessionStorage.FDOCS_TestInv);
            sessionStorage.FDOCSR_TestInv = SearchArry("FDOCSR_TestInv", "FDOCSR_TestInv", self.ParamList());
            localStorage.setItem("FDOCSR_TestInv", sessionStorage.FDOCSR_TestInv);
            sessionStorage.FDOCSH_TestInv = SearchArry("FDOCSH_TestInv", "FDOCSH_TestInv", self.ParamList());
            localStorage.setItem("FDOCSH_TestInv", sessionStorage.FDOCSH_TestInv);
            sessionStorage.FDOCSE_TestInv = SearchArry("FDOCSE_TestInv", "FDOCSE_TestInv", self.ParamList());
            localStorage.setItem("FDOCSE_TestInv", sessionStorage.FDOCSE_TestInv);
            sessionStorage.FDOCPO_TestInv = SearchArry("FDOCPO_TestInv", "FDOCPO_TestInv", self.ParamList());
            localStorage.setItem("FDOCPO_TestInv", sessionStorage.FDOCPO_TestInv);
            sessionStorage.FDOCPP_TestInv = SearchArry("FDOCPP_TestInv", "FDOCPP_TestInv", self.ParamList());
            localStorage.setItem("FDOCPP_TestInv", sessionStorage.FDOCPP_TestInv);
            sessionStorage.FDOCP_TestInv = SearchArry("FDOCP_TestInv", "FDOCP_TestInv", self.ParamList());
            localStorage.setItem("FDOCP_TestInv", sessionStorage.FDOCP_TestInv);
            sessionStorage.FDOCPR_TestInv = SearchArry("FDOCPR_TestInv", "FDOCPR_TestInv", self.ParamList());
            localStorage.setItem("FDOCPR_TestInv", sessionStorage.FDOCPR_TestInv);


            sessionStorage.IDOCI_TestThvl = SearchArry("IDOCI_TestThvl", "IDOCI_TestThvl", self.ParamList());
            localStorage.setItem("IDOCI_TestThvl", sessionStorage.IDOCI_TestThvl);
            sessionStorage.IDOCO_TestThvl = SearchArry("IDOCO_TestThvl", "IDOCO_TestThvl", self.ParamList());
            localStorage.setItem("IDOCO_TestThvl", sessionStorage.IDOCO_TestThvl);

            sessionStorage.IDOCI_TestZeroAmount = SearchArry("IDOCI_TestZeroAmount", "IDOCI_TestZeroAmount", self.ParamList());
            localStorage.setItem("IDOCI_TestZeroAmount", sessionStorage.IDOCI_TestZeroAmount);
            sessionStorage.IDOCO_TestZeroAmount = SearchArry("IDOCO_TestZeroAmount", "IDOCO_TestZeroAmount", self.ParamList());
            localStorage.setItem("IDOCO_TestZeroAmount", sessionStorage.IDOCO_TestZeroAmount);

            sessionStorage.AllInvSameNo = SearchArry("AllInvSameNo", "AllInvSameNo", self.ParamList());
            localStorage.setItem("AllInvSameNo", sessionStorage.AllInvSameNo);

            sessionStorage.IDOCIAmountAfterBarCode = SearchArry("IDOCIAmountAfterBarCode", "IDOCIAmountAfterBarCode", self.ParamList());
            localStorage.setItem("IDOCIAmountAfterBarCode", sessionStorage.IDOCIAmountAfterBarCode);
            sessionStorage.IDOCOAmountAfterBarCode = SearchArry("IDOCOAmountAfterBarCode", "IDOCOAmountAfterBarCode", self.ParamList());
            localStorage.setItem("IDOCOAmountAfterBarCode", sessionStorage.IDOCOAmountAfterBarCode);

            sessionStorage.FDOCSOAmountAfterBarCode = SearchArry("FDOCSOAmountAfterBarCode", "FDOCSOAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSOAmountAfterBarCode", sessionStorage.FDOCSOAmountAfterBarCode);
            sessionStorage.FDOCSPAmountAfterBarCode = SearchArry("FDOCSPAmountAfterBarCode", "FDOCSPAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSPAmountAfterBarCode", sessionStorage.FDOCSPAmountAfterBarCode);
            sessionStorage.FDOCSAmountAfterBarCode = SearchArry("FDOCSAmountAfterBarCode", "FDOCSAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSAmountAfterBarCode", sessionStorage.FDOCSAmountAfterBarCode);
            sessionStorage.FDOCSRAmountAfterBarCode = SearchArry("FDOCSRAmountAfterBarCode", "FDOCSRAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSRAmountAfterBarCode", sessionStorage.FDOCSRAmountAfterBarCode);
            sessionStorage.FDOCSHAmountAfterBarCode = SearchArry("FDOCSHAmountAfterBarCode", "FDOCSHAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSHAmountAfterBarCode", sessionStorage.FDOCSHAmountAfterBarCode);
            sessionStorage.FDOCSEAmountAfterBarCode = SearchArry("FDOCSEAmountAfterBarCode", "FDOCSEAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCSEAmountAfterBarCode", sessionStorage.FDOCSEAmountAfterBarCode);
            sessionStorage.FDOCPOAmountAfterBarCode = SearchArry("FDOCPOAmountAfterBarCode", "FDOCPOAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCPOAmountAfterBarCode", sessionStorage.FDOCPOAmountAfterBarCode);
            sessionStorage.FDOCPPAmountAfterBarCode = SearchArry("FDOCPPAmountAfterBarCode", "FDOCPPAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCPPAmountAfterBarCode", sessionStorage.FDOCPPAmountAfterBarCode);
            sessionStorage.FDOCPAmountAfterBarCode = SearchArry("FDOCPAmountAfterBarCode", "FDOCPAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCPAmountAfterBarCode", sessionStorage.FDOCPAmountAfterBarCode);
            sessionStorage.FDOCPRAmountAfterBarCode = SearchArry("FDOCPRAmountAfterBarCode", "FDOCPRAmountAfterBarCode", self.ParamList());
            localStorage.setItem("FDOCPRAmountAfterBarCode", sessionStorage.FDOCPRAmountAfterBarCode);

            sessionStorage.ArzCalcMode = SearchArry("ArzCalcMode", "ArzCalcMode", self.ParamList());
            sessionStorage.ArzCalcMode = 1;
            localStorage.setItem("ArzCalcMode", sessionStorage.ArzCalcMode);

            if (ace == prog_Web8) {
                sessionStorage.Move_SCONT = SearchArry("MoveTo", "SCONT", self.ParamList());
                localStorage.setItem("Move_SCONT", sessionStorage.Move_SCONT);
                sessionStorage.Move_SORD = SearchArry("MoveTo", "SORD", self.ParamList());
                localStorage.setItem("Move_SORD", sessionStorage.Move_SORD);
                sessionStorage.Move_SPFCT = SearchArry("MoveTo", "SPFCT", self.ParamList());
                localStorage.setItem("Move_SPFCT", sessionStorage.Move_SPFCT);
                sessionStorage.Move_SFCT = SearchArry("MoveTo", "SFCT", self.ParamList());
                localStorage.setItem("Move_SFCT", sessionStorage.Move_SFCT);
                sessionStorage.Move_SRFCT = SearchArry("MoveTo", "SRFCT", self.ParamList());
                localStorage.setItem("Move_SRFCT", sessionStorage.Move_SRFCT);
                sessionStorage.Move_SHVL = SearchArry("MoveTo", "SHVL", self.ParamList());
                localStorage.setItem("Move_SHVL", sessionStorage.Move_SHVL);
                sessionStorage.Move_SEXT = SearchArry("MoveTo", "SEXT", self.ParamList());
                localStorage.setItem("Move_SEXT", sessionStorage.Move_SEXT);
                sessionStorage.Move_PCONT = SearchArry("MoveTo", "PCONT", self.ParamList());
                localStorage.setItem("Move_PCONT", sessionStorage.Move_PCONT);
                sessionStorage.Move_PORD = SearchArry("MoveTo", "PORD", self.ParamList());
                localStorage.setItem("Move_PORD", sessionStorage.Move_PORD);
                sessionStorage.Move_PPFCT = SearchArry("MoveTo", "PPFCT", self.ParamList());
                localStorage.setItem("Move_PPFCT", sessionStorage.Move_PPFCT);
                sessionStorage.Move_PFCT = SearchArry("MoveTo", "PFCT", self.ParamList());
                localStorage.setItem("Move_PFCT", sessionStorage.Move_PFCT);
                sessionStorage.Move_PRFCT = SearchArry("MoveTo", "PRFCT", self.ParamList());
                localStorage.setItem("Move_PRFCT", sessionStorage.Move_PRFCT);
            }
            else if (ace == prog_Web1) {
                sessionStorage.Move_SPFCT = SearchArry("MoveTo", "51", self.ParamList());
                localStorage.setItem("Move_SPFCT", sessionStorage.Move_SPFCT);
                sessionStorage.Move_SFCT = SearchArry("MoveTo", "52", self.ParamList());
                localStorage.setItem("Move_SFCT", sessionStorage.Move_SFCT);
                sessionStorage.Move_SRFCT = SearchArry("MoveTo", "53", self.ParamList());
                localStorage.setItem("Move_SRFCT", sessionStorage.Move_SRFCT);
                sessionStorage.Move_PPFCT = SearchArry("MoveTo", "54", self.ParamList());
                localStorage.setItem("Move_PPFCT", sessionStorage.Move_PPFCT);
                sessionStorage.Move_PFCT = SearchArry("MoveTo", "55", self.ParamList());
                localStorage.setItem("Move_PFCT", sessionStorage.Move_PFCT);
                sessionStorage.Move_PRFCT = SearchArry("MoveTo", "56", self.ParamList());
                localStorage.setItem("Move_PRFCT", sessionStorage.Move_PRFCT);
            }

            // روش ذخیره انبار در فاکتور
            sessionStorage.InvRegKalaInv_SFCT = SearchArry("InvRegKalaInv", "FDOCS", self.ParamList());
            localStorage.setItem("InvRegKalaInv_SFCT", sessionStorage.InvRegKalaInv_SFCT);
            sessionStorage.InvRegKalaInv_SRFCT = SearchArry("InvRegKalaInv", "FDOCSR", self.ParamList());
            localStorage.setItem("InvRegKalaInv_SRFCT", sessionStorage.InvRegKalaInv_SRFCT);
            sessionStorage.InvRegKalaInv_PFCT = SearchArry("InvRegKalaInv", "FDOCP", self.ParamList());
            localStorage.setItem("InvRegKalaInv_PFCT", sessionStorage.InvRegKalaInv_PFCT);
            sessionStorage.InvRegKalaInv_PRFCT = SearchArry("InvRegKalaInv", "FDOCPR", self.ParamList());
            localStorage.setItem("InvRegKalaInv_PRFCT", sessionStorage.InvRegKalaInv_PRFCT);


            sessionStorage.FDOCS_AutoInvReg = SearchArry("FDOCS_AutoInvReg", "Default", self.ParamList());
            localStorage.setItem("FDOCS_AutoInvReg", sessionStorage.FDOCS_AutoInvReg);
            sessionStorage.FDOCSR_AutoInvReg = SearchArry("FDOCSR_AutoInvReg", "Default", self.ParamList());
            localStorage.setItem("FDOCSR_AutoInvReg", sessionStorage.FDOCSR_AutoInvReg);
            sessionStorage.FDOCP_AutoInvReg = SearchArry("FDOCP_AutoInvReg", "Default", self.ParamList());
            localStorage.setItem("FDOCP_AutoInvReg", sessionStorage.FDOCP_AutoInvReg);
            sessionStorage.FDOCPR_AutoInvReg = SearchArry("FDOCPR_AutoInvReg", "Default", self.ParamList());
            localStorage.setItem("FDOCPR_AutoInvReg", sessionStorage.FDOCPR_AutoInvReg);


            sessionStorage.FDOCS_AutoAccReg = SearchArry("FDOCS_AutoAccReg", "Default", self.ParamList());
            localStorage.setItem("FDOCS_AutoAccReg", sessionStorage.FDOCS_AutoAccReg);
            sessionStorage.FDOCSR_AutoAccReg = SearchArry("FDOCSR_AutoAccReg", "Default", self.ParamList());
            localStorage.setItem("FDOCSR_AutoAccReg", sessionStorage.FDOCSR_AutoAccReg);
            sessionStorage.FDOCP_AutoAccReg = SearchArry("FDOCP_AutoAccReg", "Default", self.ParamList());
            localStorage.setItem("FDOCP_AutoAccReg", sessionStorage.FDOCP_AutoAccReg);
            sessionStorage.FDOCPR_AutoAccReg = SearchArry("FDOCPR_AutoAccReg", "Default", self.ParamList());
            localStorage.setItem("FDOCPR_AutoAccReg", sessionStorage.FDOCPR_AutoAccReg);


            sessionStorage.IDOCI_AutoAccReg = SearchArry("IDOCI_AutoAccReg", "Default", self.ParamList());
            localStorage.setItem("IDOCI_AutoAccReg", sessionStorage.IDOCI_AutoAccReg);
            sessionStorage.IDOCO_AutoAccReg = SearchArry("IDOCO_AutoAccReg", "Default", self.ParamList());
            localStorage.setItem("IDOCO_AutoAccReg", sessionStorage.IDOCO_AutoAccReg);
            sessionStorage.IDOCI_AutoFctReg = SearchArry("IDOCI_AutoFctReg", "Default", self.ParamList());
            localStorage.setItem("IDOCI_AutoFctReg", sessionStorage.IDOCI_AutoFctReg);
            sessionStorage.IDOCO_AutoFctReg = SearchArry("IDOCO_AutoFctReg", "Default", self.ParamList());
            localStorage.setItem("IDOCO_AutoFctReg", sessionStorage.IDOCO_AutoFctReg);


            // گروه وابسته
            sessionStorage.RelatedGroup_Acc = SearchArry("RelatedGroup", "Acc5", self.ParamList());
            localStorage.setItem("RelatedGroup_Acc", sessionStorage.RelatedGroup_Acc);
            sessionStorage.RelatedGroup_Fct = SearchArry("RelatedGroup", prog_Fct, self.ParamList());
            localStorage.setItem("RelatedGroup_Fct", sessionStorage.RelatedGroup_Fct);
            sessionStorage.RelatedGroup_Inv = SearchArry("RelatedGroup", prog_Inv, self.ParamList());
            localStorage.setItem("RelatedGroup_Inv", sessionStorage.RelatedGroup_Inv);

            sessionStorage.RelatedGroupDefault_ADOC = SearchArry("RelatedGroupDefault", "ADOC", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_ADOC", sessionStorage.RelatedGroupDefault_ADOC);

            sessionStorage.RelatedGroupDefault_FDOCSO = SearchArry("RelatedGroupDefault", "FDOCSO", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_FDOCSO", sessionStorage.RelatedGroupDefault_FDOCSO);
            sessionStorage.RelatedGroupDefault_FDOCSP = SearchArry("RelatedGroupDefault", "FDOCSP", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_FDOCSP", sessionStorage.RelatedGroupDefault_FDOCSP);
            sessionStorage.RelatedGroupDefault_FDOCS = SearchArry("RelatedGroupDefault", "FDOCS", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_FDOCS", sessionStorage.RelatedGroupDefault_FDOCS);
            sessionStorage.RelatedGroupDefault_FDOCSR = SearchArry("RelatedGroupDefault", "FDOCSR", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_FDOCSR", sessionStorage.RelatedGroupDefault_FDOCSR);
            sessionStorage.RelatedGroupDefault_FDOCSH = SearchArry("RelatedGroupDefault", "FDOCSH", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_FDOCSH", sessionStorage.RelatedGroupDefault_FDOCSH);
            sessionStorage.RelatedGroupDefault_FDOCSE = SearchArry("RelatedGroupDefault", "FDOCSE", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_FDOCSE", sessionStorage.RelatedGroupDefault_FDOCSE);
            sessionStorage.RelatedGroupDefault_FDOCPO = SearchArry("RelatedGroupDefault", "FDOCPO", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_FDOCPO", sessionStorage.RelatedGroupDefault_FDOCPO);
            sessionStorage.RelatedGroupDefault_FDOCPP = SearchArry("RelatedGroupDefault", "FDOCPP", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_FDOCPP", sessionStorage.RelatedGroupDefault_FDOCPP);
            sessionStorage.RelatedGroupDefault_FDOCP = SearchArry("RelatedGroupDefault", "FDOCP", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_FDOCP", sessionStorage.RelatedGroupDefault_FDOCP);
            sessionStorage.RelatedGroupDefault_FDOCPR = SearchArry("RelatedGroupDefault", "FDOCPR", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_FDOCPR", sessionStorage.RelatedGroupDefault_FDOCPR);

            sessionStorage.RelatedGroupDefault_IDOCI = SearchArry("RelatedGroupDefault", "IDOCI", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_IDOCI", sessionStorage.RelatedGroupDefault_IDOCI);
            sessionStorage.RelatedGroupDefault_IDOCO = SearchArry("RelatedGroupDefault", "IDOCO", self.ParamList());
            localStorage.setItem("RelatedGroupDefault_IDOCO", sessionStorage.RelatedGroupDefault_IDOCO);


            sessionStorage.SamaneValue = SearchArry("Samane", "Value", self.ParamList());
            localStorage.setItem("SamaneValue", sessionStorage.SamaneValue); // 1 avtive    0 disable


            sessionStorage.invSelect = "";
            localStorage.setItem("invSelect", sessionStorage.invSelect);
        }
    });
}





function getParamFct() {
    ajaxFunction(ParamUri + ace + '/' + sal + '/' + group, 'GET', null, false).done(function (data) {
        if (data.length > 0) {
            sessionStorage.BeginDateFct = SearchArry("SalMali", "BeginDate", data);
            localStorage.setItem("BeginDateFct", sessionStorage.BeginDateFct);

            sessionStorage.EndDateFct = SearchArry("SalMali", "EndDate", data);
            localStorage.setItem("EndDateFct", sessionStorage.EndDateFct);

            sessionStorage.DeghatFct = SearchArry("Deghat", "Deghat", data);
            localStorage.setItem("DeghatFct", sessionStorage.DeghatFct);

            sessionStorage.FDOCSO_TestCust = SearchArry("FDOCSO_TestCust", "FDOCSO_TestCust", data);
            localStorage.setItem("FDOCSO_TestCust", sessionStorage.FDOCSO_TestCust);
            sessionStorage.FDOCSP_TestCust = SearchArry("FDOCSP_TestCust", "FDOCSP_TestCust", data);
            localStorage.setItem("FDOCSP_TestCust", sessionStorage.FDOCSP_TestCust);
            sessionStorage.FDOCS_TestCust = SearchArry("FDOCS_TestCust", "FDOCS_TestCust", data);
            localStorage.setItem("FDOCS_TestCust", sessionStorage.FDOCS_TestCust);
            sessionStorage.FDOCSR_TestCust = SearchArry("FDOCSR_TestCust", "FDOCSR_TestCust", data);
            localStorage.setItem("FDOCSR_TestCust", sessionStorage.FDOCSR_TestCust);
            sessionStorage.FDOCSH_TestCust = SearchArry("FDOCSH_TestCust", "FDOCSH_TestCust", data);
            localStorage.setItem("FDOCSH_TestCust", sessionStorage.FDOCSH_TestCust);
            sessionStorage.FDOCSE_TestCust = SearchArry("FDOCSE_TestCust", "FDOCSE_TestCust", data);
            localStorage.setItem("FDOCSE_TestCust", sessionStorage.FDOCSE_TestCust);
            sessionStorage.FDOCPO_TestCust = SearchArry("FDOCPO_TestCust", "FDOCPO_TestCust", data);
            localStorage.setItem("FDOCPO_TestCust", sessionStorage.FDOCPO_TestCust);
            sessionStorage.FDOCPP_TestCust = SearchArry("FDOCPP_TestCust", "FDOCPP_TestCust", data);
            localStorage.setItem("FDOCPP_TestCust", sessionStorage.FDOCPP_TestCust);
            sessionStorage.FDOCP_TestCust = SearchArry("FDOCP_TestCust", "FDOCP_TestCust", data);
            localStorage.setItem("FDOCP_TestCust", sessionStorage.FDOCP_TestCust);
            sessionStorage.FDOCPR_TestCust = SearchArry("FDOCPR_TestCust", "FDOCPR_TestCust", data);
            localStorage.setItem("FDOCPR_TestCust", sessionStorage.FDOCPR_TestCust);

            sessionStorage.FDOCSO_TestZeroAmount = SearchArry("FDOCSO_TestZeroAmount", "FDOCSO_TestZeroAmount", data);
            localStorage.setItem("FDOCSO_TestZeroAmount", sessionStorage.FDOCSO_TestZeroAmount);
            sessionStorage.FDOCSP_TestZeroAmount = SearchArry("FDOCSP_TestZeroAmount", "FDOCSP_TestZeroAmount", data);
            localStorage.setItem("FDOCSP_TestZeroAmount", sessionStorage.FDOCSP_TestZeroAmount);
            sessionStorage.FDOCS_TestZeroAmount = SearchArry("FDOCS_TestZeroAmount", "FDOCS_TestZeroAmount", data);
            localStorage.setItem("FDOCS_TestZeroAmount", sessionStorage.FDOCS_TestZeroAmount);
            sessionStorage.FDOCSR_TestZeroAmount = SearchArry("FDOCSR_TestZeroAmount", "FDOCSR_TestZeroAmount", data);
            localStorage.setItem("FDOCSR_TestZeroAmount", sessionStorage.FDOCSR_TestZeroAmount);
            sessionStorage.FDOCSH_TestZeroAmount = SearchArry("FDOCSH_TestZeroAmount", "FDOCSH_TestZeroAmount", data);
            localStorage.setItem("FDOCSH_TestZeroAmount", sessionStorage.FDOCSH_TestZeroAmount);
            sessionStorage.FDOCSE_TestZeroAmount = SearchArry("FDOCSE_TestZeroAmount", "FDOCSE_TestZeroAmount", data);
            localStorage.setItem("FDOCSE_TestZeroAmount", sessionStorage.FDOCSE_TestZeroAmount);
            sessionStorage.FDOCPO_TestZeroAmount = SearchArry("FDOCPO_TestZeroAmount", "FDOCPO_TestZeroAmount", data);
            localStorage.setItem("FDOCPO_TestZeroAmount", sessionStorage.FDOCPO_TestZeroAmount);
            sessionStorage.FDOCPP_TestZeroAmount = SearchArry("FDOCPP_TestZeroAmount", "FDOCPP_TestZeroAmount", data);
            localStorage.setItem("FDOCPP_TestZeroAmount", sessionStorage.FDOCPP_TestZeroAmount);
            sessionStorage.FDOCP_TestZeroAmount = SearchArry("FDOCP_TestZeroAmount", "FDOCP_TestZeroAmount", data);
            localStorage.setItem("FDOCP_TestZeroAmount", sessionStorage.FDOCP_TestZeroAmount);
            sessionStorage.FDOCPR_TestZeroAmount = SearchArry("FDOCPR_TestZeroAmount", "FDOCPR_TestZeroAmount", data);
            localStorage.setItem("FDOCPR_TestZeroAmount", sessionStorage.FDOCPR_TestZeroAmount);

            sessionStorage.FDOCSO_TestZeroPrice = SearchArry("FDOCSO_TestZeroPrice", "FDOCSO_TestZeroPrice", data);
            localStorage.setItem("FDOCSO_TestZeroPrice", sessionStorage.FDOCSO_TestZeroPrice);
            sessionStorage.FDOCSP_TestZeroPrice = SearchArry("FDOCSP_TestZeroPrice", "FDOCSP_TestZeroPrice", data);
            localStorage.setItem("FDOCSP_TestZeroPrice", sessionStorage.FDOCSP_TestZeroPrice);
            sessionStorage.FDOCS_TestZeroPrice = SearchArry("FDOCS_TestZeroPrice", "FDOCS_TestZeroPrice", data);
            localStorage.setItem("FDOCS_TestZeroPrice", sessionStorage.FDOCS_TestZeroPrice);
            sessionStorage.FDOCSR_TestZeroPrice = SearchArry("FDOCSR_TestZeroPrice", "FDOCSR_TestZeroPrice", data);
            localStorage.setItem("FDOCSR_TestZeroPrice", sessionStorage.FDOCSR_TestZeroPrice);
            sessionStorage.FDOCSH_TestZeroPrice = SearchArry("FDOCSH_TestZeroPrice", "FDOCSH_TestZeroPrice", data);
            localStorage.setItem("FDOCSH_TestZeroPrice", sessionStorage.FDOCSH_TestZeroPrice);
            sessionStorage.FDOCSE_TestZeroPrice = SearchArry("FDOCSE_TestZeroPrice", "FDOCSE_TestZeroPrice", data);
            localStorage.setItem("FDOCSE_TestZeroPrice", sessionStorage.FDOCSE_TestZeroPrice);
            sessionStorage.FDOCPO_TestZeroPrice = SearchArry("FDOCPO_TestZeroPrice", "FDOCPO_TestZeroPrice", data);
            localStorage.setItem("FDOCPO_TestZeroPrice", sessionStorage.FDOCPO_TestZeroPrice);
            sessionStorage.FDOCPP_TestZeroPrice = SearchArry("FDOCPP_TestZeroPrice", "FDOCPP_TestZeroPrice", data);
            localStorage.setItem("FDOCPP_TestZeroPrice", sessionStorage.FDOCPP_TestZeroPrice);
            sessionStorage.FDOCP_TestZeroPrice = SearchArry("FDOCP_TestZeroPrice", "FDOCP_TestZeroPrice", data);
            localStorage.setItem("FDOCP_TestZeroPrice", sessionStorage.FDOCP_TestZeroPrice);
            sessionStorage.FDOCPR_TestZeroPrice = SearchArry("FDOCPR_TestZeroPrice", "FDOCPR_TestZeroPrice", data);
            localStorage.setItem("FDOCPR_TestZeroPrice", sessionStorage.FDOCPR_TestZeroPrice);

            sessionStorage.FDOCSO_TestInv = SearchArry("FDOCSO_TestInv", "FDOCSO_TestInv", data);
            localStorage.setItem("FDOCSO_TestInv", sessionStorage.FDOCSO_TestInv);
            sessionStorage.FDOCSP_TestInv = SearchArry("FDOCSP_TestInv", "FDOCSP_TestInv", data);
            localStorage.setItem("FDOCSP_TestInv", sessionStorage.FDOCSP_TestInv);
            sessionStorage.FDOCS_TestInv = SearchArry("FDOCS_TestInv", "FDOCS_TestInv", data);
            localStorage.setItem("FDOCS_TestInv", sessionStorage.FDOCS_TestInv);
            sessionStorage.FDOCSR_TestInv = SearchArry("FDOCSR_TestInv", "FDOCSR_TestInv", data);
            localStorage.setItem("FDOCSR_TestInv", sessionStorage.FDOCSR_TestInv);
            sessionStorage.FDOCSH_TestInv = SearchArry("FDOCSH_TestInv", "FDOCSH_TestInv", data);
            localStorage.setItem("FDOCSH_TestInv", sessionStorage.FDOCSH_TestInv);
            sessionStorage.FDOCSE_TestInv = SearchArry("FDOCSE_TestInv", "FDOCSE_TestInv", data);
            localStorage.setItem("FDOCSE_TestInv", sessionStorage.FDOCSE_TestInv);
            sessionStorage.FDOCPO_TestInv = SearchArry("FDOCPO_TestInv", "FDOCPO_TestInv", data);
            localStorage.setItem("FDOCPO_TestInv", sessionStorage.FDOCPO_TestInv);
            sessionStorage.FDOCPP_TestInv = SearchArry("FDOCPP_TestInv", "FDOCPP_TestInv", data);
            localStorage.setItem("FDOCPP_TestInv", sessionStorage.FDOCPP_TestInv);
            sessionStorage.FDOCP_TestInv = SearchArry("FDOCP_TestInv", "FDOCP_TestInv", data);
            localStorage.setItem("FDOCP_TestInv", sessionStorage.FDOCP_TestInv);
            sessionStorage.FDOCPR_TestInv = SearchArry("FDOCPR_TestInv", "FDOCPR_TestInv", data);
            localStorage.setItem("FDOCPR_TestInv", sessionStorage.FDOCPR_TestInv);

            sessionStorage.FDOCSOAmountAfterBarCode = SearchArry("FDOCSOAmountAfterBarCode", "FDOCSOAmountAfterBarCode", data);
            localStorage.setItem("FDOCSOAmountAfterBarCode", sessionStorage.FDOCSOAmountAfterBarCode);
            sessionStorage.FDOCSPAmountAfterBarCode = SearchArry("FDOCSPAmountAfterBarCode", "FDOCSPAmountAfterBarCode", data);
            localStorage.setItem("FDOCSPAmountAfterBarCode", sessionStorage.FDOCSPAmountAfterBarCode);
            sessionStorage.FDOCSAmountAfterBarCode = SearchArry("FDOCSAmountAfterBarCode", "FDOCSAmountAfterBarCode", data);
            localStorage.setItem("FDOCSAmountAfterBarCode", sessionStorage.FDOCSAmountAfterBarCode);
            sessionStorage.FDOCSRAmountAfterBarCode = SearchArry("FDOCSRAmountAfterBarCode", "FDOCSRAmountAfterBarCode", data);
            localStorage.setItem("FDOCSRAmountAfterBarCode", sessionStorage.FDOCSRAmountAfterBarCode);
            sessionStorage.FDOCSHAmountAfterBarCode = SearchArry("FDOCSHAmountAfterBarCode", "FDOCSHAmountAfterBarCode", data);
            localStorage.setItem("FDOCSHAmountAfterBarCode", sessionStorage.FDOCSHAmountAfterBarCode);
            sessionStorage.FDOCSEAmountAfterBarCode = SearchArry("FDOCSEAmountAfterBarCode", "FDOCSEAmountAfterBarCode", data);
            localStorage.setItem("FDOCSEAmountAfterBarCode", sessionStorage.FDOCSEAmountAfterBarCode);
            sessionStorage.FDOCPOAmountAfterBarCode = SearchArry("FDOCPOAmountAfterBarCode", "FDOCPOAmountAfterBarCode", data);
            localStorage.setItem("FDOCPOAmountAfterBarCode", sessionStorage.FDOCPOAmountAfterBarCode);
            sessionStorage.FDOCPPAmountAfterBarCode = SearchArry("FDOCPPAmountAfterBarCode", "FDOCPPAmountAfterBarCode", data);
            localStorage.setItem("FDOCPPAmountAfterBarCode", sessionStorage.FDOCPPAmountAfterBarCode);
            sessionStorage.FDOCPAmountAfterBarCode = SearchArry("FDOCPAmountAfterBarCode", "FDOCPAmountAfterBarCode", data);
            localStorage.setItem("FDOCPAmountAfterBarCode", sessionStorage.FDOCPAmountAfterBarCode);
            sessionStorage.FDOCPRAmountAfterBarCode = SearchArry("FDOCPRAmountAfterBarCode", "FDOCPRAmountAfterBarCode", data);
            localStorage.setItem("FDOCPRAmountAfterBarCode", sessionStorage.FDOCPRAmountAfterBarCode);

            if (ace == prog_Web8) {
                sessionStorage.Move_SCONT = SearchArry("MoveTo", "SCONT", data);
                localStorage.setItem("Move_SCONT", sessionStorage.Move_SCONT);
                sessionStorage.Move_SORD = SearchArry("MoveTo", "SORD", data);
                localStorage.setItem("Move_SORD", sessionStorage.Move_SORD);
                sessionStorage.Move_SPFCT = SearchArry("MoveTo", "SPFCT", data);
                localStorage.setItem("Move_SPFCT", sessionStorage.Move_SPFCT);
                sessionStorage.Move_SFCT = SearchArry("MoveTo", "SFCT", data);
                localStorage.setItem("Move_SFCT", sessionStorage.Move_SFCT);
                sessionStorage.Move_SRFCT = SearchArry("MoveTo", "SRFCT", data);
                localStorage.setItem("Move_SRFCT", sessionStorage.Move_SRFCT);
                sessionStorage.Move_SHVL = SearchArry("MoveTo", "SHVL", data);
                localStorage.setItem("Move_SHVL", sessionStorage.Move_SHVL);
                sessionStorage.Move_SEXT = SearchArry("MoveTo", "SEXT", data);
                localStorage.setItem("Move_SEXT", sessionStorage.Move_SEXT);
                sessionStorage.Move_PCONT = SearchArry("MoveTo", "PCONT", data);
                localStorage.setItem("Move_PCONT", sessionStorage.Move_PCONT);
                sessionStorage.Move_PORD = SearchArry("MoveTo", "PORD", data);
                localStorage.setItem("Move_PORD", sessionStorage.Move_PORD);
                sessionStorage.Move_PPFCT = SearchArry("MoveTo", "PPFCT", data);
                localStorage.setItem("Move_PPFCT", sessionStorage.Move_PPFCT);
                sessionStorage.Move_PFCT = SearchArry("MoveTo", "PFCT", data);
                localStorage.setItem("Move_PFCT", sessionStorage.Move_PFCT);
                sessionStorage.Move_PRFCT = SearchArry("MoveTo", "PRFCT", data);
                localStorage.setItem("Move_PRFCT", sessionStorage.Move_PRFCT);
            }
            else if (ace == prog_Web1) {
                sessionStorage.Move_SPFCT = SearchArry("MoveTo", "51", data);
                localStorage.setItem("Move_SPFCT", sessionStorage.Move_SPFCT);
                sessionStorage.Move_SFCT = SearchArry("MoveTo", "52", data);
                localStorage.setItem("Move_SFCT", sessionStorage.Move_SFCT);
                sessionStorage.Move_SRFCT = SearchArry("MoveTo", "53", data);
                localStorage.setItem("Move_SRFCT", sessionStorage.Move_SRFCT);
                sessionStorage.Move_PPFCT = SearchArry("MoveTo", "54", data);
                localStorage.setItem("Move_PPFCT", sessionStorage.Move_PPFCT);
                sessionStorage.Move_PFCT = SearchArry("MoveTo", "55", data);
                localStorage.setItem("Move_PFCT", sessionStorage.Move_PFCT);
                sessionStorage.Move_PRFCT = SearchArry("MoveTo", "56", data);
                localStorage.setItem("Move_PRFCT", sessionStorage.Move_PRFCT);
            }

            // روش ذخیره انبار در فاکتور
            sessionStorage.InvRegKalaInv_SFCT = SearchArry("InvRegKalaInv", "FDOCS", data);
            localStorage.setItem("InvRegKalaInv_SFCT", sessionStorage.InvRegKalaInv_SFCT);
            sessionStorage.InvRegKalaInv_SRFCT = SearchArry("InvRegKalaInv", "FDOCSR", data);
            localStorage.setItem("InvRegKalaInv_SRFCT", sessionStorage.InvRegKalaInv_SRFCT);
            sessionStorage.InvRegKalaInv_PFCT = SearchArry("InvRegKalaInv", "FDOCP", data);
            localStorage.setItem("InvRegKalaInv_PFCT", sessionStorage.InvRegKalaInv_PFCT);
            sessionStorage.InvRegKalaInv_PRFCT = SearchArry("InvRegKalaInv", "FDOCPR", data);
            localStorage.setItem("InvRegKalaInv_PRFCT", sessionStorage.InvRegKalaInv_PRFCT);


            // ذخیره سند انبار بعد از ذخیره فاکتور
            sessionStorage.FDOCS_AutoInvReg = SearchArry("FDOCS_AutoInvReg", "Default", data);
            localStorage.setItem("FDOCS_AutoInvReg", sessionStorage.FDOCS_AutoInvReg);
            sessionStorage.FDOCSR_AutoInvReg = SearchArry("FDOCSR_AutoInvReg", "Default", data);
            localStorage.setItem("FDOCSR_AutoInvReg", sessionStorage.FDOCSR_AutoInvReg);
            sessionStorage.FDOCP_AutoInvReg = SearchArry("FDOCP_AutoInvReg", "Default", data);
            localStorage.setItem("FDOCP_AutoInvReg", sessionStorage.FDOCP_AutoInvReg);
            sessionStorage.FDOCPR_AutoInvReg = SearchArry("FDOCPR_AutoInvReg", "Default", data);
            localStorage.setItem("FDOCPR_AutoInvReg", sessionStorage.FDOCPR_AutoInvReg);

            // ذخیره سند حسابداری بعد از ذخیره فاکتور
            sessionStorage.FDOCS_AutoAccReg = SearchArry("FDOCS_AutoAccReg", "Default", data);
            localStorage.setItem("FDOCS_AutoAccReg", sessionStorage.FDOCS_AutoAccReg);
            sessionStorage.FDOCSR_AutoAccReg = SearchArry("FDOCSR_AutoAccReg", "Default", data);
            localStorage.setItem("FDOCSR_AutoAccReg", sessionStorage.FDOCSR_AutoAccReg);
            sessionStorage.FDOCP_AutoAccReg = SearchArry("FDOCP_AutoAccReg", "Default", data);
            localStorage.setItem("FDOCP_AutoAccReg", sessionStorage.FDOCP_AutoAccReg);
            sessionStorage.FDOCPR_AutoAccReg = SearchArry("FDOCPR_AutoAccReg", "Default", data);
            localStorage.setItem("FDOCPR_AutoAccReg", sessionStorage.FDOCPR_AutoAccReg);

            sessionStorage.IDOCI_AutoAccReg = SearchArry("IDOCI_AutoAccReg", "Default", data);
            localStorage.setItem("IDOCI_AutoAccReg", sessionStorage.IDOCI_AutoAccReg);
            sessionStorage.IDOCO_AutoAccReg = SearchArry("IDOCO_AutoAccReg", "Default", data);
            localStorage.setItem("IDOCO_AutoAccReg", sessionStorage.IDOCO_AutoAccReg);

            sessionStorage.IDOCI_AutoFctReg = SearchArry("IDOCI_AutoFctReg", "Default", data);
            localStorage.setItem("IDOCI_AutoFctReg", sessionStorage.IDOCI_AutoFctReg);
            sessionStorage.IDOCO_AutoFctReg = SearchArry("IDOCO_AutoFctReg", "Default", data);
            localStorage.setItem("IDOCO_AutoFctReg", sessionStorage.IDOCO_AutoFctReg);

            sessionStorage.InvDefult_Fct = SearchArry("Inv", "Default", data);
            localStorage.setItem("InvDefult_Fct", sessionStorage.InvDefult_Fct);

            sessionStorage.GPriceDefultS = SearchArry("KalaPriceS", "Default", data);
            localStorage.setItem("GPriceDefultS", sessionStorage.GPriceDefultS);

            sessionStorage.GPriceDefultP = SearchArry("KalaPriceP", "Default", data);
            localStorage.setItem("GPriceDefultP", sessionStorage.GPriceDefultP);

            sessionStorage.ArzCalcMode_Fct = SearchArry("ArzCalcMode", "ArzCalcMode", data);
            sessionStorage.ArzCalcMode_Fct = 1;
            localStorage.setItem("ArzCalcMode_Fct", sessionStorage.ArzCalcMode_Fct);

            sessionStorage.invSelect_Fct = "";
            localStorage.setItem("invSelect_Fct", sessionStorage.invSelect_Fct);

        }
    });
}


function getParamInv() {
    ajaxFunction(ParamUri + ace + '/' + sal + '/' + group, 'GET', null, false).done(function (data) {
        if (data.length > 0) {
            sessionStorage.BeginDateInv = SearchArry("SalMali", "BeginDate", data);
            localStorage.setItem("BeginDateInv", sessionStorage.BeginDateInv);

            sessionStorage.EndDateInv = SearchArry("SalMali", "EndDate", data);
            localStorage.setItem("EndDateInv", sessionStorage.EndDateInv);

            sessionStorage.DeghatInv = SearchArry("Deghat", "Deghat", data);
            localStorage.setItem("DeghatInv", sessionStorage.DeghatInv);

            sessionStorage.InvDefult_Inv = SearchArry("Inv", "Default", data);
            localStorage.setItem("InvDefult_Inv", sessionStorage.InvDefult_Inv);

            sessionStorage.GPriceDefultI = SearchArry("KalaPriceI", "Default", data);
            localStorage.setItem("GPriceDefultI", sessionStorage.GPriceDefultI);

            sessionStorage.ArzCalcMode_Inv = SearchArry("ArzCalcMode", "ArzCalcMode", data);
            sessionStorage.ArzCalcMode_Inv = 1;
            localStorage.setItem("ArzCalcMode_Inv", sessionStorage.ArzCalcMode_Inv);

            sessionStorage.invSelect_Inv = "";
            localStorage.setItem("invSelect_Inv", sessionStorage.invSelect_Inv);

            sessionStorage.IDOCI_TestThvl = SearchArry("IDOCI_TestThvl", "IDOCI_TestThvl", data);
            localStorage.setItem("IDOCI_TestThvl", sessionStorage.IDOCI_TestThvl);
            sessionStorage.IDOCO_TestThvl = SearchArry("IDOCO_TestThvl", "IDOCO_TestThvl", data);
            localStorage.setItem("IDOCO_TestThvl", sessionStorage.IDOCO_TestThvl);

            sessionStorage.IDOCI_TestZeroAmount = SearchArry("IDOCI_TestZeroAmount", "IDOCI_TestZeroAmount", data);
            localStorage.setItem("IDOCI_TestZeroAmount", sessionStorage.IDOCI_TestZeroAmount);
            sessionStorage.IDOCO_TestZeroAmount = SearchArry("IDOCO_TestZeroAmount", "IDOCO_TestZeroAmount", data);
            localStorage.setItem("IDOCO_TestZeroAmount", sessionStorage.IDOCO_TestZeroAmount);

            sessionStorage.AllInvSameNo = SearchArry("AllInvSameNo", "AllInvSameNo", data);
            localStorage.setItem("AllInvSameNo", sessionStorage.AllInvSameNo);

            sessionStorage.IDOCIAmountAfterBarCode = SearchArry("IDOCIAmountAfterBarCode", "IDOCIAmountAfterBarCode", data);
            localStorage.setItem("IDOCIAmountAfterBarCode", sessionStorage.IDOCIAmountAfterBarCode);
            sessionStorage.IDOCOAmountAfterBarCode = SearchArry("IDOCOAmountAfterBarCode", "IDOCOAmountAfterBarCode", data);
            localStorage.setItem("IDOCOAmountAfterBarCode", sessionStorage.IDOCOAmountAfterBarCode);
        }
    });
}


function getParamAcc() {
    ajaxFunction(ParamUri + ace + '/' + sal + '/' + group, 'GET', null, false).done(function (data) {
        if (data.length > 0) {
            sessionStorage.BeginDateAcc = SearchArry("SalMali", "BeginDate", data);
            localStorage.setItem("BeginDateAcc", sessionStorage.BeginDateAcc);

            sessionStorage.EndDateAcc = SearchArry("SalMali", "EndDate", data);
            localStorage.setItem("EndDateAcc", sessionStorage.EndDateAcc);

            sessionStorage.DeghatAcc = SearchArry("Deghat", "Deghat", data);
            localStorage.setItem("DeghatAcc", sessionStorage.DeghatAcc);


            sessionStorage.ADOC_TestZeroPrice = SearchArry("ADOC_TestZeroPrice", "ADOC_TestZeroPrice", data);
            localStorage.setItem("ADOC_TestZeroPrice", sessionStorage.ADOC_TestZeroPrice);
            sessionStorage.ADOC_TestTraf = SearchArry("ADOC_TestTraf", "ADOC_TestTraf", data);
            localStorage.setItem("ADOC_TestTraf", sessionStorage.ADOC_TestTraf);
            sessionStorage.ADOC_TestCheck = SearchArry("ADOC_TestCheck", "ADOC_TestCheck", data);
            localStorage.setItem("ADOC_TestCheck", sessionStorage.ADOC_TestCheck);
        }
    });
}

*/

function getDataVstr() {
    vstrcode = localStorage.getItem("userVstrCode");
    localStorage.setItem("userVstrName", null);
    if (vstrcode != '' && vstrcode != null) {

        ajaxFunction(VstrUri + ace + '/' + sal + '/' + group + '/' + vstrcode, 'GET', false, true).done(function (data) {
            localStorage.setItem("userVstrName", data[0].Name);
        });
    }
}

/*
function CheckAccess(TrsName, Prog) {
    if (Prog != null) {
        if (localStorage.getItem('admin_Afi1') == '1' && ace == prog_Web1)
            return true;
        else if (Prog.includes(prog_Acc) && localStorage.getItem('admin_Acc5') == '1' && ace == prog_Web8)
            return true;
        else if (Prog.includes(prog_Fct) && localStorage.getItem('admin_Fct5') == '1' && ace == prog_Web8)
            return true;
        else if (Prog.includes(prog_Inv) && localStorage.getItem('admin_Inv5') == '1' && ace == prog_Web8)
            return true;
        else {
            if (TrsName == "KALA" || TrsName.lastIndexOf("_KALA") > 0) {
                for (var i = 0; i < access.length; i++) {
                    if (access[i].TrsName == TrsName && access[i].OrgProgName == loginData.fct_or_Inv.toUpperCase())
                        return true;
                }
            }
            else if (TrsName == "OPR" || TrsName == "MKZ" || TrsName == "ARZ" || TrsName.lastIndexOf("_OPR") > 0 || TrsName.lastIndexOf("_MKZ") > 0 || TrsName.lastIndexOf("_ARZ") > 0) {
                for (var i = 0; i < access.length; i++) {
                    if (TrsName == "_OPR") {
                        if (access[i].TrsName == "ARZ") {
                            a = 1;
                        }
                    }
                    if (access[i].TrsName == TrsName && access[i].OrgProgName.toLowerCase() == Master_ProgName.toLowerCase())
                        return true;
                }
            }
            else {
                for (var i = 0; i < access.length; i++) {
                    if (access[i].TrsName == TrsName)
                        return true;
                }
            }
        }
    }
    return false
}

function CheckAccessReport(Code, Prog) {
    if (Prog.includes(prog_Acc) && localStorage.getItem('admin_Acc5') == '1')
        return true;
    else if (Prog.includes(prog_Fct) && localStorage.getItem('admin_Fct5') == '1')
        return true;
    else if (Prog.includes(prog_Inv) && localStorage.getItem('admin_Inv5') == '1')
        return true;
    else if (Prog.includes(prog_Afi) && localStorage.getItem('admin_Afi1') == '1')
        return true;
    else {
        for (var i = 0; i < accessReport.length; i++) {
            if (accessReport[i].Code == Code)
                return accessReport[i].Trs;
        }
    }
    return false;
}


function CheckAccessErj(TrsName) {
    if (localStorage.getItem('admin_Erj1') == '1')
        return true;
    else {
        for (var i = 0; i < accessErj.length; i++) {
            if (accessErj[i].TrsName == TrsName)
                return true;
        }
    }
    return false
}

function CheckAccessReportErj(Code) {
    if (localStorage.getItem('admin_Erj1') == '1')
        return true;
    else {
        for (var i = 0; i < accessReportErj.length; i++) {
            if (accessReportErj[i].Code == Code)
                return accessReportErj[i].Trs;
        }
    }
    return false;
}

*/

//Get Access List
/*
function getAccessList(GoHome) {
    ajaxFunctionAccount(AccountUri + account_UserName + '/' + account_Password, 'GET', true).done(function (data) {
        if (data === null) {
            return showNotification(translate(' نام کاربری یا کلمه عبور اشتباه است '), 0);
            // return Swal.fire({ type: 'info', title: 'خطا ', text: ' نام کاربری یا کلمه عبور اشتباه است ' });
        }
        else {
            serverAddress = data.AddressApi;
            apiAddressPos = data.AddressApiPos;
            afi1List = data.AFI1_Group;
            afi8List = data.AFI8_Group;
            erjList = data.ERJ_Group;

            afi1Access = data.AFI1_Access;
            afi8Access = data.AFI8_Access;
            erjAccess = data.ERJ_Access;

            lockNumber = data.lockNumber;
            multilang = data.multilang;
            logoutmin = data.logoutmin;

            whereKala = data.WhereKala;
            whereCust = data.WhereCust;
            whereThvl = data.WhereThvl;
            whereAcc = data.WhereAcc;

            Master_ProgName = data.ProgName;
            loginData.fct_or_Inv = data.Fct_or_Inv == 'FCT5' ? 'Fct5' : data.Fct_or_Inv == 'INV5' ? 'Inv5' : data.Fct_or_Inv;

            localStorage.setItem("ApiAddressPos", apiAddressPos);

            localStorage.setItem('DataAccount', JSON.stringify(data));
            localStorage.setItem('afi1List', afi1List);
            localStorage.setItem('afi8List', afi8List);
            localStorage.setItem('erjList', erjList);

            localStorage.setItem('afi1Access', afi1Access);
            localStorage.setItem('afi8Access', afi8Access);
            localStorage.setItem('erjAccess', erjAccess);
            localStorage.setItem('multilang', multilang);
            localStorage.setItem('logoutmin', logoutmin);

            localStorage.setItem('whereKala', whereKala);
            localStorage.setItem('whereCust', whereCust);
            localStorage.setItem('whereThvl', whereThvl);
            localStorage.setItem('whereAcc', whereAcc);

            localStorage.setItem('Master_ProgName', Master_ProgName);
            localStorage.setItem('Fct_or_Inv', loginData.fct_or_Inv);

            localStorage.setItem('expireDate', data.toDate);





            afiaccess = [false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false]

            afiAccessApi = '';

            if (ace == prog_Web2) {
                //afiAccessApi = '';
            }
            else {
                if (ace == prog_Web1) {
                    if (afi1Access != null) {
                        if (afi1Access == '*')
                            afiAccessApi = '*';
                        else
                            afiAccessApi = afi1Access.split("*");
                    }
                }
                else if (ace == prog_Web8) {
                    if (afi8Access != null) {
                        if (afi8Access == '*')
                            afiAccessApi = '*';
                        else
                            afiAccessApi = afi8Access.split("*");
                    }
                }

                if (afiAccessApi == '*') {
                    for (var i = 0; i <= countAccess; i++) {
                        afiaccess[i] = true;
                    }
                }
                else {
                    for (var i = 0; i <= countAccess; i++) {

                        afiAccessApi[i] == 'SFCT' ? afiaccess[AP_SFCT] = true : null;
                        afiAccessApi[i] == 'SPFCT' ? afiaccess[AP_SPFCT] = true : null;
                        afiAccessApi[i] == 'SRFCT' ? afiaccess[AP_SRFCT] = true : null;
                        afiAccessApi[i] == 'PFCT' ? afiaccess[AP_PFCT] = true : null;
                        afiAccessApi[i] == 'PPFCT' ? afiaccess[AP_PPFCT] = true : null;
                        afiAccessApi[i] == 'PRFCT' ? afiaccess[AP_PRFCT] = true : null;
                        afiAccessApi[i] == 'IIDOC' ? afiaccess[AP_IIDOC] = true : null;
                        afiAccessApi[i] == 'IODOC' ? afiaccess[AP_IODOC] = true : null;
                        afiAccessApi[i] == 'TrzIKala' ? afiaccess[AP_TrzIKala] = true : null;
                        afiAccessApi[i] == 'TrzIKalaExf' ? afiaccess[AP_TrzIKalaExf] = true : null;
                        afiAccessApi[i] == 'IDocR' ? afiaccess[AP_IDocR] = true : null;
                        afiAccessApi[i] == 'FDocR_S' ? afiaccess[AP_FDocR_S] = true : null;
                        afiAccessApi[i] == 'FDocR_P' ? afiaccess[AP_FDocR_P] = true : null;
                        afiAccessApi[i] == 'TrzAcc' ? afiaccess[AP_TrzAcc] = true : null;
                        afiAccessApi[i] == 'Dftr' ? afiaccess[AP_Dftr] = true : null;
                        afiAccessApi[i] == 'ADocR' ? afiaccess[AP_ADocR] = true : null;
                        afiAccessApi[i] == 'TChk' ? afiaccess[AP_TChk] = true : null;
                        afiAccessApi[i] == 'TrzFKala_S' ? afiaccess[AP_TrzFKala_S] = true : null;
                        afiAccessApi[i] == 'TrzFKala_P' ? afiaccess[AP_TrzFKala_P] = true : null;
                        afiAccessApi[i] == 'TrzFCust_S' ? afiaccess[AP_TrzFCust_S] = true : null;
                        afiAccessApi[i] == 'TrzFCust_P' ? afiaccess[AP_TrzFCust_P] = true : null;
                        afiAccessApi[i] == 'ADOC' ? afiaccess[AP_ADOC] = true : null;
                        afiAccessApi[i] == 'SFORD' ? afiaccess[AP_SFORD] = true : null;
                        afiAccessApi[i] == 'SHVL' ? afiaccess[AP_SHVL] = true : null;
                        afiAccessApi[i] == 'SEXT' ? afiaccess[AP_SEXT] = true : null;
                        afiAccessApi[i] == 'PFORD' ? afiaccess[AP_PFORD] = true : null;
                        afiAccessApi[i] == 'Krdx' ? afiaccess[AP_Krdx] = true : null;
                        afiAccessApi[i] == 'Kala' ? afiaccess[AP_Kala] = true : null;
                        afiAccessApi[i] == 'Cust' ? afiaccess[AP_Cust] = true : null;
                        afiAccessApi[i] == 'Acc' ? afiaccess[AP_Acc] = true : null;
                        afiAccessApi[i] == 'Mkz' ? afiaccess[AP_Mkz] = true : null;
                        afiAccessApi[i] == 'Opr' ? afiaccess[AP_Opr] = true : null;
                        afiAccessApi[i] == 'AGMkz' ? afiaccess[AP_AGMkz] = true : null;
                        afiAccessApi[i] == 'AGOpr' ? afiaccess[AP_AGOpr] = true : null;
                        afiAccessApi[i] == 'Arz' ? afiaccess[AP_Arz] = true : null;
                        afiAccessApi[i] == 'ZAcc' ? afiaccess[AP_ZAcc] = true : null;
                        afiAccessApi[i] == 'GrdZAcc' ? afiaccess[AP_GrdZAcc] = true : null;
                        afiAccessApi[i] == 'KhlAcc' ? afiaccess[AP_KhlAcc] = true : null;
                        afiAccessApi[i] == 'KhlZAcc' ? afiaccess[AP_KhlZAcc] = true : null;
                    }
                }

                if (ace == prog_Web1) {
                    afiaccess[AP_TrzIKalaExf] = false; //TrzIKalaExf
                    afiaccess[AP_SFORD] = false; //SFORD
                    afiaccess[AP_SHVL] = false; //SHVL
                    afiaccess[AP_SEXT] = false; //SEXT
                    afiaccess[AP_PFORD] = false; //PFORD
                    afiaccess[AP_KhlAcc] = false; //AP_KhlAcc
                    afiaccess[AP_KhlZAcc] = false; //AP_KhlZAcc
                }

            }

            erjaccess = [false, false, false, false, false, false]

            if (CheckGroupErj(group) == true) {
                if (erjAccessApi == '*') {
                    for (var i = 0; i < 5; i++)
                        erjaccess[i] = true
                }
                else {
                    for (var i = 0; i < 5; i++) {
                        erjAccessApi[i] == 'ErjDocK' ? erjaccess[0] = true : null;
                        erjAccessApi[i] == 'ErjDocB_Last' ? erjaccess[1] = true : null;
                        erjAccessApi[i] == 'ErjDoc' ? erjaccess[2] = true : null;
                        erjAccessApi[i] == 'Erja_Resive' ? erjaccess[3] = true : null;
                        erjAccessApi[i] == 'Erja_Send' ? erjaccess[4] = true : null;
                    }
                }

                ajaxFunction(AccessUri + aceErj + '/' + group + '/' + userName, 'GET', true).done(function (data) {
                    self.AccessList(data);
                    if (self.AccessList().length > 0) {
                        localStorage.setItem('AccessErj', JSON.stringify(data));
                        accssErj = JSON.parse(localStorage.getItem("AccessErj"));

                        ajaxFunction(AccessReportErjUri + prog_Web2 + '/' + group + '/' + userName, 'GET', true).done(function (data) {
                            self.AccessListReport(data);
                            if (self.AccessListReport().length > 0) {
                                localStorage.setItem('AccessReportErj', JSON.stringify(data));
                                accessReportErj = JSON.parse(localStorage.getItem("AccessReportErj"));
                                SetValidationErj();
                            }
                        });
                    }
                });


            }

            ajaxFunction(AccessUri + ace + '/' + group + '/' + userName, 'GET', true).done(function (data) {
                self.AccessList(data);
                if (self.AccessList().length > 0) {
                    admin = data.filter(s => s.TrsName == 'ADMIN');

                    admin_Acc5 = 0;
                    admin_Fct5 = 0;
                    admin_Inv5 = 0;
                    admin_Afi1 = 0;
                    admin_Erj1 = 0;

                    for (var i = 0; i < admin.length; i++) {
                        if (admin[i].OrgProgName == prog_Acc) admin_Acc5 = 1;
                        if (admin[i].OrgProgName == prog_Fct) admin_Fct5 = 1;
                        if (admin[i].OrgProgName == prog_Inv) admin_Inv5 = 1;
                        if (admin[i].OrgProgName == prog_Afi) admin_Afi1 = 1;
                        if (admin[i].OrgProgName == prog_Erj) admin_Erj1 = 1;
                    }

                    if (admin_Afi1 == 1) {
                        admin_Acc5 = 1;
                        admin_Fct5 = 1;
                        admin_Inv5 = 1;
                    }

                    localStorage.setItem('admin_Acc5', admin_Acc5);
                    localStorage.setItem('admin_Fct5', admin_Fct5);
                    localStorage.setItem('admin_Inv5', admin_Inv5);
                    localStorage.setItem('admin_Afi1', admin_Afi1);
                    localStorage.setItem('admin_Erj1', admin_Erj1);


                    localStorage.setItem('Access', JSON.stringify(data));
                    //if (userName == 'ACE') {
                    //    localStorage.setItem('Access', 1);
                    //} else {


                    //}


                    access = localStorage.getItem('Access');
                    access = JSON.parse(localStorage.getItem('Access'));

                    ajaxFunction(AccessReportUri + ace + '/' + group + '/' + userName, 'GET', true).done(function (data) {
                        self.AccessListReport(data);
                        if (self.AccessListReport().length > 0) {
                            localStorage.setItem('AccessReport', JSON.stringify(data));
                            accessReport = JSON.parse(localStorage.getItem("AccessReport"));
                            SetValidation();
                        }
                    });
                }
            });

            localStorage.setItem("Inbox", 0);
            ajaxFunction(AccessUri + "null" + '/' + "0" + '/' + userName, 'GET', true).done(function (data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].TrsName == "Inbox") {
                            localStorage.setItem("Inbox", 1);
                        }
                    }
                }

                if (userName == user_Ace) {
                    localStorage.setItem("Inbox", 1);
                }

                if (GoHome == true) {
                    if (FirstPageUrl == 1)
                        window.location.href = urlPage_Index;
                    else
                        window.location.href = urlPage_Index;
                }
                else
                    location.reload();
            });



        }
    });
}

SetValidation();
SetValidationErj();

*/
var DateNow;
var SalNow;
var timeNow;
function FindTextField(field, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].Code == field && data[i].Visible == 1) {
            return data[i].Name;
        }
    }
    return 0;
}

function FindTypeField(field, data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].Code == field && data[i].Visible == 1) {
            return data[i].Type;
        }
    }
    return 0;
}


function getTimeServer() {
    if (loginData.apiAddress != null) {

        ajaxFunction(TimeUri, 'GET').done(function (data) {
            timeNow = data[0];
        });
    }
}

if (userName != '' && userName != null)
    setInterval(TestUser, 60000);

function TestUser() {
    if (userName != "" && userName != null && hrefPage != urlPage_Login) {
        var LoginTestObject = {
            MachineId: loginData.machineIdKarbord,
            IPWan: loginData.ip,
            Country: loginData.country,
            City: loginData.city,
            UserCode: userName,
            ProgName: ace,
            ProgVer: loginData.version,
            ProgCaption: "وب : " + loginData.progCaption,
            FlagTest: true,
            GroupNo: '',
            Year: '',
        }

        ajaxFunction(LoginTestUri, 'POST', LoginTestObject).done(function (datalogin) {
            /*if (datalogin.ID >= 0) {
                //showNotification('لطفا دوباره وارد شوید', 0);
                //sleep(10000);
                userName = '';
                loginData.userName = "";
                loginData.password = "";
                window.location.href = urlPage_Login;
            }
            else */{
                DateNow = datalogin.SrvDate;
                localStorage.setItem("DateNow", DateNow);

                $("#dateTimeHome").text("تاریخ سرور " + DateNow);

                listDate = DateNow.split("/");
                SalNow = listDate[0];

                count = datalogin.CountErja;

                updateDateCols = datalogin.UpdateDate;

                lastUpdateDateCols = localStorage.getItem('UpdateDateCols');

                //if (lastUpdateDateCols != null && updateDateCols != null && lastUpdateDateCols < updateDateCols)
                if (lastUpdateDateCols != updateDateCols && lastUpdateDateCols != 'null') {
                    getRprtAllCols();
                    localStorage.setItem('UpdateDateCols', updateDateCols);
                }


                // if (updateDateCols != null)
                //  localStorage.setItem('UpdateDateCols', updateDateCols);

                if (count > 0) {
                    countResiveErja = localStorage.getItem('CountResiveErja', count);

                    if (countResiveErja == null) {
                        countResiveErja = 0
                    }
                    if (countResiveErja != count) {
                        ShowNotificationWindows('ارجاعات', 'تعداد ' + count + ' ارجاع دریافت کرده اید');
                        localStorage.setItem('CountResiveErja', count);
                    }
                    $("#notificationCount").text(count);
                    // showNotification('تعداد ' + count + ' ارجاع دریافت کرده اید ', 3, "bottom", null, 2000)
                }
                else {
                    $("#notificationCount").text('');
                }

            }
        });
    };
}

/*
function SetValidation() {

    if (access == null) return false;
    if (access.length == 0) return false;
    userName == user_Ace ? access[0].TrsName = 'ADMIN' : null
    //userName == 'ACE' ? access[0].TrsName = 'ADMIN' : null
    if (access[0].TrsName == 'ADMIN') {
        sessionStorage.UserAdmin = true;
        if (userName == user_Ace)
            $('#TextNoUser').text(translate('مدیر سیستم'));
        else
            $('#TextNoUser').text(translate('مدیر'));
    }
    else {
        sessionStorage.UserAdmin = false;
        $('#TextNoUser').text(translate('کاربر'));
    }

    $('#persionUserName').text(userName);



    validation = CheckAccess('DOC', localStorage.getItem('ProgAccess')); //ثبت اسناد
    ShowMenu[AC_DOC] = validation;

    validation = CheckAccess('ADOC', prog_Acc); //اسناد حسابداری
    ShowMenu[AC_ADOC] = validation;

    validation = CheckAccess('FSDOC', prog_Fct); //اسناد فروش
    ShowMenu[AC_FSDOC] = validation;

    validation = CheckAccess('FPDOC', prog_Fct); // اسناد خرید
    ShowMenu[AC_FPDOC] = validation;

    validation = CheckAccess('RPRT', localStorage.getItem('ProgAccess')); // گزارشات
    ShowMenu[AC_RPRT] = validation;

    validation = CheckAccessReport('TrzIKala', prog_Inv);
    ShowMenu[AC_TrzIKala] = validation;  // گزارش موجودی کالا

    validation = CheckAccessReport('TrzIKalaExf', prog_Inv);
    ShowMenu[AC_TrzIKalaExf] = validation;  // گزارش موجودی کالا به تفکیک ویژگیها

    validation = CheckAccessReport('IDocR', prog_Inv);
    ShowMenu[AC_IDocR] = validation;  // گزارش ريز گردش اسناد انبارداری 

    validation = CheckAccessReport('FDocR_S', prog_Fct);
    ShowMenu[AC_FDocR_S] = validation;  // گزارش ريز گردش خرید و فروش

    validation = CheckAccessReport('FDocR_P', prog_Fct);
    ShowMenu[AC_FDocR_P] = validation;  // گزارش ريز گردش خرید و فروش

    validation = CheckAccessReport('TrzAcc', prog_Acc);
    ShowMenu[AC_TrzAcc] = validation;  // تراز دفاتر حسابداری

    validation = CheckAccessReport('GrdZAcc', prog_Acc);
    ShowMenu[AC_GrdZAcc] = validation;  // گردش زیرحساب ها 

    validation = CheckAccessReport('KhlAcc', prog_Acc);
    ShowMenu[AC_KhlAcc] = validation;  // صورت خلاصه حساب ها  

    validation = CheckAccessReport('KhlZAcc', prog_Acc);
    ShowMenu[AC_KhlZAcc] = validation;  // صورت خلاصه زیرحساب ها

    validation = CheckAccessReport('Dftr', prog_Acc);
    ShowMenu[AC_Dftr] = validation;  // دفتر حساب حسابداری 

    validation = CheckAccessReport('ADocR', prog_Acc);
    ShowMenu[AC_ADocR] = validation;  // دفتر حساب روزنامه

    validation = CheckAccessReport('TChk', prog_Acc);
    ShowMenu[AC_TChk] = validation;  // صورت ریز چک  

    validation = CheckAccessReport('TrzFKala_S', prog_Fct);
    ShowMenu[AC_TrzFKala_S] = validation;  // تراز فروش کالا  

    validation = CheckAccessReport('TrzFKala_P', prog_Fct);
    ShowMenu[AC_TrzFKala_P] = validation;  //تراز خرید کالا 

    validation = CheckAccessReport('TrzFCust_S', prog_Fct);
    ShowMenu[AC_TrzFCust_S] = validation;  // تراز فروش به خریداران 

    validation = CheckAccessReport('TrzFCust_P', prog_Fct);
    ShowMenu[AC_TrzFCust_P] = validation;  // تراز خرید از فروشندگان

    validation = CheckAccessReport('Krdx', prog_Inv);
    ShowMenu[AC_Krdx] = validation;  // گزارش کاردکس

    validation = CheckAccess('KALA', loginData.fct_or_Inv);
    ShowMenu[AC_KALA] = validation;  // کالاها

    validation = CheckAccess('CUST', prog_Fct);
    ShowMenu[AC_CUST] = validation;  // خریداران / فروشندگان

    validation = CheckAccess('ACC', prog_Acc);
    ShowMenu[AC_ACC] = validation;  // حساب ها

    validation = CheckAccess('MKZ', localStorage.getItem('ProgAccess'));
    ShowMenu[AC_MKZ] = validation;  // مرکز هزینه

    validation = CheckAccess('OPR', localStorage.getItem('ProgAccess'));
    ShowMenu[AC_OPR] = validation;  // پروژه

    validation = CheckAccessReport('AGMkz', prog_Acc);
    ShowMenu[AC_AGMkz] = validation;  // گردش مراکز هزینه

    validation = CheckAccessReport('AGOpr', prog_Acc);
    ShowMenu[AC_AGOpr] = validation;  // گردش پروژه ها 

    validation = CheckAccess('ARZ', localStorage.getItem('ProgAccess'));
    ShowMenu[AC_ARZ] = validation;  //  ارز ها

    validation = CheckAccess('ZACC', 'Acc5');
    ShowMenu[AC_ZACC] = validation;  //  زیر حساب ها

    validation = CheckAccess('SFORD', prog_Fct);
    ShowMenu[AC_SFORD] = validation;  // سفارش فروش

    validation = CheckAccess('SPDOC', prog_Fct);
    ShowMenu[AC_SPDOC] = validation;  // پیش فاکتور قروش

    validation = CheckAccess('SFDOC', prog_Fct);
    ShowMenu[AC_SFDOC] = validation;  //  فاکتور قروش

    validation = CheckAccess('SRDOC', prog_Fct);
    ShowMenu[AC_SRDOC] = validation;  // برگشت فاکتور قروش

    validation = CheckAccess('SHVL', prog_Fct);
    ShowMenu[AC_SHVL] = validation;  // حواله فروش

    validation = CheckAccess('SEXT', prog_Fct);
    ShowMenu[AC_SEXT] = validation;  //برگه خروج 

    validation = CheckAccess('PFORD', prog_Fct);
    ShowMenu[AC_PFORD] = validation;  // سفارش خرید

    validation = CheckAccess('PPDOC', prog_Fct);
    ShowMenu[AC_PPDOC] = validation;  // پیش فاکتور خرید

    validation = CheckAccess('PFDOC', prog_Fct);
    ShowMenu[AC_PFDOC] = validation;  //  فاکتور خرید

    validation = CheckAccess('PRDOC', prog_Fct);
    ShowMenu[AC_PRDOC] = validation;  // برگشت فاکتور خرید

    validation = CheckAccess('IIDOC', prog_Inv);
    ShowMenu[AC_IIDOC] = validation;  // وارده انبار

    validation = CheckAccess('IODOC', prog_Inv);
    ShowMenu[AC_IODOC] = validation;  // صادره انبار



    //localStorage.setItem("", );
    localStorage.setItem("FDoc_REP_PRICE", CheckAccess('FDoc_REP_PRICE', prog_Fct)); // خرید و فروش دسترسی مبلغ در گزارشات
    localStorage.setItem("IDoc_REP_PRICE", CheckAccess('IDoc_REP_PRICE', prog_Inv)); // دسترسی مبلغ در گزارشات انبار
    //sessionStorage.FDoc_REP_PRICE = CheckAccessReport('FDoc_REP_PRICE');
    //sessionStorage.IDoc_REP_PRICE = CheckAccessReport('IDoc_REP_PRICE');


    localStorage.setItem("VIEW_ADOC", ace == prog_Web1 ? true : CheckAccess('VIEW_ADOC', 'Acc5'));

    localStorage.setItem("VIEW_SFORD", ace == prog_Web1 ? true : CheckAccess('VIEW_SFORD', prog_Fct));
    localStorage.setItem("VIEW_SPDOC", ace == prog_Web1 ? true : CheckAccess('VIEW_SPDOC', prog_Fct));
    localStorage.setItem("VIEW_SFDOC", ace == prog_Web1 ? true : CheckAccess('VIEW_SFDOC', prog_Fct));
    localStorage.setItem("VIEW_SRDOC", ace == prog_Web1 ? true : CheckAccess('VIEW_SRDOC', prog_Fct));
    localStorage.setItem("VIEW_SHVL", ace == prog_Web1 ? true : CheckAccess('VIEW_SHVL', prog_Fct));
    localStorage.setItem("VIEW_SEXT", ace == prog_Web1 ? true : CheckAccess('VIEW_SEXT', prog_Fct));
    localStorage.setItem("VIEW_PFORD", ace == prog_Web1 ? true : CheckAccess('VIEW_PFORD', prog_Fct));
    localStorage.setItem("VIEW_PPDOC", ace == prog_Web1 ? true : CheckAccess('VIEW_PPDOC', prog_Fct));
    localStorage.setItem("VIEW_PFDOC", ace == prog_Web1 ? true : CheckAccess('VIEW_PFDOC', prog_Fct)); //VIEW_PDOC
    localStorage.setItem("VIEW_PRDOC", ace == prog_Web1 ? true : CheckAccess('VIEW_PRDOC', prog_Fct));
    localStorage.setItem("VIEW_IIDOC", ace == prog_Web1 ? true : CheckAccess('VIEW_IIDOC', prog_Inv));
    localStorage.setItem("VIEW_IODOC", ace == prog_Web1 ? true : CheckAccess('VIEW_IODOC', prog_Inv));

    localStorage.setItem("AccessSanad_ADOC", CheckAccess('OTHERUSER_VIEW_ADOC', 'Acc5'))
    localStorage.setItem("AccessSanad_SFORD", CheckAccess('OTHERUSER_VIEW_SFORD', prog_Fct))
    localStorage.setItem("AccessSanad_SPDOC", CheckAccess('OTHERUSER_VIEW_SPDOC', prog_Fct))
    localStorage.setItem("AccessSanad_SFDOC", CheckAccess('OTHERUSER_VIEW_SFDOC', prog_Fct))
    localStorage.setItem("AccessSanad_SRDOC", CheckAccess('OTHERUSER_VIEW_SRDOC', prog_Fct))
    localStorage.setItem("AccessSanad_SHVL", CheckAccess('OTHERUSER_VIEW_SHVL', prog_Fct))
    localStorage.setItem("AccessSanad_SEXT", CheckAccess('OTHERUSER_VIEW_SEXT', prog_Fct))
    localStorage.setItem("AccessSanad_PFORD", CheckAccess('OTHERUSER_VIEW_PFORD', prog_Fct))
    localStorage.setItem("AccessSanad_PPDOC", CheckAccess('OTHERUSER_VIEW_PPDOC', prog_Fct))
    localStorage.setItem("AccessSanad_PFDOC", CheckAccess('OTHERUSER_VIEW_PFDOC', prog_Fct))
    localStorage.setItem("AccessSanad_PRDOC", CheckAccess('OTHERUSER_VIEW_PRDOC', prog_Fct))

    localStorage.setItem("AccessSanad_IIDOC", CheckAccess('OTHERUSER_VIEW_IIDOC', prog_Inv))
    localStorage.setItem("AccessSanad_IODOC", CheckAccess('OTHERUSER_VIEW_IODOC', prog_Inv))







    if (access[0].TrsName == 'ADMIN') {
        sessionStorage.AccessSanad = true;
        localStorage.setItem("AccessSanad", "true");
        //localStorage.setItem("AccessViewSanadAnbarVarede", "true")
        //sessionStorage.AccessViewSanadAnbarVarede = true;
    }




    if (afiaccess[AP_Kala] == true || afiaccess[AP_Cust] == true || afiaccess[AP_Acc] == true || afiaccess[AP_Mkz] == true ||
        afiaccess[AP_Opr] == true || afiaccess[AP_Arz] == true || afiaccess[AP_ZAcc] == true) {

        if (ShowMenu[AC_KALA] || ShowMenu[AC_CUST] || ShowMenu[AC_ACC] || ShowMenu[AC_MKZ] || ShowMenu[AC_OPR] || ShowMenu[AC_ARZ] || ShowMenu[AC_ZACC]) {
            $("#Base_Menu").show();
            $("#Dashbord").show();
            (ShowMenu[AC_KALA] == true) && (afiaccess[AP_Kala] == true) ? $("#BaseKala").show() : $("#BaseKala").hide();
            (ShowMenu[AC_CUST] == true) && (afiaccess[AP_Cust] == true) ? $("#BaseCust").show() : $("#BaseCust").hide();
            (ShowMenu[AC_ACC] == true) && (afiaccess[AP_Acc] == true) ? $("#BaseAcc").show() : $("#BaseAcc").hide();
            (ShowMenu[AC_MKZ] == true) && (afiaccess[AP_Mkz] == true) ? $("#BaseMkz").show() : $("#BaseMkz").hide();
            (ShowMenu[AC_OPR] == true) && (afiaccess[AP_Opr] == true) ? $("#BaseOpr").show() : $("#BaseOpr").hide();
            (ShowMenu[AC_ARZ] == true) && (afiaccess[AP_Arz] == true) ? $("#BaseArz").show() : $("#BaseArz").hide();
            (ShowMenu[AC_ZACC] == true) && (afiaccess[AP_ZAcc] == true) ? $("#BaseZAcc").show() : $("#BaseZAcc").hide();
        }
        else {
            $("#Base_Menu").hide();
        }
    }
    else {
        $("#Base_Menu").hide();
    }

    if (ShowMenu[AC_DOC]) {
        if (afiaccess[AP_ADOC] == true) {
            if (ShowMenu[AC_ADOC]) {
                $("#ADOC_Menu").show();
                $("#Dashbord").show();
                (ShowMenu[AC_ADOC] == true) && (afiaccess[AP_ADOC] == true) ? $("#ADOC").show() : $("#ADOC").hide();
            }
            else {
                $("#ADOC_Menu").hide();
            }
        }
        else {
            $("#ADOC_Menu").hide();
        }



        if (afiaccess[AP_SFCT] == true || afiaccess[AP_SPFCT] == true || afiaccess[AP_SRFCT] == true || afiaccess[AP_PFCT] == true || afiaccess[AP_PPFCT] == true || afiaccess[AP_PRFCT] == true
            || afiaccess[AP_SFORD] == true || afiaccess[AP_SHVL] == true || afiaccess[AP_SEXT] == true || afiaccess[AP_PFORD] == true) {
            if (ShowMenu[AC_FSDOC] || ShowMenu[AC_FPDOC]) {
                if (ShowMenu[AC_SPDOC] || ShowMenu[AC_SFDOC] || ShowMenu[AC_SRDOC] || ShowMenu[AC_PPDOC] || ShowMenu[AC_PFDOC] || ShowMenu[AC_PRDOC] ||
                    ShowMenu[AC_SFORD] || ShowMenu[AC_SHVL] || ShowMenu[AC_SEXT] || ShowMenu[AC_PFORD]) {
                    $("#FDOC_Menu").show();
                    $("#Dashbord").show();
                    (ShowMenu[AC_SPDOC] == true) && (afiaccess[AP_SPFCT] == true) ? $("#FDOC_SP").show() : $("#FDOC_SP").hide();
                    (ShowMenu[AC_SFDOC] == true) && (afiaccess[AP_SFCT] == true) ? $("#FDOC_S").show() : $("#FDOC_S").hide();
                    (ShowMenu[AC_SRDOC] == true) && (afiaccess[AP_SRFCT] == true) ? $("#FDOC_SR").show() : $("#FDOC_SR").hide();
                    (ShowMenu[AC_PPDOC] == true) && (afiaccess[AP_PFCT] == true) ? $("#FDOC_PP").show() : $("#FDOC_PP").hide();
                    (ShowMenu[AC_PFDOC] == true) && (afiaccess[AP_PPFCT] == true) ? $("#FDOC_P").show() : $("#FDOC_P").hide();
                    (ShowMenu[AC_PRDOC] == true) && (afiaccess[AP_PRFCT] == true) ? $("#FDOC_PR").show() : $("#FDOC_PR").hide();
                    (ShowMenu[AC_SFORD] == true) && (afiaccess[AP_SFORD] == true) ? $("#FDOC_SO").show() : $("#FDOC_SO").hide(); //سفارش فروش
                    (ShowMenu[AC_SHVL] == true) && (afiaccess[AP_SHVL] == true) ? $("#FDOC_SH").show() : $("#FDOC_SH").hide(); //حواله فروش
                    (ShowMenu[AC_SEXT] == true) && (afiaccess[AP_SEXT] == true) ? $("#FDOC_SE").show() : $("#FDOC_SE").hide(); //برگه خروج
                    (ShowMenu[AC_PFORD] == true) && (afiaccess[AP_PFORD] == true) ? $("#FDOC_PO").show() : $("#FDOC_PO").hide();// سفارش خرید 
                }
                else {
                    $("#FDOC_Menu").hide();
                }
            }
            else {
                $("#FDOC_Menu").hide();
            }
        }
        else {
            $("#FDOC_Menu").hide();
        }




        if (afiaccess[AP_IIDOC] == true || afiaccess[AP_IODOC] == true) {
            if (ShowMenu[AC_IIDOC] || ShowMenu[AC_IODOC]) {
                $("#IDOC_Menu").show();
                $("#Dashbord").show();
                (ShowMenu[AC_IIDOC] == true) && (afiaccess[AP_IIDOC] == true) ? $("#IDOC_I").show() : $("#IDOC_I").hide();
                (ShowMenu[AC_IODOC] == true) && (afiaccess[AP_IODOC] == true) ? $("#IDOC_O").show() : $("#IDOC_O").hide();
            }
            else {
                $("#IDOC_Menu").hide();
            }
        }
        else {
            $("#IDOC_Menu").hide();
        }
    }
    else {
        $("#ADOC_Menu").hide();
        $("#FDOC_Menu").hide();
        $("#IDOC_Menu").hide();
    }


    if (ShowMenu[AC_RPRT]) {    // گزارشات
        if (afiaccess[AP_TrzIKala] || afiaccess[AP_TrzIKalaExf] || afiaccess[AP_IDocR] || afiaccess[AP_Krdx]) {
            $("#IReport_Menu").show();
            $("#Dashbord").show();
            afiaccess[AP_TrzIKala] && ShowMenu[AC_TrzIKala] ? $("#TrzIKala").show() : $("#TrzIKala").hide();
            afiaccess[AP_TrzIKalaExf] && ShowMenu[AC_TrzIKalaExf] ? $("#TrzIKalaExf").show() : $("#TrzIKalaExf").hide();
            afiaccess[AP_IDocR] && ShowMenu[AC_IDocR] ? $("#IDocR").show() : $("#IDocR").hide();
            afiaccess[AP_Krdx] && ShowMenu[AC_Krdx] ? $("#Krdx").show() : $("#Krdx").hide();

            if (ShowMenu[AC_TrzIKala] == false && ShowMenu[AC_TrzIKalaExf] == false && ShowMenu[AC_IDocR] == false && ShowMenu[AC_Krdx] == false)
                $("#IReport_Menu").hide();
        }
        else {
            $("#IReport_Menu").hide();
        }

        if (afiaccess[AP_FDocR_S] || afiaccess[AP_FDocR_P] || afiaccess[AP_TrzFKala_S] || afiaccess[AP_TrzFKala_P] || afiaccess[AP_TrzFCust_S] || afiaccess[AP_TrzFCust_P]) {
            $("#FReport_Menu").show();
            $("#Dashbord").show();
            afiaccess[AP_FDocR_S] && ShowMenu[AC_FDocR_S] ? $("#FDocR_S").show() : $("#FDocR_S").hide();
            afiaccess[AP_FDocR_P] && ShowMenu[AC_FDocR_P] ? $("#FDocR_P").show() : $("#FDocR_P").hide();
            afiaccess[AP_TrzFKala_S] && ShowMenu[AC_TrzFKala_S] ? $("#TrzFKala_S").show() : $("#TrzFKala_S").hide();
            afiaccess[AP_TrzFKala_P] && ShowMenu[AC_TrzFKala_P] ? $("#TrzFKala_P").show() : $("#TrzFKala_P").hide();
            afiaccess[AP_TrzFCust_S] && ShowMenu[AC_TrzFCust_S] ? $("#TrzFCust_S").show() : $("#TrzFCust_S").hide();
            afiaccess[AP_TrzFCust_P] && ShowMenu[AC_TrzFCust_P] ? $("#TrzFCust_P").show() : $("#TrzFCust_P").hide();


            if (ShowMenu[AC_FDocR_S] == false && ShowMenu[AC_FDocR_P] == false && ShowMenu[AC_TrzFKala_S] == false &&
                ShowMenu[AC_TrzFKala_P] == false && ShowMenu[AC_TrzFCust_S] == false && ShowMenu[AC_TrzFCust_P] == false)
                $("#FReport_Menu").hide();
        }
        else {
            $("#FReport_Menu").hide();
        };



        if (afiaccess[AP_TrzAcc] || afiaccess[AP_Dftr] || afiaccess[AP_ADocR] || afiaccess[AP_TChk] || afiaccess[AP_AGMkz] || afiaccess[AP_AGOpr] || afiaccess[AP_GrdZAcc]) {
            $("#AReport_Menu").show();
            $("#Dashbord").show();
            afiaccess[AP_TrzAcc] && ShowMenu[AC_TrzAcc] == true ? $("#TrzAcc").show() : $("#TrzAcc").hide();
            afiaccess[AP_Dftr] && ShowMenu[AC_Dftr] == true ? $("#Dftr").show() : $("#Dftr").hide();
            afiaccess[AP_ADocR] && ShowMenu[AC_ADocR] == true ? $("#ADocR").show() : $("#ADocR").hide();
            afiaccess[AP_TChk] && ShowMenu[AC_TChk] == true ? $("#TChk").show() : $("#TChk").hide();

            afiaccess[AP_AGMkz] && ShowMenu[AC_AGMkz] == true ? $("#AGMkz").show() : $("#AGMkz").hide();
            afiaccess[AP_AGOpr] && ShowMenu[AC_AGOpr] == true ? $("#AGOpr").show() : $("#AGOpr").hide();
            afiaccess[AP_GrdZAcc] && ShowMenu[AC_GrdZAcc] == true ? $("#GrdZAcc").show() : $("#GrdZAcc").hide();

            afiaccess[AP_KhlAcc] && ShowMenu[AC_KhlAcc] == true ? $("#KhlAcc").show() : $("#KhlAcc").hide();
            afiaccess[AP_KhlZAcc] && ShowMenu[AC_KhlZAcc] == true ? $("#KhlZAcc").show() : $("#KhlZAcc").hide();



            if (ShowMenu[AC_TrzAcc] == false && ShowMenu[AC_Dftr] == false && ShowMenu[AC_ADocR] == false &&
                ShowMenu[AC_TChk] == false && ShowMenu[AC_AGMkz] == false && ShowMenu[AC_AGOpr] == false
                && ShowMenu[AC_GrdZAcc] == false && ShowMenu[AC_KhlAcc] == false && ShowMenu[AC_KhlZAcc] == false
            ) {
                $("#AReport_Menu").hide();
            }
        }
        else {
            $("#AReport_Menu").hide();
        }
    }
}


function SetValidationErj() {
    var ShowMenuErj = [false, false];
    if (accessErj == null) return false;
    if (accessErj.length == 0) return false;


    if (userName == user_Ace)
        accessErj[0].TrsName = 'ADMIN';

    if (access[0].TrsName == 'ADMIN') {
        sessionStorage.userModeErj = 'ADMIN';
        localStorage.setItem("userModeErj", "ADMIN");

    }
    else {
        sessionStorage.userModeErj = 'USER';
        localStorage.setItem("userModeErj", "USER");
    }



    if (accessErj[0].Trs == 0) {
        sessionStorage.AccessSanadErj = true;
        localStorage.setItem("AccessSanadErj", "true");
    }

    validation = CheckAccessReportErj('ErjDocK');
    ShowMenuErj[0] = validation;  // گزارش فهرست پرونده


    validation = CheckAccessReportErj('ErjDocErja');
    ShowMenuErj[1] = validation;  // گزارش فهرست ارجاعات

    validation = CheckAccessErj('ErjDoc');
    ShowMenuErj[2] = validation;  // پرونده ها

    validation = CheckAccessErj('AllDoc');
    ShowMenuErj[3] = validation;  // اسناد اتوماسیون

    if (erjaccess[0] == true || erjaccess[1] == true) {
        $("#EReport_Menu").show();
        erjaccess[0] == true && ShowMenuErj[0] == true ? $("#ErjDocK").show() : $("#ErjDocK").hide();
        erjaccess[1] == true && ShowMenuErj[1] == true ? $("#ErjDocB_Last").show() : $("#ErjDocB_Last").hide();

        if (ShowMenuErj[0] == false && ShowMenuErj[1] == false)
            $("#EReport_Menu").hide();
    }
    else {
        $("#EReport_Menu").hide();
    }

    if (ShowMenuErj[3] == true) {

        if (erjaccess[2] == true || erjaccess[3] == true || erjaccess[4] == true) {
            $("#ErjaDOC_Menu").show();
            erjaccess[2] == true && ShowMenuErj[2] == true ? $("#ErjaDOC").show() : $("#ErjaDOC").hide();
            erjaccess[3] == true ? $("#Erja_Resive").show() : $("#Erja_Resive").hide();
            erjaccess[3] == true ? $("#P_NotificationErja").show() : $("#P_NotificationErja").hide();
            erjaccess[4] == true ? $("#Erja_Send").show() : $("#Erja_Send").hide();
            //erjaccess[0] == true && ShowMenuErj[0] == true ? $("#ErjDocK").show() : $("#ErjDocK").hide();
            //erjaccess[1] == true && ShowMenuErj[1] == true ? $("#ErjDocB_Last").show() : $("#ErjDocB_Last").hide();
        }
        else {
            $("#ErjaDOC_Menu").hide();
            $("#P_NotificationErja").hide();
        }



        validation = CheckAccessErj('NEW_ErjDOC');// new parvandeh
        validation == true ? $("#AddNewErjDocH").show() : $("#AddNewErjDocH").hide()

        validation = CheckAccessErj('CHG_ErjDOC');// edit parvandeh
        //validation == true ? $("#UpdateErjDocH").show() : $("#UpdateErjDocH").hide()
        validation == true ? sessionStorage.CHG_ErjDOC = true : sessionStorage.CHG_ErjDOC = false
        validation == true ? localStorage.setItem("CHG_ErjDOC", "true") : localStorage.setItem("CHG_ErjDOC", "false")

        validation = CheckAccessErj('DEL_ErjDOC'); // delete parvandeh
        //validation == true ? $("#DeleteErjDocH").show() : $("#DeleteErjDocH").hide()
        validation == true ? sessionStorage.DEL_ErjDOC = true : sessionStorage.DEL_ErjDOC = false
        validation == true ? localStorage.setItem("DEL_ErjDOC", "true") : localStorage.setItem("DEL_ErjDOC", "false")

        validation = CheckAccessErj('OTHERUSER_ErjDOC');
        validation == true ? sessionStorage.AccessSanadErj = true : sessionStorage.AccessSanadErj = false
        validation == true ? localStorage.setItem("AccessSanadErj", "true") : localStorage.setItem("AccessSanadErj", "false")

        validation = CheckAccessErj('ATTACH');
        validation == true ? localStorage.setItem("ATTACH", "true") : localStorage.setItem("ATTACH", "false")

        validation = CheckAccessErj('NEW_ATTACH');
        validation == true ? localStorage.setItem("NEW_ATTACH", "true") : localStorage.setItem("NEW_ATTACH", "false")

        validation = CheckAccessErj('DEL_ATTACH');
        validation == true ? localStorage.setItem("DEL_ATTACH", "true") : localStorage.setItem("DEL_ATTACH", "false")

        validation = CheckAccessErj('VIEW_ATTACH');
        validation == true ? localStorage.setItem("VIEW_ATTACH", "true") : localStorage.setItem("VIEW_ATTACH", "false")


    }
    else {
        //$("#EReport_Menu").hide();
        $("#ErjaDOC_Menu").hide();
        $("#P_NotificationErja").hide();
    }
}
*/


$('.rightClick').on("contextmenu", function () {
    id = $(this).attr('id');
    if (id == "ADOC") {
        localStorage.setItem('listFilterADoc', null);
        localStorage.setItem("ModeCode", 'ADOC');
        sessionStorage.ModeCode = 'ADOC';
        sessionStorage.lastPageSelect = 0;
    }
});

$('.rightClick').click("contextmenu", function () {
    id = $(this).attr('id');

});



var host = 'http://' + $(location).attr('host');

$("#ADOC").click(function () {
    localStorage.setItem('listFilterADoc', null);
    localStorage.setItem("ModeCode", 'ADOC');
    sessionStorage.ModeCode = 'ADOC';
    sessionStorage.lastPageSelect = 0;
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);

    localStorage.setItem("DocNoAFISanad", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));

    sessionStorage.IsReport = "false";
});

$("#FDOC_SO").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SO;
    sessionStorage.InOut = 2; // فروش
    sessionStorage.lastPageSelect = 0;
    localStorage.setItem('listFilter' + sessionStorage.ModeCode, null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);

    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});


$("#FDOC_SP").click(function () {

    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SP;
    sessionStorage.InOut = 2; // فروش
    sessionStorage.lastPageSelect = 0;
    localStorage.setItem('listFilter' + sessionStorage.ModeCode, null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_S").click(function () {
    localStorage.setItem('listFilter', null);
    localStorage.setItem("ModeCode", sessionStorage.MODECODE_FDOC_S);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_S;
    sessionStorage.InOut = 2;// فروش
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter' + sessionStorage.ModeCode, null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_SR").click(function () {
    localStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SR;
    sessionStorage.InOut = 2;// فروش
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter' + sessionStorage.ModeCode, null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_SH").click(function () {
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SH;
    sessionStorage.InOut = 2;// فروش
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter' + sessionStorage.ModeCode, null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_SE").click(function () {
    localStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_SE;
    sessionStorage.InOut = 2;// فروش
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter' + sessionStorage.ModeCode, null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_PO").click(function () {
    localStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_PO;
    sessionStorage.InOut = 1;// خرید
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter' + sessionStorage.ModeCode, null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_PP").click(function () {
    localStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_PP;
    sessionStorage.InOut = 1;// خرید
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter' + sessionStorage.ModeCode, null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDOC_P").click(function () {
    localStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_P;
    sessionStorage.InOut = 1;// خرید
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter' + sessionStorage.ModeCode, null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});


$("#FDOC_PR").click(function () {
    localStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = sessionStorage.MODECODE_FDOC_PR;
    sessionStorage.InOut = 1;// خرید
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilter' + sessionStorage.ModeCode, null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFIFactor", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#IDOC_I").click(function () {
    localStorage.setItem('listFilter', null);
    sessionStorage.ModeCode = '';
    sessionStorage.InOut = 1;
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilterIDocH_I', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFISanadAnbar", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});

$("#IDOC_O").click(function () {
    sessionStorage.ModeCode = '';
    sessionStorage.InOut = 2;
    sessionStorage.lastPageSelect = 0;

    localStorage.setItem('listFilterIDocH_O', null);
    localStorage.setItem('ModeCode', sessionStorage.ModeCode);
    localStorage.setItem('InOut', sessionStorage.InOut);
    localStorage.setItem('lastPageSelect', sessionStorage.lastPageSelect);
    localStorage.setItem("DocNoAFISanadAnbar", null);
    sessionStorage.IsReport = "false";
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});



$("#Erja_Resive").click(function () {
    sessionStorage.ModeCodeErja = 1;
    //localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCodeErja', sessionStorage.ModeCodeErja);
    localStorage.SetItem('DocNoErjReport', null);
    localStorage.SetItem('DocNoErjDocK', null);
});

$("#P_NotificationErja").click(function () {
    sessionStorage.ModeCodeErja = 1;

    //localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCodeErja', sessionStorage.ModeCodeErja);
});


$("#Erja_Send").click(function () {
    sessionStorage.ModeCodeErja = 2;

    //localStorage.setItem('listFilter', null);
    localStorage.setItem('ModeCodeErja', sessionStorage.ModeCodeErja);
    localStorage.SetItem('DocNoErjReport', null);
    localStorage.SetItem('DocNoErjDocK', null);
});


$("#ErjaDOC").click(function () {
    localStorage.SetItem('DocNoErjReport', null);
    localStorage.SetItem('DocNoErjDocK', null);
});

$("#ErjDocK").click(function () {
    localStorage.SetItem('DocNoErjReport', null);
    localStorage.SetItem('DocNoErjDocK', null);
});

$("#ErjDocB_Last").click(function () {
    localStorage.SetItem('DocNoErjReport', null);
    localStorage.SetItem('DocNoErjDocK', null);
});




$("#TrzAcc").click(function () {
    localStorage.setItem("AccCodeReport", null);
    localStorage.setItem("LevelReport", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});


$("#ADocR").click(function () {
    localStorage.setItem("AccCodeReport", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});


$("#Dftr").click(function () {
    localStorage.setItem("AccCodeReport", null);
    localStorage.setItem("AccNameReport", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});


$("#TChk").click(function () {
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});

$("#AGMkz").click(function () {
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});

$("#AGOpr").click(function () {
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});

$("#GrdZAcc").click(function () {
    localStorage.setItem("AccCodeReport", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});


$("#KhlAcc").click(function () {
    //localStorage.setItem("AccCodeReport", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});

$("#KhlZAcc").click(function () {
    //localStorage.setItem("AccCodeReport", null);
    localStorage.setItem("SalAcc", localStorage.getItem("sal"));
});


$("#TrzFKala_S").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#TrzFKala_P").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#TrzFCust_S").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#TrzFCust_P").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});


$("#FDocR_S").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});

$("#FDocR_P").click(function () {
    localStorage.setItem("SalFct", localStorage.getItem("sal"));
});



$("#Krdx").click(function () {
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});

$("#TrzIKala").click(function () {
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});

$("#TrzIKalaExf").click(function () {
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});

$("#IDocR").click(function () {
    localStorage.setItem("SalInv", localStorage.getItem("sal"));
});

function showNotification(text, colorNumber, From, Align, time) {

    placementFrom = From == null ? sessionStorage.placementFrom : From;
    placementAlign = Align == null ? sessionStorage.placementAlign : Align;
    animateEnter = sessionStorage.animateEnter;
    animateExit = sessionStorage.animateExit;
    if (colorNumber == 0)
        colorName = 'alert-danger';
    else if (colorNumber == 1)
        colorName = 'alert-success';
    else if (colorNumber == 2)
        colorName = 'alert-warning';
    else if (colorNumber == 3)
        colorName = 'alert-info';
    else
        colorName = 'bg-black';

    if (text === null || text === '') { text = 'خطای برنامه نویسی : متن هشدار وارد نشده است'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    var allowDismiss = true;

    $.notify({
        message: text
    },
        {
            type: colorName,
            allow_dismiss: allowDismiss,
            newest_on_top: true,
            timer: time = null ? 1000 : time,
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            animate: {
                enter: animateEnter,
                exit: animateExit
            },
            template:
                '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
}


$('#ADOC_Menu').click(function () {
    sessionStorage.SelectMenu = 0;
});

$('#FDOC_Menu').click(function () {
    sessionStorage.SelectMenu = 1;
});

$('#IDOC_Menu').click(function () {
    sessionStorage.SelectMenu = 2;
});

$('#AReport_Menu').click(function () {
    sessionStorage.SelectMenu = 3;
});

$('#FReport_Menu').click(function () {
    sessionStorage.SelectMenu = 4;
});

$('#IReport_Menu').click(function () {
    sessionStorage.SelectMenu = 5;
});


$('#EReport_Menu').click(function () {
    sessionStorage.SelectMenu = 6;
});

$('#ErjaDOC_Menu').click(function () {
    sessionStorage.SelectMenu = 7;
});

$('#Base_Menu').click(function () {
    sessionStorage.SelectMenu = 8;
});

$('#Dashbord').click(function () {
    sessionStorage.SelectMenu = 9;
});


$('#Dashbord').removeAttr('class');
$('#Base_Menu').removeAttr('class');
$('#ADOC_Menu').removeAttr('class');
$('#FDOC_Menu').removeAttr('class');
$('#IDOC_Menu').removeAttr('class');
$('#AReport_Menu').removeAttr('class');
$('#IReport_Menu').removeAttr('class');
$('#FReport_Menu').removeAttr('class');
$('#EReport_Menu').removeAttr('class');
$('#ErjaDOC_Menu').removeAttr('class');

if (sessionStorage.SelectMenu == 0) {
    $('#ADOC_Menu').attr('class', 'active');
}

if (sessionStorage.SelectMenu == 1) {
    $('#FDOC_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 2) {
    $('#IDOC_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 3) {
    $('#AReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 4) {
    $('#FReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 5) {
    $('#IReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 6) {
    $('#EReport_Menu').attr('class', 'active');
}

else if (sessionStorage.SelectMenu == 7) {
    $('#ErjaDOC_Menu').attr('class', 'active');
}

if (sessionStorage.SelectMenu == 8) {
    $('#Base_Menu').attr('class', 'active');
}

if (sessionStorage.SelectMenu == 9) {
    $('#Dashbord').attr('class', 'active');
}



$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
        if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
    });
};






var counterColumn;

function CreateTableColumn(data) {
    var cols = '';
    $("#TableColumn").empty();

    for (var i = 1; i <= data.length; i++) {
        cols += ' <tr id="PanelColumns' + i + '"> ' +
            '    <td id="RowColumns' + i + '"></td> ' +
            '    <td id="TextColumns' + i + '"></td> ' +
            '    <td style="padding: 0px 10px;text-align: left;"> ' +
            '        <input id = "SettingColumns' + i + '" type = "checkbox" />' +
            '    </td > ' +
            '</tr> '
    }

    $('#TableColumn').append(
        cols
    );
}

function SetColumn(code, indexId, data, mode) {
    var index = -1;
    var name = '';
    var user = '';
    for (i = 0; i < data.length; i++) {
        item = data[i];
        user = item.UserCode;
        if (item.Code == code && item.Name != "") {
            index = i;
        }
    }
    if (index >= 0) {
        counterColumn++;
        name = data[index].Name;
        visible = data[index].Visible;
        findCode = code.search("Code");
        if (user == "*Default*" &&
            (
                (code.lastIndexOf("Code") > 0 && code != "AccCode" && code != "AccFullCode") ||
                code.lastIndexOf("LtnCode") > 0 ||
                code.lastIndexOf("Amount2") > 0 ||
                code.lastIndexOf("Amount3") > 0 ||
                code.lastIndexOf("UnitPrice2") > 0 ||
                code.lastIndexOf("UnitPrice3") > 0 ||

                code.lastIndexOf("UnitName2") > 0 ||
                code.lastIndexOf("UnitName3") > 0 ||

                code == "iAddMin1" ||
                code == "iAddMin2" ||
                code == "iAddMin3" ||

                code == "DimX" ||
                code == "DimY" ||
                code == "DimZ" ||

                code == "Amount" ||
                code == "Amount2" ||
                code == "Amount3" ||

                code == "UnitPrice2" ||
                code == "UnitPrice3" ||

                code == "CheckRadif" ||
                code == "CheckComm" ||
                code == "CheckVosoolDate" ||

                code == "ThvlRegion" ||
                code == "ThvlOstan" ||
                code == "ThvlShahrestan" ||
                code == "ThvlCity" ||
                code == "ThvlStreet" ||
                code == "ThvlAlley" ||
                code == "ThvlPlack" ||
                code == "ThvlZipCode" ||
                code == "ThvlTel" ||
                code == "ThvlMobile" ||
                code == "ThvlFax" ||
                code == "ThvlEMail" ||
                code == "ThvlAddress" ||
                code == "ThvlMelliCode" ||
                code == "ThvlEcoCode" ||

                code == "CustEcoCode" ||
                code == "CustMelliCode" ||
                code == "CustTel" ||
                code == "CustFax" ||
                code == "CustMobile" ||
                code == "CustEmail" ||
                code == "CustCity" ||
                code == "CustStreet" ||
                code == "CustAlley" ||
                code == "CustPlack" ||
                code == "CustZipCode" ||
                code == "CustAddress" ||
                code == "CustOstan" ||
                code == "CustShahrestan" ||
                code == "CustRegion" ||
                code == "ArzName" ||
                code == "ArzRate" ||
                code == "ArzValue" ||
                (code == "ToUserName" && mode == "ErjDocB_Last_D") ||
                (code == "FromUserName" && mode == "ErjDocB_Last_E") ||
                code == "Shobe" ||
                code == "Jari" ||
                code == "F01" ||
                code == "F02" ||
                code == "F03" ||
                code == "F04" ||
                code == "F05" ||
                code == "F06" ||
                code == "F07" ||
                code == "F08" ||
                code == "F09" ||
                code == "F10" ||
                code == "F11" ||
                code == "F12" ||
                code == "F13" ||
                code == "F14" ||
                code == "F15" ||
                code == "F16" ||
                code == "F17" ||
                code == "F18" ||
                code == "F19" ||
                code == "F20" ||

                code == "CustF01" ||
                code == "CustF02" ||
                code == "CustF03" ||
                code == "CustF04" ||
                code == "CustF05" ||
                code == "CustF06" ||
                code == "CustF07" ||
                code == "CustF08" ||
                code == "CustF09" ||
                code == "CustF10" ||
                code == "CustF11" ||
                code == "CustF12" ||
                code == "CustF13" ||
                code == "CustF14" ||
                code == "CustF15" ||
                code == "CustF16" ||
                code == "CustF17" ||
                code == "CustF18" ||
                code == "CustF19" ||
                code == "CustF20" ||

                code == "KalaF01" ||
                code == "KalaF02" ||
                code == "KalaF03" ||
                code == "KalaF04" ||
                code == "KalaF05" ||
                code == "KalaF06" ||
                code == "KalaF07" ||
                code == "KalaF08" ||
                code == "KalaF09" ||
                code == "KalaF10" ||
                code == "KalaF11" ||
                code == "KalaF12" ||
                code == "KalaF13" ||
                code == "KalaF14" ||
                code == "KalaF15" ||
                code == "KalaF16" ||
                code == "KalaF17" ||
                code == "KalaF18" ||
                code == "KalaF19" ||
                code == "KalaF20"
            )
        ) {
            visible = 0;
        }
        $('#RowColumns' + indexId).text(counterColumn);
        $('#TextColumns' + indexId).text(name);
        $('#SettingColumns' + indexId).prop('checked', visible == 1 ? true : false);
        $('#PanelColumns1').removeAttr('hidden', '');
    }
    else {
        $('#PanelColumns' + indexId).attr('hidden', '');
        $('#TextColumns' + indexId).text(translate('تعریف نشده'));
        $('#SettingColumns' + indexId).prop('checked', false);
        $('#RowColumns' + indexId).text(-1);
    }
}

function SaveColumn(ace, sal, group, rprtId, route, columns, data) {
    var obj = [];
    for (i = 1; i <= columns.length; i++) {
        item = data[i];
        $('#SettingColumns' + (i)).is(':checked') == true ? Visible = 1 : Visible = 0;
        tmp = {
            'UserCode': userName,
            'RprtId': rprtId,
            'Code': columns[i - 1],
            'Visible': Visible,
            'Position': i,
            'Width': 100
        };
        obj.push(tmp);
    }

    $('#modal-SettingColumn').modal('hide');
    showNotification(translate('در حال ذخیره تنظیمات ستون ها ...'), 1);
    ajaxFunction(RprtColsSaveUri + ace + '/' + sal + '/' + group, 'POST', obj).done(function (response) {
        getRprtAllCols();
    });

    window.location.href = route;
}



//report

var viewer = null;
var designer = null;
var options = null;
var report = null;
var dataSet = null;

function createViewer() {
    if (options == null) {
        // var Stimulsoft = require('stimulsoft-reports-js');
        Stimulsoft.Base.Localization.StiLocalization.addLocalizationFile("/Content/Report/Lang/fa.xml", true, "persion (fa)");
        //Stimulsoft.Base.StiFontCollection(Stimulsoft.Base.StiFontCollection.getFontFamilies());
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BZiba.ttf", "Karbord_Ziba");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BZAR.ttf", "Karbord_ZAR");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYEKAN.ttf", "Karbord_YEKAN");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTITRBD.ttf", "Karbord_TITRBD");
        Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BNAZANIN.ttf", "Karbord_NAZANIN");
        //Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("Vazir-FD-WOL.ttf", "Vazir-FD-WOL");

        options = new Stimulsoft.Viewer.StiViewerOptions();
        viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);



        options.appearance.showSystemFonts = false;
        options.height = "100%";
        options.appearance.fullScreenMode = true;
        options.appearance.scrollbarsMode = true;
        options.toolbar.showSaveButton = true;


        //options.toolbar.showDesignButton = false;
        options.toolbar.showDesignButton = sessionStorage.UserAdmin == 'true';

        if (sessionStorage.UserAdmin == 'true') {
            $('#DesignPrint').attr('style', 'display: unset');
        } else {
            $('#DesignPrint').attr('style', 'display: none');
        }




        options.toolbar.showFullScreenButton = false;

        options.toolbar.printDestination = Stimulsoft.Viewer.StiPrintDestination.Direct;
        options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;
        options.toolbar.zoom = 100;
        options.toolbar.showCloseButton = true;
        options.toolbar.showSendEmailButton = true;


        viewer.onEmailReport = function (args) {
            //sendMail();
            //window.open('mailto:test@example.com?subject=subject&body=body');
            // args.settings -  send email form
            // args.settings.email  -  email adress
            // args.settings.subject  -  email subject
            // args.settings.message  -  email message
            // args.format  -  export format - PDF, HTML, HTML 5, Excel2007, Word2007, CSV
            // args.fileName - report file name (name of attachement)
            // args.data  -  byte array with exported report file
            //sendMail('Test', args.settings.email, args.settings.subject, args.settings.message)
            sendMail(args.settings.email, args.settings.subject, args.settings.message, args.data, args.format);

        }


        report = new Stimulsoft.Report.StiReport();
        viewer.onDesignReport = function (e) {

            createDesigner();
        };
        viewer.renderHtml("viewerContent");

        var userButton = viewer.jsObject.SmallButton("userButton", "خروج");

        userButton.action = function () {
            $("#modal-Report").modal('hide');
        }

        var toolbarTable = viewer.jsObject.controls.toolbar.firstChild.firstChild;
        var buttonsTable = toolbarTable.rows[0].firstChild.firstChild;
        var userButtonCell = buttonsTable.rows[0].insertCell(0);
        userButtonCell.className = "stiJsViewerClearAllStyles";
        userButtonCell.appendChild(userButton);
    }
}


function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function sendMail(email, subject, body, attachment, format) {
    if (isEmail(email) == false) {
        return alert(translate('ایمیل را به صورت صحیح وارد کنید'));
    }

    var dataView = new Uint8Array(attachment);
    //var blob = new Blob([dataView], { type: 'img' });
    //a = URL.createObjectURL(blob);

    //var blob = new Blob([dataView], { type: 'octet/stream' });


    if (format == "Word2007")
        format = 'docx'
    else if (format == "Excel2007")
        format = 'xlsx'



    var file = new File([dataView], 'Report.' + format, { type: format });

    //var link = document.createElement('a');
    // link.href = window.URL.createObjectURL(file);
    //link.click();



    host = '';

    ajaxFunction(SmsandEmailUri + '/Email', 'GET').done(function (data) {
        host = SearchKey("SmtpServer", data);
        timeout = SearchKey("TimeOut", data);
        fromAddress = SearchKey("Sender", data);
        psw = SearchKey("Psw", data);
        port = SearchKey("Port", data);

        if (host == '' || host == null) {
            return alert(translate('تنظیمات ایمیل را در برنامه تنظیم کنید'));
        }
        var formData = new FormData();
        formData.append("fromAddress", fromAddress);
        formData.append("toAddress", email);
        formData.append("psw", psw);
        formData.append("subject", subject);
        formData.append("body", body);
        formData.append("host", host);
        formData.append("port", port);
        formData.append("timeout", timeout);
        formData.append("Atch", file == '' ? null : file);

        ajaxFunctionUpload(SendEmailUri, formData, true).done(function (response) {
            alert('ایمیل با موفقیت ارسال شد');
        })
    });


}


var DataReport;
function createDesigner() {
    viewer.visible = false;
    designer = null;
    var options = new Stimulsoft.Designer.StiDesignerOptions();
    options.appearance.fullScreenMode = true;
    options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;

    designer = new Stimulsoft.Designer.StiDesigner(options, "StiDesigner", false);
    designer.renderHtml("designerContent");

    designer.onExit = function (e) {
        this.visible = false;
        viewer.visible = false;
        $("#modal-Report").modal('hide');
    }

    designer.onSaveReport = function (e) {
        if (printPublic == false) {
            //designer.jsObject.SendCommandSaveAsReport();
            var jsonStr = e.report.saveToJsonString();
            SavePrintForm(sessionStorage.ModePrint, e.fileName, jsonStr);
        }
        else {
            alert(translate('فرم های چاپ عمومی امکان تغییر را ندارند'));
        }
    }

    designer.onSaveAsReport = function (e) {
        var jsonStr = e.report.saveToJsonString();
        var name = e.fileName;
        resTestSavePrintForm = "";

        TestSavePrintForm(sessionStorage.ModePrint, e.fileName);

        if (resTestSavePrintForm == "FindFile") {
            alert(translate("نام گزارش تکراری است و امکان ذخیره وجود ندارد"));
        }
        else {
            SavePrintForm(sessionStorage.ModePrint, e.fileName, jsonStr);
        }
    };

    report._reportFile = printName == null ? 'فرم چاپ' : printName;
    designer.report = report;
    designer.visible = true;

}
function setReport(reportObject, addressMrt, variablesObject) {
    DataReport = reportObject;
    if (DataReport.length == 0 || DataReport == null || DataReport == "") {
        return showNotification(translate('ابتدا گزارش گیری کنید'), 0);
    }

    var dStart = new Date();
    var secondsStart = dStart.getTime();
    dateDifference = DateNow + secondsStart; // عدد یونیک

    //addressMrt = '/Content/Report/' + addressMrt + '.mrt?dt=' + dateDifference;

    //if (addressMrt != "Free") {
    //    report.loadFile(j);
    //}

    report = new Stimulsoft.Report.StiReport();
    report.loadFile(addressMrt);

    report.dictionary.databases.clear();
    dataSet = new Stimulsoft.System.Data.DataSet("Database");
    DataReport = '{"Data":' + JSON.stringify(DataReport) + '}';

    dataSet.readJson(DataReport);
    report.regData(dataSet.dataSetName, "", dataSet);

    variablesDataSet = new Stimulsoft.System.Data.DataSet("variables");
    //"{"Data":[{"CoName":"","Amount1":11,"Amount2":0,"Amount3":0,"BandNo":1,"BandSpec":"","Comm":"232132\n21312","KalaCode":"16001","MainUnit":1,"MkzCode":"","OprCode":"","PrdCode":"","SerialNumber":129,"TotalPrice":0,"UnitPrice":0,"UP_Flag":true,"KalaName":"شکر","KalaZarib1":1,"KalaZarib2":1000,"KalaZarib3":1000000,"KalaUnitName1":"گرم","KalaUnitName2":"کيلو گرم","KalaUnitName3":"تن","KalaFanniNo":"","DeghatM1":2,"DeghatM2":2,"DeghatM3":2,"DeghatR1":2,"DeghatR2":2,"DeghatR3":2,"KGruCode":"101","MainUnitName":"گرم","DeghatR":2,"DocNo":"26","DocDate":"1384/03/30","Spec":"","InOut":2,"ThvlCode":"","ThvlName":"","InvCode":"1","InvName":"انبار مواد اولیه","ModeCode":"102","ModeName":"حواله خروج انبار","Footer":"","UnitName":"گرم","Amount":11,"EghdamName":"سوپروایزر","TanzimName":"سوپروایزر","TaeedName":"سوپروایزر","TasvibName":""}]}"
    variablesReport = '{"variables":[{' + variablesObject + '}]}';
    variablesDataSet.readJson(variablesReport);
    report.regData(variablesDataSet.dataSetName, "", variablesDataSet);


    titlesObject = '';
    for (var i = 0; i < ListColumns.length; i++) {
        titlesObject += '"' + ListColumns[i].Code + '":"' + ListColumns[i].Name + '",';
    }


    titlesDataSet = new Stimulsoft.System.Data.DataSet("Titles");
    titlesReport = '{"Titles":[{' + titlesObject + '}]}';
    titlesDataSet.readJson(titlesReport);
    report.regData(titlesDataSet.dataSetName, "", titlesDataSet);


    report.dictionary.synchronize();

    viewer.report = report;
    //report.render();

    viewer.visible = true;
    $('#modal-Report').modal('show');

    viewer.onExit = function (e) {
        this.visible = false;
    }

}


async function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: 'octet/stream' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};





function GetPrintForms(Mode) {

    var PrintForms_Object = {
        LockNumber: lockNumber,
        mode: Mode
    };
    ajaxFunction(PrintFormsUri + ace, 'POST', PrintForms_Object).done(function (data) {
        PrintFormsList(data);
    });
}


$('#refreshPrintForms').click(function () {
    Swal.fire({
        title: mes_Refresh,
        text: translate("لیست فرم های چاپ") + " " + translate("به روز رسانی شود ؟"),
        type: 'info',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        cancelButtonText: text_No,
        allowOutsideClick: false,
        confirmButtonColor: '#d33',
        confirmButtonText: text_Yes
    }).then((result) => {
        if (result.value) {
            $("div.loadingZone").show();
            GetPrintForms(sessionStorage.ModePrint);
            $("div.loadingZone").hide();
        }
    })
})

$('#modal-Report').on('hide.bs.modal', function () {
    GetPrintForms(sessionStorage.ModePrint);
});




function DeletePrintForm(address) {

    var DeletePrintForm_Object = {
        LockNumber: lockNumber,
        Address: address
    };
    ajaxFunction(DeletePrintFormUri + ace, 'POST', DeletePrintForm_Object).done(function (data) {

    });
}

function TestSavePrintForm(mode, name) {

    var TestSavePrintForm_Object = {
        LockNumber: lockNumber,
        Name: name,
        Mode: mode
    };
    ajaxFunction(TestSavePrintFormUri + ace, 'POST', TestSavePrintForm_Object).done(function (data) {
        resTestSavePrintForm = data;
    });
}

function SavePrintForm(mode, name, data) {

    var SavePrintForm_Object = {
        LockNumber: lockNumber,
        Name: name,
        Mode: mode,
        Data: data
    };
    ajaxFunction(SavePrintFormUri + ace, 'POST', SavePrintForm_Object).done(function (data) {

    });
}


function SelectedPrintForm(address, isPublic) {

    var SelectedPrintForm_Object = {
        LockNumber: lockNumber,
        Address: address,
        isPublic: isPublic,
    };
    ajaxFunction(SelectedPrintFormUri + ace, 'POST', SelectedPrintForm_Object).done(function (data) {

    });
}


function SelectedAccessGhimatPrintForm(address, isPublic) {

    var SelectedAccessGhimatPrintForm_Object = {
        LockNumber: lockNumber,
        Address: address,
        isPublic: isPublic,
    };
    ajaxFunction(SelectedAccessGhimatPrintFormUri + ace, 'POST', SelectedAccessGhimatPrintForm_Object).done(function (data) {
        if (data == "FindFile") {
            showNotification(translate('فایلی با نام مشابه وجود دارد و امکان تغییر نیست'), 0);
        }
    });
}




function FixSortName(name) {
    if (typeof name == "string" && name != "" && name.substring(0, 4) != '    ') {
        str = name.trim();
        str = str.replaceAll('آ', String.fromCharCode(1000));
        str = str.replaceAll('ا', String.fromCharCode(1001));
        str = str.replaceAll('ب', String.fromCharCode(1002));
        str = str.replaceAll('پ', String.fromCharCode(1003));
        str = str.replaceAll('ت', String.fromCharCode(1004));
        str = str.replaceAll('ث', String.fromCharCode(1005));
        str = str.replaceAll('ج', String.fromCharCode(1006));
        str = str.replaceAll('چ', String.fromCharCode(1007));
        str = str.replaceAll('ح', String.fromCharCode(1008));
        str = str.replaceAll('خ', String.fromCharCode(1009));
        str = str.replaceAll('د', String.fromCharCode(1010));
        str = str.replaceAll('ذ', String.fromCharCode(1011));
        str = str.replaceAll('ر', String.fromCharCode(1012));
        str = str.replaceAll('ز', String.fromCharCode(1013));
        str = str.replaceAll('ژ', String.fromCharCode(1014));
        str = str.replaceAll('س', String.fromCharCode(1015));
        str = str.replaceAll('ش', String.fromCharCode(1016));
        str = str.replaceAll('ص', String.fromCharCode(1017));
        str = str.replaceAll('ض', String.fromCharCode(1018));
        str = str.replaceAll('ط', String.fromCharCode(1019));
        str = str.replaceAll('ظ', String.fromCharCode(1020));
        str = str.replaceAll('ع', String.fromCharCode(1021));
        str = str.replaceAll('غ', String.fromCharCode(1022));
        str = str.replaceAll('ف', String.fromCharCode(1023));
        str = str.replaceAll('ق', String.fromCharCode(1024));
        str = str.replaceAll('ك', String.fromCharCode(1025));
        str = str.replaceAll('ک', String.fromCharCode(1026));
        str = str.replaceAll('گ', String.fromCharCode(1027));
        str = str.replaceAll('ل', String.fromCharCode(1028));
        str = str.replaceAll('م', String.fromCharCode(1029));
        str = str.replaceAll('ن', String.fromCharCode(1030));
        str = str.replaceAll('و', String.fromCharCode(1031));
        str = str.replaceAll('ه', String.fromCharCode(1032));
        str = str.replaceAll('ی', String.fromCharCode(1033));
        str = str.replaceAll('ي', String.fromCharCode(1033));
        //}
    }
    else {
        str = name;
    }

    return str
}

function fixedSize_JS(value, size) {
    if (typeof value != "string")
        value = value.toString();

    return value.padStart(size).substring(0, size);
}

function ViewSpec(Spec) {
    if (Spec.length > 15) {
        $('#titleComm').text(translate('ملاحظات'));
        $('#modal-Comm').modal('show');
        $('#commPublic').val(Spec);
    }
}


function ViewCustName(CustName) {
    if (CustName.length > 15) {
        $('#titleComm').text(translate('نام مشتری'));
        $('#modal-Comm').modal('show');
        $('#commPublic').val(CustName);
    }
}

function ViewCommAttach(Comm) {
    if (Comm.length > 15) {
        $('#titleComm').text(translate('شرح'));
        $('#modal-Comm').modal('show');
        $('#commPublic').val(Comm);
    }
}


$('#modal-Comm').on('show.bs.modal', function () {
    if ($('#commPublic').attr('readonly') == 'readonly')
        $('.insertComm').hide();
    else
        $('.insertComm').show();
})



$("#P_Box").hide();

if (localStorage.getItem("Inbox") == "1") {
    $("#P_Box").show();
}

if (group == "0") {
    $("#P_NotificationErja").hide();
}


function AppendAnbar(invName) {
    if (invName != null) {
        inc = invName.includes("انبار");
        if (inc == false) {
            invName = 'انبار ' + invName
        }
    }
    return invName
}


$("#AccessRefresh").click(function () {
    getAccessList(false);
});


$("#btn_Tiket").click(function () {
    window.open(tiketUrl + '?' + (lockNumber * 114820000008), '_blank');
});



function TestUseSanad(prog, year, FormName, Id, Insert, docNo) {
    var listUse = localStorage.getItem("list" + FormName + "Use");
    if (listUse == null) {
        localStorage.setItem("list" + FormName + "Use", "0");
        listUse = localStorage.getItem("list" + FormName + "Use");
    }
    data = ',' + Id;
    list = listUse.split(',');
    find = false;
    for (var i = 0; i < list.length; i++) {
        if (list[i] == Id) {
            find = true;
        }
    }



    dMode = 0;
    switch (FormName) {
        case "SanadHesab":
            dMode = 1;
            break;
        case "Factor":
            dMode = 2;
            break;
        case "SanadAnbar":
            dMode = 3;
            break;
        case "ErjDocH":
            dMode = 8;
            break;
    }



    var testUseDoc = false;
    var testUseDoc_UserName = '';
    var userUse = "";
    var testUseDoc = "";
    if (FormName != "Kala" && FormName != "Cust" && FormName != "Acc" && FormName != "Opr" && FormName != "Mkz" && FormName != "Arz" && FormName != "ZAcc" && find == false) {
        var DocInUseObject = {
            Prog: prog,
            DMode: dMode,
            GroupNo: group,
            Year: year,
            SerialNumber: Id
        };
        ajaxFunction(DocInUseUri, 'POST', DocInUseObject, false).done(function (response) {
            userUse = response[0].UserCode;
            testUseDoc_UserName = response[0].UserName;
            if (userUse != "") {
                testUseDoc = true;
            }
        });
    }

    if (testUseDoc == true) {
        showNotification(translate('توسط') + ' ' + testUseDoc_UserName + ' ' + translate('درحال استفاده است'), 2);
        return null;
    }
    else {
        if (find == true) {
            switch (FormName) {
                case "SanadHesab":
                    showNotification(translate('سند در تب دیگری وجود دارد'), 0)
                    break;
                case "Factor":
                    showNotification(translate('فاکتور در تب دیگری وجود دارد'), 0)
                    break;
                case "SanadAnbar":
                    showNotification(translate('سند انبار در تب دیگری وجود دارد'), 0)
                    break;
                case "ErjDocH":
                    showNotification(translate('پرونده در تب دیگری وجود دارد'), 0)
                    break;
            }
            return true;
            //showNotification('در حال استفاده', 0)
        }
        else {
            if (Insert == true) {
                localStorage.setItem("list" + FormName + "Use", list + data);

                if (docNo != null && docNo != "") {
                    // ذخیره سند باز شده در ویندوز

                    var SaveDocInUseObject = {
                        Prog: prog,
                        DMode: dMode,
                        GroupNo: group,
                        Year: year,
                        SerialNumber: Id,
                        DocNo: docNo
                    };
                    ajaxFunction(SaveDocInUseUri, 'POST', SaveDocInUseObject, false).done(function (response) {
                        a = response;
                    });
                }

            }
            return false;
        }
    }
}




async function RemoveUseSanad(prog, year, FormName, Id, exitDoc) {
    if (Id != null) {
        isClose = false;
        listUse = localStorage.getItem("list" + FormName + "Use");

        if (listUse == null) {
            localStorage.setItem("list" + FormName + "Use", "0");
            listUse = localStorage.getItem("list" + FormName + "Use");
        }

        listUse = listUse.replace(',' + Id, '');
        localStorage.setItem("list" + FormName + "Use", listUse);


        if ((FormName != "Kala" && FormName != "Cust" && FormName != "Acc" && FormName != "Opr" && FormName != "Mkz" && FormName != "Arz" && FormName != "ZAcc")) {
            dMode = 0;
            switch (FormName) {
                case "SanadHesab":
                    dMode = 1;
                    break;
                case "Factor":
                    dMode = 2;
                    break;
                case "SanadAnbar":
                    dMode = 3;
                    break;
                case "ErjDocH":
                    dMode = 8;
                    break;
            }

            if (exitDoc == false) {
                isClose = true;
            }
            else {
                // حذف سند باز شده توسط وب در ویندوز

                /*
                var DeleteDocInUseObject = {
                    Prog: prog,
                    DMode: dMode,
                    GroupNo: group,
                    Year: year,
                    SerialNumber: Id,
                };


                if (isFirefox) {
                    ajaxFunction(DeleteDocInUseUri, 'POST', DeleteDocInUseObject, false).done(function (response) {
                        isClose = true;
                    });

                }
                else {
                    ajaxFunction(DeleteDocInUseUri, 'POST', DeleteDocInUseObject, true).done(function (response) {
                        isClose = true;
                    });
                }*/
            }
        }

        if (isClose == false) {
            await sleep(1000);
        }
    }
}







const EditMode_New = 1;
const EditMode_Chg = 2;
const EditMode_Darj = 3;
const EditMode_Del = 4;
const EditMode_Link = 1;

const LogMode_ADoc = 1;
const LogMode_IDoc = 2;
const LogMode_FDoc = 3;
const LogMode_Acc = 4;
const LogMode_MKZ = 5;
const LogMode_OPR = 6;
const LogMode_ARZ = 7;
const LogMode_KALA = 8;
const LogMode_CUST = 9;
const LogMode_ZAcc = 10;


function SaveLog(progName, editMode, logMode, code, DocNo, serialNumber) {
    //mIdKarbord = localStorage.getItem("MachineIdKarbord")
    ipw = localStorage.getItem("IPW");
    //country = localStorage.getItem("CountryLogin");
    //city = localStorage.getItem("CityLogin");

    LogXObject = {
        'ProgName_': progName,
        'IP_': ipw,
        'GroupNo_': group,
        'Year_': sal,
        'EditMode_': editMode,
        'LogMode_': logMode,
        'Code_': code,
        'DocNo_': DocNo,
        'SerialNumber_': serialNumber
    };

    ajaxFunction(LogXUri, 'POST', LogXObject, true).done(function (response) {
        a = response;
        a = response;
    });
}




$('#minMaxComm').click(function () {
    var images = $('#imgComm').attr('src');

    if (images == '/Content/img/new item/minus-svgrepo-com.svg') {
        $('#imgComm').attr('src', '/Content/img/new item/square-svgrepo-com.svg');
        $("#modal-dialogComm").removeClass("modal-entesab");

    }
    else {
        $('#imgComm').attr('src', '/Content/img/new item/minus-svgrepo-com.svg');
        $("#modal-dialogComm").addClass("modal-entesab");
    }
})



function insertAtCaret(text, id) {
    var txtarea = document.getElementById(id == null ? "commPublic" : id);
    if (!txtarea) {
        return;
    }

    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        "ff" : (document.selection ? "ie" : false));
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
    } else if (br == "ff") {
        strPos = txtarea.selectionStart;
    }

    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + " " + text + " " + back;
    strPos = strPos + text.length;
    if (br == "ie") {
        txtarea.focus();
        var ieRange = document.selection.createRange();
        ieRange.moveStart('character', -txtarea.value.length);
        ieRange.moveStart('character', strPos);
        ieRange.moveEnd('character', 0);
        ieRange.select();
    } else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }

    txtarea.scrollTop = scrollPos;
}


function ShowNotificationWindows(title, mess) {
    if (window.Notification) {
        Notification.requestPermission(function (status) {
            console.log('Status: ', status); // show notification permission if permission granted then show otherwise message will not show
            var options = {
                image: '/Content/img/streamline-icon-alarm-bell-1@48x48.png',
                body: mess,
                dir: 'rtl'
            }
            var n = new Notification(title, options);
            n.onclick = (e) => {
                sessionStorage.ModeCodeErja = 1;
                localStorage.setItem('ModeCodeErja', sessionStorage.ModeCodeErja);
                localStorage.removeItem('DocNoErjReport');
                localStorage.removeItem('DocNoErjDocK');
                window.open(localStorage.getItem("urlErja"), '_blank');
            };
        });

    }
    else {
        ShowNotification('مرورگر شما از اعلان ها پشتیبانی نمی کند.', 0);
    }
}




function CountPage(list, pageSize, item) {
    allPage = Math.ceil(list.length / pageSize);
    allPage = allPage < 1 ? 1 : allPage;
    return item + ' از ' + allPage;
}


function LowDay(days) {
    var now = new Date();
    now.setDate(now.getDate() - days);
    return now.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).toEnglishDigit();
}



$("#dateTimeHome").text("تاریخ سرور " + localStorage.getItem("DateNow"))


function TestAccessRes(res) {
    if (res == "Not access to the group") {
        return "به گروه دسترسی ندارید"
    }
    else if (res == "Not access to the method") {
        return "دسترسی ندارید"
    }
    else return "";
}



function CreateBodyMess(list) {
    var countWarning = 0;
    var countError = 0;
    var textBody = "";

    $("#BodyTestLink").empty();

    for (var i = 0; i < list.length; i++) {
        textBody +=
            '<div class="body" style="padding:7px;">' +
            '    <div class="form-inline">';
        if (list[i].Test == 1) {
            countWarning += 1;
            textBody += ' <img src="/Content/img/Warning.jpg" width="22" style="margin-left: 3px;" />' +
                ' <a style="margin-left: 3px;" onclick="FocusRowGrid(' + i + ');"> ' + translate('هشدار :') + '</a>'
        }
        else {
            countError += 1;
            textBody += ' <img src="/Content/img/Error.jpg" width="22" style="margin-left: 3px;" />' +
                ' <a style="margin-left: 3px;" onclick="FocusRowGrid(' + i + ');">' + translate('خطا :') + '</a>'
        }

        tBand = translate('بند شماره') + ' ';
        if (list[i].TestName == "Opr")
            textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('پروژه مشخص نشده است') + ' </a>';

        else if (list[i].TestName == "Mkz")
            textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('مرکز هزینه مشخص نشده است') + ' </a>';

        else if (list[i].TestName == "Arz")
            textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('دارای حساب ارزی می باشد ولی ارز آن مشخص نیست') + ' </a>';

        else if (list[i].TestName == "Mahiat")
            textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('مانده حساب') + ' </a>' + '<p style="padding-left: 5px;padding-right: 5px;">' + list[i].AccCode + ' </p>' + '<p>' + translate('مغایر با ماهیت آن می شود') + '</p>';

        else if (list[i].TestName == "Balance")
            textBody += '<a onclick="FocusRowGrid(' + i + ');">' + translate('به دلیل خطاهای لینک سند بالانس نمی شود ') + ' </a>';

        else if (list[i].TestName == "ZeroBand")
            textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('دارای مبلغ نیست') + ' </a>';

        else if (list[i].TestName == "Traf")
            textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('طرف حساب انتخاب نشده است') + ' </a>';

        else if (list[i].TestName == "Check")
            textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('اطلاعات چک وارد نشده است') + ' </a>';

        else if (list[i].TestName == "HasZir")
            textBody += '<a onclick="FocusRowGrid(' + i + ');">' + tBand + list[i].BandNo + ' ' + translate('زیر حساب انتخاب نشده است') + ' </a>';

        else if (list[i].TestCap != "")
            textBody += '<a onclick="FocusRowGrid(' + i + ');">' + translate(list[i].TestCap) + '</a>';

        textBody +=
            '    </div>' +
            '</div>';
    }

    $('#BodyTestLink').append(textBody);
    $('#CountWarningLink').text(countWarning);
    $('#CountErrorLink').text(countError);

    if (countWarning > 0) {
        $('#ShowCountWarningLink').removeAttr('hidden', '');
    }
    else {
        $('#ShowCountWarningLink').attr('hidden', '');
    }

    if (countError > 0) {
        $('#ShowCountErrorLink').removeAttr('hidden', '');
        $("#modal-TestLink").modal('show');
    }
    else {
        $('#ShowCountErrorLink').attr('hidden', '');
    }

    return {
        "TextBody": textBody,
        "CountWarning": countWarning,
        "CountError": countError
    };
}


function isDoubleClicked(element) {
    //if already clicked return TRUE to indicate this click is not allowed
    if (element.data("isclicked")) return true;

    //mark as clicked for 1 second
    element.data("isclicked", true);
    setTimeout(function () {
        element.removeData("isclicked");
    }, 1000);

    //return FALSE to indicate this click was allowed
    return false;
}


function SaveSamaneMakeDoc(serialnumber, relatedGroup) {
    var SaveFDoc_SamaneMakeDocObject = {
        SerialNumber: serialnumber,
        RelatedGroup: relatedGroup,
    };
    ajaxFunction(SaveFDoc_SamaneMakeDocUri + ace + '/' + sal + '/' + group, 'POST', SaveFDoc_SamaneMakeDocObject, false).done(function (res) {
    });
}

