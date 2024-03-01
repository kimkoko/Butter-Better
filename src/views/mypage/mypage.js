import { API_HOST } from '/src/views/common/api.js';

window.addEventListener('DOMContentLoaded', () => {
  renderOrderHistory();
  ButtonEvents();
});

// Order History
async function renderOrderHistory() {
  try {

  
    // API로 유저 정보 가져오기
    const response = await fetch(`${API_HOST}/api/orders/user`);
    const result = await response.json();
    const orders = result.data


    // 주문 목록 리스트
    const orderList = document.querySelector('.container');

    // 카테고리 리스트를 받아온 후 각 카테고리에 대한 요청을 보냅니다.
    for (const order of orders) {
      
      const userEmail = await findUser()
      const ordererEamil = order.orderer.email
    

      if (userEmail === ordererEamil) {


        // 주문 상태가 "주문 완료"인 경우에만 클래스 추가
        const isOrderCompleted = order.order_status === "주문 완료";
        const btnOrderEditClass = isOrderCompleted ? "btn-order-edit active" : "btn-order-edit";

        // 리스트 생성
        const orderContent = document.createElement('div');
        orderContent.classList.add('table__body');
        orderContent.innerHTML = `
        <div class="table__body--top">
              <span>주문 일자</span>
              <b class='date'>${order.createdAt}</b> |
              <span>주문 번호</span>
              <b class="order-id">${order._id}</b>
          </div>
          <div class="table__body--bottom"> 
              <div class='products'>
                <span class="order-title">${order.products[0].name}</span> 외 ${order.products.length-1}종
              </div>
              <div class='total-price'>${order.total_price.toLocaleString()}</div>
              <div class='status'>${order.order_status}<button class="${btnOrderEditClass}" type='button'>주문 수정</button>
              </div>
          </div>
        `;

        // 상품 리스트에 상품 추가
        orderList.appendChild(orderContent); 
        ButtonEvents()


        // 주문자 정보 받아오기
        const nameInput = document.querySelector('#edit-orderer input[placeholder="이름"]');
        const emailInput = document.querySelector('#edit-orderer input[placeholder="이메일"]');
        const phoneInput = document.querySelector('#edit-orderer input[placeholder="휴대 전화"]');
        const postInput = document.querySelector('#edit-orderer input[placeholder="우편번호"]');
        const addressInput = document.querySelector('#edit-orderer input[placeholder="기본 주소"]');
        const detailInput = document.querySelector('#edit-orderer input[placeholder="나머지 주소 (선택)"]');
        console.log(detailInput)
        
        nameInput.value = order.orderer.name;
        emailInput.value = order.orderer.email;
        phoneInput.value = order.orderer.phone;
        postInput.value = order.orderer.address.postcode;
        addressInput.value = order.orderer.address.main;
        detailInput.value = order.orderer.address.default;

      } else {

        const noSync = document.querySelector(".none")
        noSync.style.display = "block"
      }




    } 

  } catch (error) {
    console.error('주문 정보를 렌더링하는 중 오류가 발생했습니다:', error);
  }
}



// 주문자 정보
function ButtonEvents() {
  // 수정 버튼은 NodeList이므로 forEach를 사용하여 각각에 이벤트를 바인딩
  const editBtns = document.querySelectorAll('.btn-order-edit.active');
  const submitBtn = document.querySelector('.btn-save1');
  const editModal = document.querySelector('#edit-orderer');

  editBtns.forEach(function (editBtn) {
    editBtn.addEventListener('click', function () {
      editModal.style.display = 'flex';
    });
  });


  // 수정 모달 닫기 이벤트
  editModal.addEventListener("mousedown", function (e) {
    if (e.target !== editModal) return;
    editModal.style.display = "none";
  });

  // 저장 버튼 클릭 이벤트
  submitBtn.addEventListener('click', function () {

  });

};



// 회원 정보
document.addEventListener('DOMContentLoaded', function () {
  const editBtn = document.querySelector('.btn-edit');
  const submitBtn = document.querySelector('.btn-save');
  const deletecancleBtn = document.querySelector('.btn-cancel');
  const deleteBtn = document.querySelector('.btn-delete');
  const deleteSubmitBtn = document.querySelector('.btn-submit');
  const deleteModal = document.querySelector('#delete-account');
  const editModal = document.querySelector('#edit-account');
  
  //유저 정보 찾아서 ACCOUNT DETAILS 렌더링
  findUser();
  
  
  
  // 유저 정보 가져오기 및 수정 모달 열기
  function openEditModal() {
    findUser();
    editModal.style.display = 'flex';
  }

  // 수정 버튼 클릭 이벤트
  editBtn.addEventListener('click', function () {
    if (editModal) {
      openEditModal();
    }
  });

  // 수정 모달 닫기 이벤트
  editModal.addEventListener("mousedown", function (e) {
    if (e.target !== editModal) return;
    editModal.style.display = "none";
  });

  // 저장 버튼 클릭 이벤트
  submitBtn.addEventListener('click', function () {
    saveUserInfo();
  });

  // 삭제 버튼 클릭 이벤트
  deleteBtn.addEventListener('click', function () {
    if (deleteModal) {
      deleteModal.style.display = 'flex';
    }
  });

  // 삭제 모달 닫기 이벤트
  deleteModal.addEventListener("mousedown", function (e) {
    if (e.target !== deleteModal) return;
    deleteModal.style.display = "none";
  });

  // 삭제 확인 버튼 클릭 이벤트
  deleteSubmitBtn.addEventListener('click', function () {
    deleteUser();
  });

  // 삭제 취소 버튼 클릭 이벤트
  deletecancleBtn.addEventListener('click', function () {
    deleteModal.style.display = "none";
  });

});

//유저 정보 찾아서 가져오기 
async function findUser() {
  try {
    // API로 유저 정보 가져오기
    const response = await fetch(`${API_HOST}/api/users/mypage`);
    const res = await response.json();
    console.log(res)
    
    if (!response.ok) {
      throw new Error("유저 정보를 불러오는데 실패했습니다.");
    }
    const user = res.user;
    const userEmail = user.email
    
    
    // 유저 정보 렌더링
    renderUserInfo(user);
    renderAccountDetails(user);

    return userEmail;
    
  } catch (error) {
    console.error('유저정보를 렌더링하는 중 오류가 발생했습니다:', error);
  }
}

// 유저 정보 렌더링을 위한 함수
function renderUserInfo(user) {
  const nameInput = document.querySelector('#edit-account input[placeholder="이름"]');
  const emailInput = document.querySelector('#edit-account input[placeholder="이메일"]');
  const phoneInput = document.querySelector('#edit-account input[placeholder="휴대 전화"]');
  const postInput = document.querySelector('#edit-account input[placeholder="우편번호"]');
  const addressInput = document.querySelector('#edit-account input[placeholder="기본 주소"]');
  const detailInput = document.querySelector('#edit-account input[placeholder="나머지 주소 (선택)"]');
  
  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone;
  postInput.value = user.address.postcode;
  addressInput.value = user.address.main;
  detailInput.value = user.address.detail;
  
}
// Account details 랜더링
function renderAccountDetails(user) {
  const nameDetail = document.querySelector('.info-box .name');
  const emailDetail = document.querySelector('.info-box .email');
  const phoneDetail = document.querySelector('.info-box .phone');
  const addressDetail = document.querySelector('.info-box .address');

  nameDetail.textContent = user.name;
  emailDetail.textContent = user.email;
  phoneDetail.textContent = user.phone;
  addressDetail.textContent = `${user.address.main} ${user.address.detail}`;
}




// 모달에 입력 된 정보로 유저 정보 수정하기
function getUserDataFromModal() {
  const nameInput = document.querySelector('#edit-account input[placeholder="이름"]');
  const emailInput = document.querySelector('#edit-account input[placeholder="이메일"]');
  const phoneInput = document.querySelector('#edit-account input[placeholder="휴대 전화"]');
  const postInput = document.querySelector('#edit-account input[placeholder="우편번호"]');
  const addressInput = document.querySelector('#edit-account input[placeholder="기본 주소"]');
  const detailInput = document.querySelector('#edit-account input[placeholder="나머지 주소 (선택)"]');
  
  const user = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    address: {
      postcode: postInput.value,
      main: addressInput.value,
      detail: detailInput.value,
    },
  };
  return user;
}




//수정된 유저정보 저장하기
function saveUserInfo() {
  const newUser = getUserDataFromModal();
  const editModal = document.querySelector('#edit-account');
  fetch(`${API_HOST}/api/users/mypage/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
  .then(response => {
    if (response.ok) {
      editModal.style.display = "none";
      window.location.reload()
      alert("회원 정보가 수정되었습니다.");
      
      
    } else {
      alert('상품 수정 실패');
    }
  })
  .catch((err) => {
    console.error('수정 중 오류가 발생했습니다:', err);
  });
}

//유저 삭제하기
function deleteUser() {
  fetch(`${API_HOST}/api/users/`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      alert("회원 탈퇴가 완료되었습니다.");
      window.location.href = '/';
    } else {
      alert('회원 탈퇴 실패');
    }
  })
  .catch((err) => {
    console.error('회원 탈퇴 중 오류가 발생했습니다:', err);
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


