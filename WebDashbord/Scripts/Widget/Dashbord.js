var gridster = null;

var barColors = ["#ff2d2d", "#00ccff", "#00ffff", "#336600", "#ffcc00", "#ff9e3a", "#0033ff", "#6699cc", "#009999", "#171a9b", "#00a20b", "#11c0a9"];



var dayCheckPardakht = localStorage.getItem("dayCheckPardakht");
var dayCheckPardakht_Sum = localStorage.getItem("dayCheckPardakht_Sum");

var date_TarazFasli = localStorage.getItem("date_TarazFasli");
var mode_TarazFasli = localStorage.getItem("mode_TarazFasli");

var date_TrzFCust_S = localStorage.getItem("date_TrzFCust_S");
var date_TrzFCust_P = localStorage.getItem("date_TrzFCust_P");

var top_TrzFCust_S = localStorage.getItem("top_TrzFCust_S");
var top_TrzFCust_P = localStorage.getItem("top_TrzFCust_P");

var top_TrzFKala_S = localStorage.getItem("top_TrzFKala_S");
var mode_TrzFKala_S = localStorage.getItem("mode_TrzFKala_S");

dayCheckPardakht = dayCheckPardakht == null ? 3 : dayCheckPardakht;
dayCheckPardakht_Sum = dayCheckPardakht_Sum == null ? 3 : dayCheckPardakht_Sum;
date_TarazFasli = date_TarazFasli == null ? localStorage.getItem("BeginDateFct") : date_TarazFasli;
mode_TarazFasli = mode_TarazFasli == null ? 0 : mode_TarazFasli;

date_TrzFCust_S = date_TrzFCust_S == null ? localStorage.getItem("BeginDateFct") : date_TrzFCust_S;
date_TrzFCust_P = date_TrzFCust_P == null ? localStorage.getItem("BeginDateFct") : date_TrzFCust_P;

top_TrzFCust_S = top_TrzFCust_S == null ? 10 : top_TrzFCust_S;
top_TrzFCust_P = top_TrzFCust_P == null ? 10 : top_TrzFCust_P;

top_TrzFKala_S = top_TrzFKala_S == null ? 10 : top_TrzFKala_S;
mode_TrzFKala_S = mode_TrzFKala_S == null ? 0 : mode_TrzFKala_S;





var dashbordData_Save = localStorage.getItem("Karbord_DashbordData");

//dashbordData_Save = `[{"id":"TChk_Sum-1","valueControl":{"day":"10000000"},"position":{"x":0,"y":12,"w":4,"h":3},"caption":"صورت خلاصه چک های پرداختی - گروه 97 - سال 1384","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}},{"id":"TChk_Sum-2","valueControl":{"day":"10000000"},"position":{"x":4,"y":3,"w":4,"h":3},"caption":"صورت خلاصه چک های پرداختی - گروه 97 - سال 1403","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1403"}},{"id":"TrzFCust_S-1","valueControl":{"top":10,"fromDate":"1384/01/01","modeItem":"S"},"position":{"x":8,"y":0,"w":4,"h":3},"caption":"مانده حساب خریداران - گروه 97 - سال 1403","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1403"}},{"id":"TrzFCust_P-1","valueControl":{"top":10,"fromDate":"1384/01/01","modeItem":"P"},"position":{"x":0,"y":3,"w":4,"h":3},"caption":"مانده حساب فروشندگان - گروه 97 - سال 1403","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1403"}},{"id":"TChk-3","valueControl":{"day":"1000000"},"position":{"x":0,"y":0,"w":4,"h":3},"caption":"چک های پرداختی - گروه 97 - سال 1403","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1403"}},{"id":"TChk-4","valueControl":{"day":"10000000"},"position":{"x":8,"y":3,"w":4,"h":3},"caption":"چک های پرداختی - گروه 97 - سال 1384","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}},{"id":"TrzFCust_P-2","valueControl":{"top":10,"fromDate":"1384/01/01","modeItem":"P"},"position":{"x":4,"y":0,"w":4,"h":3},"caption":"مانده حساب فروشندگان - گروه 97 - سال 1384","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}}]`
//dashbordData_Save = `[{"id":"TrzAcc-1","valueControl":{"mode":0,"fromDate":"1384/01/01","modeItem":"S"},"position":{"x":0,"y":0,"w":4,"h":3},"caption":"تراز حساب - گروه 97 - سال 1384","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}}]`

if (dashbordData_Save != null && dashbordData_Save != "[{}]"  && dashbordData_Save.toString() != "null" && dashbordData_Save.toString() != "") {
    var dashbordData = JSON.parse(dashbordData_Save);
    dashbordData = dashbordData.filter(c => loginData.baseValue.groupsAccess.includes(c.baseValue.group));

    for (var i = 0; i < dashbordData.length; i++) {
        var baseValue = dashbordData[i].baseValue;
        GetAccess_Group(baseValue.ace, baseValue.group);
        GetParam(baseValue.ace, baseValue.group, baseValue.sal, false);
        //if (loginData.erj_Access != "") GetAccess_Group(prog_Web2, defultGroup);
        CreateListDesktop(baseValue.ace, baseValue.group);

        var access = dataGroup[baseValue.group]["ListMode"];
        var list = access.filter(c => c.code == dashbordData[i].id);
        if (list.length == 0) {
            dashbordData.splice(i, 1);
        }

    }

    dataGroup = dataGroup;



    /* for (var i = 0; i < userGroupAccess.length; i++) {
         var objectGroup = dashbordData.filter(c => loginData.baseValue.groups.includes(c.baseValue.group));
         for (var j = 0; j < objectGroup.length - 1; j++) {
         }
 
         var baseValue = dashbordData[i].baseValue;
         var groupAccess = dataGroup[baseValue.group]["Access_" + baseValue.ace];
         var userGroupAccess = loginData.baseValue.groupsData;
         if (Object.values(dashbordData[i]).length <= 0) {
             dashbordData.splice(i, 1);
         }
     }*/

}


function SaveVariantDashbord() {
    var myJsonString = JSON.stringify(dashbordData)
    localStorage.setItem("Karbord_DashbordData", myJsonString);
}
window.onbeforeunload = function () {
    SaveVariantDashbord();
};

function CreateListDesktop(ace, group) {
    if (dataGroup[group] == null) {
        GetAccess_Group(ace, group);
    }
    if (dataGroup[group]["ListMode"] == null) {
        listModeDesktop = [];
        for (var i = 0; i < accessMode_Public.length; i++) {
            var item = accessMode_Public[i];
            var access = IsAccess(ace, item.prog, group, item.code, item.parent);
            if (item.parent == "") {
                accessPublic[item.code] = access;
            }
            else {
                access = accessPublic[item.parent] && access;
            }
            item["access"] = access;

            if (access && item.parent != "") {
                listModeDesktop.push(item);
            }
        }
        dataGroup[group]["ListMode"] = listModeDesktop;
    }
    loginData.baseValue.defultGroup = group;
}



$("#SaveItems").click(function () {
    var obj = [];
    var items = $('.CheckedItem');
    //GetParam(baseValue.ace, baseValue.group, baseValue.sal, false);
    for (i = 0; i < items.length; i++) {
        var item = $(items[i]);
        var idItem = items[i].id.substring(8);

        // باید با uuid جایگزین بشه
        var itemData = dashbordData.find(c => c.id == idItem);


        itemData.visible = item.is(':checked') == true;
        $("#" + idItem).css("visibility", item.is(':checked') == true ? "visible" : "hidden");
    }

    SaveVariantDashbord();
    $('#modal-DesktopItem').modal('hide');
});



let grid = GridStack.init({
    cellHeight: 'initial', // start square but will set to % of window width later
    animate: true, // show immediate (animate: true is nice for user dragging though)
    disableOneColumnMode: true, // will manually do 1 column
    lazyLoad: true,
});


var cols = '';
$("#TableDesktopItem").empty();


for (var i = 0; i < dashbordData.length; i++) {
    AddIteminGrid(dashbordData[i]);
}

$("#AddItemDesktop").click(function () {
    var modeItem = $("#ModeDesktopItem").val();
    var captionItem = $("#CaptionItem").val();
    var groupDesktopItem = $("#GroupDesktopItem").val();
    var salDesktopItem = $("#SalDesktopItem").val();
    GetParam(ace, groupDesktopItem, salDesktopItem, false);

    var index = 1;
    if (dashbordData.length > 0) {
        var lastItems = dashbordData.filter(o => o.id.contains(modeItem));
        index = lastItems.length + 1;
    }
    var uuid = dashbordData.length + 1;

    //var idItem = modeItem + "-" + index;
    var idItem = modeItem;
    var item = {};
    if (modeItem == "TChk") {
        item = {
            id: idItem,
            uuid: uuid,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "TChk_Sum") {
        item = {
            id: idItem,
            uuid: uuid,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "TrzFCust_S") {
        item = {
            id: idItem,
            uuid: uuid,
            isForosh: true,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "TrzFCust_P") {
        item = {
            id: idItem,
            uuid: uuid,
            /* valueControl: {
                 top: 10,
                 fromDate: "1384/01/01",//localStorage.getItem("BeginDateFct"),
                 modeItem: "P"
             },*/
            isForosh: false,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "TarazFasli") {
        item = {
            id: idItem,
            uuid: uuid,
            valueControl: {
                mode: 0,
                fromDate: "1384/01/01",
                modeItem: "S"
            },
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "TrzAcc") {
        item = {
            id: idItem,
            uuid: uuid,
            valueControl: {
                mode: 0,
                fromDate: "1384/01/01",
                modeItem: "S"
            },
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "Dftr") {
        item = {
            id: idItem,
            uuid: uuid,
            valueControl: {
                mode: 0,
            },
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "ADocR") {
        item = {
            id: idItem,
            uuid: uuid,
            valueControl: {
                mode: 0,
            },
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "AGMkz") {
        item = {
            id: idItem,
            uuid: uuid,
            valueControl: {
                mode: 0,
            },
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "AGOpr") {
        item = {
            id: idItem,
            uuid: uuid,
            valueControl: {
                mode: 0,
            },
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "GrdZAcc") {
        item = {
            id: idItem,
            uuid: uuid,
            valueControl: {
                mode: 0,
            },
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "KhlAcc") {
        item = {
            id: idItem,
            uuid: uuid,
            valueControl: {
                mode: 0,
            },
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "KhlZAcc") {
        item = {
            id: idItem,
            uuid: uuid,
            valueControl: {
                mode: 0,
            },
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "TrzFKala_S") {
        item = {
            id: idItem,
            uuid: uuid,
            isForosh: true,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "TrzFKala_P") {
        item = {
            id: idItem,
            uuid: uuid,
            isForosh: false,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "FDocR_S") {
        item = {
            id: idItem,
            uuid: uuid,
            isForosh: true,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "FDocR_P") {
        item = {
            id: idItem,
            uuid: uuid,
            isForosh: false,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "Krdx") {
        item = {
            id: idItem,
            uuid: uuid,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };
    }
    else if (modeItem == "TrzIKalaExf") {
        item = {
            id: idItem,
            uuid: uuid,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        };

    }
    else if (modeItem == "TrzIKala") {
        item = {
            id: idItem,
            uuid: uuid,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        }
    }
    else if (modeItem == "IDocR") {
        item = {
            id: idItem,
            uuid: uuid,
            position: positionGrid_Defult,
            caption: captionItem,
            visible: true,
            baseValue: {
                ace: ace,
                group: groupDesktopItem,
                sal: salDesktopItem
            }
        }
    }

    dashbordData.push(item);
    AddIteminGrid(item);

    var col = ' <tr id="Obj_' + item.id + '"> ' +
        '    <td id="Text_' + item.id + '">' + item.caption + '</td> ' +
        '    <td style="padding: 0px 10px;text-align: left;"> ' +
        '        <input class="CheckedItem" id = "Setting_' + item.id + '" type = "checkbox" ' + (item.visible == false ? "" : 'Checked="checked"') + '/>' +
        '    </td > ' +
        '</tr> ';

    $('#TableDesktopItem').append(col);

    $('#modal-DesktopNewItem').modal('hide');
});


$('#modal-DesktopItem').on('show.bs.modal', function () {
    cols = '';
    $("#TableDesktopItem").empty();
    for (var i = 0; i < dashbordData.length; i++) {
        var item = dashbordData[i];
        id = item.id;
        col = ' <tr id="Obj_' + id + '"> ' +
            '    <td id="Text_' + id + '">' + item.caption + '</td> ' +
            '    <td style="padding: 0px 10px;text-align: left;"> ' +
            '        <input class="CheckedItem" id = "Setting_' + id + '" type = "checkbox" ' + (item.visible == false ? "" : 'Checked="checked"') + '/>' +
            '    </td > ' +
            '</tr> ';
        $('#TableDesktopItem').append(col);
    }
});

var settingObject = $('#settingObject');

settingObject.Setting(
    {
        id: null,
        caption: "تنظیمات",
        dataSetting: dataSettingDefult["all"],
        externalModal: true,
        baseValue: {
            ace: ace
        },
    },
);


settingObject.click(function () {
    settingObject.Setting("ShowModalSetting");
});




function CreateListModeDesktop(group) {
    $('#ModeDesktopItem').empty();
    var listModeDesktop = dataGroup[group]["ListMode"]
    for (var i = 0; i < listModeDesktop.length; i++) {
        $('#ModeDesktopItem').append($('<option>', { value: listModeDesktop[i].code, text: listModeDesktop[i].caption }));
    }
}

/*
$('#ModeDesktopItem').empty();
for (var i = 0; i < listModeDesktop.length; i++) {
    $('#ModeDesktopItem').append($('<option>', { value: listModeDesktop[i].code, text: listModeDesktop[i].caption }));
}
*/

listGroups = loginData.baseValue.groupsData;
for (var i = 0; i < listGroups.length; i++) {
    $('#GroupDesktopItem').append($('<option>', { value: ReplaceGroup(listGroups[i].Code), text: listGroups[i].Code + " - " + listGroups[i].Name }));
}
$('#GroupDesktopItem').val(loginData.baseValue.defultGroup);


$('#modal-DesktopNewItem').on('show.bs.modal', function () {
    var group = ReplaceGroup(loginData.baseValue.defultGroup);
    CreateListDesktop(ace, group);
    CreateListModeDesktop(group);
    SetSalData(ace, group);
    $("#CaptionItem").val(listModeDesktop[0].caption + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem').val());
    $('#GroupDesktopItem').val(group);
})

$("#ModeDesktopItem").change(function () {
    var value = $(this).val();
    for (var i = 0; i < listModeDesktop.length; i++) {
        if (listModeDesktop[i].code == value) {
            $("#CaptionItem").val(listModeDesktop[i].caption + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem option:selected').text());
        }
    }
});

//var listGroups = localStorage.getItem('afiList');



$("#GroupDesktopItem").change(function () {
    var group = $(this).val();
    CreateListDesktop(ace, group);
    CreateListModeDesktop(group);
    SetSalData(ace, group);
    $("#CaptionItem").val($("#ModeDesktopItem option:selected").text() + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem option:selected').text());
});

$("#SalDesktopItem").change(function () {
    $("#CaptionItem").val($("#ModeDesktopItem option:selected").text() + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem option:selected').text());
});








function SetSalData(ace, group) {
    $("#SalDesktopItem").empty();
    var progName = ace == prog_Web1 ? prog_Afi : loginData.orgProgName;

    var DatabseSalObject = {
        ProgName: progName,
        Group: group,
        UserCode: userName
    }

    ajaxFunction(DatabseSalUrl, 'Post', DatabseSalObject).done(function (data) {
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                $('#SalDesktopItem').append($('<option>', { value: data[i].Code, text: data[i].Name }));
            }
            $("#SalDesktopItem").val(data[i - 1].Code);
        }
    });
}






/*
var ViewModel = function () {
    var self = this;

    var aceList = [];
    var afi1List = [];
    var afi8List = [];
    var afiList = [];
    var erjList = [];

    var DatabseSalUrl = server + '/api/Web_Data/DatabseSal/'; // آدرس دیتابیس های سال
    self.DatabseSalList = ko.observableArray([]); // دیتابیس های سال

    $('#information').hide();

    if (sessionStorage.userName != 'ACE') {
        $('#show_RepairDatabaseConfig').hide();
        $('#show_RepairDatabase').hide();
    }

    self.currentPageIndexPrintForms = ko.observable(0);
    self.filterPrintForms0 = ko.observable("");
    self.filterPrintForms1 = ko.observable("");
    self.pageSizePrintForms = ko.observable(0);
    self.currentPageIndexKhdt = ko.observable(0);
    self.CodePrint = ko.observable();

    self.sortTablePrintForms = function (viewModel, e) { };
    self.currentPagePrintForms = ko.computed(function () { });

    self.nextPagePrintForms = function () { };

    self.previousPagePrintForms = function () { };

    self.firstPagePrintForms = function () { };


    self.lastPagePrintForms = function () { };


    self.PageIndexPrintForms = function (item) {
        return 0;
    };

};


ko.applyBindings(new ViewModel());
*/

function GetIconBank(Bank) {
    res = '';
    if (Bank == null)
        res = "ansar"
    else if (Bank.includes("انصار"))
        res = "ansar"
    else if (Bank.includes("پاسارگاد"))
        res = "asargad"
    else if (Bank.includes("آینده"))
        res = "ayandeh"
    else if (Bank.includes("دی"))
        res = "day"
    else if (Bank.includes("اقتصاد"))
        res = "eghtesad"
    else if (Bank.includes("گردشگری"))
        res = "gardesh"
    else if (Bank.includes("حکمت"))
        res = "hekmat"
    else if (Bank.includes("آفرین"))
        res = "karafarin"
    else if (Bank.includes("کشاورزی"))
        res = "keshavarzi"
    else if (Bank.includes("مسکن"))
        res = "maskan"
    else if (Bank.includes("مهر"))
        res = "mehr"
    else if (Bank.includes("ملت"))
        res = "melat"
    else if (Bank.includes("ملی"))
        res = "meli"
    else if (Bank.includes("پارسیان"))
        res = "parsian"
    else if (Bank.includes("رفاه"))
        res = "refah"
    else if (Bank.includes("رسالت"))
        res = "resalat"
    else if (Bank.includes("صادرات"))
        res = "saderat"
    else if (Bank.includes("سامان"))
        res = "saman"
    else if (Bank.includes("سرمایه"))
        res = "sarmaye"
    else if (Bank.includes("سپه"))
        res = "sepah"
    else if (Bank.includes("شهر"))
        res = "shahr"
    else if (Bank.includes("سینا"))
        res = "sina"
    else if (Bank.includes("تعاون"))
        res = "tavon"
    else if (Bank.includes("تجارت"))
        res = "tejarat"
    return "/Content/img/bank/" + res + ".png";
}


function GetIconCustomer(code) {
    return '/Content/img/profile.png'
}

