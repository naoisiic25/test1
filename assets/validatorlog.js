function Validator(options) {
    var SelectorRules = {};
    // ktra o input nay
    function validate(rule) {
        // ktra loi, --> kq
        var inputElement = formElement.querySelector(rule.selector);

        // noi viet loi vao
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        // lay tat ca cac test cua 1 o input
        var allTest = SelectorRules[rule.selector];
        // lap qua tung test
        for (var i = 0; i < allTest.length; ++i) {
            errorMessage = allTest[i](inputElement.value);
            // test nao co loi thi break luon
            if (errorMessage) break;
        }
        // neu co loi xay ra
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
        } else {
            errorElement.innerText = "";
            inputElement.parentElement.classList.remove("invalid");
        }
        // rweturn co loi hay ko
        return !errorMessage;
    }
    // chon form 1 tu form : 'form-1'
    var formElement = document.querySelector(options.form);
    // neu co from can ktra
    if (formElement) {
        // xu li loai bo submit ban dau
        formElement.onsubmit = function (e) {
            e.preventDefault();
            // form co loi
            var isFormValid = true;
            var a = options.rules;
            a.forEach(function (rule) {
                //o in put nay co loi ko
                var isValid = validate(rule);
                if (!isValid) {
                    //neu o input nay co loi thi form co loi
                    isFormValid = false;
                }
            });
            //neu form ko co loi
            if (isFormValid) {
                if (typeof options.onSubmit === "function") {
                    //chon cac o input
                    var enableInputs = formElement.querySelectorAll("[name]");
                    //lay value tu cac the input
                    var formValue = Array.from(enableInputs).reduce(function (values, input) {
                        return (values[input.name] = input.value) && values;
                    }, {});
                    options.onSubmit(formValue);
                }
            } else {
                formElement.submit();
            }
        };
        var a = options.rules;
        a.forEach(function (rule) {
            if (Array.isArray(SelectorRules[rule.selector])) {
                SelectorRules[rule.selector].push(rule.test);
            } else {
                SelectorRules[rule.selector] = [rule.test];
            }

            // ney co hamf can ktra can ktra
            if (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                // noi viet loi vao
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                // ktra khi blur
                inputElement.onblur = function () {
                    validate(rule);
                };
                // ktra khi dang nhap
                inputElement.oninput = function () {
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove("invalid");
                };
            }
        });
    }
}
//  tra ve id input ktra + kq: rule
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Vui lòng không để trống";
        },
    };
};
//  tra ve id input ktra + kq
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Vui lòng nhập email chính xác";
        },
    };
};
Validator.isMinlength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : "Vui lòng nhập tối thiểu " + min + "kí tự";
        },
    };
};
Validator.isConfirmed = function (selector, getCofirmValue) {
    return {
        selector: selector,
        test: function (value) {
            return value === getCofirmValue() ? undefined : " Mật khẩu không trùng khớp";
        },
    };
};
