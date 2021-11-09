
for (let i = 0; i < container.children.length; i++) {
    const dot = document.createElement("div");
    dot.className = `dot ${i === 0 ? "active" : ""}`;
    dot.addEventListener("click", (e) => {
        const index = [...dots.children].indexOf(e.currentTarget);
        console.log(index);
        container.children[index].scrollIntoView({ behavior: "smooth" });
    });
    dots.appendChild(dot);
}


const rootMargin = Math.floor(window.innerHeight / 4) * -1;

[...container.children].forEach((item, index) => {

    const options = {
        root: container,
        threshold: 0.4
    };

    let calc = false;

    const observer = new IntersectionObserver((entries, _) => {
        if (calc === false) {
            calc = true;
            return;
        }

        entries.forEach(entry => {

            if (entry.boundingClientRect.top <= window.innerHeight + rootMargin && entry.isIntersecting) {
                [...dots.children].forEach(item => item.classList.remove("active"));
                dots.children[index].classList.add("active");
            }
            else if (entry.boundingClientRect.top >= window.innerHeight + rootMargin) {
                [...dots.children].forEach(item => item.classList.remove("active"));
                dots.children[index - 1].classList.add("active");
            }
            else {
                dots.children[index].classList.remove("active");

                if (index > 0 && ![...dots.children].map(item => item.className.includes("active")).includes(true)) {
                    dots.children[index - 1].classList.add("active");
                }
            }
        });

    }, options);


    observer.observe(item);
});

document.forms["contact_form"].addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("enes ince");
});


