import ProgressBar from 'progress';

var bar = new ProgressBar(':percent :etas :bar', { 
  total: 20,
  complete: '=',
});
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('\ncomplete\n');
    clearInterval(timer);
  }
}, 100);
