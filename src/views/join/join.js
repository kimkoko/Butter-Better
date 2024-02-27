import { API_HOST } from '../common/api.js';
const signForm = document.getElementById("signForm")
const mainBox = document.getElementById("mainBox")
const messageDiv = document.getElementById("messageDiv")


/* 메세지 직접 입력 선택 시 인풋 노출 */
function selectText () {
    const select = document.getElementById("message")
    const value = select.options[select.selectedIndex].value
    const messageInput = document.querySelector(".messageInput")

    if (value == 6) {
        messageInput.classList.remove("off")
    } else {
        messageInput.classList.add("off")
    }
}


/* 회원가입 */
signForm.addEventListener("submit", async (event) => {
    event.preventDefault() //페이지 새로고침 방지

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const phone = document.getElementById("phone").value
    const postCode = document.getElementById("postCode").value
    const main = document.getElementById("main").value
    const detail = document.getElementById("detail").value

    try {

        const response = await fetch(`${API_HOST}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                phone: phone,
                address: {
                    postCode: postCode, 
                    main: main, 
                    detail: detail
                }
            })
        })
        const res = await response.json()

        if(response.ok) {
            messageDiv.classList.add = "show"
            mainBox.classList.add = "remove"
        } else {
            // 필수 필드 확인
            if (!name || !email || !password || !confirmPassword) {
                window.alert("필수 항목을 입력하세요.")

                // 입력되지 않은 첫 번째 input 요소를 찾습니다.
                const inputs = document.querySelectorAll('input');
                for (const input of inputs) {
                    if (!input.value) {
                        // 해당 input 요소에 포커스를 설정합니다.
                        input.focus();
                        break; // 첫 번째 입력되지 않은 요소에 포커스를 설정하고 종료합니다.
                    }
                }
                return;
            }
        }

        

    }  catch (error) {
        console.log("회원가입 오류: ", error.message)
    }
})