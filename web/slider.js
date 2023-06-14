const $element = $('input[type="range"]');
var $handle;

$element
  .rangeslider({
    polyfill: false,
    onInit: function() {
      $handle = $('.rangeslider__handle', this.$range);
      updateState($handle[0], this.value);
    }
  })
  //.on('fit', function() {
  //  updateState($handle[0], this.value);
  //});

// Change the state of the slider
function updateState(el, val) {
  // Update handle color
  $handle[0].style.borderColor = val
}
