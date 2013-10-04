var canvasIn = document.getElementById('canvasIn');
var ctxin = canvasIn.getContext('2d');

var bt = $('#sources').outerHeight(true);
var tp = $('#hdr').outerHeight(true);

var cnvW = window.innerWidth;
var cnvH = window.innerHeight - bt - tp;

$('#canvasFull').attr({
    'width': cnvW,
    'height': cnvH
}).css('top', tp + 'px').css('left', '0px');

var htracker = new headtrackr.Tracker();
htracker.init(videoIn, canvasIn);
htracker.start();

document.addEventListener('facetrackingEvent',
  function(event) {
    var scaleW = videoIn.width / cnvW;
    var scaleH = videoIn.height / cnvH;

    var sw = event.width * 3;
    var sh = event.height * 2;
    var sx = event.x + (event.width / 2);
    var sy = event.y;

    var dw = Math.round(sw * scaleW) * 5;
    var dh = Math.round(sh * scaleH) * 5;
    var dx = Math.round((event.x / videoIn.width) * window.innerWidth);
    var dy = Math.round(((event.y/2) / videoIn.height) * cnvH);

    $("#canvasDraw").attr({
        'width': dw,
        'height': dh
    }).css({
        'position': 'absolute',
        'top': dy + 'px',
        'left': dx + 'px'
    });
    //DEBUGGING
    //console.log("scaleW: "+scaleW+", scaleH: "+scaleH+", sx: " + sx + ", sy: " + sy + ", sw: " + sw + ", sh: " + sh + ", dx: " + dx + ", dy: " + dy + ", dw: " + dw + ", dh: " + dh);

    function loop() {
        ctxin.fillStyle = "#000000";
        ctxin.fillRect(0, 0, cnvW, cnvH);
        var videoIn = document.getElementById('videoIn');

        ctxD.drawImage(videoIn, sx, sy, sw, sh, 0, 0, dw, dh);
        setTimeout(loop, 100000);
    }
    var canvasD = document.getElementById('canvasDraw');
    var ctxD = canvasD.getContext('2d');
    var canvasIn = document.getElementById('canvasFull');
    var ctxin = canvasIn.getContext('2d');
    loop();
  }
);
