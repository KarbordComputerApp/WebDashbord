$.widget("ui.Report_TrzFCust", {
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
        o.objects = obj._SetObjects();
        var divContent = $('<div style="background-color: white;">');
        //head
        var divHeader = $('<div class="row" style="padding:10px">');
        var h2 = $('<h5>' + o.caption + '</h2>');
        divHeader.append(h2);

        //Grid

        var divGrid = $('<div>');
        var table = $('<table class="' + o.rprtId + '_Table table table-hover">');
        divGrid.append(table);

        o.objGrid = divGrid;

        if (o.caption != null) {
            divContent.append(divHeader);
        }

        var controlBody = null;
        divContent.append(obj._CreateControl());
        divContent.append(divGrid);
        obj.element.append(divContent);

        o.columns = getRprtCols(o.rprtId, sessionStorage.userName);

        var action = [
            { code: "ADocR", name: "دفتر روزنامه", icon: "/Content/img/view.svg" },
        ];

        divGrid.Table(
            {
                id: o.rprtId,
                data: [],
                headBtn: [],
                headBtnDefult: [f_GetData, f_Print, f_Columns],
                showHeadBtnDefult: false,
                columns: o.columns,
                sort: 'CustCode',
                sortMode: '',
                pageCount: 0,
                pageSize: 10,
                keyField: 'CustCode',
                isTableFix: true,
                keyRow: [],
                radif: true,
                sumFields: ['AccBede', 'AccBest', 'AccMon', 'FinalPrice', 'OnlyDiscountPrice', 'TotalPrice'],
                height: '375px',
                striped: false,
                action: action,
                actionDropdown: true,
                baseValue: o.baseValue,
                controlBody: controlBody,
                showInBoxControl: true,
                viewData: o.viewData,
                viewDataLowTemplate: [
                    '<td style="width:0px"><h5 data-name="CustCode">{0}</h5></td>',
                    '<td style="padding: 10px;" ><h5 data-name="CustName" style="word-break: break-word;white-space: normal;">{0}</h5></td>',
                    '<td style="width:0px"><h5 data-name="AccMon" data-type="' + type_Currency + '" style="direction: ltr;text-align:end;">{0}</h5></td>',
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
        var divControl = $('<div style="display: ' + (o.showControl ? "block" : "none") + ';">');
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
        c.modeCode = $('<div class="col-md-6">');
        divCol.append(c.modeCode);
        divRow.append(divCol);


        var divCol = $('<div class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12">');
        c.status = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.inv = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.kGru = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.kala = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');


        divCol.append(c.status);
        divCol.append(c.inv);
        divCol.append(c.kGru);
        divCol.append(c.kala);
        divRow.append(divCol);

        var divCol = $('<div class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12">');
        c.cGru = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.cust = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.mkz = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.opr = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');

        divCol.append(c.cGru);
        divCol.append(c.cust);
        divCol.append(c.mkz);
        divCol.append(c.opr);
        divRow.append(divCol);


        var divCol = $('<div class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12"">');
        var divBtn = $('<div class="col-lg-12 col-md-3 col-sm-12 col-xs-12">');
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

        var itemsModeCode = null;
        var selectedModeCode = null;
        if (o.isForosh) {
            itemsModeCode = [
                { key: "SFCT", value: "فاکتور فروش" },
                { key: "SPFCT", value: "پیش فاکتور فروش" },
                { key: "SRFCT", value: "برگشت از فروش" },
                { key: "SORD", value: "سفارش فروش" },
                { key: "SHVL", value: "حواله فروش" },
                { key: "SEXT", value: "برگه خروج" },
                { key: "SFCT*SRFCT", value: "فاکتور فروش با احتساب برگشتی" }
            ];
            selectedModeCode = "SFCT*SRFCT";
            modeGru = 2;
        }
        else {
            itemsModeCode = [
                { key: "PFCT", value: "فاکتور خرید" },
                { key: "PPFCT", value: "پیش فاکتور خرید" },
                { key: "PORD", value: "سفارش خرید" },
                { key: "PRFCT", value: "برگشت از خرید" },
                { key: "PFCT*PRFCT", value: "فاکتور خرید با احتساب برگشتی" }
            ];
            selectedModeCode = "PFCT*PRFCT";
            modeGru = 1;
        }


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
            modeCode: {
                element: null,
                value: selectedModeCode,
                type: "select",
                caption: "نوع فاکتور",
                items: itemsModeCode,
            },
            status: {
                id: d_status,
                type: "Select_Entesab",
                caption: 'وضعیت',
                keyField: 'Status',
                keyCaption: '',
                baseValue: o.baseValue,
                value: "",
                param: { progName: getProgName('S') },
                selected: [{ code: 'تصویب', name: '' }, { code: 'تایید', name: '' }, { code: 'موقت', name: '' }]
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
                keyRow: [{ column: 'Level', value: 1, act: '==' }],
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

            cGru: {
                id: d_cGru,
                type: "Select_Entesab",
                caption: 'گروه خریدار/فروشنده',
                keyField: 'Code',
                keyCaption: 'Name',
                keyRow: [{ column: 'Level', value: 1, act: '==' }],
                baseValue: o.baseValue,
                value: "",
                param: {
                    mode: 0,
                    modeGru: modeGru,
                },
                selected: [],
            },
            cust: {
                id: d_cust,
                type: "Select_Entesab",
                caption: 'خریدار فروشنده',
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: "",
                param: {
                    forSale: null,
                    updatedate: null,
                    mode: 0,
                    custCode:''
                },
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
        c.modeCode.ComboBox(
            {
                caption: objects.modeCode.caption,
                items: objects.modeCode.items,
                value: objects.modeCode.value,
                sizeSelect: 9,
                Create: function (e, record) {
                    objects.modeCode.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.modeCode.value = record.value;
                },
            },
        );
        CreateObjectSelectEntesab(c, objects, 'status', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'inv', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'kGru', null, o.externalModal,false);
        CreateObjectSelectEntesab(c, objects, 'kala', null, o.externalModal);

        CreateObjectSelectEntesab(c, objects, 'cGru', null, o.externalModal,false);
        CreateObjectSelectEntesab(c, objects, 'cust', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'mkz', null, o.externalModal);
        CreateObjectSelectEntesab(c, objects, 'opr', null, o.externalModal);

    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;

        var modeCode = data.modeCode.value.split("*");
        var modeCode1 = modeCode[0];
        var modeCode2 = modeCode[1];
        if (modeCode.length == 1)
            modeCode2 = '';

        var object = {
            azTarikh: data.fromDate.value.toEnglishDigit(),
            taTarikh: data.toDate.value.toEnglishDigit(),
            azShomarh: data.fromNumber.value,
            taShomarh: data.toNumber.value,
            ModeCode1: modeCode1,
            ModeCode2: modeCode2,
            CGruCode: "",
            CustCode: "",
            InvCode: data.inv.value,
            KGruCode: "",
            KalaCode: "",
            MkzCode: data.mkz.value,
            OprCode: data.opr.value,
            StatusCode: data.status.value,
            ZeroValue: "0",
        };
        var uri = server + '/api/ReportFct/TrzFCust/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
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
