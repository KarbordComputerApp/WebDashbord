$.widget("ui.TrzFCust", {
    options: {
        rprtId: 'TrzFCust',
        uuidSetting: null,
        caption: null,
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        objects: null,
        objGrid: null,
        headButton: [], //آیکن های بالا
        externalModal: true,
        showControl: false,
        getAutoData: false,
        isForosh : null,
        // exports
        columns: null,
        controlData: null,
        data: null
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        o.objects = obj._SetObjects();
        var divContent = $('<div style="background-color: white;">');
        //head
        var divHeader = $('<div class="row" style="padding:10px">');
        var h2 = $('<h5>' + o.caption + '</h2>');
        divHeader.append(h2);

        var divSum = $('<div class="form-inline" style="padding: 5px;width: 100%;">');
        div = $('<div class="form-inline" style="margin-left:auto">');
        h5 = $('<h5>مجموع : </h5>');
        var _Sum = $('<h5 class="l_Sum" style="padding-right:5px">0</h5>');

        div.append(h5);
        div.append(_Sum);
        divSum.append(div);

        div = $('<div class="form-inline" style="margin-right:auto">');
        h5 = $('<h5>تعداد : </h5>');
        var _Count = $('<h5 class="l_Count" style="padding-right:5px">0</h5>');
        div.append(h5);
        div.append(_Count);
        divSum.append(div);

        //Grid
        var divGrid = $('<div>');
        var table = $('<table class="' + o.rprtId + '_Table table table-hover">');
        divGrid.append(table);

        o.objGrid = divGrid;

        if (o.caption != null) {
            divContent.append(divHeader);
        }

        divContent.append(obj._CreateControl());
        divContent.append(divSum);
        divContent.append(divGrid);
        obj.element.append(divContent);

        CreateObjectSetting(obj);
        if (o.getAutoData) obj._GetData();
    },


    _CreateControl: function () {
        var obj = this;
        var o = obj.options;
        var c = {};
        var divControl = $('<div style="display: ' + (o.showControl ? "block" : "none") + ';">');
        o.divControl = divControl;

        var divRow = $('<div class="form-inline" style="margin-top: 10px;">');

        var divCol = $('<div class="form-inline col-12">');
        c.top = $('<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">');
        c.fromDate = $('<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">');
        divCol.append(c.top);
        divCol.append(c.fromDate);

        var divBtn = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        var divBtn1 = $('<div class="pull-left">');
        c.btnReport = $('<button type="button" class="btn btn-primary">گزارش گیری</button>');
        divBtn1.append(c.btnReport);
        divBtn.append(divBtn1);

        divCol.append(divBtn);
        divRow.append(divCol);

        divControl.append(divRow);
        obj._BuildControl(c);
        return divControl;
    },

    _SetObjects: function (e) {
        var obj = this;
        var o = obj.options;
        return object = {
            top: {
                element: null,
                value: 10,
                maxlength: 10,
                dataType: type_BigInt,
                caption: "تعداد رکورد",
            },
            fromDate: {
                element: null,
                value: "1384/01/01",
                type: type_Date,
                caption: "از تاریخ",
            },
        }
    },

    _BuildControl: function (c) {
        var obj = this;
        var o = obj.options;
        var objects = o.objects;

        c.btnReport.click(function (e) {
            obj._GetData();
        });

        CreateObjectInput(c, objects, 'top');
        CreateObjectDate(c, objects, 'fromDate');
    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;

        var object = {
            azTarikh: data.fromDate.value.toEnglishDigit(),
            taTarikh: LowDay(0),
            Top: data.top.value,
            ModeCode1: o.isForosh == true ? sessionStorage.MODECODE_FDOC_S : sessionStorage.MODECODE_FDOC_P,
            ModeCode2: o.isForosh == true ? sessionStorage.MODECODE_FDOC_SR : sessionStorage.MODECODE_FDOC_PR,
            azShomarh: "",
            taShomarh: "",
            CGruCode: "",
            CustCode: "",
            InvCode: "",
            KGruCode: "",
            KalaCode: "",
            MkzCode: "",
            OprCode: "",
            StatusCode: "موقت*تایید*تصویب",
            ZeroValue: "0",
        };
        var uri = server + '/api/ReportFct/TrzFCust/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
        ajaxFunction(uri, 'POST', object, true).done(function (response) {
            o.controlData = object;
            o.data = response;
            var l_Count = $(obj.bindings[0]).find('.l_Count');
            l_Count.text(response.length);

            var sum = 0;
            for (var i = 0; i < response.length; i++) {
                sum += response[i].AccMon
            }
            var l_Sum = $(obj.bindings[0]).find('.l_Sum');
            l_Sum.text(NumberToNumberString(sum));
            obj._CreateTable(response);
        });
    },

    _CreateTable: function (data) {
        var obj = this;
        var o = obj.options;
        var table = $(obj.bindings[0]).find('.' + o.rprtId + '_Table');
        table.empty();
        var tbody = $('<tbody>');

        for (var i = 0; i < data.length; i++) {
            var tr = $('<tr>');
            var tdIcon = $('<td style="width:0px"><center><img src="' + GetIconCustomer(data[i].CustCode) + '" width="35" /></center>')
            var tdCust = $('<td><h5 style="padding-right:5px">' + data[i].CustCode + ' - ' + data[i].CustName + '</h5></td>')
            var tdCustTel = $('<div class="form-inline" style="padding-top: 10px; padding-right: 5px;"><img src="/Content/img/ContactUs.png" width = "16" style = "margin-left: 5px;"><span>' + data[i].Tel + ' </span></div>');
            if (data[i].Tel != "") {
                tdCust.append(tdCustTel);
            }
            var tdValue = $('<td style="width:0px"><h5 style="text-align:center">' + NumberToNumberString(data[i].AccMon) + '</h5></td>')
            tr.append(tdIcon);
            tr.append(tdCust);
            tr.append(tdValue);
            tbody.append(tr);
        }
        table.append(tbody);
    },


    Refresh: function () {
        var obj = this;
        obj._GetData();
    },

    ShowSetting: function () {
        var obj = this;
        var o = obj.options;
        ShowObjectSetting(obj);
    },

    ShowControl: function () {
        var obj = this;
        var o = obj.options;
        var display = $(o.divControl).css("display");
        var flag = display == "none" ? "block" : "none";
        $(o.divControl).css("display", flag);
    },

    ShowColumns: function () {
        var obj = this;
        var o = obj.options;
        o.objGrid.Table("ShowModalColumn");
    },

    ShowPrint: function () {
        var obj = this;
        var o = obj.options;
        ShowObjectPrint(obj);
    },

});
