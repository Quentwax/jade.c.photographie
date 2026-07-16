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
