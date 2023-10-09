const menu = document.querySelector('.menu');
const menuSection = menu.querySelector('.menu-section');
const menuArrow = menu.querySelector('.menu-mobile-arrow');
const menuClosed = menu.querySelector('.menu-mobile-close');
const menuTrigger = document.querySelector('.menu-mobile-trigger');
const menuOverlay = document.querySelector('.overlay');
let subMenu;

menuSection.addEventListener('click', (e) => {
   if (!menu.classList.contains('active')) {
      return;
   }

   if (e.target.closest('.menu-item-has-children')) {
      const hasChildren = e.target.closest('.menu-item-has-children');
      showSubMenu(hasChildren);
   }
});

menuArrow.addEventListener('click', () => {
   hideSubMenu();
});

menuTrigger.addEventListener('click', () => {
   toggleMenu();
});

menuClosed.addEventListener('click', () => {
   toggleMenu();
});

menuOverlay.addEventListener('click', () => {
   toggleMenu();
});

function toggleMenu() {
   menu.classList.toggle('active');
   menuOverlay.classList.toggle('active');
}

function showSubMenu(hasChildren) {
   subMenu = hasChildren.querySelector('.menu-subs');
   subMenu.classList.add('active');
   subMenu.style.animation = 'slideLeft 0.5s ease forwards';
   const menuTitle = hasChildren.querySelector('i').parentNode.childNodes[0].textContent;
   menu.querySelector('.menu-mobile-title').innerHTML = menuTitle;
   menu.querySelector('.menu-mobile-header').classList.add('active');
}

function hideSubMenu() {
   subMenu.style.animation = 'slideRight 0.5s ease forwards';
   setTimeout(() => {
      subMenu.classList.remove('active');
   }, 300);

   menu.querySelector('.menu-mobile-title').innerHTML = '';
   menu.querySelector('.menu-mobile-header').classList.remove('active');
}

window.onresize = function () {
   if (this.innerWidth > 991) {
      if (menu.classList.contains('active')) {
         toggleMenu();
      }
   }
};



// Get New Arrivals Products **********************************************************
var products = [];
(async function(){
    var response =  await fetch("https://dummyjson.com/products?limit=10&skip=10");
    var finalDataFromApi = await response.json();

    products = finalDataFromApi.products;

    console.log(products);
    
    displayProducts(products);

})();

$('.products ul li').on('click',async function(){
   $(this).addClass("active").siblings().removeClass("active");
   var response =  await fetch($(this).attr("link"))
   var finalDataFromApi = await response.json();

   products = finalDataFromApi.products;

   console.log(products);
   
   displayProducts(products);
});


// $("#tab1").on('click' , async function(){

//    $(this).addClass("active").siblings().removeClass("active");

//    var response =  await fetch("https://dummyjson.com/products?limit=10&skip=10")
//     var finalDataFromApi = await response.json();

//     products = finalDataFromApi.products;

//     console.log(products);
    
//     displayProducts(products);
// })

// $("#tab2").on('click' , async function(){

//    $(this).addClass("active").siblings().removeClass("active");

//    var response =  await fetch("https://dummyjson.com/products?limit=10&skip=10")
//     var finalDataFromApi = await response.json();

//     products = finalDataFromApi.products;

//     console.log(products);
    
//     displayProducts(products);
// })

// $("#tab3").on('click' , async function(){

//    $(this).addClass("active").siblings().removeClass("active");

//    var response =  await fetch("https://dummyjson.com/products?limit=10&skip=10")
//     var finalDataFromApi = await response.json();

//     products = finalDataFromApi.products;

//     console.log(products);
    
//     displayProducts(products);
// })


//Display New Arrivals Products ********************************************************* 
function displayProducts(x) {
    var dataContainer = ``;

    for(i=0 ; i<x.length ; i++){
        dataContainer += `<div class="col-lg-3 col-md-6 pb-4">
            <div class="product">
                <p class="discount bg-danger" >${x[i].discountPercentage}%OFF</p>
               
                <div class="d-flex justify-content-center position-relative">
                  <img class="product-img" src= "${x[i].images[0]}" />
                  <div class="img-icons">
                        <div class="icons">
                            <span> <i class="fa-regular fa-heart fs-3"></i> </span>
                        </div>
                  </div>
                </div>
                
                <div class="product-info h-100 py-2">
                <div class="py-1 position-relative text-center">
                    <p class="text-muted mb-1">${x[i].title}</p>
                    <p class="rate mb-1">${x[i].rating} <i class="fa-solid fa-star"></i> </p>
                    <p class="fw-bold" >$ ${x[i].price}</p>
                    <button class="btn" id="addBtn" onclick="addProduct()"> ADD tO Cart </button>
                </div>
                </div>
            </div>
        </div>`
    }

    document.querySelector("#rowsData").innerHTML = dataContainer;
};
// **************************************************** Add Product to CART 



// **************************************************** Count Down 
var countDownDate = new Date("Jan 20, 2024 15:37:25").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = "-" + days + " " +"D"  ;
  document.getElementById("hours").innerHTML = hours + " " + "H" ;
  document.getElementById("minutes").innerHTML = minutes +" " +  "M" ; 
  document.getElementById("seconds").innerHTML = seconds +" " +  "S" ;

}, 1000);

// *********************************************************** Search Input
function search(searchInput){
   var searchProducts = []; 

   for(i=0 ; i<products.length ;i++ ){
       if(products[i].title.toLowerCase().includes(searchInput.toLowerCase()) == true){
         searchProducts.push(products[i]);
       }
   }
   displayProducts(searchProducts);
};


// ***********************************************************************************************************











