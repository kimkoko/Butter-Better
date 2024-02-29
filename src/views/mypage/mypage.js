import { API_HOST } from '../common/api.js';

// 마이페이지에서 유저 정보 수정 및 삭제하기
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
    
    if (!response.ok) {
      throw new Error("유저 정보를 불러오는데 실패했습니다.");
    }
    const user = res.user;
    console.log(user.phone);
    
    // 유저 정보 렌더링
    renderUserInfo(user);
    renderAccountDetails(user);
    
  } catch (error) {
    console.error('유저정보를 렌더링하는 중 오류가 발생했습니다:', error);
  }
}

// 유저 정보 렌더링을 위한 함수
function renderUserInfo(user) {
  const nameInput = document.querySelector('#edit-account input[placeholder="이름"]');
  const emailInput = document.querySelector('#edit-account input[placeholder="이메일"]');
  const phoneInput = document.querySelector('#edit-account input[placeholder="휴대 전화, \'-\' 기호를 추가해 주세요."]');
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
  const phoneInput = document.querySelector('#edit-account input[placeholder="휴대 전화, \'-\' 기호를 추가해 주세요."]');
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