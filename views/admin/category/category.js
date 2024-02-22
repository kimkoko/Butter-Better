document.addEventListener('DOMContentLoaded', function () {
  // 모달 열기 버튼과 모달 가져오기
  var openModalBtn1 = document.getElementById("openModalbtn1");
  var openModalBtn2 = document.getElementById("openModalbtn2");
  var openModalBtn3 = document.getElementById("openModalbtn3");
  var modal1 = document.getElementById("myModal1");
  var modal2 = document.getElementById("myModal2");
  var modal3 = document.getElementById("myModal3");
  
  // 모달 열기 버튼에 이벤트 리스너 추가  
  openModalBtn1.onclick = function () {
    modal1.style.display = "flex";
  };
  openModalBtn2.onclick = function () {
    modal2.style.display = "flex";
  }
  openModalBtn3.onclick = function () {
    modal3.style.display = "flex";
  };
    

  // 모달 닫기 함수
  function closeModal1() {
    modal1.style.display = "none";
  }
  
  // 외부 클릭 시 모달 닫기
  window.onclick = function (event) {
    if (event.target == modal1) {
      closeModal1();
    }
  };
  // 모달 닫기 함수(modal3)
  function closeModal3() {
    modal3.style.display = "none";
  }
  
  // 외부 클릭 시 모달 닫기(modal3)
  window.onclick = function (event) {
    if (event.target == modal3) {
      closeModal3();
    }
  };
  
  // 저장 버튼에 이벤트 리스너 추가
  var saveBtn1 = document.getElementById("save-Btn1");
  saveBtn1.onclick = function () {
    // 저장 버튼을 눌렀을 때 할 작업을 추가
    alert("저장되었습니다.");
    modal1.style.display = "none";
  };

  var saveBtn3 = document.getElementById("save-Btn3");
  saveBtn3.onclick = function () {
    // 저장 버튼을 눌렀을 때 할 작업을 추가
    alert("추가되었습니다.");
    modal3.style.display = "none";
  }
  
  // 삭제 버튼과 취소 버튼에 이벤트 리스너 추가
  var deleteBtn = document.getElementById("delete-Btn");
  var backBtn = document.getElementById("back-btn");

  deleteBtn.onclick = function () {
    // 실제로 삭제하는 작업 추가
    alert("카테고리가 삭제되었습니다.");
    modal2.style.display = "none";
  };

  backBtn.onclick = function () {
    modal2.style.display = "none";
  };
});