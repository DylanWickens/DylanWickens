const cursor = document.querySelectorAll(".cursor");

window.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;


    cursor.forEach(el => {
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    });

});