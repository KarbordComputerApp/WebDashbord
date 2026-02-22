/*
$('.grid-stack-item').on('resizes', function () {
    var node = $(this).data('_gridstack_node');

    if (typeof node == undefined) {
        return;
    }
});
$(window).bind('resize', function () {
    var a = 1;

});

$('.grid-stack-item').resizable({
    stop: function (event, ui) {
        $('#element').height(ui.originalSize.height);
    }
});*/

$.widget("ui.D_TChk", {
    options: {
        id: null,
        uuidSetting: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Setting]
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o.uuidSetting);

        var divReport = $('<div style="padding: 5px;">');
        divReport.TChk({
            uuidSetting: o.uuidSetting,
            baseValue: o.baseValue,
            showControl: setting.showControl,
            getAutoData: setting.getAutoData,
            viewData: setting.viewData,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.TChk("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.TChk("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.TChk("ShowControl");
    },

});

$.widget("ui.D_TChk_Sum", {
    options: {
        id: null,
        uuidSetting: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Setting]
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o.uuidSetting);

        var divReport = $('<div style="padding: 5px;">');
        divReport.TChk_Sum({
            uuidSetting: o.uuidSetting,
            baseValue: o.baseValue,
            showControl: setting.showControl,
            getAutoData: setting.getAutoData,
            viewData: setting.viewData,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.TChk_Sum("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.TChk_Sum("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.TChk_Sum("ShowControl");
    },

});

$.widget("ui.D_TrzFCust", {
    options: {
        id: null,
        uuidSetting: null,
        caption: null,
        isForosh: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting]
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o.uuidSetting);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_TrzFCust({
            uuidSetting: o.uuidSetting,
            baseValue: o.baseValue,
            showControl: setting.showControl,
            getAutoData: setting.getAutoData,
            viewData: setting.viewData,
            isForosh: o.isForosh,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzFCust("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzFCust("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzFCust("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzFCust("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzFCust("ShowColumns");
    },

});

$.widget("ui.D_TarazFasli", {
    options: {
        id: null,
        caption: null,
        position: {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        },
        valueControl: {
            mode: 0,
        },
        baseValue: {
            ace: null,
            group: null,
            sal: null
        },
        visible: true,
        data: null,
        o: null,
        chart: null
    },

    _create: function () {
        var obj = this;
        obj._createModal();
        var o = obj.options;

        var divSum = $('<div class="form-inline" style="padding-top: 10px;width: 100%;">');
        div = $('<div class="form-inline" style="margin-left:auto">');
        h5 = $('<h5>مجموع : </h5> <h5 id="' + o.id + '_LSum" style="padding-right:5px">0</h5>');
        div.append(h5);
        divSum.append(div);

        div = $('<div class="form-inline" style="margin-right:auto">');
        h5 = $('<h5 id="' + o.id + '_LTitle" style="padding-right:5px;color:#dcdcdc">0</h5>');
        div.append(h5);
        divSum.append(div);


        var chart = $('<canvas id="' + o.id + '_Chart" style="width:100%;max-width:700px"></canvas>');
        BoxDashbord_Create(obj, divSum, chart);
        obj._GetData(o.valueControl.mode, o.valueControl.fromDate);
    },

    _createModal: function () {
        var obj = this;
        var options = obj.options;
        body = $('main');
        $("#" + options.id + "_modal").remove();
        //modal
        _modal = $('<div class="modal fade" id="' + options.id + '_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"">');
        dialog = $('<div class="modal-dialog"></div>');
        _modal.append(dialog);
        content = $('<div class="modal-content"></div>');
        dialog.append(content);

        //head
        _header = $('<div class="modal-header">');
        _buttonExit = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="بستن"><i class="bi bi-x-lg"></button >');
        _header.append(_buttonExit);
        title = $('<p class="modal-title" style="width: 90%;text-align: center;">' + options.caption + '</p>');
        _header.append(title);
        _header.append($('<div>'));
        // end head

        //body
        _body = $('<div class="modal-body">');
        _rowBody = $('<div class="row" style="padding-top:20px">');

        _selectMode = $('<select id="' + options.id + '_mode" class="col-6"  style="margin-bottom:2rem">');
        _selectMode.append('<option value="0">فصلی</option>');
        _selectMode.append('<option value="1">ماهانه</option>');
        _selectMode.append('<option value="2">روزانه</option>');

        _rowBody.append(_selectMode);

        _body.append(_rowBody);


        //end body


        _footer = $('<div style="padding: 0px; margin: 10px;">');
        _divFooter1 = $('<div class="row">');
        _divFooter1.append($('<div class="col-md-6">'));

        _divFooter2 = $('<div class="col-md-6">');
        _buttonSave = $(' <button type="button" class="btn btn-primary btn-block" style="background-color: #eb8121 !important;">ذخیره</button>');
        _divFooter2.append(_buttonSave);
        _divFooter1.append(_divFooter2);

        _footer.append(_divFooter1);

        content.append(_header);
        content.append(_body);
        content.append(_footer);

        body.append(_modal);

        //end modal

        //script
        _selectMode.val(options.valueControl.mode);

        _buttonSave.click(function (e) {
            var mode = $("#" + options.id + "_mode").val();
            obj.options.valueControl.mode = mode;
            obj._GetData(mode, options.valueControl.fromDate);

            $("#" + options.id + "_modal").modal('hide');
            obj._Button("SaveModal", obj.options);
        });

        $("#" + options.id + "_modal").on('show.bs.modal', function () {
            $("#" + options.id + "_mode").val(options.valueControl.mode);
        })


    },

    _GetData: function (mode, fromDate) {
        var obj = this;
        var options = obj.options;
        var ctrl = options.valueControl;
        var uri = server + '/api/ReportFct/TrzFDoreh/'; // آدرس گزارش 

        var tObject = {
            azTarikh: fromDate,
            taTarikh: LowDay(0),
            mode: mode,
        };
        ajaxFunction(uri + options.baseValue.ace + '/' + options.baseValue.sal + '/' + options.baseValue.group, 'POST', tObject, false).done(function (response) {
            trzFDoreh_labels = []
            trzFDoreh_data = []
            sum = 0;
            for (var i = 0; i < response.length; i++) {
                trzFDoreh_labels[i] = response[i].docdate;
                trzFDoreh_data[i] = response[i].totalvalue;
                sum += response[i].totalvalue
            }
            $("#" + options.id + "_LSum").text(NumberToNumberString(sum) + ' ریال');
            $("#" + options.id + "_LTitle").text(date_TarazFasli + ' - ' + LowDay(0));


            $("#" + options.id + "_Chart").empty();
            $(options.Chart).remove();
            //if (options.Chart == null) {
            options.Chart = new Chart(options.id + "_Chart", {
                type: 'bar',
                data: {
                    labels: trzFDoreh_labels,
                    datasets: [{
                        label: '',
                        data: trzFDoreh_data,
                        backgroundColor: "#ff2d2d",
                        borderWidth: 1
                    }]
                },
                options: {
                    animation: false,
                    responsive: true,
                    responsiveAnimationDuration: 0,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    value = (value / 1000000).toFixed(0);
                                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return tooltipItem.yLabel.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'ریال';
                            }
                        }
                    }
                }
            });
            //}
            //else {
            /*var dataChart = {
                labels: trzFDoreh_labels,
                datasets: [{
                    label: '',
                    data: trzFDoreh_data,
                    backgroundColor: "#ff2d2d",
                    borderWidth: 1
                }]
            },
                options = {
                    animation: false,
                    responsive: true,
                    responsiveAnimationDuration: 0,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    value = (value / 1000000).toFixed(0);
                                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'M';
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return tooltipItem.yLabel.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'ریال';
                            }
                        }
                    }
                };

            options.Chart.data = dataChart;
            options.Chart.update();*/
            //}


            options.data = response;
            var itemData = dashbordData.find(c => c.id == options.id);
            itemData.valueControl = options.valueControl;
        });
    },

    _Refresh: function () {
        var obj = this;
        var o = obj.options;
        obj._GetData(o.valueControl.mode, o.valueControl.fromDate);
    },

});

$.widget("ui.D_TrzAcc", {
    options: {
        id: null,
        uuidSetting: null,
        caption: null,
        position: [],
        valueControl: {
            mode: 0,
        },
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting]
        //headButton: [f_GetData, f_Print, f_Columns, f_Maximum, f_ShowControl, f_Refresh, f_Setting]
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        var setting = GetSetting(o.uuidSetting);

        var divReport = $('<div style="padding: 10px;">');
        divReport.Report_TrzAcc({
            uuidSetting: o.uuidSetting,
            baseValue: o.baseValue,
            showControl: setting.showControl,
            getAutoData: setting.getAutoData,
            viewData: setting.viewData,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },



    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzAcc("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzAcc("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzAcc("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzAcc("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzAcc("ShowColumns");
    },
});

$.widget("ui.D_Dftr", {
    options: {
        id: null,
        uuidSetting: null,
        caption: null,
        position: [],
        valueControl: {
            mode: 0,
        },
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting]
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        var setting = GetSetting(o.uuidSetting);

        var divReport = $('<div style="padding: 10px;">');

        divReport.Report_Dftr({
            uuidSetting: o.uuidSetting,
            baseValue: o.baseValue,
            showControl: setting.showControl,
            getAutoData: setting.getAutoData,
            viewData: setting.viewData,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },

    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Dftr("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Dftr("ShowSetting");
    },


    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Dftr("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Dftr("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Dftr("ShowColumns");
    },

});

