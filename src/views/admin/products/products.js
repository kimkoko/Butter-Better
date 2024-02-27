let products = {}

// ID로 현재 가지고 있는 제품들 중에서 찾기
function findProductById(id) {
  return products[id];
}

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
    // 모달 내 입력 필드 값 가져오기
    const bestSellerInput = document.querySelector("#myModal1 input[placeholder='베스트셀러']");
    const titleInput = document.querySelector("#myModal1 input[placeholder='상품명']");
    const contentInput = document.querySelector("#myModal1 input[placeholder='상품 설명']");
    const categoryInput = document.querySelector("#myModal1 input[placeholder='카테고리']");
    const priceInput = document.querySelector("#myModal1 input[placeholder='가격']");
    const imageInput = document.querySelector("#myModal1 input[placeholder='이미지']");
    const quantityInput = document.querySelector("#myModal1 input[placeholder='수량']");
    const rateInput = document.querySelector("#myModal1 input[placeholder='별점']");
    
    // 새로운 제품 정보를 객체로 만들기
    const newProduct = {
      isBestSeller: bestSellerInput.value,
      title: titleInput.value,
      category_id: categoryInput.value,
      content: contentInput.value,
      price: priceInput.value,
      img_url: imageInput.value,
      quantity: quantityInput.value,
      rate: rateInput.value,
    };
    
    // API를 통해 새로운 제품 추가
    fetch(`${API_HOST}/api/books/admin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
    .then(response => {
      if (response.ok) {
        alert("새로운 상품이 추가되었습니다.");
        modal1.style.display = "none";
        renderProductList();
      } else {

        alert('상품 추가 실패');
      }
    })
    .catch(error => {
      console.error('상품 추가 중 오류가 발생했습니다:', error);
      alert('상품 추가 실패');
    });
  };
  
  // 삭제 버튼과 취소 버튼에 이벤트 리스너 추가
  const deleteBtn = document.getElementById("delete-Btn");
  const backBtn = document.getElementById("back-btn");
  
  deleteBtn.onclick = function () {
    // 실제로 삭제하는 작업 추가
    const productId = deleteBtn.dataset.productId;
    console.log(deleteBtn);
    if (!productId) return;
    deleteProduct(productId)
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
      
      const productId = modalEditBtn.dataset.productId;
      if (!productId) return;
      const product = findProductById(productId);
      // TODO: 모달의 내용을 해당하는 제품의 내용으로 수정
      updateModalContent(product)
    });
  });
  function updateModalContent(product) {
    const bestSellerInput = document.querySelector("#myModal1 input[placeholder='베스트셀러']");
    const titleInput = document.querySelector("#myModal1 input[placeholder='상품명']");
    const categoryInput = document.querySelector("#myModal1 input[placeholder='카테고리']");
    const contentInput = document.querySelector("#myModal1 input[placeholder='상품 설명']");
    const priceInput = document.querySelector("#myModal1 input[placeholder='가격']");
    const imageInput = document.querySelector("#myModal1 input[placeholder='이미지']");
    const quantityInput = document.querySelector("#myModal1 input[placeholder='수량']");
    const rateInput = document.querySelector("#myModal1 input[placeholder='별점']");
    
    
    bestSellerInput.value = product.isBestSeller;
    titleInput.value = product.title;
    categoryInput.value = product.category;
    contentInput.value = product.content;
    priceInput.value = product.price;
    imageInput.value = product.img_url;
    quantityInput.value = product.quantity;
    rateInput.value = product.rate;
    
    // 현재 선택된 제품의 ID를 모달에 저장
  }
  modalDeleteBtns.forEach(function (modalDeleteBtn) {
    // data-image-url="ImageURL" data-product-id="asdf"
    
    modalDeleteBtn.addEventListener("click", function () {
      modal2.style.display = "flex";
      
    });
  });
}

// saveBtn1.addEventListener("click", editProduct);

// 수정 모달의 저장 버튼을 눌렀을 때 실행되는 함수
function editProduct() {
  // 수정 버튼을 눌렀을 때 할 작업을 추가
  // TODO: API로 수정 요청을 보내는 작업 추가
  // 이 API에서 수정된 정보를 줌 (하나의 Product에 대해서)
  // => 그 정보를 가지고 화면에 있는 정보를 수정 (tr 한개의 내용만 수정)
  alert("수정되었습니다.");
  modal1.style.display = "none";
  
  renderProductList();
}

function deleteProduct(productId) {
  
  // 삭제요청 API
  fetch(`${API_HOST}/api/books/admin/${productId}`, {
    method: 'delete',
  })
  .then(response => {
    if (response.ok) {
      // OK
      alert("상품이 삭제되었습니다.");
      modal2.style.display = "none";
      renderProductList();
    } else {
      // Error
      alert('삭제 실패')
    }
  })
  .catch(error => {
    console.error('삭제 중 오류가 발생했습니다:', error);
    alert('삭제 실패');
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
    console.log('response: ', data)
    // products = data.data.books // 이건 배열
    
    // => 오브젝트로 변경
    products = {};
    data.data.books.forEach((book) => {
      products[book._id] = book;
    });

    const productListElement = document.getElementById('table-List');

    
    // 상품 데이터를 기반으로 상품 리스트 생성
    for (const [id, product] of Object.entries(products)) {
      const row = document.createElement('tr');
      row.classList.add('products-list');
      row.innerHTML = `
      <td id="product-BestSeller">${product.isBestSeller}</td>
      <td id="product-title">${product.title}</td>
      <td id="product-category">${product.category_id.name}</td>
      <td class="content" id="product-content">${product.content}</td>
      <td id="product-price">${product.price.toLocaleString()}</td>
      <td class="img" id="product-img">${product.img_url}</td>
      <td id="product-quantity">${product.quantity}</td>
      <td id="product-rate">${product.rate}</td>
      <td>
      <button
      id="openModalbtn1"
      class="modal-edit-btn"
      data-product-id="${product._id}"
      >수정</button>
      <button 
      id="openModalbtn2"
      class="modal-delete-btn"
      data-product-id="${product._id}"
      >
      삭제
      </button>
      </td>`;
      
      productListElement.appendChild(row);
    };
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