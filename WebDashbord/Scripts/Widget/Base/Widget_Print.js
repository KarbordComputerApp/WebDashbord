
$.widget("ui.Print", {
    options: {
        id: null,
        element: null,
        caption: null,
        data: null,
        columns: null,
        printVariable: null,
        baseValue: {
            ace: null,
        },
        externalModal: false,
        striped: true,
        filter: null,
        report: null,
        viewer: null,
        optionPrint: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        obj._CreateModal();
        obj._CreateModalSetting();
    },


    _CreateModal: function () {
        var obj = this;
        var o = obj.options;

        //modal
        o.classModal = 'K_Modal' + f_Print;

        var _modal = $('<div class="modal fade ' + o.classModal + '" tabindex="-1" aria-hidden="true" style="position: absolute;">');
        o.modalElement = _modal;

        var dialog = $('<div class="modal-dialog" style="max-width: 400px;"></div>');
        _modal.append(dialog);
        var content = $('<div class="modal-content"></div>');

        //head
        var _header = $('<div class="modal-header">');
        var _buttonExit = $('<a data-dismiss="modal" aria-label="Close" title="بستن"><i class="bi bi-x-lg"></a>');
        _header.append(_buttonExit);
        var title = $('<p class="modal-title" style="width: 90%;text-align: center;">' + o.caption + '</p>');
        _header.append(title);

        var _divBtn = $('<div style="position: absolute;left: 0px;">')
        var _aSetting = $('<a style="margin-left: 5px;" title="تنظیمات فرم چاپ"><i class="bi bi-gear"></a>')
        var _aRefresh = $(btn_Refresh);
        o.aSettingElement = _aSetting;
        _divBtn.append(_aSetting);
        _divBtn.append(_aRefresh);

        _header.append(_divBtn);
        // end head

        //body
        var _body = $('<div class="modal-body">');
        o.objGrid = _body;
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

        //var _ContentReport = $('<div class="' + o.classModal + '_Content">');
        //o.contentReport = _ContentReport;
        //obj.element.append(_ContentReport);

        //end modal

        //script
        _buttonExit.click(function (e) {

        });

        _aSetting.click(function (e) {
            obj._ShowModalSetting();
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
                    obj._GetDataPrint(true);
                    o.objGrid.Table("option", "data", o.dataForms);
                    o.objGrid.Table("RefreshTable");
                    o.objGridSetting.Table("option", "data", o.dataFormsSetting);
                    o.objGridSetting.Table("RefreshTable");
                }
            })
        });
    },

    _ShowModal: async function () {
        var obj = this;
        var o = obj.options;
        await obj._GetDataPrint(false);

        var modal = o.modalElement;
        //var data = o.dataForms.filter(s => s.Selected == "1");

        var modalBody = o.objGrid;

        modalBody.Table(
            {
                data: o.dataForms,
                columns: columns_TypePrint,
                sort: 'code',
                sortMode: '',
                pageCount: 0,
                pageSize: 10,
                striped: true,
                keyRow: null,
                keyField: 'code',
                isTableFix: false,
                height: '350px',
                Select: function (e, record) {
                    obj._PrintPreview(record);
                },
            },
        );
        modalBody.Table("RefreshTable");

        modal.modal('show');
    },

    _GetDataPrint: async function (refresh) {
        var obj = this;
        var o = obj.options;

        if (o.dataForms == null || refresh) {
            var url = CreateUrl(o.baseValue.ace, null, null, 'PrintForms') //آدرس فرم چاپ
            var object = {
                LockNumber: lockNumber,
                mode: "Report" + o.id
            }
            await ajaxFunction(url, 'POST', object).done(function (list) {
                o.dataForms = list.filter(s => s.Selected == "1");
                o.dataFormsSetting = list;
            });
        }
    },

    _PrintPreview: function (item) {
        var obj = this;
        var o = obj.options;
        obj._CreateViewer(item.namefa, item.isPublic);
        obj._SetReport(o.data, item.Data, o.printVariable);
    },


    _CreateModalSetting: function () {
        var obj = this;
        var o = obj.options;

        //modal
        o.classModal = 'K_Modal' + f_Print + '_Setting';

        var _modal = $('<div class="modal fade ' + o.classModal + '" tabindex="-1" aria-hidden="true" style="position: absolute;">');
        o.modalSettingElement = _modal;

        var dialog = $('<div class="modal-dialog" style="max-width: 400px;"></div>');
        _modal.append(dialog);
        var content = $('<div class="modal-content"></div>');

        //head
        var _header = $('<div class="modal-header">');
        var _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><i class="bi bi-x-lg"></button >');
        _header.append(_buttonExit);
        var title = $('<p class="modal-title" style="width: 90%;text-align: center;">تنظیمات ' + o.caption + '</p>');
        _header.append(title);

        var _divBtn = $('<div style="position: absolute;left: 0px;">')
        var _aAdd = $('<a style="margin-left: 5px;" title="جدید فرم چاپ" ><i class="bi bi-plus-circle"></a>')
        var _aRefresh = $(btn_Refresh);
        _divBtn.append(_aAdd);
        _divBtn.append(_aRefresh);

        _header.append(_divBtn);
        // end head

        //body
        var _body = $('<div class="modal-body">');
        o.objGridSetting = _body;
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

        //script

        _aAdd.click(function (e) {
            obj._AddReport();
        });

        _modal.on('hide.bs.modal', function () {
            obj._GetDataPrint(true);
            o.objGrid.Table("option", "data", o.dataForms);
            o.objGrid.Table("RefreshTable");
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
                    obj._GetDataPrint(true);
                    o.objGridSetting.Table("option", "data", o.dataFormsSetting);
                    o.objGridSetting.Table("RefreshTable");
                }
            })
        });
    },



    _ShowModalSetting: async function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalSettingElement;

        var modalBody = o.objGridSetting;

        var action = [
            { code: "View", name: "نمایش", icon: "/Content/img/view.svg" },
            { code: "Delete", name: "حذف", icon: "/Content/img/list/streamline-icon-bin-2@48x48.png" },
        ];

        modalBody.Table(
            {
                data: o.dataFormsSetting,
                columns: columns_TypePrint_Setting,
                sort: 'code',
                sortMode: '',
                pageCount: 0,
                pageSize: 10,
                striped: true,
                keyRow: null,
                keyField: 'code',
                isTableFix: false,
                height: '350px',
                action: action,
                actionDropdown: false,
                ActionClick: function (e, item) {
                    if (item.actionName == "CheckBoxClick") {
                        obj._SaveSettingPrintForm(item.fieldChange, item.data);
                    }
                    else if (item.actionName == "Delete") {
                        obj._DeletePrintForm(item.data);
                    }
                    else if (item.actionName == "View") {
                        obj._PrintPreview(item.data)
                    }
                }
            },
        );
        modalBody.Table("RefreshTable");
        modal.modal('show');
    },


    _AddReport: function (item) {
        var obj = this;
        var o = obj.options;
        obj._CreateViewer('فرم جدید', false);
        obj._SetReport(o.data, '', o.printVariable);
    },


    _CreateViewer: function (printName, printPublic) {
        var obj = this;
        var o = obj.options;

        if (o.optionPrint == null) {
            Stimulsoft.Base.Localization.StiLocalization.addLocalizationFile("/Content/Report/Lang/fa.xml", true, "persion (fa)");
            Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BZiba.ttf", "Karbord_Ziba");
            Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BZAR.ttf", "Karbord_ZAR");
            Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BYEKAN.ttf", "Karbord_YEKAN");
            Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BTITRBD.ttf", "Karbord_TITRBD");
            Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("/Content/fonts/BNAZANIN.ttf", "Karbord_NAZANIN");
            o.optionPrint = new Stimulsoft.Viewer.StiViewerOptions();
            o.viewer = new Stimulsoft.Viewer.StiViewer(o.optionPrint, "StiViewer", false);

            o.optionPrint.appearance.showSystemFonts = false;
            o.optionPrint.height = "100%";
            o.optionPrint.appearance.fullScreenMode = true;
            o.optionPrint.appearance.scrollbarsMode = true;
            o.optionPrint.toolbar.showSaveButton = true;

            o.optionPrint.toolbar.showDesignButton = sessionStorage.UserAdmin == 'true';

            if (sessionStorage.UserAdmin == 'true') {
                $(o.aSettingElement).attr('style', 'display: unset');
            } else {
                $(o.aSettingElement).attr('style', 'display: none');
            }

            o.optionPrint.toolbar.showFullScreenButton = false;

            o.optionPrint.toolbar.printDestination = Stimulsoft.Viewer.StiPrintDestination.Direct;
            o.optionPrint.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;
            o.optionPrint.toolbar.zoom = 100;
            o.optionPrint.toolbar.showCloseButton = true;
            o.optionPrint.toolbar.showSendEmailButton = true;

            o.viewer.onEmailReport = function (args) {
                sendMail(args.settings.email, args.settings.subject, args.settings.message, args.data, args.format);
            }

            o.report = new Stimulsoft.Report.StiReport();
            o.viewer.onDesignReport = function (e) {
                obj._CreateDesigner(printName, printPublic);
            };
            o.viewer.renderHtml("viewerContentNew");

            var userButton = o.viewer.jsObject.SmallButton("userButton", "خروج");

            userButton.action = function () {
                $("#modal-ReportNew").modal('hide');
            }

            var toolbarTable = o.viewer.jsObject.controls.toolbar.firstChild.firstChild;
            var buttonsTable = toolbarTable.rows[0].firstChild.firstChild;
            var userButtonCell = buttonsTable.rows[0].insertCell(0);
            userButtonCell.className = "stiJsViewerClearAllStyles";
            userButtonCell.appendChild(userButton);
        }
    },

    _CreateDesigner: async function (pName, isPublic) {
        var obj = this;
        var o = obj.options;

        o.viewer.visible = false;
        o.designer = null;
        o.options = new Stimulsoft.Designer.StiDesignerOptions();
        o.options.appearance.fullScreenMode = true;
        o.options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;

        o.designer = new Stimulsoft.Designer.StiDesigner(o.options, "StiDesigner", false);
        o.designer.renderHtml("designerContentNew");

        o.designer.onExit = function (e) {
            this.visible = false;
            o.viewer.visible = false;
            $("#modal-ReportNew").modal('hide');
        }

        o.designer.onSaveReport = async function (e) {
            if (isPublic == 0) {
                var jsonStr = e.report.saveToJsonString();
                await obj._SavePrintForm(e.fileName, jsonStr)
            }
            else {
                alert('فرم های چاپ عمومی امکان تغییر را ندارند');
            }
        }

        o.designer.onSaveAsReport = async function (e) {
            var jsonStr = e.report.saveToJsonString();
            await obj._TestSavePrintForm(e.fileName);
            if (o.resTestSavePrintForm == "FindFile") {
                alert("نام گزارش تکراری است و امکان ذخیره وجود ندارد");
            }
            else {
                await obj._SavePrintForm(e.fileName, jsonStr);
            }
        };

        o.report._reportFile = pName == null ? 'فرم چاپ' : pName;
        o.designer.report = o.report;
        o.designer.visible = true;
    },

    _SetReport: function (reportObject, reportFile, variablesObject) {
        var obj = this;
        var o = obj.options;

        o.report = new Stimulsoft.Report.StiReport();
        o.report.loadFile(reportFile);

        o.report.dictionary.databases.clear();
        var dataSet = new Stimulsoft.System.Data.DataSet("Database");
        dataSet.readJson('{"Data":' + JSON.stringify(reportObject) + '}');
        o.report.regData(dataSet.dataSetName, "", dataSet);

        variablesDataSet = new Stimulsoft.System.Data.DataSet("variables");
        variablesReport = '{"variables":[' + JSON.stringify(variablesObject) + ']}';
        variablesDataSet.readJson(variablesReport);
        o.report.regData(variablesDataSet.dataSetName, "", variablesDataSet);


        titlesObject = '';
        for (var i = 0; i < o.columns.length; i++) {
            if (o.columns[i].Code != "") {
                titlesObject += '"' + o.columns[i].Code + '":"' + o.columns[i].Name + '",';
            }
        }

        var titlesDataSet = new Stimulsoft.System.Data.DataSet("Titles");
        var titlesReport = '{"Titles":[{' + titlesObject + '}]}';
        titlesDataSet.readJson(titlesReport);
        o.report.regData(titlesDataSet.dataSetName, "", titlesDataSet);

        o.report.dictionary.synchronize();

        o.viewer.report = o.report;
        o.viewer.visible = true;
        $('#modal-ReportNew').modal('show');

        o.viewer.onExit = function (e) {
            this.visible = false;
        }
    },

    _TestSavePrintForm: async function (name) {
        var obj = this;
        var o = obj.options;
        var url = CreateUrl(o.baseValue.ace, null, null, 'TestSavePrintForm') //آدرس تست فرم چاپ
        var object = {
            LockNumber: lockNumber,
            mode: "Report" + o.id,
            Name: name,
        }
        await ajaxFunction(url, 'POST', object).done(function (list) {
            o.resTestSavePrintForm = list;
        });
    },

    _SavePrintForm: async function (name, data) {
        var obj = this;
        var o = obj.options;
        var url = CreateUrl(o.baseValue.ace, null, null, 'SavePrintForm') //آدرس ذخیره فرم چاپ
        var object = {
            LockNumber: lockNumber,
            mode: "Report" + o.id,
            Name: name,
            Data: data
        }
        await ajaxFunction(url, 'POST', object).done(function (list) {

        });
    },


    _DeletePrintForm: function (data) {
        var obj = this;
        var o = obj.options;

        Swal.fire({
            title: mes_Delete,
            text: translate("آیا فرم چاپ انتخابی حذف شود"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            cancelButtonText: text_No,
            allowOutsideClick: false,
            confirmButtonColor: '#d33',
            confirmButtonText: text_Yes
        }).then((result) => {
            if (result.value) {
                var url = CreateUrl(o.baseValue.ace, null, null, 'DeletePrintForm'); //آدرس حذف فرم چاپ
                var object = {
                    LockNumber: lockNumber,
                    Address: data.address
                }
                ajaxFunction(url, 'POST', object).done(function (list) {
                    obj._GetDataPrint(true);
                    o.objGridSetting.Table("option", "data", o.dataFormsSetting);
                    o.objGridSetting.Table("RefreshTable");
                });
            }
        })
    },

    _SaveSettingPrintForm: async function (mode, data) {
        var obj = this;
        var o = obj.options;
        var url = "";
        if (mode == "Selected")
            url = CreateUrl(o.baseValue.ace, null, null, 'SelectedPrintForm'); //آدرس ذخیره فعال کردن فرم چاپ
        else if (mode == "accessGhimat")
            url = CreateUrl(o.baseValue.ace, null, null, 'SelectedAccessGhimatPrintForm'); //آدرس ذخیره فعال کردن قیمت  فرم چاپ

        var object = {
            LockNumber: lockNumber,
            Address: data.address,
            isPublic: data.isPublic,
        }
        await ajaxFunction(url, 'POST', object).done(function (list) {

            if (data == "FindFile") {
                showNotification(translate('فایلی با نام مشابه وجود دارد و امکان تغییر نیست'), 0);
            }

        });
    },

    ShowModalPrint: function () {
        var obj = this;
        var o = obj.options;
        var modal = o.modalElement;

        obj._ShowModal();
    },

});
