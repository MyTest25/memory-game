  const imageLinks = [
        "https://i.postimg.cc/2ypJ1WSR/Yogi-Blueberry-Cream-Stick-32g-4.png",
        "https://i.postimg.cc/fWXp688w/Yogi-Cookies-Cream-Stick-36g.png",
        "https://i.postimg.cc/MpRnR2DC/Amore-Oat-Cookies-Black.png",
        "https://i.postimg.cc/N0f4S9zN/Yogi-Strawberry-Cream-Stick-32g.png",
        "https://i.postimg.cc/TY8FmgGW/Amore-Oat-Cookies-White.png",
        "https://i.postimg.cc/ZnVY5Q2d/Yogi-Chocolate-Cream-Stick-36g.png"
    ];

    // pick 6 random and duplicate
    let selectedImages = imageLinks.sort(() => 0.5 - Math.random()).slice(0, 6);
    let gameImages = [...selectedImages, ...selectedImages].sort(() => 0.5 - Math.random());

    const gameContainer = document.getElementById("game");
    let firstCard = null;
    let lockBoard = false;

    function createCard(image) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img class="front" src="https://via.placeholder.com/100/cccccc/000000?text=?" alt="Front">
            <img class="back" src="${image}" alt="Back">
        `;
        card.addEventListener("click", () => flipCard(card, image));
        gameContainer.appendChild(card);
    }

    function flipCard(card, image) {
        if (lockBoard || card.classList.contains("flip")) return;
        card.classList.add("flip");

        if (!firstCard) {
            firstCard = { card, image };
            return;
        }

        if (firstCard.image === image) {
            firstCard = null;
        } else {
            lockBoard = true;
            setTimeout(() => {
                card.classList.remove("flip");
                firstCard.card.classList.remove("flip");
                firstCard = null;
                lockBoard = false;
            }, 1000);
        }
    }

    gameImages.forEach(img => createCard(img));
</script>
