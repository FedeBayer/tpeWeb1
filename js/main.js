"use strict";

function chargeHome(){
    const formSubscription = document.querySelector('#formSubscription');
    const mail = formSubscription.mail;
    const userName = formSubscription.userName;
    const formErrors = document.querySelector('#formErrors');

    let alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', ',', '.', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=',
    '+', '[', ']', '{', '}', '"', ':', ';', '/', '?', '<', '>', '|');

    let expReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    genCaptcha(alpha);
    document.querySelector('.btn-subscription').addEventListener('click', function (e){
        isValidForm(e,mail,userName,formErrors,expReg);
    });
    document.getElementById('refresh').addEventListener("click",function (e){
        genCaptcha(alpha);
    });
    document.querySelector(".btn_menu").addEventListener("click", function (e){
        toggleMenu;
    });;

}

function genCaptcha(alpha){
    let code = "";
    for(let i = 0; i < 5; i++){
        code += alpha[Math.floor(Math.random()*90)];
    }
    document.querySelector('#formSubscription').captchaCode.value = code;
}

function isValidCaptcha(e,formErrors){
    e.preventDefault();
    formErrors.innerHTML = '';
    let code = document.querySelector('#formSubscription').captchaCode.value;
    let reply = document.querySelector('#formSubscription').captchaReply.value;
    if(code == reply){
        formErrors.style.display = 'block';
        formErrors.innerHTML += '<li <span class="green"></span>Captcha correcto</li>';
    }
    else{
        formErrors.style.display = 'block';
        formErrors.innerHTML += '<li <span class="red"></span>Captcha incorrecto</li>';
    }
}

function isValidForm(e,mail,userName,formErrors,expReg) {
    e.preventDefault();
    isValidCaptcha(e,formErrors);
    isValidName(e,userName,formErrors);
    isValidMail(e,mail,expReg,formErrors);
}

function isValidName(e,userName,formErrors){
    e.preventDefault();
    if(userName.value == '' || userName.value == null){
        formErrors.style.display = 'block';
        formErrors.innerHTML += '<li <span class="red"></span>Ingrece un nombre</li>';
        return false;
    }
    else{
        return true;
    }
}

function isValidMail(e,mail,expReg,formErrors){
        if(expReg.test(mail.value)){
            e.preventDefault();
            return true;
        }
        else{
            formErrors.style.display = 'block';
            formErrors.innerHTML += '<li <span class="red"></span>Ingrece un correo valido</li>';
            e.preventDefault();
            return false;
        }
}



