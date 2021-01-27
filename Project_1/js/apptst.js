//ტესტის ნაწილი: ჩამოთვლილი სიმპტომებიდან ნებისმიერი სამი ან მეტი სიმპტომისთვის ჩექის გაკეთების შემთხვევაში არის მეტი შანსი რომ პიროვნული აშლილობა აღინიშნება

const btnResult = document.querySelector('.btnResult');
const testResultText = document.querySelector('.r');
const btnClear = document.querySelector('.btnClear');
let pagination = document.querySelector('.pagination');
let hidedsymplistcontainer = document.querySelector('.hidedsymplistcontainer');
let symplistcontainer = document.querySelector('.firstSymp');
const prevSymp = document.getElementById('prevSymptom');
const nextSymp = document.getElementById('nextSymptom');
let symnum = document.querySelector('.symnum');


let pageNumber = 0;
let rows = 1;


pagination.addEventListener('click', ({ target }) => {
    const { pageAction } = target.dataset;
    // SetupPagination(symptomList, symnum, rows);
    // PaginationButton(pageNumber, symptomList);
    console.log(pageAction);
    if (pageAction === 'nextPage') {
        if (pageNumber < 7) {
            pageNumber += 1;
           DisplaySymptoms(symptomList, hidedsymplistcontainer, rows, pageNumber); 
        } else if (pageNumber === 7) {
            btnResult.classList.remove('disable'); 
            DisplaySymptoms(symptomList, hidedsymplistcontainer, rows, pageNumber); 
         }  //else if (pageNumber === 1) {
        //       symplistcontainer.classList.remove('disable');
        // };
        symnum.textContent = `${pageNumber} of 7`
        nextSymp.textContent = `${pageNumber} of 7`
    } else if (pageAction === 'prevPage') {
        if (pageNumber > 0) {
            pageNumber -= 1;
            DisplaySymptoms(symptomList, hidedsymplistcontainer, rows, pageNumber); 
        } else if (pageNumber > 7) {
            btnResult.classList.add('disable');
        };
    };
    symnum.textContent = `${pageNumber} of 7`
    nextSymp.textContent = `${pageNumber} of 7`
});


//სიმპტომების მასივი რომლის საფუძველზე ეწყობა HTML ელემენტები
const symptomList = ["excessive sensitivity to setbacks and rebuffs;","tendency to bear grudges persistently (i.e.refusal to forgive insults and injuries or slights)",
     "suspiciousness and a pervasive tendency to distort experience by misconstruing the neutral or friendly actions of others as hostile or contemptuous;",
     "a combative and tenacious sense of self-righteousness out of keeping with the actual situation;", "recurrent suspicions, without justification, regarding sexualfidelity of spouse or sexual partner;", "tendency to experience excessive self-aggrandizing, manifest in a persistent self-referential attitude;", "preoccupation with unsubstantiated 'conspiratorial' explanations of events both immediate to the patient and in the world at large."];

function DisplaySymptoms(List, wrapper, rows_per_page, page) {
    wrapper.innerHTML = null;
    page--;


    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedSymptoms = List.slice(start, end);
    console.log(paginatedSymptoms);
    for (let i = 0; i < paginatedSymptoms.length; i++){
        let list = paginatedSymptoms[i];

        let list_element = document.createElement('div');
        list_element.classList.add('form-check');
        list_element.classList.add('form-switch');
        
        hidedsymplistcontainer.appendChild(list_element);

        let input = document.createElement('input');
        input.classList.add('form-check-input');
        input.classList.add('parsym');
        input.type = 'checkbox';
        input.id = 'flexSwitchCheckChecked';

        list_element.appendChild(input);

        let label = document.createElement('label');
        label.classList.add('form-check-label');
        label.htmlFor = 'flexSwitchCheckChecked';
        label.textContent = `${paginatedSymptoms}`
         list_element.appendChild(label);
    }
};

  
//ტესტის შედეგის გამომყვანი ფუნქცია
btnResult.addEventListener('click', () => {
  let checkedList = document.querySelectorAll('input[type="checkbox"]:checked'); // ჩექ ინფუთების რიცხვი    
    prevSymp.classList.add('disable');
    nextSymp.classList.add('disable');
    const parsymp = document.getElementById('checkSymptoms');
    btnClear.classList.remove('disable');
    btnResult.classList.add('disable');
       if (checkedList.length <= 3) {
           testResultText.textContent = 'Your answers suggest that there is Little or No indication that you are experiencing symptoms common among people with paranoid personality disorder. However, this quiz is no substitute for a proper diagnosis from a health care professional ';
           const testImg = document.getElementById('tstimage');
           testImg.classList.toggle("disable");
           parsymp.classList.toggle('wipd');
       } else if (checkedList.length > 3) {
           testResultText.textContent = 'we would encourage you to schedule an appointment with your doctor or other mental health professional ';
           const testImg2 = document.getElementById('tstimage2');
           testImg2.classList.toggle("disable");
           parsymp.classList.toggle('wipd');
       } else if (checkedList.length = 0){
           testResultText.textContent = 'none of simptoms are checked';
    };
});


//შედეგის გასუფთავება და საწყისი ლეიაუთის დაბრუნება
btnClear.addEventListener('click', () => {
    const parsym = document.querySelectorAll('.parsym');
    // parsym[0].checked = false; //-----------ინფუთების ანჩექი
    // parsym[1].checked = false;
    // parsym[2].checked = false;
    // parsym[3].checked = false;
    // parsym[4].checked = false;
    // parsym[5].checked = false;
    // parsym[6].checked = false;
    const parsymp = document.getElementById('checkSymptoms');
    btnClear.classList.add('disable');
    btnResult.classList.remove('disable');
     
    testResultText.textContent = null;
    const testImg = document.getElementById('tstimage');
    testImg.classList.add("disable");
    parsymp.classList.add('wipd');
    prevSymp.classList.remove('disable');
    nextSymp.classList.remove('disable');
    const testImg2 = document.getElementById('tstimage2');
    testImg2.classList.add("disable");
});




//show more ღილაკების ფუნქციები. ასოებით შექმნილი ცვლადები show more ღილაკისთვის განკუთვნილი დამატება იყო რომლის ცვლილებაც განსაზღვრული პირობის დროს სასურველი შედეგის მიღებაში მეხმარებოდა.



let showmore = 0; //if-ის შესაქმნელად გამოყენებული დამატებითი ცვლადი, რომელიც დაფარული ტექსტის გამოჩენაში გვეხმარება. ფუნქციაში მისი მნიშვნელობა იცვლება, რაც თავის მხრივ ღილაკის ტექსტს ცვლის და დაფარულს აჩენს ან პირიქით
function show() {
    if (!showmore) {
        document.getElementById('showmore').style.display = 'block';
        document.getElementById('showbtn').innerHTML = 'show less';
        showmore = 1;
    } else {
        document.getElementById('showmore').style.display = 'none';
        document.getElementById('showbtn').innerHTML = 'show more';
        showmore = 0;
    };
};

const showbtn = document.getElementById('showbtn'); 

showbtn.addEventListener('click', show);

let showmore2 = 0;//if-ის შესაქმნელად გამოყენებული დამატებითი ცვლადი, რომელიც დაფარული ტექსტის გამოჩენაში გვეხმარება. ფუნქციაში მისი მნიშვნელობა იცვლება, რაც თავის მხრივ ღილაკის ტექსტს ცვლის და დაფარულს აჩენს ან პირიქით
function showDSM5() {
    if (!showmore2) {
        document.getElementById('DSM-5showmore').style.display = 'block';
        document.getElementById('DSM-5showbtn').innerHTML = 'show less';
        showmore2 = 1;
    } else {
        document.getElementById('DSM-5showmore').style.display = 'none';
        document.getElementById('DSM-5showbtn').innerHTML = 'show more';
        showmore2 = 0;
    };
};

const DSM5showbtn = document.getElementById('DSM-5showbtn'); 

DSM5showbtn.addEventListener('click', showDSM5);



let showmore3 = 0;//if-ის შესაქმნელად გამოყენებული დამატებითი ცვლადი, რომელიც დაფარული ტექსტის გამოჩენაში გვეხმარება. ფუნქციაში მისი მნიშვნელობა იცვლება, რაც თავის მხრივ ღილაკის ტექსტს ცვლის და დაფარულს აჩენს ან პირიქით

function showA() {
    if (!showmore3) {
        document.getElementById('A').style.display = 'block';
        document.getElementById('showbtnA').innerHTML = 'show less';
        showmore3 = 1;
    } else {
        document.getElementById('A').style.display = 'none';
        document.getElementById('showbtnA').innerHTML = 'show more';
        showmore3 = 0;
    };
};


const showBtnForA = document.getElementById('showbtnA'); 

showBtnForA.addEventListener('click', showA);


let showmore4 = 0;//if-ის შესაქმნელად გამოყენებული დამატებითი ცვლადი, რომელიც დაფარული ტექსტის გამოჩენაში გვეხმარება. ფუნქციაში მისი მნიშვნელობა იცვლება, რაც თავის მხრივ ღილაკის ტექსტს ცვლის და დაფარულს აჩენს ან პირიქით
function showB() {
    if (!showmore4) {
        document.getElementById('B').style.display = 'block';
        document.getElementById('showbtnB').innerHTML = 'show less';
        showmore4 = 1;
    } else {
        document.getElementById('B').style.display = 'none';
        document.getElementById('showbtnB').innerHTML = 'show more';
        showmore4 = 0;
    };
};

const showBtnForB = document.getElementById('showbtnB'); 

showBtnForB.addEventListener('click', showB);



let showmore5 = 0;//if-ის შესაქმნელად გამოყენებული დამატებითი ცვლადი, რომელიც დაფარული ტექსტის გამოჩენაში გვეხმარება. ფუნქციაში მისი მნიშვნელობა იცვლება, რაც თავის მხრივ ღილაკის ტექსტს ცვლის და დაფარულს აჩენს ან პირიქით

function showC() {
    if (!showmore5) {
        document.getElementById('C').style.display = 'block';
        document.getElementById('showbtnC').innerHTML = 'show less';
        showmore5 = 1;
    } else {
        document.getElementById('C').style.display = 'none';
        document.getElementById('showbtnC').innerHTML = 'show more';
        showmore5 = 0;
    };
};



const showBtnForC = document.getElementById('showbtnC'); 

showBtnForC.addEventListener('click', showC);

