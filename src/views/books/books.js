import { API_HOST } from '../common/api.js';

/* All Books */
async function getAllBooks(allBooks) {
  try {
    // 서버에서 모든 책 목록을 가져오는 API 호출
    const response = await fetch(`${API_HOST}/api/books`);

    // API 응답 데이터를 JSON 형태로 변환
    const allBooks = await response.json();
    console.log('모든 책 목록:', allBooks);

    const books = allBooks.data.books
    console.log(books);

    // 여기서 책 목록을 활용하여 원하는 작업을 수행할 수 있습니다.
    const productListElement = document.getElementById('productList');

    // totalNum
    // 리스트에 뿌려지는 아이템 갯수
    const totalText = document.getElementById('totalCount');
    totalText.innerText = `${allBooks.data.productCount} products`;

    books.slice(0, 24).forEach((book) => {
      // 상품 요소 생성
      const productItem = document.createElement('li');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
            <a href="/src/views/detail/detail.html?id=${book._id}">
                <p class="img"><img src="${book.img_url}" alt="제품 이미지"></p>
                <h2>${book.title}</h2>
                <span class="price">${book.price.toLocaleString()} 원</span>
            </a>
        `;

      // 상품 리스트에 상품 추가
      productListElement.appendChild(productItem);
    });
  } catch (error) {
    console.error('모든 책 목록을 조회하는 중 오류가 발생했습니다:', error);
  }
}

// 페이지가 로드되면 상품 리스트 렌더링
window.addEventListener('load', () => {
  getAllBooks();
});
