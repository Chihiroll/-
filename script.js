//=====変数や配列など。
const questions = ["abcエービーシー", "appleりんご", "siberiaシベリア", "cuteかわいい",
    "home家", "legend伝説", "ninja忍者", "woodpeckerキツツキ",
    "helloworldこんにちは世界", "reality現実", "madness狂気",
    "anger怒り", "blues憂鬱", "enemy敵",
    "firstはじめ", "loneliness孤独", "forkフォーク",
    "scream叫び", "hamburgerハンバーガー", "pain痛み",
    "duty義務", "poor貧しい、乏しい", "japan日本", 
    "googleグーグル", "bridge橋", "chopstick箸", 
    "end端、終わり", "feeling気持ち", "time時間、回数", "sweet甘い", 
    "hall玄関", "ignore無視", "insect虫", 
    "love愛", "wife妻", "wizard魔法使い",
    "witch魔女", "magic魔法", "fantasyファンタジー", 
    "broomほうき", "harrypotterハリー・ポッター", "christmasクリスマス", 
    "wand杖", "dragonドラゴン", "monster魔物", 
    "sleepy眠い", "hunger飢え", "tension緊張", 
    "nervous神経質", "thief泥棒", "betrayal裏切り", 
    "wound傷", "candyあめ", "theory理論、セオリー", 
    "promise約束", "envy嫉妬", "crime罪悪", 
    "cheer乾杯、歓声", "pension年金", "roots根っこ、ルーツ", 
    "peace平和", "uniform制服", "economy経済", 
    "conceitうぬぼれ", "japan日本", "europeヨーロッパ",
    "asiaアジア", "malice悪意、怨み", "simple単純", 
    "wonderful素晴らしい", "pride誇り", "peas豆、えんどう豆", 
    "peace平和", "piece一切れ、ピース", "physics物理", 
    "subject主題、被検体", "biscuitビスケット", 
    "receive受け取る、頂く", "jewelry宝石", "calendarカレンダー、暦", 
    "Hierarchy階層、ヒエラルキー", "rhythmリズム", "allergyアレルギー", 
    "professor教授", "tomorrow明日", "mahjong麻雀"]; //質問のリスト
    let repetition = 0;  //タイプした単語の回数
    let starttime, endtime, previousTime = null; //ゲーム開始と終わりの時間
    let timerID; //タイマーのIDを保存する変数。
    let alltime = [];
    //HTMLとつなげる🔻===========
    let questionfont = document.getElementById("questionfont"); //HTMLとつなげる。質問の文の塊。
    let typingfont = document.getElementById("typingfont"); //プレイヤーがタイピングした文の塊。
    let anotherfont = document.getElementById("anotherfont"); //その他「クリア！！」や「START!!」などの文字の塊。
    let thescorefont = document.getElementById("thescorefont"); //タイムなどのスコアの表示。
    let nowtimefont = document.getElementById("nowtimefont"); //現在の経過時間の文字の塊。
    let titlefont = document.getElementById("titlefont"); //タイトルのときのフォントたち
    let scorefont = document.getElementById("scorefont");
    let titlebackbutton = document.getElementById('titlebackbutton');
    let scoregraphexistence = null;
//=========================🔻ここからが関数=======
//スペースキーを押すともう一度遊べるようになる処理
titlebackbutton.onclick = event =>{
        document.getElementById("scorefont").style.display = "none";
        document.getElementById("scoregraph").style.display = "none";
        document.getElementById("completedimage").style.display = 'none';
        document.getElementById('gamepage').style.display = 'none';
        document.getElementById("scorepage").style.display = 'none'
        start();
        onemoregame();
    }

function titleback(){
    document.getElementById('titlebackbutton').style.display = 'block';
}

function onemoregame(){
    repetition = 0;
    cantype = false;
    document.onkeydown = null;
    document.onkeydown = event => {
        if(event.key === " "){
            document.onkeydown = null;
            document.getElementById("titlebackbutton").style.display = "none";
            document.getElementById("completedimage").style.display = 'none';
            document.getElementById('scorebutton').style.display = 'none';
            starttime = performance.now();
            const gamepage = document.getElementById('gamepage');
            const startpage = document.getElementById('startpage');
            startpage.style.opacity = 0;
            startpage.style.zIndex = 0;
            gamepage.style.opacity = 1;
            gamepage.style.zIndex = 1;
            game();
        }
    }
};
function onegame() { //一単語ずつの関数
    //ランダムな問題を選んで英字を抽出🔻
    let question = questions[Math.floor(Math.random() * questions.length)];
    let long = 0;
    let cantype = true;
        //画面を初期化
    //document.body.innerHTML = "";←これだとすべて消えてしまう。
    document.getElementById("startimage").style.display = "none";
    questionfont.innerHTML = "";
    typingfont.innerHTML = "";
    anotherfont.innerHTML = "";
    thescorefont.innerHTML = "";
    nowtimefont.innerHTML = "";
    //質問を表示🔻
    questionfont.innerHTML += question.match(/[^\x01-\x7E\xA1-\xDF]/g).join('') + "<br>";
    question = question.match(/[a-zA-Z]/g).join('');
    questionfont.innerHTML += question.toUpperCase() + "<br>";
    // ゲーム開始時の時間を記録
    clearInterval(timerID);
    if (repetition === 0) {
        starttime = performance.now();
    }
    timerID = setInterval(() => {
        let nowtime = performance.now();
        nowtimefont.innerHTML = ((starttime - nowtime)/1000).toFixed(1); //現在時刻の表示をしている途中。
    }, 100);
    //キーが押されたときの処理🔻
    document.onkeydown = event => {
        if(!cantype){
            return; //入力禁止中だった場合
        }
        if(event.key.toLowerCase() === question[long].toLowerCase()){
            //正しい文字をタイプした場合の処理
            typingfont.innerHTML += event.key.toLowerCase();
            long++;
            if(long === question.length){
                //すべての文字をタイプし終えた後の処理
                cantype = false;
                repetition++;
                if(repetition !== 8){
                    setTimeout(() => {
                        anotherfont.innerHTML += ("<br>NEXT！");
                        //次の1単語へ
                        onegame();
                    }, 500);
                } else {
                    clearInterval(timerID); //タイマーストップ
                    endtime = performance.now();
                    nowtimefont.innerHTML = "";
                    setTimeout(() => {
                        questionfont.innerHTML = "";
                        typingfont.innerHTML = "";
                        document.getElementById("completedimage").style.display = "block";
                    setTimeout(() => {
                        if(previousTime != null){
                            thescorefont.innerHTML += "前回のタイム：" +((previousTime)/1000).toFixed(2) + "秒 / ";
                            if(previousTime > (endtime - starttime)){
                                thescorefont.innerHTML += "★";
                            }
                        }
                        previousTime = (endtime - starttime);
                        alltime.push(previousTime);
                        thescorefont.innerHTML += "今回のタイム：" + ((previousTime)/1000).toFixed(2) + "秒";
                        anotherfont.innerHTML += ("<br>もう一度遊びたいなら、スペースキーを押してごらん");
                        titleback();
                        onemoregame();
                    }, 1000);
                    }, 500);
                }
            }
        } else {
            //間違っていた場合の処理
            typingfont.innerHTML += event.key;
            anotherfont.innerHTML += ("<br>ミス！");
            anotherfont.innerHTML += ("<br>もう一度遊びたいなら、スペースキーを押してごらん");
            titleback();
            clearInterval(timerID);
            onemoregame();
            
        }
    
        
    };
    };

function game(){  //ひとつのゲームの関数。STARTからENDまで。    
    questionfont.innerHTML = "";
    typingfont.innerHTML = "";
    anotherfont.innerHTML = "";
    thescorefont.innerHTML = "";
    nowtimefont.innerHTML = "";
    setTimeout(() => {
        document.getElementById("startimage").style.display = "block";
        setTimeout(() => { //１秒後にゲーム開始
            onegame();
        }, 1000);
    }, 500); //画面切り替えからSTARTが表示されるまでの間
};
function start(){
    document.getElementById("scorepage").style.display = 'none'
    questionfont.innerHTML = "";
    typingfont.innerHTML = "";
    anotherfont.innerHTML = "";
    thescorefont.innerHTML = "";
    nowtimefont.innerHTML = "";
    document.getElementById("startpage").style.opacity = 1;
    const scorebutton = document.getElementById("scorebutton");
    document.getElementById('scorebutton').style.display = 'block';  //スコアボタンを表示
    document.getElementById('titlebackbutton').style.display = 'none';
    //スコアボタンが押された時
    scorebutton.onclick = event =>{ 
        document.getElementById("scorefont").style.display = "block";
        document.getElementById("scoregraph").style.display = "block";
        document.onkeydown = null;
        document.getElementById('scorebutton').style.display = 'none';
        document.getElementById("scorepage").style.display = 'block'
        if(previousTime != null){
            scorefont.innerHTML = ("前回の結果:") + ((previousTime)/1000).toFixed(2) + "秒";
            scorefont.innerHTML += ("<br>今までの最高の結果：") + ((Math.min(...alltime))/1000).toFixed(2) + "秒";
            scorefont.innerHTML += ("<br>平均値：") + (((alltime.reduce((acc, val) => acc + val, 0))/alltime.length)/1000).toFixed(2);
            //グラフ
            const ctx = document.getElementById('scoregraph').getContext('2d');
            if (scoregraphexistence){
                scoregraphexistence.destroy();
            }
            scoregraphexistence = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: alltime.map((_, index) => index+ 1 + "回目"),
                    datasets: [{
                        label: 'タイム',
                        data: alltime.map(t => t/ 1000),
                        backgroundColor: '#F5D421',
                        borderColor: '#F5D421',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            })
        } else {
            scorefont.innerHTML = ("記録がありません");
        }
                titleback();
    }
    onemoregame();
};
//=======ここから下がゲーム。
start();
//=======


