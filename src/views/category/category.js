import { API_HOST } from '../common/api.js';
let currentPage = 1;
let totalPage = 1;

// 페이지가 로드되면 상품 리스트 렌더링
document.addEventListener('DOMContentLoaded', function () {
  // 페이지네이션 버튼 가져오기
  const prevPageBtn = document.querySelector('.previous-page a');
  const nextPageBtn = document.querySelector('.next-page a');

  // 이전 페이지로 이동
  prevPageBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      getCategoryBooks();
    }
  });

  // 다음 페이지로 이동
  nextPageBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentPage < totalPage) {
      currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      getCategoryBooks();
    }
  });
});

/* 카테고리별 정보 */
async function getCategoryBooks() {
  try {
    // categoryId 가져오는 함수
    function getCategoryIdFromUrl() {
      const url = new URL(window.location.href);
      return url.searchParams.get('category');
    }

    // categoryId 가져오기
    const categoryId = getCategoryIdFromUrl();

    // categoryId를 사용하여 카테고리 정보를 가져오는 API 호출
    const response = await fetch(
      `${API_HOST}/api/categories/books/${categoryId}?page=${currentPage}`
    );

    // API 응답 데이터를 JSON 형태로 변환
    const categoryBooks = await response.json();
    const categoryBook = categoryBooks.data.books;

    totalPage = categoryBook.totalPage;

    // 카테고리 타이틀
    const categoryName = document.getElementById('categoryName');
    categoryName.innerText = `${categoryBook.category}`;

    // 리스트에 뿌려지는 아이템 갯수
    const totalText = document.getElementById('totalCount');
    totalText.innerText = `${categoryBook.productCount} products`;

    // 카테고리별 리스트
    const productListElement = document.getElementById('productList');
    const books = categoryBook.books;

    productListElement.innerHTML = '';

    books.slice(0, 24).forEach((book) => {
      // 상품 요소 생성
      const productItem = document.createElement('li');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
            <a href="/detail?id=${book._id}">
                <div class="img-container"><img src="${
                  book.img_url
                }" alt="제품 이미지"></div>
                <h2>${book.title}</h2>
                <span class="price">${book.price.toLocaleString()} 원</span>
            </a>
        `;

      // 상품 리스트에 상품 추가
      productListElement.appendChild(productItem);
    });
  } catch (error) {
    console.error('카테고리별 정보를 가져오는 중 오류가 발생했습니다:', error);
  }
  updatePagination();
}

// 페이지가 로드되면 상품 리스트 렌더링
window.addEventListener('load', () => {
  getCategoryBooks();
});

function updatePagination() {
  const currentPageInfo = document.getElementById('currentPageInfo');
  currentPageInfo.textContent = `Page ${currentPage} of ${totalPage}`;
}
