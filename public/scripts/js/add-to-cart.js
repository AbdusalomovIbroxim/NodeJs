document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  console.log("Скрипт add-to-cart.js загружен");

  addToCartButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
          console.log("Кнопка нажата");
          let productCard = event.target.closest('.product-info').querySelector('.product-data');
          if (!productCard) {
            productCard = event.target.closest('.product-card').querySelector('.product-data');
          }
          const productId = productCard.getAttribute('data-product-id');
          const token = localStorage.getItem('Authorization');
          console.log(productId);

          if (!token) {
              console.log('No token found. Redirecting to login...');
              window.location.href = '/login';
              return;
          }

          try {
              const response = await fetch('/cart/add', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({ productId, quantity: 1 }),
              });

              if (response.ok) {
                  alert('Product added to cart!');
              } else {
                  alert('Failed to add product to cart');
              }
          } catch (error) {
              console.error('Error adding product to cart:', error);
              alert('Error adding product to cart');
          }
      });
  });
});
