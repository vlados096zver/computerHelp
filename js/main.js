$(document).ready(function() {

  function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function() {
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
    input.on('blur keyup', function() {

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

  var regName = /^[a-zA-Zа-яА-ЯёЁIi]+/;
  var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;
  var regPhone = /[_]/i;
  var regAll = /.{1,}/;


  // login

  $('#u_login').on('click', function() {
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
      }).done(function(data) {
        $('#u_email, #u_password').val('').removeClass('form-done');
        var text = 'Ваше  cообщение отправлено!';

        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
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

  $('#u_registration').on('click', function() {
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
      }).done(function(data) {
        $('#u_email, #u_password, #u_password_repeat').val('').removeClass('form-done');
        var text = 'Ваше  cообщение отправлено!';

        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
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

  $('#u_remind').on('click', function() {
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
      }).done(function(data) {
        $('#u_email').val('').removeClass('form-done');
        var text = 'Ваше  cообщение отправлено!';

        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
          $('.msg-modal').removeClass('msg-modal-active');
        }, 2500);
      });

    }

    return false;
  }

  validate('#u_email', 1, regEmail, '.user__error--email');
  disBtn('#u_email', '#u_remind');

  // set password

  $('#u_set').on('click', function() {
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
      }).done(function(data) {
        $('#u_password, #u_password_repeat').val('').removeClass('form-done');
        var text = 'Ваше  cообщение отправлено!';

        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
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

  $('#u_save').on('click', function() {
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
      }).done(function(data) {
        $('#u_email, #u_fio, #u_phone').val('').removeClass('form-done');
        var text = 'Ваше  cообщение отправлено!';

        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
          $('.msg-modal').removeClass('msg-modal-active');
        }, 2500);
      });

    }

    return false;
  }

  validate('#u_email', 1, regEmail, '.user__error--email');
  validate('#u_fio', 1, regName, '.user__error--fio');
  disBtn('#u_email, #u_fio', '#u_save');

  // consult

  $('#u_consult').on('click', function() {
    formConsult();
  });

  function formConsult() {
    let name = $('#u_name').val();
    let phone = $('#u_phone').val();

    validate('#u_name', 1, regName, '.user__error--name');
    validate('#u_phone', 1, regName, '.user__error--phone');
    disBtn('#u_name , #u_phone', '#u_consult');

    valClick('#u_name', 1, regName, '.user__error--name');
    valClick('#u_phone', 1, regName, '.user__error--phone');
    let btn_bool = disBtnClick('#u_name, #u_phone', '#u_consult');

    if (btn_bool) {
      $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
          action: 'consult',
          name: name,
          phone: phone
        },
      }).done(function(data) {
        $('#u_name, #u_phone').val('').removeClass('form-done');
        var text = 'Ваше  cообщение отправлено!';

        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
          $('.msg-modal').removeClass('msg-modal-active');
        }, 2500);
      });

    }

    return false;
  }

  validate('#u_name', 1, regName, '.user__error--name');
  validate('#u_phone', 1, regName, '.user__error--phone');
  disBtn('#u_name , #u_phone', '#u_consult');

  $(".tabs__item").click(function() {
    $(".tabs__item").removeClass("tabs__item--active").eq($(this).index()).addClass("tabs__item--active");
    var index = $(this).index();
    $(".tabs__box").hide().eq(index).fadeIn()
  })

  if (window.Swiper) {

    let services_swiper = new Swiper(".services__wrap", {
      slidesPerView: 1,
      spaceBetween: 40,
      pagination: {
        clickable: true,
        el: ".services__holder .swiper-pagination",
      },
      navigation: {
        nextEl: ".services__holder .swiper-button-next",
        prevEl: ".services__holder .swiper-button-prev",
      },
      allowTouchMove: true,
      loop: false,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        650: {
          slidesPerView: 2,
        },
        1023: {
          slidesPerView: 3,
        },
        1250: {
          slidesPerView: 4,
        },
      }
    });

    let reviews_swiper = new Swiper(".reviews__wrap", {
      slidesPerView: 1,
      spaceBetween: 40,
      pagination: {
        clickable: true,
        el: ".reviews__holder .swiper-pagination",
      },
      navigation: {
        nextEl: ".reviews__holder .swiper-button-next",
        prevEl: ".reviews__holder .swiper-button-prev",
      },
      allowTouchMove: true,
      loop: false,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 2,
        },
        1023: {
          slidesPerView: 3,
        },
      }
    });

  }

  $(document).on('click', '.mobile-wrap', function() {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__list').slideToggle();
  });

  $(window).resize(function() {
    if ($(document).width() > 650) {
      $('.main-header__list').attr('style', '');
      $('.line-burger').removeClass('line-active');
    }
  })

  var $intersection = $(".js-intersection");
  var $fixedMenu = $('.main-header')

  function fixContrastBg() {

    if($intersection.length>0) {
      if ($intersection.offset().top < $(window).scrollTop()) {
        $fixedMenu.addClass("contrast-bg");

        } else {
          $fixedMenu.removeClass("contrast-bg");
      }
    }
  }

  fixContrastBg()
  $(window).scroll(function() {
    fixContrastBg()
  });

  $(document).on('click', '.btn--add',function() {
    $('.add').slideToggle(250);
  })

  // Filter blog

  $(document).on('click', '.blog__col', function(e) {
    let filterData = e.target.dataset.filter;
    let check = filterData;
        $('.blog__col').removeClass('blog__col--active');

    $(this).addClass('blog__col--active');

    $('.blog__item').each(function(index, item) {
      if ($(item)[0].dataset.filter == check || filterData == "all") {
        $(item).show();
      } else {
        $(item).hide();
      }
    })

  })

  function checkAddButtonReviews() {

    
    let tabsWidth = 0;
     $('.blog__col').each(function(index, item) {
      tabsWidth += $(item).outerWidth(true);
     })

    let screenWidth = $('.blog__row').outerWidth(true);
    if(tabsWidth >=screenWidth) {
      $('.blog__tabs').addClass('blog__gradient');
       $('.blog__btn').attr('style', '');
    } else {
       $('.blog__tabs').removeClass('blog__gradient');
    }
  }

  checkAddButtonReviews();

   $(document).on('load', checkAddButtonReviews);
    $(document).on('resize', checkAddButtonReviews)

  $(document).on('click', '.blog__btn', function(e) {
    $(this).hide();
      $('.blog__tabs').addClass('blog__tabs--show').removeClass('blog__gradient');
  })
  
  // reviews popup

  $(document).on('click', '.reviews__details', function(e) {
    e.preventDefault();
    $('.popup--text').addClass('popup--active');
    let parent = $(this).parents('.reviews__item');
    let desc = parent.find('.reviews__text p').text();
    console.log(desc);
    $('.popup__text p').text(desc);
  })

 $(document).on('click', '.files__close', function() {
  $('.files').slideToggle(0);
 })

})
