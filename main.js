const HERO_LIST = [
    {
        id: "vanguard",
        name: "VANGUARD",
        role: "DAMAGE",
        color: "#f06449",
        skin: "images/VANGUARD.png", // 파일명 대소문자 주의
        desc: "최첨단 전술 장비로 무장한 보병입니다. 뛰어난 기동력으로 전장의 모든 상황에 대처합니다.",
        skills: [
            { key: "SHIFT", name: "전술 질주", desc: "스테미나 소모 없이 빠르게 전방으로 질주합니다." },
            { key: "E", name: "파열 수류탄", desc: "폭발 시 파편을 뿌려 넓은 범위에 피해를 줍니다." },
            { key: "Q", name: "전술 고글", desc: "모든 적의 위치를 강조 표시하고 공격력을 강화합니다." }
        ]
    }
];

// Skinview3d 설정 (배경 투명화 필수)
const skinViewer = new skinview3d.SkinViewer({
    canvas: document.getElementById("skin-viewer"),
    width: 450,
    height: 550,
    alpha: true // 배경 투명하게 설정
});

skinViewer.animation = new skinview3d.IdleAnimation();
skinViewer.animation.speed = 0.5;

function init() {
    console.log("UI 초기화 시작...");

    HERO_LIST.forEach(hero => {
        // 해당 역할군 그리드 찾기
        const roleDiv = document.getElementById(hero.role);
        if (roleDiv) {
            const grid = roleDiv.querySelector(".icon-grid");
            const icon = document.createElement("div");
            icon.className = "hero-icon";
            icon.style.backgroundImage = `url('${hero.skin}')`;

            icon.onclick = () => selectHero(hero, icon);
            grid.appendChild(icon);
            console.log(`${hero.name} 아이콘 생성 완료`);
        }
    });
}

function selectHero(hero, element) {
    // 중앙 화면 활성화
    const display = document.getElementById("hero-display");
    display.classList.add("active");

    // 정보 텍스트 변경
    document.getElementById("hero-name").innerText = hero.name;
    document.getElementById("hero-name").style.color = hero.color;
    document.getElementById("hero-role-text").innerText = hero.role;
    document.getElementById("hero-desc").innerText = hero.desc;

    // 스킬 목록 생성
    const skillContainer = document.getElementById("skill-list");
    skillContainer.innerHTML = hero.skills.map(s => `
        <div class="skill-slot" style="border-left: 4px solid ${hero.color}; background: rgba(0,0,0,0.6); padding: 12px; margin-bottom: 10px;">
            <b style="color:${hero.color}; font-size: 0.9rem;">${s.key}: ${s.name}</b><br>
            <span style="font-size: 0.8rem; color: #ccc;">${s.desc}</span>
        </div>
    `).join('');

    // 3D 모델 로드
    skinViewer.loadSkin(hero.skin);

    // 하단 아이콘 선택 효과
    document.querySelectorAll('.hero-icon').forEach(i => i.classList.remove('active'));
    element.classList.add('active');
}

// DOM 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", init);