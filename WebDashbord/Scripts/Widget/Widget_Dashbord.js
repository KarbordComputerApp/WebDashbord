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
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_TChk({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TChk("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TChk("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TChk("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TChk("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TChk("ShowColumns");
    },

});

$.widget("ui.D_TChk_Sum", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.TChk_Sum({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
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
        uuid: null,
        caption: null,
        isForosh: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_TrzFCust({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            isForosh: o.isForosh,
            controlData: o.controlData,
            objects: o.objects,
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


$.widget("ui.D_TarazFasli_Chart", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.TarazFasli_Chart({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.TarazFasli_Chart("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.TarazFasli_Chart("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.TarazFasli_Chart("ShowControl");
    },

});

$.widget("ui.D_TrzFKala_Chart", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.TrzFKala_Chart({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.TrzFKala_Chart("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.TrzFKala_Chart("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.TrzFKala_Chart("ShowControl");
    },

});


$.widget("ui.D_TrzAcc", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        valueControl: {
            mode: 0,
        },
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
        //headButton: [f_GetData, f_Print, f_Columns, f_Maximum, f_ShowControl, f_Refresh, f_Setting]
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 10px;">');
        divReport.Report_TrzAcc({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
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
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 10px;">');

        divReport.Report_Dftr({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
        //obj._trigger("CreateElement", event, obj);
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

$.widget("ui.D_ADocR", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 10px;">');

        divReport.Report_ADocR({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
        //obj._trigger("CreateElement", event, obj);
    },

    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ADocR("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ADocR("ShowSetting");
    },


    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ADocR("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ADocR("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ADocR("ShowColumns");
    },

});

$.widget("ui.D_AGMkz", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_AGMkz({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_AGMkz("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_AGMkz("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_AGMkz("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_AGMkz("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_AGMkz("ShowColumns");
    },

});

$.widget("ui.D_AGOpr", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_AGOpr({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_AGOpr("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_AGOpr("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_AGOpr("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_AGOpr("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_AGOpr("ShowColumns");
    },

});

$.widget("ui.D_GrdZAcc", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_GrdZAcc({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_GrdZAcc("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_GrdZAcc("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_GrdZAcc("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_GrdZAcc("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_GrdZAcc("ShowColumns");
    },

});

$.widget("ui.D_KhlAcc", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_KhlAcc({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_KhlAcc("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_KhlAcc("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_KhlAcc("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_KhlAcc("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_KhlAcc("ShowColumns");
    },

});

$.widget("ui.D_KhlZAcc", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_KhlZAcc({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_KhlZAcc("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_KhlZAcc("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_KhlZAcc("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_KhlZAcc("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_KhlZAcc("ShowColumns");
    },

});

$.widget("ui.D_TrzFKala", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        isForosh: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_TrzFKala({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            isForosh: o.isForosh,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzFKala("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzFKala("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzFKala("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzFKala("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzFKala("ShowColumns");
    },

});

$.widget("ui.D_FDocR", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        isForosh: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_FDocR({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            isForosh: o.isForosh,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_FDocR("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_FDocR("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_FDocR("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_FDocR("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_FDocR("ShowColumns");
    },

});

$.widget("ui.D_Krdx", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_Krdx({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Krdx("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Krdx("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Krdx("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Krdx("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_Krdx("ShowColumns");
    },

});

$.widget("ui.D_TrzIKala", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_TrzIKala({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzIKala("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzIKala("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzIKala("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzIKala("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzIKala("ShowColumns");
    },

});

$.widget("ui.D_TrzIKalaExf", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_TrzIKalaExf({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzIKalaExf("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzIKalaExf("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzIKalaExf("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzIKalaExf("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_TrzIKalaExf("ShowColumns");
    },

});

$.widget("ui.D_IDocR", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_IDocR({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_IDocR("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_IDocR("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_IDocR("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_IDocR("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_IDocR("ShowColumns");
    },

});

$.widget("ui.D_ErjDocK", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_ErjDocK({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ErjDocK("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ErjDocK("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ErjDocK("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ErjDocK("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ErjDocK("ShowColumns");
    },

});

$.widget("ui.D_ErjDocB_Last", {
    options: {
        id: null,
        uuid: null,
        caption: null,
        position: [],
        baseValue: [],
        visible: true,
        data: null,
        element: null,
        headButton: [f_Print, f_Columns, f_Setting],
        controlData: null,
        objects: null,
        getAutoData: null,
        showControl: null,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var setting = GetSetting(o);

        var divReport = $('<div style="padding: 5px;">');
        divReport.Report_ErjDocB_Last({
            uuid: o.uuid,
            baseValue: o.baseValue,
            showControl: o.showControl == null ? setting.showControl : o.showControl,
            getAutoData: o.getAutoData == null ? setting.getAutoData : o.getAutoData,
            viewData: setting.viewData,
            controlData: o.controlData,
            objects: o.objects,
        });

        o.element = divReport;
        BoxDashbord_Create(obj, null, divReport);
    },


    _Refresh: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ErjDocB_Last("Refresh");
    },

    _Setting: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ErjDocB_Last("ShowSetting");
    },

    _ShowControl: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ErjDocB_Last("ShowControl");
    },

    _ShowPrint: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ErjDocB_Last("ShowPrint");
    },

    _ShowColumns: function () {
        var obj = this;
        var o = obj.options.element;
        o.Report_ErjDocB_Last("ShowColumns");
    },

});

