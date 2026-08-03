$.widget("ui.Report_ErjDocK", {
    options: {
        rprtId: 'ErjDocK',
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
        dataStatus: []
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
                    '<div class="card" style="margin: 5px 5px; background-color: rgb(255, 255, 255);background-color:white">'+
                    '    <div class="card-body">' +
                    '        <div class="card-title">' +
                    '            <h5 style="padding-left:15px"><span data-name="CustName">{0}</span><span data-name="CustCode" style="padding-right: 5px;">({1})</span></h5>' +
                    '        </div>' +
                    '        <div class="card-text">' +
                    '            <div class="row">' +
                    '                <p style="padding-left:15px"> <span>شماره :</span> <span data-name="DocNo">{2}</span></p>' +
                    '                <p style="padding-left:15px"> <span>تاریخ :</span> <span data-name="DocDate">{3}</span></p>' +
                    '                <p style="padding-left: 15px;"> <span>مهلت :</span> <span data-name="MhltDate"></span>{4}</p>' + //data-bind="visible: MhltDate != ''
                    '            </div>' +
                    '        </div>' +
                    '        <p><span>ملاحظات :</span><span data-name="Spec">{5}</span></p>' +
                    '        <p><span>نام خدمات :</span> <span data-name="KhdtName">{6}</span></p>' +
                    //'        <a class="btn btn-primary pull-left">نمایش</a>' +
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

        var divCol = $('<div class="form-inline col-lg-9 col-md-9 col-sm-12 col-xs-12" >');
        c.erjCust = $('<div class="col-md-4">');
        c.khdt = $('<div class="col-md-4">');
        c.status = $('<div class="col-md-4">');
        divCol.append(c.erjCust);
        divCol.append(c.khdt);
        divCol.append(c.status);
        divRow.append(divCol);


        var divCol = $('<div class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12">');
        c.srchSt = $('<div class="col-lg-10 col-md-10 col-sm-12 col-xs-12">');

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

            status: {
                element: null,
                value: "",
                type: "select",
                caption: "وضعیت",
                items: o.dataStatus,
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

        CreateObjectDate(c, objects, 'fromDate');
        CreateObjectDate(c, objects, 'toDate');
        CreateObjectSelectEntesab(c, objects, 'erjCust', null, o.externalModal, false);
        CreateObjectSelectEntesab(c, objects, 'khdt', null, o.externalModal, false);

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
        CreateObjectInput(c, objects, 'srchSt');

    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;

        var object = {
            azTarikh: data.fromDate.value.toEnglishDigit(),
            taTarikh: data.toDate.value.toEnglishDigit(),
            userName: userName,
            userMode: userModeErj,//sessionStorage.userModeErj,
            CustCode: data.erjCust.value,
            KhdtCode: data.khdt.value,
            SrchSt: data.srchSt.value,
            Status:data.status.value,
            SerialNumber:0, 
        };

        var uri = server + '/api/Web_Data/ErjDocK/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
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
       
        var uri = server + '/api/Web_Data/ErjStatus/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
        ajaxFunction(uri, 'GET', null, false).done(function (response) {
            o.dataStatus = [{ key: '', value: 'همه موارد' }];
            for (var i = 0; i < response.length; i++) {
                o.dataStatus.add({ key: response[i].Status, value: response[i].Status })
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
