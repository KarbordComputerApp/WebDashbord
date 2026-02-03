$.widget("ui.Report_Dftr", {
    options: {
        rprtId: 'Dftr',
        caption: null,
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        objects: null,
        objGrid: null,
        externalModal: true
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        //if (o.objects == null) {
        //    o.objects = obj._SetObjects();
        //}

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

           // divContent.append(obj._CreateControl());


        divContent.append(divGrid);
        obj.element.append(divContent);

        var columns = getRprtCols(o.rprtId, sessionStorage.userName);

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
                columns: columns,
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
                ActionHeadClick: function (e, records) {
                    var name = records.actionName;
                    var items = records.data;
                    if (name == "GetData") {
                        obj._GetData();
                    }
                },
                ActionClick: function (e, records) {
                },
            },
        );

    },



   /* _CreateControl_Modal: function (c) {
        var obj = this;
        var o = obj.options;
        var c = {};
        var divControl = $('<div style="width: 450px;">');


        var divRow = $('<div class="row" style="padding:5px 10px 0px 10px">');

        var divDate = $('<div class="form-inline col-sm-12" style="margin-bottom: 2rem;">');
        c.fromDate = $('<div class="col-sm-6">');
        c.toDate = $('<div class="col-sm-6">');
        divDate.append(c.fromDate);
        divDate.append(c.toDate);

        var divNumber = $('<div class="form-inline col-sm-12" style="margin-bottom: 2rem;">');
        c.fromNumber = $('<div class="col-sm-6">');
        c.toNumber = $('<div class="col-sm-6">');
        divNumber.append(c.fromNumber);
        divNumber.append(c.toNumber);

        c.acc = $('<div class="col-md-12" style="margin-bottom: 2rem;">');
        c.aMode = $('<div class="col-md-12" style="margin-bottom: 2rem;">');
        c.status = $('<div class="col-md-12" style="margin-bottom: 2rem;">');
        c.mkz = $('<div class="col-md-12" style="margin-bottom: 2rem;">');
        c.opr = $('<div class="col-md-12" style="margin-bottom: 2rem;">');


        var divSelect = $('<div class="form-inline col-sm-12" style="margin-bottom: 2rem;">');
        c.dispBands = $('<div class="col-md-6">');
        c.naghl = $('<div class="col-md-6">');
        divSelect.append(c.dispBands);
        divSelect.append(c.naghl);


        var divBtn = $('<div class="col-md-12">');
        var divBtn1 = $('<div class="pull-left">');
        c.btnReport = $('<button type="button" class="btn btn-primary" data-dismiss="modal">گزارش گیری</button>');

        divBtn1.append(c.btnReport);
        divBtn.append(divBtn1);
        divRow.append(divDate);
        divRow.append(divNumber);

        divRow.append(divSelect);
        divRow.append(c.acc);
        divRow.append(c.aMode);
        divRow.append(c.status);
        divRow.append(c.mkz);
        divRow.append(c.opr);

        divRow.append(divBtn);

        divControl.append(divRow);
        obj._BuildControl(c);
        return divControl;
    },
    */

    _CreateControl: function () {
        var obj = this;
        var o = obj.options;
        var c = {};
        var divControl = $('<div>');

        var divRow = $('<div class="row" style="padding:5px 10px 0px 10px">');
        var divCol = $('<div class="row col-sm-3">');

        c.fromDate = $('<div class="col-sm-6">');
        c.toDate = $('<div class="col-sm-6">');

        divCol.append(c.fromDate);
        divCol.append(c.toDate);
        divRow.append(divCol);
        divControl.append(divRow);


        var divCol = $('<div class="row col-md-9">');
        c.acc = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.aMode = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.mkz = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');

        divCol.append(c.acc);
        divCol.append(c.aMode);
        divCol.append(c.mkz);

        divRow.append(divCol);
        divControl.append(divRow);

        var divRow = $('<div class="row" style="padding:0px 10px 5px 10px">');
        c.opr = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.sath = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.level = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');

        var divBtn = $('<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        var divBtn1 = $('<div class="pull-left">');
        c.btnReport = $('<button type="button" class="btn btn-primary">گزارش گیری</button>');

        divBtn1.append(c.btnReport);
        divBtn.append(divBtn1);

        divRow.append(c.opr);
        divRow.append(c.sath);
        divRow.append(c.level);

        divRow.append(divBtn);

        divControl.append(divRow);
        divControl.append('<hr>');

        obj._BuildControl(c);
        return divControl;
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

        if (data.acc.value == "") {
            return showNotification(translate('حساب را انتخاب کنید'), 0);
        }

        var object = {
            azTarikh: data.fromDate.value,
            taTarikh: data.toDate.value,
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
            o.objGrid.Table("option", "controlData", object);
            o.objGrid.Table("option", "data", response);
            o.objGrid.Table("RefreshTable");
        });

    },


    Refresh: function () {
        var obj = this;
        obj._GetData();
    },

    ShowModalControl: function () {
        var obj = this;
        var o = obj.options;
        o.objGrid.Table("ShowModalControl");
    }

});
