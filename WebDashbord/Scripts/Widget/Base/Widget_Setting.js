
$.widget("ui.Setting", {
    options: {
        id: null,
        element: null,
        caption: null,
        dataSetting: null,
        externalModal: false,
        baseValue: {
            ace: null,
        },
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        obj._CreateModal();
    },


    _CreateModal: function () {
        var obj = this;
        var o = obj.options;

        //modal
        o.classModal = 'K_Modal' + f_Setting;

        var _modal = $('<div class="modal fade ' + o.classModal + '" tabindex="-1" aria-hidden="true" style="' + (o.externalModal == false ? 'position: absolute;' : '') + '" >');
        o.modalElement = _modal;

        var dialog = $('<div class="modal-dialog" style="max-width: 400px;"></div>');
        _modal.append(dialog);
        var content = $('<div class="modal-content"></div>');

        //head
        var _header = $('<div class="modal-header">');
        var _buttonExit = $(btn_CloseModal);
        _header.append(_buttonExit);
        var title = $('<p class="modal-title" style="width: 90%;text-align: center;">' + o.caption + '</p>');
        _header.append(title);

        var _divBtn = $('<div>')
        var _aDefult = $(btn_Defult)

        o.aDefultElement = _aDefult;
        _divBtn.append(_aDefult);

        _header.append(_divBtn);
        // end head

        //body
        var _body = $('<div class="modal-body">');
        var _divContent = $('<div style="height:400px;overflow:auto;border: 1px #ddd solid;">');
        var _table = $('<table class="table">');
        var _tHead = $('<thead style="cursor: pointer;">');
        var _tbody = $('<tbody style="cursor: default;">');
        var _tr = $('<tr>');

        for (var i = 0; i < o.dataSetting.length; i++) {
            var _tr = $('<tr row="' + i + '" data-name="' + o.dataSetting[i].code + '" data-mode = "' + o.dataSetting[i].mode + '" data-value="' + o.dataSetting[i].value + '">');
            var _tdCaption = $('<td style="width: 0px;">' + o.dataSetting[i].caption + '</td>');

            var _tdValue = $('<td >');
            if (o.dataSetting[i].mode == f_Select) {
                _tdValue.ComboBox(
                    {
                        caption: "",
                        items: o.dataSetting[i].items,
                        value: o.dataSetting[i].value,
                        margin: "0px",
                        sizeSelect: 12,
                        Create: function (e, record) {
                        },
                        Change: function (e, record) {
                            var a = $(this).closest('tr').attr("data-value", record.value);
                        },
                    },
                );
            }
            _tr.append(_tdCaption);
            _tr.append(_tdValue);
            _tbody.append(_tr);
        }

        _table.append(_tHead);
        _table.append(_tbody);

        _divContent.append(_table);
        _body.append(_divContent);


        //end body

        var _footer = $('<div style="padding: 0px; margin-top: 10px;">');
        var _divFooterRow = $('<div class="row">');
        var _divFooterCol = $('<div class="col-md-12">');
        var _btnSave = $('<button type="button" class="btn btn-primary btn-block pull-left" style="background-color: #eb8121 !important; width:40%">ذخیره</button>');

        _divFooterCol.append(_btnSave);
        _divFooterRow.append(_divFooterCol);

        _footer.append(_divFooterRow);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        dialog.append(content);

        obj.element.append(_modal);

        //var _ContentReport = $('<div class="' + o.classModal + '_Content">');
        //o.contentReport = _ContentReport;
        //obj.element.append(_ContentReport);

        //end modal

        //script
        _btnSave.click(function (e) {
            var tr = $(this).closest('.modal-content').find('tr');
            obj._Save(tr);
        });

        _aDefult.click(function (e) {
            var tr = $(this).closest('.modal-content').find('tr');
            obj._Defult(tr);
        });
    },

    _ShowModal: async function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;
        modal.modal('show');
    },


    _Save: function (row) {
        var obj = this;
        var o = obj.options;
        for (var i = 0; i < row.length; i++) {
            //var name = $(row[i]).attr("data-name");
            var value = $(row[i]).attr("data-value");
            o.dataSetting[i].value = value;
        }
        obj._trigger("Save", event, { data: o.dataSetting });

        var modal = o.modalElement;
        modal.modal('hide');
    },

    _Defult: function (row) {
        var obj = this;
        var o = obj.options;
        for (var i = 0; i < row.length; i++) {
            tr = $(row[i]);
            var defult = o.dataSetting[i].defult
            tr.attr("data-value", o.dataSetting[i].value);
            var mode = tr.attr("data-mode");
            if (mode == f_Select) {
                tr.find("select").val(defult);
            }
            o.dataSetting[i].value = defult;
        }
    },

    ShowModalSetting: function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;
        obj._ShowModal();
    },
});
