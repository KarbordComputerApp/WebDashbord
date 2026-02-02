/*
$('.grid-stack-item').on('resizes', function () {
    var node = $(this).data('_gridstack_node');

    if (typeof node == undefined) {
        return;
    }
});
$(window).bind('resize', function () {
    var a = 1;

});

$('.grid-stack-item').resizable({
    stop: function (event, ui) {
        $('#element').height(ui.originalSize.height);
    }
});*/

$.widget("ui.D_TChk", {
    options: {
        id: null,
        caption: null,
        position: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
     
        },
        valueControl: {
            day: 10
        },
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        visible: true,
        data: null,
        o: null,
        objects: null
    },


    _create: function () {
        var obj = this;
        obj._createModal();
        var o = obj.options;

        var divSum = $('<div class="form-inline" style="padding-top: 10px;width: 100%;">');
        div = $('<div class="form-inline" style="margin-left:auto">');
        h5 = $('<h5>مجموع : </h5> <h5 id="' + o.id + '_LSum" style="padding-right:5px">0</h5>');
        div.append(h5);
        divSum.append(div);

        div = $('<div class="form-inline" style="margin-right:auto">');
        h5 = $('<h5>تعداد : </h5> <h5 id="' + o.id + '_LCount" style="padding-right:5px">0</h5>');
        div.append(h5);
        divSum.append(div);

        var table = $('<table id="' + o.id + '_Table" class="table table-hover">');

        BoxDashbord_Create(obj, divSum, table);
        obj._GetData(o.valueControl.day);
    },

    _createModal: function () {
        var obj = this;
        var o = obj.options;

        body = $('main');
        $("#" + o.id + "_modal").remove();
        //modal
        _modal = $('<div class="modal fade" id="' + o.id + '_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"">');
        dialog = $('<div class="modal-dialog"></div>');
        _modal.append(dialog);
        content = $('<div class="modal-content"></div>');
        dialog.append(content);

        //head
        _header = $('<div class="modal-header">');
        _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><span aria-hidden="true">×</span></button >');
        _header.append(_buttonExit);
        title = $('<p class="modal-title" style="width: 90%;text-align: center;">' + o.caption + '</p>');
        _header.append(title);
        _header.append($('<div>'));
        // end head

        //body
        _body = $('<div class="modal-body">');

        o.objects = {
            day: {
                element: null,
                value: o.valueControl.day,
                type: "Input",
                dataType: type_Int,
                caption: "روز مانده به تاریخ چک",
            },
        };

        var divDay = $('<div class="col-sm" style="padding-top:20px">');
        divDay.Input(
            {
                caption: o.objects.day.caption,
                value: o.objects.day.value,
                Create: function (e, element) {
                    o.objects.day.element = element;
                },
                Change: function (e, record) {
                    o.objects.day.value = record.value;
                },
            },
        );

        /* _divBody1 = $('<div class="col-sm" style="padding-top:20px">');
         _divBody2 = $('<div class="form-group form-float">');
         _divBody3 = $('<div class="form-line focused date fix">');
         _inputDay = $('<input type="text" class="form-control" id="' + options.id + '_day">');
         _lable = $('<label class="form-label active">روز مانده به تاریخ چک</label>');
 
 
 
         _divBody3.append(_inputDay);
         _divBody3.append(_lable);
 
         _divBody2.append(_divBody3);
         _divBody1.append(_divBody2);*/

        _body.append(divDay);
        //end body


        _footer = $('<div style="padding: 0px; margin: 10px;">');
        _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _divFooter2 = $('<div class="col-md-6">');
        _buttonSave = $(' <button type="button" class="btn btn-primary btn-block" style="background-color: #eb8121 !important;">ذخیره</button>');
        _divFooter2.append(_buttonSave);
        _divFooter1.append(_divFooter2);

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        body.append(_modal);

        //end modal

        //script
        //_inputDay.val(options.valueControl.day);

        _buttonSave.click(function (e) {
            //var day = $("#" + o.id + "_day").val();
            day = obj.options.objects.day.value;
            obj._GetData(day);
            $("#" + o.id + "_modal").modal('hide');
            //obj._Button("SaveModal", obj.options);
        });

        $("#" + o.id + "_modal").on('show.bs.modal', function () {
            $(o.objects.day.element).val(o.valueControl.day);
            // $("#" + o.id + "_day").val(o.valueControl.day);
        })
        //end script
    },

    _GetData: function (day) {
        var obj = this;
        var options = obj.options;
        var uri = server + '/api/ReportAcc/TChk/'; // آدرس گزارش 

        var tObject = {
            azTarikh: LowDay(day),
            taTarikh: "",
            azShomarh: "",
            taShomarh: "",
            AccCode: "",
            PDMode: "1",
            CheckStatus: "1",
        };
        ajaxFunction(uri + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group, 'POST', tObject, true).done(function (response) {
            $("#" + options.id + "_LCount").text(response.length);
            sum = 0;
            for (var i = 0; i < response.length; i++) {
                sum += response[i].Value
            }
            $("#" + options.id + "_LSum").text(NumberToNumberString(sum));
            obj._CreateTable(response);
            options.data = response;
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.valueControl = options.valueControl;
        });

    },

    _CreateTable: function (data) {
        var obj = this;
        var options = obj.options;
        var table = $("#" + options.id + "_Table");
        table.empty();
        var tbody = $('<tbody>');

        for (var i = 0; i < data.length; i++) {
            var tr = $('<tr>');
            var tdIcon = $('<td style="width:0px"><center><img src="' + GetIconBank(data[i].Bank) + '" width="35" /><p style="color: darkgray;">' + data[i].Shobe + '</p></center>')
            var tdTrafName = $('<td><div><h5 style="padding-right:5px">' + data[i].TrafName + '</h5><h5 style="padding-right:5px;padding-top: 10px;">چک : ' + data[i].CheckNo + '</h5></div></td>')
            var tdValue = $('<td style="width:0px"><h5 style="text-align:center">' + NumberToNumberString(data[i].Value) + '</h5><div class="DashbordDateChek">' + data[i].CheckDate + '</div></td>')
            tr.append(tdIcon);
            tr.append(tdTrafName);
            tr.append(tdValue);
            tbody.append(tr);
        }
        table.append(tbody);
    },

    _Refresh: function () {
        var obj = this;
        var o = obj.options;
        obj._GetData(o.valueControl.day);
    },

});

$.widget("ui.D_TChk_Sum", {
    options: {
        id: null,
        caption: null,
        position: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        valueControl: {
            day: 10
        },
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        visible: true,
        data: null,
        o: null,
    },


    _create: function () {
        var obj = this;
        obj._createModal();
        var o = obj.options;

        var divSum = $('<div class="form-inline" style="padding-top: 10px;width: 100%;">');
        div = $('<div class="form-inline" style="margin-left:auto">');
        h5 = $('<h5>مجموع : </h5> <h5 id="' + o.id + '_LSum" style="padding-right:5px">0</h5>');
        div.append(h5);
        divSum.append(div);

        div = $('<div class="form-inline" style="margin-right:auto">');
        h5 = $('<h5>تعداد : </h5> <h5 id="' + o.id + '_LCount" style="padding-right:5px">0</h5>');
        div.append(h5);
        divSum.append(div);

        var table = $('<table id="' + o.id + '_Table" class="table table-hover">');

        BoxDashbord_Create(obj, divSum, table);
        obj._GetData(o.valueControl.day);
    },

    _createModal: function () {
        var obj = this;
        var options = obj.options;
        body = $('main');
        $("#" + options.id + "_modal").remove();
        //modal
        _modal = $('<div class="modal fade" id="' + options.id + '_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"">');
        dialog = $('<div class="modal-dialog"></div>');
        _modal.append(dialog);
        content = $('<div class="modal-content"></div>');
        dialog.append(content);

        //head
        _header = $('<div class="modal-header">');
        _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><span aria-hidden="true">×</span></button >');
        _header.append(_buttonExit);
        title = $('<p class="modal-title" style="width: 90%;text-align: center;">' + options.caption + '</p>');
        _header.append(title);
        _header.append($('<div>'));
        // end head

        //body
        _body = $('<div class="modal-body">');

        _divBody1 = $('<div class="col-sm" style="padding-top:20px">');
        _divBody2 = $('<div class="form-group form-float">');
        _divBody3 = $('<div class="form-line focused date fix">');
        _inputDay = $('<input type="text" class="form-control" id="' + options.id + '_day">');
        _lable = $('<label class="form-label active">روز مانده به تاریخ چک</label>');



        _divBody3.append(_inputDay);
        _divBody3.append(_lable);

        _divBody2.append(_divBody3);
        _divBody1.append(_divBody2);

        _body.append(_divBody1);
        //end body


        _footer = $('<div style="padding: 0px; margin: 10px;">');
        _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _divFooter2 = $('<div class="col-md-6">');
        _buttonSave = $(' <button type="button" class="btn btn-primary btn-block" style="background-color: #eb8121 !important;">ذخیره</button>');
        _divFooter2.append(_buttonSave);
        _divFooter1.append(_divFooter2);

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        body.append(_modal);

        //end modal

        //script
        _inputDay.val(options.valueControl.day);

        _buttonSave.click(function (e) {
            var day = $("#" + options.id + "_day").val();
            obj.options.valueControl.day = day;
            obj._GetData(options.valueControl.day);
            $("#" + options.id + "_modal").modal('hide');
            obj._Button("SaveModal", obj.options);
        });

        $("#" + options.id + "_modal").on('show.bs.modal', function () {
            $("#" + options.id + "_day").val(options.valueControl.day);
        })
        //end script

    },

    _GetData: function (day) {
        var obj = this;
        var options = obj.options;
        var uri = server + '/api/ReportAcc/TChk_Sum/'; // آدرس گزارش 

        var tObject = {
            azTarikh: LowDay(day),
            taTarikh: "",
        };
        ajaxFunction(uri + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group, 'POST', tObject, true).done(function (response) {

            sum = 0;
            for (var i = 0; i < response.length; i++) {
                sum += response[i].Value
            }
            $("#" + options.id + "_LSum").text(NumberToNumberString(sum));
            obj._CreateTable(response);
            options.data = response;
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.valueControl = options.valueControl;
        });

    },

    _CreateTable: function (data) {
        var obj = this;
        var options = obj.options;
        var table = $("#" + options.id + "_Table");
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
    _Refresh: function () {
        var obj = this;
        var o = obj.options;
        obj._GetData(o.valueControl.day);
    },

});

$.widget("ui.D_TrzFCust", {
    options: {
        id: null,
        caption: null,
        position: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        valueControl: {
            top: 10,
            fromDate: '',
            modeItem: '' // forosh S   -    kharid  P
        },
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        visible: true,
        data: null,
        o: null,
    },

    _create: function () {
        var obj = this;
        obj._createModal();
        var o = obj.options;

        var divSum = $('<div class="form-inline" style="padding-top: 10px;width: 100%;">');
        div = $('<div class="form-inline" style="margin-left:auto">');
        h5 = $('<h5>مجموع : </h5> <h5 id="' + o.id + '_LSum" style="padding-right:5px">0</h5>');
        div.append(h5);
        divSum.append(div);

        div = $('<div class="form-inline" style="margin-right:auto">');
        h5 = $('<h5>تعداد : </h5> <h5 id="' + o.id + '_LCount" style="padding-right:5px">0</h5>');
        div.append(h5);
        divSum.append(div);

        var table = $('<table id="' + o.id + '_Table" class="table table-hover">');

        BoxDashbord_Create(obj, divSum, table);
        obj._GetData(o.valueControl.fromDate, o.valueControl.top);
    },

    _createModal: function () {
        var obj = this;
        var options = obj.options;
        body = $('main');
        $("#" + options.id + "_modal").remove();
        //modal
        _modal = $('<div class="modal fade" id="' + options.id + '_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"">');
        dialog = $('<div class="modal-dialog"></div>');
        _modal.append(dialog);
        content = $('<div class="modal-content"></div>');
        dialog.append(content);

        //head
        _header = $('<div class="modal-header">');
        _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><span aria-hidden="true">×</span></button >');
        _header.append(_buttonExit);
        title = $('<p class="modal-title" style="width: 90%;text-align: center;">' + options.caption + '</p>');
        _header.append(title);
        _header.append($('<div>'));
        // end head

        //body
        _body = $('<div class="modal-body">');
        _rowBody = $('<div class="row" style="padding-top:20px">');

        _divBody1 = $('<div class="col-6" style="padding-top:20px">');
        _divBody2 = $('<div class="form-group form-float">');
        _divBody3 = $('<div class="form-line focused date fix">');
        _inputTop = $('<input type="text" class="form-control" id="' + options.id + '_top">');
        _lable = $('<label class="form-label active">تعداد رکورد</label>');

        _divBody3.append(_inputTop);
        _divBody3.append(_lable);
        _divBody2.append(_divBody3);
        _divBody1.append(_divBody2);
        _rowBody.append(_divBody1);


        _divBody1 = $('<div class="input-group col-6" style="padding-top:25px">');

        _divBtn1 = $('<div class="input-group-addon">');
        _span = $('<span class="input-group-btn">');
        _aTarikh = $('<a id="' + options.id + '_btn" data-mdpersiandatetimepicker="" data-original-title="" title="">');
        _imageTarikh = $('<img src="/Content/img/list/calendar.png" class="icon" height="20" width="20" title="انتخاب تاریخ">');

        _aTarikh.append(_imageTarikh);
        _span.append(_aTarikh);
        _divBtn1.append(_span);
        _divBody1.append(_divBtn1);

        _div1 = $('<div class="form-group form-float">');
        _div2 = $('<div class="form-line focused date fix">');
        _inputAzTarikh = $('<input id="' + options.id + '_date"  class="form-control date" type="text" maxlength="10">');
        _lable = $('<label class="form-label active">از تاریخ</label>');

        _div2.append(_inputAzTarikh);
        _div2.append(_lable);
        _div1.append(_div2);
        _divBody1.append(_div1);
        _rowBody.append(_divBody1);

        _body.append(_rowBody);


        //end body


        _footer = $('<div style="padding: 0px; margin: 10px;">');
        _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _divFooter2 = $('<div class="col-md-6">');
        _buttonSave = $(' <button type="button" class="btn btn-primary btn-block" style="background-color: #eb8121 !important;">ذخیره</button>');
        _divFooter2.append(_buttonSave);
        _divFooter1.append(_divFooter2);

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        body.append(_modal);

        //end modal

        //script
        _inputTop.val(options.valueControl.top);

        _buttonSave.click(function (e) {
            var top = $("#" + options.id + "_top").val();
            obj.options.valueControl.top = top;

            var fromDate = $("#" + options.id + "_date").val().toEnglishDigit();
            obj.options.valueControl.fromDate = fromDate;

            obj._GetData(fromDate, top);
            $("#" + options.id + "_modal").modal('hide');
            obj._Button("SaveModal", obj.options);
        });

        $("#" + options.id + "_modal").on('show.bs.modal', function () {
            $("#" + options.id + "_date").val(options.valueControl.fromDate);
            $("#" + options.id + "_top").val(options.valueControl.top);
        })

        _aTarikh.MdPersianDateTimePicker({
            targetTextSelector: "#" + options.id + "_date",
            dateFormat: 'yyyy-MM-dd',
            Placement: 'bottom', // default is 'bottom'
            Trigger: 'focus', // default is 'focus',
            EnableTimePicker: true, // default is true,
            TargetSelector: '', // default is empty,
            GroupId: '', // default is empty,
            ToDate: false, // default is false,
            FromDate: false, // default is false,
            isGregorian: lang == 'en' ? true : false,
            englishNumber: lang == 'en' ? true : false,
        });
        //end script
    },

    _GetData: function (fromDate, top) {
        var obj = this;
        var options = obj.options;
        var ctrl = options.valueControl;
        var uri = server + '/api/ReportFct/TrzFCust/'; // آدرس گزارش 

        var tObject = {
            CGruCode: "",
            CustCode: "",
            InvCode: "",
            KGruCode: "",
            KalaCode: "",
            MkzCode: "",
            ModeCode1: ctrl.modeItem == "S" ? sessionStorage.MODECODE_FDOC_S : sessionStorage.MODECODE_FDOC_P,
            ModeCode2: ctrl.modeItem == "S" ? sessionStorage.MODECODE_FDOC_SR : sessionStorage.MODECODE_FDOC_PR,
            OprCode: "",
            StatusCode: "موقت*تایید*تصویب",
            Top: top,
            ZeroValue: "0",
            azShomarh: "",
            azTarikh: fromDate,
            taShomarh: "",
            taTarikh: LowDay(0),
        };
        ajaxFunction(uri + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group, 'POST', tObject, true).done(function (response) {
            sum = 0;
            $("#" + options.id + "_LCount").text(response.length);
            for (var i = 0; i < response.length; i++) {
                sum += response[i].AccMon
            }
            $("#" + options.id + "_LSum").text(NumberToNumberString(sum) + ' ریال');
            obj._CreateTable(response);
            options.data = response;
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.valueControl = options.valueControl;
        });

    },




    _CreateTable: function (data) {
        var obj = this;
        var options = obj.options;
        var table = $("#" + options.id + "_Table");
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
    _Refresh: function () {
        var obj = this;
        var o = obj.options;
        obj._GetData(o.valueControl.fromDate, o.valueControl.top);
    },


});

$.widget("ui.D_TarazFasli", {
    options: {
        id: null,
        caption: null,
        position: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        valueControl: {
            mode: 0,
        },
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        visible: true,
        data: null,
        o: null,
        chart: null
    },

    _create: function () {
        var obj = this;
        obj._createModal();
        var o = obj.options;

        var divSum = $('<div class="form-inline" style="padding-top: 10px;width: 100%;">');
        div = $('<div class="form-inline" style="margin-left:auto">');
        h5 = $('<h5>مجموع : </h5> <h5 id="' + o.id + '_LSum" style="padding-right:5px">0</h5>');
        div.append(h5);
        divSum.append(div);

        div = $('<div class="form-inline" style="margin-right:auto">');
        h5 = $('<h5 id="' + o.id + '_LTitle" style="padding-right:5px;color:#dcdcdc">0</h5>');
        div.append(h5);
        divSum.append(div);


        var chart = $('<canvas id="' + o.id + '_Chart" style="width:100%;max-width:700px"></canvas>');
        BoxDashbord_Create(obj, divSum, chart);
        obj._GetData(o.valueControl.mode, o.valueControl.fromDate);
    },

    _createModal: function () {
        var obj = this;
        var options = obj.options;
        body = $('main');
        $("#" + options.id + "_modal").remove();
        //modal
        _modal = $('<div class="modal fade" id="' + options.id + '_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"">');
        dialog = $('<div class="modal-dialog"></div>');
        _modal.append(dialog);
        content = $('<div class="modal-content"></div>');
        dialog.append(content);

        //head
        _header = $('<div class="modal-header">');
        _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><span aria-hidden="true">×</span></button >');
        _header.append(_buttonExit);
        title = $('<p class="modal-title" style="width: 90%;text-align: center;">' + options.caption + '</p>');
        _header.append(title);
        _header.append($('<div>'));
        // end head

        //body
        _body = $('<div class="modal-body">');
        _rowBody = $('<div class="row" style="padding-top:20px">');

        _selectMode = $('<select id="' + options.id + '_mode" class="col-6"  style="margin-bottom:2rem">');
        _selectMode.append('<option value="0">فصلی</option>');
        _selectMode.append('<option value="1">ماهانه</option>');
        _selectMode.append('<option value="2">روزانه</option>');

        _rowBody.append(_selectMode);

        _body.append(_rowBody);


        //end body


        _footer = $('<div style="padding: 0px; margin: 10px;">');
        _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _divFooter2 = $('<div class="col-md-6">');
        _buttonSave = $(' <button type="button" class="btn btn-primary btn-block" style="background-color: #eb8121 !important;">ذخیره</button>');
        _divFooter2.append(_buttonSave);
        _divFooter1.append(_divFooter2);

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        body.append(_modal);

        //end modal

        //script
        _selectMode.val(options.valueControl.mode);

        _buttonSave.click(function (e) {
            var mode = $("#" + options.id + "_mode").val();
            obj.options.valueControl.mode = mode;
            obj._GetData(mode, options.valueControl.fromDate);

            $("#" + options.id + "_modal").modal('hide');
            obj._Button("SaveModal", obj.options);
        });

        $("#" + options.id + "_modal").on('show.bs.modal', function () {
            $("#" + options.id + "_mode").val(options.valueControl.mode);
        })


    },

    _GetData: function (mode, fromDate) {
        var obj = this;
        var options = obj.options;
        var ctrl = options.valueControl;
        var uri = server + '/api/ReportFct/TrzFDoreh/'; // آدرس گزارش 

        var tObject = {
            azTarikh: fromDate,
            taTarikh: LowDay(0),
            mode: mode,
        };
        ajaxFunction(uri + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group, 'POST', tObject, false).done(function (response) {
            trzFDoreh_labels = []
            trzFDoreh_data = []
            sum = 0;
            for (var i = 0; i < response.length; i++) {
                trzFDoreh_labels[i] = response[i].docdate;
                trzFDoreh_data[i] = response[i].totalvalue;
                sum += response[i].totalvalue
            }
            $("#" + options.id + "_LSum").text(NumberToNumberString(sum) + ' ریال');
            $("#" + options.id + "_LTitle").text(date_TarazFasli + ' - ' + LowDay(0));


            $("#" + options.id + "_Chart").empty();
            $(options.Chart).remove();
            //if (options.Chart == null) {
            options.Chart = new Chart(options.id + "_Chart", {
                type: 'bar',
                data: {
                    labels: trzFDoreh_labels,
                    datasets: [{
                        label: '',
                        data: trzFDoreh_data,
                        backgroundColor: "#ff2d2d",
                        borderWidth: 1
                    }]
                },
                options: {
                    animation: false,
                    responsive: true,
                    responsiveAnimationDuration: 0,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    value = (value / 1000000).toFixed(0);
                                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return tooltipItem.yLabel.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'ریال';
                            }
                        }
                    }
                }
            });
            //}
            //else {
            /*var dataChart = {
                labels: trzFDoreh_labels,
                datasets: [{
                    label: '',
                    data: trzFDoreh_data,
                    backgroundColor: "#ff2d2d",
                    borderWidth: 1
                }]
            },
                options = {
                    animation: false,
                    responsive: true,
                    responsiveAnimationDuration: 0,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    value = (value / 1000000).toFixed(0);
                                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return tooltipItem.yLabel.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'ریال';
                            }
                        }
                    }
                };

            options.Chart.data = dataChart;
            options.Chart.update();*/
            //}


            options.data = response;
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.valueControl = options.valueControl;
        });
    },

    _Refresh: function () {
        var obj = this;
        var o = obj.options;
        obj._GetData(o.valueControl.mode, o.valueControl.fromDate);
    },

});

$.widget("ui.D_TrzAcc", {
    options: {
        id: null,
        caption: null,
        position: [],
        valueControl: {
            mode: 0,
        },
        baseValue: [],
        visible: true,
        data: null,
        element: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        objects = obj._SetObjects();
        var divReport = $('<div style="padding: 10px;">');
        divReport.Report_TrzAcc({
            baseValue: o.baseValue,
            showControl: true,
            objects: objects
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },

    _SetObjects: function (e) {

        var obj = this;
        var o = obj.options;
        return object = {
            fromDate: {
                element: null,
                value: "1384/01/01",
                type: type_Date,
                caption: "از تاریخ",
            },
            toDate: {
                element: null,
                value: "",
                type: type_Date,
                caption: "تا تاریخ",
            },
            acc: {
                id: d_acc,
                type: "Select_Entesab",
                caption: 'حساب',
                keyField: 'Code',
                keyCaption: 'Name',
                keyRow: [{ column: 'Level', value: 1, act: '==' }],
                baseValue: o.baseValue,
                param: { mode: 0 },
                value: ""
            },
            aMode: {
                id: d_aMode,
                type: "Select_Entesab",
                caption: "نوع سند",
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: ""
            },
            mkz: {
                id: d_mkz,
                type: "Select_Entesab",
                caption: "مرکز هزینه",
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: ""
            },
            opr: {
                id: d_opr,
                type: "Select_Entesab",
                caption: "پروژه",
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: ""
            },
            sath: {
                element: null,
                value: 1,
                type: "select",
                caption: "نوع تراز",
                items: [{ key: 1, value: "تراز در سطح" }, { key: 2, value: "تراز تا سطح" }],
            },
            level: {
                element: null,
                value: 1,
                type: "select",
                caption: "سطح تراز",
                items: [{ key: 1, value: "کل" }, { key: 2, value: "معین" }, { key: 3, value: "تفصیلی 1" }, { key: 4, value: "تفصیلی 2" }, { key: 5, value: "تفصیلی 3" }],
            },
        }
    },

    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzAcc("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzAcc("ShowModalControl");
    },
});

$.widget("ui.D_Dftr", {
    options: {
        id: null,
        caption: null,
        position: [],
        valueControl: {
            mode: 0,
        },
        baseValue: [],
        visible: true,
        data: null,
        element: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        objects = obj._SetObjects();
        var divReport = $('<div style="padding: 10px;">');

        divReport.Report_Dftr({
            baseValue: o.baseValue,
            showControl: false,
            objects: objects
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },

    _SetObjects: function (e) {
        var obj = this;
        var o = obj.options;
        return object = {
            fromDate: {
                element: null,
                value: "1384/01/01",
                type: type_Date,
                caption: "از تاریخ",
            },
            toDate: {
                element: null,
                value: "",
                type: type_Date,
                caption: "تا تاریخ",
            },
            fromNumber: {
                element: null,
                value: "",
                maxlength: 10,
                dataType: type_BigInt,
                caption: "از شماره",
            },
            toNumber: {
                element: null,
                value: "",
                maxlength: 10,
                dataType: type_BigInt,
                caption: "تا شماره",
            },
            dispBands: {
                element: null,
                value: -1,
                type: "select",
                caption: "نمایش بند ها",
                items: [{ key: '-1', value: "ریز حساب ها" }, { key: 1, value: "حساب های کل" }, { key: 2, value: "حساب های معین" }],
            },
            naghl: {
                element: null,
                value: 0,
                type: "select",
                caption: "نقل از قبل",
                items: [{ key: 0, value: "محاسبه نشود" }, { key: 1, value: "محاسبه شود" }],
            },

            acc: {
                id: d_acc,
                type: "Selected",
                caption: 'حساب',
                keyField: 'Code',
                keyCaption: 'Name',
                keyRow: [{ column: 'Level', value: 1, act: '==' }],
                baseValue: o.baseValue,
                param: { mode: 0 },
                value: ""
            },
            aMode: {
                id: d_aMode,
                type: "Select_Entesab",
                caption: "نوع سند",
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: ""
            },
            status: {
                id: d_status,
                type: "Select_Entesab",
                caption: 'وضعیت',
                keyField: 'Status',
                keyCaption: '',
                baseValue: o.baseValue,
                value: "",
                param: { progName: getProgName('A') },
                selected: [],
            },
            mkz: {
                id: d_mkz,
                type: "Select_Entesab",
                caption: "مرکز هزینه",
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: ""
            },
            opr: {
                id: d_opr,
                type: "Select_Entesab",
                caption: "پروژه",
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: ""
            },
        }
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Dftr("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Dftr("ShowModalControl");
    },
});

