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


pagination.addEventListener('click', ({
    target
}) => {
    const {
        pageAction
    } = target.dataset;
    console.log(pageAction);
    if (pageAction === 'nextPage') {
        if (pageNumber < 7) {
            pageNumber += 1;
            DisplaySymptoms(symptomList, hidedsymplistcontainer, rows, pageNumber);
        } else if (pageNumber === 7) {
            btnResult.classList.remove('disable');
            DisplaySymptoms(symptomList, hidedsymplistcontainer, rows, pageNumber);
        }
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
const symptomList = ["excessive sensitivity to setbacks and rebuffs;", "tendency to bear grudges persistently (i.e.refusal to forgive insults and injuries or slights)",
    "suspiciousness and a pervasive tendency to distort experience by misconstruing the neutral or friendly actions of others as hostile or contemptuous;",
    "a combative and tenacious sense of self-righteousness out of keeping with the actual situation;", "recurrent suspicions, without justification, regarding sexualfidelity of spouse or sexual partner;", "tendency to experience excessive self-aggrandizing, manifest in a persistent self-referential attitude;", "preoccupation with unsubstantiated 'conspiratorial' explanations of events both immediate to the patient and in the world at large."
];

function DisplaySymptoms(List, wrapper, rows_per_page, page) {
    wrapper.innerHTML = null;
    page--;


    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedSymptoms = List.slice(start, end);
    console.log(paginatedSymptoms);
    for (let i = 0; i < paginatedSymptoms.length; i++) {
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
    } else if (checkedList.length = 0) {
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




//show more ღილაკების ფუნქციები. 

const ICD10more = [" Markedly disharmonious attitudes and behavior, generally involving several areas of functioning, e.g. affectivity, arousal, impulse control, ways of perceiving and thinking, and style of relating to others;", "The abnormal behavior pattern is enduring, of long standing, and not limited to episodes of mental illness;",
    "The abnormal behavior pattern is pervasive and clearly maladaptive to a broad range of personal and social situations;",
    "  The above manifestations always appear during childhood or adolescence and continue into adulthood;", " The disorder leads to considerable personal distress but this may only become apparent late in its course;", "The disorder is usually, but not invariably, associated with significant problems in occupational and social performance."
];

const clasterA = [" Cluster A personality disorders are often associated with schizophrenia: in particular, schizotypal personality disorder shares some of its hallmark symptoms with schizophrenia, e.g., acutediscomfort in close relationships, cognitive or perceptual distortions, and eccentricities of behavior. However, people diagnosed  with odd-eccentric personality disorders tend to have a greater grasp  on reality than those with schizophrenia. Patients suffering from  these disorders can be paranoid and have difficulty being understood  by others, as they often have odd or eccentric modes of speaking and  an unwillingness and inability to form and maintain close  relationships. Though their perceptions may be unusual, these  anomalies are distinguished from delusions or hallucinations as people   suffering from these would be diagnosed with other conditions. Significant evidence suggests a small proportion of people with    Cluster A personality disorders, especially schizotypal personality  disorder, have the potential to develop schizophrenia and other      psychotic disorders. These disorders also have a higher probability of   occurring among individuals whose first-degree relatives have either schizophrenia or a Cluster A personality disorder.",
    "Paranoid personality disorder: characterized  by a pattern ofirrational suspicion and mistrust of others, interpreting motivations as malevolent.", "  Schizoid personality disorder: lack of interest  and detachment from social relationships, apathy, and restricted emotional expression.", " Schizotypal personality disorder: pattern of   extreme discomfort interacting socially, and distorted cognition and perceptions.`"
]

const clasterB = ["Antisocial personality disorder: pervasive pattern of disregard for and violation of the rights of others, lack of empathy, bloated self-image, manipulative and impulsive behavior.", " Borderline personality disorder: pervasive pattern of abrupt mood swings, instability in relationships, self-image, identity, behavior and affect, often leading to self-harm and impulsivity.", "Histrionic personality disorder: pervasive pattern of attention-seeking behavior and excessive emotions.", "Narcissistic personality disorder: pervasive pattern of grandiosity, need for admiration, and a perceived or real lack of empathy. In a more severe expression, narcissistic personality disorder may show evidence of paranoia, aggression, psychopathy, and sadistic personality disorder, which is known as malignant narcissism"]

const clasterC = [" Avoidant personality disorder: Avoidant personality disorder:", "Dependent personality disorder: pervasive psychological need to be cared for by other people.", "  Obsessive-compulsive personality disorder: characterized by rigid conformity to rules, perfectionism, and control to the point of satisfaction and exclusion of leisurely activities and friendships (distinct from obsessive-compulsive disorder)."]



//რამოდენიმე showmore ღილაკის მაგენერირებელი ფუნქცია
let showmore = 0; //if-ის შესაქმნელად გამოყენებული დამატებითი ცვლადი, რომელიც დაფარული ტექსტის გამოჩენაში გვეხმარება. ფუნქციაში მისი მნიშვნელობა იცვლება, რაც თავის მხრივ ღილაკის ტექსტს ცვლის და დაფარულს აჩენს ან პირიქით

function show(List, showmoreSelector, showbtnSelector) {
    let section = document.getElementById(showmoreSelector);
    let showBtn = document.getElementById(showbtnSelector);
    section.innerHTML = null;
    if (!showmore) {
        for (let i = 0; i < List.length; i++) {
            section.style.display = 'block';
            showBtn.innerHTML = 'show less';
            let list_element = document.createElement('ul');
            section.appendChild(list_element);

            let li = document.createElement('li');
            li.appendChild(document.createTextNode(List[i]))

            list_element.appendChild(li);
            showmore = 1;  
        };
    } else {
        section.style.display = 'none';
        showBtn.innerHTML = 'show more';
        showmore = 0;   
    };
};

// I btn
const showbtn = document.getElementById('showbtn');
showbtn.addEventListener('click', show.bind(this, ICD10more, 'showmore', 'showbtn'));

// II bnt

let showmore2 = 0;

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

// III btn
const showBtnForA = document.getElementById('showbtnA');
showBtnForA.addEventListener('click', show.bind(this, clasterA, 'A', 'showbtnA'));

// IV btn
const showBtnForB = document.getElementById('showbtnB');
showBtnForB.addEventListener('click', show.bind(this, clasterB, 'B', 'showbtnB'));

// V btn
const showBtnForC = document.getElementById('showbtnC');
showBtnForC.addEventListener('click', show.bind(this, clasterC, 'C', 'showbtnC'));