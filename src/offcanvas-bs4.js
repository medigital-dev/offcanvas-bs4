(function ($) {
  $.fn.offcanvas = function (action) {
    const $offcanvas = this;
    let $backdrop = $(".offcanvas-backdrop");

    function createBackdrop() {
      if ($backdrop.length === 0) {
        $backdrop = $('<div class="offcanvas-backdrop"></div>');
        $("body").append($backdrop);
      }
    }

    function show() {
      createBackdrop();
      $offcanvas.addClass("show");
      $backdrop.removeClass("d-none");
    }

    function hide() {
      $offcanvas.removeClass("show");
      $backdrop.addClass("d-none");
    }

    function toggle() {
      createBackdrop();
      if ($offcanvas.hasClass("show")) {
        hide();
      } else {
        show();
      }
    }

    // Klik backdrop untuk close
    $(document)
      .off("click.offcanvas")
      .on("click.offcanvas", ".offcanvas-backdrop", function () {
        hide();
      });

    // Tekan ESC untuk close
    $(document)
      .off("keydown.offcanvas")
      .on("keydown.offcanvas", function (event) {
        if (event.key === "Escape" && $offcanvas.hasClass("show")) {
          hide();
        }
      });

    // Jalankan aksi
    if (action === "show") show();
    else if (action === "hide") hide();
    else if (action === "toggle") toggle();

    return this; // for chaining
  };

  // Event listener: klik button data-toggle="offcanvas"
  $(document).on("click", '[data-toggle="offcanvas"]', function (e) {
    e.preventDefault();
    const target = $(this).data("target");
    $(target).offcanvas("toggle");
  });
})(jQuery);
