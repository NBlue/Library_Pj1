$(document).ready(function () {
    $(".slider").slick({
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow:
            "<button type='button' class='slick-prev pull-left slick-arrow'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right slick-arrow'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        dots: true,
    });
});

// Top book slider
$(document).ready(function () {
    $(".topbook__slide.active").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow:
            "<button type='button' class='slick-prev pull-left topbook__slick-arrow'><i class='fas fa-long-arrow-alt-left' aria-hidden='true'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next pull-right topbook__slick-arrow'><i class='fas fa-long-arrow-alt-right' aria-hidden='true'></i></button>",
    });
});

// testimonial
$(document).ready(function () {
    $(".testimonial__container").slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
    });
});
