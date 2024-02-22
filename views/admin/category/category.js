// const modal = `
//                 <div class="modal__close">
//                   <img
//                   width="22px"
//                   height="22px"
//                   src=${close}
//                   alt="close_icon_logo"
//                   />
//                 </div>
//                 <div class="modal__card">
//                   <div class="modal__header">
//                     <div class="modal__back">
//                       <img width="32px" height="24px" src=${arrow} alt="arrow_back_icon" />
//                     </div>
//                     <h2>새 게시물 만들기</h2>
//                     <p>공유하기</p>
//                   </div>
//                   <div class="modal__main">
//                     <img src=${media} alt="media_icon" />
//                     <h3>사진과 동영상을 업로드 해보세요.</h3>
//                     <label for="file">
//                       <p>컴퓨터에서 선택</p>
//                     </label>
//                     <input type="file" name="file" id="file" />
//                   </div>
//                 </div>
//               `;

// // 지시사항에 맞춰 자바스크립트 코드를 작성하세요.
// const addPostBtn = document.querySelector("#modify");
// addPostBtn.addEventListener('click', function() {
//     const modalEl = document.createElement("div");
//     modalEl.setAttribute('class', 'modal__layout');
//     modalEl.innerHTML = modal;
//     document.body.prepend(modalEl);

//     document.querySelector('.modal__close > img')
//     .addEventListener('click', function() {
//         document.body.removeChild(modalEl);
//     });
// })

// 수정 버튼 클릭 시 모달을 띄우고 입력 폼에 해당 항목들의 값을 채우는 함수
function showModal(event) {
  var modal = document.getElementById("myModal");
  var overlay = document.getElementById("overlay");
  var categoryNameInput = document.getElementById("categoryName");
  var statusInput = document.getElementById("status");

  // 수정 버튼에 추가한 data 속성을 통해 해당 항목들의 값을 가져옴
  var categoryName = event.target.dataset.category;
  var status = event.target.dataset.status;

  // 입력 폼에 해당 항목들의 값을 채움
  categoryNameInput.value = categoryName;
  statusInput.value = status;

  modal.style.display = "block";
  overlay.style.display = "block";
}

// 모달 닫기 버튼 클릭 시 모달을 닫는 함수
function closeModal() {
  var modal = document.getElementById("myModal");
  var overlay = document.getElementById("overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
}

// 문서가 로드되면 수정 버튼에 클릭 이벤트 리스너를 추가
document.addEventListener("DOMContentLoaded", function () {
  var editButtons = document.querySelectorAll(".modify");

  editButtons.forEach(function (button) {
    button.addEventListener("click", showModal);
  });

  // 모달 닫기 버튼에 클릭 이벤트 리스너를 추가
  var closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeModal);
  });
});



