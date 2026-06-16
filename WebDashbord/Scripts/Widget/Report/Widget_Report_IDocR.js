$.widget("ui.Report_IDocR", {
    options: {
        rprtId: 'IDocR',
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

        var divGrid = $('<div>');
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
            { code: "IODoc", name: "نمایش سند", icon: "/Content/img/view.svg" },
        ];

        divGrid.Table(
            {
                id: o.rprtId,
                data: [],
                headBtn: [],
                headBtnDefult: [f_GetData, f_Print, f_Columns],
                showHeadBtnDefult: false,
                columns: o.columns,
                sort: 'KalaCode',
                sortMode: '',
                pageCount: 0,
                pageSize: 10,
                keyField: 'KalaCode',
                isTableFix: true,
                keyRow: [],
                radif: true,
                sumFields: ['Amount1', 'Amount2', 'Amount3', 'Price', 'Discount', 'AddMinPrice1', 'AddMinPrice1', 'AddMinPrice2', 'AddMinPrice3', 'AddMinPrice4', 'AddMinPrice5', 'AddMinPrice6', 'AddMinPrice7', 'AddMinPrice8', 'AddMinPrice9', 'AddMinPrice10', 'OnlyDiscountPrice', 'FinalPrice'],
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
                    '<td style="width:0px"><h5 data-name="DocDate">{0}</h5></td>',
                    '<td style="padding: 10px;" ><h5 data-name="ModeName" style="word-break: break-word;white-space: normal;">{0}</h5></td>',
                    '<td style="width:0px"><h5 data-name="MTotalPrice" data-type="' + type_Currency + '" style="direction: ltr;text-align:end;">{0}</h5></td>',
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
                    o.columns = records.columns;
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

        var divCol = $('<div class="form-inline col-lg-9 col-md-9 col-sm-12 col-xs-12" >');
        c.inv = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.kGru = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.kala = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');

        divCol.append(c.inv);
        divCol.append(c.kGru);
        divCol.append(c.kala);
        divRow.append(divCol);


        var divCol = $('<div class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12">');
        c.status = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.iMode = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.tGru = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.thvl = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');

        divCol.append(c.status);
        divCol.append(c.iMode);
        divCol.append(c.tGru);
        divCol.append(c.thvl);
        divRow.append(divCol);


        var divCol = $('<div class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12"">');
        c.mkz = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.opr = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');

        var divBtn = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
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
            inv: {
                id: d_inv,
                type: "Select_Entesab",
                caption: 'انبارها',
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: "",
                selected: [],
            },
            kGru: {
                id: d_kGru,
                type: "Select_Entesab",
                caption: 'گروه کالا',
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: "",
                param: { Mode: 0 },
                selected: [],
            },
            kala: {
                id: d_kala,
                type: "Select_Entesab",
                caption: 'کالا',
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: "",
                param: {
                    withimage: false,
                    updatedate: null,
                    mode: 0,
                    kalaCode: "",
                },
                selected: [],
            },
            status: {
                id: d_status,
                type: "Select_Entesab",
                caption: 'وضعیت',
                keyField: 'Status',
                keyCaption: '',
                baseValue: o.baseValue,
                value: "تصویب*تایید*موقت",
                param: { progName: getProgName('P') },
                selected: [{ code: 'تصویب', name: '' }, { code: 'تایید', name: '' }, { code: 'موقت', name: '' }]
            },
            iMode: {
                id: d_iMode,
                type: "Select_Entesab",
                caption: "نوع سند",
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: "",
                param: { inOut: 0, mode: 0 },
            },
            tGru: {
                id: d_tGru,
                type: "Select_Entesab",
                caption: 'گروه تحویل دهنده / گیرنده',
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: "",
                param: { mode: 0 },
                selected: [],
            },
            thvl: {
                id: d_thvl,
                type: "Select_Entesab",
                caption: 'تحویل دهنده/گیرنده',
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: "",
                param: { mode: 0 },
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

        if (o.objects != null) {
            object.fromDate = o.objects.fromDate;
            object.toDate = o.objects.toDate;
            object.iMode = o.objects.iMode;
            object.mkz = o.objects.mkz;
            object.opr = o.objects.opr;
            object.kGru = o.objects.kGru;
            object.tGru = o.objects.tGru;
            object.thvl = o.objects.thvl;
            object.status = o.objects.status;

            var userData = o.objects.userData;
            object.kala.value = o.objects.userData.KalaCode;
            object.kala.selected = [{ code: o.objects.userData.KalaCode, name: o.objects.userData.KalaName }];

            object.inv.value = o.objects.userData.InvCode;
            object.inv.selected = [{ code: o.objects.userData.InvCode, name: o.objects.userData.InvName }];

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

        CreateObjectSelectEntesab(c, objects, 'inv', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'kGru', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'kala', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'status', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'iMode', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'tGru', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'thvl', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'mkz', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'opr', null, o.externalModal);
    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;
        var object = {
            azTarikh: data.fromDate.value.toEnglishDigit(),
            taTarikh: data.toDate.value.toEnglishDigit(),
            DocNo: 0,
            ModeCode: data.iMode.value,
            InvCode: data.inv.value,
            KGruCode: data.kGru.value,
            KalaCode: data.kala.value,
            TGruCode: data.tGru.value,
            ThvlCode: data.thvl.value,
            MkzCode: data.mkz.value,
            OprCode: data.opr.value,
            StatusCode: data.status.value,
        };

        var uri = server + '/api/ReportInv/IDocR/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
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
