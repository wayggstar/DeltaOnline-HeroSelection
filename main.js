const HERO_DATA = [
    {
        id: "vanguard",
        name: "VANGUARD",
        role: "DAMAGE",
        desc: "최첨단 장비로 무장한 보병입니다. 빠른 연사력과 기동성으로 전선을 유지합니다.",
        color: "#ef4444",
        skin: "skins/vanguard.png"
    },
    // 나중에 여기에 TANK나 SUPPORT 영웅 추가 가능
];

// 1. skinview3d 초기화
const skinViewer = new skinview3d.SkinViewer({
    canvas: document.getElementById("skin-viewer"),
    width: 600, height: 800,
    skin: "https://mineskin.org/assets/skins/default.png" // 기본 스킨 예시
});

skinViewer.animation = new skinview3d.WalkingAnimation();
skinViewer.animation.speed = 0.6;
skinViewer.fov = 70;

// 2. 캐릭터 선택 UI 생성
function init() {
    HERO_DATA.forEach(hero => {
        const grid = document.querySelector(`#${hero.role} .icon-grid`);
        if(grid) {
            const icon = document.createElement('div');
            icon.className = 'hero-icon';
            icon.onclick = () => selectHero(hero, icon);
            grid.appendChild(icon);
        }
    });

    // 첫 영웅 자동 선택
    const firstIcon = document.querySelector('.hero-icon');
    if(firstIcon) selectHero(HERO_DATA[0], firstIcon);
}

function selectHero(hero, element) {
    // UI 업데이트
    document.getElementById('hero-name').innerText = hero.name;
    document.getElementById('hero-name').style.color = hero.color;
    document.getElementById('hero-role-text').innerText = hero.role;
    document.getElementById('hero-desc').innerText = hero.desc;

    // 아이콘 활성화 표시
    document.querySelectorAll('.hero-icon').forEach(i => i.classList.remove('active'));
    element.classList.add('active');

    // 3D 스킨 변경
    // skinViewer.loadSkin(hero.skin);

    // MCEF 브릿지 (Java에 알림)
    if (window.mcefQuery) {
        window.mcefQuery({ request: `select_hero:${hero.id}` });
    }
}

init();