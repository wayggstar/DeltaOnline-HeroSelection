const HEROES = [
    {
        id: "vanguard",
        name: "VANGUARD",
        role: "DAMAGE",
        color: "#f06449",
        desc: "최첨단 전술 장비로 무장한 보병입니다. 뛰어난 기동력과 안정적인 화력을 바탕으로 전장의 최전선을 지킵니다.",
        skin: "images/VANGUARD.png", // 폴더 경로 수정
        skills: [
            { key: "SHIFT", name: "전술 질주", desc: "스테미나 소모 없이 빠르게 전력 질주합니다." },
            { key: "E", name: "파열 수류탄", desc: "폭발 시 파편을 흩뿌려 넓은 범위에 피해를 줍니다." },
            { key: "Q", name: "전술 고글", desc: "시야 내 모든 적의 위치를 강조 표시합니다." }
        ]
    }
];

// 1. SkinView3D 초기화
const skinViewer = new skinview3d.SkinViewer({
    canvas: document.getElementById("skin-viewer"),
    width: 600,
    height: 700,
    skin: "images/VANGUARD.png" // 초기 로딩 경로
});

skinViewer.animation = new skinview3d.IdleAnimation();
skinViewer.animation.speed = 0.5;

function setup() {
    HEROES.forEach(hero => {
        const grid = document.querySelector(`#${hero.role} .icon-grid`);
        if (grid) {
            const icon = document.createElement('div');
            icon.className = 'hero-icon';
            icon.style.backgroundImage = `url('${hero.skin}')`;
            icon.onclick = () => selectHero(hero, icon);
            grid.appendChild(icon);
        }
    });

    const firstIcon = document.querySelector('.hero-icon');
    if (firstIcon) selectHero(HEROES[0], firstIcon);
}

function selectHero(hero, element) {
    document.getElementById('hero-name').innerText = hero.name;
    document.getElementById('hero-name').style.color = hero.color;
    document.getElementById('hero-role-text').innerText = hero.role;
    document.getElementById('hero-role-text').style.color = hero.color;
    document.getElementById('hero-desc').innerText = hero.desc;

    const skillList = document.getElementById('skill-list');
    skillList.innerHTML = hero.skills.map(s => `
        <div class="skill-slot" style="border-left-color: ${hero.color}">
            <b>${s.key}: ${s.name}</b>
            <span>${s.desc}</span>
        </div>
    `).join('');

    skinViewer.loadSkin(hero.skin);

    document.querySelectorAll('.hero-icon').forEach(i => i.classList.remove('active'));
    element.classList.add('active');

    if (window.mcefQuery) {
        window.mcefQuery({ request: `hero_select:${hero.id}` });
    }
}

window.onload = setup;