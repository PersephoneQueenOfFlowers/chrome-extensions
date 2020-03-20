// content.js
//Adds a sortable property to the tile element containing the text content from the internal anchor linking to the project, and sorts the projects numerically.
//Alternately, pulls the link from the thumbnail tile to display the project links as text links. 

$(document).ready(function() {
	console.log("Hello from litmus sorter!");
	var AnchorToBeSorted = "";
	var viewOptions = "";

	chrome.storage.sync.get(['projectListOrThumb'], function(e) {
   viewOptions = e.projectListOrThumb;
	});

var myPageReloadTimer = setInterval(function(){
		if ( !window.location.href.includes("https://litmus.com/builder/projects?per_page=100") ){
			window.location.href = "https://litmus.com/builder/projects?per_page=100";
			clearInterval(myPageReloadTimer);
		}
	}, 5);
		//add a sortable property to the elements we want to organize, rather than their children's children's children!!
		$("div.project.card.wrapper").each( function (index, value){
				$(this).children().each((index, element) => {
			    if(index == 1){
			    	AnchorToBeSorted = element.children[1].children[0].children[0];
			    	propertyValue = AnchorToBeSorted.text;
			    	AnchorToBeSorted.classList.add(propertyValue);
			    }
		 		});

			$(this).attr("sortable", propertyValue);
		});

	  function sortMeBy(arg, sel, elem, order) {
	    var $selector = $(sel),
	    $element = $selector.children(elem);
	    $element.sort(function(a, b) {
	   
	            var an = parseInt(a.getAttribute(arg)),
	            bn = parseInt(b.getAttribute(arg));
	            if (order == "asc") {
	                    if (an > bn)
	                    return 1;
	                    if (an < bn)
	                    return -1;
	            } else if (order == "desc") {
	                    if (an < bn)
	                    return 1;
	                    if (an > bn)
	                    return -1;
	            }
	            return 0;
	    });
	    $element.detach().appendTo($selector);
		}


	var myProjectTimer = setInterval(function(){ 
		if(viewOptions == "list" ) {
			$(".card-details .meta .title a").detach().appendTo( $(".row-fluid.animated.fadeIn") ).css({"font-size":"1.25rem","padding":"5px 0"});
			$(".project.card.wrapper").hide();
			$(".row-fluid.animated.fadeIn").css({"display":"flex",
		    "flex-direction": "column",
		    "flex-flow": "column wrap",
		    "max-height": "700px"});

			// window.setTimeout(function(){ 
				var deferred = sortMeBy("class", ".row-fluid.animated.fadeIn", "a", "asc");
				console.log("deferred done"); 
			// }, 500);
			clearInterval(myProjectTimer);

		}
		else if(viewOptions == "thumbs" ) {
			// window.setTimeout(function(){ 
				var deferred = sortMeBy("sortable", ".row-fluid.animated.fadeIn", "div.project.card.wrapper", "asc");
				console.log("deferred done"); 
			// }, 500);
			clearInterval(myProjectTimer);
		}
		else {
			console.log("nothing to see here!!");
		}
	}, 750);

});
