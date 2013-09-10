$(document).ready(function() {
	jso_configure({
		"facebook": {
			client_id: "205664679609528",
			redirect_uri: "chrome-extension://gepnhdkidfnbkaeeaamifjeleeilldpc/api.html",
			authorization: "https://www.facebook.com/dialog/oauth"
			presenttoken: "qs"
		},	
		"google": {
			client_id: "965034575120.project.googleusercontent.com",
			redirect_uri: "chrome-extension://gepnhdkidfnbkaeeaamifjeleeilldpc/api.html",
			authorization: "https://accounts.google.com/o/oauth2/auth"
			isDefault: true
		},
		"instagram": {
			client_id: "f7fe698c69fb4a8f8e82776af9af6b9d",
			redirect_uri: "chrome-extension://gepnhdkidfnbkaeeaamifjeleeilldpc/api.html",
			authorization: "https://instagram.com/oauth/authorize/",
			scope: ["basic", "likes"]
		}
	});

	jso_ensureTokens({
		"facebook": ["read_stream"],
		"google": ["https://www.googleapis.com/auth/userinfo.profile"],
		"instagram": ["basic", "likes"]
	});

	$.oajax({
		url: "https://www.googleapis.com/oauth2/v1/userinfo",
		jso_provider: "google",
		jso_allowia: true,
		jso_scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
		dataType: 'json',
		success: function(data) {
			console.log("Response (google):");
			console.log(data);
		}
	});
});