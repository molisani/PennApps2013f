chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	getBlocked();
	var req = "";
	if (tab.url.match(pattern) !== null) req = tab.url.match(pattern)[0];
	if (blockedSites === undefined || blockedSites === null) blockedSites = [];
	//console.log(new Date().getTime() + "ms, crx will block: " + blockedSites);
	blockedSites.forEach(function(s){
		console.log("is this " + s + "?");
		if (s === req) {
			console.log("FOUND MATCH, WILL BLOCK");
			chrome.tabs.update(tabId, {url: "chrome-extension://gepnhdkidfnbkaeeaamifjeleeilldpc/index.html"});
		}
	});
});