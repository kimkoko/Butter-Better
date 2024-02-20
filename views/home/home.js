// home.js 파일

function getBestSellers(id) {
    // TODO: API를 호출해서 베스트셀러 정보를 가져와서 반환합니다.
  
    return {
        name: 'Bookname',
        price: 'Bookprice'
    };
}

// ID를 URL에서 가져오는 함수
function getBestSellersIdFromUrl() {
    const url = new URL(window.location.href);
    return Number(url.searchParams.get('id'));
}
  
const BestSellersId = getBestSellersIdFromUrl();
console.log('BestSellersId: ', BestSellersId);
let BestSellers = getBestSellers(BestSellersId);
  
function updateBestSellersTitle() {
    // 베스트셀러 이름 부분의 section의 h1 태그를 찾기
    const BestSellersTitleH1 = document.querySelector('section.Best-Sellers h1');
    // 못 찾았으면 함수를 끝냄
    if (!BestSellersTitleH1) {
        alert('베스트셀러 이름을 표시할 요소를 찾을 수 없습니다.');
        return;
    }
  
    // h1태그 안의 내용을 카테고리 이름으로 바꾼다
    BestSellersTitleH1.innerText = BestSellers.name;
}
  
function getBestSellersList() {
    // TODO: API를 호출해서 상품 목록을 가져와서 반환합니다.
  
    // 임시 BestSellers 데이터
    return [
        { id: 1, name: 'Best1', price: '10,000' },
        { id: 2, name: 'Best2', price: '50,000' },
        { id: 3, name: 'Best3', price: '30,000' },
        { id: 4, name: 'Best4', price: '70,000' },
        { id: 5, name: 'Best5', price: '20,000' },
        { id: 6, name: 'Best6', price: '80,000' },
        { id: 7, name: 'Best7', price: '25,000' },
        { id: 8, name: 'Best8', price: '35,000' }
    ];
}
  
function updateBestSellersList() {
    const BestSellersListElement = document.querySelector('ul.Best-list');
    if (!BestSellersListElement) {
        alert('상품 목록을 표시할 요소를 찾을 수 없습니다.');
        return;
    }
  
    const BestSellersList = getBestSellersList(); // API 호출해서 상품 목록 가져오기 => 서버를 호출하니까 느림
  
    BestSellersListElement.innerHTML = '';
    for (const Bestseller of BestSellersList) {
        BestSellersListElement.innerHTML += `
            <li class="Best-item">
                <a href="#">
                    <img src="https://picsum.photos/300/300" alt="제품 이미지">
                    <h2>${Bestseller.name}</h2>
                    <span class="Best-price">${Bestseller.price}</span>
                </a>
            </li>
        `;
    }
}
  
window.addEventListener('load', () => {
    // 페이지가 로드되면 베스트셀러 이름을 업데이트한다
    updateBestSellersTitle();
    updateBestSellersList();
});
