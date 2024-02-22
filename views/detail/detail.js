function getProductInfo() {
  // TODO: API를 호출해서 상품 목록을 가져와서 반환합니다.
  
  // 임시 Product 데이터
  return [
    { 
      id: 1,
      name: 'Burger',
      price: 20000,
      content: "상품 설명",
      category: "East",
      starts: 3,
    }
  ]
}


/* 책 정보 */
function updateProductInfo() {
  const productInfoElement = document.querySelector('.mainBox .inner .topBox > div');
  if (!productInfoElement) {
    alert('상품을 표시할 수 없습니다.')
    return
  }
  const productInfo = getProductInfo(); // API 호출해서 상품 목록 가져오기 => 서버를 호출하니까 느림
  
  productInfo.forEach(product => {
      
      productInfoElement.innerHTML = `
        <div class="bookImg">
          <p class="img"><img src="https://picsum.photos/300/300" alt="책 표지"></p>
        </div>

        <div class="bookInfo">
          <h2 class="bookName">${product.name}</h2>
            
          <div class="option">
            <p class="category">${product.category}</p>
            <p class="stars">
              <ion-icon name="star"></ion-icon>
              <span class="num">${product.starts}</span>
            </p>
          </div>

          <div class="bookText">
            ${product.content}
          </div>

          <div class="priceButton">
            <p class="price">￦ ${product.price.toLocaleString()}</p>
            <button type="button">ADD TO CART</button>
          </div>
        </div>
      `;
  })
}


window.addEventListener('load', () => {
  // 페이지가 로드되면 카테고리 이름을 업데이트한다
  updateProductInfo();
})

function getRecommendsList() {
  // TODO: API를 호출해서 상품 목록을 가져와서 반환합니다.

  // 임시 Recommends 데이터
  return [
      { id: 1, name: 'Recommends1', price: '10,000' },
      { id: 2, name: 'Team4 fighting', price: '50,000' },
      { id: 3, name: '정신나가정신나가', price: '30,000' },
      { id: 4, name: '정신들어와정신들어와', price: '70,000' },
  ];
}

function updateRecommendsList() {
  const RecommendsListElement = document.querySelector('ul.Recommends-list');
  if (!RecommendsListElement) {
      alert('상품 목록을 표시할 요소를 찾을 수 없습니다.');
      return;
  }

  const RecommendsList = getRecommendsList(); // API 호출해서 상품 목록 가져오기 => 서버를 호출하니까 느림

  RecommendsListElement.innerHTML = '';
  for (const Recommends of RecommendsList) {
    RecommendsListElement.innerHTML += `
          <li class="Recommends-item">
              <a href="#">
                  <img src="https://picsum.photos/300/300" alt="제품 이미지">
                  <h2>${Recommends.name}</h2>
                  <span class="Recommends-price">${Recommends.price}</span>
              </a>
          </li>
      `;
  }
}

window.addEventListener('load', () => {
  // 페이지가 로드되면 베스트셀러 이름을 업데이트한다
  updateRecommendsList();
});
