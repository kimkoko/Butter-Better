import { API_HOST } from '/src/views/common/api.js';

document.addEventListener('DOMContentLoaded', function () {
  const signinBtn = document.querySelector('.signin-btn');

  signinBtn.addEventListener('click', async function () {
    const emailInput = document.getElementById('E-mail');
    const passwordInput = document.getElementById('Password');
    const email = emailInput.value;
    const password = passwordInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert('유효한 이메일 형식이 아닙니다.');
      return;
    }

    try {
      const response = await fetch(`${API_HOST}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log(response);
      const result = await response.json();

      if (response.ok) {
        alert('로그인 성공');
        window.location.href = `${API_HOST}/`;
      } else {
        alert(`로그인 실패: ${result.msg}`);
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
    }
  });

  const loginScreen = document.querySelector('.loginBox .login');
  const orderTrackScreen = document.querySelector('.loginBox .order-track');
  const btnOrderTrack = document.querySelector('.btn-order-track');
  const btnBack = document.querySelector('.loginBox .btn-back');

  btnOrderTrack.addEventListener('click', showOrderTrack);
  btnBack.addEventListener('click', backToLogin);

  function showOrderTrack() {
    loginScreen.style.display = 'none';
    orderTrackScreen.classList.add('active');
  }

  function backToLogin() {
    orderTrackScreen.classList.remove('active');
    loginScreen.style.display = 'block';
  }

  const btnOrderCheck = document.querySelector('.order-track .btn-submit');
  btnOrderCheck.addEventListener('click', function () {
    const orderIdInput = document.querySelector('.order-track #order-id');
    const orderId = orderIdInput.value;
    if (orderId) {
      getOrderHistory(orderId);
    }
  });
});

async function getOrderHistory(orderId) {
  try {
    const response = await fetch(`${API_HOST}/api/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);
    const result = await response.json();

    if (response.ok) {
      window.location.href = `${API_HOST}/src/views/order-track/order-track.html`;
    } else {
      alert(`주문 조회 실패: ${result.msg}`);
    }
  } catch (error) {
    console.error('주문 조회 중 오류:', error);
  }
}
