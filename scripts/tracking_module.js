chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.match(pattern) !== null) var url = tab.url.match(pattern)[0];

	getTracked();
	var index = -1;
	for (var i = 0; i < trackedSites.length; i++) {
		if(trackedSites[i] === url) {
			index = i;
		}
	}

	if (index === -1) return;
	if (trackedListening[index] || changeInfo.status === "loading") return;
	trackedListening[index] = true;

	console.log("TRACKING: " + url + ", page is " + changeInfo.status);

	var time_SiteAllocation = timeLeft[index];
	var time_Elapsed = 0;

	function check() {
		var time_Now = new Date().getTime();
		time_Elapsed = time_Now - time_PageStart;
		console.log("used " + time_Elapsed + " of " + time_SiteAllocation);
		if (time_Elapsed >= time_SiteAllocation) {
			console.log("time ran out");
			blockSite();
		}
	}

	window.addEventListener('blur', function() {
    	console.log("no longer active");
		stopTimer();
		saveTime();
	});

	window.addEventListener('focus', function() {
    	startTimer();
	});

	var timer;
	var time_PageStart;
	function startTimer() {
		time_PageStart = new Date().getTime();
		timer = setInterval(check, 250);
	}

	function stopTimer() {
		trackedListening[index] = false;
		clearInterval(timer);
	}

	function saveTime() {
		timeLeft[index] = time_SiteAllocation - time_Elapsed;
		chrome.storage.sync.set({"time" : timeLeft});
		timeChanged = true;
	}

	function blockSite() {
		stopTimer();
		timeLeft[index] = 0;
		chrome.storage.sync.set({"time" : timeLeft});
		timeChanged = true;
		var transfer = trackedSites[index];
		trackedSites.splice(index, 1);
		chrome.storage.sync.set({"tracking" : trackedSites});
		trackedChanged = true;
		getBlocked();
		blockedSites.push(transfer);
		chrome.storage.sync.set({"blocking" : blockedSites});
		blockedChanged = true;
		chrome.tabs.reload;
	}

	chrome.tabs.onRemoved.addListener(function(tabId2, removeInfo) {
		if (tabId === tabId2) {
			console.log("tab removed");
			stopTimer();
			saveTime();
		}
	});

	chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
		if (tabId === removedTabId) {
			console.log("tab replaced");
			stopTimer();
			saveTime();
		}
	});

	chrome.tabs.onUpdated.addListener(function(tabId2, changeInfo2, tab2) {
		if (tab2.url.match(pattern) !== null) var url2 = tab2.url.match(pattern)[0];
		if (tabId === tabId2 && url !== url2) {
			console.log("tab updated?");
			stopTimer();
			saveTime();
		}
	});

	startTimer();
});