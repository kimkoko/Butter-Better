import { API_HOST } from '/src/views/common/api.js';

const orderIdstring = JSON.parse(localStorage.getItem('order_Id'));
const orderId = orderIdstring;

// 비회원 주문 조회 함수를 정의합니다.
function fetchOrderDetails(orderId) {
  // Fetch API를 사용하여 주문 정보를 조회합니다.
  fetch(`${API_HOST}/api/orders/${orderId}`, {
    method: 'GET', // HTTP 메서드를 GET으로 설정합니다.
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE',
    },
  })
    .then((response) => {
      // 응답이 성공적인지 확인합니다.
      if (!response.ok) {
        console.log(response);
      }

      return response.json();
    })
    .then((orders) => {
      // 조회된 주문 정보를 처리합니다.

      const order = orders.data;
      const orderId = order._id;
      console.log(orderId);

      // 리스트
      // 주문 목록 리스트
      const orderList = document.querySelector('.container');

      // 주문 상태가 "주문 완료"인 경우에만 클래스 추가
      const isOrderCompleted = order.order_status === '주문 완료';
      const btnOrderEditClass = isOrderCompleted
        ? 'btn-order-edit active'
        : 'btn-order-edit';

      // 리스트 생성
      const orderContent = document.createElement('div');
      orderContent.classList.add('table__body');

      // 주문 일자 한국식 시간으로 변환
      // 서버로부터 받은 ISO 문자열 형태의 날짜를 보기 좋은 형태로 변환
      const date = new Date(order.createdAt);
      const formattedDate = date.toLocaleString('ko-KR'); // 'YYYY/MM/DD, HH:MM:SS' 형태로 변환

      // 주문 상품 한개 이상일 경우
      const itemOverOne =
        order.products.length > 1 ? `외 ${order.products.length - 1}종` : '';

      orderContent.innerHTML = `
      <div class="table__body--top">
        <span>주문 일자</span>
        <b class='date'>${formattedDate}</b> |
        <span>주문 번호</span>
        <b class="order-id">${order._id}</b>
      </div>
      <div class="table__body--bottom"> 
        <div class='products'>
        <span class="order-title">${
          order.products[0].name
        }</span> ${itemOverOne}
        </div>
        <div class='total-price'>${order.total_price.toLocaleString()}</div>
        <div class='status'>${
          order.order_status
        }<button class="${btnOrderEditClass}" type='button'>주문 수정</button>
        </div>
      </div>
    `;

      // 상품 리스트에 상품 추가
      orderList.appendChild(orderContent);

      // buttonEvents
      // 수정 버튼이 여러 개 있을 수 있으므로 querySelectorAll을 사용합니다.
      const editBtns = document.querySelectorAll('.btn-order-edit.active'); // 모든 활성화된 수정 버튼을 선택
      console.log(editBtns);
      const submitBtn = document.querySelector('.btn-save');
      const editModal = document.querySelector('#edit-orderer');

      editBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
          editModal.style.display = 'flex';
          renderingOrderer(order);
        });
      });

      // 수정 모달 닫기 이벤트
      if (editModal) {
        // editModal이 존재하는지 확인
        editModal.addEventListener('mousedown', function (e) {
          if (e.target !== editModal) return;
          editModal.style.display = 'none';
        });
      }

      // 저장 버튼 클릭 이벤트
      if (submitBtn) {
        // submitBtn이 존재하는지 확인
        submitBtn.addEventListener('click', function () {
          updateOrderer(orderId);
          editModal.style.display = 'none';
        });
      }
    })
    .catch((error) => {
      // 에러 처리를 합니다.
      console.error('There was a problem with your fetch operation:', error);
    });
}

function renderingOrderer(order) {
  // 주문자 정보 받아오기
  const nameInput = document.querySelector(
    '#edit-orderer input[placeholder="이름"]'
  );
  const emailInput = document.querySelector(
    '#edit-orderer input[placeholder="이메일"]'
  );
  const phoneInput = document.querySelector(
    '#edit-orderer input[placeholder="휴대 전화"]'
  );
  const postInput = document.querySelector(
    '#edit-orderer input[placeholder="우편번호"]'
  );
  const addressInput = document.querySelector(
    '#edit-orderer input[placeholder="기본 주소"]'
  );
  const detailInput = document.querySelector(
    '#edit-orderer input[placeholder="나머지 주소 (선택)"]'
  );

  nameInput.value = order.orderer.name;
  emailInput.value = order.orderer.email;
  phoneInput.value = order.orderer.phone;
  postInput.value = order.orderer.address.postcode;
  addressInput.value = order.orderer.address.main;
  detailInput.value = order.orderer.address.detail;
}

fetchOrderDetails(orderId);

// patch

// 모달에 입력 된 정보로 유저 정보 수정하기
function getOrderer() {
  const nameInput = document.querySelector(
    '#edit-orderer input[placeholder="이름"]'
  );
  const emailInput = document.querySelector(
    '#edit-orderer input[placeholder="이메일"]'
  );
  const phoneInput = document.querySelector(
    '#edit-orderer input[placeholder="휴대 전화"]'
  );
  const postInput = document.querySelector(
    '#edit-orderer input[placeholder="우편번호"]'
  );
  const addressInput = document.querySelector(
    '#edit-orderer input[placeholder="기본 주소"]'
  );
  const detailInput = document.querySelector(
    '#edit-orderer input[placeholder="나머지 주소 (선택)"]'
  );

  const orderer = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    address: {
      postcode: postInput.value,
      main: addressInput.value,
      detail: detailInput.value,
    },
  };

  const order = { orderer };

  return order;
}

// 수정 폼에서 주문자 정보를 업데이트
function updateOrderer(orderId) {
  const newUser = getOrderer();
  // orderId 값을 사용하여 주문 정보 업데이트
  fetch(`${API_HOST}/api/orders/${orderId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE',
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (response.ok) {
        alert('주문 정보가 수정되었습니다.');
      } else {
        alert('주문 정보 수정 실패');
      }
    })
    .catch((err) => {
      console.error('수정 중 오류가 발생했습니다:', err);
    });
}

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
