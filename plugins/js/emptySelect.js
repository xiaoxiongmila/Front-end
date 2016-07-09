;(function($){
  $.fn.emptySelect = function(){
    return this.each(function(){
      if(this.tagName.toUpperCase() === 'SELECT') {
        this.options.length = 0 ;
      }
    })
  }
})(jQuery);