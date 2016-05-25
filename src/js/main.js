(function() {
  // highlight js code block
  hljs.initHighlightingOnLoad();
  // example on page 1 script
  var x = new mdDateTimePicker.default({
    type: 'date'
  });
  var y = new mdDateTimePicker.default({
    type: 'date',
    trigger: document.getElementById('test1')
  });
  var z = new mdDateTimePicker.default({
    type: 'time'
  });
  document.getElementById('trigger-1').addEventListener('click', function() {
    x.toggle();
  });
  document.getElementById('trigger-2').addEventListener('click', function() {
    y.toggle();
  });
  document.getElementById('trigger-3').addEventListener('click', function() {
    z.toggle();
  });
  document.getElementById('test1').addEventListener('onOk', function() {
    this.value = y.time.toString();
  });
  var header = document.getElementById('mddtpp-header');
  var documentation = document.getElementById('documentation/toc')
  document.getElementById('mddtpp-layout').addEventListener('scroll', function () {
    var scrollBarPosition = this.scrollTop;
    var threshold = header.clientHeight;
    if (scrollBarPosition > threshold) {
      documentation.setAttribute('style', 'top: 0');
    } else {
      documentation.setAttribute('style', 'top: ' + (112 - scrollBarPosition) + 'px');
    }
  });
}).call(this);
