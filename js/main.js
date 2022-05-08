$(document).ready(function () {

function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function () {
        var value = $(this).val();
        var that = $(this);

        regExp = regExp == '' ? /./ : regExp;

        if (phone === true) {
            bool_reg = !regExp.test(value);
        } else {
            bool_reg = regExp.test(value);
            console.log('test');
        }

        if (value.length > length && value !== '' && bool_reg) {
            that.removeClass('form-fail').addClass('form-done');
            $(error).slideUp();
        } else {
            that.removeClass('form-done').addClass('form-fail');
            $(error).slideDown();
        }
    });

}

  // деакцивация кнопки если есть поле с ошибкой

function disBtn(input, btn, bool) {
    var input = $(input);
    input.on('blur keyup', function () {

        if (input.hasClass('form-fail') || bool == true) {
            $(btn).attr('disabled', 'disabled');
        } else {
            $(btn).removeAttr('disabled');
        }

    });

}

  // для проверки при нажатии

function valClick(input, length, regExp, error, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
        bool_reg = regExp.test(value);
    } else {
        bool_reg = !regExp.test(value);
    }

    if (value.length < length || value === '' || bool_reg) {
        $(input).addClass('form-fail');
        $(error).slideDown();
    }
}

  //  деакцивация кнопки при нажатии

function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
        return false;
    } else {
        return true;
    }

}

function checkCoincidence(elem1, elem2, error) {
      let elemValue = $(elem1).val();
      let elem2Value = $(elem2).val();
      if (elemValue !== elem2Value) {
        $(error).slideDown();
        $(elem2).addClass('form-fail');
      } else {
        $(error).slideUp();
        $(elem2).removeClass('form-fail');
      }
  }

function checkCoincidenceInput(elem1, elem2, error) {
    $(elem2).on('input', function() {
      let elemValue = $(elem1).val();
      let elem2Value = $(elem2).val();
      if (elemValue !== elem2Value) {
        $(error).slideDown();
        $(elem2).addClass('form-fail');
      } else {
        $(error).slideUp();
        $(elem2).removeClass('form-fail');
      }
    })
  }

$('input[type="tel"]').mask("+38 (999) 999-99-99");

var regName = /^[a-zA-Zа-яА-ЯёЁIi]+/;
var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;
var regPhone = /[_]/i;
var regAll = /.{1,}/;


// login

$('#u_login').on('click', function () {
    loginForm();
});

function loginForm() {
    let email = $('#u_email').val();
    let password = $('#u_password').val();

    validate('#u_email', 1, regEmail, '.user__error--email');
    validate('#u_password', 0, regAll, '.user__error--password');
    disBtn('#u_email, #u_password', '#u_login');

    valClick('#u_email', 1, regEmail, '.user__error--email');
    valClick('#u_password', 0, regAll, '.user__error--password');
    let btn_bool = disBtnClick('#u_email, #u_password', '#u_login');

      if (btn_bool) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'login',
                email: email,
                password: password,
            },
        }).done(function (data) {
            $('#u_email, #u_password').val('').removeClass('form-done');
            var text = 'Ваше  cообщение отправлено!';
            
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function () {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500);
        });

    }

    return false;
}

validate('#u_email', 1, regEmail, '.user__error--email');
validate('#u_password', 0, regAll, '.user__error--password');

disBtn('#u_email, #u_password', '#u_login');

// registration

$('#u_registration').on('click', function () {
    registrationForm();
});

function registrationForm() {
    let email = $('#u_email').val();
    let password = $('#u_password').val();
    let password_repeat = $('#u_password_repeat').val();

    validate('#u_email', 1, regEmail, '.user__error--email');
    validate('#u_password', 0, regAll, '.user__error--password');
    checkCoincidence('#u_password', '#u_password_repeat', '.user__error--password_repeat');
    disBtn('#u_email, #u_password', '#u_registration');

    valClick('#u_email', 1, regEmail, '.user__error--email');
    valClick('#u_password', 0, regAll, '.user__error--password');
    let btn_bool = disBtnClick('#u_email, #u_password, #u_password_repeat', '#u_registration');

      if (btn_bool) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'registration',
                email: email,
                password: password,
                password_repeat: password_repeat
            },
        }).done(function (data) {
            $('#u_email, #u_password, #u_password_repeat').val('').removeClass('form-done');
            var text = 'Ваше  cообщение отправлено!';
            
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function () {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500);
        });

    }

    return false;
}

validate('#u_email', 1, regEmail, '.user__error--email');
validate('#u_password', 0, regAll, '.user__error--password');
checkCoincidenceInput('#u_password', '#u_password_repeat', '.user__error--password_repeat');
disBtn('#u_email, #u_password', '#u_registration');

// Remind password

$('#u_remind').on('click', function () {
    remindForm();
});

function remindForm() {
    let email = $('#u_email').val();

    validate('#u_email', 1, regEmail, '.user__error--email');
    disBtn('#u_email', '#u_remind');

    valClick('#u_email', 1, regEmail, '.user__error--email');
    let btn_bool = disBtnClick('#u_email', '#u_remind');

      if (btn_bool) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'remind',
                email: email
            },
        }).done(function (data) {
            $('#u_email').val('').removeClass('form-done');
            var text = 'Ваше  cообщение отправлено!';
            
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function () {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500);
        });

    }

    return false;
}

validate('#u_email', 1, regEmail, '.user__error--email');
disBtn('#u_email', '#u_remind');

// set password

$('#u_set').on('click', function () {
    setForm();
});

function setForm() {
    let password = $('#u_password').val();
    let password_repeat = $('#u_password_repeat').val();

    validate('#u_password', 0, regAll, '.user__error--password');
    checkCoincidence('#u_password', '#u_password_repeat', '.user__error--password_repeat');
    disBtn('#u_password', '#u_set');

    valClick('#u_password', 0, regAll, '.user__error--password');
    let btn_bool = disBtnClick('#u_password, #u_password_repeat', '#u_set');

      if (btn_bool) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'setPassword',
                email: email,
                password: password,
                password_repeat: password_repeat
            },
        }).done(function (data) {
            $('#u_password, #u_password_repeat').val('').removeClass('form-done');
            var text = 'Ваше  cообщение отправлено!';
            
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function () {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500);
        });

    }

    return false;
}

validate('#u_password', 0, regAll, '.user__error--password');
checkCoincidenceInput('#u_password', '#u_password_repeat', '.user__error--password_repeat');
disBtn('#u_password', '#u_set');

// save

$('#u_save').on('click', function () {
    saveForm();
});

function saveForm() {
    let email = $('#u_email').val();
    let fio = $('#u_fio').val();
    let phone = $('#u_phone').val();

    validate('#u_email', 1, regEmail, '.user__error--email');
    validate('#u_fio', 1, regName, '.user__error--fio');
    disBtn('#u_email , #fio', '#u_save');

    valClick('#u_email', 1, regEmail, '.user__error--email');
    valClick('#u_fio', 1, regName, '.user__error--fio');
    let btn_bool = disBtnClick('#u_email, #fio', '#u_save');

      if (btn_bool) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'save',
                email: email,
                fio: fio,
                phone: phone
            },
        }).done(function (data) {
            $('#u_email, #u_fio, #u_phone').val('').removeClass('form-done');
            var text = 'Ваше  cообщение отправлено!';
            
            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function () {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500);
        });

    }

    return false;
}

validate('#u_email', 1, regEmail, '.user__error--email');
validate('#u_fio', 1, regName, '.user__error--fio');
disBtn('#u_email, #u_fio', '#u_save');

  $(".tabs__item").click(function() {
    $(".tabs__item").removeClass("tabs__item--active").eq($(this).index()).addClass("tabs__item--active");
    var index = $(this).index();
    $(".tabs__box").hide().eq(index).fadeIn()
  })


})