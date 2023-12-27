const firebaseConfig = {
    apiKey: "AIzaSyAxLzZbsHRjVl5G8MuKP-PzNTuiAznr7PU",
    authDomain: "formloginsignup-c40d1.firebaseapp.com",
    databaseURL: "https://formloginsignup-c40d1-default-rtdb.firebaseio.com",
    projectId: "formloginsignup-c40d1",
    storageBucket: "formloginsignup-c40d1.appspot.com",
    messagingSenderId: "1084253279020",
    appId: "1:1084253279020:web:c466267a7ebdee86cf1289",
};

firebase.initializeApp(firebaseConfig);

//init variable
const auth = firebase.auth();
const database = firebase.database();

function signUp() {
    email = document.getElementById("regEmail").value;
    pwd = document.getElementById("regPass").value;
    cpwd = document.getElementById("cRegPass").value;

    if (checkEmail(email) == false || checkPwd(pwd) == false || pwd != cpwd) {
        alert("Vui lòng kiểm tra lại email và password");
        return; // trả lại function signUp -> yêu cầu nhập lại
    }

    // function của firebase để kiểm tra tài khoản đã tồn tại hay chưa
    auth.createUserWithEmailAndPassword(email, pwd)
        .then(() => {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                email: email,
                password: pwd,
                last_login: Date.now(),
            };

            // Đẩy dữ liệu vào database trong firebase
            database_ref.child("users/" + user.uid).set(user_data);

            // DOne
            alert("User Created!!!");
        })
        .catch((error) => {
            // Firebase will use this to alert of its errors
            var error_message = error.message;

            alert(error_message);
        });
}

//fucntion check email:
function checkEmail(email) {
    //regex kiểm tra tính hợp lệ của email
    expression = /^[A-Za-z0-9._%+-]+@mindx\.edu\.vn$/;
    if (expression.test(email) == true) {
        return true;
    } else {
        return false;
    }
}

//function check password:
function checkPwd(pwd) {
    //regex kiểm tra tính hợp lệ của password
    expression = /^[A-Za-z]\w{7,14}$/;
    if (expression.test(pwd) == true) {
        return true;
    } else {
        return false;
    }
}

//function đăng nhập:
function logIn() {
    email = document.getElementById("emailLogin").value;
    pwd = document.getElementById("passLogin").value;

    if (checkEmail(email) == false || checkPwd(pwd) == false) {
        alert("Vui lòng kiểm tra lại email và password");
        return; // trả lại function logIn -> yêu cầu nhập lại
    }

    // function của firebase để kiểm tra tài khoản đã tồn tại hay chưa
    auth.signInWithEmailAndPassword(email, pwd)
        .then(() => {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                last_login: Date.now(),
            };

            // Push to Firebase Database
            database_ref.child("users/" + user.uid).update(user_data);

            // DOne
            alert("User Logged In!!!");
        })
        .catch((error) => {
            // Firebase will use this to alert of its errors
            var error_message = error.message;

            alert(error_message);
        });
}
