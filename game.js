// 初期支持率
let factionsSupport = {
  left: 30,
  central: 40,
  right: 20
}

// 支持率を表示する
function updateSupportBars() {
  document.getElementById("left-style-bar").style.width = factionsSupport.left * 0.24 + "%";
  document.getElementById("central-style-bar").style.width = factionsSupport.central * 0.24 + "%";
  document.getElementById("right-style-bar").style.width = factionsSupport.right * 0.24 + "%";
  document.getElementById("left").innerText = "左派: " + factionsSupport.left + "%";
  document.getElementById("central").innerText = "共和: " + factionsSupport.central + "%";
  document.getElementById("right").innerText = "右派: " + factionsSupport.right + "%";
}

document.getElementById('modal-opening2').addEventListener('click', event => {
  updateSupportBars();
});

let currentChoiceIndex = 0; // N回目の選択

// 選択肢を格納した配列
const choices = [
    // 第1回目の選択肢
    { title: "土地改革を推進", effects: { left: 10, central: 5, right: -10 } },
    { title: "軍需産業に投資", effects: { left: -5, central: 0, right: 10 } },
    { title: "国際貿易を拡大", effects: { left: 5, central: 10, right: -10 } },
    // 第2回目の選択肢
    { title: "イギリスによる援助", effects: { left: 0, central: 15, right: -5 } },
    { title: "ソ連による援助", effects: { left: 15, central: 5, right: -10 } },
    { title: "ドイツによる援助", effects: { left: -15, central: -5, right: 15 } },
    // 第3回目の選択肢
    { title: "バスク州の自治権強化を提案", effects: { left: 10, central: 5, right: -10 } },
    { title: "バスク州の自治権拒否を宣言", effects: { left: -5, central: 5, right: 10 } },
    { title: "面倒ごとにはかかわらない", effects: { left: 0, central: 0, right: 0 } },
    // 第4回目の選択肢
    { title: "ポルトガルへの圧力", effects: { left: -5, central: 0, right: 10 } },
    { title: "フランスとの協調", effects: { left: 5, central: 5, right: -5 } },
    { title: "内政への注力", effects: { left: 2, central: 2, right: 2 } },
    // 第5回目の選択肢
    { title: "山猫ストの弾圧", effects: { left: -10, central: 0, right: 5 } },
    { title: "教会の破壊を黙認", effects: { left: 0, central: -10, right: 0 } },
    { title: "人民戦線の結成", effects: { left: 10, central: 10, right: -10 } },
    // 第6回目の選択肢
    { title: "右派による暗殺を非難", effects: { left: 5, central: 0, right: -5 } },
    { title: "やり返せ", effects: { left: -5, central: 0, right: 5 } },
    { title: "放っておけ", effects: { left: -10, central: -10, right: -10 } },
    // 第7回目の選択肢
    { title: "非常事態による憲法の停止", effects: { left: -5, central: -5, right: 5 } },
    { title: "全国で警察を動員", effects: { left: 0, central: 0, right: -5 } },
    { title: "ストライキの頻発", effects: { left: 5, central: 0, right: -10 } }
  ];
  
  // HTMLの選択肢を更新する関数
  function updateChoices() {
    // 現在の選択ステップに基づいて選択肢を取得
    const startIndex = currentChoiceIndex * 3;
    const nextChoices = choices.slice(startIndex, startIndex + 3);
  
    // HTML要素を更新
    const selectionContainers = document.querySelectorAll('.choose');
    nextChoices.forEach((choice, index) => {
      const container = selectionContainers[index];
      container.querySelector('div[id$="-title"]').textContent = choice.title;
      container.querySelector('div[id$="-nakami"]').textContent =
        `左派${choice.effects.left} 中道${choice.effects.central} 右派${choice.effects.right}`;
    });
  }
  
// 現在の選択インデックスを更新する関数
function updateCurrentIndexDisplay() {
  const totalSteps = choices.length / 3; // 全体の選択肢の回数
  const currentIndexElement = document.getElementById('current-index');
  currentIndexElement.textContent = `${currentChoiceIndex + 1}/${totalSteps}`;
  if(currentChoiceIndex + 1 > totalSteps){
    document.getElementById('current-index').style.display = "none";
  }
}


// 初期表示
updateChoices();
updateCurrentIndexDisplay();

  // 選択肢にイベントリスナーを設定
  const chooseElements = document.querySelectorAll('.choose');
  chooseElements.forEach(element => {
    element.addEventListener('click', function() {
      // クリックされた選択肢のインデックスを取得
      const choiceIndex = Array.from(chooseElements).indexOf(this);
      const selectedChoice = choices[currentChoiceIndex * 3 + choiceIndex];
  
      // 選択された効果を支持率に反映
      factionsSupport.left = Math.max(0, Math.min(100, factionsSupport.left + selectedChoice.effects.left));
      factionsSupport.central = Math.max(0, Math.min(100, factionsSupport.central + selectedChoice.effects.central));
      factionsSupport.right = Math.max(0, Math.min(100, factionsSupport.right + selectedChoice.effects.right));

      // 現在の選択ステップを進める
      currentChoiceIndex++;
      // 現在のSTEPを表示する部分を更新
      updateCurrentIndexDisplay();
  
      // 選択肢をフェードアウト
      chooseElements.forEach(el => {
        el.classList.add('fadeout2'); // フェードアウト用クラスを追加
      });

      // 支持率を更新
      updateSupportBars();
  
      // 次の選択肢を表示
      if (currentChoiceIndex < 7) {   // 7つの分岐
        setTimeout(() => {
          updateChoices();
          chooseElements.forEach(el => {
            el.classList.remove('fadeout2'); // フェードアウトクラスを削除
            el.classList.add('fadein'); // フェードイン用クラスを追加
          });
  
          // フェードイン終了後にクラスを削除
          setTimeout(() => {
            chooseElements.forEach(el => el.classList.remove('fadein'));
          }, 500);
        }, 500); // フェードアウトが終わるタイミングで更新
      } else {
        // 全ての選択が終了した場合
        console.log('選択肢が終了しました。');
        console.log('最終的な支持率:', factionsSupport);
        determineEnding(factionsSupport);  // √分岐
        setTimeout(function(){ 
          document.getElementById('modal-game').classList.add('fadeout');
        }, 1000);
        setTimeout(function(){ 
          document.getElementById('modal-game').style.display = 'none';
        }, 2000);
      }
    });
  });

// √分岐system
function determineEnding(factionsSupport) {
  const left = factionsSupport.left;
  const central = factionsSupport.central;
  const right = factionsSupport.right;
  if (left > central + right) {
    // 急進的革命√
    const modal = document.getElementById("end-radicalRevolution");
    if (modal) {
      setTimeout(function(){
        modal.style.display = "block";
        modal.classList.add('fadein2');
      }, 2000);
    }
  } else if (central > left && central > right && Math.abs(left - right) <= 10) {
    // 共和制再建√
    const modal = document.getElementById("end-restartRepublic");
    if (modal) {
      setTimeout(function(){
        modal.style.display = "block";
        modal.classList.add('fadein2');
      }, 2000);
    }
  } else if (right > left + central) {
    // ファシズム危機√
    const modal = document.getElementById("end-fascismCrisis");
    if (modal) {
      setTimeout(function(){
        modal.style.display = "block";
        modal.classList.add('fadein2');
      }, 2000);
    }
  } else if (left <= 25 && central <= 25 && right <= 25) {
    // 自主的亡命√
    const modal = document.getElementById("end-defection");
    if (modal) {
      setTimeout(function(){
        modal.style.display = "block";
        modal.classList.add('fadein2');
      }, 2000);
    }
  } else {
    // 内戦勃発(nomal)√
    const modal = document.getElementById("end-civilWar");
    if (modal) {
      setTimeout(function(){
        modal.style.display = "block";
        modal.classList.add('fadein2');
      }, 2000);
    }
  }
}
