"use strict";

let api = 'https://makeup-api.herokuapp.com/api/v1/products.json'
//let api2 = 'http://makeup-api.herokuapp.com/api/v1/products.json'

var c2= [];

async function fetchingfunction(){
  try{  
   let p1 = await fetch(api);
    
   // console.log(p1);
   const c1 = await p1.json();
   
  //c2=[...c1];

   console.log('Entire Data',c1);
   
   //HTML DOM Elements:
   let wholeParentarea = document.querySelector('.parent');
   //To taking Data:
   for(let i of c1){
    var parentContainer = document.createElement("div");
     parentContainer.classList.add('box')
     try{
        //console.log("Brand:",i.brand);
       let obj = {
           //"Product Id": i.id,
          "Product Name": i.name,
          "Brand": i.brand,
          "Product Price": i.price_sign + ' ' + i.price,
          "Product Image": i.api_featured_image,
          "Product Link": i.product_link,
          "Prodcut Description": i.description,
        }
      
     for(let j of Object.keys(obj)){
        if(obj[j].includes('api_featured_image')){
            var imgdata = document.createElement("img");
            imgdata.setAttribute('src',obj[j]);
            imgdata.classList.add('image')
            parentContainer.append(imgdata);
            continue;
        }else if(j.includes('Name')){
            var productname = document.createElement('p');
            productname.innerHTML = `<b>${obj[j]}<b/>`;
            parentContainer.append(productname);
        }else if(j.includes('Brand')){
         var brand = document.createElement('p');
         brand.innerHTML = `By ${obj[j]}`;
         parentContainer.append(brand);
        }else if(j.includes('Price')){
         var price = document.createElement('p');
         price.innerHTML = `<b>${obj[j]}<b/>`;
         parentContainer.append(price);
        }else if(j.includes('Description')){
         var description = document.createElement('p');
         description.classList.add('description');
         description.innerHTML = `<a href="javascript:alert('${obj[j]}')">Read More</a>`;
         parentContainer.append(description);
        }else if(j.includes('Link')){
         var prodlink = document.createElement('p');
         prodlink.innerHTML = `<button><a href="${obj[j]}" target="_blank"><b>Buy</b></a></button>`;
         prodlink.classList.add('button');
         parentContainer.append(prodlink);
        }
      //   var para1 = document.createElement('p');
      //   para1.innerHTML = `<label><b>${j}</b></label> : ${obj[j]}`;
      //   parentContainer.append(para1);
     }
     wholeParentarea.append(parentContainer);
     console.log(parentContainer);

    //Searching Input
   //  var userInput = document.getElementById('userinput');

   //  userInput.addEventListener((e) => {
   //    var val1 = e.target.value;
   //    console.log(`You searched for ${val1}`);
   //    // for(let k of Object.keys(obj)){
   //    //  if(obj[k].innerHTML.tolowercase().includes(value)){
   //    //    console.log(`You searched for ${userInput.value}`);
   //    //  }
   //    // } 
        
   //  });
   
   // sendinginput(c1);
   
     }
     catch{
        console.log('no data');
     }

   }
   //c2 ={...c1};
   //console.log(c2);
   // sendinginput(c2);

   return c1;

}
catch{
    console.log('Error Occured');
}

}

fetchingfunction();

//To find the Related word from Search Bar

function finduserinput(){

   try{
      let x = document.getElementById('userinput');
      //input = input.tolowercase();
      
      console.log(x.value);

      for(let k of Object.keys(obj)){
         console.log(obj[k]);
           if(obj[k].includes('x.value')){
              console.log("Found",x.value);
              alert(`you searched ${x.value}`);
              obj[k].style.display = "block";
           }
           else{
             alert('Not found');
           }
      }
   }
   catch{
     console.log("Not found");
   }
}
