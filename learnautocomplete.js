function initialize(){
	autocomplete = new google.maps.places.Autocomplete($("#search")[0]);
	datepicking();
}

function datepicking(){
	$(document).ready(function(){
		$("#datepick").datepicker({ dateFormat: "dd-mm-yy" , 
			onSelect: function(){
				/* thedateis = $(this).datepicker('getDate');  // used to get date in full format with Day and UTC */
				var dt = $("#dynamictableid");
				for(var i = dt.length - 1; i >= 0; i--){
					if(dt[i]){
						dt[i].parentNode.removeChild(dt[i]);
					}
				}
				thedateis = $("#datepick").datepicker().val();  //I could use $(this) in place of $("#datepick")
				
				google.maps.event.addListener(autocomplete,"place_changed",function(){
					var dt = $("#dynamictableid");
					for(var i = dt.length - 1; i >= 0; i--){
						if(dt[i]){
							dt[i].parentNode.removeChild(dt[i]);  //check again
						}
					}
				});
				fillInAddress();
			}
		});
	});
}

function fillInAddress(){
	placedetails = autocomplete.getPlace();
	dynamictable = $("<table></table>").attr({id: "dynamictableid"});
	for(var i = 0; i < placedetails.address_components.length; i++){
		dynamicrow = $("<tr></tr>").appendTo(dynamictable);
		thekey = $("<td></td>").appendTo(dynamicrow);
		thevalue = $("<td></td>").appendTo(dynamicrow);
		akey = placedetails.address_components[i].types[0];
		avalue = placedetails.address_components[i].long_name;
		thekey.text(akey);
		thevalue.text(avalue);
	}
	dynamicrow = $("<tr></tr>").appendTo(dynamictable);
	thedate = $("<td></td>").appendTo(dynamicrow);
	thedatevalue = $("<td></td>").appendTo(dynamicrow);
	thedate.text("date");
	thedatevalue.text(thedateis);
	dynamictable.appendTo("#details");
}


//to download below

$("button").click(function () {
  var str="";
  $('tr').each(function() {

        $(this).find('td').each(function() {

         str=str+$(this).html()+"\t";
  });
      str=str+"\n";

  });

  

        window.open('data:application/vnd.ms-excel,' + (str));
    });
