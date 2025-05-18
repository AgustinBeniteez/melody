// Expresiones regulares para validación del registro
const validations = {
    username: /^[a-zA-Z0-9_-]{4,16}$/, // 4-16 caracteres, letras, números, guion y guion bajo
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/ // Mínimo 8 caracteres, mayúsculas, minúsculas, números y caracteres especiales
};

// Mensajes de error para cada validación
const errorMessages = {
    username: {
        pattern: 'El nombre de usuario debe tener entre 4 y 16 caracteres y solo puede contener letras, números, guion y guion bajo'
    },
    password: {
        pattern: 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales (!@#$%^&*)'
    }
};

// Función para validar campos
function validateField(field, value) {
    const validation = validations[field];
    if (!validation.test(value)) {
        return errorMessages[field].pattern;
    }
    return '';
}

// Función para mostrar mensajes de error
function showError(inputElement, message) {
    // Eliminar mensaje de error anterior si existe
    const existingError = inputElement.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    if (message) {
        // Crear y mostrar nuevo mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.8em';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        inputElement.parentElement.appendChild(errorDiv);
    }
}

// Función para validar formulario de login (sin validaciones de formato)
function validateLoginForm(username, password) {
    return {
        isValid: true,
        errors: {
            username: '',
            password: ''
        }
    };
}

// Función para validar formulario de registro
function validateRegisterForm(username, password) {
    const errors = {
        username: validateField('username', username),
        password: validateField('password', password)
    };
    
    return {
        isValid: !errors.username && !errors.password,
        errors: errors
    };
}

// Exportar funciones para usar en login.js
window.formValidation = {
    validateLoginForm,
    validateRegisterForm,
    showError
};