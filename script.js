document.addEventListener('DOMContentLoaded', () => {

    let currentStage = 1;
    let currentQuestion = 1;
    const answers = { 1: '', 2: '', 3: '' };

    const enterBtn    = document.getElementById('enterBtn');
    const optionBtns  = document.querySelectorAll('.option-btn');
    const progressBar = document.getElementById('progressBar');
    const qNum        = document.getElementById('qNum');
    const rxBody      = document.getElementById('rxBody');
    const rxFooter    = document.getElementById('rxFooter');
    const actionBtns  = document.getElementById('actionBtns');
    const restartBtn  = document.getElementById('restartBtn');
    const shareBtn    = document.getElementById('shareBtn');
    const confettiCon = document.getElementById('confetti-container');

    function goToStage(n) {
        const current = document.getElementById(`stage-${currentStage}`);
        current.classList.add('exit');
        setTimeout(() => {
            current.classList.remove('active', 'exit');
            currentStage = n;
            const next = document.getElementById(`stage-${n}`);
            next.classList.add('active');
        }, 700);
    }

    enterBtn.addEventListener('click', () => {
        addBounce(enterBtn);
        setTimeout(() => goToStage(2), 250);
    });

    optionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const qIndex = parseInt(this.dataset.q);
            const val    = this.dataset.val;

            document.querySelectorAll(`[data-q="${qIndex}"]`)
                    .forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            answers[qIndex] = val;

            setTimeout(() => {
                if (qIndex < 3) {
                    showQuestion(qIndex + 1);
                } else {
                    setTimeout(() => goToStage(3), 400);
                    setTimeout(() => startPrescription(), 1500);
                }
            }, 450);
        });
    });

    function showQuestion(n) {
        const prev = document.getElementById(`q${n - 1}`);
        const next = document.getElementById(`q${n}`);
        prev.classList.remove('active');
        next.style.animation = 'none';
        next.offsetHeight;
        next.style.animation = '';
        next.classList.add('active');
        currentQuestion = n;
        qNum.textContent = n;
        progressBar.style.width = `${(n / 3) * 100}%`;
    }

    function buildPrescription() {
        const today = new Date().toLocaleDateString('en-GB', {
            day: '2-digit', month: 'long', year: 'numeric'
        });
        const energySource = answers[1] || 'coffee';
        const dayFeeling   = answers[2] || 'great';
        const eveningWish  = answers[3] || 'some rest';
        const energyLine = dayFeeling === 'tired'
            ? `  Note: More ${energySource} is strongly advised.`
            : `  Note: Keep up the ${energySource} intake. It shows.`;

        return [
            `Date: ${today}`,
            `Patient: Your Favourite Person \ud83d\ude0a`,
            ``,
            `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
            ``,
            `DIAGNOSIS:`,
            `  \u2736 Acute Awesomeness Syndrome`,
            `  \u2736 Chronic Overachiever Disorder`,
            `  \u2736 Terminal Kindness to Everyone`,
            ``,
            `DOCTOR'S VITALS TODAY:`,
            `  Energy Source  \u2192 ${energySource}`,
            `  Day Status     \u2192 ${dayFeeling === 'great' ? 'Thriving \u2713' : dayFeeling === 'okay' ? 'Doing well \u2713' : 'Needs rest \u2713'}`,
            ``,
            `PRESCRIBED TREATMENT:`,
            `  Rx 1: ${eveningWish} \u2014 tonight, mandatory.`,
            `  Rx 2: Zero studying. Doctor's orders.`,
            `  Rx 3: Absolutely no guilt about resting.`,
            energyLine,
            ``,
            `DOCTOR'S NOTES:`,
            `  You spend every day taking care`,
            `  of everyone else. Today, someone`,
            `  just wants to say \u2014`,
            ``,
            `  You're doing an incredible job.`,
            `  The world is lucky to have`,
            `  a doctor like you, Dr. Mehak. \ud83e\ude7a`,
            ``,
            `  Happy Doctor's Day! \u2728`,
            ``,
        ].join('\n');
    }

    async function startPrescription() {
        const text = buildPrescription();
        rxBody.textContent = '';
        rxBody.classList.remove('done');
        const chars = [...text];
        for (let i = 0; i < chars.length; i++) {
            rxBody.textContent += chars[i];
            const delay = (chars[i] === '\n' || chars[i] === ' ') ? 8 : 28;
            await sleep(delay);
        }
        rxBody.classList.add('done');
        await sleep(300);
        rxFooter.style.display = 'flex';
        await sleep(200);
        launchConfetti();
        await sleep(600);
        actionBtns.style.display = 'flex';
    }

    const confettiSymbols = ['\u2736', '\ud83e\ude7a', '\u2b50', '\u271a', '\ud83d\udc8a', '\u2728', '\ud83c\udf89', '\u2695'];
    const confettiColors  = ['#00e6a0', '#f5a623', '#ff6b6b', '#74b9ff', '#a29bfe', '#fd79a8'];

    function launchConfetti() {
        for (let i = 0; i < 60; i++) setTimeout(() => spawnConfetti(), i * 40);
        for (let i = 0; i < 30; i++) setTimeout(() => spawnConfetti(), 2500 + i * 60);
    }

    function spawnConfetti() {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.textContent = confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];
        const x = Math.random() * 100;
        const duration = 2.5 + Math.random() * 2.5;
        const size = 0.7 + Math.random() * 1.2;
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        el.style.cssText = `left:${x}%;font-size:${size}rem;color:${color};animation-duration:${duration}s;animation-delay:${Math.random()*0.5}s;`;
        confettiCon.appendChild(el);
        setTimeout(() => el.remove(), (duration + 0.5) * 1000);
    }

    restartBtn.addEventListener('click', () => {
        currentQuestion = 1;
        answers[1] = ''; answers[2] = ''; answers[3] = '';
        progressBar.style.width = '33.33%';
        qNum.textContent = '1';
        document.querySelectorAll('.question').forEach((q, i) => q.classList.toggle('active', i === 0));
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        rxBody.textContent = '';
        rxBody.classList.remove('done');
        rxFooter.style.display = 'none';
        actionBtns.style.display = 'none';
        goToStage(1);
    });

    shareBtn.addEventListener('click', async () => {
        const url  = window.location.href;
        const text = '\ud83e\ude7a Happy Doctor\'s Day, Dr. Mehak Tariq! This was made just for you!';
        if (navigator.share) {
            try { await navigator.share({ title: 'Happy Doctor\'s Day!', text, url }); }
            catch (e) { /* cancelled */ }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                shareBtn.textContent = '\u2713 Link Copied!';
                shareBtn.classList.add('copied');
                setTimeout(() => {
                    shareBtn.textContent = '\u2b06 Share This';
                    shareBtn.classList.remove('copied');
                }, 2500);
            } catch(e) {}
        }
    });

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
    function addBounce(el) {
        el.style.transform = 'scale(0.95)';
        setTimeout(() => { el.style.transform = ''; }, 150);
    }
});