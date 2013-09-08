var pattern = /[A-z0-9]+\.(com|edu|org|net|xxx|gov|mil|biz|info|mobi|post|pro|ly|io|us)/i;

var blockedSites = [];
function getBlocked() {
	console.log("rebuilding blocked sites array");
	chrome.storage.sync.get("blocking", function(callback){
		console.log(callback.blocking);
		if (callback.blocking !== undefined) {
			blockedSites = callback.blocking;
		}
	});
}

getBlocked();


var trackedSites = [];
var trackedListening = [];
for (var i = 0; i < trackedSites.length; i++) {
		trackedListening.push(false);
}
function getTracked() {
	console.log("rebuilding tracked sites array");
	chrome.storage.sync.get("tracking", function(callback){
		console.log(callback.tracking);
		if (callback.tracking !== undefined) {
			trackedSites = callback.tracking;
		}
	});
}

getTracked();


var timeLeft = [];
function getTimeLeft() {
	console.log("rebuilding time left array");
	chrome.storage.sync.get("time", function(callback){
		console.log(callback.time);
		if (callback.time === undefined){
			timeLeft = callback.time;
		}
	});
	if (timeLeft === undefined) timeLeft = [];
}
getTimeLeft();