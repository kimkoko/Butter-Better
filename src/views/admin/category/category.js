import { API_HOST } from '../../common/api.js';

document.addEventListener('DOMContentLoaded', function () {
  // 모달 열기 버튼과 모달 가져오기
  const addBtn = document.getElementById('add-btn');
  const modal1 = document.getElementById('myModal1');
  const modal2 = document.getElementById('myModal2');

  addBtn.addEventListener('click', function () {
    const pargraph = modal1.querySelector('p');
    if (pargraph) {
      pargraph.innerText = '카테고리 추가';
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
    alert('카테고리가 삭제되었습니다.');
    modal2.style.display = 'none';
  };

  backBtn.onclick = function () {
    modal2.style.display = 'none';
  };
});

/////////////////////////////////////////////////////////////

/* 수정 삭제 버튼 */
function modalEditDelete() {
  const openModalBtn1 = document.querySelectorAll('.edit');
  const openModalBtn2 = document.querySelectorAll('.delete');
  const modal1 = document.getElementById('myModal1');
  const modal2 = document.getElementById('myModal2');

  openModalBtn1.forEach((openModalBtn1) => {
    openModalBtn1.addEventListener('click', () => {
      const pargraph = modal1.querySelector('p');
      if (pargraph) {
        pargraph.innerText = '카테고리 수정';
      }
      modal1.style.display = 'flex';
    });
  });

  openModalBtn2.forEach((openModalBtn2) => {
    openModalBtn2.addEventListener('click', () => {
      modal2.style.display = 'flex';
    });
  });
}

/////////////////////////////////////////////////////////////

/* 카테고리 데이터 불러오기 */
async function fetchCategory() {
  try {
    // API에서 카테고리 데이터 가져오기
    const response = await fetch(`${API_HOST}/api/categories`);
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error('카테고리를  렌더링하는 중 오류가 발생했습니다:', error);
  }
}

////////////////////////////////////////////////////////////
/* 카테고리 데이터를 가져와서 메뉴를 렌더링하는 함수 */
async function renderCategory() {
  try {
    const category = await fetchCategory();
    const categoryListElement = document.getElementById('categoryList');

    // 데이터를 기반으로 메뉴바 생성
    category.forEach((category) => {
      // 메뉴 요소 생성
      const categoryItem = document.createElement('tr');
      categoryItem.classList.add('category');
      categoryItem.innerHTML = `
            <td>${category.name}</td>
            <td>${category.sort}</td>
            <td>
                <button type="button" id="openModalbtn1" class="edit">수정</button>
                <button type="button" id="openModalbtn2" class="delete">삭제</button>
            </td>
          `;

      // 상품 리스트에 상품 추가
      categoryListElement.appendChild(categoryItem);
    });

    modalEditDelete();
  } catch (error) {
    console.error('카테고리를  렌더링하는 중 오류가 발생했습니다:', error);
  }
}

/////////////////////////////////////////////////////////////
/* 카테고리 추가 */
const categoryInput = document.getElementById('categoryInput');
const addCategoryBtn = document.getElementById('save-Btn1');
addCategoryBtn.addEventListener('click', async () => {
  const categoryName = categoryInput.value;

  try {
    const response = await fetchCategory(`${API_HOST}/api/category/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: categoryName,
      }),
    });

    if (!response.ok) {
      throw new Error('카테고리 추가에 실패했습니다.');
    }
    alert('저장되었습니다.');
  } catch (error) {
    console.log('카테고리 추가 중 오류 발생', error);
    alert('카테고리 추가 중 오류가 발생했습니다.');
  }
});

// 페이지가 로드
window.addEventListener('load', () => {
  fetchCategory();
  renderCategory();
});
