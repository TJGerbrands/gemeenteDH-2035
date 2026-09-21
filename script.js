const objectLayer = document.getElementById("objectLayer");
const treeLayer = document.getElementById("treeLayer");

const hoverCard = document.getElementById("hoverCard");

const cardTitle = document.getElementById("cardTitle");
const cardMaker = document.getElementById("cardMaker");
const cardDescription = document.getElementById("cardDescription");

const searchInput = document.getElementById("searchInput");

let cityObjects = [];

loadCity();

async function loadCity() {

    const response = await fetch("stad.json");

    cityObjects = await response.json();

    renderTrees();

    renderObjects();

    wireSearch();

    centerOnTownhall();
}

function renderTrees() {

    for (let i = 0; i < 80; i++) {

        const x = 300 + Math.random() * 2500;
        const y = 550 + Math.random() * 1000;

        const tree = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );

        tree.innerHTML = `
            <rect
                class="tree-trunk"
                x="${x}"
                y="${y}"
                width="8"
                height="20"
            />

            <circle
                class="tree-leaf"
                cx="${x + 4}"
                cy="${y}"
                r="16"
            />
        `;

        treeLayer.appendChild(tree);
    }
}

function renderObjects() {

    cityObjects.forEach(object => {

        const wrapper = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );

        wrapper.classList.add(
            "object"
        );

        wrapper.dataset.id = object.id;

        wrapper.setAttribute(
            "transform",
            `translate(${object.x} ${object.y})`
        );

        wrapper.innerHTML =
            buildObjectSvg(object);

        wrapper.addEventListener(
            "mouseenter",
            () => showCard(object)
        );

        wrapper.addEventListener(
            "mouseleave",
            hideCard
        );

        wrapper.addEventListener(
            "click",
            () => {
                window.location.href = object.url;
            }
        );

        objectLayer.appendChild(
            wrapper
        );
    });
}

function buildObjectSvg(object) {

    switch (object.type) {

        case "townhall":

            return `
                <g>

                    <ellipse
                        class="isometric-shadow"
                        cx="0"
                        cy="60"
                        rx="95"
                        ry="25"
                    />

                    <rect
                        class="townhall-main"
                        x="-70"
                        y="-40"
                        width="140"
                        height="90"
                        rx="8"
                    />

                    <rect
                        class="townhall-main"
                        x="-20"
                        y="-120"
                        width="40"
                        height="90"
                    />

                    <polygon
                        points="-82,-40 0,-90 82,-40"
                        fill="#ffd86c"
                    />

                </g>
            `;

        case "library":

            return `
                <g>

                    <ellipse
                        class="isometric-shadow"
                        cx="0"
                        cy="40"
                        rx="70"
                        ry="20"
                    />

                    <rect
                        class="library-main"
                        x="-50"
                        y="-35"
                        width="100"
                        height="70"
                        rx="8"
                    />

                    <polygon
                        points="-60,-35 0,-70 60,-35"
                        fill="#c8f0c9"
                    />

                </g>
            `;

        case "campus":

            return `
                <g>

                    <ellipse
                        class="isometric-shadow"
                        cx="0"
                        cy="40"
                        rx="85"
                        ry="20"
                    />

                    <rect
                        class="campus-main"
                        x="-60"
                        y="-30"
                        width="120"
                        height="60"
                        rx="8"
                    />

                    <rect
                        class="campus-main"
                        x="-20"
                        y="-80"
                        width="40"
                        height="50"
                        rx="4"
                    />

                </g>
            `;

        case "park":

            return `
                <g>

                    <circle
                        class="park-main"
                        cx="0"
                        cy="0"
                        r="50"
                    />

                    <circle
                        fill="#4ea44e"
                        cx="-18"
                        cy="-10"
                        r="12"
                    />

                    <circle
                        fill="#4ea44e"
                        cx="18"
                        cy="10"
                        r="12"
                    />

                </g>
            `;

        case "art":

            return `
                <g>

                    <ellipse
                        class="isometric-shadow"
                        cx="0"
                        cy="25"
                        rx="55"
                        ry="15"
                    />

                    <polygon
                        class="art-main"
                        points="0,-50 40,0 0,50 -40,0"
                    />

                </g>
            `;
    
        case "bridge":

    return `
        <g>

            <ellipse
                class="isometric-shadow"
                cx="0"
                cy="20"
                rx="80"
                ry="12"
            />

            <rect
                class="bridge-main"
                x="-70"
                y="-8"
                width="140"
                height="18"
                rx="8"
            />

            <rect
                class="bridge-main"
                x="-50"
                y="-30"
                width="12"
                height="30"
            />

            <rect
                class="bridge-main"
                x="38"
                y="-30"
                width="12"
                height="30"
            />

        </g>
    `;
case "tower":

    return `
        <g>

            <ellipse
                class="isometric-shadow"
                cx="0"
                cy="65"
                rx="35"
                ry="12"
            />

            <rect
                class="tower-main"
                x="-15"
                y="-90"
                width="30"
                height="150"
            />

            <circle
                class="tower-main"
                cx="0"
                cy="-95"
                r="28"
            />

        </g>
    `;

            case "market":

    return `
        <g>

            <rect
                class="market-main"
                x="-65"
                y="-30"
                width="40"
                height="30"
            />

            <rect
                class="market-main"
                x="-10"
                y="-20"
                width="40"
                height="25"
            />

            <rect
                class="market-main"
                x="40"
                y="-35"
                width="35"
                height="28"
            />

        </g>
    `;

            case "sport":

    return `
        <g>

            <rect
                class="sport-main"
                x="-70"
                y="-40"
                width="140"
                height="80"
                rx="8"
            />

            <rect
                fill="#ffffff"
                x="-50"
                y="-2"
                width="100"
                height="4"
            />

        </g>
    `;
        default:

            return `
                <circle
                    r="30"
                    fill="#cccccc"
                />
            `;
    }
}

function showCard(object) {

    hoverCard.classList.remove(
        "hidden"
    );

    cardTitle.textContent =
        object.naam;

    cardMaker.textContent =
        `Maker: ${object.maker}`;

    cardDescription.textContent =
        object.beschrijving;
}

function hideCard() {

    hoverCard.classList.add(
        "hidden"
    );
}

function wireSearch() {

    searchInput.addEventListener(
        "input",
        event => {

            const query =
                event.target.value
                    .toLowerCase();

            document
                .querySelectorAll(".object")
                .forEach(o =>
                    o.classList.remove(
                        "highlight"
                    )
                );

            if (!query) {
                return;
            }

            cityObjects.forEach(object => {

                const haystack =
                    (
                        object.naam +
                        " " +
                        object.maker +
                        " " +
                        object.beschrijving
                    )
                    .toLowerCase();

                if (
                    haystack.includes(
                        query
                    )
                ) {

                    const found =
                        document.querySelector(
                            `[data-id="${object.id}"]`
                        );

                    if (found) {

                        found.classList.add(
                            "highlight"
                        );
                    }
                }
            });
        }
    );
}

function centerOnTownhall() {

    const townhall =
        cityObjects.find(
            x => x.type === "townhall"
        );

    if (!townhall) {
        return;
    }

    const viewport =
        document.getElementById(
            "viewport"
        );

    viewport.scrollTo({
        left: townhall.x - 800,
        top: townhall.y - 450,
        behavior: "smooth"
    });
}
