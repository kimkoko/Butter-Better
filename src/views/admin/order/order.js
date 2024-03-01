import { API_HOST } from '/src/views/common/api.js';

document.addEventListener('DOMContentLoaded', async function () {
  
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

  await loadOrders(); // 주문 데이터(주문서)를 불러와서 화면에표시

});

async function loadOrders() {
  try {
      // API 호출을 통해 주문 데이터를 가져옵니다.
      const response = await fetch(`${API_HOST}/api/orders/admin`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${accessToken}`, // 필요한 경우 인증 헤더를 추가합니다.
          }
      });
      
      if (!response.ok) {
          throw new Error('주문 데이터를 불러오는데 실패했습니다.');
      }

      // 응답 데이터를 JSON 형태로 변환합니다.
      const orders = await response.json();
      console.log(orders);
      // 가져온 주문 데이터를 기반으로 HTML을 동적으로 생성합니다.
      displayOrders(orders);
  } catch (error) {
      console.error('주문 데이터 불러오기 오류:', error);
  }
}

function displayOrders(orders) {
  const tableBody = document.querySelector('.tableList table tbody');
  tableBody.innerHTML = ''; // 기존의 테이블 내용을 초기화합니다.

  // 주문 데이터 배열을 순회합니다.
  orders.data.forEach(order => {
      // 각 주문에 대한 HTML 요소를 생성합니다.
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td>
              <ul>
                  <li><b>주문 일자 : </b> ${new Date(order.createdAt).toLocaleDateString()}</li>
                  <li><b>주문 시간 : </b> ${new Date(order.createdAt).toLocaleTimeString()}</li>
                  <li><b>주문 번호 : </b> ${order._id}</li>
                  <li><b>상태 : </b> ${order.order_status}</li>
                  <li><b>메세지 : </b> ${order.orderer.shipping_message || '없음'}</li>
              </ul>
          </td>
          <td>
              <ul>
                  <li>${order.orderer.name}</li>
                  <li>${order.orderer.email}</li>
                  <li>${order.orderer.phone}</li>
                  <li>${order.orderer.address.postcode} ${order.orderer.address.main}</li>
              </ul>
          </td>
          <td class="center">
              <ul>
                  <li><b>상태 변경</b><br>
                      <select name="state" class="stateSelect" data-order-id="${order._id}">
                          <option value="주문 완료">주문 완료</option>
                          <option value="배송중">배송중</option>
                          <option value="배송 완료">배송 완료</option>
                          <option value="주문 취소">주문 취소</option>
                      </select>
                  </li>
              </ul>
          </td>
          <td>
              <ul>
                  <li>
                      <button class="delete" data-order-id="${order._id}">삭제</button>
                  </li>
              </ul>
          </td>
      `;
      tableBody.appendChild(tr);
  });

  // 주문상태 변경에 따른 ~
  function setupOrderStatusChangeEventListener() {
    document.querySelectorAll('.stateSelect').forEach(selectElement => {
        selectElement.addEventListener('change', async function() {
            const orderId = this.getAttribute('data-order-id'); // 주문 ID를 가져옵니다.
            const newStatus = this.value; // 새로운 주문 상태를 가져옵니다.

            try {
                const response = await fetch(`${API_HOST}/api/orders/admin/${orderId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${accessToken}`, // 인증 토큰이 필요한 경우 추가
                    },
                    body: JSON.stringify({ order_status: newStatus }),
                });

                if (!response.ok) {
                    throw new Error('주문 상태를 변경하는 데 실패했습니다.');
                }

                // 성공적으로 상태가 변경되었음을 사용자에게 알립니다.
                alert('주문 상태가 성공적으로 변경되었습니다.');
            } catch (error) {
                console.error('주문 상태 변경 오류:', error);
                alert('주문 상태 변경에 실패했습니다.');
            }
        });
    });
}

function setupDeleteButtonEventListener() {
  // 페이지 내의 모든 삭제 버튼에 대해 이벤트 리스너를 설정합니다.
  document.querySelectorAll('.delete').forEach(button => {
      button.addEventListener('click', async function() {
          // 'data-order-id' 속성을 통해 삭제할 주문의 ID를 얻습니다.
          const orderId = this.getAttribute('data-order-id');

          // 사용자에게 삭제 확인을 요청하는 추가 로직이 있을 수 있습니다.
          const isConfirmed = confirm('주문을 삭제하시겠습니까?');
          if (!isConfirmed) {
              return; // 사용자가 취소하면 여기서 함수 실행을 중단합니다.
          }

          try {
              // 주문 삭제 API 요청을 보냅니다.
              const response = await fetch(`${API_HOST}/api/orders/admin/${orderId}`, {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json',
                      // 필요한 경우 인증 토큰을 추가합니다.
                      // 'Authorization': `Bearer ${accessToken}`,
                  },
              });

              if (!response.ok) {
                  throw new Error('주문을 삭제하는 데 실패했습니다.');
              }

              // 성공적으로 주문이 삭제되었다는 메시지를 표시합니다.
              alert('주문이 성공적으로 삭제되었습니다.');
              // 삭제 후 주문 목록을 다시 불러오는 로직이 필요할 수 있습니다.
              loadOrders();
          } catch (error) {
              console.error('주문 삭제 오류:', error);
              alert('주문 삭제에 실패했습니다.');
          }
      });
  });
}


  // 모든 주문 데이터가 페이지에 추가된 후, 상태 변경 및 삭제 버튼에 대한 이벤트 리스너를 설정합니다.
  setupOrderStatusChangeEventListener();
  setupDeleteButtonEventListener();
}
