function checkPhone(n){
    if(n.length == 11){
        jQuery.get("/phone",{phoneNumber : n},(data)=>{
            console.log(data)
            if(data.length == 0){

            }
        })
    }
   
}

function search(){
   let search =  $("#searchB").val();
   $.post("/search",{search : search},(data)=>{
  console.log(data)
   
   
   })
}

$(document).ready(function(){
    $("#searchB").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#tableD tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });