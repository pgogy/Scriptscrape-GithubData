chrome.runtime.onMessage.addListener(
	 
	function(request, sender, sendResponse) {	
		
		if(request.command=="parse"){
	
			tab = request.tab;
			console.log("get data");
			get_data();
			
		}
		
		if(request.command=="stop"){
	
			stop = true;
			
		}
		
	}   
		
);

stop = false;
stream_length = 0;
counter = 0;
tweets = 0;
last_parse = false;
tab = 0;
scroll_try = 0;
		
function get_data(){

	chrome.runtime.sendMessage({instruction: "status", message: "Processing data..."}, function(response) {
		});

	output = "rank,handle,commits,contrbs,removals\n";	

	$(".capped-card h3")
		.each(
		
			function(index,value){
			
				rank = $(value)
					.children()
					.first()
					.next()
					.text()
					.split("#")
					.join("");
					
				handle = $(value)
					.children()
					.first()
					.next()
					.next()
					.text();
					
				commits = $(value)
					.children()
					.last()
					.children()
					.first()
					.children()
					.first()
					.text()					
					.split(" commits")
					.join("")
					.split(" commit")
					.join("");

				contribs = $(value)
					.children()
					.last()
					.children()
					.first()
					.children()
					.first()
					.next()
					.text()
					.split(" ++")
					.join("")
					.split(",")
					.join("");
					
				removals = $(value)
					.children()
					.last()
					.children()
					.first()
					.children()
					.first()
					.next()
					.next()
					.text()
					.split(" --")
					.join("")
					.split(",")
					.join("");	
	
				console.log("output adding too");
	
				output = output + rank + "," + handle + "," + commits + "," + contribs + "," + removals + "\n";
				
			}						
	
		);

		
	
	var blob = new Blob([output], {type: "text/plain;charset=utf-8"});	
	saveAs(blob, window.location.href + "-download.csv");
	
	chrome.runtime.sendMessage({instruction: "status", message: "Completed"}, function(response) {
		});		
	
}