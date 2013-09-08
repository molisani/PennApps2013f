chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	var pageStart = new Date().getTime();

	getTracked();
	getTimeLeft();
	var index = 0;
	if (tab.url.match(pattern) !== null) var url = tab.url.match(pattern)[0];
	console.log("TRACKING: " + url + ", page is " + changeInfo.status);


	for (var i = 0; i < trackedSites.length; i++) {
		if(trackedSites[i] === url) {
			index = i;
		}
	}

	if(trackedListening[index] || changeInfo.status === "loading") return;
	trackedListening[index] = true;

	var pageTimeAllocation = timeLeft[index];
	var timeElapsed = 0;

	var timer = setInterval(check, 250);

	console.log("tracking page index: " + index);
	console.log("tracking page time: " + pageTimeAllocation);

	function check() {
		console.log("start check");
		var timeNow = new Date().getTime();
		timeElapsed = timeNow - pageStart;
		console.log(timeElapsed);
		if (pageTimeAllocation <= timeElapsed) {
			timeOut();
		}
		if (chrome.tabs.active) goneInactive();
		console.log("end check");
	}

	window.onBeforeUnload = saveTimeLeaving();

	function saveTimeLeaving() {
		clearInterval(timer);
		check();
		timeLeft[index] = pageTimeAllocation - timeElapsed;
	}

	function goneInactive() {
		//TODO
	}

	function timeOut() {
		clearInterval(timer);
		trackedSites.splice(index, 1);
		chrome.storage.sync.set("tracking", trackedSites);
		getBlocked();
		blockedSites.push(trackedSites[index]);
		chrome.storage.sync.set("blocking", blockedSites);
		chrome.tabs.reload;
	}
});