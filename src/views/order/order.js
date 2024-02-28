document.addEventListener("DOMContentLoaded", function () {
    loadOrderSummary();
    selectText(); // 배송 메세지 선택 관련 함수 호출
});

function loadOrderSummary() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productsListElement = document.querySelector('.products'); // 주문 상품 리스트 컨테이너
    const subTotalElement = document.querySelector('.subTotal .price'); // 소계 가격 표시 요소
    const totalElement = document.querySelector('.total .price'); // 총 가격 표시 요소
    let subTotalPrice = 0;

    // 기존에 표시된 상품 목록 초기화
    productsListElement.innerHTML = '';

    cartItems.forEach(item => {
        const productPrice = parseInt(item.price) * parseInt(item.quantity);
        subTotalPrice += productPrice; // 소계 가격 계산

        // 상품 정보를 표시하는 요소 생성
        const productElement = document.createElement('li');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <p class="img"><img src="${item.img}" alt="${item.name}"></p>
            <p class="name">${item.name}</p>
            <p class="num">${item.quantity}</p>
            <p class="price">₩${productPrice.toLocaleString()}</p>
        `;

        // 생성된 상품 요소를 리스트에 추가
        productsListElement.appendChild(productElement);
    });

    // 배송비 설정
    const shippingCost = subTotalPrice > 30000 ? 0 : 3000; // 소계가 0보다 클 경우 배송비 3,000원 추가
    document.querySelector('.shipping .price').textContent = `₩${shippingCost.toLocaleString()}`;

    // 소계 가격 업데이트
    subTotalElement.textContent = `₩${subTotalPrice.toLocaleString()}`;

    // 총 가격 (소계 + 배송비) 업데이트
    totalElement.textContent = `₩${(subTotalPrice + shippingCost).toLocaleString()}`;
}

/* 배송 메세지 직접 입력 선택 시 인풋 노출 */
function selectText () {
    const select = document.getElementById("message")
    const value = select.options[select.selectedIndex].value
    const messageInput = document.querySelector(".messageInput")

    if (value == 6) {
        messageInput.classList.remove("off")
    } else {
        messageInput.classList.add("off")
    }
}

