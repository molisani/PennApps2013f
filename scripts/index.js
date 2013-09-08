// Initializing the form field counter
var counter = 0;
var trackedSites = [];
// Autopopulating fields
autopopulation();
// Autopopulation of fields
function autopopulation() {
  // Grabbing the tracked websites
  chrome.storage.sync.get(["tracking", "time"], function(callback){
    trackedSites = callback.tracking;
    var times = callback.time;
    // Autopopulation
    if (trackedSites.length > 0) {
      // Iterates through each field
      for (var i = 0; i < trackedSites.length; i++) {
        var field = "<div class=\"form-inline finalformentry\" style=\"margin-bottom: 4px;\"><div class=\"form-group website\"><input type=\"text\" class=\"form-control\" id=\"website" + counter + "\" placeholder=\"Website\" style=\"width: 290px; height: 50px; text-align: center;\"></div> <div class=\"form-group time\"><input type=\"text\" class=\"form-control\" id=\"time" + counter + "\" placeholder=\"Time\" style=\"width: 100px; height: 50px; text-align: center;\"></div></div>"
        counter++;
        var urltext = "#rightform input:eq(" + 2 * i + ")";
        var timetext = "#rightform input:eq(" + (2 * i + 1) + ")";
        // Appending the filled forms
        $("#rightform").append(field);
        $(urltext).val(trackedSites[i]).attr('readonly', true);
        $(timetext).val(times[i] / 60000).attr('readonly', true);
      }
    }
  });
}
// Click handler to live check the Dom
$('#submit').on('click', function(){
  chrome.storage.sync.clear();
  saveInfo();
});
// Save the info the user inputs on the site
function saveInfo() {
  // Fill arrays with blocked websites & times
  var websites = [];
  var times = [];
  // Websites to track/block
  $('.website input').each(function(index) {
    if ($(this).val() != "") {
      websites.push($(this).val());
    }
  });
  // Times alotted
  $('.time input').each(function(index) {
    if ($(this).val() != "") {
      var temp = parseInt($(this).val()) * 60000;
      times.push(temp);
    }
  });
  // Regex match out
  var siteMatch = [];
  var pattern = /[A-z0-9]+\.(com|edu|org|net|xxx|gov|mil|biz|info|mobi|post|pro|ly|io|im|us)/i;
  websites.forEach(function(s) {
    var print = s.match(pattern)[0];
    console.log(print);
    siteMatch.push(print);
  });
  // Saving to chrome sync
  if (siteMatch.length === times.length && siteMatch.length > 0) {
    chrome.storage.sync.set({"tracking": siteMatch, "time": times}, function() {});
    if (!($('#rightform input:last').val() === "")) {
      $("#rightform").append("<div class=\"form-inline finalformentry\" style=\"margin-bottom: 4px;\"><div class=\"form-group website\"><input type=\"text\" class=\"form-control\" id=\"website" + counter + "\" placeholder=\"Website\" style=\"width: 290px; height: 50px; text-align: center;\"></div> <div class=\"form-group time\"><input type=\"text\" class=\"form-control\" id=\"time" + counter + "\" placeholder=\"Time\" style=\"width: 100px; height: 50px; text-align: center;\"></div></div>");
    } else {
      while ($('#rightform input:last').val() === "") {
        $('#rightform input:last').parent().parent().remove();
      }
      $("#rightform").append("<div class=\"form-inline finalformentry\" style=\"margin-bottom: 4px;\"><div class=\"form-group website\"><input type=\"text\" class=\"form-control\" id=\"website" + counter + "\" placeholder=\"Website\" style=\"width: 290px; height: 50px; text-align: center;\"></div> <div class=\"form-group time\"><input type=\"text\" class=\"form-control\" id=\"time" + counter + "\" placeholder=\"Time\" style=\"width: 100px; height: 50px; text-align: center;\"></div></div>");
    }
    // Locking the user's input
    $('.website input').each(function(index) {
      if ($(this).val() != "") {
        $(this).attr('readonly', true);
      }
    });
    $('.time input').each(function(index) {
      if ($(this).val() != "") {
        $(this).attr('readonly', true);
      }
    });
  }
}
// Pull websites off of Chrome sync
function pullOff() {
  chrome.storage.sync.get(["tracking", "time"],function(message){
      console.log(message.tracking + " : " + message.time);
  });
}
// Add form fields
$("#add").click(function() {
  var field = "<div class=\"form-inline finalformentry\" style=\"margin-bottom: 4px;\"><div class=\"form-group website\"><input type=\"text\" class=\"form-control\" id=\"website" + counter + "\" placeholder=\"Website\" style=\"width: 290px; height: 50px; text-align: center;\"></div> <div class=\"form-group time\"><input type=\"text\" class=\"form-control\" id=\"time" + counter + "\" placeholder=\"Time\" style=\"width: 100px; height: 50px; text-align: center;\"></div></div>"
  counter++;
  $("#rightform").append(field);
});
// Remove form fields
$("#minus").click(function() {
  var readAttr = $(".finalformentry input:last").attr("readonly");
  if ( readAttr != "readonly") {
    $(".finalformentry div:last").parent().remove();
  }
});