$(document).ready(function () {

    $(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = Math.max.apply(null, Array.prototype.map.call(document.querySelectorAll('*'), function(el) {
            return +el.style.zIndex;
        })) + 10;
        console.log(zIndex);
        $(this).css('z-index', zIndex);

        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

    $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
    });
});