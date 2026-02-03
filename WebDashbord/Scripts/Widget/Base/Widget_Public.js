var baseData = {};


const d_inv = 'Inv';
const d_kGru = 'KGru';
const d_kala = 'Kala';
const d_cGru = 'CGru';
const d_cust = 'Cust';
const d_opr = 'Opr';
const d_mkz = 'Mkz';
const d_acc = 'Acc';
const d_status = 'Status';
const d_aMode = 'AMode';

const type_Farsi = 1;
const type_En = 2;
const type_ShamsiDate = 3;
const type_Number = 4;
const type_Currency = 5;
const type_Code = 6;
const type_DocNo = 7;
const type_Time = 8;
const type_Boolean = 9;

const type_Byte = "byte";
const type_Int = "int";
const type_BigInt = "bigint";
const type_Float = "float";
const type_Curr = "curr";
const type_String = "string";
const type_Date = "Date";

const td_Mode = "checkbox";


const max_Byte = 255;
const max_Int = 2147483647;
const max_BigInt = 9223372036854775807;
const max_Float = 9223372036854775807;

const length_Byte = 3;
const length_Int = 10;
const length_BigInt = 19;
const length_Float = 19;
const length_Date = 10;
const length_Max = 250;



const color_Radif = "#d9d9d9";
const color_RowSum = "#e8964d";//"#e37d228f";
const color_RowSearch = "#efb683";
const color_RowKey = "#f5efeb";

const mode_Sort_DESC = 'DESC';

const f_Columns = 'Columns';
const f_Control = 'Control';
const f_GetData = 'GetData';
const f_Print = 'Print';
const f_Select = 'Select';

const widgetPublic = '#WidgetPublic';

var cssMaximin = {
    "top": "0px",
    "left": "0px",
    "width": "100%",
    "height": "100vh",
    "z-index": "10000"
};

var columns_Type = [
    { Code: 'Code', Name: 'کد', Type: type_Code, Visible: 1 },
    { Code: 'Name', Name: 'نام', Type: type_Farsi, Visible: 1 },
    { Code: 'Spec', Name: 'ملاحظات', Type: type_Farsi, Visible: 1 },
];

var columns_TypeStatus = [
    { Code: 'Status', Name: 'نام', Type: type_Farsi, Visible: 1 }
];
var columns_TypePrint = [
    { Code: 'code', Name: 'کد', Type: type_Number, Visible: 1 },
    { Code: 'name', Name: 'نام', Type: type_Farsi, Visible: 0 },
    { Code: 'namefa', Name: 'نام', Type: type_Farsi, Visible: 1 }
];

var columns_TypePrint_Setting = [
    { Code: 'code', Name: 'کد', Type: type_Number, Visible: 1 },
    { Code: 'Selected', Name: 'وضعیت', Type: type_Boolean, Visible: 1 },
    { Code: 'accessGhimat', Name: 'بدون قیمت', Type: type_Boolean, Visible: 1 },
    { Code: 'namefa', Name: 'نام', Type: type_Farsi, Visible: 1 }
];

var columns_TypeKala = [
    { Code: 'Code', Name: 'کد', Type: type_Code, Visible: 1 },
    { Code: 'Name', Name: 'نام', Type: type_Farsi, Visible: 1 },
    { Code: 'FanniNo', Name: 'شماره فنی', Type: type_En, Visible: 1 },
    { Code: 'Spec', Name: 'ملاحظات', Type: type_Farsi, Visible: 1 },
];

var tableBtnDefult = [
    { name: f_GetData, caption: "گزارش گیری", icon: "/Content/img/SanadAnbar.png" },
    { name: f_Control, caption: "کنترل گزارش", icon: "/Content/img/streamline-icon-cog-1@48x48.png" },
    { name: "Print", caption: "چاپ", icon: "/Content/img/sanad/streamline-icon-print-text@48x48.png" },
    { name: f_Columns, caption: "تنظیم ستون ها", icon: "/Content/img/sanad/list-add.png" },
];


async function GetData(o, refresh, param) {
    var uri = CreateUrl(o.baseValue.ace, o.baseValue.sal, o.baseValue.group, o.id);
    var method = 'POST';
    var userCode = sessionStorage.userName;
    var object = [];


    if (baseData[o.id] == null || refresh) {
        if (o.id == d_inv) {
            method = 'GET';
            uri += '/0/' + userCode;
        }
        else if (o.id == d_kGru) {
            object = {
                Mode: param.mode,
                UserCode: userCode,
            }
        }
        else if (o.id == d_kala) {
            object = {
                withimage: param.withimage,
                updatedate: param.updatedate,
                Mode: param.mode,
                UserCode: userCode,
                where: localStorage.getItem('whereKala'),
                KalaCode: param.kalaCode,
            }
        }
        else if (o.id == d_kGru) {
            object = {
                Mode: param.mode,
                UserCode: userCode,
            }
        }
        else if (o.id == d_cGru) {
            object = {
                Mode: param.mode,
                ModeGru: param.modeGru,
                UserCode: userCode,
            }
        }
        else if (o.id == d_cust) {
            var object = {
                forSale: param.forSale,
                updatedate: param.updatedate,
                Mode: param.mode,
                UserCode: userCode,
                Where: localStorage.getItem('whereCust'),
                CustCode: param.custCode
            }
        }
        else if (o.id == d_acc) {
            var object = {
                Mode: param.mode,
                UserCode: userCode,
                Where: localStorage.getItem('whereAcc'),
            }
        }
        else if (o.id == d_opr) {
            method = 'GET';
        }
        else if (o.id == d_mkz) {
            method = 'GET';
        }
        else if (o.id == d_aMode) {
            method = 'GET';
            uri = server + '/api/ADocData/' + o.id + '/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
        }

        else if (o.id == d_status) {
            method = 'GET';
            uri += '/' + param.progName;
        }

        await ajaxFunction(uri, method, object, true).done(function (response) {
            baseData[o.id] = response;
        });
    }
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
    }
    else {
        str = name;
    }

    return str
}


function KeyPressFilter(e) {
    var clas = $(e.target.classList)[1]

    var key = e.charCode || e.keyCode || 0;

    if (clas == 'type_Farsi') // FARSI='1' 
    {
        return true;
    }

    else if (clas == 'type_En') // LATIN='2'
    {
        return true;
    }

    else if (clas == 'type_ShamsiDate') { // SHAMSIDATE 3
        if (e.shiftKey) {
            return
        }
        return (
            key == 111 ||
            key == 191 ||
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            key == 190 ||
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105)
        );
    }
    else if (clas == 'type_Number') { // Number 4
        if (e.shiftKey) {
            return
        }
        return (
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            key == 190 ||
            key == 109 || //-
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105)
        );
    }
    else if (clas == 'type_Currency') { // Currency 5
        if (e.shiftKey) {
            return
        }

        return (
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            key == 47 ||
            key == 109 || //-
            key == 111 || key == 191 ||
            key == 190 ||
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105)
        );
    }
    else if (clas == 'type_Code') { // CODE 6
        if (e.shiftKey) {
            return
        }
        return (
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            key == 190 ||
            key == 109 ||
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105)
        );
    }

    else if (clas == 'type_DocNo') { // DOCNO 7
        if (e.shiftKey) {
            return
        }
        return (
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            key == 190 ||
            key == 109 ||
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105)
        );
    }

    else if (clas == 'type_TIME') { // Time 8
        return (
            key == 8 ||
            key == 9 ||
            key == 13 ||
            key == 46 ||
            key == 190 ||
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105)
        );
    }
}

function NameTypeKey(code) {
    if (code == type_Farsi) return 'type_Farsi';
    else if (code == type_En) return 'type_En';
    else if (code == type_ShamsiDate) return 'type_ShamsiDate';
    else if (code == type_Number) return 'type_Number';
    else if (code == type_Currency) return 'type_Currency';
    else if (code == type_Code) return 'type_Code';
    else if (code == type_DocNo) return 'type_DocNo';
    else if (code == type_Time) return 'type_Time';
    else return 'Type Invalid';
}


function CreateUrl(ace, sal, group, id) {
    if (sal == null && group == null)
        return server + '/api/Web_Data/' + id + '/' + ace;

    return server + '/api/Web_Data/' + id + '/' + ace + '/' + sal + '/' + group;
}

function FindSortField(list, fieldName) {
    return server + '/api/Web_Data/' + id + '/' + ace + '/' + sal + '/' + group;
}




function BoxDashbord_Create(obj, divHead, divBody) {
    var o = obj.options;
    var itemData = dashbordData.find(c => c.id == o.id);
    if (itemData == null) {
        itemData = { valueControl: o.valueControl, position: o.position };
    } else {
        o.valueControl = itemData.valueControl;
        o.position = itemData.position;
    }

    var divCart = $('<div class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide" style ="visibility:' +
        (o.visible == false ? 'hidden' : 'visible') + '" id="' + o.id + '"  gs-x="' + o.position.x + '" gs-y="' + o.position.y +
        '" gs-w="' + o.position.w + '" gs-h="' + o.position.h + '" minW="3"  minH="3">');
    var divContent = $('<div class="grid-stack-item-content" style="background-color:white">');

    //Header
    var divHeader = $('<div class="modal-header form-inline focused" style="position: sticky;top: 0px;background: white;z-index: 10;">');
    var div = $('<div>');
    var li_Setting = $('<li><a><img src="/Content/img/streamline-icon-cog-1@48x48.png" width="20" height="20"><span> تنظیمات </span></a></li>');
    var li_Refresh = $('<li><a><img src="/Content/img/list/streamline-icon-synchronize-arrows-1@48x48.png" width="20" height="20"><span> بروز رسانی </span></a></li>');
    var li_Line = $('<li class="divider"></li>');
    var li_Close = $('<li><a href="#">بستن</a></li>');

    var b_Maximum = $('<a style="padding-left: 5px;"><img src="/Content/img/window-max.png" width ="17" title="تغییر سایز"></span>');
    var b_Menu = $('<button class="dropdown dropdown-toggle" data-toggle="dropdown" style="border: none;background-color: white;height: 24px;"><span class="caret"></span>');

    var ui_Menu = $('<ul class="dropdown-menu dropdown-menu-dashbord">');
    ui_Menu.append(li_Refresh);
    ui_Menu.append(li_Setting);
    ui_Menu.append(li_Line);
    ui_Menu.append(li_Close);

    b_Menu.append(ui_Menu);
    div.append(b_Maximum);
    div.append(b_Menu);

    var h4 = $('<h4 class="modal-title" style="width: 90%;">' + o.caption + '</h4>');

    divHeader.append(h4);
    divHeader.append(div);

    if (divHead != null) {
        divHeader.append(divHead)
    }
    divContent.append(divHeader);

             //End Header

    //Content

    divContent.append(divBody);
    divCart.append(divContent);

    var styleMaximum;

    b_Maximum.click(function (e) {
        var a = $("#" + o.id);
        styleMaximum = a[0].style;
        var zIndex = a.css("z-index");

        if (zIndex == "auto") {
            $("#" + o.id).css(cssMaximin);
            var path = "/Content/img/window.png";
        }
        else {
            var path = "/Content/img/window-max.png";
            a[0].style = styleMaximum;
        }
        $(this).find("img").attr("src", path);
    });

    li_Setting.click(function (e) {
        BoxDashbord_Setting(obj);
    });

    li_Refresh.click(function (e) {
        BoxDashbord_Refresh(obj);
    });

    li_Close.click(function (e) {
        BoxDashbord_Close(obj);
    });


    grid.on('change', function (event, items) {
        var element = $("#" + o.id);
        o.position.x = parseInt($(element).attr("gs-x"));
        o.position.y = parseInt($(element).attr("gs-y"));
        o.position.w = parseInt($(element).attr("gs-w"));
        o.position.h = parseInt($(element).attr("gs-h"));
        var itemData = dashbordData.find(c => c.id == o.id);
        itemData.position = o.position;
    });

    itemData.caption = o.caption;
    itemData.baseValue = o.baseValue;

    o.o = divCart[0];
    grid.el.appendChild(o.o);
    let w = grid.makeWidget(o.o, { x: o.position.x, y: o.position.y, w: o.position.w, h: o.position.h, minW: o.position.w } );
}

function BoxDashbord_Refresh(obj) {
    var o = obj.options;
    Swal.fire({
        title: mes_Refresh,
        text: translate("لیست " + o.caption + " به روز رسانی شود ؟"),
        type: 'info',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        cancelButtonText: text_No,
        confirmButtonColor: '#d33',
        confirmButtonText: text_Yes
    }).then((result) => {
        if (result.value) {
            obj._Refresh();
        }
    });
}

function BoxDashbord_Close(obj) {
    var o = obj.options;
    Swal.fire({
        title: "تایید بستن",
        text: translate("لیست " + o.caption + " بسته شود ؟"),
        type: 'info',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        cancelButtonText: text_No,
        confirmButtonColor: '#d33',
        confirmButtonText: text_Yes
    }).then((result) => {
        if (result.value) {
            for (var i = 0; i < dashbordData.length; i++) {
                if (dashbordData[i].id == o.id) {
                    dashbordData.splice(i, 1);
                    grid.removeWidget(o.o);
                    break;
                }
            }
        }
    })
};

function BoxDashbord_Setting(obj) {
    var o = obj.options;
    obj._Setting();
    // $("#" + o.id + "_modal").modal('show');
};


function CreateObjectInput(elements, objects, name) {
    return elements[name].Input(
        {
            caption: objects[name].caption,
            value: objects[name].value,
            dataType: objects[name].dataType,
            maxlength: objects[name].maxlength,

            Create: function (e, record) {
                objects[name].element = record;
            },
            Change: function (e, record) {
                objects[name].value = record.value;
            },
        },
    );
};


function CreateObjectDate(elements, objects, name) {
    return elements[name].DatePicker(
        {
            caption: objects[name].caption,
            value: objects[name].value,
            Create: function (e, record) {
                objects[name].element = record;
            },
            Change: function (e, record) {
                objects[name].value = record.value;
            },
        },
    );
};

function CreateObjectSelect(elements, objects, name, filter, externalModal, striped) {
    return elements[name].Select(
        {
            id: objects[name].id,
            caption: objects[name].caption,
            baseValue: objects[name].baseValue,
            keyField: objects[name].keyField,
            keyCaption: objects[name].keyCaption,
            keyRow: objects[name].keyRow,
            param: objects[name].param == null ? null : objects[name].param,
            striped: striped == null ? true : striped,
            externalModal: externalModal == null ? false : externalModal,
            filter: filter,
            Select: function (e, record) {
                objects[name].value = record.dataString;
            },
        }
    );
};

function CreateObjectSelectEntesab(elements, objects, name, filter, externalModal, striped) {
    return elements[name].Select_Entesab(
        {
            id: objects[name].id,
            caption: objects[name].caption,
            baseValue: objects[name].baseValue,
            keyField: objects[name].keyField,
            keyCaption: objects[name].keyCaption,
            keyRow: objects[name].keyRow,
            param: objects[name].param == null ? null : objects[name].param,
            striped: striped == null ? true : striped,
            externalModal: externalModal == null ? false : externalModal,
            filter: filter,
            Select: function (e, record) {
                objects[name].value = record.dataString;
            },
        }
    );
};