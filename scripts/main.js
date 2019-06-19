$(document).ready(function(){
	var currp = -1;
	var pcount = 2;
	var winHeight = 0;
	var swipeOptions = {
		triggerOnTouchEnd: true,
		swipeStatus: swipePrinters,
		allowPageScroll: "vertical",
		threshold: 75
	};

	function mobilecheck() {
	  return $('.mobileFlag').is(':visible');
	}
	function resizeHeader() {
		var newWinHeight = $('#printer_data_win').height();
		if (mobilecheck())  {
			winHeight = newWinHeight;
			$('.main_top').css('min-height', winHeight + 'px');
		}
		else if (winHeight < newWinHeight) {
			winHeight = newWinHeight;
			$('.header').css('min-height', winHeight + 140 + 'px');
		}
	}
	function showDataWin() {
		if (mobilecheck()) {
			$('.main').addClass('nobg');
		}
		else {
			$('.header .maxwidth').css('opacity','0');
		}
		$('#printer_data_win').fadeIn('fast');
	}
	function hideDataWin() {
		$('.header .maxwidth').css('opacity','1');
		$('#printer_data_win').fadeOut('fast');
		$('.printer_button').removeClass('sel');
		$('.header').css('min-height', 0);
		$('.main_top').css('min-height', 0);
		$('.main').removeClass('nobg');
		winHeight = 0;
		currp = -1;
	}
	function showPrinterData() {
		$('#printer_data_win').prop('class','p' + currp);
		$('.printer_data').hide();
		$('.printer_data:eq(' + currp + ')').show();
		$('.printer_button').removeClass('sel');
		$('.printer_button:eq(' + currp + ')').addClass('sel');
		resizeHeader();
	}
	function changePrinter(direction) {
		currp+=direction;
		if (currp>pcount) {
			currp = 0;
		}
		else if (currp<0) {
			currp = pcount;
		}
		showPrinterData();
	}
	function swipePrinters(event, phase, direction, distance) {
		console.log(phase);
		if (phase == "end") {
			if (direction == "right") {
				changePrinter(-1)
			} else if (direction == "left") {
				changePrinter(1);
			}
		}
	}
	$('a[href^="#"]').click(function(e) {
		$('html,body').animate({ scrollTop: $('a[name="' + this.hash.substr(1) + '"]').offset().top}, 600);
		return false;
		e.preventDefault();
	});
	
	$('.printer_button').click(function(){
		var i = $('.printer_button').index(this);
		if (i != currp) {
			currp = i;
			showPrinterData();
			showDataWin();
			if (!mobilecheck()) {
				resizeHeader();
				$('html,body').animate({ scrollTop: 0 },300);
			}
		}
		else {
			hideDataWin();
		}
	});

	$('#close').click(function(){
		hideDataWin();
	});

	$('#prev').click(function() {
		changePrinter(-1);
	});
	$('#next').click(function() {
		changePrinter(1);
	});
	$('#printer_data_win').swipe(swipeOptions);
	$(window).resize (function(){
		if (currp != -1) {
			if (mobilecheck()) {
				$('.main').addClass('nobg');
				$('.header .maxwidth').css('opacity','1');
				$('.header').css('min-height', 0);
			}
			else {
				$('.main').removeClass('nobg');
				$('.header .maxwidth').css('opacity','0');
				$('.main_top').css('min-height', 0);
			}
			winHeight = 0;
			resizeHeader();
		}
	});
});