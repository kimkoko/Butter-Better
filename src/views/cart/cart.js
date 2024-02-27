document.addEventListener("DOMContentLoaded", function () {
    // 장바구니 아이템 로드
    loadCartItems();
});

function loadCartItems() {
    const cartList = document.querySelector('.cartList table tbody');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    cartList.innerHTML = ''; // 기존 목록 초기화
    
    cartItems.forEach(item => {
        const price = parseInt(item.price.replace(',',''));
        // const price = parseInt(item.price);
        const quantity = parseInt(item.quantity); // 수량을 정수로 변환
        const total_price = price * quantity; // 총 가격 계산
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="checkbox ck"></td>
            <td class="left">
                <div class="book">
                    <p class="img"><img src="${item.img}" alt="상품 이미지"></p>
                    <h3>${item.name}</h3>
                </div>
            </td>
            <td class="price">${price}</td>
            <td class="quantity"><input type="text" value="${quantity}" min="1"></td>
            <td class="total_price">${total_price}</td>
        `;
        console.log(quantity);        
        console.log(price);
        cartList.appendChild(row);
    });
}


// cartItems.forEach(item => {
//     // 가격과 수량을 숫자로 변환하여 계산
//     const price = parseFloat(item.price);
//     const quantity = parseInt(item.quantity);

//     // 유효성 검사
//     if (!isNaN(price) && !isNaN(quantity)) {
//         const total = price * quantity;
//         // 총 가격을 표시하는 열 업데이트
//         row.innerHTML = `
//             <td><input type="checkbox" class="checkbox ck"></td>
//             <td class="left">
//                 <div class="book">
//                     <p class="img"><img src="${item.img}" alt="상품 이미지"></p>
//                     <h3>${item.name}</h3>
//                 </div>
//             </td>
//             <td class="price">${item.price}</td>
//             <td class="quantity"><input type="text" value="${item.quantity}" min="1"></td>
//             <td class="total_price">${total}</td>
//         `;
//     } else {
//         // 가격이나 수량이 유효하지 않은 경우 NaN 대신 다른 값을 표시할 수 있음
//         row.innerHTML = `
//             <td><input type="checkbox" class="checkbox ck"></td>
//             <td class="left">
//                 <div class="book">
//                     <p class="img"><img src="${item.img}" alt="상품 이미지"></p>
//                     <h3>${item.name}</h3>
//                 </div>
//             </td>
//             <td class="price">${item.price}</td>
//             <td class="quantity"><input type="text" value="${item.quantity}" min="1"></td>
//             <td class="total_price">N/A</td>
//         `;
//     }
// });




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

// 모달 열기
const quantityButton = document.querySelector('.quantityBtn');
const quantityModal = document.getElementById('quantityModal');

    quantityButton.addEventListener('click', function() {
    quantityModal.style.display = 'block';
});

// 모달 닫기
const closeButton = document.querySelector('.close');

closeButton.addEventListener('click', function() {
    quantityModal.style.display = 'none';
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', function(event) {
    if (event.target === quantityModal) {
        quantityModal.style.display = 'none';
    }
});




