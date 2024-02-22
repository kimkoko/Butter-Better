function getCategory(id) {
    // TODO: API를 호출해서 카테고리 정보를 가져와서 반환합니다.
    
    return {
      name: 'East',
    }
  }
  
  // ID를 URL에서 가져오는 함수
  function getCategoryIdFromUrl() {
    const url = new URL(window.location.href);
    return Number(url.searchParams.get('id'));
  }
  
  // URL = /products/category.html?id=1
  // URL: /category/1/products
  
  const categoryId = getCategoryIdFromUrl();
  console.log('categoryId: ', categoryId);
  let category = getCategory(categoryId);
  
  function updateCategoryTitle() {
    // 카테고리 이름 부분의 태그를 찾기
    const categoryTitle = document.querySelector('.option .category');
    // 못 찾았으면 함수를 끝냄
    if (!categoryTitle) {
      alert('카테고리 이름을 표시할 수 없습니다.')
      return
    }
    
    // 태그 안의 내용을 카테고리 이름으로 바꾼다
    categoryTitle.innerText = category.name;
  }

  function getProductInfo() {
    // TODO: API를 호출해서 상품 목록을 가져와서 반환합니다.
    
    // 임시 Product 데이터
    return [
      { id: 1, name: 'Burger', price: 10000, content: "상품 설명",}
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
              <p class="category"></p>
              <p class="stars">
                <ion-icon name="star"></ion-icon>
                <span class="num">5</span>
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
    updateCategoryTitle();
    updateProductInfo();
  })
  
  