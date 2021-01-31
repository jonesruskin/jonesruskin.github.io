(function($) {
    $(document).ready(function() {
        "use strict";

       

        // TREE MENU
        $('.site-navigation ul li.dropdown span').on('click', function() {
            $(this).parent().children('.site-navigation ul li ul').slideToggle(300);
            return true;
        });




        // PARALLAX
        $.stellar({
            horizontalScrolling: false,
            verticalOffset: 0,
            responsive: true
        });


        // PAGE TRANSITION
        $('.transition').on('click', function(e) {
            if (typeof $(this).data('Fresco') == 'undefined') {
                e.preventDefault();
                var url = this.getAttribute("href");
                if (url.indexOf('#') != -1) {
                    var hash = url.substring(url.indexOf('#'));
                    if ($('body ' + hash).length != 0) {
                        $('.page-transition').removeClass("active");
                        $(".sandiwch").toggleClass("open");
                        $(".site-menavigation").removeClass("active");
                    }
                } else {
                    $('.page-transition').toggleClass("active");
                    setTimeout(function() {
                        window.location = url;
                    }, 1000);
                }
            }
        });


        // SANDWICH MENU
        $('.sandwich').on('click', function() {
            if ($("body").hasClass("display-nav")) {
                $(".sandwich .sand span:nth-child(1)").css("transition-delay", "0.6s");
                $(".sandwich .sand span:nth-child(2)").css("transition-delay", "0.75s");
                $(".page-bg").css("transition-delay", "1s");
                $(".slider .slide-content").css("transition-delay", "1s");
                $(".kinetic-slider ").css("transition-delay", "1s");

                window.setTimeout(function() {
                    $(".sandwich .sand span:nth-child(1)").css("transition-delay", "0s");
                    $(".sandwich .sand span:nth-child(2)").css("transition-delay", "0s");
                }, 1000);

            } else {

                $(".sandwich .sand span:nth-child(1)").css("transition-delay", "0s");
                $(".sandwich .sand span:nth-child(2)").css("transition-delay", "0.15s");
                $(".page-bg").css("transition-delay", "0s");
                $(".slider .slide-content").css("transition-delay", "0s");
                $(".kinetic-slider").css("transition-delay", "0s");

            }
            $("body").toggleClass("display-nav");
        });


       


        /* MAGNET CURSOR*/
        var cerchio = document.querySelectorAll('.magnet-link');
        cerchio.forEach(function(elem) {
            $(document).on('mousemove touch', function(e) {
                magnetize(elem, e);
            });
        })

        function magnetize(el, e) {
            var mX = e.pageX,
                mY = e.pageY;
            const item = $(el);

            const customDist = item.data('dist') * 20 || 80;
            const centerX = item.offset().left + (item.width() / 2);
            const centerY = item.offset().top + (item.height() / 2);

            var deltaX = Math.floor((centerX - mX)) * -0.35;
            var deltaY = Math.floor((centerY - mY)) * -0.35;

            var distance = calculateDistance(item, mX, mY);

            if (distance < customDist) {
                TweenMax.to(item, 0.5, {
                    y: deltaY,
                    x: deltaX,
                    scale: 1
                });
                item.addClass('magnet');
            } else {
                TweenMax.to(item, 0.6, {
                    y: 0,
                    x: 0,
                    scale: 1
                });
                item.removeClass('magnet');
            }
        }

        function calculateDistance(elem, mouseX, mouseY) {
            return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
        }

        function lerp(a, b, n) {
            return (1 - n) * a + n * b
        }

        // Inizio Cursor
        class Cursor {
            constructor() {
                this.bind()
                //seleziono la classe del cursore
                this.cursor = document.querySelector('.js-cursor')

                this.mouseCurrent = {
                    x: 0,
                    y: 0
                }

                this.mouseLast = {
                    x: this.mouseCurrent.x,
                    y: this.mouseCurrent.y
                }

                this.rAF = undefined
            }

            bind() {
                ['getMousePosition', 'run'].forEach((fn) => this[fn] = this[fn].bind(this))
            }

            getMousePosition(e) {
                this.mouseCurrent = {
                    x: e.clientX,
                    y: e.clientY
                }
            }

            run() {
                this.mouseLast.x = lerp(this.mouseLast.x, this.mouseCurrent.x, 0.2)
                this.mouseLast.y = lerp(this.mouseLast.y, this.mouseCurrent.y, 0.2)

                this.mouseLast.x = Math.floor(this.mouseLast.x * 100) / 100
                this.mouseLast.y = Math.floor(this.mouseLast.y * 100) / 100

                this.cursor.style.transform = `translate3d(${this.mouseLast.x}px, ${this.mouseLast.y}px, 0)`

                this.rAF = requestAnimationFrame(this.run)
            }

            requestAnimationFrame() {
                this.rAF = requestAnimationFrame(this.run)
            }

            addEvents() {
                window.addEventListener('mousemove', this.getMousePosition, false)
            }

            on() {
                this.addEvents()

                this.requestAnimationFrame()
            }

            init() {
                this.on()
            }
        }

        const cursor = new Cursor()

        cursor.init();

        $('.link-change, .transition, .sandwich, .swiper-button-prev, .swiper-button-next, .main-nav').hover(function() {
            $('.cursor').toggleClass('light');
        });


    });
    // END JQUERY	


    // MASONRY
    function masonry_init() {
        $('.masonry').masonry({
            itemSelector: '.masonry-grid',
            columnWidth: '.masonry-grid',
            percentPosition: true
        });
    }

    window.onload = masonry_init;




    // PRELOADER
    let settings = {
        progressSize: 320,
        progressColor: '#C69320',
        lineWidth: 2,
        lineCap: 'round',
        preloaderAnimationDuration: 1000,
        startDegree: -90,
        finalDegree: 270
    }

    function setAttributes(elem, attrs) {

        for (let key in attrs) {
            elem.setAttribute(key, attrs[key]);
        }

    }

    let preloader = document.createElement('div'),
        canvas = document.createElement('canvas'),
        size;

    (function() {

        let width = window.innerWidth,
            height = window.innerHeight;

        if (width > height) {

            size = Math.min(settings.progressSize, height / 2);

        } else {

            size = Math.min(settings.progressSize, width - 50);

        }

    })();

    setAttributes(preloader, {
        class: "preloader",
        id: 'preloader',
        style: 'transition: opacity ' + settings.preloaderAnimationDuration / 1000 + 's'
    });
    setAttributes(canvas, {
        class: 'progress-bar',
        id: 'progress-bar',
        width: settings.progressSize,
        height: settings.progressSize
    });


    preloader = document.getElementById('preloader');

    let progressBar = document.getElementById('progress-bar'),
        images = document.images,
        imagesAmount = images.length,
        imagesLoaded = 0,
        barCtx = progressBar.getContext('2d'),
        circleCenterX = progressBar.width / 2,
        circleCenterY = progressBar.height / 2,
        circleRadius = circleCenterX - settings.lineWidth,
        degreesPerPercent = 3.6,
        currentProgress = 0,
        showedProgress = 0,
        progressStep = 0,
        progressDelta = 0,
        startTime = null,
        running;

    (function() {

        return requestAnimationFrame ||
            mozRequestAnimationFrame ||
            webkitRequestAnimationFrame ||
            oRequestAnimationFrame ||
            msRequestAnimationFrame ||
            function(callback) {
                setTimeout(callback, 1000 / 60);
            };

    })();

    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };


    progressBar.style.opacity = settings.progressOpacity;
    barCtx.strokeStyle = settings.progressColor;
    barCtx.lineWidth = settings.lineWidth;
    barCtx.lineCap = settings.lineCap;
    let angleMultiplier = (Math.abs(settings.startDegree) + Math.abs(settings.finalDegree)) / 360;
    let startAngle = Math.radians(settings.startDegree);
    document.body.style.overflowY = 'hidden';
    preloader.style.backgroundColor = settings.preloaderBackground;


    for (let i = 0; i < imagesAmount; i++) {

        let imageClone = new Image();
        imageClone.onload = onImageLoad;
        imageClone.onerror = onImageLoad;
        imageClone.src = images[i].src;

    }

    function onImageLoad() {

        if (running === true) running = false;

        imagesLoaded++;

        if (imagesLoaded >= imagesAmount) hidePreloader();

        progressStep = showedProgress;
        currentProgress = ((100 / imagesAmount) * imagesLoaded) << 0;
        progressDelta = currentProgress - showedProgress;

        setTimeout(function() {

            if (startTime === null) startTime = performance.now();
            running = true;
            animate();

        }, 10);

    }

    function animate() {

        if (running === false) {
            startTime = null;
            return;
        }

        let timeDelta = Math.min(1, (performance.now() - startTime) / settings.preloaderAnimationDuration);
        showedProgress = progressStep + (progressDelta * timeDelta);

        if (timeDelta <= 1) {


            barCtx.clearRect(0, 0, progressBar.width, progressBar.height);
            barCtx.beginPath();
            barCtx.arc(circleCenterX, circleCenterY, circleRadius, startAngle, (Math.radians(showedProgress * degreesPerPercent) * angleMultiplier) + startAngle);
            barCtx.stroke();
            requestAnimationFrame(animate);

        } else {
            startTime = null;
        }

    }

    function hidePreloader() {

        setTimeout(function() {

            $("body").addClass("page-loaded");

            document.body.style.overflowY = '';

        }, settings.preloaderAnimationDuration + 100);

    }
    var resizeTimer;


//WOW Initialization
new WOW().init();

//Testimonial

let i=2;

	
$(document).ready(function(){
    var radius = 200;
    var fields = $('.itemDot');
    var container = $('.dotCircle');
    var width = container.width();
    if ($(window).width() > 767){
    radius = width/1.5;
    }
    else if ($(window).width() > 599){
        radius = width/ 1.1;
    }
    else {
        radius = width/1.2;
    }

     var height = container.height();
    var angle = 0, step = (2*Math.PI) / fields.length;
    fields.each(function() {
        var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2);
        var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
        if(window.console) {
            console.log($(this).text(), x, y);
        }
        
        $(this).css({
            left: x + 'px',
            top: y + 'px'
        });
        angle += step;
    });
    
    
    $('.itemDot').click(function(){
        
        var dataTab= $(this).data("tab");
        $('.itemDot').removeClass('active');
        $(this).addClass('active');
        $('.CirItem').removeClass('active');
        $( '.CirItem'+ dataTab).addClass('active');
        i=dataTab;
        
        $('.dotCircle').css({
            "transform":"rotate("+(360-(i-1)*36)+"deg)",
            "transition":"2s"
        });
        $('.itemDot').css({
            "transform":"rotate("+((i-1)*36)+"deg)",
            "transition":"1s"
        });
        
        
    });
    
    setInterval(function(){
        var dataTab= $('.itemDot.active').data("tab");
        if(dataTab>6||i>6){
        dataTab=1;
        i=1;
        }
        $('.itemDot').removeClass('active');
        $('[data-tab="'+i+'"]').addClass('active');
        $('.CirItem').removeClass('active');
        $( '.CirItem'+i).addClass('active');
        i++;
        
        
        $('.dotCircle').css({
            "transform":"rotate("+(360-(i-2)*36)+"deg)",
            "transition":"2s"
        });
        $('.itemDot').css({
            "transform":"rotate("+((i-2)*36)+"deg)",
            "transition":"1s"
        });
        
        }, 5000);
    
});

//Popup Form 


$('.popup-link').click(function(){
    $('.contact-popup').css('transform', 'translateY(0%)');
    $('#name').focus();
    $("body").css("overflow", "hidden");
})

$('.popup-close-btn').click(function(){
    $('.contact-popup').css('transform', 'translateY(100%)');
    $("body").css("overflow", "visible");
})

$('.file-add-btn').click(function(){
    $('#attach').trigger('click');
})

$("input[type='file']").change(function(){
    $('.chosen-file').text(this.value.replace(/C:\\fakepath\\/i, ''))
 })   


$("#name").focus(function(){
    $(".popup-form-line-before1").addClass("popup-form-line");
   
}).blur(function(){
          $(".popup-form-line-before1").removeClass("popup-form-line");
})

$("#phone").focus(function(){
    $(".popup-form-line-before2").addClass("popup-form-line");
   
}).blur(function(){
          $(".popup-form-line-before2").removeClass("popup-form-line");
})

$("#email").focus(function(){
    $(".popup-form-line-before3").addClass("popup-form-line");

}).blur(function(){
          $(".popup-form-line-before3").removeClass("popup-form-line");
})

$("#message").focus(function(){
    $(".popup-form-line-before4").addClass("popup-form-line");
   
}).blur(function(){
          $(".popup-form-line-before4").removeClass("popup-form-line");
})
   

//form validation and ajax

$(document).ready(function() {
    $("#contact-form").validate({
    rules: {
    Name : {
    required: true,
    minlength: 3
    },
    Phone: {
    required: true,
    digits: true,
    minlength: 10
    },
    Email: {
    required: true,
    email: true
    },
    Message: {
    required: true
    },
    Regarding: {
        required: true
    }
},
submitHandler: function(form) {
       
    var form = $("#contact-form"); // contact form
var submitButton = $("#contact-page-btn");  // submit button

 $.ajax({
   
  url: 'contact.php', // form action url
  type: 'POST', // form submit method get/post
  dataType: 'html', // request type html/json/xml
 data: $("#contact-form").serialize(), // serialize form data
  beforeSend: function() {
    submitButton.html('Sending....'); // change submit button text
  },
  success: function(data) {
    form.trigger('reset'); // reset form
    submitButton.html('Send'); // reset submit button text
    $('#msg').html(data).fadeIn('slow');
     //$('#msg').html("data insert successfully").fadeIn('slow') //also show a success message 
     $('#msg').delay(5000).fadeOut('slow');
  },
  error: function(e) {
    console.log(e)
  }
 });

}// end submit handler
 });
});

$(document).ready(function() {
        $("#form-popup").validate({
        rules: {
        name : {
        required: true,
        minlength: 3
        },
        phone: {
        required: true,
        digits: true,
        minlength: 10
        },
        email: {
        required: true,
        email: true
        },
        message: {
        required: true
        },
        file: {
            required: false
        }
    }
    
 });
});    

$(document).ready(function() {
    $("#form-popup-portfolio").validate({
    rules: {
    name : {
    required: true,
    minlength: 3
    },
    phone: {
    required: true,
    digits: true,
    minlength: 10
    },
    email: {
    required: true,
    email: true
    },
    message: {
    required: true
    },
    file: {
        required: false
    }
}

});
});  


$(document).ready(function() {
    $("#form-popup-services").validate({
    rules: {
    name : {
    required: true,
    minlength: 3
    },
    phone: {
    required: true,
    digits: true,
    minlength: 10
    },
    email: {
    required: true,
    email: true
    },
    message: {
    required: true
    },
    file: {
        required: false
    }
}

});
}); 


$(document).ready(function() {
    $("#form-popup-contact").validate({
    rules: {
    name : {
    required: true,
    minlength: 3
    },
    phone: {
    required: true,
    digits: true,
    minlength: 10
    },
    email: {
    required: true,
    email: true
    },
    message: {
    required: true
    },
    file: {
        required: false
    }
}

});
}); 

//Button Animation

$('#submit-btn').hover(
    function(){$('.first-line').addClass('first-line-animate')},
    function(){$('.first-line').removeClass('first-line-animate')}
)

$('#submit-btn').hover(
    function(){$('.second-line').addClass('second-line-animate')},
    function(){$('.second-line').removeClass('second-line-animate')}
)

$('#submit-btn').hover(
    function(){$('.third-line').addClass('third-line-animate')},
    function(){$('.third-line').removeClass('third-line-animate')}
)

$('#submit-btn').hover(
    function(){$('.button-up-send').addClass('button-up-animate')},
    function(){$('.button-up-send').removeClass('button-up-animate')}
)



$('#animate-btn').hover(
    function(){$('.first-line.discuss-line').addClass('first-line-animate')},
    function(){$('.first-line.discuss-line').removeClass('first-line-animate')}
)

$('#animate-btn').hover(
    function(){$('.second-line.discuss-line').addClass('second-line-animate')},
    function(){$('.second-line.discuss-line').removeClass('second-line-animate')}
)

$('#animate-btn').hover(
    function(){$('.third-line.discuss-line').addClass('third-line-animate')},
    function(){$('.third-line.discuss-line').removeClass('third-line-animate')}
)

$('#animate-btn').hover(
    function(){$('.button-up.discuss-line').addClass('button-up-animate')},
    function(){$('.button-up.discuss-line').removeClass('button-up-animate')}
)



$('#animate-btn').hover(
    function(){$('.first-line-common').addClass('first-line-common-animate')},
    function(){$('.first-line-common').removeClass('first-line-common-animate')}
)

$('#animate-btn').hover(
    function(){$('.second-line-common').addClass('second-line-common-animate')},
    function(){$('.second-line-common').removeClass('second-line-common-animate')}
)

$('#animate-btn').hover(
    function(){$('.third-line-common').addClass('third-line-common-animate')},
    function(){$('.third-line-common').removeClass('third-line-common-animate')}
)

$('#animate-btn').hover(
    function(){$('.button-up').addClass('button-up-animate')},
    function(){$('.button-up').removeClass('button-up-animate')}
)



//Animation add html elements

if ($(window).width() <= 599) {
    $('.slide-wrapper, .dots, .service-dots, .fixed-construction, .fixed-portfolio, .partners, .vertical-lines').remove();

    $('#beginning-paragraph').before("<div class='slide-wrapper'><div class='beginning-animation-1'><h1>All started with a</h1></div></div><div class='slide-wrapper'><div class='beginning-animation-2'><h1>dream of two</h1></div></div><div class='slide-wrapper'><div class='beginning-animation-3'><h1>students to create</h1></div></div><div class='slide-wrapper'><div class='beginning-animation-4'><h1>their own company.</h1></div></div>");

    $('#vision-paragraph').before("<div class='slide-wrapper'><div class='vision-animation-1'><h1>As a company we seek</h1></div></div><div class='slide-wrapper'><div class='vision-animation-2'><h1>to grow professionally</h1></div></div><div class='slide-wrapper'><div class='vision-animation-3'><h1>and personally</h1></div></div><div class='slide-wrapper'><div class='vision-animation-4'><h1>rewarding business</h1></div></div><div class='slide-wrapper'><div class='vision-animation-5'><h1>relationships.</h1></div></div>");

    $('#mission-paragraph').before("<div class='slide-wrapper'><div class='mission-animation-1'><h1>We build residentials</h1></div></div><div class='slide-wrapper'><div class='mission-animation-2'><h1>& commercials that</h1></div></div><div class='slide-wrapper'><div class='mission-animation-3'><h1>are innovative,</h1></div></div><div class='slide-wrapper'><div class='mission-animation-4'><h1>wonderfully designed</h1></div></div><div class='slide-wrapper'><div class='mission-animation-5'><h1>and eco-friendly, that</h1></div></div><div class='slide-wrapper'><div class='mission-animation-6'><h1>stands the test of time.</h1></div></div>");

    $('#we-also-paragraph').before("<div class='slide-wrapper'><div class='we-also-animation-1'><h1>Grow the market.</h1></div></div><div class='slide-wrapper'><div class='we-also-animation-2'><h1>Teach. Inspire.</h1></div></div>");

    $('#recognition-paragraph').before("<div class='slide-wrapper'><div class='recog-animation-1'><h1>We are one of the</h1></div></div><div class='slide-wrapper'><div class='recog-animation-2'><h1>most sort to</h1></div></div><div class='slide-wrapper'><div class='recog-animation-3'><h1>construction company</h1></div></div><div class='slide-wrapper'><div class='recog-animation-4'><h1>in northern Tamil Nadu.</h1></div></div>");

    $('.fibyl-add').append("<div class='slide-wrapper'><div class='fibyl-animation-1'><h1>Fibyl is</h1></div></div><div class='slide-wrapper'><div class='fibyl-animation-2'><h1>people</h1></div></div>");

    $('#about-id').before("<div id='logo-trigger' class='partners'><div class='pre-title'><div class='pre-title-line line-animation-partners'></div><h5 class='head-animation-partners'>Our Industrial Partners</h5></div><div class='owl-two owl-carousel owl-theme'><div class='item'><div class='container'><div class='row'><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/agni.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-2'><img src='resources/img/partner-logo/anuj.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-3'><img src='resources/img/partner-logo/johnson.png'></div></div></div></div></div></div><div class='item'><div class='container'><div class='row'><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/chettinad.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-2'><img src='resources/img/partner-logo/coromandel.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-3'><img src='resources/img/partner-logo/finolex.png'></div></div></div></div></div></div><div class = 'item'><div class='container'><div class='row'><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/fybros.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/gm.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/hindware.png'></div></div></div></div></div></div><div class = 'item'><div class='container'><div class='row'><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/jaquar.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/kag.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/kajaria.png'></div></div></div></div></div></div><div class= 'item'><div class='container'><div class='row'><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/kerovit.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/nagarjuna.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/philips.png'></div></div></div></div></div></div><div class= 'item'><div class='container'><div class='row'><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/ramco.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/sintex.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/somany.png'></div></div></div></div></div></div><div class= 'item'><div class='container'><div class='row'><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/tata-steel.png'></div></div></div><div id='partners-logo' class='col-12'><div class='slide-wrapper-logo'><div class='logo-animation-1'><img src='resources/img/partner-logo/ultratech.png'></div></div></div></div></div></div></div></div>");

    $('#services-top-paragraph').before("<div class='slide-wrapper'><div class='services-animation-1'><h1>Bringing it all together</h1></div></div><div class='slide-wrapper'><div class='services-animation-2'><h1>is what sets us apart.</h1></div></div>");

    $('#order-first-mobile-add').addClass('order-first');

    $('#portfolio-paragraph').before("<div class='slide-wrapper'><div class='portfolio-animation-1'><h1>Our projects change</h1></div></div><div class='slide-wrapper'><div class='portfolio-animation-2'><h1>lives, bringing</h1></div></div><div class='slide-wrapper'><div class='portfolio-animation-3'><h1>communities closer</h1></div></div><div class='slide-wrapper'><div class='portfolio-animation-4'><h1>together and creating</h1></div></div><div class='slide-wrapper'><div class='portfolio-animation-5'><h1>opportunity.</h1></div></div>");

    $('#heading-animation').after("<div class='slide-wrapper'><div class='what-we-do-animation-1'><h1>We coordinate almost</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-2'><h1>all services and</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-3'><h1>programs to ensure</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-4'><h1>your project is</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-5'><h1>completed safely and</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-6'><h1>to your specific</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-7'><h1>requirements.</h1></div></div>");

    $('#quality-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-1'><h1 id='why-us-trigger1'>Quality</h1></div></div>");
    $('#openness-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-2'><h1 id='why-us-trigger2'>Openness & Honesty</h1></div></div>");
    $('#team-work-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-3'><h1 id='why-us-trigger3'>Team Work</h1></div></div>");
    $('#flexibility-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-4'><h1 id='why-us-trigger4'>Flexibility</h1></div></div>");
    $('#responsive-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-5'><h1 id='why-us-trigger5'>Responsive/ On Time</h1></div></div><div class='slide-wrapper'><div class='why-us-animation-6'><h1 id='why-us-trigger5'>Delivery</h1></div></div>");

    $('#footer-header-add').before("<div class='slide-wrapper'><div class='footer-body-animation-1'><h1>Let us build the best</h1></div></div><div class='slide-wrapper'><div class='footer-body-animation-2'><h1>property in your</h1></div></div><div class='slide-wrapper'><div class='footer-body-animation-3'><h1>locality.</h1></div></div>");

    $(".footer-second").addClass("footer-mobile-second");
    $(".footer-bottom").addClass("footer-mobile-bottom");

}

if (($(window).width() >= 768) && (($(window).width() < 992))) {
    $(".footer-second").addClass("footer-tab-second");
    $(".footer-bottom").addClass("footer-tab-bottom");

    $(".slide-wrapper, .dots, .service-dots").remove();

    $('#beginning-paragraph').before("<div class='slide-wrapper'><div class='beginning-animation-1'><h1>All started with a dream</h1></div></div><div class='slide-wrapper'><div class='beginning-animation-2'><h1>of two students to create</h1></div></div><div class='slide-wrapper'><div class='beginning-animation-3'><h1>their own company.</h1></div></div>");

    $('#vision-paragraph').before("<div class='slide-wrapper'><div class='vision-animation-1'><h1>As a company we seek to</h1></div></div><div class='slide-wrapper'><div class='vision-animation-2'><h1>grow professionally &</h1></div></div><div class='slide-wrapper'><div class='vision-animation-3'><h1>personally rewarding</h1></div></div><div class='slide-wrapper'><div class='vision-animation-4'><h1>business relationships.</h1></div></div>");

    $('#mission-paragraph').before("<div class='slide-wrapper'><div class='mission-animation-1'><h1>We build residentials &</h1></div></div><div class='slide-wrapper'><div class='mission-animation-2'><h1>commercials that are</h1></div></div><div class='slide-wrapper'><div class='mission-animation-3'><h1>innovative, wonderfully</h1></div></div><div class='slide-wrapper'><div class='mission-animation-4'><h1>designed & eco-friendly,</h1></div></div><div class='slide-wrapper'><div class='mission-animation-5'><h1>that stands the test of</h1></div></div><div class='slide-wrapper'><div class='mission-animation-6'><h1>time.</h1></div></div>");

    $('#we-also-paragraph').before("<div class='slide-wrapper'><div class='we-also-animation-1'><h1>Grow the market.</h1></div></div><div class='slide-wrapper'><div class='we-also-animation-2'><h1>Teach. Inspire.</h1></div></div>");

    $('#recognition-paragraph').before("<div class='slide-wrapper'><div class='recog-animation-1'><h1>We are one of the most</h1></div></div><div class='slide-wrapper'><div class='recog-animation-2'><h1>sort to construction</h1></div></div><div class='slide-wrapper'><div class='recog-animation-3'><h1>company in northern</h1></div></div><div class='slide-wrapper'><div class='recog-animation-4'><h1>Tamil Nadu.</h1></div></div>");

    $('.fibyl-add').append("<div class='slide-wrapper'><div class='fibyl-animation-1'><h1>Fibyl is</h1></div></div><div class='slide-wrapper'><div class='fibyl-animation-2'><h1>people</h1></div></div>");

    $('#services-top-paragraph').before("<div class='slide-wrapper'><div class='services-animation-1'><h1>Bringing it all together</h1></div></div><div class='slide-wrapper'><div class='services-animation-2'><h1>is what sets us apart.</h1></div></div>");

    $('#portfolio-paragraph').before("<div class='slide-wrapper'><div class='portfolio-animation-1'><h1>Our projects change lives</h1></div></div><div class='slide-wrapper'><div class='portfolio-animation-2'><h1>bringing communities</h1></div></div><div class='slide-wrapper'><div class='portfolio-animation-3'><h1>closer together &</h1></div></div><div class='slide-wrapper'><div class='portfolio-animation-4'><h1>creating opportunity.</h1></div></div>");

    $('#heading-animation').after("<div class='slide-wrapper'><div class='what-we-do-animation-1'><h1>We coordinate almost all</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-2'><h1>services and programs to</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-3'><h1>ensure your project is</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-4'><h1>completed safely to your</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-5'><h1>specific requirements.</h1></div></div>");

    $('#footer-header-add').before("<div class='slide-wrapper'><div class='footer-body-animation-1'><h1>Let us build the best</h1></div></div><div class='slide-wrapper'><div class='footer-body-animation-2'><h1>property in your locality.</h1></div></div>");

    $('#quality-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-1'><h1 id='why-us-trigger1'>Quality</h1></div></div>");
    $('#openness-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-2'><h1 id='why-us-trigger2'>Openness & Honesty</h1></div></div>");
    $('#team-work-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-3'><h1 id='why-us-trigger3'>Team Work</h1></div></div>");
    $('#flexibility-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-4'><h1 id='why-us-trigger4'>Flexibility</h1></div></div>");
    $('#responsive-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-5'><h1 id='why-us-trigger5'>Responsive/ On Time</h1></div></div><div class='slide-wrapper'><div class='why-us-animation-6'><h1 id='why-us-trigger5'>Delivery</h1></div></div>");
}

if (($(window).width() >= 992) && (($(window).width() < 1200))) {
    $(".footer-second").addClass("footer-tablet-second");
    $(".footer-bottom").addClass("footer-tablet-bottom");

    $("#service-list").addClass("no-space");

    $(".slide-wrapper, .dots, .service-dots").remove();

    $('#beginning-paragraph').before("<div class='slide-wrapper'><div class='beginning-animation-1'><h1>All started with a dream</h1></div></div><div class='slide-wrapper'><div class='beginning-animation-2'><h1>of two students to create</h1></div></div><div class='slide-wrapper'><div class='beginning-animation-3'><h1>their own company.</h1></div></div>");

    $('#vision-paragraph').before("<div class='slide-wrapper'><div class='vision-animation-1'><h1>As a company we seek to</h1></div></div><div class='slide-wrapper'><div class='vision-animation-2'><h1>grow professionally &</h1></div></div><div class='slide-wrapper'><div class='vision-animation-3'><h1>personally rewarding</h1></div></div><div class='slide-wrapper'><div class='vision-animation-4'><h1>business relationships.</h1></div></div>");

    $('#mission-paragraph').before("<div class='slide-wrapper'><div class='mission-animation-1'><h1>We build residentials &</h1></div></div><div class='slide-wrapper'><div class='mission-animation-2'><h1>commercials that are</h1></div></div><div class='slide-wrapper'><div class='mission-animation-3'><h1>innovative, wonderfully</h1></div></div><div class='slide-wrapper'><div class='mission-animation-4'><h1>designed & eco-friendly,</h1></div></div><div class='slide-wrapper'><div class='mission-animation-5'><h1>that stands the test of</h1></div></div><div class='slide-wrapper'><div class='mission-animation-6'><h1>time.</h1></div></div>");

    $('#we-also-paragraph').before("<div class='slide-wrapper'><div class='we-also-animation-1'><h1>Grow the market.</h1></div></div><div class='slide-wrapper'><div class='we-also-animation-2'><h1>Teach. Inspire.</h1></div></div>");

    $('#recognition-paragraph').before("<div class='slide-wrapper'><div class='recog-animation-1'><h1>We are one of the most</h1></div></div><div class='slide-wrapper'><div class='recog-animation-2'><h1>sort to construction</h1></div></div><div class='slide-wrapper'><div class='recog-animation-3'><h1>company in northern</h1></div></div><div class='slide-wrapper'><div class='recog-animation-4'><h1>Tamil Nadu.</h1></div></div>");

    $('.fibyl-add').append("<div class='slide-wrapper'><div class='fibyl-animation-1'><h1>Fibyl is</h1></div></div><div class='slide-wrapper'><div class='fibyl-animation-2'><h1>people</h1></div></div>");

    $('#services-top-paragraph').before("<div class='slide-wrapper'><div class='services-animation-1'><h1>Bringing it all together</h1></div></div><div class='slide-wrapper'><div class='services-animation-2'><h1>is what sets us apart.</h1></div></div>");

    $('#portfolio-paragraph').before("<div class='slide-wrapper'><div class='portfolio-animation-1'><h1>Our projects change lives</h1></div></div><div class='slide-wrapper'><div class='portfolio-animation-2'><h1>bringing communities</h1></div></div><div class='slide-wrapper'><div class='portfolio-animation-3'><h1>closer together &</h1></div></div><div class='slide-wrapper'><div class='portfolio-animation-4'><h1>creating opportunity.</h1></div></div>");

    $('#heading-animation').after("<div class='slide-wrapper'><div class='what-we-do-animation-1'><h1>We coordinate almost all</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-2'><h1>services and programs to</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-3'><h1>ensure your project is</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-4'><h1>completed safely to your</h1></div></div><div class='slide-wrapper'><div class='what-we-do-animation-5'><h1>specific requirements.</h1></div></div>");

    $('#footer-header-add').before("<div class='slide-wrapper'><div class='footer-body-animation-1'><h1>Let us build the best</h1></div></div><div class='slide-wrapper'><div class='footer-body-animation-2'><h1>property in your locality.</h1></div></div>");

    $('#quality-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-1'><h1 id='why-us-trigger1'>Quality</h1></div></div>");
    $('#openness-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-2'><h1 id='why-us-trigger2'>Openness & Honesty</h1></div></div>");
    $('#team-work-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-3'><h1 id='why-us-trigger3'>Team Work</h1></div></div>");
    $('#flexibility-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-4'><h1 id='why-us-trigger4'>Flexibility</h1></div></div>");
    $('#responsive-paragraph').before("<div class='slide-wrapper'><div class='why-us-animation-5'><h1 id='why-us-trigger5'>Responsive/ On Time</h1></div></div><div class='slide-wrapper'><div class='why-us-animation-6'><h1 id='why-us-trigger5'>Delivery</h1></div></div>");
}

//Mobile Navbar

$(function() {
    //caches a jQuery object containing the header element
    var header = $(".home-mobile-navbar");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if ((scroll >= 300 && scroll < 800) ||(scroll >=1200 && scroll < 7750) ) {
            header.removeClass('navbar-black-home').addClass("navbar-white-home");
        } else if ((scroll >= 800 && scroll < 1200) || (scroll >=7750)) {
            header.removeClass("navbar-white-home").addClass('navbar-black-home');
        }
        else {
            header.removeClass("navbar-white-home");
        }
    });
});

$(function() {
    //caches a jQuery object containing the header element
    var header = $(".navbar-black-portfolio");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 260 && scroll < 3800) {
            header.removeClass('navbar-black-portfolio').addClass("navbar-white-portfolio");
        } else {
            header.removeClass("navbar-white-portfolio").addClass('navbar-black-portfolio');
        }
    });
});

$(function() {
    //caches a jQuery object containing the header element
    var header = $(".navbar-black-services");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if ((scroll >= 260 && scroll < 1150) || (scroll >= 3800)) {
            header.removeClass('navbar-black-services').addClass("navbar-white-services");
        } else {
            header.removeClass("navbar-white-services").addClass('navbar-black-services');
        }
    });
});

$(function() {
    //caches a jQuery object containing the header element
    var header = $(".navbar-black-about");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if ((scroll >= 260 && scroll < 2000) || (scroll >= 5600 && scroll < 8800)) {
            header.removeClass('navbar-black-about').addClass("navbar-white-about");
        } else {
            header.removeClass("navbar-white-about").addClass('navbar-black-about');
        }
    });
});

$(function() {
    //caches a jQuery object containing the header element
    var header = $(".navbar-black-blog");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 260 && scroll < 3500 ) {
            header.removeClass('navbar-black-blog').addClass("navbar-white-blog");
        } else {
            header.removeClass("navbar-white-blog").addClass('navbar-black-blog');
        }
    });
});

$(function() {
    //caches a jQuery object containing the header element
    var header = $(".navbar-black-contact");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 260 && scroll < 1800) {
            header.removeClass('navbar-black-contact').addClass("navbar-white-contact");
        } else {
            header.removeClass("navbar-white-contact").addClass('navbar-black-contact');
        }
    });
});





//Hover Change 

$('.service-hover1').hover(
    function(){$('#gradient1').addClass('gradient-bg')},
    function(){$('#gradient1').removeClass('gradient-bg')}
)
$('.service-hover2').hover(
    function(){$('#gradient2').addClass('gradient-bg')},
    function(){$('#gradient2').removeClass('gradient-bg')}
)
$('.service-hover3').hover(
    function(){$('#gradient3').addClass('gradient-bg')},
    function(){$('#gradient3').removeClass('gradient-bg')}
)
$('.service-hover4').hover(
    function(){$('#gradient4').addClass('gradient-bg')},
    function(){$('#gradient4').removeClass('gradient-bg')}
)
$('.service-hover5').hover(
    function(){$('#gradient5').addClass('gradient-bg')},
    function(){$('#gradient5').removeClass('gradient-bg')}
)
$('.service-hover6').hover(
    function(){$('#gradient6').addClass('gradient-bg')},
    function(){$('#gradient6').removeClass('gradient-bg')}
)



$('.bottom-approach').hover(
    function(){ 
        $(this).addClass('black-white')
        $('.bottom-portfolio').addClass('white-black') 
        $(this).removeClass('white-black')
        $('.bottom-portfolio').removeClass('black-white')
    }
)

$('.bottom-portfolio').hover(
    function(){ 
        $(this).addClass('black-white')
        $('.bottom-approach').addClass('white-black') 
        $(this).removeClass('white-black')
        $('.bottom-approach').removeClass('black-white')
    }
)

$('.bottom-approach.approach-service').hover(
    function(){ 
        $(this).addClass('service-black-white')
        $('.bottom-portfolio.portfolio-service').addClass('service-white-black') 
        $(this).removeClass('service-white-black')
        $('.bottom-portfolio.portfolio-service').removeClass('service-black-white')
    }
)

$('.bottom-portfolio.portfolio-service').hover(
    function(){ 
        $(this).addClass('service-black-white')
        $('.bottom-approach.approach-service').addClass('service-white-black') 
        $(this).removeClass('service-white-black')
        $('.bottom-approach.approach-service').removeClass('service-black-white')
    }
)


//Owl partner logos

$('.owl-two').owlCarousel({
    loop:false,
    margin:10,
    navText: [
        '<span aria-label="' + 'Previous' + '"><i class="fas fa-long-arrow-alt-left"></i></span>',
        '<span aria-label="' + 'Next' + '"><i class="fas fa-long-arrow-alt-right"></i></span>'
    ],
    dots:false,
    nav:true,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})


//Owl-Projects

$('.owl-one').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    
    nav:true,
    mouseDrag:true,
    autoplay:true,
    autoplayHoverPause:true,
    animateOut: 'slideOutUp',
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

})(jQuery);


//Quote


  
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function fadeWords(quotewords) {
    Array.prototype.forEach.call(quotewords, function(word) {
      word.animate([{
        opacity: 0,
        filter: "blur("+getRandom(2,5)+"px)"
      }, {
        opacity: 1,
        filter: "blur(0px)"
      }], 
      { 
        duration: 2000,
        delay: getRandom(500,3000),
        fill: 'forwards'
      } 
     )
    })
  }

  function splitWords() {
    let quote = document.querySelector("blockquote q");
    quote.innerText.replace(/(<([^>]+)>)/ig,"");
    quotewords = quote.innerText.split(" "),
    wordCount = quotewords.length;
    quote.innerHTML = "";
    for (let i=0; i < wordCount; i++) {
      quote.innerHTML += "<span>"+quotewords[i]+"</span>";
      if (i < quotewords.length - 1) {
        quote.innerHTML += " ";
      }
    }
    quotewords = document.querySelectorAll("blockquote q span");
    fadeWords(quotewords);
  
}

//Waypoints Quote

var waypoint = new Waypoint({
    element: document.getElementById('quote'),
    handler: function(direction){
        if(direction === "down") {
            splitWords();
    } },
      offset: '90%'
  })




 // images setup
 const images = [
    "resources/img/bgs/construction.jpg",
    "resources/img/bgs/renovation.jpg",
    "resources/img/bgs/planning.jpg",
    "resources/img/bgs/interior-design.jpg",
  ];
  
  // content setup
  const texts = [
    ["CONSTRUCTION", "Know More"],
    ["RENOVATION", "Know More"],
    ["PLANNING AND CONSULTATION", "Know More"],
    ["INTERIOR DESIGNING", "Know More"]
  ]

rgbKineticSlider = new rgbKineticSlider({

    slideImages: images, // array of images > must be 1920 x 1080
    itemsTitles: texts, // array of titles / subtitles

    backgroundDisplacementSprite: 'resources/img/bgs/kinetic-bg-displace.jpg', // slide displacement image 
    cursorDisplacementSprite: 'resources/img/bgs/kinetic-cursor-displace.png', // cursor displacement image

    cursorImgEffect : true, // enable cursor effect
    cursorTextEffect : false, // enable cursor text effect
    cursorScaleIntensity : 0.65, // cursor effect intensity
    cursorMomentum : 0.14, // lower is slower

    swipe: true, // enable swipe
    swipeDistance : window.innerWidth * 0.4, // swipe distance - ex : 580
    swipeScaleIntensity: 2, // scale intensity during swipping

    slideTransitionDuration : 1, // transition duration
    transitionScaleIntensity : 30, // scale intensity during transition
    transitionScaleAmplitude : 160, // scale amplitude during transition

    nav: true, // enable navigation
    navElement: '.main-nav', // set nav class
    
    imagesRgbEffect : false, // enable img rgb effect
    imagesRgbIntensity : 0.9, // set img rgb intensity
    navImagesRgbIntensity : 80, // set img rgb intensity for regular nav 

    textsDisplay : true, // show title
    textsSubTitleDisplay : true, // show subtitles
    textsTiltEffect : true, // enable text tilt
    googleFonts : ['Open Sans:800', 'Open Sans:400'], // select google font to use
    buttonMode : true, // enable button mode for title
    textsRgbEffect : true, // enable text rgb effect
    textsRgbIntensity : 0.03, // set text rgb intensity
    navTextsRgbIntensity : 15, // set text rgb intensity for regular nav

    textTitleColor : 'white', // title color
    textTitleSize : 85, // title size
    mobileTextTitleSize : 80, // title size
    textTitleLetterspacing : 2, // title letterspacing

    textSubTitleColor : 'white', // subtitle color ex : 0x000000
    textSubTitleSize : 30, // subtitle size
    mobileTextSubTitleSize : 30, // mobile subtitle size
    textSubTitleLetterspacing : 2, // subtitle letter spacing
    textSubTitleOffsetTop : 100, // subtitle offset top
    mobileTextSubTitleOffsetTop : 100 // mobile subtitle offset top
});