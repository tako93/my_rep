let i = 0;
function show() {
    if (!i) {
        document.getElementById('showmore').style.display = 'block';
        document.getElementById('showbtn').innerHTML = 'show less';
        i = 1;
    } else {
        document.getElementById('showmore').style.display = 'none';
        document.getElementById('showbtn').innerHTML = 'show more';
        i = 0;
    };
};

const showbtn = document.getElementById('showbtn'); 

showbtn.addEventListener('click', show);

let j = 0;
function showDSM5() {
    if (!j) {
        document.getElementById('DSM-5showmore').style.display = 'block';
        document.getElementById('DSM-5showbtn').innerHTML = 'show less';
        j = 1;
    } else {
        document.getElementById('DSM-5showmore').style.display = 'none';
        document.getElementById('DSM-5showbtn').innerHTML = 'show more';
        j = 0;
    };
};

const DSM5showbtn = document.getElementById('DSM-5showbtn'); 

DSM5showbtn.addEventListener('click', showDSM5);



let w = 0;

function showA() {
    if (!w) {
        document.getElementById('A').style.display = 'block';
        document.getElementById('showbtnA').innerHTML = 'show less';
        w = 1;
    } else {
        document.getElementById('A').style.display = 'none';
        document.getElementById('showbtnA').innerHTML = 'show more';
        w = 0;
    };
};


const A = document.getElementById('showbtnA'); 

A.addEventListener('click', showA);


let q = 0;

function showB() {
    if (!q) {
        document.getElementById('B').style.display = 'block';
        document.getElementById('showbtnB').innerHTML = 'show less';
        q = 1;
    } else {
        document.getElementById('B').style.display = 'none';
        document.getElementById('showbtnB').innerHTML = 'show more';
        q = 0;
    };
};

const B = document.getElementById('showbtnB'); 

B.addEventListener('click', showB);



let z = 0;

function showC() {
    if (!z) {
        document.getElementById('C').style.display = 'block';
        document.getElementById('showbtnC').innerHTML = 'show less';
        z = 1;
    } else {
        document.getElementById('C').style.display = 'none';
        document.getElementById('showbtnC').innerHTML = 'show more';
        z = 0;
    };
};

const C = document.getElementById('showbtnC'); 

C.addEventListener('click', showC);


//ჩამოთვლილი სიმპტომებიდან ნებისმიერი სამი ან მეტი სიმპტომისთვის ჩექის გაკეთების შემთხვევაში არის მეტი შანსი რომ პიროვნული აშლილობა აღინიშნება

const btnResult = document.querySelector('.btnResult');
const r = document.querySelector('.r');

const btnClear = document.querySelector('.btnClear');




btnResult.addEventListener('click', () => {
  let checkedList = document.querySelectorAll('input[type="checkbox"]:checked'); // ჩექ ინფუთების რიცხვი    
    const parsymp = document.getElementById('checkSymptoms');
    btnClear.classList.remove('disable');
    btnResult.classList.add('disable');
       if (checkedList.length <= 3) {
           r.textContent = 'Your answers suggest that there is Little or No indication that you are experiencing symptoms common among people with paranoid personality disorder. However, this quiz is no substitute for a proper diagnosis from a health care professional ';
           const testImg = document.getElementById('tstimage');
           testImg.classList.toggle("disable");
           parsymp.classList.toggle('wipd');
       } else if (checkedList.length > 3) {
           r.textContent = 'we would encourage you to schedule an appointment with your doctor or other mental health professional ';
           const testImg2 = document.getElementById('tstimage2');
           testImg2.classList.toggle("disable");
           parsymp.classList.toggle('wipd');
       } else if (checkedList.length = 0){
           r.textContent = 'none of simptoms are checked';
    };
});


//შედეგის გასუფთავება და საწყისი ლეიაუთის დაბრუნება
btnClear.addEventListener('click', () => {
    const parsym = document.querySelectorAll('.parsym');
    parsym[0].checked = false; //-----------ინფუთების ანჩექი
    parsym[1].checked = false;
    parsym[2].checked = false;
    parsym[3].checked = false;
    parsym[4].checked = false;
    parsym[5].checked = false;
    parsym[6].checked = false;
    const parsymp = document.getElementById('checkSymptoms');
    btnClear.classList.add('disable');
    btnResult.classList.remove('disable');
     
    r.textContent = null;
    const testImg = document.getElementById('tstimage');
    testImg.classList.add("disable");
    parsymp.classList.add('wipd');
    const testImg2 = document.getElementById('tstimage2');
    testImg2.classList.add("disable");
});

