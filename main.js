const HERO_LIST = [
    {
        id: "vanguard",
        name: "VANGUARD",
        role: "DAMAGE",
        color: "#f06449",
        skin: "images/VANGUARD.png", // ★ 반드시 대문자인지 확인하세요!
        desc: "최첨단 전술 장비로 무장한 보병입니다. 뛰어난 기동력으로 전장을 장악합니다.",
        skills: [
            { key: "SHIFT", name: "전술 질주", desc: "스테미나 소모 없이 빠르게 이동합니다." },
            { key: "E", name: "파열 수류탄", desc: "범위 내 적들에게 강력한 피해를 줍니다." },
            { key: "Q", name: "전술 고글", desc: "모든 적의 위치를 강조 표시합니다." }
        ]
    }
];

// 1. SkinViewer 생성 시 투명도 옵션 추가
const skinViewer = new skinview3d.SkinViewer({
    canvas: document.getElementById("skin-viewer"),
    width: 500,
    height: 600,
    alpha: true // ★ 배경을 투명하게 해서 뒤의 빛(그라데이션)이 보이게 함
});

// 2. 애니메이션 적용 방식 확인
skinViewer.animation = new skinview3d.IdleAnimation();
skinViewer.animation.speed = 0.5;

function init() {
    HERO_LIST.forEach(hero => {
        const grid = document.querySelector(`#${hero.role} .icon-grid`);
        if (grid) {
            const icon = document.createElement("div");
            icon.className = "hero-icon";
            // ★ Vercel 주소에서는 images/VANGUARD.png 인지 images/vanguard.png 인지 정확해야 함
            icon.style.backgroundImage = `url('${hero.skin}')`;
            icon.onclick = () => selectHero(hero, icon);
            grid.appendChild(icon);
        }
    });
}

function selectHero(hero, element) {
    document.getElementById("hero-display").classList.add("active");
    document.getElementById("hero-name").innerText = hero.name;
    document.getElementById("hero-name").style.color = hero.color;
    document.getElementById("hero-role-text").innerText = hero.role;
    document.getElementById("hero-desc").innerText = hero.desc;

    const skillContainer = document.getElementById("skill-list");
    skillContainer.innerHTML = hero.skills.map(s => `
        <div class="skill-slot" style="border-left: 4px solid ${hero.color}; background: rgba(0,0,0,0.5); padding: 10px; margin-bottom: 5px;">
            <b style="color:${hero.color}">${s.key}: ${s.name}</b><br>
            <span style="font-size: 0.8rem; color: #ccc;">${s.desc}</span>
        </div>
    `).join('');

    // ★ loadSkin 사용법 확인
    skinViewer.loadSkin(hero.skin);

    document.querySelectorAll('.hero-icon').forEach(i => i.classList.remove('active'));
    element.classList.add('active');
}

window.onload = init;