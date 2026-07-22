$.widget("ui.TrzFKala_Chart", {
    options: {
        rprtId: 'TarazFasli_Chart',
        uuid: null,
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
        // exports
        columns: null,
        controlData: null,
        data: null
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        var param = dataGroup[o.baseValue.group][o.baseValue.sal]["params"];
        o.objects = obj._SetObjects(param);
        var divContent = $('<div style="background-color: white;">');
        //head
        var divHeader = $('<div class="row" style="padding:10px">');
        var h2 = $('<h5>' + o.caption + '</h2>');
        divHeader.append(h2);

        var divSum = $('<div class="form-inline" style="padding: 5px;width: 100%;">');
        div = $('<div class="form-inline" style="margin-left:auto">');
        h5 = $('<h5>مجموع : </h5>');
        var _Sum = $('<h5 class="l_Sum" style="padding-right:5px">0</h5>');

        //var _Date = $('<h5 class="l_Date" style="padding-right:5px">0</h5>');

        div.append(h5);
        div.append(_Sum);
        //div.append(_Date);
        divSum.append(div);

        //Grid
        var divGrid = $('<div>');
        var chart = $('<canvas style="width:max-content;"></canvas>');
        o.objChart = chart;
        divGrid.append(chart);

        o.objGrid = divGrid;

        if (o.caption != null) {
            divContent.append(divHeader);
        }

        divContent.append(obj._CreateControl());
        divContent.append(divSum);
        divContent.append(divGrid);
        obj.element.append(divContent);

        CreateObjectSetting(obj);
        if (o.getAutoData) obj._GetData();
    },


    _CreateControl: function () {
        var obj = this;
        var o = obj.options;
        var c = {};
        var divControl = $('<div style="display: ' + (o.showControl ? "block" : "none") + ';">');
        o.divControl = divControl;

        var divRow = $('<div class="form-inline" style="margin-top: 10px;">');

        var divCol = $('<div class="form-inline col-12">');
        c.mode = $('<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">');
        c.top = $('<div class="col-lg-2 col-md-2 col-sm-6 col-xs-6">');
        divCol.append(c.mode);
        divCol.append(c.top);

        var divBtn = $('<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">');
        var divBtn1 = $('<div class="pull-left">');
        c.btnReport = $('<button type="button" class="btn btn-primary">گزارش گیری</button>');
        divBtn1.append(c.btnReport);
        divBtn.append(divBtn1);

        divCol.append(divBtn);
        divRow.append(divCol);

        divControl.append(divRow);
        obj._BuildControl(c);
        return divControl;
    },

    _SetObjects: function (param) {
        var obj = this;
        var o = obj.options;
        object = {
            mode: {
                element: null,
                value: 0,
                type: "select",
                caption: "تاریخ",
                items: [
                    { key: 0, value: "امسال" },
                    { key: 1, value: "این ماه" },
                    { key: 2, value: "ماه پیش" },
                    { key: 3, value: "این فصل" },
                    { key: 4, value: "فصل پیش" },
                ],
            },
            top: {
                element: null,
                value: "10",
                maxlength: 10,
                dataType: type_BigInt,
                caption: "تعداد",
            },
        }
        return object;
    },

    _BuildControl: function (c) {
        var obj = this;
        var o = obj.options;
        var objects = o.objects;

        c.btnReport.click(function (e) {
            obj._GetData();
        });

        c.mode.ComboBox(
            {
                caption: objects.mode.caption,
                items: objects.mode.items,
                value: objects.mode.value,
                Create: function (e, record) {
                    objects.mode.element = record.input[0];
                },
                Change: function (e, record) {
                    objects.mode.value = record.value;
                },
            },
        );
        CreateObjectInput(c, objects, 'top');
    },

    _GetData: async function (e) {
        var obj = this;
        var o = obj.options;
        var data = o.objects;
        var param = dataGroup[o.baseValue.group][o.baseValue.sal]["params"];

        var object = {
            azTarikh: "",
            taTarikh: LowDay(0),
            ModeCode1: ace == prog_Web8 ? "SFCT" : "52",
            ModeCode2: ace == prog_Web8 ? "SRFCT" : "53",
            azShomarh: "",
            taShomarh: "",
            CustCode: "",
            CGruCode: "",
            MkzCode: "",
            OprCode: "",
            InvCode: "",
            StatusCode: "موقت*تایید*تصویب",
            ZeroValue: "0",
            KGruCode: "",
            KalaCode: "",
            Top: data.top.value,
            Sort: "TotalPrice desc"
        };

        var uri = server + '/api/ReportFct/TrzFKala/' + o.baseValue.ace + '/' + o.baseValue.sal + '/' + o.baseValue.group;
        ajaxFunction(uri, 'POST', object, true).done(function (response) {
            o.controlData = object;
            o.data = response;

            var trzFKala_S_labels = []
            var trzFKala_S_data = []
            sum = 0;
            for (var i = 0; i < response.length; i++) {
                trzFKala_S_labels[i] = response[i].KalaCode + ' - ' + response[i].KalaName;
                trzFKala_S_data[i] = response[i].TotalPrice;
                sum += response[i].TotalPrice
            }
            var l_Sum = $(obj.bindings[0]).find('.l_Sum');
            l_Sum.text(NumberToNumberString(sum));

            //var l_Date = $(obj.bindings[0]).find('.l_Date');
            //l_Date.text("" + ' - ' + LowDay(0));

            obj._CreateChart(trzFKala_S_labels, trzFKala_S_data);
        });
    },

    _CreateChart: function (labels, datas) {
        var obj = this;
        var o = obj.options;

        var barColors = ["#ff2d2d", "#00ccff", "#00ffff", "#336600", "#ffcc00", "#ff9e3a", "#0033ff",
            "#6699cc", "#009999", "#171a9b", "#00a20b", "#11c0a9"];

        o.objChart.empty();
        const objChart = new Chart(o.objChart, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: datas,
                    backgroundColor: barColors,
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                responsive: true,
                responsiveAnimationDuration: 0,
                legend: {
                    position: 'right',
                    align: 'center',
                    fullWidth: true,
                    reverse: false,
                    PointStyle: 'Cross',
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            value = data['datasets'][0]['data'][tooltipItem['index']];
                            lable = data['labels'][tooltipItem['index']];
                            return lable + '  ' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'ریال';
                        }
                    }
                }
            }
        });


    },


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
