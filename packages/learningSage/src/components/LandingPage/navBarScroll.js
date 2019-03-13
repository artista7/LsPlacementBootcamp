import $ from "jquery";

$(function () {
    $(document).scroll(function () {
        var $nav = $(".fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });

    var navbarToggleButton = $("#navbarToggleButton");
    var collapsedNavbar = $("#navbarResponsive");

    navbarToggleButton.click(() => {
        if (collapsedNavbar.hasClass("collapse")) {
            collapsedNavbar.removeClass("collapse");
        }
        else {
            collapsedNavbar.addClass("collapse");
        }
    });

});