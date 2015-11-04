/*

Tracking URLs from
------------------

 * http://verysimple.com/2011/07/06/ups-tracking-url/


Tracking Number RegExs from
---------------------------

 * http://forumarchive.vortx.com/threads/136298-Updated-Tracking-Number-RegEx.html
 * http://stackoverflow.com/a/5024011/1029953

*/

module.exports = getTrackingUrl;

var carriers = module.exports.carriers = [
	{
		name : 'ups'
		, url : 'http://wwwapps.ups.com/WebTracking/track?track=yes&trackNums={trackingNumber}'
		, regs : [
			/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/
		]
	}
	, {
		name : 'fedex'
		, url : 'https://www.fedex.com/apps/fedextrack/?tracknumbers={trackingNumber}'
		, regs : [
			/(\b96\d{20}\b)|(\b\d{15}\b)|(\b\d{12}\b)/
			, /\b((98\d\d\d\d\d?\d\d\d\d|98\d\d) ?\d\d\d\d ?\d\d\d\d( ?\d\d\d)?)\b/
			, /^[0-9]{15}$/
		]
	}
	, {
		name : 'usps'
		, url : 'https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1={trackingNumber}'
		, regs : [
			/(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)/
			, /^E\D{1}\d{9}\D{2}$|^9\d{15,21}$/
			, /^91[0-9]+$/
			, /^[A-Za-z]{2}[0-9]+US$/
		]
	}
	, {
		name : 'dhl'
		, url : 'http://www.dhl.com/en/express/tracking.html?AWB={trackingNumber}&brand=DHL'
		, regs : [
			/^\d{10,11}$/
		]
	}
];

var regs = [];

carriers.forEach(function (carrier) { 
	carrier.regs.forEach(function (reg) {
		reg.carrier = carrier;
		regs.push(reg);
	});
});

function getTrackingUrl(trackingNumber) {
	var found = false;
	var reg;
	
	//remove spaces from the tracking number
	trackingNumber = (trackingNumber || "").replace(/\ /gi, '');


	for (var x = 0; x < regs.length; x++) {
		reg = regs[x];
		
		if (reg.test(trackingNumber)) {
			found = true;
			break;
		}
	}

	if (found) {
		return {
			name : reg.carrier.name
			, url : reg.carrier.url.replace(/\{trackingNumber\}/gi, trackingNumber)
		};
	}
	else return null;
}

