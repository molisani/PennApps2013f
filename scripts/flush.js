$('#submit').on('click', function(){
  chrome.storage.sync.clear();
  getTracked();
  getBlocked()
  getTimeLeft();
  console.log("flushed");
});