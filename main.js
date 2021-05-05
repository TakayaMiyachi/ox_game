(()=>{
  
  // 先攻のマーク
  const $firstMark = '◯';
  const $first_img = '<img src="img/circle-1.png" alt="">';
  // 後攻のマーク
  const $nextMark = '×';
  const $next_img = '<img src="img/plus-5.png" alt="">';
  // ターン数
  let $count = 1;
  // マス目のIDリスト
  const $ids = [
    ['b1','b2','b3'],
    ['b4','b5','b6'],
    ['b7','b8','b9']
  ];

  // ゲーム実行中のフラグ
  let isRun = true;

  // 先攻のターンかどうかを判定する
  const isFirstMove = () => {
    let isFirst = $count % 2;
    return isFirst == 1;
  }
  
  // IDからオブジェクトを取得する
  const $id = (id) => {
    // const $block_elm = document.querySelectorAll('.block');
    return document.getElementById(id);
  }
  
  // 勝敗の結果を表示する
  const displayResult = (text) => { 
    // $result.style.display = 'block';
    $id('js-result').innerHTML = text;
    isRun = false;
  }

  // クリックされた時の処理
  const clickAction = (e) => {
    // ゲーム実行中でなければ何もしない
    if(!isRun) {
      return;
    }
    // イベントからクリックされたマス目のIDを取得する
    let id = e.target.id;
    // IDからオブジェクトを取得
    let object = $id(id);
    // すでにマークが設定されている場合はスキップ
    if(!object) {
      return;
    }
    // オブジェクト(マス目)にマークを設定する
    if(isFirstMove()) {
      $id(id).innerHTML = $first_img;
    } else {
      $id(id).innerHTML = $next_img;
    }
    // ゲーム終了を判定する
    if(judgeEnd()) {
      return;
    }
    // ターンを＋１する
    $count = $count + 1;
    // ターン表示を切り替える
    changeDisplayCount();
  }
  // ターン表示の文字列のID取得
  const $turn = document.getElementById('js-turn');
  // ターン表示を切り替える
  const changeDisplayCount = () => {
    if(isFirstMove()) {
      // 先攻のターンの場合
      $turn.innerHTML = $firstMark + 'の番';
    }　else {
      // 後攻のターンの場合
      $turn.innerHTML = $nextMark + 'の番';
    }
  }

  // 試合終了を判定する
  const judgeEnd = () => {

    let isEnd = false;
    // 横３マスが同じマークかを判定する
    for(let row = 0; row < 3; row++) {
      // 勝敗を判定する
      isEnd = isWin($ids[row][0], $ids[row][1], $ids[row][2]);
      if(isEnd) {
        displayResult($turn.innerHTML[0] + 'の勝ち！');
        return true;
      }
    }
    // 縦３マスが同じマークかを判定する
    for(let col = 0; col < 3; col++) {
      // 勝敗を判定する
      isEnd = isWin($ids[0][col], $ids[1][col], $ids[2][col]);
      if(isEnd) {
        displayResult($turn.innerHTML[0] + 'の勝ち！');
        return true;
      }

    }

    
    // 斜め３マスが同じマークかを判定する（右下がり）
    isEnd = isWin($ids[0][0], $ids[1][1], $ids[2][2]);
    if(isEnd) {
      displayResult($turn.innerHTML[0] + 'の勝ち！');
      return true;
    }
    // 斜め３マスが同じマークかを判定する（左下がり）
    isEnd = isWin($ids[0][2], $ids[1][1], $ids[2][0]);
    if(isEnd) {
      displayResult($turn.innerHTML[0] + 'の勝ち！');
      return true;
    }
    // 引き分けの場合
    if(9 <= $count) {
      displayResult('引き分け！');
      return true;
    }
    
    // ゲームが続行する場合はfalseを返す
    return false;
  }
  // 勝敗を判定する
  const isWin = (firstId, secondId, thirdId) => {
    // 一つ目のマス目がからの場合は終了
    if($id(firstId).innerHTML == '') {
      return false;
    }
    // 二つ目のますがからの場合は終了
    if($id(secondId).innerHTML == '') {
      return false;
    }
    // 三つ目のマスがかっらの場合は終了
    if($id(thirdId).innerHTML == '') {
      return false;
    }
    // 三つのマス目が同じマークならば勝利
    if(
      ($id(firstId).innerHTML == $id(secondId).innerHTML)
      &&
      ($id(secondId).innerHTML == $id(thirdId).innerHTML)
    ) {
      return true;
    }
    // 三つのマス目が同じじゃない場合は勝利ではない
    return false;
  }
  // resetボタンの処理
  const resetAction = () => {
    // ターンを１に戻す
    $count = 1;
    changeDisplayCount();
    // マス目をからにする
    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 3; col++) {
        $id($ids[row][col]).innerHTML = '';
      }
    }
    // 結果の表示をリセットする
    displayResult('');
    // ゲームを実行中に戻す
    isRun = true;
  } 
  
  // 画面を読み込んだ時の処理
  const onloadAction = () => {
    // マス目にイベントを設定する
    for(let row = 0; row < 3; row++) {
      for(let col = 0; col < 3; col++) {
        $id($ids[row][col]).onclick = clickAction;
      }
    }
    // resetボタンにイベントを設定
    const $reset = document.getElementById('js-reset');
    $reset.onclick = resetAction;
    // リセットアクションを実行
    resetAction();
  }
  // 画面読み込み時のイベントを設定
  window.onload = onloadAction;
  
})();