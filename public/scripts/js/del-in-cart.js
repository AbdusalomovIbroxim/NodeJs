document.addEventListener('DOMContentLoaded', () => {
    const deleteFromCartButtons = document.querySelectorAll('.decrementProductQuantity');
    console.log("Скрипт удаления продукта из корзины загружен");
  
    deleteFromCartButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        console.log("Кнопка удаления нажата");

        let productCard = event.target.closest('.product-info').querySelector('.product-data');
          if (!productCard) {
            productCard = event.target.closest('.product-card').querySelector('.product-data');
          }
          const productId = productCard.getAttribute('data-product-id');
          const token = localStorage.getItem('Authorization');
          console.log(productId);

        console.log("ID продукта:", productId);
  
        if (!token) {
          console.log('No token found. Redirecting to login...');
          window.location.href = '/login';
          return;
        }
  
        try {
          const response = await fetch('/cart/remove', {
            method: 'POST',  // Или 'DELETE', в зависимости от API
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ productId })
          });

          if (response.ok) {
            alert('Product removed from cart!');
        } else {
            alert('Failed to remove product from cart');
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
        alert('Failed to remove product from cart');
        }
      });
    });
  });
  