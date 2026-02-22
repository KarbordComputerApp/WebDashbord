$.widget("ui.DatePicker", {
    options: {
        caption: "",
        value: "",
    },

    _create: function () {
        var obj = this;
        var o = obj.options;

        var divObject = $('<div class="input-group" style="margin-bottom:' + margin_Input +';">');

        var divBtn = $('<div class="input-group-addon">');
        var span = $('<span class="input-group-btn">');
        var aBtn = $('<a>');
        var iconBtn = $('<img src="/Content/img/list/calendar.png" class="icon" height="20" width="20" title="انتخاب تاریخ">');

        aBtn.append(iconBtn);
        span.append(aBtn);
        divBtn.append(span);

        var divInput = $('<div class="form-group form-float">');
        var divInput1 = $('<div class="form-line focused fix">');
        var _input = $('<input class="form-control date" type="text" maxlength="10">');
        var label = $('<label class="form-label active"">' + o.caption + '</label>');

        divInput1.append(_input);
        divInput1.append(label);
        divInput.append(divInput1);

        divObject.append(divBtn);
        divObject.append(divInput);

        obj.element.append(divObject);

        _input.val(o.value);

        //var a = $(obj.bindings[0]).find('a');
        //var inputRes = $(obj.bindings[0]).find('input');

        //Datepicker(_input);

        aBtn.MdPersianDateTimePicker({
            targetTextSelector: $(_input),
            dateFormat: 'yyyy-MM-dd',
            Placement: 'bottom', // default is 'bottom'
            Trigger: 'focus', // default is 'focus',
            EnableTimePicker: true, // default is true,
            TargetSelector: '', // default is empty,
            GroupId: '', // default is empty,
            ToDate: false, // default is false,
            FromDate: false, // default is false,
            isGregorian: lang == 'en' ? true : false,
            englishNumber: lang == 'en' ? true : false,
        });


        //_input.on('change keydown paste input', function () {
        //_input.on('change', function () {

        //  var a = this;
        //});

        var record = { "btn": aBtn, 'input': _input };

        obj._trigger("Create", event, record);

        aBtn.click(function (e) {
        });

        _input.change(function (e) {
            obj._Change(e);
        });
    },

    _Change: function (e) {
        obj = this;
        var o = obj.options;
        var _input = $(obj.bindings[0]).find('input');
        o.value = $(_input).val();
        var record = { 'value': o.value, 'text': o.value };
        obj._trigger("Change", event, record);
    },



});



