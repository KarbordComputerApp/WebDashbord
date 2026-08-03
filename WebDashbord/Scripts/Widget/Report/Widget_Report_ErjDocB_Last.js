$.widget("ui.Report_ErjDocB_Last", {
    options: {
        rprtId: 'ErjDocB_Last',
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
        data: null,
        dataStatus: [],
        dataRepToUsers: [],
        dataRepFromUsers: [],
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
                sort: 'DocNo',
                sortMode: '',
                pageCount: 0,
                pageSize: 10,
                keyField: 'DocNo',
                isTableFix: false,
                keyRow: [],
                radif: true,
                sumFields: ['RjTime'],
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
                    '<div class="card" style="margin: 5px 5px; background-color: rgb(255, 255, 255);background-color:white">' +
                    '    <div class="card-body">' +
                    '        <div class="card-title">' +
                    '            <h5 style="padding-left:15px"><span data-name="CustName">{0}</span></h5>' +
                    '        </div>' +
                    '        <div class="card-text">' +
                    '            <div class="row">' +
                    '                <p style="padding-left:15px"> <span>شماره :</span> <span data-name="DocNo">{1}</span></p>' +
                    '                <p style="padding-left:15px"> <span>تاریخ ارجاع :</span> <span data-name="RjDate">{2}</span></p>' +
                    '                <p style="padding-left: 15px;"> <span>مهلت :</span> <span data-name="RjMhltDate"></span>{3}</p>' + //data-bind="visible: MhltDate != ''
                    '            </div>' +
                    '        </div>' +
                    '        <p><span>ارجاع دهنده :</span><span data-name="FromUserName">{4}</span></p>' +
                    '        <p><span>ملاحظات :</span><span data-name="Spec">{5}</span></p>' +
                    '        <p><span>نام خدمات :</span> <span data-name="KhdtName">{6}</span></p>' +
                   // '        <a class="btn btn-primary pull-left">نمایش</a>' +
                    '    </div>' +
                    '</div>'
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
                   // o.columns = records.columns;
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

        c.erjaMode = $('<div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">');
        c.docBMode = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        divRow.append(c.erjaMode);
        divRow.append(c.docBMode);

        var divCol = $('<div class="form-inline col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.fromDate_Doc = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        c.toDate_Doc = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        divCol.append(c.fromDate_Doc);
        divCol.append(c.toDate_Doc);
        divRow.append(divCol);
        c.status = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        divRow.append(c.status);



        var divCol = $('<div class="form-inline col-lg-6 col-md-6 col-sm-12 col-xs-12" >');
        c.erjCust = $('<div class="col-md-6">');
        c.khdt = $('<div class="col-md-6">');
        divCol.append(c.erjCust);
        divCol.append(c.khdt);
        divRow.append(divCol);

        var divCol = $('<div class="form-inline col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.fromDate_Rj = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        c.toDate_Rj = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        divCol.append(c.fromDate_Rj);
        divCol.append(c.toDate_Rj);
        divRow.append(divCol);

        var divCol = $('<div class="form-inline col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.fromDate_Mhlt = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        c.toDate_Mhlt = $('<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">');
        divCol.append(c.fromDate_Mhlt);
        divCol.append(c.toDate_Mhlt);
        divRow.append(divCol);



        var divCol = $('<div class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12">');
        c.toUser = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.fromUser = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.srchSt = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        divCol.append(c.toUser);
        divCol.append(c.fromUser);
        divCol.append(c.srchSt);

        var divBtn = $('<div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">');
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
        obj._GetDataStatus();
        obj._GetDataRepToUsers();
        obj._GetDataRepFromUsers();
        object = {
            erjaMode: {
                element: null,
                value: "1",
                type: "select",
                caption: "نوع",
                items: [
                    { key: "1", value: "دریافتی" },
                    { key: "2", value: "ارسالی" },
                ]
            },
            docBMode: {
                element: null,
                value: "1",
                type: "select",
                caption: "نوع نمایش",
                items: [
                    { key: "1", value: "کلیه ارجاعات و رونوشتها" },
                    { key: "2", value: "کلیه ارجاعات اصلی" },
                    { key: "3", value: "کلیه رونوشتها" },
                    { key: "4", value: "آخرین ارجاعات و رونوشتها" },
                    { key: "5", value: "آخرین ارجاعات اصلی" },
                    { key: "6", value: "آخرین رونوشتها" }
                ]
            },

            fromDate_Doc: {
                element: null,
                value: param.BeginDate,
                type: type_Date,
                caption: "از تاریخ پرونده",
            },
            toDate_Doc: {
                element: null,
                value: param.EndDate,
                type: type_Date,
                caption: "تا تاریخ پرونده",
            },
            erjCust: {
                id: d_erjCust,
                type: "Select_Entesab",
                caption: 'مشتری',
                keyField: 'Code',
                keyCaption: 'Name',
                keyRow: [],
                baseValue: o.baseValue,
                param: { mode: 1 },
                value: ""
            },
            khdt: {
                id: d_khdt,
                type: "Select_Entesab",
                caption: 'نوع کار',
                keyField: 'Code',
                keyCaption: 'Name',
                keyRow: [],
                baseValue: o.baseValue,
                param: { mode: 0 },
                value: ""
            },

            fromDate_Rj: {
                element: null,
                value: "",
                type: type_Date,
                caption: "از تاریخ ارجاع",
            },

            toDate_Rj: {
                element: null,
                value: "",
                type: type_Date,
                caption: "تا تاریخ ارجاع",
            },
            fromDate_Mhlt: {
                element: null,
                value: "",
                type: type_Date,
                caption: " از مهلت ارجاع",
            },
            toDate_Mhlt: {
                element: null,
                value: "",
                type: type_Date,
                caption: "تا مهلت ارجاع",
            },

            status: {
                element: null,
                value: "فعال",
                type: "select",
                caption: "وضعیت",
                items: o.dataStatus,
            },

            toUser: {
                element: null,
                value: " ",
                type: "select",
                caption: "ارجاع شونده",
                items: o.dataRepToUsers,
            },

            fromUser: {
                element: null,
                value: " ",
                type: "select",
                caption: "ارجاع دهنده",
                items: o.dataRepFromUsers,
            },

            srchSt: {
                element: null,
                value: "",
                type: type_String,
                caption: "جستجو برای",
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

        c.erjaMode.ComboBox(
            {
                caption: objects.erjaMode.caption,
                items: objects.erjaMode.items,
                value: objects.erjaMode.value,
                sizeSelect: 9,
                Create: function (e, record) {
                    objects.erjaMode.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.erjaMode.value = record.value;
                },
            },
        );
        c.docBMode.ComboBox(
            {
                caption: objects.docBMode.caption,
                items: objects.docBMode.items,
                value: objects.docBMode.value,
                sizeSelect: 9,
                Create: function (e, record) {
                    objects.docBMode.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.docBMode.value = record.value;
                 },
            },
        );

        CreateObjectDate(c, objects, 'fromDate_Doc');
        CreateObjectDate(c, objects, 'toDate_Doc');

        c.status.ComboBox(
            {
                caption: objects.status.caption,
                items: objects.status.items,
                value: objects.status.value,
                sizeSelect: 9,
                Create: function (e, record) {
                    objects.status.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.status.value = record.value;
                },
            },
        );

        CreateObjectSelectEntesab(c, objects, 'erjCust', null, o.externalModal, false);
        CreateObjectSelectEntesab(c, objects, 'khdt', null, o.externalModal, false);
        CreateObjectDate(c, objects, 'fromDate_Rj');
        CreateObjectDate(c, objects, 'toDate_Rj');
        CreateObjectDate(c, objects, 'fromDate_Mhlt');
        CreateObjectDate(c, objects, 'toDate_Mhlt');

        c.toUser.ComboBox(
            {
                caption: objects.toUser.caption,
                items: objects.toUser.items,
                value: objects.toUser.value,
                sizeSelect: 9,
                Create: function (e, record) {
                    objects.toUser.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.toUser.value = record.value;
                },
            },
        );
        c.fromUser.ComboBox(
            {
                caption: objects.fromUser.caption,
                items: objects.fromUser.items,
                value: objects.fromUser.value,
                sizeSelect: 9,
                Create: function (e, record) {
                    objects.fromUser.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.fromUser.value = record.value;
                },
            },
        );
        CreateObjectInput(c, objects, 'srchSt');

    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;

        var object = {
            erjaMode: data.erjaMode.value,
            docBMode: data.docBMode.value,
            fromUserCode: data.fromUser.value,
            toUserCode: data.toUser.value,
            azDocDate: data.fromDate_Doc.value.toEnglishDigit(),
            taDocDate: data.toDate_Doc.value.toEnglishDigit(),
            azRjDate: data.fromDate_Rj.value.toEnglishDigit(),
            taRjDate: data.toDate_Rj.value.toEnglishDigit(),
            azMhltDate: data.fromDate_Mhlt.value.toEnglishDigit(),
            taMhltDate: data.toDate_Mhlt.value.toEnglishDigit(),
            status: data.status.value,
            custCode: data.erjCust.value,
            khdtCode: data.khdt.value,
            srchSt: data.srchSt.value,
        };

        var uri = server + '/api/Web_Data/Web_ErjDocB_Last/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group ;
        ajaxFunction(uri, 'POST', object, true).done(function (response) {
            o.controlData = object;
            o.data = response;
            o.objGrid.Table("option", "controlData", object);
            o.objGrid.Table("option", "data", response);
            o.objGrid.Table("RefreshTable");
        });
    },

    _GetDataStatus: function (e) {
        var obj = this;
        var o = obj.options;

        var uri = server + '/api/Web_Data/ErjStatus/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group ;
        ajaxFunction(uri, 'GET', null, false).done(function (response) {
            //o.dataStatus = [{ key: '', value: 'همه موارد' }];
            for (var i = 0; i < response.length; i++) {
                o.dataStatus.add({ key: response[i].Status, value: response[i].Status })
            }
        });
    },

    _GetDataRepToUsers: function (e) {
        var obj = this;
        var o = obj.options;
        o.dataRepToUsers = [];
        var uri = server + '/api/Web_Data/Web_RepToUsers/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group + '/' + userName;
        ajaxFunction(uri, 'GET', null, false).done(function (response) {
            for (var i = 0; i < response.length; i++) {
                o.dataRepToUsers.add({ key: response[i].Code, value: response[i].Name })
            }
        });
    },
    _GetDataRepFromUsers: function (e) {
        var obj = this;
        var o = obj.options;
        o.dataRepFromUsers = [];
        var uri = server + '/api/Web_Data/Web_RepFromUsers/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group + '/' + userName;
        ajaxFunction(uri, 'GET', null, false).done(function (response) {
            for (var i = 0; i < response.length; i++) {
                o.dataRepFromUsers.add({ key: response[i].Code, value: response[i].Name })
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
