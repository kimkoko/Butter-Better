import { API_HOST } from '../common/api.js';

/* 카테고리 데이터 개별 불러오기 */
async function fetchCategoryId(_id) {
  // try {
  // // API에서 카테고리 데이터 가져오기
  // const response = await fetch(`${API_HOST}/api/categories/${categoryId}`);
  // const res = await response.json();
  // // return res.data

  return {
    _id: ObjectId('65d6dec19d642e173175f1b2'),
    name: 'American',
    sort: 0,
  };

  // } catch (error) {
  //     console.error('카테고리를  렌더링하는 중 오류가 발생했습니다:', error);
  // }
}

/* 카테고리 이름 렌더링 함수 */
async function renderCategoryName() {
  try {
    // URL에서 카테고리 ID 가져오기
    function getCategoryIdFromUrl() {
      const url = new URL(window.location.href);
      return url.searchParams.get('id');
    }

    const categoryId = getCategoryIdFromUrl();
    console.log('categoryId: ', categoryId);

    //상품 id를 통해 상품 정보를 가져온다
    const category = await fetchCategoryId(_id);
    console.log(category);

    categoryName.innerText = `${category.name}`;
  } catch (error) {
    console.error('카테고리를  렌더링하는 중 오류가 발생했습니다:', error);
  }
}

/* 상품 데이터를 가져와서 상품 리스트를 렌더링하는 함수 */
async function renderProductList() {
  try {
    // API에서 상품 데이터 가져오기
    const response = await fetch(`${API_HOST}/api/books`);
    const res = await response.json();
    console.log(res.data);

    if (!response.ok) {
      throw new Error('상품 데이터를 가져올 수 없습니다.');
    } else {
      console.log('성공이다!!');
    }

    const products = res.data.books;
    const totalNum = res.data.productCount;
    // const categoryProducts = products.filter(products => products.category_id === category_id)

    const productListElement = document.getElementById('productList');
    const totalText = document.getElementById('totalCount');

    // 상품 데이터를 기반으로 상품 리스트 생성
    products.slice(0, 16).forEach((product) => {
      // 상품 요소 생성
      const productItem = document.createElement('li');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
              <a href="/src/views/detail/detail.html?id=${product._id}">
                  <p class="img"><img src="${
                    product.img_url
                  }" alt="제품 이미지"></p>
                  <h2>${product.title}</h2>
                  <span class="price">${product.price.toLocaleString()} 원</span>
              </a>
          `;

      // 상품 리스트에 상품 추가
      productListElement.appendChild(productItem);
    });

    // 리스트에 뿌려지는 아이템 갯수
    totalText.innerText = `${totalNum} products`;

    //
  } catch (error) {
    console.error('상품 리스트를 렌더링하는 중 오류가 발생했습니다:', error);
  }
}

// 페이지가 로드되면 상품 리스트 렌더링
window.addEventListener('load', () => {
  fetchCategoryId();
  renderCategoryName();
  renderProductList();
});
