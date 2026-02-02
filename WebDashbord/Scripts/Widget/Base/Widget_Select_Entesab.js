
$.widget("ui.Select_Entesab", {
    options: {
        id: null,
        caption: null,
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        keyRow: null,
        keyField: '',
        keyCaption: '',
        selected: [],
        param: null,
        filter: null,
        objGrid: null,
        striped: true,
        data: [],
        externalModal: false
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        o.o = o;
        var divObject = $('<div class="input-group">');
        var divBtn = $('<div class="input-group-addon">');
        var aBtn = $('<a class="dropdown-toggle">');
        var iconBtn = $('<img src="/Content/img/list/SearchKala.png" class="icon" height="20" width="20" title="انتخاب">');
        aBtn.append(iconBtn);
        divBtn.append(aBtn);

        var divInput = $('<div class="form-group form-float" style="margin-bottom: 5px;">');
        var divInput0 = $('<div class="form-line focused date fix">');
        var input = $('<input class="form-control InputRes" readonly=""></input>');
        var labelInput = $('<label class="form-label">' + o.caption + '</label>');

        var lenDefault = o.selected.length;
        input.val(lenDefault > 0 ? lenDefault + " مورد انتخاب شده" : "همه موارد");

        divInput0.append(input);
        divInput0.append(labelInput);
        divInput.append(divInput0);
        divObject.append(divBtn);
        divObject.append(divInput);

        obj.element.append(divObject);
        obj._CreateModal();

        aBtn.click(function (e) {
            obj._ShowModal();
        });
    },


    _ShowModal: async function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;

        await obj._GetData(false);
        obj._CreateGrid();

        // table select
        var bodySelect = modal.find('.tBodySelect');
        if (bodySelect.length > 0) {
            bodySelect.empty();
        }
        var listSelect = o.selected;
        if (listSelect.length > 0) {
            for (var i = 0; i < listSelect.length; i++) {
                var _tr = $('<tr>');
                var value = listSelect[i].code;
                _tdCode = $('<td data-name="code" data-value="' + value + '">' + value + '</td>');
                _tr.append(_tdCode);
                if (o.keyCaption != "") {
                    value = listSelect[i].name;
                    _tdName = $('<td data-name="name" data-value="' + value + '" class="ellipsis">' + value + '</td>');
                    _tr.append(_tdName);
                }
                bodySelect.append(_tr);
            }
        }
        modal.modal('show');
    },

    _CloseModal: function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;
        modal.modal('hide');
    },

    _CreateModal: function () {
        var obj = this;
        var o = obj.options;

        //modal
        o.classModal = 'K_Modal' + f_Select + (o.externalModal == true ? '_' + obj.uuid : '');
        _modal = $('<div class="modal fade ' + o.classModal + '" tabindex="-1" aria-hidden="true">');
        o.modalElement = _modal;
        dialog = $('<div class="modal-dialog" style="max-width:1000px"></div>');
        _modal.append(dialog);
        content = $('<div class="modal-content"></div>');

        //head
        _header = $('<div class="modal-header">');
        _buttonExit = $('<button type="button" class="close" aria-label="Close" title="بستن"><span aria-hidden="true">×</span></button >');
        _header.append(_buttonExit);
        title = $('<p class="modal-title" style="width: 90%;text-align: center;">لیست ' + o.caption + '</p>');
        _header.append(title);

        _aRefresh = $('<a> <img src="/Content/img/list/streamline-icon-synchronize-arrows-1@48x48.png" width="20" height="20" style="margin-left: 10px;" title="به روز رسانی"></a>')
        _header.append(_aRefresh);

        // end head

        //body
        _body = $('<div class="modal-body">');
        _divRow = $('<div class="row">');
        _divGrid = $('<div class="col-md-7 K_DivGrid">');
        _divGridSelect = $('<div class="col-md-5 K_DivGridSelect">');


        _divRowSelect = $('<div class="row">');

        _divColSelect = $('<div class="col-md-1">');
        _divCentered = $('<div class="row centered">');
        _divHeightSelect = $('<div style="height:130px; width:20px"></div>');
        _aAddAll = $('<a style="height:18px;padding-right: 3px;">');
        _imgAdd = $('<img src="/Content/img/list/streamline-icon-navigation-last.png" style="width:22px;height:18px;">');
        _aAddAll.append(_imgAdd);
        _divHeightSelect1 = $('<div style="height:60px"></div>');
        _aDelAll = $('<a style="height:18px;padding-right: 3px;">');
        _imgDell = $('<img src="/Content/img/list/streamline-icon-navigation-first.png" style="width:22px;height:18px;">');
        _aDelAll.append(_imgDell);
        _divCentered.append(_divHeightSelect);
        _divCentered.append(_aAddAll);
        _divCentered.append(_divHeightSelect1);
        _divCentered.append(_aDelAll);
        _divColSelect.append(_divCentered);
        _divRowSelect.append(_divColSelect);


        _divColSelect = $('<div class="col-md-11">');
        _divTableSelect = $('<div style="height:350px;overflow:auto;border: 1px #ddd solid;">');
        _tableSelect = $('<table class="table table-hover table-striped tableFixList">');
        _theadSelect = $('<thead style="cursor: pointer;">');
        _trSelect = $('<tr>');

        if (o.keyCaption != "") {
            _thCodeSelect = $('<th>کد</th>');
            _trSelect.append(_thCodeSelect);
        }

        _thNameSelect = $('<th>نام</th>');
        _trSelect.append(_thNameSelect);

        _tbodySelect = $('<tbody class="tBodySelect" style="cursor: default;">');

        _theadSelect.append(_trSelect);
        _tableSelect.append(_theadSelect);
        _tableSelect.append(_tbodySelect);
        _divTableSelect.append(_tableSelect);
        _divColSelect.append(_divTableSelect);
        _divRowSelect.append(_divColSelect);

        _divGridSelect.append(_divRowSelect);

        _divRow.append(_divGrid);
        _divRow.append(_divGridSelect);
        _body.append(_divRow);

        //end body

        _footer = $('<div style="padding: 0px; margin: 10px;" hidden>');
        _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        dialog.append(content);

        if (o.externalModal) {
            $(widgetPublic).append(_modal);
        }
        else {
            obj.element.append(_modal);
        }

      

        //end modal

        //script
        _buttonExit.click(function (e) {
            obj._CloseModal();
        });

        _aAddAll.click(function (e) {
            obj._AddAll();
        });

        _aDelAll.click(function (e) {
            obj._DelAll();
        });

        _aRefresh.click(function (e) {
            Swal.fire({
                title: mes_Refresh,
                text: translate("لیست " + o.caption) + " " + translate("به روز رسانی شود ؟"),
                type: 'info',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                cancelButtonText: text_No,
                confirmButtonColor: '#d33',
                confirmButtonText: text_Yes
            }).then((result) => {
                if (result.value) {
                    obj._GetData(true);
                }
            })
        });

        _modal.on('hide.bs.modal', function () {
            obj._SetResultModal();
        });

    },

    _SetResultModal: function (record) {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;
        var tr = modal.find('.tBodySelect tr');
        var inputRes =  $(obj.bindings[0]).find('.InputRes');
        res = tr.length > 0 ? tr.length + " مورد انتخاب شده" : "همه موارد";

        listRes = [];
        stringRes = '';
        for (var i = 0; i < tr.length; i++) {
            var td = $(tr[i]).find('td');
            var code = $(td[0]).attr('data-value');
            var name = td.length > 1 ? $(td[1]).attr('data-value') : code;
            listRes.push({ "code": code, "name": name });
            stringRes += code + "*";
        }
        stringRes = stringRes.substring(0, stringRes.length - 1);
        o.selected = listRes;
        var list = { data: listRes, dataString: stringRes };
        $(inputRes).val(res);
        obj._trigger("Select", null, list);
    },

    _CreateGrid: function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;
        var divGrid = modal.find('.K_DivGrid');

        o.objGrid = divGrid;
        var columns = columns_Type
        if (o.id == d_kala) {
            columns = columns_TypeKala;
        }
        else if (o.id == d_status) {
            columns = columns_TypeStatus;
        }
        action = [
            { code: "AddRowEntesab", name: "افزودن", icon: "/Content/img/list/streamline-icon-navigation-next.png" }
        ];


        if (o.filter != null) {
            o.data = baseData[o.id].filter(item => {
                for (var i = 0; i < o.filter.length; i++) {
                    if (o.filter[i].act == '<=') {
                        return item[o.filter[i].key] <= o.filter[i].value == true
                    }
                    else
                        return item[o.filter[i].key].toString().startsWith(o.filter[i].value) == true
                }
            });
        }
        else
            o.data = baseData[o.id];



        divGrid.Table(
            {
                data: o.data,
                columns: columns,
                headBtn: [],
                headBtnDefult: [],
                sort: 'Code',
                sortMode: '',
                pageCount: 0,
                pageSize: 10,
                keyField: o.keyField,
                isTableFix: false,
                keyRow: o.keyRow,
                height: '350px',
                striped: o.striped,
                action: action,
                actionDropdown: false,
                ActionClick: function (e, item) {
                    if (item.actionName == "AddRowEntesab") {
                        obj._AddRowEntesab(item.data);
                    }

                },
            },
        );

        divGrid.Table("RefreshTable");

    },

    _AddRowEntesab: function (record) {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;
        var body = modal.find('.tBodySelect');

        var value = record[o.keyField];
        var findRow = body.find("[data-value=" + value + "]");

        if (findRow.length == 0) {
            var _tr = $('<tr>');
            _tdCode = $('<td data-name="code" data-value="' + value + '">' + value + '</td>');
            _tr.append(_tdCode);
            if (o.keyCaption != "") {
                value = record[o.keyCaption];
                _tdName = $('<td data-name="name" data-value="' + value + '" class="ellipsis">' + value + '</td>');
                _tr.append(_tdName);
            }
            body.append(_tr);
        }
    },

    _AddAll: function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;
        var list = o.data;
        var body = modal.find('.tBodySelect');
        if (body.length > 0) {
            body.empty();
        }

        for (var i = 0; i < list.length; i++) {
            var _tr = $('<tr>');

            value = list[i][o.keyField];
            _tdCode = $('<td data-name="code" data-value="' + value + '" >' + value + '</td>');
            _tr.append(_tdCode);
            if (o.keyCaption != "") {
                value = list[i][o.keyCaption];
                _tdName = $('<td data-name="name" data-value="' + value + '" class="ellipsis">' + value + '</td>');
                _tr.append(_tdName);
            }

            body.append(_tr);
        }
    },

    _DelAll: function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;
        var body = modal.find('.tBodySelect');
        if (body.length > 0) {
            body.empty();
        }
    },


    _GetData: async function (refresh) {
        var obj = this;
        var o = obj.options;
        await GetData(o, refresh, o.param);
    },


    _Button: function (name, item) {
        this._trigger(name, null, item);
    },

    RefreshData: function () {
        obj = this;
        var o = obj.options;
        //o.objGrid.Table("RefreshTable");

        //obj._CreateGrid();
    },

});



