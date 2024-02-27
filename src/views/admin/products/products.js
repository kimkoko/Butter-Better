// {
//   '65dcasdlkfjwaioef': {
//     title: '책 제목',
//     content: '책 내용',
//     ...
//   },
//   '12312312123asfwef': {
//     title: '책 제목',
//     content: '책 내용',
//     ...
//   }
// }
let products = {};

// ID로 현재 가지고 있는 제품들 중에서 찾기
function findProductById(id) {
  return products[id];
}

document.addEventListener('DOMContentLoaded', function () {
  // 모달 열기 버튼과 모달 가져오기
  const addBtn = document.getElementById('add-btn');
  const modal1 = document.getElementById('myModal1');
  const modal2 = document.getElementById('myModal2');

  // 모달 열기 버튼에 이벤트 리스너 추가
  addBtn.addEventListener('click', function () {
    var pargraph = modal1.querySelector('p');
    if (pargraph) {
      pargraph.innerText = '상품 추가';
    }
    modal1.style.display = 'flex';
  });

  // 모달 닫기 함수
  modal1.addEventListener('click', function (e) {
    if (e.target !== modal1) return;
    modal1.style.display = 'none';
  });

  modal2.addEventListener('click', function (e) {
    if (e.target !== modal2) return;
    modal2.style.display = 'none';
  });

  // 저장 버튼에 이벤트 리스너 추가
  const saveBtn1 = document.getElementById('save-Btn1');
  saveBtn1.onclick = function () {
    // 저장 버튼을 눌렀을 때 할 작업을 추가
    alert('저장되었습니다.');
    modal1.style.display = 'none';
  };

  // 삭제 버튼과 취소 버튼에 이벤트 리스너 추가
  const deleteBtn = document.getElementById('delete-Btn');
  const backBtn = document.getElementById('back-btn');

  deleteBtn.onclick = function () {
    // 실제로 삭제하는 작업 추가
    alert('상품이 삭제되었습니다.');
    modal2.style.display = 'none';
  };

  backBtn.onclick = function () {
    modal2.style.display = 'none';
  };
});

function connectModalEvent() {
  // 모달 열기 버튼과 모달 가져오기
  const modalEditBtns = document.querySelectorAll('.modal-edit-btn');
  const modalDeleteBtns = document.querySelectorAll('.modal-delete-btn');
  const modal1 = document.getElementById('myModal1');
  const modal2 = document.getElementById('myModal2');

  // 모달 열기 버튼에 이벤트 리스너 추가
  modalEditBtns.forEach(function (modalEditBtn) {
    modalEditBtn.addEventListener('click', function () {
      var pargraph = modal1.querySelector('p');
      if (pargraph) {
        pargraph.innerText = '상품 수정';
      }
      modal1.style.display = 'flex';

      // TODO: 모달의 내용을 해당하는 제품의 내용으로 수정
      updateModalContent(modalEditBtn);
    });
  });

  modalDeleteBtns.forEach(function (modalDeleteBtn) {
    // data-image-url="ImageURL" data-product-id="asdf"
    // console.log(modalDeleteBtn.dataset)
    console.log(modalDeleteBtn.dataset.productId);

    modalDeleteBtn.addEventListener('click', function () {
      modal2.style.display = 'flex';

      // TODO: 현재 제품을 삭제하는 작업 추가
      // 그럴려면 현재 제품이 뭔지 알아야됨
      // => 현재 제품을 ID로 알아내기
      const productId = modalDeleteBtn.dataset.productId;
      if (!productId) return;
      const product = findProductById(productId);
      console.log(product);
      console.log(product.title);
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
  alert('수정되었습니다.');
  modal1.style.display = 'none';

  renderProductList();
}

function deleteProduct() {
  // 삭제 버튼을 눌렀을 때 할 작업을 추가

  // 삭제요청 API
  fetch(`${API_HOST}/api/books/${productId}`, {
    method: 'DELETE',
  })
    .then(() => {
      // OK
      renderProductList();
    })
    .catch(() => {
      // Error
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
      console.log('성공이다!!');
    }

    const data = await response.json();
    console.log('response: ', data);
    // products = data.data.books // 이건 배열

    // => 오브젝트로 변경
    products = {};
    data.data.books.forEach((book) => {
      products[book._id] = book;
    });

    console.log('원래 데이터: ', data.data.books);
    console.log('오브젝트: ', products);
    // 하나의 예시
    // console.log('임의의 오브젝트 하나 찾아봄 ("65dc25d85d51b0a7ba1cc1a2"): ', products["65dc25d85d51b0a7ba1cc1a2"])
    const productListElement = document.getElementById('table-List');
    // const categoryName = document.getElementById("categoryName")
    // console.log(Object.entries(products))

    // 상품 데이터를 기반으로 상품 리스트 생성
    for (const [id, product] of Object.entries(products)) {
      const row = document.createElement('tr');
      row.classList.add('products-list');
      row.innerHTML = `
      <td>${product.isBestSeller}</td>
      <td>${product.title}</td>
      <td>${product.category}</td>
      <td class="content">${product.content}</td>
      <td>${product.price.toLocaleString()}</td>
      <td class="img">${product.img_url}</td>
      <td>${product.quantity}</td>
      <td>${product.rate}</td>
      <td>
      <button id="openModalbtn1" class="modal-edit-btn">수정</button>
      <button 
        id="openModalbtn2"
        class="modal-delete-btn"
        data-product-id="${product._id}"
      >
        삭제
      </button>
      </td>`;

      productListElement.appendChild(row);
    }
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
