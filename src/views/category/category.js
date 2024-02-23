function getCategory(id) {
  // TODO: API를 호출해서 카테고리 정보를 가져와서 반환합니다.
  
  return {
    name: 'American',
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
  // 카테고리 이름 부분의 section의 h1 태그를 찾기
  const categoryTitleH1 = document.querySelector('section.category h1');
  // 못 찾았으면 함수를 끝냄
  if (!categoryTitleH1) {
    alert('카테고리 이름을 표시할 요소를 찾을 수 없습니다.')
    return
  }
  
  // h1태그 안의 내용을 카테고리 이름으로 바꾼다
  categoryTitleH1.innerText = category.name;
}

function getProductList() {
  // TODO: API를 호출해서 상품 목록을 가져와서 반환합니다.
  
  // 임시 Product 데이터
  return [
    { id: 1, name: 'Burger', price: 10000 },
    { id: 2, name: 'Fries', price: 50000 },
    { id: 3, name: 'Cola', price: 30000 },
    { id: 4, name: 'Milkshake', price: 70000},
    { id: 5, name: 'Ice Cream', price: 100000},
    { id: 6, name: 'Hot Dog', price: 200000},
  ]
}

function updateProductList() {
  const productListElement = document.querySelector('ul.product-list');
  if (!productListElement) {
    alert('상품 목록을 표시할 요소를 찾을 수 없습니다.')
    return
  }
  const productList = getProductList(); // API 호출해서 상품 목록 가져오기 => 서버를 호출하니까 느림
  
  productListElement.innerHTML = '';
  for (let i = 0; i <= 16 && i < productList.length; i++) {
    const product = productList[i];
    productListElement.innerHTML += `
    <li class="product-item">
    <a href="#">
    <img src="https://picsum.photos/300/300" alt="제품 이미지">
    <h2>${product.name}</h2>
    <span class="price">${product.price.toLocaleString()}</span>
    </a>
    </li>
    `;
  }
}

window.addEventListener('load', () => {
  // 페이지가 로드되면 카테고리 이름을 업데이트한다
  updateCategoryTitle();
  updateProductList();
})

