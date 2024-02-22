document.addEventListener('DOMContentLoaded', function () {
    // 모달 열기 버튼과 모달 가져오기
    var openModalBtn2 = document.getElementById("openModalbtn2");
    var modal2 = document.getElementById("myModal2");
    
    // 모달 열기 버튼에 이벤트 리스너 추가
    openModalBtn2.onclick = function () {
      modal2.style.display = "flex";
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
    
    // 삭제 버튼과 취소 버튼에 이벤트 리스너 추가
    var deleteBtn = document.getElementById("delete-Btn");
    var backBtn = document.getElementById("back-btn");
    
    deleteBtn.onclick = function () {
      // 실제로 삭제하는 작업 추가
      alert("상품이 삭제되었습니다.");
      modal2.style.display = "none";
    };
    
    backBtn.onclick = function () {
      modal2.style.display = "none";
    };
  });