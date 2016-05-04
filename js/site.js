$(document).ready(function () {

	// Variables
	var $nav = $('.navbar'),
		$body = $('body'),
		$window = $(window),
		$popoverLink = $('[data-popover]'),
		navOffsetTop = $nav.offset().top,
		$document = $(document);

	function init() {
		$window.on('scroll', onScroll);
		$window.on('resize', resize);
		$popoverLink.on('click', openPopover);
		$document.on('click', closePopover);
	}

	function openPopover(e) {
		e.preventDefault();
		closePopover();
		var popover = $($(this).data('popover'));
		popover.toggleClass('open');
		e.stopImmediatePropagation();
	}

	function closePopover(e) {
		if ($('.popover.open').length > 0) {
			$('.popover').removeClass('open')
		}
	}

	$("#button").click(function () {
		$('html, body').animate({
			scrollTop: $("#elementtoScrollToID").offset().top
		}, 2000);
	});

	function resize() {
		$body.removeClass('has-docked-nav');
		navOffsetTop = $nav.offset().top;
		onScroll()
	}

	function onScroll() {
		if (navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
			$body.addClass('has-docked-nav')
		}
		if (navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
			$body.removeClass('has-docked-nav')
		}
	}

	init();

});

$(function () {
	// from http://css-tricks.com/snippets/jquery/smooth-scrolling/
	$('a[href*=#]:not([href=#])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 10
				}, 500);
				return false;
			}
		}
	});
});

chart_dict = {
	'python': "Initially drawn by the approachability of Python's syntax, I quickly came to appreciate the power it affords and began writing scripts.</p><p>After discovering PDX Code Guild, I enrolled in their Python-based 'boot camp,' where I learned a tremendous amount about Python, Django, and other technologies. Python is truly a joy to use, and I hope I can continue with it for a long time.",
	'django': "Since studying at PDX Code Guild, I have worked extensively with Django, including the projects mentioned in the Portfolio section of this page.",
	'html': "I've been familiar with HTML for a number of years, and have created a number of static websites. Learning templating languages and server-side scripting, though, has been incredibly empowering.",
	'css': "Although CSS can be unpredictable at times, it's always been something I've enjoyed working on. Because every small change produces a visible outcome, the effort is perpetually rewarded.",
	'javascript': "Learning Javascript&mdash;including jQuery and Backbone&mdash;has been tremendously useful in making rich web applications. It's an interesting language I'm excited to learn more about.",
	'research': "During my time at Reed College, I undertook a number of lengthy research projects, including a semester-long policy literature review and a year-long senior thesis.</p><p>For more information on my thesis, visit <a href='http://www.helvidius.org/essays/accountability-without-democracy-lessons-from-african-famines-in-the-1980s/'>this site.</a>",
	'writing': "Throughout my time in school, I wrote many, many papers (primarily research papers).</p><p>For a sample of my writing, please visit <a href='http://www.helvidius.org/essays/accountability-without-democracy-lessons-from-african-famines-in-the-1980s/'>this site.</a>"
};

$(".chart-bar").mouseover(function () {
	var key = this.innerHTML.toLowerCase();
	$("#chart-text").html("<p>" + chart_dict[key] + "</p>");
}).hover(
	function () {
		this.style.backgroundColor = "steelblue";
	}, function () {
		this.style.backgroundColor = "#3e5d88";
	}
);

// Validate the form when it's submitted
$("#contact-form").validate({
	invalidHandler: function (event, validator) {
		var errors = validator.numberOfInvalids();
		if (errors) {
			var message = errors == 1
				? "Oops, looks like you missed a field!"
				: "Looks like there're a couple issues with the form.";
			$('.mail-alert').html(message)
				.css('background-color', '#FF858F')
				.show();
		}
	},
	submitHandler: function () {
		$('.mail-alert').css('background-color', "#EEEEEE");
		formSubmit();
	}
});

function formSubmit() {
	var email = $("#emailInput").val();
	var name = $("#nameInput").val();
	var reason = $("#recipientInput").find("option:selected").text();
	var subject = name + " contacted you to say: " + reason;
	var message = $("#messageInput").val();
	$.ajax({
		type: "POST",
		url: "https://mandrillapp.com/api/1.0/messages/send.json",
		data: {
			'key': "LX6mzvXMtEhatC93K-NQXA",
			'message': {
				'from_email': email,
				'from_name': name,
				'headers': {
					'Reply-To': email
				},
				'subject': subject,
				'text': message,
				'to': [{
					'email': 'dsellers90@gmail.com',
					'name': 'Danny Sellers',
					'type': 'to'
				}]
			}
		}
	}).done(function (response) {
		$('.mail-alert').html("Thanks for sending me an email! I'll respond as soon as possible.")
			.css('background-color', '#FF858F')
			.show();
		// Reset fields after successful submission
		$("#emailInput").val('');
		$("#nameInput").val('');
		$("#messageInput").val('');
	}).fail(function (jqXHR, textStatus, errorThrown) {
		$('.mail-alert').css('background-color', '#FF858F')
			.html("Sorry, there was a problem! (" + textStatus + ")<br/>Please reach out to me directly at dsellers90 [at] gmail [dot] com.")
			.show();
	});
	return false;
}