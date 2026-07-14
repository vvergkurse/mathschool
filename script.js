// ===============================
// ПЛАВНАЯ ПРОКРУТКА ЭКРАНОВ
// ===============================

const pages = document.querySelectorAll(".page");
const container = document.getElementById("pages");
const menuLinks = document.querySelectorAll("nav a");

let current = 0;
let lock = false;

// Обновление положения контейнера
function updatePage() {
    container.style.transform = `translateY(-${current * 100}vh)`;

    pages.forEach((page, index) => {
        if (index === current) {
            page.classList.add("active");
        } else {
            page.classList.remove("active");
        }
    });

    menuLinks.forEach((link, index) => {
        link.classList.toggle("active", index === current);
    });
}

// Переключение на следующую страницу
function nextPage() {
    if (current < pages.length - 1) {
        current++;
        updatePage();
    }
}

// Переключение на предыдущую страницу
function prevPage() {
    if (current > 0) {
        current--;
        updatePage();
    }
}

// Прокрутка колесом
window.addEventListener("wheel", (e) => {

    if (lock) return;

    lock = true;

    if (e.deltaY > 0) {
        nextPage();
    } else {
        prevPage();
    }

    setTimeout(() => {
        lock = false;
    }, 900);

}, { passive: true });

// Клавиатура
window.addEventListener("keydown", (e) => {

    if (lock) return;

    if (e.key === "ArrowDown") {

        lock = true;
        nextPage();

    }

    if (e.key === "ArrowUp") {

        lock = true;
        prevPage();

    }

    setTimeout(() => {
        lock = false;
    }, 900);

});

// Клики по меню
menuLinks.forEach((link, index) => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        current = index;

        updatePage();

    });

});

// ===============================
// АНИМАЦИЯ ПОЯВЛЕНИЯ
// ===============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.3
});

document.querySelectorAll(".card,.price,.contactsCard,.aboutBox,.contactWindow").forEach(el => {
    observer.observe(el);
});

// ===============================
// НЕБОЛЬШОЙ ПАРАЛЛАКС
// ===============================

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX - window.innerWidth / 2) / 70;
    const y = (e.clientY - window.innerHeight / 2) / 70;

    document.querySelector(".heroLeft").style.transform =
        `translate(${x}px,${y}px)`;

    document.querySelector(".heroRight").style.transform =
        `translate(${-x}px,${-y}px)`;

});

// Первый экран
updatePage();
