(function() {
  // highlight js code block
  hljs.initHighlightingOnLoad();
  // example on page 1 script
  var x = new mdDateTimePicker({
    type: 'date'
  });
  document.getElementById('trigger-1').addEventListener('click', function() {
    x.toggle();
  });
  var header = document.getElementById('mddtpp-header');
  var documentation = document.getElementById('documentation/toc')
  document.getElementById('mddtpp-layout').addEventListener('scroll', function () {
    var scrollBarPosition = this.scrollTop;
    var threshold = header.clientHeight;
    if (scrollBarPosition > threshold) {
      documentation.setAttribute('style', 'margin-top: ' + (scrollBarPosition - threshold) + 'px');
    } else {
      documentation.removeAttribute('style');
    }
  });
}).call(this);
