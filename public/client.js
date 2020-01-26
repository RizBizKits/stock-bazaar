
  var template = Handlebars.compile("Handlebars <b>{{doesWhat}}</b>");
  // execute the compiled template and print the output to the console
  console.log(template({ doesWhat: "rocks!" }));

$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "/transaction/buy",
        contentType: "application/json"
      }).done(function(data){
           for(var i =1; i<data.length; i++){
           $('#itemsList').append('<div id="r'+ data[i] +'">'+data[i]+'</div>')
           }
      })
  });