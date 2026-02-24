const HERO_LIST = [
    {
        id: "vanguard",
        name: "VANGUARD",
        role: "DAMAGE",
        color: "#f06449",
        skin: "images/VANGUARD.png",
        desc: "최첨단 전술 장비로 무장한 보병입니다. 뛰어난 기동력으로 전장을 장악합니다.",
        skills: [
            { key: "SHIFT", name: "전술 질주", desc: "스테미나 소모 없이 빠르게 이동합니다." },
            { key: "E", name: "파열 수류탄", desc: "범위 내 적들에게 강력한 폭발 피해를 줍니다." },
            { key: "Q", name: "전술 고글", desc: "모든 적의 위치를 강조 표시하고 공격력을 높입니다." }
        ]
    }
];

// 3D 뷰어 설정 (초기에 미리 생성하지만 CSS로 가려둠)
const skinViewer = new skinview3d.SkinViewer({
    canvas: document.getElementById("skin-viewer"),
    width: 500,
    height: 600
});
skinViewer.animation = new skinview3d.IdleAnimation();
skinViewer.animation.speed = 0.5;

function init() {
    const grid = document.querySelector("#DAMAGE .icon-grid");

    HERO_LIST.forEach(hero => {
        const icon = document.createElement("div");
        icon.className = "hero-icon";
        icon.style.backgroundImage = `url('${hero.skin}')`;
        icon.onclick = () => selectHero(hero, icon);
        grid.appendChild(icon);
    });
}

function selectHero(hero, element) {
    // 1. 화면 활성화 클래스 추가
    document.getElementById("hero-display").classList.add("active");

    // 2. 정보 업데이트
    document.getElementById("hero-name").innerText = hero.name;
    document.getElementById("hero-name").style.color = hero.color;
    document.getElementById("hero-role-text").innerText = hero.role;
    document.getElementById("hero-role-text").style.color = hero.color;
    document.getElementById("hero-desc").innerText = hero.desc;

    // 3. 스킬 목록 생성
    const skillContainer = document.getElementById("skill-list");
    skillContainer.innerHTML = hero.skills.map(s => `
        <div class="skill-slot" style="border-left-color: ${hero.color}">
            <b>${s.key}: ${s.name}</b>
            <span>${s.desc}</span>
        </div>
    `).join('');

    // 4. 스킨 변경 및 효과
    skinViewer.loadSkin(hero.skin);

    // 아이콘 강조
    document.querySelectorAll('.hero-icon').forEach(i => i.classList.remove('active'));
    element.classList.add('active');

    // 5. MCEF 브릿지 전송
    if (window.mcefQuery) {
        window.mcefQuery({ request: `hero_select:${hero.id}` });
    }
}

window.onload = init;