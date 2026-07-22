$.widget("ui.Report_TrzFKala", {
    options: {
        rprtId: 'TrzFKala',
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
        var mode_Forosh = o.isForosh == true ? "S" : "P";
        o.rprtId = o.rprtId + '_' + mode_Forosh;
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
        var caption_Forosh = o.isForosh == true ? "فروش" : "خرید";


        var action = [
            { code: "FDocR_" + mode_Forosh, name: "ریز گردش اسناد " + caption_Forosh, icon: "/Content/img/view.svg" },
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
                    '<td style="width:0px"><h5 data-name="KalaCode">{0}</h5></td>',
                    '<td style="padding: 10px;" ><h5 data-name="KalaName" style="word-break: break-word;white-space: normal;">{0}</h5></td>',
                    '<td style="width:0px"><h5 data-name="FinalPrice" data-type="' + type_Currency + '" style="direction: ltr;text-align:end;">{0}</h5></td>',
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
                        o.objects.userData = { rprtId: o.rprtId, KalaCode: records.data.KalaCode, KalaName: records.data.KalaName };
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
                    }
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





    _SetObjects: function (param) {
        var obj = this;
        var o = obj.options;

        var itemsModeCode = null;
        var selectedModeCode = null;
        if (o.isForosh) {
            selectedModeCode = ace == prog_Web8 ? "SFCT*SRFCT" : "52*53";
            itemsModeCode = CreateListModeForosh(true);
            itemsModeCode.push({ key: selectedModeCode, value: "فاکتور فروش با احتساب برگشتی" });
            modeGru = 2;
        }
        else {
            selectedModeCode = ace == prog_Web8 ? "PFCT*PRFCT" : "55*56";
            itemsModeCode = CreateListModeForosh(false);
            itemsModeCode.push({ key: selectedModeCode, value: "فاکتور خرید با احتساب برگشتی" });
            modeGru = 1;
        }


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
                value: "تصویب*تایید*موقت",
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
                caption: 'خریدار/فروشنده',
                keyField: 'Code',
                keyCaption: 'Name',
                baseValue: o.baseValue,
                value: "",
                param: {
                    forSale: null,
                    updatedate: null,
                    mode: 0,
                    custCode: ''
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
        CreateObjectSelectEntesab(c, objects, 'kGru', null, o.externalModal, false);
        CreateObjectSelectEntesab(c, objects, 'kala', null, o.externalModal);

        CreateObjectSelectEntesab(c, objects, 'cGru', null, o.externalModal, false);
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
            CGruCode: data.cGru.value,
            CustCode: data.cust.value,
            InvCode: data.inv.value,
            KGruCode: data.kGru.value,
            KalaCode: data.kala.value,
            MkzCode: data.mkz.value,
            OprCode: data.opr.value,
            StatusCode: data.status.value,
            ZeroValue: "0"
        };



        var uri = server + '/api/ReportFct/TrzFKala/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
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
