import { API_HOST } from '../../common/api.js';
import { waitFor } from '../../common/utils.js';

/* 카테고리 데이터 불러오기 */
async function fetchCategory() {
    try {
        // API에서 카테고리 데이터 가져오기
        const response = await fetch(`${API_HOST}/api/categories`);
        const res = await response.json();
        
        return res.data
    } catch (error) {
        console.error('카테고리를  렌더링하는 중 오류가 발생했습니다:', error);
    }
}

async function fetchUser() {
    const signOutBtn = document.querySelector('.button-signout');
    const userBtn = document.querySelector('.button-user a');
    const adminBtn = document.querySelector('.button-admin');
    
    try {
        // API에서 카테고리 데이터 가져오기
        const response = await fetch(`${API_HOST}/api/users/mypage`);
        const res = await response.json();
        if (!response.ok) throw new Error()
        
        // 로그인되었을 경우 처리
        signOutBtn.classList.remove('hidden')
        // 유저 버튼?을 누르면 마이페이지로 이동
        userBtn.href = '/mypage'
        
        // if (res.user.is_admin) adminBtn.classList.remove('hidden')
        // else adminBtn.classList.add('hidden')
        
        // Admin이 아닌 경우,
        res.user.is_admin ? adminBtn.classList.remove('hidden')
        // Admin인 경우,
        : adminBtn.classList.add('hidden')
        return res
        
    } catch (error) {
        // 아마도 token이 잘못되어있거나 없거나 혹은 서버측에 에러가 있을수도...
        
        // 로그인되지 않았을 경우 처리
        signOutBtn.classList.add('hidden')
        // 유저 버튼?을 누르면 로그인페이지로 이동
        userBtn.href = '/login'
        adminBtn.classList.add('hidden')
    }
}

// /* 카테고리 데이터를 가져와서 메뉴를 렌더링하는 함수 */
async function renderCategory() {
    try {
        
        const category = await fetchCategory()
        const categoryListElement = document.getElementById('categoryList');
        
        // 데이터를 기반으로 메뉴바 생성
        category.forEach(category => {
            // 메뉴 요소 생성
            const categoryItem = document.createElement('li');
            categoryItem.classList.add('menu');
            categoryItem.innerHTML = `
            <a href="/category?category=${category._id}">${category.name}</a>
            `;
            
            // 상품 리스트에 상품 추가
            categoryListElement.appendChild(categoryItem);
        });
        
    } catch (error) {
        console.error('카테고리를  렌더링하는 중 오류가 발생했습니다:', error);
    }
}

// 페이지가 로드되면 상품 리스트 렌더링
document.addEventListener('DOMContentLoaded', async () => {
    await waitFor(() => {
        return !!document.getElementById('categoryList');
    });

    //로그아웃 버튼 클릭시
    const signOutBtn = document.querySelector('.button-signout');
    signOutBtn.addEventListener('click', async () => {
        
        try {
            const response = await fetch(`${API_HOST}/api/users/logout`);
            const res = await response.json();
            
            if (!response.ok) throw new Error(res.msg);
            location.href = '/';
            
        } catch (error) {
            console.error('로그아웃 중 오류가 발생했습니다:', error);
        }
    });
    renderCategory();
    fetchUser();
});
