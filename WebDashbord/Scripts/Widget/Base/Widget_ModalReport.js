$.widget("ui.ModalReport", {
    options: {
        uuid: 0,
        reportId: null,
        caption: null,
        baseValue: [],
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        showControl: false,
        getAutoData: true,
        viewData: _viewDataFull,
        objects: null,
        element: null,
        elementModal: null,
        externalModal: true,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var _modal = $('<div class="modal fade K_Modal' + f_Report + '" tabindex="-1" role="dialog" aria-labelledby="formModal" aria-hidden="true">');
        var dialog = $('<div class="modal-dialog" style="max-width: fit-content;"></div>');
        _modal.append(dialog);
        var content = $('<div class="modal-content"></div>');

        //head
        var _header = $('<div class="modal-header" style="min-width: 300px">');

        var div = $('<div class="headButton">');

        if (o.headButton != null) {
            for (var i = 0; i < o.headButton.length; i++) {
                var btn;
                if (o.headButton[i] == f_Print) {
                    btn = $('<a action-name="' + o.headButton[i] + '" style="padding-left: 5px;" title="چاپ"><span class="bi bi-printer"></a>');
                }
                else if (o.headButton[i] == f_Columns) {
                    btn = $('<a action-name="' + o.headButton[i] + '" style="padding-left: 5px;" title="تنظیم ستون ها"><span class="bi bi-list-check"></a>');
                }
                else if (o.headButton[i] == f_Refresh) {
                    btn = $('<a action-name="' + o.headButton[i] + '" style="padding-left: 5px;" title="بروز رسانی"><span class="bi bi-arrow-repeat"></a>');
                }
                else if (o.headButton[i] == f_Setting) {
                    btn = $('<a action-name="' + o.headButton[i] + '" style="padding-left: 5px;" title="تنظیمات"><span class="bi bi-gear"></a>');
                }
                if (btn != null) {
                    div.append(btn);
                }
            }
        }

        var b_Maximum = $('<a action-name="Maximum" style="padding-left: 5px;" title="تغییر سایز"><i class="bi bi-window"></a>');
        var b_ShowControl = $('<a action-name="ShowControl" style="padding-left: 5px;" title="کنترل گزارش"><i class="bi bi-caret-down"></a>');

        div.append(b_Maximum);
        div.append(b_ShowControl);

        var h4 = $('<h4 class="modal-title" style="">' + o.caption + '</h4>');
        var _buttonExit = $('<a title="بستن" data-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></button >');
        _header.append(_buttonExit);
        _header.append(h4);
        _header.append(div);
        // end head

        //body
        var _body = $('<div class="modal-body" style="height: 450px;overflow:auto;max-width: 1000px;">');
        //end body

        content.append(_header);
        content.append(_body);
        dialog.append(content);

        var paramReport = {
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl,
            getAutoData: o.getAutoData,
            viewData: o.viewData,
            objects: o.objects,
            externalModal: o.externalModal,
        }

        if (o.reportId == 'Dftr') {
            _body.Report_Dftr(paramReport);
        }
        else if (o.reportId == 'ADocR') {
            _body.Report_ADocR(paramReport);
        }
        else if (o.reportId == 'TrzAcc') {
            _body.Report_TrzAcc(paramReport);
        }


        _modal.modal('show');


        o.element = _body;
        o.elementModal = _modal;
        _modal.on('hide.bs.modal', function () {
            o.elementModal.remove();
        });

        var headButton = _header.find('.headButton a');
        headButton.click(function (e) {
            var actionName = $(this).attr("action-name");
            if (actionName == f_ShowControl) {
                BoxDashbord_ShowControl(obj);
            }
            else if (actionName == f_Refresh) {
                BoxDashbord_Refresh(obj);
            }
            else if (actionName == f_Setting) {
                BoxDashbord_Setting(obj);
            }
            else if (actionName == f_Print) {
                BoxDashbord_Print(obj);
            }
            else if (actionName == f_Columns) {
                BoxDashbord_Columns(obj);
            }
            else if (actionName == f_Maximum) {

            } else if (actionName == f_Maximum) {

            }
        });

        _buttonExit.click(function (e) {
            obj._CloseModal();
        });

    },

    _CloseModal: function () {
        var obj = this;
        var o = obj.options;
        var modal = o.elementModal;
        modal.modal('hide');
    },

    _Refresh: function () {
        var obj = this;
        var o = obj.options;
        if (o.reportId == 'Dftr') {
            o.element.Report_Dftr("Refresh");
        }
        else if (o.reportId == 'ADocR') {
            o.element.Report_ADocR("Refresh");
        }
        else if (o.reportId == 'TrzAcc') {
            o.element.Report_TrzAcc("Refresh");
        }
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options;
        if (o.reportId == 'Dftr') {
            o.element.Report_Dftr("ShowSetting");
        }
        else if (o.reportId == 'ADocR') {
            o.element.Report_ADocR("ShowSetting");
        }
        else if (o.reportId == 'TrzAcc') {
            o.element.Report_TrzAcc("ShowSetting");
        }
    },


    _ShowControl: function () {
        var obj = this;
        var o = obj.options;
        if (o.reportId == 'Dftr') {
            o.element.Report_Dftr("ShowControl");
        }
        else if (o.reportId == 'ADocR') {
            o.element.Report_ADocR("ShowControl");
        }
        else if (o.reportId == 'TrzAcc') {
            o.element.Report_TrzAcc("ShowControl");
        }
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options;
        if (o.reportId == 'Dftr') {
            o.element.Report_Dftr("ShowPrint");
        }
        else if (o.reportId == 'ADocR') {
            o.element.Report_ADocR("ShowPrint");
        }
        else if (o.reportId == 'TrzAcc') {
            o.element.Report_TrzAcc("ShowPrint");
        }
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options;
        if (o.reportId == 'Dftr') {
            o.element.Report_Dftr("ShowColumns");
        }
        else if (o.reportId == 'ADocR') {
            o.element.Report_ADocR("ShowColumns");
        }
        else if (o.reportId == 'TrzAcc') {
            o.element.Report_TrzAcc("ShowColumns");
        }
    },

});
