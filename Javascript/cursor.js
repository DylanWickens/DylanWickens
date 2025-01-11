const cursor = document.querySelectorAll(".cursor");
const links = document.querySelectorAll("a"); 

window.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;


    cursor.forEach(el => {
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    });

 
    // links.forEach(link => {
    //     link.addEventListener("mouseenter", () => {
    //         console.log("Hovering over link");
    //         el.addClassList.add("hover");
    //     })

    //     link.addEventListener("mouseleave", () => {
    //         console.log("Left link");
    //         el.addClassList.remove("hover");
    //     })
    // })
});