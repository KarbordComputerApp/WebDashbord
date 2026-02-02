$.widget("ui.Input", {
    options: {
        caption: "",
        dataType: type_String,
        maxlength: 0,
        value: null
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        var divObject = $('<div class="form-group form-float">');
        var divInput = $('<div class="form-line focused fix">');
        var _input = $(' <input type="text" data_type="' + o.dataType + '" class="form-control ' + o.dataType + '" ' + (o.maxlength > 0 ? ' maxlength = "' + o.maxlength + '"' : "") + '>');
        var label = $('<label class="form-label active"">' + o.caption + '</label>');


        divInput.append(_input);
        divInput.append(label);
        divObject.append(divInput);

        obj.element.append(divObject);

        _input.val(o.value);
        var record = { 'input': _input };

        obj._trigger("Create", event, record);


        _input.keydown(function (e) {
            obj._KeyDown(e)
        });

        _input.keyup(function (e) {
            obj._KeyUp(e);
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
    _KeyDown: function (e) {
        obj = this;
        var o = obj.options;
        var _input = $(obj.bindings[0]).find('input');

        var dataType = $(_input).attr("data_type");
        if (dataType != "string") {
            if (e.ctrlKey) {
                // CTRL + INS
                if (!((e.keyCode == 45) ||
                    // CTRL + C
                    (e.keyCode == 67) ||
                    // CTRL + V
                    (e.keyCode == 86))) {
                    e.preventDefault();
                }

            }
            else {
                if (e.shiftKey) {
                    // SHIFT + TAB
                    if (!((e.keyCode == 9) ||
                        // SHIFT + LEFT ARROW KEY
                        (e.keyCode == 37) ||
                        // SHIFT + RIGHT ARROW KEY
                        (e.keyCode == 39) ||
                        // SHIFT + INS
                        (e.keyCode == 45))) {
                        e.preventDefault();
                    }
                }

                else {
                    // BACKSPACE
                    if (!((e.keyCode == 8) ||
                        // TAB
                        (e.keyCode == 9) ||
                        // LEFT ARROW KEY
                        (e.keyCode == 37) ||
                        // RIGHT ARROW KEY
                        (e.keyCode == 39) ||
                        // DELETE
                        (e.keyCode == 46) ||
                        // NUMBER KEYS
                        ((e.keyCode >= 48) && (e.keyCode <= 57)) ||
                        // NUMLOCK KEYS
                        ((e.keyCode >= 96) && (e.keyCode <= 105)))//||
                        //((dataType == 'float') && (e.keyCode == 110 || e.keyCode == 190 || e.keyCode == 111 || e.keyCode == 191)))

                    ) {
                        e.preventDefault();
                    }
                }
            }

            if (dataType == 'float') {
                if (e.keyCode == 110 || e.keyCode == 190 || e.keyCode == 111 || e.keyCode == 191) {
                    last = $(_input).val();
                    if (last.includes('/') == false) {
                        var res = last + '/'
                        $(_input).val(res);
                        o.value = res;
                    }
                }
            }

        }
    },

    _KeyUp: function (e) {
        obj = this;
        var o = obj.options;
        var _input = $(obj.bindings[0]).find('input');

        var text = $(_input).val();
        var dataType = $(_input).attr("data_type");
        if (dataType == 'byte' && text > max_Byte) {
            text = max_Byte;
            $(_input).val(text);
        } else if (dataType == 'int' && text > max_Int) {
            text = max_Int;
            $(_input).val(text);
        }
        else if ((dataType == 'bigint' || dataType == 'float' || dataType == 'curr') && text > max_BigInt) {
            text = max_BigInt - 1000;
            $(_input).val(text);
        }

        if (text != '' && dataType == 'float') {
            text = NumberToNumberString(text)
            $(_input).val(text);
        }
        o.value = text;
    },

});



$.widget("ui.ComboBox", {
    options: {
        caption: "",
        items: null,
        value: null,
        sizeSelect: 8,
    },

    _create: function () {
        var obj = this;
        var o = obj.options;
        //var divObject = $('<div class="form-inline" style="margin-left: 5px; margin-right: 5px;">');
        var divObject = $('<div class="form-inline">');
        var span = $('<span class="col-md-' + (12 - o.sizeSelect) + '">' + o.caption + '</span>');
        var divSelect = $('<div class="form-group  col-md-' + o.sizeSelect + '">');
        var _select = $('<select>');
        for (var i = 0; i < o.items.length; i++) {
            _select.append(new Option(o.items[i].value, o.items[i].key));
        }

        divSelect.append(_select);
        divObject.append(span);
        divObject.append(divSelect);
        obj.element.append(divObject);

        _select.val(o.value);
        var record = { 'input': _select };
        obj._trigger("Create", event, record);

        _select.change(function (e) {
            obj._Change(e);
        });
    },

    _Change: function (e) {
        obj = this;
        var o = obj.options;
        var _select = $(obj.bindings[0]).find('select');
        o.value = $(_select).val();
        var record = { 'value': o.value, 'text': o.value };
        obj._trigger("Change", event, record);
    },

});
