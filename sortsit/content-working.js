// content.js
//Adds a sortable property to the tile element containing the text content from the internal anchor linking to the project, and sorts the projects numerically.
//Alternately, pulls the link from the thumbnail tile to display the project links as text links.
$(document).ready(function() {
console.log("Hello from litmus sorter!");
	
	//add a sortable property to the elements we want to organize, rather than their children's children's children!!
	$("div.project.card.wrapper").each( function (index, value){
			$(this).children().each((index, element) => {
		    if(index == 1){
		    	propertyValue = element.children[1].children[0].children[0].text;
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
            console.log(an + " " + bn);
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
	window.setTimeout(function(){ 
		var deferred = sortMeBy("sortable", ".row-fluid.animated.fadeIn", "div.project.card.wrapper", "asc");
		console.log("deferred done"); 
	}, 750);
  
});

