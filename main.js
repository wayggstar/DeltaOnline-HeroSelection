const HERO_LIST = [
    {
        id: "vanguard",
        name: "VANGUARD",
        role: "DAMAGE",
        color: "#f06449",
        skin: "images/VANGUARD.png",
        desc: "최첨단 전술 장비로 무장한 보병입니다. 뛰어난 기동력으로 전장을 장악합니다.",
        skills: [
            { key: "SHIFT", name: "전술 질주", desc: "빠르게 이동합니다." },
            { key: "E", name: "파열 수류탄", desc: "범위 피해를 줍니다." },
            { key: "Q", name: "전술 고글", desc: "적을 식별합니다." }
        ]
    }
];

function init() {
    HERO_LIST.forEach(hero => {
        const roleDiv = document.getElementById(hero.role);
        if (roleDiv) {
            const grid = roleDiv.querySelector(".icon-grid");
            const icon = document.createElement("div");
            icon.className = "hero-icon";
            icon.style.backgroundImage = `url('${hero.skin}')`;
            icon.onclick = () => selectHero(hero, icon);
            grid.appendChild(icon);
        }
    });
}

function selectHero(hero, element) {
    const display = document.getElementById("hero-display");
    display.classList.add("active");

    document.getElementById("hero-name").innerText = hero.name;
    document.getElementById("hero-name").style.color = hero.color;
    document.getElementById("hero-role-text").innerText = hero.role;
    document.getElementById("hero-desc").innerText = hero.desc;

    const layers = document.querySelectorAll('.minecraft-pawn .layer');
    layers.forEach(layer => {
        layer.style.backgroundImage = `url('${hero.skin}')`;
    });

    const skillContainer = document.getElementById("skill-list");
    skillContainer.innerHTML = hero.skills.map(s => `
        <div class="skill-slot" style="border-left-color: ${hero.color}">
            <b style="color:${hero.color}">${s.key}: ${s.name}</b><br>
            <span style="font-size: 0.8rem; color: #ccc;">${s.desc}</span>
        </div>
    `).join('');

    document.querySelectorAll('.hero-icon').forEach(i => i.classList.remove('active'));
    element.classList.add('active');
}

document.addEventListener("DOMContentLoaded", init);