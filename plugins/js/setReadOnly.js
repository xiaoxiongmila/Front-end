;(function ($) {
  $.fn.setReadOnly = function(readonly){
    return this.filter('input:text').prop('readonly','true').css('opacity', readonly ? 0.5 : 1.0);
  }
})(jQuery);