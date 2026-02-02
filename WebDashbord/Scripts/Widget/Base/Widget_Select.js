
$.widget("ui.Select", {
    options: {
        id: null,
        caption: null,
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        keyField: '',
        keyCaption: '',
        param: null,
        externalModal: false,
        striped: true,
        keyRow: null,
        filter: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var divObject = $('<div class="input-group">');
        var divBtn = $('<div class="input-group-addon">');
        var aBtn = $('<a class="dropdown-toggle">');
        var iconBtn = $('<img src="/Content/img/list/SearchKala.png" class="icon" height="20" width="20" title="انتخاب">');
        aBtn.append(iconBtn);
        divBtn.append(aBtn);

        var divInput = $('<div class="form-group form-float" style="margin-bottom: 5px;">');
        var divInput0 = $('<div class="form-line focused date fix">');
        var input = $('<input class="form-control InputRes" readonly="">');
        var labelInput = $('<label class="form-label">' + o.caption + '</label>');

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
        //var modal = modal.find('.K_Modal' + f_Select);
        await obj._GetData(false);
        obj._CreateGrid();
        modal.modal('show');
    },

    _CloseModal: function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;
        //var modal = modal.find('.K_Modal' + f_Select);
        modal.modal('hide');
    },

    _CreateModal: function () {
        var obj = this;
        var o = obj.options;

        //modal
        o.classModal = 'K_Modal' + f_Select + (o.externalModal == true ? '_' + obj.uuid : '');
        _modal = $('<div class="modal fade ' + o.classModal + '" tabindex="-1" aria-hidden="true">');
        o.modalElement = _modal;
        dialog = $('<div class="modal-dialog"></div>');
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
    },

    _CreateGrid: function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;
        var modalBody = modal.find('.modal-body');

        var columns = columns_Type
        if (o.id == d_kala) {
            columns = columns_TypeKala;
        }
        else if (o.id == d_status) {
            columns = columns_TypeStatus;
        }

        if (o.filter != null) {
            o.data = baseData[o.id].filter(item => {
                for (var i = 0; i < o.filter.length; i++) {
                    if (o.filter[i].value == -1) {
                        return true
                    }
                    else if (o.filter[i].act == '<=') {
                        return item[o.filter[i].key] <= o.filter[i].value == true
                    }
                    else
                        return item[o.filter[i].key].toString().startsWith(o.filter[i].value) == true
                }
            });
        }
        else
            o.data = baseData[o.id];


        modalBody.Table(
            {
                data: o.data,
                columns: columns,
                sort: 'Code',
                sortMode: '',
                pageCount: 0,
                pageSize: 10,
                striped: o.striped,
                keyRow: o.keyRow,
                //currentPageIndex: 0,
                keyField: o.keyField,
                isTableFix: false,
                height: '350px',
                Select: function (e, record) {
                    obj._SetResultModal(record);
                },
            },
        );
        modalBody.Table("RefreshTable");
    },

    _SetResultModal: function (record) {
        var obj = this;
        var o = obj.options;
        //var modal = o.modalElement;

        var inputRes = $(obj.bindings[0]).find('.InputRes');
        res = o.keyCaption == "" ? record[o.keyField] : '(' + record[o.keyField] + ') ' + record[o.keyCaption];
        $(inputRes).val(res);

        var list = { data: record, dataString: record[o.keyField] };

        obj._trigger("Select", event, list);
    },


    _GetData: async function (refresh) {
        var obj = this;
        var o = obj.options;
        await GetData(o, refresh, o.param);
    },



    _Button: function (name, item) {
        this._trigger(name, null, item);
    },


});



