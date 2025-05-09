(function ($) {
  $.fn.offcanvas = function (action, config = {}) {
    const $offcanvas = this;

    let $backdrop = $(".offcanvas-backdrop");
    function createBackdrop() {
      if ($backdrop.length === 0) {
        $backdrop = $('<div class="offcanvas-backdrop"></div>');
        $("body").append($backdrop);

        // Klik backdrop untuk menutup
        $backdrop.on("click", function () {
          hide();
        });
      }
      return $backdrop;
    }

    function show() {
      createBackdrop();
      $offcanvas.addClass("show");
      $("body").addClass("offcanvas-open");
      $backdrop.removeClass("d-none");
    }

    function hide() {
      $offcanvas.removeClass("show");
      $("body").removeClass("offcanvas-open");
      $backdrop.addClass("d-none");
    }

    function toggle() {
      if ($offcanvas.hasClass("show")) {
        hide();
      } else {
        show();
      }
    }

    // Tekan ESC untuk close (bind hanya sekali di awal)
    if (!$(document).data("offcanvas-esc-bound")) {
      $(document).on("keydown.offcanvas", function (event) {
        if (event.key === "Escape") {
          $(".offcanvas.show").each(function () {
            $(this).offcanvas("hide");
          });
        }
      });
      $(document).data("offcanvas-esc-bound", true);
    }

    // Jalankan aksi
    if (action === "show") show();
    else if (action === "hide") hide();
    else if (action === "toggle") toggle();

    return this; // for chaining
  };

  // Event listener: klik button
  $(document).on("click", '[data-toggle="offcanvas"]', function (e) {
    e.preventDefault();
    let config = {};
    const target = $(this).data("target");
    const position = $(this).data("position");
    console.log(position);

    if (position !== undefined) {
      $(target).addClass(".offcanvas-" + position);
    }

    $(target).offcanvas("toggle");
  });
})(jQuery);
