$('#submit').on('click', function(){
  chrome.storage.sync.clear();
  console.log("flushed");
});