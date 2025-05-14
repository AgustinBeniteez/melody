//--------- INFO ACCOUNT --------//
// account por defecto ADMIN
const ACCOUNT_ADMIN = {  //NO es nada seguro pero poder probar cosas
    username: 'admin',
    password: 'admin',
    usericon: '/src/img/profiles/profile.svg'
};

// array de accounts aqui se guardaran los accounts registradas
let accounts = [ACCOUNT_ADMIN];

//-------- LOGIN MODAL --------//
//meter mopdal en html
const loginModal =  document.createElement('section');
loginModal.id = 'login-modal';
loginModal.classList.add('hidden');
document.body.appendChild(loginModal);

function addLoginHTMLModal() {
    //modal content
    loginModal.innerHTML = `
    <div class="modal-content">
        <button class="close" onclick="closeModal()"><i class="fa-regular fa-circle-xmark"></i></button>
        <img id="logo-img" src="/src/img/logo/melody-logo.svg" alt="logo">
        <!-- Login -->
        <h2>Login</h2>
        <form id="login-form">
            <label for="username"><i class="fa-solid fa-user"></i> Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password"><i class="fa-solid fa-key"></i> Password:</label>
            <input type="password" id="password" name="password" required>
            <button class="btn-submit" type="submit"><i class="fa-solid fa-unlock"></i> Login</button>
        </form>
    </div>
    `;
    // Agregar event listener después de crear el formulario
    document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
    
}

function addRegisterHTMLModal() {
    //modal content
    loginModal.innerHTML = `
    <div class="modal-content">
        <button class="close" onclick="closeModal()"><i class="fa-regular fa-circle-xmark"></i></button>
        <img id="logo-img" src="/src/img/logo/melody-logo.svg" alt="logo">
        <!-- Register -->
        <h2>Register</h2>
        <form id="register-form">
            <label for="username"><i class="fa-solid fa-user"></i> Username:</label>
            <input type="text" id="register-username" name="register-username" required>
            <label for="password"><i class="fa-solid fa-key"></i> Password:</label>
            <input type="password" id="register-password" name="register-password" required>
            <label for="usericon"><i class="fa-solid fa-image"></i> Imagen de perfil:</label>
            <input type="file" id="register-usericon" name="register-usericon" accept="image/*">
            <button class="btn-submit" type="submit"><i class="fa-solid fa-floppy-disk"></i> Register</button>
        </form>
    </div>
    `;
    // Agregar event listener después de crear el formulario
    document.getElementById('register-form').addEventListener('submit', handleRegisterSubmit);
    
}


//modal close
function closeModal() {
    loginModal.classList.add('hidden');
}

//modal open
function openLoginModal(option) {
    // ternario para saber si es login o register y agregar el html correspondiente
    option === 'login' ? addLoginHTMLModal() : addRegisterHTMLModal();
    loginModal.classList.remove('hidden');
}

//-------- REGISTER FORM --------//
function handleRegisterSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const userIconInput = document.getElementById('register-usericon');
    
    const processRegistration = (userIcon) => {
        const account = {
            username: username,
            password: password,
            usericon: userIcon
        };
        accounts.push(account);
        console.log('Cuenta registrada:', accounts);
        closeModal();
        openLoginModal('login');
    };

    if (userIconInput.files && userIconInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            processRegistration(e.target.result);
        };
        reader.readAsDataURL(userIconInput.files[0]);
    } else {
        processRegistration('/src/img/profiles/profile.svg');
    }
}

//-------- LOGIN FORM --------//
function handleLoginSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Verificar si las credenciales coinciden con alguna cuenta
    const accountFound = accounts.find(account =>
        account.username === username && account.password === password
    );
    
    if (accountFound) {
        console.log('Login exitoso');
        closeModal();
        changeAccountInfoText(accountFound);
        hiddenBtns();
        showAccountInfoText();
        // Aquí puedes agregar más lógica después del login exitoso
    } else {
        console.log('Credenciales incorrectas');
        // Aquí puedes agregar lógica para mostrar un mensaje de error
    }
}


//-------- VALIDACIONES --------//
//expresiones regulares para validar el formato de la contraseña


//--------- CAMBIAR #account-info-text --------//
function changeAccountInfoText(account) {
    const accountInfoText = document.getElementById('account-info-text');
    accountInfoText.innerHTML = `
        <img src="${account.usericon}" alt="profile">
        <h2>${account.username}</h2>
    `;
}

function hiddenBtns() {
    const loginBtns = document.getElementById('account-login');
    if (loginBtns.classList.contains('hidden')){
        loginBtns.classList.remove('hidden');
    }else{
        loginBtns.classList.add('hidden');
    }
}

function showAccountInfoText() {
    const accountInfoText = document.getElementById('account-info-text');
    if (accountInfoText.classList.contains('hidden')){
        accountInfoText.classList.remove('hidden');
    }else{
        accountInfoText.classList.add('hidden');
    }
}