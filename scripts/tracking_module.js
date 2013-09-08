chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.match(pattern) !== null) var url = tab.url.match(pattern)[0];

	getTracked();
	var index = 0;
	for (var i = 0; i < trackedSites.length; i++) {
		if(trackedSites[i] === url) {
			index = i;
		}
	}

	if(trackedListening[index] || changeInfo.status === "loading") return;
	trackedListening[index] = true;

	console.log("TRACKING: " + url + ", page is " + changeInfo.status);

	var time_PageStart = new Date().getTime();
	var time_SiteAllocation = timeLeft[index];
	var time_Elapsed = 0;

	function check() {
		var time_Check = new Date().getTime();
		time_Elapsed = time_Now - time_PageStart;
		console.log("used " + time_Elapsed + " of " + time_SiteAllocation);
		if (time_Elapsed >= time_SiteAllocation) blockSite();
		if (!chrome.tabs.active) {
			stopTimer();
			saveTime();
			while (!chrome.tabs.active) {}
			startTimer();
		}
	}

	var timer;
	function startTimer() {
		time_PageStart = new Date().getTime();
		timer = setInterval(check, 250);
	}

	function stopTimer() {
		trackedListening[index] = false;
		clearInterval(timer);
		check();
	}

	function saveTime() {
		timeLeft[index] = time_SiteAllocation - time_Elapsed;
		chrome.storage.sync.set("time", timeLeft);
		timeChanged = true;
	}

	function blockSite() {
		stopTimer();
		timeLeft[index] = 0;
		chrome.storage.sync.set("time", timeLeft);
		timeChanged = true;
		trackedSites.splice(index, 1);
		chrome.storage.sync.set("tracking", trackedSites);
		trackedChanged = true;
		getBlocked();
		blockedSites.push(trackedSites[index]);
		chrome.storage.sync.set("blocking", blockedSites);
		blockedChanged = true;
		chrome.tabs.reload;
	}
});