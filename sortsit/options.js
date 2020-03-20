
window.onload = function() {
	function save_options() {
	    var key='projectListOrThumb', testPrefs = document.getElementById('project-view').value;
	    chrome.storage.sync.set({[key]: testPrefs}, function() {
	      console.log('Saved', key, testPrefs);
	     });
	}
	function restore_options() {
	 	chrome.storage.sync.get(['projectListOrThumb'], function(e) {
	    console.log("item is: " + e.projectListOrThumb);
	  });
	}
	 setTimeout(function(){ 
			document.addEventListener('DOMContentLoaded', restore_options);
			document.getElementById('save').addEventListener('click', save_options);
	 }, 750);
};