let api = 'https://makeup-api.herokuapp.com/api/v1/products.json'

var wholeParentarea = document.querySelector('.parent');


// Variables to keep track of the current page and page size
let currentPage = 1;
let pageSize = 30; // Number of items per page


async function fetchingData(){
  try{  
  
   //const api = `https://makeup-api.herokuapp.com/api/v1/products.json?currentPage=${currentPage}&pageSize=${pageSize}`;

   let p1 = await fetch(api);
   // console.log(p1);
   let c1 = await p1.json();

   console.log('Entire Data',c1);
   //console.log(c1.length);
   //HTML DOM Elements:
   var wholeParentarea = document.querySelector('.parent');
   var k = 1, arrindex = 0, i=0;

fetchingfunction(currentPage, arrindex, k);


function fetchingfunction(currentPage, arrindex, k){   
  clearPage();
  i = arrindex;
  for(i=arrindex; i<c1.length; i++){
    console.log("k", k);
    console.log("i", i);
    if(k <= 30){
     var parentContainer = document.createElement("div");
     parentContainer.classList.add('box')
     try{
        
       let obj = {
          "Product Name": c1[i].name,
          "Brand": c1[i].brand,
          "Product Price": c1[i].price_sign + ' ' + c1[i].price,
          "Product Image": c1[i].api_featured_image,
          "Product Link": c1[i].product_link,
          "Prodcut Description": c1[i].description,
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
     }
     wholeParentarea.append(parentContainer);
     console.log(parentContainer);
     

     }
     catch(err){
        console.log('no data', err);
     }

     
k++;//if loop end
}else if(k >30 || i >= 929){

//Page Buttons
var parentButton = document.createElement("div");
parentButton.classList.add("button-parent");

const firstpage = document.createElement("button");
firstpage.classList.add("page-button");
firstpage.innerHTML = "First";
parentButton.append(firstpage);

const previous = document.createElement("button");
previous.classList.add("page-button");
previous.innerHTML = "« Previous";
parentButton.append(previous);

if(currentPage == 1){
  previous.disabled = true;
  firstpage.disabled = true;
}

const next = document.createElement("button");
next.classList.add("page-button");
next.innerHTML = "Next »";
parentButton.append(next);

const lastpage = document.createElement("button");
lastpage.classList.add("page-button");
lastpage.innerHTML = "Last";
parentButton.append(lastpage);

wholeParentarea.append(parentButton);

 firstpage.addEventListener("click", async function firstPage(){
  arrindex = 0;
  k = 1;
  currentPage = 1;
  await fetchingfunction(currentPage, arrindex, k);
 });


  previous.addEventListener("click", async function previousPage() {
    console.log("prev");
    k = 1;
    currentPage--;
    arrindex = i-60;
    await fetchingfunction(currentPage, arrindex, k);
  });

  
  next.addEventListener("click", async function nextPage() {
      console.log("next");
      k = 1;
      currentPage++;
      arrindex = i;
      await fetchingfunction(currentPage, arrindex, k);
    
  });

  lastpage.addEventListener("click", async function lastPage(){
    arrindex = (c1.length)-1;
    k = 1;
    currentPage = Math.ceil((c1.length)/30);
    await fetchingfunction(currentPage, arrindex, k);
    parentButton.append(firstpage);
    parentButton.append(previous);
    parentButton.append(next);
    parentButton.append(lastpage);
    wholeParentarea.append(parentButton);
        next.disabled = true;
        lastpage.disabled = true;
            
          previous.disabled = false;
          firstpage.disabled = false;

   });

  return;
}

}//for i loop
}

function clearPage(){
  wholeParentarea.innerHTML = '';
}


}
catch(err){
    console.log('Error Occured',err);
}

}

fetchingData();

//To Search Input:
function searchuserinput(){
  let userInput = document.getElementById("userinput").value;
  userInput = userInput.toLowerCase();

  let search = document.getElementsByClassName("box");
  
  for(var i=0; i<search.length; i++){
      if(!search[i].innerHTML.toLowerCase().includes(userInput)){
          search[i].style.display = "none";
      }else{
          search[i].style.display = "list-item";
      }
  }
}
