let api = 'http://makeup-api.herokuapp.com/api/v1/products.json'
//let api2 = 'http://makeup-api.herokuapp.com/api/v1/products.json'

var c2= [];
//let c1 = {};
var wholeParentarea = document.querySelector('.parent');


async function fetchingfunction(){
  try{  
   let p1 = await fetch(api);
    
   // console.log(p1);
   c1 = await p1.json();
   
  //c2=[...c1];

   console.log('Entire Data',c1);
   
   //HTML DOM Elements:
   var wholeParentarea = document.querySelector('.parent');
   //To taking Data:
   for(let i of c1){
    var parentContainer = document.createElement("div");
     parentContainer.classList.add('box')
     try{
        
       let obj = {
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
            imgdata.setAttribute('alt',obj['Product Name']);
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

     }
     catch{
        console.log('no data');
     }

   }
}
catch{
    console.log('Error Occured');
}
return c1, c2;
}

fetchingfunction();

//To Search Input:
const searchInput = document.getElementById("userinput");

function sendfunc(data){
    return data.map(({name, brand, price, price_sign, api_featured_image, product_link, description}) => displayfunc(name, brand, price, price_sign, api_featured_image, product_link, description)).join('');
}

function displayfunc(name, brand, price, price_sign, api_featured_image, product_link, description){
    return `
    <div class="parent"> 
     <div class="box">
       <p><b>${name}</b></p>
       <p>By ${brand}</p>
       <p><b>${price_sign + ' ' + price}</b></p>
       <img class="image" src='${api_featured_image}' alt='${name}'/>
       <p><button class="button"><a href='${product_link}' target="_blank"><b>Buy</b></a></button></p>
       <p class="description"><a href="javascript:alert('${description})">Read More</a></p>
     </div>
   </div>
    
    `;
}

function notfoundfunc(){
    return `
    <div class="parent"> 
    <div class="box">
    No Results Found
    </div>
   </div>
    
    `;
}


if(searchInput){
searchInput.addEventListener("input", (e) =>{
   const value1 = [];
   value1.push(e.target.value.toUpperCase());
   const strinp = value1.join('');
   console.log(strinp);
   const datafiltered = c1.filter(p => p.name.includes(strinp));
   wholeParentarea.innerHTML = datafiltered.length ? sendfunc(datafiltered) : notfoundfunc();
})
}

