document.addEventListener('DOMContentLoaded', function () {
  // 모달 열기 버튼과 모달 가져오기
  const addBtn = document.getElementById("add-btn");
  const modal1 = document.getElementById("myModal1");
  const modal2 = document.getElementById("myModal2");

  // 모달 열기 버튼에 이벤트 리스너 추가
  addBtn.addEventListener("click", function () {
      var pargraph = modal1.querySelector("p");
      if (pargraph) {
          pargraph.innerText = "상품 추가";
      }
      modal1.style.display = "flex";
  });

  // 모달 닫기 함수
  modal1.addEventListener("click", function (e) {
      if (e.target !== modal1) return;
      modal1.style.display = "none";
  });

  modal2.addEventListener("click", function (e) {
      if (e.target !== modal2) return;
      modal2.style.display = "none";
  });

  // 저장 버튼에 이벤트 리스너 추가
  const saveBtn1 = document.getElementById("save-Btn1");
  saveBtn1.onclick = function () {
      // 저장 버튼을 눌렀을 때 할 작업을 추가
      alert("저장되었습니다.");
      modal1.style.display = "none";
  };

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

function connectModalEvent() {
  // 모달 열기 버튼과 모달 가져오기
  const modalEditBtns = document.querySelectorAll(".modal-edit-btn");
  const modalDeleteBtns = document.querySelectorAll(".modal-delete-btn");
  const modal1 = document.getElementById("myModal1");
  const modal2 = document.getElementById("myModal2");

  // 모달 열기 버튼에 이벤트 리스너 추가
  modalEditBtns.forEach(function (modalEditBtn) {
      modalEditBtn.addEventListener("click", function () {
          var pargraph = modal1.querySelector("p");
          if (pargraph) {
              pargraph.innerText = "상품 수정";
          }
          modal1.style.display = "flex";
      });
  });

  modalDeleteBtns.forEach(function (modalDeleteBtn) {
      modalDeleteBtn.addEventListener("click", function () {
          modal2.style.display = "flex";
      });
  });
}

// 제품 리스트 가져오기 //
import { API_HOST } from '../../common/api.js';

/* 상품 데이터를 가져와서 상품 리스트를 렌더링하는 함수 */
async function renderProductList() {
  try {
    // API에서 상품 데이터 가져오기
    const response = await fetch(`${API_HOST}/api/books`);
    if (!response.ok) {
      throw new Error('상품 데이터를 가져올 수 없습니다.');
    } else {
      console.log("성공이다!!")
    }
    
    const data = await response.json();
    console.log(data)
    const products = data.data.books
    
    const productListElement = document.getElementById('table-List');
    // const categoryName = document.getElementById("categoryName")
    
    
    // 상품 데이터를 기반으로 상품 리스트 생성
    products.forEach(product => {
      const row = document.createElement('tr');
      row.classList.add('products-list');
      row.innerHTML = `
      <td>${product.category_id.name}</td>
      <td>${product.title}</td>
      <td class="content">${product.content}</td>
      <td>${product.price.toLocaleString()}</td>
      <td class="img">${product.img_url}</td>
      <td>
      <button id="openModalbtn1" class="modal-edit-btn">수정</button>
      <button id="openModalbtn2" class="modal-delete-btn">삭제</button>
      </td>`;
      
      productListElement.appendChild(row);
    });
    //모달 불러오기
    connectModalEvent();

  } catch (error) {
    console.error('상품 리스트를 렌더링하는 중 오류가 발생했습니다:', error);
  }
}

// 페이지가 로드되면 상품 리스트 렌더링
window.addEventListener('load', () => {
  renderProductList();
});