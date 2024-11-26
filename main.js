document.addEventListener('DOMContentLoaded', () => {
    const loadingText = document.getElementById('loading-text');
    
    // テキストの各文字をspanで囲む（スペースも）
    const text = loadingText.textContent;
    loadingText.innerHTML = text.split('').map(char => 
      char === ' ' ? ' ' : `<span>${char}</span>`
    ).join('');
  
    // アニメーションの開始
    startAnimation();
  
    // ページリソースがすべて読み込まれたら処理を実行
    window.addEventListener('load', () => {
      setTimeout(() => {
        // loading-text を非表示にする
        loadingText.style.display = 'none';
        
        // 0.1秒後にStartボタンを表示
        setTimeout(() => {
          const titleStart = document.getElementById('title-start');
          titleStart.style.display = 'block';
          requestAnimationFrame(() => {
            titleStart.style.opacity = '1';
          });
        }, 100); // 0.1秒の遅延
  
      }, 500); // 0.5秒の遅延
    });
  });
  
  function startAnimation() {
    const loadingText = document.getElementById('loading-text');
    const spans = loadingText.querySelectorAll('span');
    
    // 各文字に対してアニメーションとディレイを設定
    spans.forEach((span, index) => {
      span.style.animation = 'none';
      span.offsetHeight; // リフロー強制
      span.style.animation = `bounce 0.5s ${index * 0.05}s`;
    });
  
    // アニメーション完了を待つ時間を計算
    const totalAnimationTime = (spans.length - 1) * 0.05 + 0.5;
  
    // アニメーション完了後、一時停止してから再開
    setTimeout(() => {
      // 1秒待ってから再度開始
      setTimeout(() => {
        if (loadingText.style.display !== 'none') {
          startAnimation();
        }
      }, 1000);
    }, totalAnimationTime * 1000);
  }

function byeTitle() {
  document.getElementById('modal-title').style.display = 'none';
}


// ここからmodal-opening
const openingTextArray = [
  "……アーニャ、知らない天井",
  "いつも通り朝の陽ざしで起きたが、なんだかおかしい",
  "あたりをきょろきょろ見回すが、見慣れた自分の部屋ではないようだ",
  "一緒に寝たはずのぬいぐるみも見当たらない",
  "ちちー、ははー？",
  "ベッドから出て部屋を見て回る",
  "身に覚えのない家具ばかりで誰もいない──やはり知らない家のようだ",
  "鏡の前まで歩き、足を止める",
  "ガーン！ アーニャ、おっさんになってる！",
  "マヌエル・アサーニャ──戦間期スペインの共和派政治家",
  "当然、アーニャはそのことは知らない",
  "アーニャが鏡を見て固まっていると、ドアをノックする音が聞こえた",
  "「アサーニャ大臣、そろそろ出発できますでしょうか」", // アサーニャは1931~陸軍大臣
  "どうやら自分は大臣で、もう出かけないといけないらしい",
  "仕事、だろうか",
  "家来が呼んでるます。アーニャ、おしごと行くます！"
]
let currentOpeningIndex = 0
const modalOpening = document.getElementById('modal-opening');
const characterOpening = document.getElementById('opening-character');

modalOpening.addEventListener('click', event => {
  // 現在のテキストを更新
  const textArea = document.getElementById('opening-text');
  const textParagraph = textArea.querySelector('p');
  if (textParagraph) {
    textParagraph.textContent = openingTextArray[currentOpeningIndex];

      // 最初は影だけ表示
    if (currentOpeningIndex === 5) {
      if (characterOpening) {
        characterOpening.style.display = "block";
        characterOpening.style.filter = "brightness(0)";
      }
    } else if (currentOpeningIndex === 8) {
      // あとからカラー表示
      if (characterOpening) {
        characterOpening.style.display = "block";
        characterOpening.style.filter = "none"; // フィルターを外す（カラー表示）
      }
    }

    // インデックスを次に進める（ループ処理）
    if (currentOpeningIndex + 1 <= openingTextArray.length) {
      currentOpeningIndex += 1; // 次のインデックスに進む
    } else {
      byeOpening(); // 最後ならこのモーダルとのお別れ処理
    }
  }
});  

function byeOpening() {
  console.log("Opening終了");
  // ちゃんと続きかいておいてね、明日の僕
  // 書いたよ
  document.getElementById('modal-opening').classList.add('fadeout');
  setTimeout(function(){ 
    document.getElementById('modal-opening').style.display = "none"; 
  }, 1000);
}




const opening2TextArray = [
  "人が多い……",
  "議会のざわめきが、心の声が、耳に刺さるように届く",
  "その中で聞きたくない言葉が聞こえた",
  "『アサーニャを消せば…』",
  "右派議員の殺意が頭に響く",
  "ガーン！アーニャ、殺される……？", // アサーニャの暗殺計画は特に見つかっていない
  "どうにかしなければ",
  "平和な未来……アーニャが作る！",
  "アーニャ、改革するます！"
]
let currentOpening2Index = 0
const modalOpening2 = document.getElementById('modal-opening2');
const characterOpening2 = document.getElementById('opening-character2');
const giinOpening2 = document.getElementById('opening-character2-giin');

modalOpening2.addEventListener('click', event => {
  // 現在のテキストを更新
  const textArea = document.getElementById('opening-text2');
  const textParagraph = textArea.querySelector('p');
  if (textParagraph) {
    textParagraph.textContent = opening2TextArray[currentOpening2Index];

    if (currentOpening2Index === 0) {
      if (characterOpening2) {
        characterOpening2.style.display = "block";
        characterOpening2.classList.add('fadein2');
      }
    } 
    if (currentOpening2Index === 3) {
      if (giinOpening2) {
        giinOpening2.style.display = "block";
        giinOpening2.classList.add('fadein2');
      }
    } 
    if (currentOpening2Index === 5) {
      if (giinOpening2) {
        giinOpening2.classList.remove('fadein2');
        giinOpening2.classList.add('fadeout');
        setTimeout(function(){ 
          giinOpening2.style.display = "none";
        }, 1000);
      }
    } 

    // インデックスを次に進める（ループ処理）
    if (currentOpening2Index + 1 <= opening2TextArray.length) {
      currentOpening2Index += 1; // 次のインデックスに進む
    } else {
      byeOpening2(); // 最後ならこのモーダルとのお別れ処理
    }
  }
});  

function byeOpening2() {
  console.log("Opening2終了 ゲームに移行します");
  document.getElementById('modal-opening2').classList.add('fadeout');
  setTimeout(function(){ 
    document.getElementById('modal-opening2').style.display = "none"; 
  }, 1000);
}