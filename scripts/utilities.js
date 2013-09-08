var pattern = /[A-z0-9]+\.(com|edu|org|net|xxx|gov|mil|biz|info|mobi|post|pro|ly|io|im|us)/i;

var blockedChanged = true;
var blockedSites = [];
getBlocked();

var blockedSites = getBlocked();
function getBlocked() {
	if (blockedChanged) {
		console.log("rebuilding blocked sites array");
		chrome.storage.sync.get("blocking", function(callback){
			console.log(callback.blocking);
			if (callback.blocking === undefined) {
				blockedSites = [];
			} else {
				blockedSites = callback.blocking;
			}
		});
		blockedChanged = false;
	}
}


var trackedChanged = true;
var trackedSites = [];
var trackedListening = [];
getTracked();

function getTracked() {
	if (trackedChanged) {
		console.log("rebuilding tracked sites array");
		chrome.storage.sync.get("tracking", function(callback){
			console.log(callback.tracking);
			if (callback.tracking === undefined) {
				trackedSites = [];
			} else {
				trackedSites = callback.tracking;
			}
		});
		for (var i = 0; i < trackedSites.length; i++) {
			trackedListening.push(false);
		}
		trackedChanged = false;
	}
}

var timeChanged = true;
var timeLeft = [];
getTimeLeft();

function getTimeLeft() {
	if (timeChanged) {
		console.log("rebuilding time left array");
		chrome.storage.sync.get("time", function(callback){
			console.log(callback.time);
			timeLeft = callback.time;
		});
		if (timeLeft === undefined) timeLeft = [];
		timeChanged = false;
	}
}