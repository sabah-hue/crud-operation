var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDisc = document.getElementById('productDisc');
var addBtn = document.getElementById('addBtn');
var nameAlert = document.getElementById('nameAlert');
var priceAlert = document.getElementById('priceAlert');
var cateAlert = document.getElementById('cateAlert');

var products = [];
var currentIndex = 0;

// ------- get products from local storage ------------  //
if(localStorage.getItem('products') != null){
    products = JSON.parse(localStorage.getItem('products'));
    displayProduct();
}
// ------- validation ------------  //   
let proNameTest = false;let proPriceTest = false;let proCatTest = false;
function validate(input , regex , nameAlert){
    if(regex.test(input.value)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');

        if(input == productName)
        proNameTest = true;
        else if(input == productPrice)
        proPriceTest = true;
        else if(input == productCategory)
        proCatTest = true;

        if(proNameTest && proPriceTest && proCatTest){
            addBtn.removeAttribute('disabled');  
        } 

    }
    else{
        addBtn.disabled = 'true';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
    }
}


    productName.addEventListener('input' , function(){
         validate(productName,/^[a-zA-Z]{8,}$/,nameAlert);
    }) 
    
    productPrice.addEventListener('input' , function(){
        validate(productPrice, /^[0-9]{1,6}$/,priceAlert);
    }) 
       
    
    productCategory.addEventListener('input' , function(){
        validate(productCategory, /^[a-zA-Z]{8,}$/,cateAlert);
    })   

// ------- add product ------------  //
function addProduct(){
    var product = {
       pName : productName.value,
       pPrice : productPrice.value,
       pCategory : productCategory.value,
       pDisc : productDisc.value
    };

    products.push(product)
    console.log(products);
    localStorage.setItem('products', JSON.stringify(products));
}

// ------- clear form ------------  //
function clearForm(){
    productName.value ='';
    productPrice.value ='';
    productCategory.value = '';
    productDisc.value = '';       
}

// ------- display product ------------  //
function displayProduct(){
    var box = ``;
    for(var i=0 ; i<products.length ; i++){
        box+=`<tr>
        <td>${i}</td>
        <td>${products[i].pName}</td>
        <td>${products[i].pPrice}</td>
        <td>${products[i].pCategory}</td>
        <td>${products[i].pDisc}</td>
        <td><button class="btn btn-warning" onclick="getInfoProduct(${i})">update</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>

    </tr>`;
    }
    document.getElementById('tableBody').innerHTML = box;
}

// ------- delete product ------------  //
function deleteProduct(productIndex){
    products.splice(productIndex,1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProduct();
}

// ------- search in products ------------  //
function searchProduct(term){
    var box = ``;
    for(var i=0 ; i<products.length ; i++){
        console.log(products[i].pName.toLowerCase().includes(term.toLowerCase()))
        if(products[i].pName.toLowerCase().includes(term.toLowerCase())){
        box+=`<tr>
        <td>${i}</td>
        <td>${products[i].pName}</td>
        <td>${products[i].pPrice}</td>
        <td>${products[i].pCategory}</td>
        <td>${products[i].pDisc}</td>
        <td><button class="btn btn-warning">update</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>

        </tr>`;
         }
    }
    document.getElementById('tableBody').innerHTML = box;
}


// ------- get info product to can update ------------  //
function getInfoProduct(index){
    productName.value = products[index].pName;
    productPrice.value = products[index].pPrice;
    productCategory.value = products[index].pCategory;
    productDisc.value = products[index].pDisc;

    addBtn.innerHTML = 'update product';
    currentIndex = index;
} 

// ------- change button name (add or update) ------------  //
addBtn.onclick = function(){
    if(addBtn.innerHTML == 'add product'){
        addProduct();
    }
    else if(addBtn.innerHTML == 'update product'){
        updateProduct();
    }
    clearForm();
    displayProduct();
}

// ------- update product ------------  //
function updateProduct(){
    var product = {
        pName : productName.value,
        pPrice : productPrice.value,
        pCategory : productCategory.value,
        pDisc : productDisc.value
     };
 
     products[currentIndex] = product;
     localStorage.setItem('products', JSON.stringify(products));
     addBtn.innerHTML = 'add product';   
}
