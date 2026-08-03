let dots;

function updateDots() {
    if (!dots) return;
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        dot.innerHTML = i === index ? "★" : "☆";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    dots = document.querySelectorAll(".dot");
    const galleryImages = document.querySelectorAll(".gallery-item img");
    const galleryModal = document.getElementById("gallery-modal");
    const galleryModalImage = document.getElementById("gallery-modal-image");
    const galleryModalClose = document.querySelector(".gallery-modal-close");
    const carouselMenus = document.querySelectorAll(".carousel-menu");

    carouselMenus.forEach((menu) => {
        const parent = menu.parentElement;
        if (!parent) return;

        const createToggle = () => {
            const button = document.createElement("button");
            button.className = "carousel-menu-toggle";
            button.type = "button";
            button.setAttribute("aria-label", "Ouvrir le menu");
            button.setAttribute("aria-expanded", "false");
            button.innerHTML = "<span></span><span></span><span></span>";
            parent.insertBefore(button, menu);
            return button;
        };

        let toggleButton = parent.querySelector(".carousel-menu-toggle");
        const closeMenu = () => {
            if (!toggleButton) return;
            menu.classList.remove("is-open");
            toggleButton.setAttribute("aria-expanded", "false");
            toggleButton.setAttribute("aria-label", "Ouvrir le menu");
        };

        const updateToggle = () => {
            if (window.innerWidth <= 768) {
                if (!toggleButton) {
                    toggleButton = createToggle();
                    toggleButton.addEventListener("click", (event) => {
                        event.stopPropagation();
                        const isOpen = menu.classList.toggle("is-open");
                        toggleButton.setAttribute("aria-expanded", String(isOpen));
                        toggleButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
                    });
                }
            } else {
                if (toggleButton) {
                    toggleButton.remove();
                    toggleButton = null;
                    menu.classList.remove("is-open");
                }
            }
        };

        updateToggle();

        document.addEventListener("click", (event) => {
            if (window.innerWidth <= 768 && toggleButton && !parent.contains(event.target)) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            updateToggle();
        });
    });

    function attachDotListeners() {
        dots.forEach((dot, position) => {
            dot.addEventListener("click", () => {
                index = position;
                updateCarousel();
            });
        });
    }

    function openGalleryModal(src, alt) {
        galleryModalImage.src = src;
        galleryModalImage.alt = alt || "Photo agrandie";
        galleryModal.classList.add("open");
        galleryModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    }

    function closeGalleryModal() {
        galleryModal.classList.remove("open");
        galleryModal.setAttribute("aria-hidden", "true");
        galleryModalImage.src = "";
        galleryModalImage.alt = "";
        document.body.classList.remove("modal-open");
    }

    galleryImages.forEach((image) => {
        image.addEventListener("click", () => {
            openGalleryModal(image.src, image.alt);
        });
    });

    if (galleryModalClose) {
        galleryModalClose.addEventListener("click", closeGalleryModal);
    }

    if (galleryModal) {
        galleryModal.addEventListener("click", (event) => {
            if (event.target === galleryModal) {
                closeGalleryModal();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && galleryModal && galleryModal.classList.contains("open")) {
            closeGalleryModal();
        }
    });

    attachDotListeners();
    updateDots();
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
