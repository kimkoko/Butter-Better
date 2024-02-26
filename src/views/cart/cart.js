document.addEventListener("DOMContentLoaded", function () {
    // 장바구니 아이템 로드
    loadCartItems();

    // 수량 변경 시 이벤트 리스너 등록
    const quantityInputs = document.querySelectorAll('.cartList table tbody .quantity input');
    quantityInputs.forEach(input => {
        input.addEventListener('input', updateTotalPrice);
    });
});

function loadCartItems() {
    const cartList = document.querySelector('.cartList table tbody');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    cartList.innerHTML = ''; // 기존 목록 초기화

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="checkbox ck"></td>
            <td class="left">
                <div class="book">
                    <p class="img"><img src="${item.img}" alt="상품 이미지"></p>
                    <h3>${item.name}</h3>
                </div>
            </td>
            <td class="price">${item.price}</td>
            <td class="quantity"><input type="text" value="${item.quantity}" min="1"></td>
            <td class="total_price">${item.total}</td>
        `;
        cartList.appendChild(row);
    });
}

function updateTotalPrice(event) {
    const input = event.target;
    const row = input.closest('tr');
    const priceCell = row.querySelector('.cartList table tbody .price');
    const totalPriceCell = row.querySelector('.cartList table tbody .total_price');

    const price = parseFloat(priceCell.textContent.replace('₩', '').replace(',', ''));
    const quantity = parseInt(input.value);
    const totalPrice = price * quantity;

    totalPriceCell.textContent = `₩${totalPrice}`;
}

document.addEventListener("DOMContentLoaded", function () {
    // 전체 선택 체크박스
    const selectAllCheckbox = document.querySelector(".ck-all");
    // 개별 상품 체크박스들
    const selectOneCheckboxes = document.querySelectorAll(".ck");
    // 삭제 버튼
    const removeButton = document.getElementById("removeBtn");
    // 주문하기 버튼
    const checkoutButton = document.querySelector(".checkout");

    // 전체 선택 체크박스 클릭 시
    selectAllCheckbox.addEventListener("click", () => {
        selectOneCheckboxes.forEach(ck => {
            ck.checked = selectAllCheckbox.checked;
        });
    });

    // 개별 상품 체크박스들 클릭 시
    selectOneCheckboxes.forEach(ck => {
        ck.addEventListener("click", () => {
            let cnt = 0;
            selectOneCheckboxes.forEach(ck => {
                if (ck.checked) {
                    cnt++;
                }
            });

            if (cnt === selectOneCheckboxes.length) {
                selectAllCheckbox.checked = true;
            } else {
                selectAllCheckbox.checked = false;
            }
        });
    });

    // 삭제 버튼 클릭 시
    removeButton.addEventListener("click", () => {
        const selectedItems = document.querySelectorAll('.ck:checked');
        selectedItems.forEach(item => {
            item.closest('tr').remove(); // 선택된 상품의 부모 tr 요소를 삭제
        });
        // 삭제 후에는 전체 선택 체크박스도 해제
        selectAllCheckbox.checked = false;
    });
});

