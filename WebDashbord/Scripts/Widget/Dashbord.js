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



TestUser();
//localStorage.removeItem("Karbord_DashbordData");
var dashbordData_Save = localStorage.getItem("Karbord_DashbordData");

//dashbordData_Save = `[{"id":"TChk_Sum-1","valueControl":{"day":"10000000"},"position":{"x":0,"y":12,"w":4,"h":3},"caption":"صورت خلاصه چک های پرداختی - گروه 97 - سال 1384","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}},{"id":"TChk_Sum-2","valueControl":{"day":"10000000"},"position":{"x":4,"y":3,"w":4,"h":3},"caption":"صورت خلاصه چک های پرداختی - گروه 97 - سال 1403","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1403"}},{"id":"TrzFCust_S-1","valueControl":{"top":10,"fromDate":"1384/01/01","modeItem":"S"},"position":{"x":8,"y":0,"w":4,"h":3},"caption":"مانده حساب خریداران - گروه 97 - سال 1403","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1403"}},{"id":"TrzFCust_P-1","valueControl":{"top":10,"fromDate":"1384/01/01","modeItem":"P"},"position":{"x":0,"y":3,"w":4,"h":3},"caption":"مانده حساب فروشندگان - گروه 97 - سال 1403","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1403"}},{"id":"TChk-3","valueControl":{"day":"1000000"},"position":{"x":0,"y":0,"w":4,"h":3},"caption":"چک های پرداختی - گروه 97 - سال 1403","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1403"}},{"id":"TChk-4","valueControl":{"day":"10000000"},"position":{"x":8,"y":3,"w":4,"h":3},"caption":"چک های پرداختی - گروه 97 - سال 1384","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}},{"id":"TrzFCust_P-2","valueControl":{"top":10,"fromDate":"1384/01/01","modeItem":"P"},"position":{"x":4,"y":0,"w":4,"h":3},"caption":"مانده حساب فروشندگان - گروه 97 - سال 1384","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}}]`
//dashbordData_Save = `[{"id":"TrzAcc-1","valueControl":{"mode":0,"fromDate":"1384/01/01","modeItem":"S"},"position":{"x":0,"y":0,"w":4,"h":3},"caption":"تراز حساب - گروه 97 - سال 1384","visible":true,"baseValue":{"ace":"Web8","group":"97","sal":"1384"}}]`


let grid = GridStack.init({
    cellHeight: 'initial', // start square but will set to % of window width later
    cellHeight: 'initial', // start square but will set to % of window width later
    animate: true, // show immediate (animate: true is nice for user dragging though)
    disableOneColumnMode: !isMobile, // will manually do 1 column
    lazyLoad: true,
});


function unique(arr, key) {
    var u = {}, a = [];
    var index = 0;
    for (var i = 0, l = arr.length; i < l; ++i) {
        if (!u.hasOwnProperty(arr[i][key])) {
            a.push({ ro: index++, roH: arr[i][key], sumW: 0 });
            u[arr[i][key]] = 1;
        }
    }
    return a;
}

function Fix_UUid() {
    dashbordData.sort(function (a, b) {
        //return (a.y > b.y) || (a.x > b.x) ? 1 : -1
        return ((a.position.y * 10) + a.position.x) > ((b.position.y * 10) + b.position.x) ? 1 : -1
    });
    for (var i = 0; i < dashbordData.length; i++) {
        dashbordData[i].uuid = i + 1;
        if (dashbordData[i].position == null) {
            dashbordData[i].position = positionGrid_Defult
        }
    }
}

function SetDataColumns(push) {
    var pos = [];

    if (push) {
        var nodes = grid.engine.nodes;
        for (var i = 0; i < nodes.length; i++) {
            var item = nodes[i];
            var uuid = parseInt($(item.el).attr("uuid"));
            var position = {
                x: item.x,
                y: item.y,
                w: item.w,
                h: item.h,
            }
            pos.add(position);
        }
    }
    else {
        for (var i = 0; i < dashbordData.length; i++) {
            pos.add(dashbordData[i].position);
        }
    }

    pos.sort(function (a, b) {
        return ((a.y * 10) + a.x) > ((b.y * 10) + b.x) ? 1 : -1
    });
    var rows = unique(pos, 'y');
    for (var i = 0; i < rows.length; i++) {
        var r = pos.where(c => c.y == rows[i].roH);
        r.sort(function (a, b) {
            return (a.h > b.h) ? 1 : -1
        });

        var sumW = 0;
        for (var j = 0; j < r.length; j++) {
            sumW = sumW + r[j].w;
        }

        rows[i].maxH = r[r.length - 1].h;
        rows[i].sumW = sumW;
    }
    return rows;
}

function AppendBoxPush(uuid) {
    for (var i = uuid; i < objectDashbord.length; i++) {
        if (objectDashbord[i].uuid > 0) {
            grid.removeWidget(objectDashbord[i].o);
        }
    }

    for (var i = uuid; i < objectDashbord.length; i++) {
        if (objectDashbord[i].uuid > 0) {
            var pos = FindFreePosition(0, true);
            item = objectDashbord[i].o;
            $(item).attr("gs-x", pos.x);
            $(item).attr("gs-y", pos.y);
            grid.el.appendChild(item);
            grid.makeWidget(item);
        }
    }
}
function Car() {
    this.x = 0;
    this.y = 0;
    this.w = 4;
    this.h = 5;
}


function FindFreePosition(uuid, push = false) {
    let position = {};
    var rows = SetDataColumns(push);
    if (uuid > 0) {
        var pos = dashbordData.filter(c => c.uuid == uuid)[0].position;
        if (pos.x + pos.w + positionGrid_Defult.w <= 12) {
            position.x = pos.x + pos.w;
            position.y = pos.y;
        } else {
            position.x = 0;
            position.y = pos.h;
        }
        position.w = pos.w;
        position.h = pos.h;
    } else {
        position = new PositionGrid_Defult_Fun(); //positionGrid_Defult;
        if (rows.length > 0) {
            var flagSet = false;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].sumW + position.w <= 12) {
                    position.y = rows[i].roH;
                    position.x = rows[i].sumW;
                    flagSet = true;
                    break;
                }
            }
            if (flagSet == false) {
                var lastRow = rows[rows.length - 1];
                position.y = lastRow.roH + lastRow.maxH;
                position.x = 0;
            }
        }
    }
    return position;
}

var listGroups = loginData.baseValue.groupsData;

if (dashbordData_Save != null && dashbordData_Save != "[{}]" && dashbordData_Save.toString() != "null" && dashbordData_Save.toString() != "") {
    var dashbordData = JSON.parse(dashbordData_Save);
    dashbordData = dashbordData.filter(c => loginData.baseValue.groupsAccess.includes(c.baseValue.group));
    Fix_UUid(dashbordData);
    for (var i = 0; i < dashbordData.length; i++) {
        var baseValue = dashbordData[i].baseValue;
        GetAccess_Group(baseValue.ace, baseValue.group);
        GetParam(baseValue.ace, baseValue.group, baseValue.sal, false);
        CreateListDesktop(baseValue.ace, baseValue.group);

        if (loginData.erj_Access != "") {
            var pos = loginData.erj_Group.search(baseValue.group);
            if (pos == 0) {
                GetAccess_Group(prog_Web2, baseValue.group);
                //CreateListDesktop(prog_Web2, baseValue.group);
            }
        }

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

/*
function SaveVariantDashbord() {
    var myJsonString = JSON.stringify(dashbordData)
    localStorage.setItem("Karbord_DashbordData", myJsonString);
}
window.onbeforeunload = function () {
    SaveVariantDashbord();
};*/

function CreateListDesktop(ace, group) {
    if (dataGroup[group] == null) {
        GetAccess_Group(ace, group);
    }
    var listMode = dataGroup[group]["ListMode"];

    if (listMode != null && ace != prog_Web2) {
        if (listMode.where(c => c.prog != prog_Erj).length == 0) {
            listMode = null;
        }
    }

    if (listMode == null) {
        listModeDesktop = [];

        var isErj = false;
        if (loginData.erj_Group != "" && loginData.erj_Group != null) {
            var pos = loginData.erj_Group.search(group);
            isErj = pos >= 0;
        }

        var erjOnly = listGroups.where(c => c.Code == group);
        var aceProg = ace;
        if (erjOnly.length > 0) {
            if (erjOnly[0].ErjOnly == true)
                aceProg = prog_Web2;
        }

        var accessMode = accessMode_Public;

        if (aceProg == prog_Web1) {
            accessMode_Public.splice(accessMode_Public.findIndex(a => a.code == "TrzIKalaExf"), 1);
        }

        if (aceProg == prog_Web2) {
            accessMode = accessMode_Public.where(c => c.prog == prog_Erj || c.code == "RPRT");
        }

        for (var i = 0; i < accessMode.length; i++) {
            var item = accessMode[i];
            var prog = item.prog;
            var aceProg = isErj && prog == prog_Erj ? prog_Web2 : aceProg;

            var access = IsAccess(aceProg, item.prog, group, item.code, item.parent);

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
    else {
        listModeDesktop = listMode;
    }
}



$("#SaveItems").click(function () {
    var obj = [];
    var items = $('.CheckedItem');
    var widget_dashbord = $('.grid-stack ');
    //GetParam(baseValue.ace, baseValue.group, baseValue.sal, false);
    for (i = 0; i < items.length; i++) {
        var item = $(items[i]);
        var uuid = item.attr("uuid");
        var idItem = items[i].id.substring(8);

        // باید با uuid جایگزین بشه
        var itemData = dashbordData.find(c => c.uuid == uuid);


        itemData.visible = item.is(':checked') == true;
        var itemDashbord = $(widget_dashbord).find("[uuid=" + uuid + "]");

        $(itemDashbord).css("visibility", item.is(':checked') == true ? "visible" : "hidden");
    }

    SaveVariant();
    $('#modal-DesktopItem').modal('hide');
});






var cols = '';
$("#TableDesktopItem").empty();


for (var i = 0; i < dashbordData.length; i++) {
    AddIteminGrid(dashbordData[i]);
}

$("#AddItemDesktop").click(async function () {
    ViewLoading(true);
    var modeItem = $("#ModeDesktopItem").val();
    var captionItem = $("#CaptionItem").val();
    var groupDesktopItem = $("#GroupDesktopItem").val();
    var salDesktopItem = "0000";
    var aceProg = ace;

    if (modeItem == "ErjDocK" || modeItem == "ErjDocB_Last") {
        aceProg = prog_Web2;
    }
    else
        salDesktopItem = $("#SalDesktopItem").val();

    await GetParam(aceProg, groupDesktopItem, salDesktopItem, false, false);

    var uuid = 1;
    if (dashbordData.length > 0) {
        var lastItems = dashbordData.filter(o => o.id.contains(modeItem));
        uuid = Math.max.apply(Math, dashbordData.map(function (o) { return o.uuid; })) + 1;
    }

    // var uuid = dashbordData.length + 1;

    //const max = Math.max.apply(Math, dashbordData.map(function (o) { return o.uuid; }));
    //var uuid = max + 1;
    //var idItem = modeItem + "-" + index;
    var position = FindFreePosition(0);

    var item = {
        id: modeItem,
        uuid: uuid,
        position: position,
        caption: captionItem,
        visible: true,
        baseValue: {
            ace: aceProg,
            group: groupDesktopItem,
            sal: salDesktopItem,
        }
    }

    if (modeItem == "TrzFCust_S" || modeItem == "TrzFKala_S" || modeItem == "FDocR_S") {
        item.isForosh = true;
    }
    else if (modeItem == "TrzFCust_P" || modeItem == "TrzFKala_P" || modeItem == "FDocR_P") {
        item.isForosh = false;
    }

    dashbordData.add(item);
    AddIteminGrid(item);

    var groupData = loginData.baseValue.groupsData.find(c => c.Code == item.baseValue.group);
    var titleGroup = 'گروه (' + item.baseValue.group + ') ' + groupData.Name + (item.baseValue.sal != "0000" ? (' - ' + item.baseValue.sal) : '');

    var col = ' <tr id="Obj_' + item.id + '" uuid="' + item.uuid + '"> ' +
        '<div class="center" style="padding-right: 5px;padding-left: 5px;border: 1px solid #eb8121;border-radius: 10px;top: 8px;margin-left: 8px;">' +
        '<td id="Text_' + item.id + '" uuid="' + item.uuid + '" ><span style="font-size: 9px;border: 1px solid #eb8121;border-radius: 10px;padding: 3px;margin-left: 5px;" title="' + titleGroup + '" >' + item.baseValue.group + (item.baseValue.sal != "0000" ? (' - ' + item.baseValue.sal) : '') + '</span>' + item.caption + '</td> ' +
        '    <td style="padding: 0px 10px;text-align: left;"> ' +
        '        <input class="CheckedItem" id="Setting_' + item.id + '"  uuid="' + item.uuid + '" type = "checkbox" ' + (item.visible == false ? "" : 'Checked="checked"') + '/>' +
        '    </td > ' +
        '</tr> ';

    $('#TableDesktopItem').append(col);

    ViewLoading(false);
    $('#modal-DesktopNewItem').modal('hide');
});


$('#modal-DesktopItem').on('show.bs.modal', function () {
    cols = '';
    $("#TableDesktopItem").empty();
    for (var i = 0; i < dashbordData.length; i++) {
        var item = dashbordData[i];
        id = item.id;
        var groupData = loginData.baseValue.groupsData.find(c => c.Code == item.baseValue.group);
        var titleGroup = 'گروه (' + item.baseValue.group + ') ' + groupData.Name + (item.baseValue.sal != "0000" ? (' - ' + 'سال مالی ' + item.baseValue.sal) : '');


        col =
            '<tr id="Obj_' + id + '" uuid="' + item.uuid + '">' +
            '    <td id="Text_' + id + '" uuid="' + item.uuid + '" ><span style="font-size: 9px;border: 1px solid #eb8121;border-radius: 10px;padding: 3px;margin-left: 5px;" title="' + titleGroup + '" >' + item.baseValue.group + (item.baseValue.sal != "0000" ? (' - ' + item.baseValue.sal) : '') + '</span>' + item.caption + '</td> ' +
            '    <td style="padding: 0px 10px;text-align: left;"> ' +
            '        <input class="CheckedItem" id = "Setting_' + id + '" uuid="' + item.uuid + '" type = "checkbox" ' + (item.visible == false ? "" : 'Checked="checked"') + '/>' +
            '    </td >' +
            '</tr>';
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
    var listModeDesktop = dataGroup[group]["ListMode"];
    for (var i = 0; i < listModeDesktop.length; i++) {
        var color = "white";
        if (listModeDesktop[i].prog == prog_Acc) {
            color = "aliceblue";
        } else if (listModeDesktop[i].prog == prog_Fct) {
            color = "antiquewhite";
        } else if (listModeDesktop[i].prog == prog_Inv) {
            color = "aquamarine";
        } else if (listModeDesktop[i].prog == prog_Erj) {
            color = "white";
        } 
        var option = $('<option>', { value: listModeDesktop[i].code, text: listModeDesktop[i].caption });
        option.css('background-color', color);
        $('#ModeDesktopItem').append(option);

    }
}

/*
$('#ModeDesktopItem').empty();
for (var i = 0; i < listModeDesktop.length; i++) {
    $('#ModeDesktopItem').append($('<option>', { value: listModeDesktop[i].code, text: listModeDesktop[i].caption }));
}
*/


for (var i = 0; i < listGroups.length; i++) {
    $('#GroupDesktopItem').append($('<option>', { value: ReplaceGroup(listGroups[i].Code), text: listGroups[i].Code + " - " + listGroups[i].Name }));
}
$('#GroupDesktopItem').val(loginData.baseValue.defultGroup);



function SetAce(ace, group) {
    var erjOnly = listGroups.where(c => c.Code == group);
    aceProg = ace;
    if (erjOnly.length > 0) {
        if (erjOnly[0].ErjOnly == true)
            aceProg = prog_Web2;
    }
    return aceProg
}

$('#modal-DesktopNewItem').on('show.bs.modal', function () {
    var group = ReplaceGroup(loginData.baseValue.defultGroup);

    /*var erjOnly = listGroups.where(c => c.Code == group);
    aceProg = ace;
    if (erjOnly.length > 0) {
        if (erjOnly[0].ErjOnly == true)
            aceProg = prog_Web2;
    }*/
    var aceProg = SetAce(ace, group);
    CreateListDesktop(aceProg, group);
    CreateListModeDesktop(group);
    if (aceProg != prog_Web2) {
        $('#span_SalDesktopItem').show();
        $('#SalDesktopItem').show();
        SetSalData(ace, group);
    }
    else {
        $('#span_SalDesktopItem').hide();
        $('#SalDesktopItem').hide();
    }

    //$("#CaptionItem").val(listModeDesktop[0].caption + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem').val());
    $("#CaptionItem").val(listModeDesktop.length > 0 ? listModeDesktop[0].caption : "");
    $('#GroupDesktopItem').val(group);
    //var sal = loginData.baseValue.defultSal;
    //$('#SalDesktopItem').val(sal == null ? 0 : sal);
})

$("#ModeDesktopItem").change(function () {
    var value = $(this).val();
    for (var i = 0; i < listModeDesktop.length; i++) {
        if (listModeDesktop[i].code == value) {
            //$("#CaptionItem").val(listModeDesktop[i].caption + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem option:selected').text());
            $("#CaptionItem").val(listModeDesktop[i].caption);
        }
    }
});

//var listGroups = localStorage.getItem('afiList');



$("#GroupDesktopItem").change(function () {
    var group = $(this).val();
    CreateListDesktop(ace, group);
    CreateListModeDesktop(group);
    SetSalData(ace, group);
    //$("#CaptionItem").val($("#ModeDesktopItem option:selected").text() + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem option:selected').text());
    $("#CaptionItem").val($("#ModeDesktopItem option:selected").text());
    loginData.baseValue.defultGroup = group;
});

$("#SalDesktopItem").change(function () {
    var sal = $(this).val();
    // $("#CaptionItem").val($("#ModeDesktopItem option:selected").text() + ' - گروه ' + $('#GroupDesktopItem').val() + ' - سال ' + $('#SalDesktopItem option:selected').text());
    $("#CaptionItem").val($("#ModeDesktopItem option:selected").text());
    loginData.baseValue.defultSal = sal;
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
            $("#span_SalDesktopItem").show();
            $("#SalDesktopItem").show();
            for (var i = 0; i < data.length; i++) {
                $('#SalDesktopItem').append($('<option>', { value: data[i].Code, text: data[i].Name }));
            }
            $("#SalDesktopItem").val(data[i - 1].Code);
        } else {
            $("#span_SalDesktopItem").hide();
            $("#SalDesktopItem").hide();
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




/* if (modeItem == "TChk") {
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
    else if (modeItem == "TarazFasli") {
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
    else if (modeItem == "TrzAcc") {
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
    else if (modeItem == "Dftr") {
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
    else if (modeItem == "ADocR") {
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
    else if (modeItem == "AGMkz") {
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
    else if (modeItem == "AGOpr") {
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
    else if (modeItem == "GrdZAcc") {
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
    else if (modeItem == "KhlAcc") {
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
    else if (modeItem == "KhlZAcc") {
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
    }*/