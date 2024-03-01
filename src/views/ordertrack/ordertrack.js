import { API_HOST } from '/src/views/common/api.js';

async function getOrderById(orderId) {
  try {
      // API로 주문 정보 가져오기
      const response = await fetch(`${API_HOST}/api/orders/${orderId}`);
      const orderInfo = await response.json();
      const order = orderInfo.data
      
      console.log(order)


      // 주문자 정보 받아오기
      const nameInput = document.querySelector('#edit-orderer input[placeholder="이름"]');
      const emailInput = document.querySelector('#edit-orderer input[placeholder="이메일"]');
      const phoneInput = document.querySelector('#edit-orderer input[placeholder="휴대 전화"]');
      const postInput = document.querySelector('#edit-orderer input[placeholder="우편번호"]');
      const addressInput = document.querySelector('#edit-orderer input[placeholder="기본 주소"]');
      const detailInput = document.querySelector('#edit-orderer input[placeholder="나머지 주소 (선택)"]');
      
      nameInput.value = order.orderer.name;
      emailInput.value = order.orderer.email;
      phoneInput.value = order.orderer.phone;
      postInput.value = order.orderer.address.postcode;
      addressInput.value = order.orderer.address.main;
      detailInput.value = order.orderer.address.default;


      const orderId = order._id
      ButtonEvents(orderId)


  } catch (error) {
      console.error("주문 정보를 가져오는 중 오류 발생:", error);
      return null;
  }
}



getOrderById(orderId)
  .then(order => {
    if (order) {
      console.log("주문 정보:", order);

      // 여기에서 주문 정보를 사용할 수 있습니다.

      // 주문 목록 리스트
      const orderList = document.querySelector('.container');

      // 주문 상태가 "주문 완료"인 경우에만 클래스 추가
      const isOrderCompleted = order.data.order_status === "주문 완료";
      const btnOrderEditClass = isOrderCompleted ? "btn-order-edit active" : "btn-order-edit";

      // 리스트 생성
      const orderContent = document.createElement('div');
      orderContent.classList.add('table__body');
      orderContent.innerHTML = `
        <div class="table__body--top">
          <span>주문 일자</span>
          <b class='date'>${order.data.createdAt}</b> |
          <span>주문 번호</span>
          <b class="order-id">${order.data._id}</b>
        </div>
        <div class="table__body--bottom"> 
          <div class='products'>
          <span class="order-title">${order.data.products[0].name}</span> 외 ${order.data.products.length-1}종
          </div>
          <div class='total-price'>${order.data.total_price.toLocaleString()}</div>
          <div class='status'>${order.data.order_status}<button class="${btnOrderEditClass}" type='button'>주문 수정</button>
          </div>
        </div>
      `;

      // 상품 리스트에 상품 추가
      orderList.appendChild(orderContent);
      ButtonEvents()



    } else {
      console.log("주문 정보를 가져올 수 없습니다.");
    }
  })
  .catch(error => {
    console.error("주문 정보를 가져오는 중 오류 발생:", error);
  });



// 버튼
// 주문자 정보
function ButtonEvents() {
  // 수정 버튼은 NodeList이므로 forEach를 사용하여 각각에 이벤트를 바인딩
  const editBtns = document.querySelector('.btn-order-edit.active');
  const submitBtn = document.querySelector('.btn-save');
  const editModal = document.querySelector('#edit-orderer');
  
  editBtns.addEventListener('click', function () {
    editModal.style.display = 'flex';
  });
  console.log(editBtns)

  
  // 수정 모달 닫기 이벤트
  editModal.addEventListener("mousedown", function (e) {
    if (e.target !== editModal) return;
    editModal.style.display = "none";
  });
  
  // 저장 버튼 클릭 이벤트
  submitBtn.addEventListener('click', function () {
    updateOrderer(orderId)
    editModal.style.display = "none";
  });
}


// patch

// 모달에 입력 된 정보로 유저 정보 수정하기
function getOrderer() {
  const nameInput = document.querySelector('#edit-orderer input[placeholder="이름"]');
  const emailInput = document.querySelector('#edit-orderer input[placeholder="이메일"]');
  const phoneInput = document.querySelector('#edit-orderer input[placeholder="휴대 전화"]');
  const postInput = document.querySelector('#edit-orderer input[placeholder="우편번호"]');
  const addressInput = document.querySelector('#edit-orderer input[placeholder="기본 주소"]');
  const detailInput = document.querySelector('#edit-orderer input[placeholder="나머지 주소 (선택)"]');
  
  const orderer = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    address: {
      postcode: postInput.value,
      main: addressInput.value,
      default: detailInput.value,
    }
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
    },
    body: JSON.stringify(newUser),
  })
  .then(response => {
    if (response.ok) {
      alert("주문 정보가 수정되었습니다.");
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
    oncomplete: function(data) {
      // 주소 변수
      var addr = '';
      
      // 사용자가 도로명 주소를 선택했을 경우
      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }
      
      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('postCode').value = data.zonecode;
      document.getElementById("address").value = addr;
      
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("detail").focus();
    }
  }).open();
}
// 다음 우편번호 API 실행 함수
document.getElementById("searchAddressBtn").addEventListener("click", execDaumPostcode);


