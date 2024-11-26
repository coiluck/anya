function closeEndInfo() {
    // 全ての .close-end-info ボタンにクリックイベントを設定
    document.querySelectorAll('.close-end-info').forEach(button => {
        button.addEventListener('click', () => {
            // すべての .end-info に .fadeOut クラスを追加
            document.querySelectorAll('.end-info').forEach(info => {
                info.classList.add('fadeout');
            });
            document.querySelectorAll('.ending-text').forEach(text => {
                text.style.display = 'block'; // display: none を取り除く
            });
        });
    });
}

// イベントを設定
closeEndInfo();

// 各ルートのエンディングモーダルをクリックしてテキストを進める

// 各エンディングのテキスト配列を管理するオブジェクト
const endingTextMap = {
  "end-radicalRevolution": [
    "マヌエル・アサーニャ",
    "スペイン第二共和時代の革命家",
    "これがスペインの新時代の幕開けです。",
    "1937年1月21日の演説: 労働がスペイン市民権の唯一の資格となるものである"
  ],
  "end-restartRepublic": [
    "マヌエル・アサーニャ",
    "スペイン第二共和時代の大統領",
    "スペインの困難な時代をまとめ上げ、安定を取り戻す道を見出した",
    "大統領時代の言葉: ここから始める。ここから始まる。" // ここだけ僕の創作
  ],
  "end-fascismCrisis": [
    "マヌエル・アサーニャ",
    "スペイン第二共和時代の大統領",
    "暴力に立ち向かい、改革を志した",
    "その挑戦は後世へと語り継がれる",
    "1937年11月13日の演説: すべてのものを守るために戦う"
  ],
  "end-defection": [
    "マヌエル・アサーニャ",
    "スペイン第二共和時代の大統領",
    "いかなる派閥にも支持されることなく、孤独の中で祖国を去った",
    "その未来を見届けることはできなかったが、最後まで国を憂い続けた",
    "理想を胸に、平和への夢を抱いたままここに眠る",
    "本国を去る時に残した言葉: いずれ平和が来て、勝利が来る" // 1937年11月13日の演説の一部を改変
  ],
  "end-civilWar": [
    "マヌエル・アサーニャ",
    "スペイン第二共和時代の大統領",
    "1880年1月10日 アルカラ・デ・エレナス生まれ",
    "1939年2月5日 フランスに亡命",
    "1939年7月1日 モントーバンに避難",
    "1940年11月3日に死去",
    "戦地にいる同胞への最後の言葉: 平和、慈悲、そして赦しを。"
  ]
};

// 現在の進行状況を管理するオブジェクト
const endingProgress = {};

// 各エンディングのインデックスを初期化
for (const key in endingTextMap) {
  endingProgress[key] = 0; // 各エンディングごとの現在のインデックスを保持
}

// イベントリスナーの設定
document.addEventListener("click", event => {
  const targetModalId = event.target.closest(".modal-ending")?.id; // モーダルIDを取得
  if (!targetModalId || !endingTextMap[targetModalId]) return; // 該当するエンディングがなければ終了

  const currentIndex = endingProgress[targetModalId];
  const textArray = endingTextMap[targetModalId];
  const textArea = document.getElementById(`${targetModalId}-text`); // 対応するテキストエリア
  const textParagraph = textArea.querySelector("p");

  if (textParagraph) {
    textParagraph.textContent = textArray[currentIndex];
    if (currentIndex + 1 <= textArray.length) {
      // インデックスを進める
      endingProgress[targetModalId] += 1;
    } else {
      // 最後ならモーダルを閉じる
      closeEndingModal(targetModalId);
    }
  }
});

// モーダルを閉じる処理
function closeEndingModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('fadein2');
    modal.classList.add('fadeout');
    setTimeout(function(){ 
      modal.style.display = "none";
      document.getElementById('restart').style.display = 'block';
      document.getElementById('restart').classList.add('fadein2');
    }, 1000);
  }
}


document.getElementById('restart').addEventListener('click', event => {
  window.location.reload(false);
});




/*
参考


https://spartacus-educational.com/SPazana.htm

*/