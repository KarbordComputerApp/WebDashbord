$.widget("ui.Report_TChk", {
    options: {
        rprtId: 'TChk',
        uuid: null,
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
        isForosh: false,
        viewData: _viewDataFull,
        // exports
        columns: null,
        controlData: null,
        data: null
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        var param = dataGroup[o.baseValue.group][o.baseValue.sal]["params"];
        o.objects = obj._SetObjects(param);
        var divContent = $('<div style="background-color: white;">');
        //head
        var divHeader = $('<div class="row" style="padding:10px">');
        var h2 = $('<h5>' + o.caption + '</h2>');
        divHeader.append(h2);

        //Grid

        var divGrid = $('<div>');
        //var table = $('<table class="' + o.rprtId + '_Table table table-hover">');
       // divGrid.append(table);

        o.objGrid = divGrid;

        if (o.caption != null) {
            divContent.append(divHeader);
        }

        var controlBody = null;
        divContent.append(obj._CreateControl());
        divContent.append(divGrid);
        obj.element.append(divContent);

        getRprtAllCols(o.baseValue.ace, o.baseValue.group, o.baseValue.sal, userName);
        o.columns = getRprtCols(o.baseValue.group, o.baseValue.sal, o.rprtId, userName);

        var action = [];

        divGrid.Table(
            {
                id: o.rprtId,
                data: [],
                headBtn: [],
                headBtnDefult: [f_GetData, f_Print, f_Columns],
                showHeadBtnDefult: false,
                columns: o.columns,
                sort: 'CheckNo',
                sortMode: '',
                pageCount: 0,
                pageSize: 10,
                keyField: 'CheckNo',
                isTableFix: false,
                keyRow: [],
                radif: true,
                sumFields: ['Value'],
                height: '375px',
                striped: false,
                action: action,
                actionDropdown: true,
                baseValue: o.baseValue,
                controlBody: controlBody,
                showInBoxControl: true,
                viewData: o.viewData,
                deghat: param.Deghat == "" ? 0 : parseInt(param.Deghat),
                viewDataLowTemplate: [
                    '<td style="width:0px"><center><img data-name="Bank" data-type="img_bank" src="{0}" width="35"/><p data-name="Shobe" style="text-align:center">{1}</p></center></td>',
                    '<td><div><h5 data-name="TrafName" style="padding-right:5px">{0}</h5><h5 data-name="CheckNo" style="padding-right:5px;padding-top: 10px;">چک: {1}</h5></div></td>',
                    '<td style="width:0px" ><h5 data-name="Value" style="text-align:center" data-type="' + type_Currency + '">{0}</h5><div data-name="CheckDate" class="DashbordDateChek">{1}</div></td>'
                ],

                ActionHeadClick: function (e, records) {
                    var name = records.actionName;
                    var items = records.data;
                    if (name == "GetData") {
                        obj._GetData();
                    }
                },
                ActionClick: function (e, records) {
                },
                ExportData: function (e, records) {
                    //o.columns = records.columns;
                    o.data = records.data;
                },
            },
        );
        CreateObjectPrint(obj);
        CreateObjectSetting(obj);
        if (o.getAutoData) obj._GetData();
    },

    _CreateControl: function () {
        var obj = this;
        var o = obj.options;
        var c = {};
        var divControl = $('<div style="margin-top: 5px; display: ' + (o.showControl ? "block" : "none") + ';">');
        o.divControl = divControl;

        var divRow = $('<div class="form-inline" style="margin-bottom: 5px;">');

        var divCol = $('<div class="form-inline col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.fromDate = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        c.toDate = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        divCol.append(c.fromDate);
        divCol.append(c.toDate);
        divRow.append(divCol);

        var divCol = $('<div class="form-inline col-lg-3 col-md-3 col-sm-12 col-xs-12" >');
        c.fromNumber = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        c.toNumber = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        divCol.append(c.fromNumber);
        divCol.append(c.toNumber);
        divRow.append(divCol);


        var divCol = $('<div class="form-inline col-lg-6 col-md-6 col-sm-12 col-xs-12" >');
        c.pDMode = $('<div class="col-md-6">');
        divCol.append(c.pDMode);
        divRow.append(divCol);


        var divCol = $('<div class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12">');
        c.acc = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.checkStatus = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');

        divCol.append(c.acc);
        divCol.append(c.checkStatus);

        var divBtn = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
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

    _SetObjects: function (param) {
        var obj = this;
        var o = obj.options;

        object = {
            fromDate: {
                element: null,
                value: param.BeginDate,
                type: type_Date,
                caption: "از تاریخ",
            },
            toDate: {
                element: null,
                value: param.EndDate,
                type: type_Date,
                caption: "تا تاریخ",
            },
            fromNumber: {
                element: null,
                value: "",
                maxlength: 10,
                dataType: type_BigInt,
                caption: "از شماره چک",
            },
            toNumber: {
                element: null,
                value: "",
                maxlength: 10,
                dataType: type_BigInt,
                caption: "تا شماره چک",
            },
            pDMode: {
                element: null,
                value: "1",
                type: "select",
                caption: "نوع چک",
                items: [
                    { key: "1", value: "پرداختنی" },
                    { key: "2", value: "دریافتنی" }
                ],
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

            checkStatus: {
                id: d_checkStatus,
                type: "Select_Entesab",
                caption: 'وضعیت چک',
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: "",
                param: { pDMode: "0", report: "1" },
                selected: []
            },
        }
        return object;
    },

    _BuildControl: function (c) {
        var obj = this;
        var o = obj.options;
        var objects = o.objects;

        c.btnReport.click(function (e) {
            obj._GetData();
        });

        CreateObjectDate(c, objects, 'fromDate');
        CreateObjectDate(c, objects, 'toDate');
        CreateObjectInput(c, objects, 'fromNumber');
        CreateObjectInput(c, objects, 'toNumber');
        c.pDMode.ComboBox(
            {
                caption: objects.pDMode.caption,
                items: objects.pDMode.items,
                value: objects.pDMode.value,
                sizeSelect: 9,
                Create: function (e, record) {
                    objects.pDMode.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.pDMode.value = record.value;
                    c.checkStatus.Select_Entesab("option", "selected", []);
                    c.checkStatus.Select_Entesab("option", "filter", [{ key: "PDMode", value: objects.pDMode.value, act: '==' }]);
               },
            },
        );
        CreateObjectSelectEntesab(c, objects, 'acc', null, o.externalModal, false);
        CreateObjectSelectEntesab(c, objects, 'checkStatus', [{ key: "PDMode", value: objects.pDMode.value, act: '==' }], o.externalModal);
    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;

        var object = {
            azTarikh: data.fromDate.value.toEnglishDigit(),
            taTarikh: data.toDate.value.toEnglishDigit(),
            azShomarh: data.fromNumber.value,
            taShomarh: data.toNumber.value,
            AccCode: data.acc.value,
            CheckStatus: data.checkStatus.value,
            PDMode: data.pDMode.value, 
        };
        var uri = server + '/api/ReportAcc/TChk/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
        ajaxFunction(uri, 'POST', object, true).done(function (response) {
            o.controlData = object;
            o.data = response;
            o.objGrid.Table("option", "controlData", object);
            o.objGrid.Table("option", "data", response);
            o.objGrid.Table("RefreshTable");
        });
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
