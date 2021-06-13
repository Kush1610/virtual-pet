class Form 
{ 
    constructor() 
    {}
     display()
     { 
 
          var input = createInput("");
           var button = createButton('Play'); 
           input.position(740, 440); 
           button.position(800, 470); 



           button.mousePressed(function()
            {
                 input.hide(); 
                 button.hide();
                  var name = input.value(); 
                  playerCount+=1; 

                  var fedTime,lastFed;

                 fedTime=database.ref('FeedTime');
                 fedTime.on("value",function(data)
                 {
                    lastFed=data.val();
                  })

                  var greeting = createElement('h2'); 
                  if(lastFed>=12){
                  greeting.html(name+" is very hungry");
                  }else if(lastFed==0){
                  greeting.html(name+" is very hungry");
                  }else{
                  greeting.html(name+" is very hungry");
                  }
                  greeting.position(310, 85) 
                  console.log(lastFed)
                  gameState=1


            }); 
  
            } 
            }