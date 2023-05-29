// API 경로
const URL_signup = 'https://port-0-safedream-backend-otjl2cli33x5tw.sel4.cloudtype.app';

// 아이디 중복확인을 통과했는지 확인하는 변수
let isIdChecked = false;

// 아이디 중복확인 함수
function checkUserID() {
    const userid = document.getElementById('userid').value;
    fetch(`${URL_signup}/safedream/check?userid=${userid}`)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                isIdChecked = data.message === '사용 가능한 아이디입니다.'; // 중복확인이 성공했다면 isIdChecked를 true로 설정
            }
        });
}

// 회원가입 함수
function registerUser() {
    if (!isIdChecked) {
        alert('아이디 중복 확인이 필요합니다.');
        return;
    }

    const username = document.getElementById('username').value;
    const userid = document.getElementById('userid').value;
    const password = document.getElementById('userpw').value;
    const userpw_a = document.getElementById('userpw_a').value;
    const hp = document.getElementById('hp').value;
    const guardianHp = document.getElementById('guardianHp').value;

    if (!username || !userid || !password || !userpw_a || !hp || !guardianHp) {
        alert('모든 개인정보를 채워주세요.');
        return;
    }

    if (password !== userpw_a) {
        alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
        return;
    }

    const userData = {username, userid, password, hp, guardianHp};

    fetch(`${URL_signup}/safedream/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            location.href='./login_edit.html';
        }
    });
}
