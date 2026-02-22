$.widget("ui.TChk_Sum", {
    options: {
        rprtId: 'TChk_Sum',
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
        var divGrid = $('<div> ');
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
        c.day = $('<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">');
        divCol.append(c.day);

        var divBtn = $('<div class="col-lg-9 col-md-9 col-sm-6 col-xs-6">');
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
            day: {
                element: null,
                value: 8000,
                maxlength: 10,
                dataType: type_BigInt,
                caption: "روز مانده به تاریخ چک",
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

        CreateObjectInput(c, objects, 'day');
    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;

        var object = {
            azTarikh: LowDay(data.day.value),
            taTarikh: "",
        };
        var uri = server + '/api/ReportAcc/TChk_Sum/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
        ajaxFunction(uri, 'POST', object, true).done(function (response) {
            o.controlData = object;
            o.data = response;
            var l_Count = $(obj.bindings[0]).find('.l_Count');
            l_Count.text(response.length);

            var sum = 0;
            for (var i = 0; i < response.length; i++) {
                sum += response[i].Value
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
            var tdIcon = $('<td style="width:0px"><center><img src="' + GetIconBank(data[i].Bank) + '" width="35" /></center>')
            var tdTrafName = $('<td><div><h5 style="padding-right:5px">' + data[i].Shobe + '</h5></div></td>')
            var tdValue = $('<td style="width:0px"><h5 style="text-align:center">' + NumberToNumberString(data[i].Value) + '</h5></td>')
            tr.append(tdIcon);
            tr.append(tdTrafName);
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
