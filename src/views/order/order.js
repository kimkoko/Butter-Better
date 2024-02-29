import { API_HOST } from '../common/api.js';

document.addEventListener('DOMContentLoaded', function () {
  loadOrderSummary();
  setupSelectTextFunctionality();
  setupOrderSubmission();
});

/* 배송 메세지 직접 입력 선택 시 인풋 노출 */
function setupSelectTextFunctionality() {
  const messageSelect = document.getElementById('message');
  messageSelect.addEventListener('change', function () {
    const messageInput = document.querySelector('.messageInput');
    if (this.value == '6') {
      // 'this'는 이벤트가 발생한 <select> 요소를 참조
      messageInput.classList.remove('off');
    } else {
      messageInput.classList.add('off');
    }
  });
}

function setupOrderSubmission() {
  const payButton = document.querySelector('.payButton');
  payButton.addEventListener('click', submitOrder);
}

async function submitOrder() {
  const orderData = collectOrderData();
  try {
    const response = await fetch(`${API_HOST}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 인증이 필요한 경우 인증 헤더 추가, 현재 TEAM4는 인증이 필요없는 기능구현
        //'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    });

    console.log(orderData);
    if (!response.ok) {
      throw new Error(`주문 생성에 실패했습니다: ${response.statusText}`);
    }

    const order = await response.json();
    alert('주문이 성공적으로 완료되었습니다.');

    showOrderCompletion(order.data._id, order.data.createdAt); // 주문 완료 화면 주문번호와 주문번호시간 출력

    localStorage.removeItem('cartItems'); // 주문 완료 후 장바구니 비우기
  } catch (error) {
    console.error('주문 생성 실패:', error);
  }
}

function collectOrderData() {
  // 입력 필드에서 정보 수집
  const nameInput = document.querySelector('input[placeholder="이름"]');
  const emailInput = document.querySelector('input[placeholder="이메일"]');
  const phoneInput = document.querySelector('input[placeholder="휴대 전화"]');
  const postcodeInput = document.querySelector('input[placeholder="우편번호"]');
  const mainAddressInput = document.querySelector(
    'input[placeholder="기본 주소"]'
  );
  const detailAddressInput = document.querySelector(
    'input[placeholder="나머지 주소 (선택)"]'
  );
  const messageSelect = document.getElementById('message');
  const messageInput = document.querySelector('.messageInput');
  const selectedMessage =
    messageSelect.value === '6'
      ? messageInput.value
      : messageSelect.options[messageSelect.selectedIndex].text;

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // 주문 상품 데이터 변환
  const products = cartItems.map((item) => ({
    name: item.name,
    img_url: item.img, // 스키마에 정의된 필드명과 일치하도록 주의
    quantity: item.quantity,
  }));

  // 총 가격 및 배송비 계산
  let totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = totalPrice >= 30000 ? 0 : 3000; // 배송비 조건 적용
  totalPrice += shippingFee;

  // 서버에 보낼 주문 데이터 구성
  return {
    products: products,
    orderer: {
      email: emailInput.value,
      phone: phoneInput.value,
      name: nameInput.value,
      address: {
        postcode: postcodeInput.value,
        main: mainAddressInput.value,
        default: detailAddressInput.value || '', // 'default'가 아니라 'detail'이 될 가능성도 확인 필요
      },
    },
    message: selectedMessage,
    shipping_fee: shippingFee,
    total_price: totalPrice,
    order_status: '주문 완료', // 초기 주문 상태 설정
  };
}

function showOrderCompletion(orderId, orderCreatedAt) {
  const orderCheckoutScreen = document.querySelector('.order-checkout');
  orderCheckoutScreen.style.display = 'none';

  // 주문 완료 화면 표시 로직
  const completionScreen = document.querySelector('.orderCompletion');
  const orderNumberElement = document.querySelector('.orderNumber'); // 주문번호 생성
  const orderDateElement = document.querySelector('.orderDate'); // 주문 일자를 표시할 요소

  completionScreen.style.display = 'flex';
  orderNumberElement.textContent = `주문 번호: ${orderId}`;

  // 서버로부터 받은 ISO 문자열 형태의 날짜를 보기 좋은 형태로 변환
  const date = new Date(orderCreatedAt);
  const formattedDate = date.toLocaleString('ko-KR'); // 'YYYY/MM/DD, HH:MM:SS' 형태로 변환
  orderDateElement.textContent = `주문 일자: ${formattedDate}`;
}

//  --------------------로컬스토리지 정보 불러오기-------------------
// document.addEventListener("DOMContentLoaded", function () {
//     loadOrderSummary();
//     selectText(); // 배송 메세지 선택 관련 함수 호출
// });

function loadOrderSummary() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const productsListElement = document.querySelector('.products'); // 주문 상품 리스트 컨테이너
  const subTotalElement = document.querySelector('.subTotal .price'); // 소계 가격 표시 요소
  const totalElement = document.querySelector('.total .price'); // 총 가격 표시 요소
  let subTotalPrice = 0;

  // 기존에 표시된 상품 목록 초기화
  productsListElement.innerHTML = '';

  const cartItemEmpty = document.querySelector('.cart-empty-message'); // 상품 없음 안내 메시지
  if (cartItems.length === 0) {
    cartItemEmpty.classList.add('active');
  } else {
    cartItemEmpty.classList.remove('active');
  }

  cartItems.forEach((item) => {
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
  document.querySelector(
    '.shipping .price'
  ).textContent = `₩${shippingCost.toLocaleString()}`;

  // 소계 가격 업데이트
  subTotalElement.textContent = `₩${subTotalPrice.toLocaleString()}`;

  // 총 가격 (소계 + 배송비) 업데이트
  totalElement.textContent = `₩${(
    subTotalPrice + shippingCost
  ).toLocaleString()}`;
}

// /* 배송 메세지 직접 입력 선택 시 인풋 노출 */
// function selectText () {
//     const select = document.getElementById("message")
//     const value = select.options[select.selectedIndex].value
//     const messageInput = document.querySelector(".messageInput")

//     if (value == 6) {
//         messageInput.classList.remove("off")
//     } else {
//         messageInput.classList.add("off")
//     }
// }

//우편 번호api 실행 함수
function execDaumPostcode() {
  new daum.Postcode({
    // 검색 완료 시 호출되는 콜백 함수
    oncomplete: function (data) {
      // 주소 변수
      var addr = '';

      // 사용자가 도로명 주소를 선택했을 경우
      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('postCode').value = data.zonecode;
      document.getElementById('address').value = addr;

      // 커서를 상세주소 필드로 이동한다.
      document.getElementById('detail').focus();
    },
  }).open();
}
// 다음 우편번호 API 실행 함수
document
  .getElementById('searchAddressBtn')
  .addEventListener('click', execDaumPostcode);

// 주문 할 때 사용자 정보 찾아오기
//유저 정보 찾아서 가져오기
async function findUser() {
  try {
    // API로 유저 정보 가져오기
    const response = await fetch(`${API_HOST}/api/users/mypage`);
    const res = await response.json();

    if (!response.ok) {
      throw new Error('유저 정보를 불러오는데 실패했습니다.');
    }
    const user = res.user;
    console.log(user);

    // 유저 정보 렌더링
    renderUserInfo(user);
    renderAccountDetails(user);
  } catch (error) {
    console.error('유저정보를 렌더링하는 중 오류가 발생했습니다:', error);
  }
}

// 유저 정보 넣을 곳
function renderUserInfo(user) {
  // 입력 필드에서 정보 수집
  const nameInput = document.querySelector('input[placeholder="이름"]');
  const emailInput = document.querySelector('input[placeholder="이메일"]');
  const phoneInput = document.querySelector('input[placeholder="휴대 전화"]');
  const postcodeInput = document.querySelector('input[placeholder="우편번호"]');
  const mainAddressInput = document.querySelector(
    'input[placeholder="기본 주소"]'
  );
  const detailAddressInput = document.querySelector(
    'input[placeholder="나머지 주소 (선택)"]'
  );

  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone;

  postcodeInput.value = user.address.postcode;
  mainAddressInput.value = user.address.main;
  detailAddressInput.value = user.address.detail;
}

// 유저 정보 렌더링
findUser();
