var test = require('tape');
var getTrackingUrl = require('./');

//from: http://docs.rocketship.it/php/1-0/tracking-shipments.html
setUpTest('1Z12345E0291980793','ups');
setUpTest('1Z12345E6692804405','ups');
setUpTest('1Z12345E0390515214','ups');
setUpTest('1Z12345E0393657226','ups');
setUpTest('1Z12345E1392654435','ups');
setUpTest('1Z12345E6892410845','ups');
setUpTest('1Z12345E1591910450','ups');
//setUpTest('990728071','ups');
//setUpTest('3251026119','ups');

//from: http://stackoverflow.com/questions/11049025/how-can-i-get-fedex-testing-tracking-number
setUpTest('449044304137821', 'fedex');
setUpTest('149331877648230', 'fedex');
setUpTest('020207021381215', 'fedex');
setUpTest('403934084723025', 'fedex');
setUpTest('920241085725456', 'fedex');
setUpTest('568838414941', 'fedex');
setUpTest('039813852990618', 'fedex');
setUpTest('231300687629630', 'fedex');
setUpTest('797806677146', 'fedex');
setUpTest('377101283611590', 'fedex');
setUpTest('852426136339213', 'fedex');
setUpTest('797615467620', 'fedex');
setUpTest('957794015041323', 'fedex');
setUpTest('076288115212522', 'fedex');
setUpTest('581190049992', 'fedex');
setUpTest('122816215025810', 'fedex');
setUpTest('843119172384577', 'fedex');
setUpTest('070358180009382', 'fedex');

//from: https://tools.usps.com/go/TrackConfirmAction!input.action
setUpTest('9407 1000 0000 0000 0000 00','usps');
setUpTest('7000 0000 0000 0000 0000','usps');
setUpTest('9303 3000 0000 0000 0000 00','usps');
//setUpTest('M000 0000 00','usps');
//setUpTest('82 000 000 00','usps');
setUpTest('EC 000 000 000 US','usps');
setUpTest('9270 1000 0000 0000 0000 00','usps');
setUpTest('EA 000 000 000 US','usps');
setUpTest('CP 000 000 000 US','usps');
setUpTest('9205 5000 0000 0000 0000 00','usps');
setUpTest('1400 0000 0000 0000 0000','usps');
setUpTest('9208 8000 0000 0000 0000 00','usps');
setUpTest('RA 000 000 000 US','usps');
setUpTest('9202 1000 0000 0000 0000 00','usps');
setUpTest('2300 0000 0000 0000 0000','usps');
setUpTest('9400 1000 0000 0000 0000 00','usps');
setUpTest('0300 0000 0000 0000 0000','usps');

//from: https://xmlpi-validation.dhl.com/serviceval/jsps/main/Main_menu.jsp
setUpTest('8564385550', 'dhl');

function setUpTest(trackingNumber, carrier) {
	test('test ' + trackingNumber + ' properly resolves to ' + carrier, function (t) {
		t.plan(5);

		var result = getTrackingUrl(trackingNumber);

		trackingNumber = trackingNumber.replace(/\ /gi, '');

		t.ok(result, 'result is ok');
		t.ok(result.name, 'result.name is ok');
		t.ok(result.url, 'result.url is ok');
		t.equals(result.name, carrier, trackingNumber + ' resolves to ' + carrier);
		t.ok(~result.url.indexOf(trackingNumber), 'result.url contains the tracking number');

		t.end();
	});
}
