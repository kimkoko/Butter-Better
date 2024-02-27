document.addEventListener('DOMContentLoaded', function () {
    // 모달 열기 버튼과 모달 가져오기
    const openModalBtn2 = document.getElementById("openModalbtn2");
    const modal2 = document.getElementById("myModal2");
    
    // 모달 열기 버튼에 이벤트 리스너 추가
    openModalBtn2.onclick = function () {
      modal2.style.display = "flex";
    };
    // 모달 닫기 함수
    modal2.addEventListener("click", function(e) {
      if (e.target !== modal2) return;
      modal2.style.display = "none";
    })
    // 삭제 버튼과 취소 버튼에 이벤트 리스너 추가
    const deleteBtn = document.getElementById("delete-Btn");
    const backBtn = document.getElementById("back-btn");
    
    deleteBtn.onclick = function () {
      // 실제로 삭제하는 작업 추가
      alert("상품이 삭제되었습니다.");
      modal2.style.display = "none";
    };
    
    backBtn.onclick = function () {
      modal2.style.display = "none";
    };
  });