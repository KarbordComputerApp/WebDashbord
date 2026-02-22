$.widget("ui.Report_TrzAcc", {
    options: {
        rprtId: 'TrzAcc',
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

        var divGrid = $('<div> ');
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
            { code: "Dftr", name: "دفتر حساب", icon: "/Content/img/view.svg" },
            { code: "TrzAcc_Riz", name: "تراز زیر حساب ها", icon: "/Content/img/view.svg", visible: { key: "HasChild", value: 1, act: '==' } }
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
                viewDataLowTemplate: [
                    '<td style="width:0px"><h5 data-name="AccCode">{0}</h5></td>',
                    '<td style="padding: 10px;" ><h5 data-name="AccName" style="word-break: break-word;white-space: normal;">{0}</h5></td>',
                    //'<td style="width:0px"><p data-name="Bede" data-type="' + type_Currency +'" style="direction: ltr">{0}</p></td>',
                    //'<td style="width:0px"><p data-name="Best" data-type="' + type_Currency +'" style="direction: ltr">{0}</p></td>',
                    '<td style="width:0px"><h5 data-name="MonTotal" data-type="' + type_Currency +'" style="direction: ltr;text-align:end;">{0}</h5></td>',
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

        //obj._CreateObjectPrint();
        CreateObjectPrint(obj);
        CreateObjectSetting(obj);
        if (o.getAutoData) obj._GetData();

    },


    /*
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
        */

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
        //divControl.append(divRow);


        var divCol = $('<div class="form-inline col-lg-9 col-md-9 col-sm-12 col-xs-12">');
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
        //divControl.append('<hr>');

        obj._BuildControl(c);
        return divControl;
    },

    _SetObjects: function (e) {

        var obj = this;
        var o = obj.options;
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
                value: ""
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
            azTarikh: data.fromDate.value.toEnglishDigit(),
            taTarikh: data.toDate.value.toEnglishDigit(),
            AModeCode: data.aMode.value,
            AccCode: data.acc.value,
            MkzCode: data.mkz.value,
            OprCode: data.opr.value,
            Level: data.level.value,
            Sath: data.sath.value,
        };
        var uri = server + '/api/ReportAcc/TrzAcc/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
        ajaxFunction(uri, 'POST', object, true).done(function (response) {
            o.controlData = object;
            o.data = response;
            o.objGrid.Table("option", "controlData", object);
            o.objGrid.Table("option", "data", response);
            o.objGrid.Table("RefreshTable");
        });

    },

    /*  _CreateObjectPrint: function () {
          var obj = this;
          var o = obj.options;
          var _div = $('<div class="' + 'K_DivModal' + f_Print + '">');
          _div.Print(
              {
                  id: o.rprtId,
                  caption: "چاپ",
                  baseValue: o.baseValue,
                  data: o.data,
                  columns: o.columns,
                  printVariable: "",
                  Select: function (e, record) {
                      a = record;
                  },
              }
          );
          obj.element.append(_div);
      },
  
      _ShowObjectPrint: function () {
          var obj = this;
          var o = obj.options;
          if (o.data.length > 0) {
              var objPrint = $(obj.bindings[0]).find('.K_DivModal' + f_Print);
  
              printVariable = o.controlData;
              printVariable["ReportDate"] = localStorage.getItem("DateNow");
  
              for (var i = 0; i < o.columns.length; i++) {
                  if (o.columns[i].Sum != null) {
                      printVariable['Sum' + o.columns[i].Code] = o.columns[i].Sum;
                  }
              }
  
              objPrint.Print("option", "printVariable", printVariable);
              objPrint.Print("option", "data", o.data);
              objPrint.Print("ShowModalPrint");
          }
          else {
              return showNotification('اطلاعاتی برای چاپ وجود ندارد. ابتدا گزارش گیری کنید', 0);
          }
      },*/

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
