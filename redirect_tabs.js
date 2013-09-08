chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	getBlocked();
	var req = "";
	if (tab.url.match(pattern) !== null) req = tab.url.match(pattern)[0];
	if (blockedSites === undefined || blockedSites === null) blockedSites = [];
	blockedSites = ["facebook.com"];
	console.log("CURRENT LOG: " + blockedSites);
	blockedSites.forEach(function(s){
		console.log("-looking at: " + s);
		if (s === req) {
			console.log("FOUND MATCH, WILL BLOCK");
			chrome.tabs.update(tabId, {url: "chrome-extension://mbipjdgekkbkafemhejdbgaencplgmca/index.html"});
		}
	});
});