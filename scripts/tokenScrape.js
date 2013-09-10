var facebookSuccess = "www.facebook.com/connect/login_success.html"

function onFacebookLogin() {
	if (!localStorage.getItem("accessToken")) {
		chrome.tabs.query({}, function(tabs) {
			for (var i = 0; i < tabs.length; i++) {
				if (tabs[i].url.indexOf(facebookSuccess) !== -1) {
					var params = tabs[i].url.split("#")[1];
					var accessToken = params.split("&")[0];
					accessToken = accessToken.split("=")[1];
					localStorage.setItem("accessToken", accessToken);
					chrome.tabs.remove(tabs[i].id);
				}
			}
		});
	}
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);