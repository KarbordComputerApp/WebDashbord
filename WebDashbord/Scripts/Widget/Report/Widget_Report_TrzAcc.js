$.widget("ui.Report_TrzAcc", {
    options: {
        rprtId: 'TrzAcc',
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
            { code: "ADocR", name: "دفتر روزنامه", icon: "/Content/img/view.svg" },
            { code: "Dftr", name: "دفتر حساب", icon: "/Content/img/view.svg" },
            { code: "TrzAcc", name: "تراز زیر حساب ها", icon: "/Content/img/view.svg", visible: { key: "HasChild", value: 1, act: '==' } }
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
                keyRow: [{ column: 'Level', value: 1, act: '==' }, { column: 'MainLevel', value: 1, act: '>' }],
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
                    //'<td style="width:0px"><p data-name="Bede" data-type="' + type_Currency +'" style="direction: ltr">{0}</p></td>',
                    //'<td style="width:0px"><p data-name="Best" data-type="' + type_Currency +'" style="direction: ltr">{0}</p></td>',
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
                    var actionName = records.actionName;
                    var actionCaption = records.actionCaption;
                    if (actionName != null) {
                        o.objects.userData = { AccCode: records.data.AccCode, AccName: records.data.AccName };
                        var position = FindFreePosition(o.uuid);
                        var item = {
                            id: actionName,
                            uuid: 0,
                            position: position,
                            caption: actionCaption,
                            visible: true,
                            baseValue: o.baseValue,
                            objects: o.objects,
                            showControl: false,
                            getAutoData: true,
                        };

                        AddIteminGrid(item);
                        AppendBoxPush(o.uuid);
                        //SetPositionItems(o.uuid);
                    }
                },
                ExportData: function (e, records) {
                    o.columns = records.columns;
                    o.data = records.data;
                },
            },
        );

        //obj._CreateObjectPrint();
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
        //divControl.append(divRow);


        var divCol = $('<div class="form-inline col-lg-9 col-md-9 col-sm-12 col-xs-12">');
        c.acc = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.aMode = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        //c.status = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.mkz = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');

        divCol.append(c.acc);
        divCol.append(c.aMode);
        divCol.append(c.mkz);
        // divCol.append(c.status);

        divRow.append(divCol);
        //divRow.append('<div class="w-100">');

        c.opr = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.sath = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.level = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');

        var divBtn = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        var divBtn1 = $('<div class="pull-left">');
        c.btnReport = $('<button type="button" class="btn btn-primary">گزارش گیری</button>');

        divBtn1.append(c.btnReport);
        divBtn.append(divBtn1);

        //divRow.append(c.mkz);
        divRow.append(c.opr);
        divRow.append(c.sath);
        divRow.append(c.level);

        divRow.append(divBtn);

        divControl.append(divRow);
        //divControl.append('<hr>');

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
                selected: [],
                value: ""
            },
            /* status: {
                 id: d_status,
                 type: "Select_Entesab",
                 caption: 'وضعیت',
                 keyField: 'Status',
                 keyCaption: '',
                 baseValue: o.baseValue,
                 param: { progName: getProgName('A') },
                 selected: [],
                 value: "تصویب*تایید*موقت",
             },*/
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
        if (o.objects != null) {
            var control = o.objects;
            if (control.userData != null) {
                object.acc.value = control.userData.AccCode;
                object.acc.selected = [{ code: control.userData.AccCode, name: control.userData.AccName }];
            }
            object.fromDate = control.fromDate;
            object.toDate = control.toDate;
            object.aMode = control.aMode;
            object.mkz = control.mkz;
            object.opr = control.opr;


            if (control.level != null)
                object.level.value = parseInt(control.level.value) + 1;
        }


        if (o.controlData != null) {
            // object.level.value = o.controlData.Level;
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
        CreateObjectSelectEntesab(c, objects, 'acc', [{ key: "Level", value: objects.sath.value, act: '<=' }], o.externalModal, false);
        CreateObjectSelectEntesab(c, objects, 'aMode', null, o.externalModal);
        //CreateObjectSelectEntesab(c, objects, 'status', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'mkz', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'opr', null, o.externalModal);
        c.level.ComboBox(
            {
                caption: objects.level.caption,
                items: objects.level.items,
                value: objects.level.value,
                Create: function (e, record) {
                    objects.level.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.level.value = record.value;
                    c.acc.Select_Entesab("option", "filter", [{ key: "Level", value: objects.level.value, act: '<=' }]);
                },
            },
        );

        c.sath.ComboBox(
            {
                caption: objects.sath.caption,
                items: objects.sath.items,
                value: objects.sath.value,
                Create: function (e, record) {
                    objects.sath.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.sath.value = record.value;
                },
            },
        );

    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;

        var object = {
            azTarikh: data.fromDate.value.toEnglishDigit(),
            taTarikh: data.toDate.value.toEnglishDigit(),
            AModeCode: data.aMode.value,
            AccCode: data.acc.value,
            MkzCode: data.mkz.value,
            OprCode: data.opr.value,
            Level: data.level.value,
            Sath: data.sath.value,
            //StatusCode: data.status.value,
        };

        var uri = server + '/api/ReportAcc/TrzAcc/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
        ajaxFunction(uri, 'POST', object, true).done(function (response) {
            o.data = response;
            o.controlData = object;
            //object["data"] = [data];
            o.objGrid.Table("option", "data", response);
            o.objGrid.Table("option", "controlData", data);
            o.objGrid.Table("RefreshTable");

            var itemSetting = dashbordData.filter(c => c.uuid == uuid);
            if (itemSetting.length > 0) {
                itemSetting[0]["controlData"] = object;
                //itemSetting[0]["controlDataAll"] = data;
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
