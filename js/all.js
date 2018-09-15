var account = document.form1['account'];
var password = document.form1['password'];
var confirmPassword = document.form1['confirmPassword'];
var stepOneBtn = document.form1['btn1'];

var phone = document.form2['phone'];
var birthYear = document.form2['birthYear'];
var birthMonth = document.form2['birthMonth'];
var birthDay = document.form2['birthDay'];
var city = document.form2['city'];
var dist = document.form2['dist'];
var distData;
var address = document.form2['address'];
var stepTwoBtn = document.form2['btn2'];

var upload = document.form3['upload'];
var imagesList = document.querySelector('.images-list');
var imgSrc = [];
var stepThreeBtn = document.form3['btn3'];

var cardNumber = document.form4['cardNumber'];
var cardholder = document.form4['cardholder'];
var bank = document.form4['bank'];
var cvv = document.form4['cvv'];
var expireMonth = document.form4['expireMonth'];
var expireYear = document.form4['expireYear'];
var stepFourBtn = document.form4['btn4'];

var nextBtn;

// 驗證信箱
function checkEmail() {
  let reg = /^\w+((\.\w+)|(\-\w+))*\@[a-zA-Z0-1]+((\.|\-)[a-zA-Z0-9]+)*\.[a-zA-Z]+$/;
  if (!reg.test(account.value)) {
    account.classList.add('is-invalid');
    account.classList.remove('is-valid');
  } else {
    account.classList.remove('is-invalid');
    account.classList.add('is-valid');
  };
  // 檢查表單是否認證完成
  btnOneUsable();
};

// 驗證密碼
function checkPassword() {
  let passwordLength = password.value.length;
  if (passwordLength < 8) {
    password.classList.add('is-invalid');
    password.classList.remove('is-valid');
  } else {
    password.classList.remove('is-invalid');
    password.classList.add('is-valid');
  };

  btnOneUsable();
  checkPasswordConfirm();
};

// 確認密碼
function checkPasswordConfirm() {
  if (confirmPassword.value != password.value) {
    confirmPassword.classList.add('is-invalid');
    confirmPassword.classList.remove('is-valid');
  } else {
    confirmPassword.classList.remove('is-invalid');
    confirmPassword.classList.add('is-valid');
  };

  btnOneUsable();
};

// 檢查form1是否驗證完成
function btnOneUsable() {
  let accountClass = account.classList;
  let passwordClass = password.classList;
  let confirmPasswordClass = confirmPassword.classList;

  nextBtn = stepOneBtn;

  if (accountClass.contains('is-valid') && passwordClass.contains('is-valid') && confirmPasswordClass.contains('is-valid')) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  };
};

// 驗證手機
function checkPhone() {
  let reg = /^09\d{2}\d{6}$/;

  if (!reg.test(phone.value)) {
    phone.classList.add('is-invalid');
    phone.classList.remove('is-valid');
  } else {
    phone.classList.remove('is-invalid');
    phone.classList.add('is-valid');
  };

  btnTwoUsable();
};

// 運算年月
function renderYearMonth() {
  let date = new Date();
  let minYear = 1900;
  let maxYear = date.getFullYear();
  let minMonth = 1;
  let maxMonth = 12;

  for (let i = minYear; i <= maxYear; i++) {
    birthYear.innerHTML += `<option value="${i}">${i}</option>`;
  };

  for (let i = minMonth; i <= maxMonth; i++) {
    birthMonth.innerHTML += `<option value="${i}">${i}</option>`;
  };
};

// 運算日
function renderDate() {
  let selectedYear = birthYear.value;
  let selectedMonth = birthMonth.value;
  let daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let day;

  // 清除日選項
  birthDay.innerHTML = `<option value="" hidden>DD</option>`;

  // 閏年
  if (selectedYear % 4 == 0) {
    daysInEachMonth[1] = 29;
  };

  day = daysInEachMonth[selectedMonth - 1];

  for (let i = 1; i <= day; i++) {
    birthDay.innerHTML += `<option value="${i}">${i}</option>`;
  };
};

// 遠端獲得鄉鎮區資料
function getDistList() {
  let xhr = new XMLHttpRequest();
  xhr.open('get', 'https://ouiis.github.io/validation/taiwan_address.json');
  xhr.send(null);

  // 遠端縣市資料存入distData
  xhr.onload = function () {
    distData = JSON.parse(xhr.responseText);
  }
};

// 點選縣市運算鄉鎮區
function renderDist(e) {
  let selectedCity = e.target.value;
  let distList;

  // 點選縣市後顯示驗證正確
  city.classList.add('is-valid');
  // 清除鄉鎮區選項
  dist.innerHTML = `<option value="" hidden>Dist</option>`;

  // 找出縣市將鄉鎮區存入distList
  for (let i = 0; i < distData.length; i++) {
    if (selectedCity == distData[i].city) {
      distList = distData[i].dist;
    };
  };

  // 網頁寫入選項
  for (let i = 0; i < distList.length; i++) {
    dist.innerHTML += `<option value="${distList[i]}">${distList[i]}</option>`;
  };

  // 重新檢查鄉鎮區是否已點選
  checkDist();
  btnTwoUsable();
};

// 驗證鄉鎮區是否選取
function checkDist() {
  if (dist.value != '') {
    dist.classList.add('is-valid');
    dist.classList.remove('is-invalid');
  } else {
    dist.classList.add('is-invalid');
    dist.classList.remove('is-valid');
  };

  btnTwoUsable();
};

// 驗證地址(form2) & 信用卡名字、銀行(form4)欄位是否空白
function checkString(e) {
  if (e.target.value != '') {
    e.target.classList.add('is-valid');
    e.target.classList.remove('is-invalid');
  } else {
    e.target.classList.add('is-invalid');
    e.target.classList.remove('is-valid');
  };

  if (e.target == address) {
    btnTwoUsable();
  } else if (e.target == cardholder || e.target == bank) {
    btnFourUsable();
  };
};

// 檢查form2是否驗證完成
function btnTwoUsable() {
  let phoneClass = phone.classList;
  let addressClass = address.classList;
  let cityClass = city.classList;
  let distClass = dist.classList;

  nextBtn = stepTwoBtn;

  if (phoneClass.contains('is-valid') && cityClass.contains('is-valid') && distClass.contains('is-valid') && addressClass.contains('is-valid')) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  };
};

// 上傳圖片
function uploadImages() {
  let warningDisplay = document.querySelector('.warning');
  let uploadColor = document.querySelector('.upload');

  let URL = window.URL || window.webkitURL;
  let img, file;

  // 限制上傳張數
  if (imgSrc.length >= 3) {
    warningDisplay.style.display = 'block';
    uploadColor.style.color = '#0275D8';
    uploadColor.style.borderColor = '#4A90E2';
    return;
  };

  // 檢查圖片尺寸
  if (file = this.files[0]) {
    img = new Image();
    img.onload = function () {
      var width = this.width;
      var height = this.height;
      if (width <= 150 || height <= 150) {
        warningDisplay.style.display = 'none';
        uploadColor.style.color = '#9B9B9B';
        uploadColor.style.borderColor = '#000000';
        imgSrc.push(URL.createObjectURL(file));
        reviewImages();
      } else {
        img.onerror();
      };
    };
    img.onerror = function () {
      warningDisplay.style.display = 'block';
      uploadColor.style.color = '#0275D8';
      uploadColor.style.borderColor = '#4A90E2';
    }
    img.src = URL.createObjectURL(file);
  };

  this.value = null; // 可上傳同一張圖片
};

// 預覽圖片 & 更新頁面
function reviewImages() {
  let warningDisplay = document.querySelector('.warning');
  let uploadColor = document.querySelector('.upload');
  imagesList.innerHTML = '';
  for (let i = 0; i < imgSrc.length; i++) {
    imagesList.innerHTML += `<li class="img"><img src="${imgSrc[i]}" class="col-4"><a href="" class="delete-btn" data-index="${i}"><i class="far fa-trash-alt" data-index="${i}"></i></a></li>`
  };
  if (imgSrc.length < 3) {
    warningDisplay.style.display = 'none';
    uploadColor.style.color = '#9B9B9B';
    uploadColor.style.borderColor = '#000000';
  }

  if (imgSrc.length == 3) {
    stepThreeBtn.disabled = false;
  } else {
    stepThreeBtn.disabled = true;
  }
};

// 刪除圖片
function deleteImages(e) {
  e.preventDefault();
  if (e.target.nodeName == 'A' || e.target.nodeName == 'I') {
    let index = parseInt(e.target.dataset.index);
    imgSrc.splice(index, 1)
  };
  reviewImages();
};

// 檢查卡號 & 加入空格
function checkCardNumber() {
  let reg = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
  cardNumber.value = cardNumber.value.replace(/(\d{4})(?=\d)/g, "$1 ");

  if (!reg.test(cardNumber.value)) {
    cardNumber.classList.add('is-invalid');
    cardNumber.classList.remove('is-valid');
  } else {
    cardNumber.classList.remove('is-invalid');
    cardNumber.classList.add('is-valid');
  };

  btnFourUsable();
};

// 檢查安全碼
function checkCvv() {
  let reg = /\d{3}/;

  if (!reg.test(cvv.value)) {
    cvv.classList.add('is-invalid');
    cvv.classList.remove('is-valid');
  } else {
    cvv.classList.remove('is-invalid');
    cvv.classList.add('is-valid');
  };

  btnFourUsable();
};

// 運算信用卡到期日
function renderExpireDate() {
  let date = new Date();
  let thisYear = date.getFullYear().toString().slice(2);
  let maxYear = parseInt(thisYear) + 8;
  let minYear = parseInt(thisYear) - 8;
  let minMonth = 1;
  let maxMonth = 12;

  for (let i = minMonth; i <= maxMonth; i++) {
    expireMonth.innerHTML += `<option value="${i}">${i}</option>`;
  };

  for (let i = minYear; i <= maxYear; i++) {
    expireYear.innerHTML += `<option value="${i}">${i}</option>`;
  };
};

// 驗證信用卡到期月是否選取
function checkExpireMonth() {
  if (expireMonth.value != '') {
    expireMonth.classList.add('is-valid');
    expireMonth.classList.remove('is-invalid');
  } else {
    expireMonth.classList.add('is-invalid');
    expireMonth.classList.remove('is-valid');
  };

  btnFourUsable();
};

// 驗證信用卡到期年是否選取
function checkExpireYear() {
  if (expireYear.value != '') {
    expireYear.classList.add('is-valid');
    expireYear.classList.remove('is-invalid');
  } else {
    expireYear.classList.add('is-invalid');
    expireYear.classList.remove('is-valid');
  };

  btnFourUsable();
};

// 檢查form4是否驗證完成
function btnFourUsable() {
  let cardNumberClass = cardNumber.classList;
  let cardholderClass = cardholder.classList;
  let bankClass = bank.classList;
  let cvvClass = cvv.classList;
  let expireMonthClass = expireMonth.classList;
  let expireYearClass = expireYear.classList;

  nextBtn = stepFourBtn;

  if (cardNumberClass.contains('is-valid') && cardholderClass.contains('is-valid') && bankClass.contains('is-valid') && cvvClass.contains('is-valid') && expireMonthClass.contains('is-valid') && expireYearClass.contains('is-valid')) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  };
};

account.addEventListener('keyup', checkEmail, false);
password.addEventListener('keyup', checkPassword, false);
confirmPassword.addEventListener('keyup', checkPasswordConfirm, false);
stepOneBtn.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.step1').style.display = 'none';
  document.querySelector('.step2').style.display = 'block';
  renderYearMonth();
  getDistList();
}, false);

phone.addEventListener('keyup', checkPhone, false);
birthYear.addEventListener('change', renderDate, false);
birthMonth.addEventListener('change', renderDate, false);
city.addEventListener('change', renderDist, false);
dist.addEventListener('change', checkDist, false);
address.addEventListener('keyup', checkString, false);
stepTwoBtn.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.step2').style.display = 'none';
  document.querySelector('.step3').style.display = 'block';
}, false);

upload.addEventListener('change', uploadImages, false);
imagesList.addEventListener('click', deleteImages, false);
stepThreeBtn.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.step3').style.display = 'none';
  document.querySelector('.step4').style.display = 'block';
}, false);

cardNumber.addEventListener('keyup', checkCardNumber, false);
cardholder.addEventListener('keyup', checkString, false);
bank.addEventListener('keyup', checkString, false);
cvv.addEventListener('keyup', checkCvv, false);
renderExpireDate();
expireMonth.addEventListener('change', checkExpireMonth, false);
expireYear.addEventListener('change', checkExpireYear, false);
stepFourBtn.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.step4').style.display = 'none';
  document.querySelector('.step5').style.display = 'block';
}, false);