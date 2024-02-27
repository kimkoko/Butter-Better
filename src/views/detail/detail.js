import { API_HOST } from '../common/api.js';

async function getProductInfo(productId) {
  try {
    // API에서 상품 데이터 가져오기
    const response = await fetch(`${API_HOST}/api/books/${productId}`);
    const res = await response.json();
    return res.data

  } catch (error) {
      console.error('상품 리스트를 렌더링하는 중 오류가 발생했습니다:', error);
  }
}

/* 책 정보 */
async function updateProductInfo() {
  const productInfoElement = document.querySelector('.mainBox .inner .topBox > div');
  if (!productInfoElement) {
    alert('상품을 표시할 수 없습니다.')
    return
  }
  // URL에서 상품 ID 가져오기
  function getProductIdFromUrl() {
    const url = new URL(window.location.href);
    return url.searchParams.get('id');
  }
  //해당하는 url에서 상품 id를 가져온다
  const productId = getProductIdFromUrl();
  console.log('productId: ', productId);
  //상품 id를 통해 상품 정보를 가져온다
  const product = await getProductInfo(productId);

  productInfoElement.innerHTML = `
  <div class="bookImg">
      <p class="img"><img src="${product.img_url}" alt="책 표지"></p>
  </div>

  <div class="bookInfo">
      <h2 class="bookName">${product.title}</h2>

      <div class="option">
          <p class="category">${product.category_id.name}</p>
          <p class="stars">
              <ion-icon name="star"></ion-icon>
              <span class="num">${product.rate}</span>
          </p>
      </div>

      <h3 class="price">￦ <span class="price">${product.price.toLocaleString()}</span></h3>
      <div class="priceButton">
          <div class="quantityButton">
              <button id="decreaseQuantity" class="button1"> - </button>
              <span class="quantityInput"> 1 </span>
              <button id="increaseQuantity" class="button2"> + </button>
          </div>
          <!-- <p>￦<span class="price">17,000</span></p> -->
          <button type="button"  class="cartBtn">ADD TO CART</button>
      </div>
      <div class="bookText">
      ${product.content}
  </div>
  `;
}

// 수량 감소 버튼 클릭 시 이벤트 핸들러
document.getElementById('decreaseQuantity').addEventListener('click', function() {
  const quantityInput = document.querySelector('.quantityInput');
  let quantity = parseInt(quantityInput.textContent);
  if (quantity > 1) {
      quantityInput.textContent = --quantity;
  }
});

// 수량 증가 버튼 클릭 시 이벤트 핸들러
document.getElementById('increaseQuantity').addEventListener('click', function() {
  const quantityInput = document.querySelector('.quantityInput');
  let quantity = parseInt(quantityInput.textContent);
  quantityInput.textContent = ++quantity;
});

// ADD TO CART 장바구니 추가버튼 클릭시 아오오오오오오
document.addEventListener("DOMContentLoaded", function() {
  const cartButtons = document.querySelectorAll('.cartBtn');

  cartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const productInfo = getProductInfoFromDOM(button); // 버튼이 속한 상품 정보 가져오기
          saveProductToLocalStorage(productInfo); // 상품 정보를 로컬 스토리지에 저장
          alert('상품이 장바구니에 추가되었습니다!');
      });
  });
});

function getProductInfoFromDOM(button) {
  const productContainer = button.closest('.topBox');
  const productName = productContainer.querySelector('.bookName').textContent;
  const productPrice = productContainer.querySelector('.price').textContent;
  const productQuantity = productContainer.querySelector('.quantityInput').textContent;
  const productImg = productContainer.querySelector('.img img').getAttribute('src');
  return {
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      img: productImg
  };
}

function saveProductToLocalStorage(productInfo) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(productInfo);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


window.addEventListener('load', () => {
  // 페이지가 로드되면 카테고리 이름을 업데이트한다
  updateProductInfo();
})

async function renderRecommendsList() {
  // TODO: API를 호출해서 상품 목록을 가져와서 반환합니다.
  
  try {
    // API에서 상품 데이터 가져오기
    const response = await fetch(`${API_HOST}/api/books`);
    if (!response.ok) {
        throw new Error('상품 데이터를 가져올 수 없습니다.');
    } else {
      console.log("성공이다!!")
    }

    const data = await response.json();
    console.log(data)
    let products = data.data.books
    
    const productListElement = document.getElementById('recommendsList');
    
    // 랜덤으로 4개만 선택
    let selected = [];
    for(let i = 0; i < 4; i++){
      const randomIndex = Math.floor(Math.random() * products.length);
      selected.push(products[randomIndex]);
      products.splice(randomIndex, 1);
    }
    products = selected;

    // 상품 데이터를 기반으로 상품 리스트 생성
    products.forEach(product => {
        // 상품 요소 생성
        const productItem = document.createElement('li');
        productItem.classList.add('Recommends-item');
        productItem.innerHTML = `
        <a href="/src/views/detail/detail.html?id=${product._id}">
        <img src="${product.img_url}" alt="제품 이미지">
        <h2 class="Recommends-name">${product.title}</h2>
        <span class="Recommends-price">${product.price.toLocaleString()}</span>
            </a>
        `;

        productListElement.appendChild(productItem);
    });


    

} catch (error) {
    console.error('상품 리스트를 렌더링하는 중 오류가 발생했습니다:', error);
}
}

window.addEventListener('load', () => {
  // 페이지가 로드되면 베스트셀러 이름을 업데이트한다
  renderRecommendsList();
});
