$.widget("ui.Report_TrzAcc", {
    options: {
        rprtId: 'TrzAcc',
        caption: null,
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        objects: null,
        objGrid: null,
        showControl: false,
        externalModal: true
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

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
        if (o.showControl == true)
            divContent.append(obj._CreateControl_Top());

        //if (o.showControl == true) {
        //o.externalModal = false;
        //divContent.append(obj._CreateControl_Top());
        //}
        //else {
        //o.externalModal = true;
        controlBody = obj._CreateControl_Modal();
        //}

        divContent.append(divGrid);
        obj.element.append(divContent);

        var columns = getRprtCols(o.rprtId, sessionStorage.userName);

        var action = [
            { code: "ADocR", name: "دفتر روزنامه", icon: "/Content/img/view.svg" },
            { code: "Dftr", name: "دفتر حساب", icon: "/Content/img/view.svg" },
            { code: "TrzAcc_Riz", name: "تراز زیر حساب ها", icon: "/Content/img/view.svg", visible: { key: "HasChild", value: 1, act: '==' } }
        ];

        divGrid.Table(
            {
                id: o.rprtId,
                data: [],
                headBtn: [],
                headBtnDefult: [f_GetData, f_Control, f_Print, f_Columns],
                columns: columns,
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



    _CreateControl_Modal: function (c) {
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

        c.acc = $('<div class="col-md-12" style="margin-bottom: 2rem;">');
        c.aMode = $('<div class="col-md-12" style="margin-bottom: 2rem;">');
        c.mkz = $('<div class="col-md-12" style="margin-bottom: 2rem;">');
        c.opr = $('<div class="col-md-12" style="margin-bottom: 2rem;">');

        var divSath = $('<div class="form-inline col-sm-12" style="margin-bottom: 2rem;">');
        c.sath = $('<div class="col-md-6">');
        c.level = $('<div class="col-md-6">');
        divSath.append(c.sath);
        divSath.append(c.level);

        var divBtn = $('<div class="col-md-12">');
        var divBtn1 = $('<div class="pull-left">');
        c.btnReport = $('<button type="button" class="btn btn-primary" data-dismiss="modal">گزارش گیری</button>');

        divBtn1.append(c.btnReport);
        divBtn.append(divBtn1);

        divRow.append(divDate);
        divRow.append(c.acc);
        divRow.append(c.aMode);
        divRow.append(c.mkz);
        divRow.append(c.opr);
        divRow.append(divSath);
        divRow.append(divBtn);

        divControl.append(divRow);
        obj._BuildControl(c);
        return divControl;
    },


    _CreateControl_Top: function () {
        var obj = this;
        var o = obj.options;
        var c = {};
        var divControl = $('<div class="containerGrid" style="">');


        var divRow = $('<div class="form-inline">');

        var divCol = $('<div class="form-inline col-lg-3 col-md-3 col-sm-12 col-xs-12">');
        c.fromDate = $('<div class="col-6">');
        c.toDate = $('<div class="col-6">');

        divCol.append(c.fromDate);
        divCol.append(c.toDate);
        divRow.append(divCol);
        //divControl.append(divRow);


        var divCol = $('<div class="row col-md-9">');
        c.acc = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.aMode = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        c.mkz = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');

        divCol.append(c.acc);
        divCol.append(c.aMode);
        divCol.append(c.mkz);

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
        CreateObjectSelectEntesab(c, objects, 'acc', [{ key: "Level", value: objects.sath.value, act: '<=' }], o.externalModal, false);
        CreateObjectSelectEntesab(c, objects, 'aMode', null, o.externalModal);
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


        /*c.fromDate.DatePicker(
            {
                caption: objects.fromDate.caption,
                value: objects.fromDate.value,
                Create: function (e, record) {
                    objects.fromDate.element = record;
                },
                Change: function (e, record) {
                    objects.fromDate.value = record.value;
                },
            },
        );

        c.toDate.DatePicker(
            {
                caption: objects.toDate.caption,
                value: objects.toDate.value,
                Create: function (e, record) {
                    objects.toDate.element = record;
                },
                Change: function (e, record) {
                    objects.toDate.value = record.value;
                },
            },
        );*/



        /*c.acc.Select_Entesab(
            {
                id: objects.acc.id,
                caption: objects.acc.caption,
                baseValue: objects.acc.baseValue,
                keyField: objects.acc.keyField,
                keyCaption: objects.acc.keyCaption,
                keyRow: objects.acc.keyRow,
                param: objects.acc.param,
                striped: false,
                externalModal: o.externalModal,
                filter: [{ key: "Level", value: objects.sath.value, act: '<=' }],
                Select: function (e, record) {
                    objects.acc.value = record.dataString;
                    //objects.acc.value = record.;
                },
            }
        );

        c.aMode.Select_Entesab(
            {
                id: objects.aMode.id,
                caption: objects.aMode.caption,
                baseValue: objects.aMode.baseValue,
                keyField: objects.aMode.keyField,
                keyCaption: objects.aMode.keyCaption,
                param: null,
                externalModal: o.externalModal,
                Select: function (e, record) {
                    objects.aMode.value = record.dataString;
                },
            }
        );
       

        c.mkz.Select_Entesab(
            {
                id: objects.mkz.id,
                caption: objects.mkz.caption,
                baseValue: objects.mkz.baseValue,
                keyField: objects.mkz.keyField,
                keyCaption: objects.mkz.keyCaption,
                param: null, externalModal: o.externalModal,
                Select: function (e, record) {
                    objects.mkz.value = record.dataString;
                },
            }
        );

        c.opr.Select_Entesab(
            {
                id: objects.opr.id,
                caption: objects.opr.caption,
                baseValue: objects.opr.baseValue,
                keyField: objects.opr.keyField,
                keyCaption: objects.opr.keyCaption,
                param: null, externalModal: o.externalModal,
                Select: function (e, record) {
                    objects.opr.value = record.dataString;
                },
            }
        );

*/

    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;

        var object = {
            azTarikh: data.fromDate.value,
            taTarikh: data.toDate.value,
            AModeCode: data.aMode.value,
            AccCode: data.acc.value,
            MkzCode: data.mkz.value,
            OprCode: data.opr.value,
            Level: data.level.value,
            Sath: data.sath.value,
        };
        var uri = server + '/api/ReportAcc/TrzAcc/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
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
