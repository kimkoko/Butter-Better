import { API_HOST } from '../common/api.js';

document.addEventListener('DOMContentLoaded', function () {
  const signinBtn = document.querySelector('.signin-btn');

  signinBtn.addEventListener('click', async function () {
    // E-mail과 Password 입력값 가져오기
    const emailInput = document.getElementById('E-mail');
    const passwordInput = document.getElementById('Password');

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      // 서버에 로그인 요청 보내기
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

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                window.alert('유효한 이메일 형식이 아닙니다.');
                
                return
            }
            
      // 서버 응답에 따른 처리
      if (response.ok) {
        alert('로그인 성공');
        // 로그인 성공 시, 원하는 동작 수행
        window.location.href = `${API_HOST}/`;
      } else {
        alert(`로그인 실패: ${result.msg}`);
        // 로그인 실패 시, 원하는 동작 수행
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
    }
  });
});