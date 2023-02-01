import uniqid from 'uniqid';
const toastDetail = {
    timer: 5000,
    success:{
        icon:'fa-circle-check',
        text:'Success: This is a success toast.'
    },
    error:{
        icon:'fa-circle-xmark',
        text:'Error: This is a error toast.'
    },
    warning:{
        icon:'fa-exclamation-triangle',
        text:'Warning: This is a warning toast.'
    },
    info:{
        icon:'fa-circle-info',
        text:'Info: This is a info toast.'
    },
}
function removeToast(toast){
    toast.classList.add("hide");
    setTimeout(()=>toast.remove(),500)
}
const notificationMove = (type = '', message) => {
    const id = uniqid();
    const {icon, text} = toastDetail[type];
    const notification = document.querySelector(".notification");
    const toast = document.createElement('li');
    toast.className = `toastmove ${type}`;
    toast.innerHTML = `  <div class="column">
                            <i class="fas ${icon}"></i>
                            <span>${message}</span>
                        </div>
                        <i class="fas fa-xmark" id=${id}></i>`;
    notification.appendChild(toast);
    const close = document.getElementById(id);
    close.addEventListener("click",()=> removeToast(close.parentElement));
    setTimeout(() => {
        removeToast(toast)
    }, toastDetail.timer);
}

export default notificationMove