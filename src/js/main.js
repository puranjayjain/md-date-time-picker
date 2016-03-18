(function() {
  // highlight js code block
  hljs.initHighlightingOnLoad();
  // example on page 1 script
  var x = new mdDateTimePicker('date');
  document.getElementById('trigger-1').addEventListener('click', function() {
    x.toggle();
  });
}).call(this);
