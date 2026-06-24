let globalName = "Cutiepie";
let gussaMusicStarted = false;

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('n');
    if (nameParam) {
        globalName = decodeURIComponent(nameParam);
        document.querySelectorAll('.user-name').forEach(el => el.innerText = globalName);
        document.getElementById('screen-name').classList.add('hidden');
        document.getElementById('screen1').classList.remove('hidden');
    }
    createBgHearts();
};

function checkNameInput() {
    let inputVal = document.getElementById('name-field').value.trim();
    if(inputVal !== "") {
        globalName = inputVal;
        document.querySelectorAll('.user-name').forEach(el => el.innerText = globalName);
        let currentUrl = window.location.href.split('?')[0];
        let shareLink = currentUrl + "?n=" + encodeURIComponent(globalName);
        document.getElementById('generated-link').innerHTML = `<strong>Your shareable link:</strong><br><span>${shareLink}</span>`;
        
        setTimeout(() => {
            document.getElementById('screen-name').classList.add('hidden');
            document.getElementById('screen1').classList.remove('hidden');
        }, 1500);
    } else {
        alert("Please enter a name! ❤️");
    }
}

function createBgHearts() {
    for(let i=0; i<15; i++) {
        let heart = document.createElement('div');
        heart.classList.add('bg-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        document.body.appendChild(heart);
    }
}

window.addEventListener('click', function(e) {
    if(e.target.id === 'run-no-btn' || e.target.id === 'run-yes-btn' || e.target.classList.contains('name-input')) return;
    let heart = document.createElement('span');
    heart.classList.add('click-heart');
    heart.innerHTML = '💖';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 600);
});

function startMeasuring() {
    let gussaMusic = document.getElementById('gussa-audio');
    if (gussaMusic && !gussaMusicStarted) {
        gussaMusic.play().catch(err => console.log("Audio bypass waiting..."));
        gussaMusicStarted = true;
    }

    document.getElementById('screen1').classList.add('hidden');
    document.getElementById('screen2').classList.remove('hidden');
    let bar = document.getElementById('p-bar');
    let percentText = document.getElementById('percentage');
    let count = 0;
    let interval = setInterval(() => {
        if (count >= 200) {
            clearInterval(interval);
            document.getElementById('alert-msg').style.display = 'block';
            document.getElementById('next-btn').classList.remove('hidden');
        } else {
            count++;
            percentText.innerText = count + '%';
            bar.style.width = (count / 200 * 100) + '%';
        }
    }, 15);
}

let lineIndex = 0;
const romanticStoryLines = [
    "Pata hai... jab aap smile karte ho na, tab lagta hai poori duniya mein raunak aa gayi hai... ✨",
    "Tum gusse mein acchi dikhti ho lekin jab smile karte ho aur bhi jyada acche dikhte ho, tumhare chehre per gussa suit nahin karta hai... (Kyunki meri duniya tum hi ho... 🌎❤️)",
    "Main bas aapko hamesha khush dekhna chahta hoon, aur kuch nahi...",
    "Kyunki aapki khushi se hi toh meri subah aur shaam hoti hai. 💖",
    "Chalo ab zidd chhodo aur meri ek baat ka bilkul sach-sach jawab do... ❤️"
];

function goToRomanticLines() {
    document.getElementById('screen2').classList.add('hidden');
    document.getElementById('screen-lines').classList.remove('hidden');
    document.getElementById('romantic-line-text').innerText = romanticStoryLines[0];
    document.getElementById('lines-gif').src = "Peach Goma angry.gif";
}

function nextRomanticLine() {
    lineIndex++;
    if (lineIndex < romanticStoryLines.length) {
        document.getElementById('romantic-line-text').innerText = romanticStoryLines[lineIndex];
    } else {
        document.getElementById('screen-lines').classList.add('hidden');
        goToLoopScreen();
    }
}

function goToLoopScreen() {
    document.getElementById('screen-loop').classList.remove('hidden');
    document.getElementById('loop-title').innerText = "Ek baat batao... 🧐";
    document.getElementById('loop-msg').innerText = `⚡ Kya tum mere se gussa ho, ${globalName}? 😡`;
    document.getElementById('loop-gif').src = "Peach Goma angry.gif";
}

let loopClickCount = 0;
function handleGussaLoop(buttonType) {
    let gifElement = document.getElementById('loop-gif');
    let msgElement = document.getElementById('loop-msg');
    let titleElement = document.getElementById('loop-title');
    let realClearBtn = document.getElementById('real-clear-btn');
    
    loopClickCount++;
    
    if (realClearBtn) {
        realClearBtn.classList.remove('hidden');
    }

    if(!buttonType) buttonType = 'No';

    // === TARGETED CHANGE: Real situation custom emotional sorry messages ===
    if(buttonType === 'Yes') {
        titleElement.innerText = "I am so sorry... 🥺";
        const yesMessages = [
            "Mujhe pata hai 2 din message nahi kiya aur upar se doosri ladkiyon ki story lagayi, isiliye gussa ho na... Meri sabse badi galti thi... 💔",
            "Woh saari stories aur flirt chat ss bas doston ke sath mazaak tha laddo, mere dil mein aapke alawa koi nahi hai, sachhi! 🥺",
            "Aapka gussa hona 100% sahi hai, maine aapka dil dukhaya. Please mujhe maaf kar do na... 🙇‍♂️🍫",
            "Ab gussa thanda karo meri jaan, niche wale green option ko dekho aur maaf kar ke aage badho please! 🥰❤️"
        ];
        msgElement.innerText = yesMessages[loopClickCount % yesMessages.length];
        gifElement.src = "Peach Goma sorry.gif";
    } else {
        titleElement.innerText = "Jhooth mat bolo! 🤨";
        const noMessages = [
            "Mujhe pata hai aap upar se 'No' bol rahe ho par andar se un stories ko dekh kar bohot gussa ho... 🥺",
            "Face se toh gussa saaf dikh raha hai laddo! Story wali baat par naraz ho na... 🙈",
            "Jhooth bolna paap hai! Accha sach mein gussa nahi ho toh niche dabo na... 😂❤️",
            "Itna nakhre mat dikhao, jaldi se niche wala option dabo aur mere dil ki baat suno! 🌹"
        ];
        msgElement.innerText = noMessages[loopClickCount % noMessages.length];
        gifElement.src = "Peach Goma angry.gif";
    }
}

function exitGussaScreen() {
    document.getElementById('screen-loop').classList.add('hidden');
    document.getElementById('screen-intermediate').classList.remove('hidden');
}

function goToLovePage() {
    let gussaMusic = document.getElementById('gussa-audio');
    let loveMusic = document.getElementById('love-audio');
    
    if(gussaMusic) gussaMusic.pause();
    if(loveMusic) {
        loveMusic.play().catch(err => console.log("Love audio ready"));
    }

    document.getElementById('screen-intermediate').classList.add('hidden');
    document.getElementById('screen4').classList.remove('hidden');
    document.getElementById('romantic-plea').innerText = "Suno na... Ek baar dil se soch kar batana... 🥰";
    document.getElementById('love-gif').src = "cute cat shy blushing.gif";
}

let loveNoClickCount = 0;
function moveNoButton() {
    let noBtn = document.getElementById('run-no-btn');
    let gifElement = document.getElementById('love-gif');
    let pleaElement = document.getElementById('romantic-plea');
    
    noBtn.style.position = 'absolute';

    const romanticPersuasions = [
        "Aise 'No' mat bolo please... ek baar haan keh do! 🥺",
        "Maan jao na jaan, aapki narazgi seedhe dil par lagti hai... 💔",
        "Kitna bada dil hai aapka, ek choti si bhool maaf nahi karoge? 💕",
        "Aapki smile meri life ka dopamine hai, mat cheeno mujhse! ✨",
        "Pls han bolo na, bina baat kiye mera din ekdam kharab lagta hai... 😭",
        "Duniya ki sabse cute ladki ko naraz rehna bilkul suit nahi karta! 👑"
    ];

    if (loveNoClickCount < romanticPersuasions.length) {
        pleaElement.innerText = romanticPersuasions[loveNoClickCount];
    } else {
        pleaElement.innerText = "Bohot nakhre ho gaye! Jaldi se bade se Yes par click karo! 🌹";
    }

    if(loveNoClickCount % 2 === 0) {
        gifElement.src = "cute cat shy blushing.gif";
    } else {
        gifElement.src = "Peach Goma sorry.gif";
    }

    let wrapper = document.getElementById('screen4');
    let rect = wrapper.getBoundingClientRect();

    loveNoClickCount++;

    let x = Math.random() * (rect.width - 100);
    let y = Math.random() * (rect.height - 250) + 180;
    if(x < 10) x = 20;
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}

function goToFinalNote() {
    let loveMusic = document.getElementById('love-audio');
    let finalMusic = document.getElementById('final-audio');
    
    if(loveMusic) loveMusic.pause();
    if(finalMusic) {
        finalMusic.play().catch(err => console.log("Final audio ready"));
    }

    document.getElementById('screen4').classList.add('hidden');
    document.getElementById('screen5').classList.remove('hidden');
    document.getElementById('restart-btn').classList.add('hidden');
    startTypewriter();
}

let index = 0;
function startTypewriter() {
    const loveNoteText = `Dhadkano ko tham kar suno... Jab se aap meri life mein aaye ho, har lamha ek khubsoorat khwab jaisa lagta hai. 💖 Mera har ek din aapki ek pyari si smile se shuru hota hai. Main dunya ke saare sukh aur khushiyan aapki jholi mein daal dena chahta hoon. Ek pal bhi aapke bina rehna ab namumkin sa lagta hai. Thank you, my love, hamesha mere sath rehne ke liye aur mujhe itna toot kar chahne ke liye... Aap sirf meri ho, aur humesha rahogi! 💍😍✨`;
    
    let textElement = document.getElementById('typewriter-text');
    if (index < loveNoteText.length) {
        textElement.innerHTML += loveNoteText.charAt(index);
        index++;
        setTimeout(startTypewriter, 50);
    } else {
        document.getElementById('restart-btn').classList.remove('hidden');
    }
}

function restartApp() {
    index = 0;
    lineIndex = 0;
    loopClickCount = 0;
    loveNoClickCount = 0;
    gussaMusicStarted = true;
    
    document.getElementById('typewriter-text').innerHTML = "";
    
    let gussaMusic = document.getElementById('gussa-audio');
    let loveMusic = document.getElementById('love-audio');
    let finalMusic = document.getElementById('final-audio');
    
    if(loveMusic) { loveMusic.pause(); loveMusic.currentTime = 0; }
    if(finalMusic) { finalMusic.pause(); finalMusic.currentTime = 0; }
    if(gussaMusic) {
        gussaMusic.currentTime = 0;
        gussaMusic.play().catch(err => console.log("Reset play catch"));
    }
    
    let noBtn = document.getElementById('run-no-btn');
    noBtn.style.position = 'static';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    
    document.getElementById('screen5').classList.add('hidden');
    document.getElementById('secret-trigger-zone').children[0].classList.add('hidden');
    document.getElementById('screen1').classList.remove('hidden');
}
