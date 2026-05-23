var baseData = {};
var objectDashbord = [];

const d_inv = 'Inv';
const d_kGru = 'KGru';
const d_kala = 'Kala';
const d_cGru = 'CGru';
const d_cust = 'Cust';
const d_opr = 'Opr';
const d_mkz = 'Mkz';
const d_acc = 'Acc';
const d_zGruAcc = 'ZGruAcc';
const d_zAcc = 'ZAcc';
const d_status = 'Status';
const d_checkStatus = 'CheckStatus';
const d_aMode = 'AMode';
const d_iMode = 'IMode';
const d_thvl = 'Thvl';
const d_tGru = 'TGru';

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

const positionGrid_Defult = { x: 0, y: 0, w: 4, h: 5 };

const color_Radif = "#d9d9d9";
const color_RowSum = "#e8964d";//"#e37d228f";
const color_RowSearch = "#efb683";
const color_RowKey = "#f5efeb";

const mode_Sort_DESC = 'DESC';

const f_Columns = 'Columns';
const f_Report = 'Report';
const f_Control = 'Control';
const f_GetData = 'GetData';
const f_Print = 'Print';
const f_Select = 'Select';
const f_Refresh = 'Refresh';
const f_Setting = 'Setting';
const f_Maximum = 'Maximum';
const f_Defult = 'Defult';
const f_ShowControl = 'ShowControl';
const f_Close = 'Close';

const margin_Input = '10px';

const btn_Close = '<a action-name="' + f_Close + '" title="بستن" ><i class="bi bi-x"></i></a>';
const btn_CloseModal = '<a action-name="' + f_Close + '" title="بستن" data-dismiss="modal" aria-label="Close" ><i class="bi bi-x"></i></a>';
const btn_Refresh = '<a action-name="' + f_Refresh + '" style="padding-left: 5px;" title="بروز رسانی"><i class="bi bi-arrow-repeat"></i></a>';
const btn_Defult = '<a action-name="' + f_Defult + '" title="پیش فرض"><i class="bi bi-person-gear"></i></a>';

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

var columns_TypeCheckStatus = [
    { Code: 'Code', Name: 'کد', Type: type_Code, Visible: 1 },
    { Code: 'Name', Name: 'نام', Type: type_Farsi, Visible: 1 }
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


const _viewDataFull = 0;
const _viewDataLow = 1;

const caption_GetAutoData = "گزارش گیری در شروع"
const caption_ShowControl = "نمایش کنترل گزارش در شروع"
const caption_ViewData = "نمایش اطلاعات"

const caption_ViewData_Desktop = "دسکتاپ";
const caption_ViewData_Mobile = "موبایل";

const caption_GetAutoData_Auto = "خودکار";
const caption_GetAutoData_Manual = "دستی";

const caption_ShowControl_Show = "نمایش";
const caption_ShowControl_Hide = "مخفی";

var dataSettingDefult = {
    all: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: "دریافت همه" }, { key: 1, value: "دریافت دستی" }, { key: 2, value: "غیر فعال" }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
    ],
    TChk: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    TChk_Sum: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
    ],
    TrzFCust: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    TrzAcc: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    Dftr: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 1, value: 1, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    ADocR: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 1, value: 1, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    AGMkz: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    AGOpr: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    GrdZAcc: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    KhlAcc: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    KhlZAcc: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    TrzFKala: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    FDocR: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    Krdx: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    TrzIKala: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    TrzIKalaExf: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
    IDocR: [
        { code: "GetAutoData", caption: caption_GetAutoData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_GetAutoData_Auto }, { key: 1, value: caption_GetAutoData_Manual }] },
        { code: "ShowControl", caption: caption_ShowControl, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ShowControl_Show }, { key: 1, value: caption_ShowControl_Hide }] },
        { code: "ViewData", caption: caption_ViewData, mode: f_Select, defult: 0, value: 0, items: [{ key: 0, value: caption_ViewData_Desktop }, { key: 1, value: caption_ViewData_Mobile }] },
    ],
};



// دستور فرمت
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}


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
        else if (o.id == d_iMode) {
            uri = server + '/api/IDocData/' + o.id + '/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
            var object = {
                InOut: param.inOut,
                Mode: param.mode,
                UserCode: userCode,
            }
        }

        else if (o.id == d_thvl) {
            var object = {
                Mode: param.mode,
                UserCode: userCode,
                Where: localStorage.getItem('whereThvl'),
            }
        }
        else if (o.id == d_tGru) {
            var object = {
                Mode: param.mode,
                UserCode: userCode,
            }
        }

        else if (o.id == d_status) {
            method = 'GET';
            uri += '/' + param.progName;
        }
        else if (o.id == d_checkStatus) {
            method = 'GET';
            uri = server + '/api/ADocData/' + o.id + '/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group + '/' + param.pDMode + '/' + param.report;
        }

        else if (o.id == d_zGruAcc) {
            method = 'GET';
        }

        else if (o.id == d_zAcc) {
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


var idBox = 0;

function BoxDashbord_Create(obj, divHead, divBody) {
    var o = obj.options;
    var itemData = dashbordData.find(c => c.uuid == o.uuid);
    if (itemData == null) {
        itemData = { valueControl: o.valueControl, position: o.position };
    } else {
        o.valueControl = itemData.valueControl;
        o.position = itemData.position;
    }

    var divCart = $('<div class="item_dashbord grid-stack-item ui-draggable ui-resizable ui-resizable-autohide" style ="visibility:' + //min-height: 505px; min-width: 450px; 
        (o.visible == false ? 'hidden' : 'visible') + '" idBox = "' + idBox + '" uuid = "' + o.uuid + '" gs-x="' + o.position.x + '" gs-y="' + o.position.y +
        '" gs-w="' + o.position.w + '" gs-h="' + o.position.h + '" minW="3"  minH="3">');
    var divContent = $('<div class="grid-stack-item-content" style="background-color:white">');

    //Header
    var divHeader = $('<div class="modal-header form-inline focused" style="position: sticky;top: 0px;background: white;z-index: 10;padding-bottom: 5px;">');

    var div = $('<div class="headButton">');



    var b_ShowControl = $('<a action-name="ShowControl" style="padding-left: 5px;" title="کنترل گزارش"><i class="bi bi-caret-down"></a>');
    div.append(b_ShowControl);

    if (o.headButton != null) {
        for (var i = 0; i < o.headButton.length; i++) {
            var btn;
            if (o.headButton[i] == f_Print) {
                btn = $('<a action-name="' + o.headButton[i] + '" style="padding-left: 5px;" title="چاپ"><span class="bi bi-printer"></a>');
            }
            else if (o.headButton[i] == f_Columns) {
                btn = $('<a action-name="' + o.headButton[i] + '" style="padding-left: 5px;" title="تنظیم ستون ها"><span class="bi bi-list-check"></a>');
            }
            else if (o.headButton[i] == f_Refresh) {
                btn = $('<a action-name="' + o.headButton[i] + '" style="padding-left: 5px;" title="بروز رسانی"><span class="bi bi-arrow-repeat"></a>');
            }
            else if (o.headButton[i] == f_Setting && o.uuid > 0) {
                btn = $('<a action-name="' + o.headButton[i] + '" style="padding-left: 5px;" title="تنظیمات"><span class="bi bi-gear"></a>');
            }
            if (btn != null) {
                div.append(btn);
            }
        }
    }

    var b_Close = $('<a action-name="Close" style="padding-left: 5px;" title="بستن"><i class="bi bi-x-lg"></a>');
    var b_Maximum = $('<a action-name="Maximum" style="padding-left: 5px;" title="تغییر سایز"><i class="bi bi-window"></a>');


    div.append(b_Maximum);
    div.append(b_Close);

    var h4 = $('<h4 class="modal-title" style="">' + o.caption + '</h4>');
    divHeader.append(h4);

    var divBase = $('<div style="padding-right: 10px;padding-left: 10px;border: 1px solid red;border-radius: 10px;position: absolute;top: 8px;left: 160px;">');

    var groupData = loginData.baseValue.groupsData.find(c => c.Code == o.baseValue.group);
    var p1 = $('<p style="font-size: 9px;">' + o.baseValue.group + ' - ' + groupData.Name + '</p>');
    var p2 = $('<p style="font-size: 9px;">سال مالی ' + o.baseValue.sal + '</p>');
    divBase.append(p1);
    divBase.append(p2);
    divHeader.append(divBase);

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

    var headButton = divCart.find('.headButton a');

    headButton.click(function (e) {
        var actionName = $(this).attr("action-name");
        if (actionName == f_Close) {
            BoxDashbord_Close(obj);
        }
        else if (actionName == f_ShowControl) {
            BoxDashbord_ShowControl(obj);
        }
        else if (actionName == f_Refresh) {
            BoxDashbord_Refresh(obj);
        }
        else if (actionName == f_Setting) {
            BoxDashbord_Setting(obj);
        }
        else if (actionName == f_Print) {
            BoxDashbord_Print(obj);
        }
        else if (actionName == f_Columns) {
            BoxDashbord_Columns(obj);
        }
        else if (actionName == f_Maximum) {
            var a = $(o.o);
            styleMaximum = a[0].style;
            var zIndex = a.css("z-index");
            var i = $(this).find("i");
            if (zIndex == "auto") {
                a.css(cssMaximin);
                i.removeClass("bi-window");
                i.addClass("bi-window-stack");
            }
            else {
                a[0].style = styleMaximum;
                i.addClass("bi-window");
                i.removeClass("bi-window-stack");
            }
        } else if (actionName == f_Maximum) {
            var a = $(o.o);
            styleMaximum = a[0].style;
            var zIndex = a.css("z-index");
            var i = $(this).find("i");
            if (zIndex == "auto") {
                a.css(cssMaximin);
                i.removeClass("bi-window");
                i.addClass("bi-window-stack");
            }
            else {
                a[0].style = styleMaximum;
                i.addClass("bi-window");
                i.removeClass("bi-window-stack");
            }
        }
    });

    grid.on('change', function (event, items) {
        var a = o;
        var element = o.o;
        if (parseInt($(element).attr("gs-x")) >= 0) {
            var x = parseInt($(element).attr("gs-x"));
            var y = parseInt($(element).attr("gs-y"));
            var w = parseInt($(element).attr("gs-w"));
            var h = parseInt($(element).attr("gs-h"));

            /*o.position.x = parseInt($(element).attr("gs-x"));
            o.position.y = parseInt($(element).attr("gs-y"));
            o.position.w = parseInt($(element).attr("gs-w"));
            o.position.h = parseInt($(element).attr("gs-h"));*/
            // o.uuid اشکال دارد
            var itemData = dashbordData.filter(c => c.uuid == o.uuid);
            if (itemData.length > 0) {
                var pos = { x: x, y: y, w: w, h: h };
                dashbordData.filter(c => c.uuid == o.uuid)[0].position = pos;
                //itemData[0].position = o.position;
            }
        }
    });

    itemData.caption = o.caption;
    itemData.baseValue = o.baseValue;
    objectDashbord.add(divCart[0]);
    o.idBox = idBox;
    idBox++;
    o.o = divCart[0];
    grid.el.appendChild(o.o);

    let w = grid.makeWidget(o.o, { x: o.position.x, y: o.position.y, w: o.position.w, h: o.position.h, minW: 4 });

    //let w = grid.addWidget({content: o.o, x: o.position.x, y: o.position.y, w: o.position.w, h: o.position.h, minW: 4 });
}

$("#sortGrid").click(function (e) {
    SetPositionItems();
});

function SetPositionItems(idBox) {
    var position = positionGrid_Defult;
    //grid.removeAll();
    for (var i = idBox + 1; i < objectDashbord.length - 1; i++) {
        grid.removeWidget(objectDashbord[i]);
    }

    var px = parseInt($(objectDashbord[idBox]).attr("gs-w"));
    var py = parseInt($(objectDashbord[idBox]).attr("gs-h"));
    for (var i = idBox + 1; i < objectDashbord.length - 1; i++) {
        var item = objectDashbord[i]
        var x = parseInt($(item).attr("gs-x"));
        var y = parseInt($(item).attr("gs-y"));
        var w = parseInt($(item).attr("gs-w"));
        var h = parseInt($(item).attr("gs-h"));

        $(item).attr("gs-x", px);
        $(item).attr("gs-y", py);
        $(item).attr("gs-w", w);
        $(item).attr("gs-h", h);
        grid.el.appendChild(item);
        grid.makeWidget(item);

        px = px + w;
        py = y;
        if (px + position.w > 12) {
            px = 0;
            py = py + h;
        }
    }
}


function SetPosition(e) {
    var position = positionGrid_Defult;
    //  var a = grid.el.findEmptyPosition();
    if (e != null) {
        var element = $(e).closest('.grid-stack-item')[0];
        var x = parseInt($(element).attr("gs-x"));
        var y = parseInt($(element).attr("gs-y"));
        var w = parseInt($(element).attr("gs-w"));
        var h = parseInt($(element).attr("gs-h"));

        xTemp = x + w + position.w;
        x = x + w;
        if (xTemp > 12) {
            x = 0;
            y = y + position.y;
        }

        position = {
            x: x,
            y: y,
            w: position.w,
            h: position.h
        };

    }
    return position
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
    var itemData = dashbordData.find(c => c.uuid == o.uuid);
    if (itemData != null) {
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
                var itemData = dashbordData.find(c => c.uuid == o.uuid);
                //if (itemData != null) {
                for (var i = 0; i < dashbordData.length; i++) {
                    if (dashbordData[i].id == o.id) {
                        dashbordData.splice(i, 1);
                        grid.removeWidget(o.o);
                        $("#widget_" + o.id).remove();
                        break;
                    }
                }
                // }
                // else {
                //     grid.removeWidget(o.o);
                //     $("#widget_" + o.id).remove();
                // }
            }
        })
    }
    else {
        grid.removeWidget(o.o);
        $("#widget_" + o.id).remove();
    }
};

function BoxDashbord_Setting(obj) {
    var o = obj.options;
    obj._Setting();
    // $("#" + o.id + "_modal").modal('show');
};

function BoxDashbord_ShowControl(obj) {
    obj._ShowControl();
};

function BoxDashbord_Print(obj) {
    obj._ShowPrint();
};
function BoxDashbord_Columns(obj) {
    obj._ShowColumns();
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
            sort: objects[name].sort,
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
            sort: objects[name].sort,
            param: objects[name].param == null ? null : objects[name].param,
            striped: striped == null ? true : striped,
            externalModal: externalModal == null ? false : externalModal,
            filter: filter,
            selected: objects[name].selected,
            Select: function (e, record) {
                objects[name].selected = record.data;
                objects[name].value = record.dataString;
            },
        }
    );
};

function CreateObjectPrint(obj) {
    var o = obj.options;
    var _div = $('<div class="' + 'K_DivModal' + f_Print + '">');
    _div.Print(
        {
            id: o.rprtId,
            caption: "چاپ",
            baseValue: o.baseValue,
            data: o.data,
            columns: o.columns,
            printVariable: "",
            Select: function (e, record) {
            },
        }
    );
    obj.element.append(_div);
};

function ShowObjectPrint(obj) {
    var o = obj.options;
    if (o.data.length > 0) {
        var objPrint = $(obj.bindings[0]).find('.K_DivModal' + f_Print);

        var printVariable = o.controlData;
        printVariable["ReportDate"] = localStorage.getItem("DateNow");

        for (var i = 0; i < o.columns.length; i++) {
            if (o.columns[i].Sum != null) {
                printVariable['Sum' + o.columns[i].Code] = o.columns[i].Sum;
            }
        }

        objPrint.Print("option", "printVariable", printVariable);
        objPrint.Print("option", "data", o.data);
        objPrint.Print("ShowModalPrint");
    }
    else {
        return showNotification('اطلاعاتی برای چاپ وجود ندارد. ابتدا گزارش گیری کنید', 0);
    }
};



function CreateObjectSetting(obj) {
    var o = obj.options;
    var _div = $('<div class="' + 'K_DivModal' + f_Setting + '">');

    var dataSetting = dashbordData.filter(c => c.uuid == o.uuid);
    var data = [];
    if (dataSetting.length > 0) {
        if (dataSetting[0].dataSetting != null) {
            data = dataSetting[0].dataSetting;
        }
        else {
            data = dataSettingDefult[o.rprtId];
            dataSetting[0]["dataSetting"] = data;

        }
    }
    else
        data = dataSettingDefult[o.rprtId];

    o.dataSetting = data;
    _div.Setting(
        {
            id: null,
            caption: "تنظیمات",
            dataSetting: data,
            externalModal: false,
            baseValue: {
                ace: ace,
                group: group,
                sal: sal
            },
            Save: function (e, record) {
                var uuid = o.uuid;
                var itemSetting = dashbordData.filter(c => c.uuid == uuid)[0];
                itemSetting["dataSetting"] = record.data;
                o.dataSetting = record.data;
                if (record.data != null) {
                    var showControl = record.data.filter(c => c.code == "ShowControl");
                    var viewData = record.data.filter(c => c.code == "ViewData");
                    if (showControl.length > 0) {
                        $(o.divControl).css("display", showControl[0].value == "0" ? "block" : "none");
                    }
                    if (viewData.length > 0) {
                        o.objGrid.Table("option", "viewData", viewData[0].value == "0" ? _viewDataFull : _viewDataLow);
                        o.objGrid.Table("ChangeViewData");
                    }
                }
            },
        },
    );
    obj.element.append(_div);
};

function ShowObjectSetting(obj) {
    var o = obj.options;
    var objSetting = $(obj.bindings[0]).find('.K_DivModal' + f_Setting);
    objSetting.Setting("ShowModalSetting");
};

function GetSetting(o) {
    var dataSetting = dashbordData.filter(c => c.uuid == o.uuid);
    var data = [];
    if (dataSetting.length > 0) {
        if (dataSetting[0].dataSetting != null) {
            data = dataSetting[0].dataSetting;
        }
        else {
            data = dataSettingDefult[o.id];
            dataSetting[0]["dataSetting"] = data;
        }
    }
    else
        data = dataSettingDefult[o.id];

    o.dataSetting = data;



    var result = {};
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            var code = data[i]["code"];
            var value = data[i]["value"];
            if (code == "GetAutoData") result.getAutoData = value == "0" ? true : false;
            if (code == "ShowControl") result.showControl = value == "0" ? true : false;
            if (code == "ViewData") result.viewData = value == "0" ? _viewDataFull : _viewDataLow;
        }
    }
    return result;
}


function AddIteminGrid(itemObject) {
    id = itemObject.id;
    uuid = itemObject.uuid;

    var element = $('<div class="widget_dashbord">');
    $("#objectGrid").append(element);

    param = {
        id: id,
        uuid: uuid,
        caption: itemObject.caption,
        visible: itemObject.visible,
        baseValue: itemObject.baseValue,
        controlData: itemObject.controlData,
        position: itemObject.position,
        objects: itemObject.objects,
        showControl: itemObject.showControl,
        getAutoData: itemObject.getAutoData,
    }

    if (id == "TChk_Sum") {
        element.D_TChk_Sum(param);
    }
    else if (id == "TChk") {
        element.D_TChk(param);
    }
    else if (id == "TarazFasli") {
        element.D_TarazFasli(param);
    }
    else if (id == "TrzAcc") {
        element.D_TrzAcc(param);
    }
    else if (id == "Dftr") {
        element.D_Dftr(param);
    }
    else if (id == "ADocR") {
        element.D_ADocR(param);
    }
    else if (id == "AGMkz") {
        element.D_AGMkz(param);
    }
    else if (id == "AGOpr") {
        element.D_AGOpr(param);
    }
    else if (id == "GrdZAcc") {
        element.D_GrdZAcc(param);
    }
    else if (id == "KhlAcc") {
        element.D_KhlAcc(param);
    }
    else if (id == "KhlZAcc") {
        element.D_KhlZAcc(param);
    }
    else if (id == "TrzFCust_S" || id == "TrzFCust_P") {
        param.isForosh = itemObject.isForosh;
        element.D_TrzFCust(param);
    }
    else if (id == "TrzFKala_S" || id == "TrzFKala_P") {
        param.isForosh = itemObject.isForosh;
        element.D_TrzFKala(param);
    }
    else if (id == "FDocR_S" || id == "FDocR_P") {
        param.isForosh = itemObject.isForosh;
        element.D_FDocR(param);
    }
    else if (id == "Krdx") {
        element.D_Krdx(param);
    }
    else if (id == "TrzIKalaExf") {
        element.D_TrzIKalaExf(param);
    }
    else if (id == "TrzIKala") {
        element.D_TrzIKala(param);
    }
    else if (id == "IDocR") {
        element.D_IDocR(param);
    }

}



