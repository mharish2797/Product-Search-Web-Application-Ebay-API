const express =require('express');
const request=require('request');
const PORT=8080;
const app=express();

var path=require('path');
app.use(express.static(path.join(__dirname+'dist')));
const allowedExt = [
 '.js',
 '.ico',
 '.css',
 '.png',
 '.jpg',
 '.woff2',
 '.woff',
 '.ttf',
 '.svg',
];

app.get('/link_autocomplete',function(req,res){
    var zipcode=req.query.zipcode;
    request.get({ url: "http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith="+req.query.zipcode+"&username=mharish2797&country=US&maxRows=5"},      function(error, response, body) { 
        if (!error && response.statusCode == 200) { 
            res.status(200).send(body); 
           }
        else{
            res.status(200).send("error"); 
        } 
       }); 

    });

app.get('/link_all_items',function(req,res){
    var keyword=encodeURI(req.query.keyword);
    var category=req.query.category;
    var cnew=req.query.cnew=="true";
    var cused=req.query.cused=="true";
    var cunspecified=req.query.cunspecified=="true";
    var miles=req.query.miles;
    var zipcode=req.query.zipcode;
    var slocal=req.query.slocal=="true";
    var sship=req.query.sship=="true";
    var turl="http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=HarishMo-products-PRD-916db7c91-f1c779f2&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=50";
    turl+="&keywords="+keyword;
    if(parseInt(category)>0) turl+="&categoryId="+category;
    turl+="&buyerPostalCode="+zipcode;
    var i=0;
    turl+="&itemFilter("+i+").name=MaxDistance&itemFilter("+i+").value="+miles;
    i+=1;
    turl+="&itemFilter("+i+").name=HideDuplicateItems&itemFilter("+i+").value=true";
    i+=1;
    if(cnew||cused||cunspecified){
        turl+="&itemFilter("+i+").name=Condition";
        var j=0;
        if(cnew) {turl+="&itemFilter("+i+").value("+j+")=New"; j+=1;}
        if(cused) {turl+="&itemFilter("+i+").value("+j+")=Used"; j+=1;}
        if(cunspecified) {turl+="&itemFilter("+i+").value("+j+")=Unspecified"; j+=1;}
        i+=1;
    }
    if(slocal) {turl+="&itemFilter("+i+").name=LocalPickupOnly&itemFilter("+i+").value=true"; i+=1;}
    if(sship) {turl+="&itemFilter("+i+").name=FreeShippingOnly&itemFilter("+i+").value=true"; i+=1;}
    turl+="&outputSelector(0)=SellerInfo";
    turl+="&outputSelector(1)=StoreInfo";
    request.get({ url: turl},      function(error, response, body) { 
        if (!error && response.statusCode == 200) { 
            res.status(200).send(body); 
            }
        else{
            res.status(200).send("error"); 
        } 
        }); 

    });


app.get('/link_single_item',function(req,res){
    
    var giveurl="http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=HarishMo-products-PRD-916db7c91-f1c779f2&siteid=0&version=967&ItemID=";
    giveurl+=req.query.item_id+"&IncludeSelector=Description,Details,ItemSpecifics";
    request.get({ url: giveurl}, function(error, response, body) { 
        if (!error && response.statusCode == 200) { 
            res.status(200).send(body); 
            }
        else{
            res.status(200).send("error"); 
        } 
        }); 

    });

app.get('/link_photos',function(req,res){

    var search_engine_id="012752511452745175918:kwpqhy9cjhm"
    var api_key="AIzaSyDJxiN4qMDu06i8JAjYW9Sl3ggL-WUdTCY"
    var giveurl="https://www.googleapis.com/customsearch/v1?q="+encodeURI(req.query.item_id)+"&cx="+search_engine_id+"&imgSize=huge&imgType=news&num=8&searchType=image&key="+api_key;
    request.get({ url: giveurl}, function(error, response, body) { 
        if (!error && response.statusCode == 200) { 
            res.status(200).send(body); 
            }
        else{
            res.status(200).send("error"); 
        } 
        }); 

    });
    

app.get('/link_similar_item',function(req,res){

    var giveurl="http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=HarishMo-products-PRD-916db7c91-f1c779f2&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId=";
    giveurl+=req.query.item_id+"&maxResults=20";
    request.get({ url: giveurl}, function(error, response, body) { 
        if (!error && response.statusCode == 200) { 
            res.status(200).send(body); 
            }
        else{
            res.status(200).send("error"); 
        } 
        }); 

    });

	
app.get('*', (req, res) => {
 if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
   res.sendFile(path.resolve(`dist/${req.url}`));
 } else {
   res.sendFile(path.resolve('dist/index.html'));
 }
});

	
app.listen(PORT,function(){
});