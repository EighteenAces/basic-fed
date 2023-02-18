var loader = setInterval(function () {
    if(document.readyState !== "complete") return;
    clearInterval(loader);

    var carts = document.querySelectorAll('.add-cart');

    let products = [
        {
            id: 1,
            name: 'Classical Guitar',
            tag: 'brown',
            price: 8000,
            inCart: 0,
        },
        {
            id: 2, 
            name: 'Electric Guitar',
            tag: 'black',
            price: 18000,
            inCart: 0,
        },
        {
            id: 3,   
            name: 'Ukulele',
            tag: 'white',
            price: 5000,
            inCart: 0,
        },
        {
            id: 4,
            name: 'Acoustic Guitar',
            tag: 'yellow',
            price: 10000,
            inCart: 0,
        },
        {
            id: 5,
            name: 'Bass Guitar',
            tag: 'red-white',
            price: 20000,
            inCart: 0,
        }
    ];


    for (let i=0; i < carts.length; i++){
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
            totalCost(products[i]);
        });
    }

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("closeBtn")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        displayCart();
        modal.style.display = "block";
    }

    // When the user clicks on <span> (Checkout), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }

    function onLoadCartNumbers(){
        let productNumbers = localStorage.getItem('cartNumbers');
        if(productNumbers){
            document.querySelector('.cart span').textContent= productNumbers;
        }
    }
    
    function cartNumbers(product){
        
        let productNumbers = localStorage.getItem('cartNumbers');
        
        productNumbers = parseInt(productNumbers);
    
        if( productNumbers ){
            localStorage.setItem('cartNumbers', productNumbers + 1);    
            document.querySelector('.cart span').textContent= productNumbers + 1;
            document.getElementById("cart_num_modal").textContent= productNumbers + 1;
        }
        else{
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('.cart span').textContent= 1;
            document.getElementById("cart_num_modal").textContent= 1;
        }    
        setItems(product);
    }
    
    // function addToCart(product) {
    //     var prevCount = document.getElementById("items_cart").textContent;
    //     var newCount = parseInt(prevCount) + 1;
    //     document.getElementById("items_cart").textContent = newCount;
    //     cartNumbers(product);
    // }
    
    function setItems(product){
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        // console.log("My cartItems are", cartItems);
    
        if(cartItems != null){
    
            if(cartItems[product.tag] ==undefined) {
                cartItems = {
                    ...cartItems,
                    [product.tag]: product
                }
            }
            console.log(cartItems[product.tag]);
            cartItems[product.tag].inCart += 1;
        }
        else{
            product.inCart = 1;
            cartItems = {
                [product.tag]: product
            }   
        }
    
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    }
    function totalCost(product){
        // console.log("The product price is", product.price);
        let cartCost = localStorage.getItem('totalCost');
    
        console.log("My cartCost is", cartCost);
        console.log(typeof cartCost);
    
        if(cartCost != null){
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + product.price);
        }
        else
        {
            localStorage.setItem("totalCost", product.price);        
        }
    
    }
    
    function displayCart(){
        document.getElementById('cart_num_modal').textContent = document.querySelector('.cart span').textContent;
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        let productContainer = document.querySelector(".products");
        
        let cartCost = localStorage.getItem('totalCost');
        // const { id, name, description, price } = data
        console.log(cartItems);
        if(cartItems && productContainer ){
            productContainer.innerHTML = '';
            Object.values(cartItems).map(item => { 
                const {id} = item 
                productContainer.innerHTML += `
                <div class="product-header">
                    <span class="product-remove-btn"><ion-icon name="close-circle-outline"></ion-icon></span>
                    <span class="product"><img src="./img/item${id}.png"></span>
                    <span class="product-title">${item.name}</span>
                    <span class="price">₱${item.price}</span>
                    <span class="quantity">
                        <span>${item.inCart}</span>
                    </span> 
                    <span class="total">
                        ₱${item.inCart * item.price}.00
                    </span>
                </div>
                `;
            });
    
            productContainer.innerHTML += `
                <div class="basketTotalContainer">
                    <h4 class="basketTotalTitle">
                        Basket Total
                    </h4>
                    <h4 class="basketTotal">
                         ₱${cartCost}.00
                    </h4>
                </div>
                    `
        }
    }
    onLoadCartNumbers();
    displayCart();

 }, 300);

