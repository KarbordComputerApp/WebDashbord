var server;


var check = 0;

var LoginUri; // 
var LoginTestUri;


//localStorage.removeItem("Karbord_LoginData");

var AccountUri = loginData.apiAccount + 'Account/'; // آدرس حساب

if (loginData.machineId == null) {
    var d = new Date();
    loginData.machineId = d.getDate() + d.getTime();
}

if (loginData.account_UserName == "") {
    $('#modal-service').modal('show');
}

$("#LoginAccount").click(function () {
    var userAccount = $("#userAccount").val();
    var passAccount = $("#passAccount").val();
    LoginAccount(userAccount, passAccount, true);
});

function LoginAccount(userAccount, passAccount, flagMessage = false) {
    if (userAccount == "" || userAccount == null) {
        return showNotification(translate('نام کاربری را وارد کنید'), 0);
    }
    if (passAccount == "" || passAccount == null) {
        return showNotification(translate('کلمه عبور را وارد کنید'), 0);
    }
    ajaxFunctionAccount(AccountUri + userAccount + '/' + passAccount, 'GET').done(function (data) {
        if (data === 0) {
            return showNotification(translate('نام مجوز ورود یا کلمه عبور اشتباه است'), 0);
        }
        else {
            if (flagMessage) {
                localStorage.removeItem("Karbord_LoginData");
                localStorage.removeItem("Karbord_PublicData");
                localStorage.removeItem("Karbord_DashbordData");
            }

            var ace = (data.AFI1_Group != null && data.AFI8_Group == null) ? prog_Web1 : (data.AFI1_Group == null && data.AFI8_Group != null) ? prog_Web8 : prog_Web2;
            account_UserName = userAccount;
            account_Password = passAccount;
            loginData.account_UserName = userAccount;
            loginData.account_Password = passAccount;
            loginData.companyName = data.CompanyName;
            loginData.apiAddress = data.AddressApi;
            loginData.apiAddressPos = data.AddressApiPos;
            loginData.afi1_Group = IsNull(data.AFI1_Group, "");
            loginData.afi8_Group = IsNull(data.AFI8_Group, "");
            loginData.erj_Group = IsNull(data.ERJ_Group, "");
            loginData.afi1_Access = IsNull(data.AFI1_Access, "");
            loginData.afi8_Access = IsNull(data.AFI8_Access, "");
            loginData.erj_Access = IsNull(data.ERJ_Access, "");

            loginData.baseValue.ace = ace;
            loginData.baseValue.groups = ace == prog_Web1 ? data.AFI1_Group : ace == prog_Web8 ? data.AFI8_Group : ace == prog_Web2 ? data.ERJ_Group : "";

            loginData.progCaption = ace == prog_Web1 ? "مالی بازرگانی" : ace == prog_Web8 ? "سیستم جامع" : ace == prog_Web2 ? "اتوماسیون" : "سایر";
            loginData.lockNumber = data.lockNumber;
            loginData.multilang = data.multilang;
            loginData.logoutmin = data.logoutmin == null ? 0 : data.logoutmin;
            loginData.whereKala = data.WhereKala;
            loginData.whereCust = data.WhereCust;
            loginData.whereThvl = data.WhereThvl;
            loginData.whereAcc = data.WhereAcc;
            loginData.master_ProgName = data.ProgName == 'ACC5' ? 'Acc5' : data.ProgName == 'FCT5' ? 'Fct5' : data.ProgName == 'INV5' ? 'Inv5' : data.ProgName == 'AFI1' ? 'Afi1' : data.ProgName == 'ERJ1' ? 'Erj1' : '';
            loginData.fct_or_Inv = data.Fct_or_Inv == 'FCT5' ? 'Fct5' : data.Fct_or_Inv == 'INV5' ? 'Inv5' : data.Fct_or_Inv;
            loginData.expireDate = data.toDate;
            loginData.DataAccount = JSON.stringify(data)

            $('#modal-service').modal('hide');
            if (flagMessage) {
                //getIP();
                return showNotification(translate('اتصال برقرار شد'), 1);
            }
        }
    });
}


$('#userName').val(loginData.userName);
$('#password').val(loginData.password);

$('#modal-service').on('shown.bs.modal', function () {
    $('#userAccount').val(loginData.account_UserName);
    $('#passAccount').val(loginData.account_Password);
    $('#userAccount').focus();
});

$("#LoginUser").click(function () {
    var userName = $("#userName").val();
    var password = $("#password").val();
    if (userName == "" || userName == null) {
        return showNotification(translate('نام کاربری را وارد کنید'), 0);
    }
    LoginUser(userName, password);
});

function LoginUser(userName, password) {
    LoginAccount(loginData.account_UserName, loginData.account_Password, false);
    SetUrl(loginData.apiAddress);
    var loginUri = loginData.apiAddress + '/api/Web_Data/Login';
    //var loginTestUri = loginData.ApiAddress + '/api/Web_Data/LoginTest';
    var changeDatabaseConfigUri = loginData.apiAddress + '/api/Web_Data/ChangeDatabaseConfig'; // آدرس بازسازی اطلاعات کانفیگ

    ajaxFunction(changeDatabaseConfigUri + '/' + lockNumber + '/true', 'GET', null, true).done(function (data) {
        if (data != 'OK') {
            return showNotification(translate('خطا در بازسازی اطلاعات'), 0);
        } else {
            var LoginObject = {
                userName: userName,
                pass: password,
                param1: user_Param1,
                param2: user_Param2,
            }
            ajaxFunction(loginUri, 'POST', LoginObject, true).done(function (data) {
                if (data.length == 1) {
                    item = data[0];
                    loginData.userName = userName.toUpperCase();
                    loginData.password = password;
                    loginData.userNameFa = item.Name;
                    loginData.userVstrCode = item.VstrCode;
                    loginData.invCode = item.InvCode;
                    loginData.mkzCode = item.MkzCode;
                    loginData.oprCode = item.OprCode;

                    if (item.Value == 1) {
                        var LoginTestObject = {
                            MachineId: loginData.machineId,
                            IPWan: loginData.ip,
                            Country: loginData.country,
                            City: loginData.city,
                            UserCode: loginData.userName,
                            ProgName: loginData.ace,
                            ProgVer: loginData.version,
                            ProgCaption: "وب : " + loginData.progCaption,
                            FlagTest: 0,
                            GroupNo: '',
                            Year: '',
                        }
                        ajaxFunction(loginUri + 'Test', 'POST', LoginTestObject).done(function (dataLoginTest) {
                            if (dataLoginTest == "MaxCount") {
                                return showNotification(translate('محدودیت ورود تعداد کاربران'), 0);
                            }

                            loginData.computerName = dataLoginTest.CompName;

                            date1 = new Date(dataLoginTest.SrvDate).getTime()
                            date2 = new Date(loginData.expireDate).getTime()
                            var date = date2 - date1
                            var difference_date = date / 86400000;
                            if (difference_date <= 31) {
                                alert("برنامه تحت وب شما تا تاریخ " + loginData.expireDate.toPersianDigit() + " فعال می باشد.لطفاجهت تمدید قرارداد با بخش فروش شرکت کاربرد کامپیوتر تماس حاصل فرمایید");
                            }

                            loginData.lastMachineId = dataLoginTest;
                            if (dataLoginTest.ID != -1) {
                                var ipW = dataLoginTest.CompName.split("-");
                                $('#title_dataUser').text(translate('کاربر') + ' ' + item.Name + ' ' + translate('قبلا وارد سیستم شده است'));
                                $('#param_ipw').text(ipW[1]);
                                $('#param_date').text(dataLoginTest.LoginDate);
                                $('#param_time').text(dataLoginTest.LoginTime);
                                $('#param_prog').text(dataLoginTest.ProgCaption);
                                $('#param_ver').text(dataLoginTest.ProgVer);
                                $('#param_country').text('');
                                $('#param_city').text('');
                                $('#modal-dataUser').modal('show');
                            }
                            else {
                                var ProgTrsObject = {
                                    User: loginData.userName,
                                }
                                ajaxFunction(loginData.apiAddress + '/api/Web_Data/ProgTrs/' + loginData.baseValue.ace, 'POST', ProgTrsObject).done(function (data) {
                                    p = '';
                                    for (var i = 0; i < data.length; i++) {
                                        p += data[i].prog + '-';
                                    }
                                    loginData.progAccess = p;
                                    if (p.includes(loginData.master_ProgName) == false) {
                                        loginData.orgProgName = loginData.master_ProgName
                                    }
                                    else {
                                        loginData.orgProgName = data[0].prog;
                                    }
                                });

                                var GroupsObject = {
                                    ProgName: loginData.orgProgName,
                                    User: loginData.userName,
                                    Groups: loginData.baseValue.groups.replaceAll('-', ',')
                                }

                                ajaxFunction(loginData.apiAddress + '/api/Web_Data/Groups', 'POST', GroupsObject).done(function (data) {
                                    loginData.baseValue.groupsData = data;

                                    var defultGroup = loginData.baseValue.defultGroup;
                                    if (defultGroup == null) {
                                        loginData.baseValue.defultGroup = ReplaceGroup(data[0].Code);
                                    }
                                    else {
                                        var item = data.find(c => c.Code == defultGroup);
                                        if (item == null)
                                            loginData.baseValue.defultGroup = ReplaceGroup(data[0].Code);
                                    }
                                    loginData.baseValue.groupsAccess = "";
                                    for (var i = 0; i < data.length; i++) {
                                        loginData.baseValue.groupsAccess += ReplaceGroup(data[i].Code) + ",";
                                    }

                                });

                                loginData.firstInputWeb = true;
                                if (loginData.baseValue.groups != "") {
                                    window.location.href = urlPage_Dashbord;
                                }
                                else {
                                    return showNotification("به گروهی دسترسی ندارید", 0);
                                }
                            }

                        });
                    }
                    else {
                        return showNotification(translate('نام کاربری یا کلمه عبور اشتباه است'), 0);
                        sessionStorage.userName = '';
                        sessionStorage.pass = '';
                        localStorage.setItem("userName", '');
                        localStorage.setItem('password', '');
                        localStorage.setItem('userNameFa', '');
                        localStorage.setItem('userVstrCode', '');
                    }
                }


                else {

                    if (data == "error") {
                        return showNotification(translate('اشکال در اتصال به سرور'), 0);
                    }

                    if (data == "Disable Account") {
                        return showNotification(translate('حساب شما مسدود شده است'), 0);
                    }

                    if (data == "Expire Account") {
                        return showNotification(translate('زمان استفاده شما از نرم افزار به پایان رسیده است'), 0);
                    }

                    if (data == "Not Access Web") {
                        return showNotification(translate('دسترسی به وب ندارید'), 0);
                    }
                }

            });

        }
    });
    localStorage.setItem("Inbox", 0);
    localStorage.setItem('Access', null);
    localStorage.setItem('AccessErj', null);
    sessionStorage.SelectMenu = 9;
    sessionStorage.Login = "OK";
    //getLoginData(userName, password);
}

function getIP() {
    ajaxFunctionAccount('http://ip-api.com/json/', 'GET').done(function (data) {
        loginData.ip = data.query;
        loginData.country = data.country;
        loginData.city = data.city;
    });
}


/*
function getLoginData(userName, password) {
    pass === '' ? pass = 'null' : pass = pass;
    var ChangeDatabaseConfigUri = server + '/api/Web_Data/ChangeDatabaseConfig'; // آدرس بازسازی اطلاعات کانفیگ
    ajaxFunction(ChangeDatabaseConfigUri + '/' + lockNumber + '/true', 'GET', null, true).done(function (data) {
        if (data != 'OK') {
            return showNotification(translate('خطا در بازسازی اطلاعات'), 0);
        }

        var LoginObject = {
            userName: user,
            pass: pass,
            param1: 'u-Xe',
            param2: 'zqQ3',
        }

        ajaxFunction(LoginUri, 'POST', LoginObject, true).done(function (data) {
            if (data.length == 1) {
                item = data[0];
                localStorage.setItem("userNameFa", item.Name);
                localStorage.setItem("userVstrCode", item.VstrCode);

                if (item.Value == 1) {
                    sessionStorage.onlyGroupErj = '';
                    localStorage.setItem('onlyGroupErj', '');
                    var progCaption;
                    if (localStorage.getItem('afi1List') == 'null' && localStorage.getItem('afi8List') != 'null') {
                        localStorage.setItem("ace", 'Web8');
                        sessionStorage.ace = 'Web8';
                        progCaption = translate('وب : سیستم جامع');

                        groups = localStorage.getItem('afi8List');
                        onlyGroupErj = '';

                        erj = localStorage.getItem('erjList');
                        afi = localStorage.getItem('afi8List');

                        if ((erj != null || erj != '') && erj != afi) {
                            erj = erj.split("-");
                            afi = afi.split("-");

                            for (var i = 0; i < erj.length; i++) {
                                if (afi.includes(erj[i]) == false) {
                                    if (erj[i] != 'null') {
                                        groups += '-' + erj[i];
                                        onlyGroupErj += erj[i] + '-'
                                    }
                                }
                            }

                            if (onlyGroupErj != '') {
                                onlyGroupErj = onlyGroupErj.substring(0, onlyGroupErj.length - 1);
                                sessionStorage.onlyGroupErj = onlyGroupErj;
                                localStorage.setItem('onlyGroupErj', onlyGroupErj);
                            }
                        }
                        tempAccess = localStorage.getItem('afi8Access');
                    }
                    else if (localStorage.getItem('afi1List') != 'null' && localStorage.getItem('afi8List') == 'null') {
                        localStorage.setItem("ace", 'Web1');
                        sessionStorage.ace = 'Web1';
                        progCaption = translate('وب : مالی بازرگانی');
                        groups = localStorage.getItem('afi1List');
                        onlyGroupErj = '';
                        erj = localStorage.getItem('erjList');
                        afi = localStorage.getItem('afi1List');

                        if ((erj != null || erj != '') && erj != afi) {
                            erj = erj.split("-");
                            afi = afi.split("-");

                            for (var i = 0; i < erj.length; i++) {
                                if (afi.includes(erj[i]) == false) {
                                    groups += '-' + erj[i];
                                    onlyGroupErj += erj[i] + '-'
                                }
                            }

                            if (onlyGroupErj != '') {
                                onlyGroupErj = onlyGroupErj.substring(0, onlyGroupErj.length - 1);
                                sessionStorage.onlyGroupErj = onlyGroupErj;
                                localStorage.setItem('onlyGroupErj', onlyGroupErj);
                            }
                        }
                    }
                    else {
                        localStorage.setItem("ace", 'Web2');
                        sessionStorage.ace = 'Web2';
                        progCaption = translate('وب : اتوماسیون');
                        groups = localStorage.getItem('erjList');
                    }
                    ipw = localStorage.getItem("IPW");
                    country = localStorage.getItem("CountryLogin");
                    city = localStorage.getItem("CityLogin");
                    var LoginTestObject = {
                        MachineId: MachineId,
                        IPWan: ipw,
                        Country: country,
                        City: city,
                        UserCode: user.toUpperCase(),
                        ProgName: sessionStorage.ace,
                        ProgVer: sessionStorage.ver,
                        ProgCaption: progCaption,
                        FlagTest: 0,
                        GroupNo: '',
                        Year: '',
                    }
                    ajaxFunction(LoginTestUri, 'POST', LoginTestObject).done(function (datalogin) {
                        if (datalogin == "MaxCount") {
                            return showNotification(translate('محدودیت ورود تعداد کاربران'), 0);
                        }
                        srvDate = datalogin.SrvDate;
                        expireDate = localStorage.getItem('expireDate');
                        date1 = new Date(srvDate).getTime()
                        date2 = new Date(expireDate).getTime()
                        var date = date2 - date1
                        var difference_date = date / 86400000;
                        if (difference_date <= 31) {
                            alert("برنامه تحت وب شما تا تاریخ " + expireDate.toPersianDigit() + " فعال می باشد.لطفاجهت تمدید قرارداد با بخش فروش شرکت کاربرد کامپیوتر تماس حاصل فرمایید");
                        }

                        loginData.lastMachineId = datalogin;
                        if (datalogin.ID == -1) {
                            sessionStorage.userName = user.toUpperCase();
                            sessionStorage.pass = pass;
                            localStorage.setItem("userName", user.toUpperCase());
                            localStorage.setItem('password', pass);
                            server = localStorage.getItem("ApiAddress");
                            var ProgTrsObject = {
                                User: sessionStorage.userName,
                            }
                            ace = localStorage.getItem("ace");
                            ajaxFunction(server + '/api/Web_Data/ProgTrs/' + ace, 'POST', ProgTrsObject).done(function (data) {
                                p = '';
                                for (var i = 0; i < data.length; i++) {
                                    p += data[i].prog + '-';
                                }
                                localStorage.setItem('ProgAccess', p);
                                Master_ProgName = localStorage.getItem('Master_ProgName');
                                Master_ProgName = Master_ProgName == 'ACC5' ? 'Acc5' : Master_ProgName == 'FCT5' ? 'Fct5' : Master_ProgName == 'INV5' ? 'Inv5' : Master_ProgName == 'AFI1' ? 'Afi1' : Master_ProgName == 'ERJ1' ? 'Erj1' : '';
                                if (p.includes(Master_ProgName) == true) {
                                    sessionStorage.OrgProgName = Master_ProgName;
                                }
                                else {
                                    sessionStorage.OrgProgName = data[0].prog;
                                }
                            });

                            localStorage.setItem('OrgProgName', sessionStorage.OrgProgName);
                            var GroupsObject = {
                                ProgName: sessionStorage.OrgProgName,
                                User: sessionStorage.userName,
                                Groups: groups.replaceAll('-', ',')
                            }

                            ajaxFunction(server + '/api/Web_Data/Groups', 'POST', GroupsObject).done(function (data) {
                                localStorage.setItem('afiList', JSON.stringify(data));
                            });

                            localStorage.removeItem("listForms");
                            localStorage.setItem('FirstInputWeb', "T");
                            if (group != null) {
                                //window.location.href = urlPage_Dashbord;
                            }
                            //else
                            //// window.location.href = urlPage_Dashbord;
                        }
                        else {
                            var ipW = datalogin.CompName.split("-");
                            $('#title_dataUser').text(translate('کاربر') + ' ' + item.Name + ' ' + translate('قبلا وارد سیستم شده است'));
                            $('#param_ipw').text(ipW[1]);
                            $('#param_date').text(datalogin.LoginDate);
                            $('#param_time').text(datalogin.LoginTime);
                            $('#param_prog').text(datalogin.ProgCaption);
                            $('#param_ver').text(datalogin.ProgVer);
                            $('#param_country').text('');
                            $('#param_city').text('');
                            $('#modal-dataUser').modal('show');
                        }
                    });
                }
                else {
                    return showNotification(translate('نام کاربری یا کلمه عبور اشتباه است'), 0);
                    sessionStorage.userName = '';
                    sessionStorage.pass = '';
                    localStorage.setItem("userName", '');
                    localStorage.setItem('password', '');
                    localStorage.setItem('userNameFa', '');
                    localStorage.setItem('userVstrCode', '');
                }
            }


            else {

                if (data == "error") {
                    return showNotification(translate('اشکال در اتصال به سرور'), 0);
                }

                if (data == "Disable Account") {
                    return showNotification(translate('حساب شما مسدود شده است'), 0);
                }

                if (data == "Expire Account") {
                    return showNotification(translate('زمان استفاده شما از نرم افزار به پایان رسیده است'), 0);
                }

                if (data == "Not Access Web") {
                    return showNotification(translate('دسترسی به وب ندارید'), 0);
                }
            }

        });
    });
}

*/


$("#Login_LogOutUser").click(function () {
    m_id = loginData.lastMachineId.CompName.split('-');
    user = $("#user").val();
    var LogOutObject = {
        MachineId: m_id[0],
        UserCode: loginData.userName,
        ProgName: ace
    }
    ajaxFunction(LogOutUri, 'POST', LogOutObject).done(function (datalogin) {
        LoginUser(loginData.userName, loginData.password);
    });

});




if (loginData.userName != null && loginData.userName != '') {
    LoginUser(loginData.userName, loginData.password);
}



$("#user").focus();

$("#user").keydown(function (e) {
    if (e.keyCode == key_Enter) {
        $("#pass").focus();
    }
});

$("#pass").keydown(function (e) {
    if (e.keyCode == key_Enter) {
        LoginUser();
    }
});


$("#userAccount").keydown(function (e) {
    if (e.keyCode == key_Enter) {
        $("#passAccount").focus();
    }
});

$("#passAccount").keydown(function (e) {
    if (e.keyCode == key_Enter) {
        var userAccount = $("#userAccount").val();
        var passAccount = $("#passAccount").val();
        LoginAccount(userAccount, passAccount, true);
    }
});

(function () {
    var now = new Date();
    var version = now.getFullYear().toString() + "0" + now.getMonth() + "0" + now.getDate();
    //"0" + now.getHours();
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://app.najva.com/static/css/local-messaging.css" + "?v=" + version;
    head.appendChild(link);
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://app.najva.com/static/js/scripts/174-website-27295-a0b970d7-1466-49f3-bf2b-1cfa6674e8e9.js" + "?v=" + version;
    head.appendChild(script);
})()