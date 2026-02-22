$.widget("ui.Table", {
    options: {
        id: null,
        data: [],
        headBtn: [],
        headBtnDefult: [],//['Columns', 'Control'],
        showHeadBtnDefult: false,  // نمایش دکمه ها بالای جدول
        allData: [],
        columns: [],
        action: [],
        controlBody: [],
        sort: '',
        sortMode: '',
        pageCount: 0,
        pageSize: 0,
        currentPageIndex: 0,
        keyField: '',
        keyRow: null,
        radif: false, // دارای ردیف
        sumFields: [], //فیلد های جمع 
        isTableFix: false, // ثابت ماندن ستون ردیف و عملیات
        height: '350px',
        striped: null,
        actionDropdown: false,
        showInBoxControl: false,
        controlData: null, // اطلاعات کنترل گزارش
        viewData: _viewDataFull,  // نمایش جدول کامل یا مختصر موبایلی
        viewDataLowTemplate: null,  // نحوه نمایش در حالت مختصر

        //dataPrint: { data: null, classModal: null, modalElement: null },
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        o.allData = [];
        for (var i = 0; i < o.data.length; i++) {
            o.allData.add(o.data[i]);
        }

        if (o.viewData == _viewDataLow) o.isTableFix = false;

        var table = obj._CreateTable();
        this.element.append(table);
        obj._Sort(o.sort, o.sortMode);
        if (o.viewData == _viewDataFull)
            obj._PaintFull();
        else {
            obj._PaintLow();
        }
        if (o.sumFields.length > 0) obj._Sum();
    },

    _CreateTable: function () {
        var obj = this;
        var o = obj.options;
        var list = o.data;
        var _columns = o.columns.filter(c => c['Visible'] == 1);

        var _divFinal = $('<div class="TableContent">')
        var _divTable = $('<div style="height:' + o.height + ';overflow:auto;border: 1px #ddd solid;">');
        var _table = $('<table class="table table-hover ' + (o.striped == false ? '' : 'table-striped') + ' K_DataGrid ' + (o.isTableFix ? 'table-responsive-md tableFix' : '') + '">'); //tableFixList

        var _divBtn = $('<div class="divBtn" style="height: 30px;text-align: left;' + (o.showHeadBtnDefult ? '' : 'display:none;') + '">');

        // btn head
        if (o.headBtnDefult.length > 0) {
            for (var i = o.headBtnDefult.length - 1; i >= 0; i--) {
                itemBtn = tableBtnDefult.filter(c => c.name == o.headBtnDefult[i]);
                if (itemBtn.length > 0) {
                    var _a = $('<a action-name = "' + itemBtn[0].name + '" mode = "btn" title="' + itemBtn[0].caption + '" style="border: 1px solid black;padding: 7px;border-radius: 5px;margin:2px">');
                    var _img = $('<img src="' + itemBtn[0].icon + '"width="20" height="20">');
                    _a.append(_img);
                    _divBtn.append(_a);
                }
                if (o.headBtnDefult[i] == f_Columns) {
                    obj._CreateModalColumn(itemBtn[0]);
                }
                else if (o.headBtnDefult[i] == f_Control) {
                    obj._CreateModalControl(itemBtn[0]);
                }
                //else if (o.headBtnDefult[i] == f_Print) {
                // obj._CreateObjectPrint(itemBtn[0], _a);
                //}
            }
            _divFinal.append(_divBtn);
        }

        if (o.headBtn.length > 0) {
            for (var i = o.headBtn.length - 1; i >= 0; i--) {
                var _a = $('<a action-name = "' + o.headBtn[i].name + '" mode = "btn" title="' + o.headBtn[i].caption + '" style="border: 1px solid black;padding: 7px;border-radius: 5px;margin:2px">');
                var _img = $('<img src="' + o.headBtn[i].icon + '"width="20" height="20">');
                _a.append(_img);
                _divBtn.append(_a);
            }
            _divFinal.append(_divBtn);
        }

        var headBtn = _divBtn.find('a');
        headBtn.click(function (e) {
            obj._ActionHeadBtn(this);
        });


        var _tBody = $('<tbody data-dismiss="' + (o.action.length == 0 ? "modal" : "") + '" style="cursor: default;">');

        // _table.append(_tHead);
        _table.append(_tBody);
        // _table.append(_tfoot);

        _divTable.append(_table);

        var _div = $('<div class="row">');

        // select PageCount
        var _divPageSize = $('<div class="col">');
        var _divInline = $('<div class="form-inline">');
        var _label = $('<label>نمایش</label>');
        var _divSelect = $('<div class="form-group" style="text-align: center;width: 46px;margin-left: 5px;margin-right: 5px;">');
        var _selectSizePage = $('<select class="selectorange">');
        for (var i = 1; i <= 10; i++) {
            var _option = $('<option value="' + i + '0">' + i + '0</option>');
            _selectSizePage.append(_option);
        }
        $(_selectSizePage).val(o.pageSize);
        var _labelCount = $('<label>رکورد</label>');
        _divSelect.append(_selectSizePage);
        _divInline.append(_label);
        _divInline.append(_divSelect);
        _divInline.append(_labelCount);
        _divPageSize.append(_divInline);
        _div.append(_divPageSize);

        // Paggin bottom
        var _divArrow = $('<div class="panel_Arrow" style="text-align: center; margin-top: 10px;">');

        var rowAllCount = list.length;
        var last = o.pageSize;
        last = last >= rowAllCount ? rowAllCount : last;

        var _aFirstPage = $('<a title="اولین"><i class="bi bi-chevron-double-right"></i></a>');
        var _aPreviousPage = $('<a title="قبلی"> <i class="bi bi-chevron-right"></i></a>');
        var _bPage = $('<b class="l_PageCount" style="margin: 0px 5px 0px 5px; color: #ec8121;">' + (o.currentPageIndex + 1) + ' از ' + (rowAllCount > 0 ? Math.ceil(rowAllCount / o.pageSize) : 1) + '</b>');
        var _aNextPage = $('<a title="بعدی"><i class="bi bi-chevron-left"></i></a>');
        var _aLastPage = $('<a title="آخرین"><i class="bi bi-chevron-double-left"></i></a>');

        _divArrow.append(_aFirstPage);
        _divArrow.append(_aPreviousPage);
        _divArrow.append(_bPage);
        _divArrow.append(_aNextPage);
        _divArrow.append(_aLastPage);

        _div.append(_divArrow);

        // AllRecord
        var _divAllRecord = $('<div class="col panel_CountRecord" style="margin-top: 10px; text-align:left;">');
        var _spanCount = $('<span>تعداد کل رکورد ها :</span>');
        var _spanAllCount = $('<span class="span_AllCount" style="padding-right: 3px;">0</span>');

        _divAllRecord.append(_spanCount);
        _divAllRecord.append(_spanAllCount);
        _div.append(_divAllRecord);




        _divFinal.append(_divTable);
        _divFinal.append(_div);

        _aFirstPage.click(function (e) {
            obj._FirstPage();
        });

        _aNextPage.click(function () {
            obj._NextPage();
        });

        _aPreviousPage.click(function (e) {
            obj._PreviousPage();
        });

        _aLastPage.click(function (e) {
            obj._LastPage();
        });

        _selectSizePage.change(function (e) {
            var value = $(this).val()
            obj._SetSizePage(value);
        });

        return _divFinal;
    },

    _CreateHead: function () {
        var obj = this;
        var o = obj.options;
        var _columns = o.columns.filter(c => c['Visible'] == 1);

        var _tHead = $('<thead style="cursor: pointer;">');
        var _tr = $('<tr>');

        if (o.radif == true) {
            var _th = $('<th style="width: 0px;">ردیف</th>');
            _tr.append(_th);
        }

        for (var i = 0; i < _columns.length; i++) {
            var _th = $('<th columnname="' + _columns[i].Code + '" mode="header">');
            var _thSpan = $('<span>' + _columns[i].Name + '</span>');
            _th.append(_thSpan);
            _tr.append(_th);
        }

        if (o.action.length > 0) {
            var _th = $('<th style="width: 0px;">عملیات</th>');
            _tr.append(_th);
        }
        _tHead.append(_tr);

        return _tHead;
    },

    _CreateBodyFull: function (first, last) {
        var obj = this;
        var o = obj.options;
        var list = o.data;
        var _columns = o.columns.filter(c => c['Visible'] == 1);
        //var _columns = o.columns.filter;

        var table = $(obj.bindings[0]).find('.K_DataGrid');

        body = table.find('tbody');
        if (body.length > 0) {
            body.empty();
        }

        last = list.length < last ? list.length : (list.length == 0 ? 0 : last);

        for (var i = first; i < last; i++) {

            var color = "";
            if (o.keyRow != null) {
                var colored = [];
                for (var j = 0; j < o.keyRow.length; j++) {
                    if (o.keyRow[j].act == "==") {
                        colored[j] = list[i][o.keyRow[j].column] == o.keyRow[j].value;
                    }
                    if (o.keyRow[j].act == ">") {
                        colored[j] = list[i][o.keyRow[j].column] > o.keyRow[j].value;
                    }
                }


                if (o.keyRow.length == 1) {
                    color = colored[0] ? ('background-color : ' + color_RowKey) : '';
                } else if (o.keyRow.length == 2) {
                    color = colored[0] && colored[1] ? ('background-color : ' + color_RowKey) : '';
                }
                else if (o.keyRow.length == 3) {
                    color = colored[0] && colored[1] && colored[2] ? ('background-color : ' + color_RowKey) : '';
                }
                else if (o.keyRow.length == 4) {
                    color = colored[0] && colored[1] && colored[2] && colored[3] ? ('background-color : ' + color_RowKey) : '';
                }

            }

            var _tr = $('<tr style="' + color + '">');

            // radif
            if (o.radif == true) {
                var _td = $('<td data-name="Radif" style="background-color: ' + color_Radif + '; color :black ">' + (i + 1).toString() + '</td>');
                _tr.append(_td);
            }


            // bands
            for (var j = 0; j < _columns.length; j++) {
                var value = list[i][_columns[j].Code];
                var valueShow = _columns[j].Type == type_Currency ? NumberToNumberString(parseFloat(value)) : _columns[j].Type == type_Boolean ? '' : value;

                var _td = $('<td data-name="' + _columns[j].Code + '"' +
                    'data-value="' + value + '"' +
                    'class="' + (_columns[j].Type == type_Farsi ? 'ellipsis' : _columns[j].Type == type_Boolean ? 'center' : '') + '"' +
                    'style="' +
                    (_columns[j].Type == type_Currency ? 'direction: ltr; ' : '') +
                    (value < 0 ? ' color: red; ' : '')
                    + '"' +
                    '>' + valueShow + '</td>');
                if (_columns[j].Type == type_Boolean) {
                    var _input = $('<input data-name="' + _columns[j].Code + '" data-value="' + value + '" mode="' + td_Mode + '" type="checkbox" style="width: 16px;margin: 0px;">');
                    _input.prop('checked', value == 1);
                    _td.append(_input);
                }
                _tr.append(_td);
            }


            // action
            var action = o.action;
            if (action.length > 0) {
                var _td = $('<td style="background-color: white">');
                if (o.actionDropdown == true) {
                    var _aMenu = $('<a class="dropdown-toggle" data-toggle="dropdown" style="padding:10px">');
                    var _span = $('<span class="caret"></span>');
                    _aMenu.append(_span);
                    _td.append(_aMenu);

                    var _ul = $('<ul class="dropdown-menu">');
                    for (var k = 0; k < action.length; k++) {
                        visible = action[k].visible == null ? true : action[k].visible;
                        if (visible != true) {
                            if (visible.act == '==') {
                                visible = list[i][visible.key] == visible.value;
                            }
                            else
                                visible == false;
                        }
                        if (visible == true) {
                            var _li = $('<li>');
                            var _a = $('<a action-name="' + action[k].code + '" title="' + action[k].name + '" style="font-size: 11px;text-align: right;">');
                            var _img = $('<img src="' + action[k].icon + '"width="18" height="18" style="margin-left:10px">');
                            var _span = $('<span>' + action[k].name + '</span>');
                            _a.append(_img);
                            _a.append(_span);
                            _li.append(_a);
                            _ul.append(_li);
                        }
                    }
                    _td.append(_ul);
                }
                else {
                    for (var k = 0; k < action.length; k++) {
                        var _a = $('<a action-name="' + action[k].code + '" title="' + action[k].name + '">');
                        var _img = $('<img src="' + action[k].icon + '" width="16" height="16" style="margin-left:10px">');
                        _a.append(_img);
                        _td.append(_a);
                    }
                }

                _tr.append(_td);
            }
            body.append(_tr);
        }

        var tr = table.find('tbody tr');
        tr.click(function (e) {
            obj._SelectRow(this);
        });

        var actionBtn = table.find('tbody tr td a');
        actionBtn.click(function (e) {
            obj._ActionClick(this);
        });

        var _tdInput = table.find('tbody tr td input');

        _tdInput.click(function (e) {
            var mode = $(this).attr('mode');
            if (mode == td_Mode) {
                obj._TdCheckBoxClick(this);
            }
        });


    },



    _CreateBodyLow: function (first, last) {
        var obj = this;
        var o = obj.options;
        var list = o.data;

        var temp = o.viewDataLowTemplate;
        var table = $(obj.bindings[0]).find('.K_DataGrid');

        body = table.find('tbody');
        if (body.length > 0) {
            body.empty();
        }

        last = list.length < last ? list.length : (list.length == 0 ? 0 : last);

        for (var i = first; i < last; i++) {
            var _tr = $('<tr>');
            for (var j = 0; j < temp.length; j++) {

                var objects = $(temp[j]).find("[data-name]");
                var value = [];
                for (var k = 0; k < objects.length; k++) {
                    var _name = $(objects[k]).attr("data-name");
                    var _type = $(objects[k]).attr("data-type");
                    var valueData = list[i][_name];
                    if (_type == type_Currency) {
                        valueData = NumberToNumberString(parseFloat(valueData))
                    }
                    value[k] = valueData;
                }
                tdValue = temp[j].format(value[0], value[1], value[2], value[3], value[4]);
                var td = $(tdValue);
                _tr.append(td);
            }

            // var td = '<td style="width:0px"><center><img src="' + GetIconBank(data[i].Bank) + '" width="35" /><p style="color: darkgray;">' + data[i].Shobe + '</p></center>';
            // var td[1] = $('<td><div><h5 style="padding-right:5px">' + data[i].TrafName + '</h5><h5 style="padding-right:5px;padding-top: 10px;">چک : ' + data[i].CheckNo + '</h5></div></td>')
            // var td[2] = $('<td style="width:0px"><h5 style="text-align:center">' + NumberToNumberString(data[i].Value) + '</h5><div class="DashbordDateChek">' + data[i].CheckDate + '</div></td>')


            // bands

            /*
            
             <tr>
                <td style="width:0px"><img src="/Content/img/profile.png" width="35"></td>
                <td data-name="AccCode"></td>
                <td data-name="AccName" style="width:0px"></td>
            </tr>
            
            <tr style="">
                <td data-name="AccCode" data-value="110" class="" style="">110</td>
                <td data-name="AccName" data-value="موجودی نقدی و بانک" class="ellipsis" style="">موجودی نقدی و بانک</td>
            </tr>
            
            
            <tr>
                <td style="width:0px">
                    <center>
                        <img src="/Content/img/bank/saderat.png" width="35">
                        <p style="color: darkgray;"></p>
                    </center>
                </td>
                <td>
                    <div>
                        <h5 style="padding-right:5px">مالیات و عوارض بر ارزش افزوده فروش </h5>
                        <h5 style="padding-right:5px;padding-top: 10px;">چک : 181199</h5>
                    </div>
                </td>
                <td style="width:0px">
                    <h5 style="text-align:center">1,428,000,000</h5>
                    <div class="DashbordDateChek">1404/07/22</div>
                </td>
            </tr>
            
                    for (var i = 0; i < data.length; i++) {
                        var tr = $('<tr>');
                        var tdIcon = $('<td style="width:0px"><center><img src="' + GetIconBank(data[i].Bank) + '" width="35" /><p style="color: darkgray;">' + data[i].Shobe + '</p></center>')
                        var tdTrafName = $('<td><div><h5 style="padding-right:5px">' + data[i].TrafName + '</h5><h5 style="padding-right:5px;padding-top: 10px;">چک : ' + data[i].CheckNo + '</h5></div></td>')
                        var tdValue = $('<td style="width:0px"><h5 style="text-align:center">' + NumberToNumberString(data[i].Value) + '</h5><div class="DashbordDateChek">' + data[i].CheckDate + '</div></td>')
                        tr.append(tdIcon);
                        tr.append(tdTrafName);
                        tr.append(tdValue);
                        tbody.append(tr);
                    }
            
            */

            /*    var _td = $('<td data-name="' + _columns[j].Code + '"' +
                    'data-value="' + value + '"' +
                    'class="' + (_columns[j].Type == type_Farsi ? 'ellipsis' : _columns[j].Type == type_Boolean ? 'center' : '') + '"' +
                    'style="' +
                    (_columns[j].Type == type_Currency ? 'direction: ltr; ' : '') +
                    (value < 0 ? ' color: red; ' : '')
                    + '"' +
                    '>' + valueShow + '</td>');
                _tr.append(_td);*/



            // action
            body.append(_tr);
        }

        var tr = table.find('tbody tr');
        tr.click(function (e) {
            obj._SelectRow(this);
        });
    },

    _CreateFooter: function () {
        var obj = this;
        var o = obj.options;
        var _columns = o.columns.filter(c => c['Visible'] == 1);

        var _tfoot = $('<tfoot>');

        //sum
        if (o.sumFields.length > 0) {
            var _tr = $('<tr style="background-color: ' + color_RowSum + '">');
            if (o.radif == true) {
                var _td = $('<td style="background-color: ' + color_RowSum + ' !important; direction: ltr;">جمع</th>');
                _tr.append(_td);
            }

            for (var i = 0; i < _columns.length; i++) {
                var _td = $('<td columnname="' + _columns[i].Code + '" mode="sum" style="background-color:' + color_RowSum + ' !important; direction: ltr;">');
                _tr.append(_td);
            }

            if (o.action.length > 0) {
                var _td = $('<td style="background-color:' + color_RowSum + ' !important; direction: ltr;"></td>');
                _tr.append(_td);
            }

            _tfoot.append(_tr);
        }
        //end sum

        //search
        var _tr = $('<tr style="background-color: ' + color_RowSearch + '">');

        if (o.radif == true) {
            var _td = $('<td style="background-color:' + color_RowSearch + ' !important"></th>');
            _tr.append(_td);
        }

        for (var i = 0; i < _columns.length; i++) {
            var _td = $('<td style="padding: 0px 3px;" class="focused">');
            var _input = $('<input type="text" columnname="' + _columns[i].Code + '" mode="search" class="form-control ' + NameTypeKey(_columns[i].Type) + '" style="height: 2.4rem;">');
            _td.append(_input);
            _tr.append(_td);
        }

        if (o.action.length > 0) {
            var _td = $('<td style="background-color: ' + color_RowSearch + ';"></td>');
            _tr.append(_td);
        }

        _tfoot.append(_tr);


        return _tfoot;
    },

    _PaintFull: function () {
        var obj = this;
        var o = obj.options;
        var _table = $(obj.bindings[0]).find('.K_DataGrid');
        _table.find('thead').remove();
        _table.find('tfoot').remove();

        _table.append(obj._CreateHead());
        _table.append(obj._CreateFooter());

        obj._CreateBodyFull(0, o.pageSize);

        var th = _table.find('thead th');
        th.click(function (e) {
            var columnName = $(this).attr('columnname');
            if (columnName != null) {
                var iconMode = $(this).find('.' + mode_Sort_DESC);
                obj._Sort(columnName, iconMode.length > 0 ? '' : mode_Sort_DESC);
                obj._FirstPage();
            }
        });

        var lockFilter;
        var inputFilter = _table.find('tfoot input');

        inputFilter.keyup(function (e) {
            if (lockFilter) {
                obj._Filter();
                obj._FirstPage();
                if (o.sumFields.length > 0) obj._Sum();
            }
        });

        inputFilter.keydown(function (e) {
            lockFilter = KeyPressFilter(e);
            return lockFilter;
        });
    },


    _PaintLow: function () {
        var obj = this;
        var o = obj.options;
        var _table = $(obj.bindings[0]).find('.K_DataGrid');
        _table.find('thead').remove();
        _table.find('tfoot').remove();

        //_table.append(obj._CreateHead());
        //_table.append(obj._CreateFooter());

        obj._CreateBodyLow(0, o.pageSize);

        var th = _table.find('thead th');
        th.click(function (e) {
            var columnName = $(this).attr('columnname');
            if (columnName != null) {
                var iconMode = $(this).find('.' + mode_Sort_DESC);
                obj._Sort(columnName, iconMode.length > 0 ? '' : mode_Sort_DESC);
                obj._FirstPage();
            }
        });

        var lockFilter;
        var inputFilter = _table.find('tfoot input');

        inputFilter.keyup(function (e) {
            if (lockFilter) {
                obj._Filter();
                obj._FirstPage();
                if (o.sumFields.length > 0) obj._Sum();
            }
        });

        inputFilter.keydown(function (e) {
            lockFilter = KeyPressFilter(e);
            return lockFilter;
        });
    },



    // columns modal
    _CreateModalColumn: function (headBtn) {
        var obj = this;
        var o = obj.options;

        //modal
        var body = $('main');
        var _modal = $('<div class="modal fade K_Modal' + f_Columns + '" tabindex="-1" aria-hidden="true" style="' + (o.showInBoxControl ? 'position: absolute;' : '') + '">');
        var dialog = $('<div class="modal-dialog" style="max-width: fit-content;"></div>');
        _modal.append(dialog);
        var content = $('<div class="modal-content"></div>');

        //head
        var _header = $('<div class="modal-header" style="min-width: 300px">');
        var _buttonExit = $('<a data-dismiss="modal" aria-label="Close" title="بستن"><i class="bi bi-x-lg"></button >');
        _header.append(_buttonExit);
        var title = $('<p class="modal-title" style="width: 90%;text-align: center;">' + headBtn.caption + '</p>');
        _header.append(title);

        var _aDefult = $('<a title="پیش فرض"><i class="bi bi-person-gear"></a>')
        _header.append(_aDefult);
        // end head

        //body
        var _body = $('<div class="modal-body" style="height: 350px;overflow:auto;">');
        var _divRow = $('<div>');

        //{ Code: 'Spec', Name: 'ملاحظات', Type: type_Farsi, Visible: 1 },
        var columns = o.columns.filter(c => c.Name != '');
        for (var i = 0; i < columns.length; i++) {
            var _divInline = $('<div class="form-inline" style="padding: 5px 10px 5px 10px;">');
            var _input = $('<input data-name="' + columns[i].Code + '" mode = "' + td_Mode + '" type="checkbox" style="margin:0px">');
            var _strong = $('<strong style="padding-right: 10px;">' + columns[i].Name + '</strong>');

            _input.prop('checked', columns[i].Visible == 1);

            _divInline.append(_input);
            _divInline.append(_strong);

            _divRow.append(_divInline);
        }
        _body.append(_divRow);
        //end body

        var _footer = $('<div style="padding: 0px; margin: 10px;" hidden>');
        var _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        dialog.append(content);

        obj.element.append(_modal);
        //end modal


        _aDefult.click(function (e) {
            obj._SetDefultColumns();
        });

        _modal.on('hide.bs.modal', function () {
            obj._SetResultModalColumn();
        });

    },

    _ShowModalColumn: function () {
        var obj = this;
        var o = obj.options;
        var modal = $(obj.bindings[0]).find('.K_Modal' + f_Columns);
        modal.modal('show');
    },

    _SetDefultColumns: function () {
        var obj = this;
        var o = obj.options;
        var modal = $(obj.bindings[0]).find('.K_Modal' + f_Columns);
        var input = modal.find('[mode="' + td_Mode + '"]');

        var url = CreateUrl(o.baseValue.ace, o.baseValue.sal, o.baseValue.group, 'RprtColsDefult') // آدرس دریافت ستون ها پیش فرض
        ajaxFunction(url + '/' + o.id, 'GET').done(function (list) {
            for (i = 0; i < input.length; i++) {
                var code = $(input[i]).attr("data-name");
                column = list.filter(c => c.Code == code)[0];
                $(input[i]).prop('checked', column.Visible == 1);
            }
        });
    },

    _SetResultModalColumn: function () {
        var obj = this;
        var o = obj.options;
        var modal = $(obj.bindings[0]).find('.K_Modal' + f_Columns);
        var input = modal.find('[mode="' + td_Mode + '"]');
        var list = [];
        var rprtCols = JSON.parse(localStorage.getItem('RprtCols'));
        var rprtCol = rprtCols.filter(s => s.RprtId == o.id && s.UserCode == sessionStorage.userName);
        if (rprtCol.length == 0) {
            rprtCol = rprtCols.filter(s => s.RprtId == o.id && s.UserCode == "*Default*");
        }
        for (i = 0; i < input.length; i++) {
            var visible = 0;
            var code = $(input[i]).attr("data-name");
            $(input[i]).is(':checked') == true ? visible = 1 : visible = 0;
            tmp = {
                'UserCode': sessionStorage.userName,
                'RprtId': o.id,
                'Code': code,
                'Visible': visible,
                'Position': i,
                'Width': 100
            };
            list.push(tmp);

            rCol = rprtCol.filter(c => c.Code == code)[0];
            rCol.Visible = visible;

            col = o.columns.filter(c => c.Code == code)[0];
            col.Visible = visible;
        }

        var actionValue = { actionName: "SaveColumns", columns: o.columns, data: list };
        obj._trigger("ActionHeadClick", event, actionValue);

        var url = CreateUrl(o.baseValue.ace, o.baseValue.sal, o.baseValue.group, 'RprtColsSave') // آدرس ذخیره ستون ها
        ajaxFunction(url, 'POST', list).done(function (response) {
            localStorage.setItem('RprtCols', JSON.stringify(rprtCols));
            if (o.viewData == _viewDataFull)
                obj._PaintFull();
            else
                obj._PaintLow();

            if (o.sumFields.length > 0) obj._Sum();
        });
    },

    // control modal

    _CreateModalControl: function (headBtn) {
        var obj = this;
        var o = obj.options;

        //modal
        var _modal = $('<div class="modal fade K_Modal' + f_Control + '" tabindex="-1" aria-hidden="true" style="' + (o.showInBoxControl ? 'position: absolute;' : '') + '">');
        var dialog = $('<div class="modal-dialog" style="max-width: fit-content;"></div>');
        _modal.append(dialog);
        var content = $('<div class="modal-content"></div>');

        //head
        var _header = $('<div class="modal-header">');
        var _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><i class="bi bi-x-lg"></button >');
        _header.append(_buttonExit);
        var title = $('<p class="modal-title" style="width: 90%;text-align: center;">' + headBtn.caption + '</p>');
        _header.append(title);

        //_aDefult = $('<a> <img src="/Content/img/sanad/paragraph-two-column.png" width="20" height="20" style="margin-left: 10px;" title="پیش فرض"></a>')
        //_header.append(_aDefult);
        // end head

        //body
        var _body = $('<div class="modal-body">');
        _body.append(o.controlBody);

        //end body

        var _footer = $('<div style="padding: 0px; margin: 10px;" hidden>');
        var _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        dialog.append(content);

        obj.element.append(_modal);
        //end modal

        _modal.on('hide.bs.modal', function () {
            obj._trigger("ActionControlClick", event, 'hide');
        });

    },

    _ShowModalControl: function () {
        var obj = this;
        var o = obj.options;
        var modal = $(obj.bindings[0]).find('.K_Modal' + f_Control);
        modal.modal('show');
    },





    /*
    
        _CreateObjectPrint: function (headBtn, element) {
            var obj = this;
            var o = obj.options;
            var _div = $('<div class="' + 'K_DivModal' + f_Print + '">');
            _div.Print(
                {
                    id: o.id,
                    caption: headBtn.caption,
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
        },
    
    */

    _FirstPage: function () {
        obj = this;
        var o = obj.options;
        var l_PageCount = $(obj.bindings[0]).find('.l_PageCount');
        var rowAllCount = o.data.length;
        o.currentPageIndex = 0;
        l_PageCount.text('1' + ' از ' + (rowAllCount > 0 ? Math.ceil(rowAllCount / o.pageSize) : 1));
        var last = o.pageSize;
        last = last >= rowAllCount ? rowAllCount : last;

        var span_AllCount = $(obj.bindings[0]).find('.span_AllCount');
        span_AllCount.text(rowAllCount);

        if (o.viewData == _viewDataFull)
            obj._CreateBodyFull(0, last);
        else
            obj._CreateBodyLow(0, last);


    },



    _NextPage: function () {
        obj = this;
        var o = obj.options;
        var l_PageCount = $(obj.bindings[0]).find('.l_PageCount');
        var rowAllCount = o.data.length;
        var first = (o.currentPageIndex + 1) * o.pageSize;
        if (first <= rowAllCount) {
            o.currentPageIndex++;
            l_PageCount.text((o.currentPageIndex + 1) + ' از ' + (rowAllCount > 0 ? Math.ceil(rowAllCount / o.pageSize) : 1));
            last = o.pageSize + first;
            last = last >= rowAllCount ? rowAllCount : last;

            if (o.viewData == _viewDataFull)
                obj._CreateBodyFull(first, last);
            else
                obj._CreateBodyLow(first, last);
        }
    },

    _PreviousPage: function () {
        obj = this;
        var o = obj.options;
        var l_PageCount = $(obj.bindings[0]).find('.l_PageCount');
        var rowAllCount = o.data.length;

        var currentIndexTemp = o.currentPageIndex;
        currentIndexTemp--;
        first = currentIndexTemp * o.pageSize;
        if (first <= rowAllCount && currentIndexTemp >= 0) {
            o.currentPageIndex--;
            l_PageCount.text((o.currentPageIndex + 1) + ' از ' + (rowAllCount > 0 ? Math.ceil(rowAllCount / o.pageSize) : 1));
            last = o.pageSize + first;
            last = last >= rowAllCount ? rowAllCount : last;

            if (o.viewData == _viewDataFull)
                obj._CreateBodyFull(first, last);
            else
                obj._CreateBodyLow(first, last);
        }

    },

    _LastPage: function () {
        obj = this;
        var o = obj.options;
        var l_PageCount = $(obj.bindings[0]).find('.l_PageCount');
        var rowAllCount = o.data.length;
        o.currentPageIndex = 0;

        var currentIndexTemp = parseInt(rowAllCount / o.pageSize);
        if (currentIndexTemp >= 0) {
            o.currentPageIndex = currentIndexTemp;
            l_PageCount.text(Math.ceil(o.currentPageIndex + 1) + ' از ' + (rowAllCount > 0 ? Math.ceil(rowAllCount / o.pageSize) : 1));
            first = currentIndexTemp * o.pageSize;
            last = rowAllCount;

            if (o.viewData == _viewDataFull)
                obj._CreateBodyFull(first, last);
            else
                obj._CreateBodyLow(first, last);
        }
    },

    _SetSizePage: function (value) {
        obj = this;
        var o = obj.options;
        o.pageSize = parseInt(value);
        obj._FirstPage();

    },


    _SelectRow: function (e) {
        obj = this;
        var o = obj.options;
        var td = $(e).closest('tr').find("[data-name=" + o.keyField + "]");
        var rowData = [];
        if (td.length > 0) {
            keyValue = $(td[0]).text();
            if (keyValue != "") {
                rowData = o.data.filter(c => c[o.keyField] == keyValue);
            }
        }
        obj._trigger("Select", event, rowData);
    },

    _ActionHeadBtn: function (e) {
        obj = this;
        var actionName = $(e).attr("action-name");
        if (actionName == f_Columns) {
            obj._ShowModalColumn();
        }
        else if (actionName == f_Control) {
            obj._ShowModalControl();
        }
        //if (actionName == f_Print) {
        // obj._ShowObjectPrint();
        //}
        var actionValue = { actionName: actionName, data: [] };
        obj._trigger("ActionHeadClick", event, actionValue);
    },

    _ActionClick: function (e) {
        obj = this;
        var o = obj.options;
        var td = $(e).closest('tr').find("[data-name=" + o.keyField + "]");
        var rowData = '';
        if (td.length > 0) {
            keyValue = $(td[0]).text();
            if (keyValue != "") {
                rowData = o.data.filter(c => c[o.keyField] == keyValue)[0];
            }
        }
        var actionName = $(e).attr("action-name");
        var actionValue = { actionName: actionName, data: rowData }

        obj._trigger("ActionClick", event, actionValue);
    },

    _ExportData: function (data, columns) {
        obj = this;
        var value = { data: data, columns: columns }
        obj._trigger("ExportData", event, value);
    },

    _TdCheckBoxClick: function (e) {
        obj = this;
        var o = obj.options;
        var fieldName = $(e).attr("data-name");
        var visible = 0;
        $(e).is(':checked') == true ? visible = 1 : visible = 0;
        var td = $(e).closest('tr').find("[data-name=" + o.keyField + "]");
        var rowData = null;

        if (td.length > 0) {
            keyValue = $(td[0]).text();
            if (keyValue != "") {
                rowData = o.data.filter(c => c[o.keyField] == keyValue)[0];
                if (rowData != null) {
                    rowData[fieldName] = visible;
                }
            }
        }
        var actionValue = { actionName: "CheckBoxClick", fieldChange: fieldName, data: rowData }
        obj._trigger("ActionClick", event, actionValue);
    },


    _Filter: function () {
        var obj = this;
        var o = obj.options;
        var allData = o.allData;
        var _columns = o.columns.filter(c => c['Visible'] == 1);

        var table = $(obj.bindings[0]).find('.K_DataGrid tfoot tr');

        var dataFilter = [];
        for (var i = 0; i < _columns.length; i++) {
            type = _columns[i].Type;
            code = _columns[i].Code;
            val = table.find("[columnname=" + code + "][mode='search']").val();
            if (val != "" && val != null) {
                dataFilter.add(
                    {
                        "code": code,
                        "value": val,
                        "type": type
                    }
                );
            }
        }



        o.data = allData.filter(item => {
            for (var i = 0; i < dataFilter.length; i++) {
                filter = dataFilter[i];
                if (
                    ((filter.type == type_Farsi || filter.type == type_En) && (!item[filter.code].includes(filter.value)))
                    ||
                    ((filter.type > type_En) && item[filter.code].toString().startsWith(filter.value) == false)
                )
                    return false;
            }

            return true;
        });
    },

    _Sort: function (Column, Mode) {
        var obj = this;
        var o = obj.options;
        var list = o.data;
        var allData = o.allData;
        list.sort(function (a, b) {
            var _a = FixSortName(a[Column]);
            var _b = FixSortName(b[Column]);
            return Mode == mode_Sort_DESC ? (_a < _b ? 1 : -1) : (_a > _b ? 1 : -1);
        });

        allData.sort(function (a, b) {
            var _a = FixSortName(a[Column]);
            var _b = FixSortName(b[Column]);
            return Mode == mode_Sort_DESC ? (_a < _b ? 1 : -1) : (_a > _b ? 1 : -1);
        });

        var table = $(obj.bindings[0]).find('.K_DataGrid thead tr');
        table.find('.iconSort').remove();
        var _th = table.find("[columnname=" + Column + "][mode='header']");
        icon = Mode == "DESC" ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-up";
        var _thIcon = $('<i class="iconSort ' + Mode + ' ' + icon + '"></i>');
        _th.append(_thIcon);
    },

    _Sum: function () {
        var obj = this;
        var o = obj.options;
        var list = o.data;
        //var sumFields = o.sumFields;
        //if (list.length == 0)  return;

        var table = $(obj.bindings[0]).find('.K_DataGrid');

        var _columns = o.columns.filter(c => c['Visible'] == 1 && c['Type'] == type_Currency);

        for (var i = 0; i < _columns.length; i++)
            _columns[i].Sum = 0;

        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < _columns.length; j++) {
                _columns[j].Sum += list[i][_columns[j].Code];
            }
        }

        for (var i = 0; i < _columns.length; i++) {
            var _td = table.find("[columnname=" + _columns[i].Code + "][mode='sum']");
            $(_td).text(NumberToNumberString(parseFloat(_columns[i].Sum)));
        }

        obj._ExportData(list, _columns);
    },

    RefreshTable: function () {
        obj = this;
        var o = obj.options;
        o.allData = [];
        for (var i = 0; i < o.data.length; i++) {
            o.allData.add(o.data[i]);
        }
        obj._FirstPage();

        if (o.sumFields.length > 0) obj._Sum();
    },

    ShowModalControl: function () {
        obj = this;
        var o = obj.options;
        obj._ShowModalControl();
    },

    ShowModalColumn: function () {
        obj = this;
        var o = obj.options;
        obj._ShowModalColumn();
    },

    /*  ShowObjectPrint: function () {
          obj = this;
          var o = obj.options;
          obj._ShowObjectPrint();
      },*/
});

