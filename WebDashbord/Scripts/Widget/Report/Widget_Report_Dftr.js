$.widget("ui.Report_Dftr", {
    options: {
        rprtId: 'Dftr',
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
        var divGrid = $('<div> ');
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

        var action = [
            { code: "ADoc", name: "نمایش سند", icon: "/Content/img/view.svg" },
        ];

        divGrid.Table(
            {
                id: o.rprtId,
                data: [],
                headBtn: [],
                headBtnDefult: [f_GetData, f_Print, f_Columns],
                showHeadBtnDefult: false,
                columns: o.columns,
                sort: 'AccCode',
                sortMode: '',
                pageCount: 0,
                pageSize: 10,
                keyField: 'AccCode',
                isTableFix: true,
                keyRow: null,
                radif: true,
                sumFields: ['Bede', 'Best', 'MonBede', 'MonBest', 'MonTotal'],
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
                    '<td style="width:0px"><h5 data-name="AccCode">{0}</h5></td>',
                    '<td style="padding: 10px;" ><h5 data-name="AccName" style="word-break: break-word;white-space: normal;">{0}</h5></td>',
                    '<td style="width:0px"><h5 data-name="MonTotal" data-type="' + type_Currency + '" style="direction: ltr;text-align:end;">{0}</h5></td>',
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
            });
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
        c.dispBands = $('<div class="col-md-6">');
        c.naghl = $('<div class="col-md-6">');
        divCol.append(c.dispBands);
        divCol.append(c.naghl);
        divRow.append(divCol);


        var divCol = $('<div class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12">');
        c.acc = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.aMode = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.status = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');

        divCol.append(c.acc);
        divCol.append(c.aMode);
        divCol.append(c.status);
        divRow.append(divCol);

        var divCol = $('<div class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12"">');
        c.mkz = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.opr = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');

        var divBtn = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        var divBtn1 = $('<div class="pull-left">');
        c.btnReport = $('<button type="button" class="btn btn-primary">گزارش گیری</button>');
        divBtn1.append(c.btnReport);
        divBtn.append(divBtn1);

        divCol.append(c.mkz);
        divCol.append(c.opr);
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
                selected: [],
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
                selected: [],
                value: ""
            },
            status: {
                id: d_status,
                type: "Select_Entesab",
                caption: 'وضعیت',
                keyField: 'Status',
                keyCaption: '',
                baseValue: o.baseValue,
                param: { progName: getProgName('A') },
                selected: [],
                value: "تصویب*تایید*موقت",
            },
            mkz: {
                id: d_mkz,
                type: "Select_Entesab",
                caption: "مرکز هزینه",
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                selected: [],
                value: ""
            },
            opr: {
                id: d_opr,
                type: "Select_Entesab",
                caption: "پروژه",
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                selected: [],
                value: ""
            },
        }

        if (o.objects != null) {
            var userData = o.objects.userData;
            object.fromDate = o.objects.fromDate;
            object.toDate = o.objects.toDate;
            object.aMode = o.objects.aMode;
            //object.acc = o.objects.acc;
            object.mkz = o.objects.mkz;
            object.opr = o.objects.opr;

            if (userData.AccCode != null) {
                object.acc.value = userData.AccCode;
                object.acc.selected = [{ code: userData.AccCode, name: userData.AccName }];
            }
            if (userData.MkzCode != null) {
                object.mkz.value = userData.MkzCode;
                object.mkz.selected = [{ code: userData.MkzCode, name: userData.MkzName }];
            }
            if (userData.OprCode != null) {
                object.opr.value = userData.OprCode;
                object.opr.selected = [{ code: userData.OprCode, name: userData.OprCode }];
            }
        }

        if (o.controlData != null) {
            object.acc.value = o.controlData.acc;
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
        c.dispBands.ComboBox(
            {
                caption: objects.dispBands.caption,
                items: objects.dispBands.items,
                value: objects.dispBands.value,
                sizeSelect: 7,
                Create: function (e, record) {
                    objects.dispBands.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.dispBands.value = record.value;
                    c.acc.Select("option", "filter", [{ key: "Level", value: objects.dispBands.value, act: '==' }]);
                },
            },
        );

        c.naghl.ComboBox(
            {
                caption: objects.naghl.caption,
                items: objects.naghl.items,
                value: objects.naghl.value,
                Create: function (e, record) {
                    objects.naghl.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.naghl.value = record.value;
                },
            },
        );

        CreateObjectSelect(c, objects, 'acc', [{ key: "Level", value: objects.dispBands.value, act: '==' }], o.externalModal, false);
        CreateObjectSelectEntesab(c, objects, 'aMode', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'status', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'mkz', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'opr', null, o.externalModal);

    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;

        if (data.acc.value == "" || data.acc.value == null) {
            return showNotification(translate('حساب را انتخاب کنید'), 0);
        }

        var object = {
            azTarikh: data.fromDate.value.toEnglishDigit(),
            taTarikh: data.toDate.value.toEnglishDigit(),
            azShomarh: data.fromNumber.value,
            taShomarh: data.toNumber.value,
            AccCode: data.acc.value,
            AModeCode: data.aMode.value,
            StatusCode: data.status.value,
            MkzCode: data.mkz.value,
            OprCode: data.opr.value,
            DispBands: data.dispBands.value < 0 ? 0 : data.dispBands.value,
            JamRooz: 0,
            Naghl: data.naghl.value,
        };
        var uri = server + '/api/ReportAcc/Dftr/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
        ajaxFunction(uri, 'POST', object, true).done(function (response) {
            o.controlData = object;
            o.data = response;
            //o.objGrid.Table("option", "controlData", object);
            o.objGrid.Table("option", "data", response);
            o.objGrid.Table("RefreshTable");

            var uuid = o.uuid;
            var itemSetting = dashbordData.filter(c => c.uuid == uuid);
            if (itemSetting.length > 0) {
                itemSetting[0]["controlData"] = object;
            }
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
