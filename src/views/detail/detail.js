import { API_HOST } from '../common/api.js';

async function getProductInfo(id) {
  // TODO: API를 호출해서 상품 상세 정보를 가져와서 반환합니다.
  const apiUrl = `${API_HOST}/api/books/${id}`;

  // fetch를 사용하여 GET 요청 보내기
  const productDetail = fetch(apiUrl)
    .then(response => {
      // 응답을 JSON 형식으로 파싱
      return response.json();
    })
    .then(res => {
      // 성공적으로 데이터를 받았을 때 처리
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      // 오류 처리
      console.error('API 호출 중 오류 발생:', error);
    });


  return productDetail

  // 임시 Product 데이터
  // return { 
  //   _id: "1",
  //   title: 'Burger',
  //   category_id: {
  //     _id:"10",
  //     name:"test",
  //     sort: 10,
  //   },
  //   price: "10,000",
  //   content: "상품 설명",
  //   img_url: "https://picsum.photos/300/300",
  //   quantity: 3,
  //   rating: 4,
  //   __v: 0
  // }
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
  
  <div class="bookText">
  ${product.content}
  </div>
  
  <div class="priceButton">
  <p class="price">￦ ${product.price}</p>
  <button type="button">ADD TO CART</button>
  </div>
  </div>
  `;
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
        <span class="Recommends-price">${product.price}</span>
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
