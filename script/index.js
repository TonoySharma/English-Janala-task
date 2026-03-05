 const createElements = (arr)=>{
 const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
 return htmlElements.join(" ");
}
const manageSpinner = (status)=>{
  if(status == true){
   document.getElementById("spinner").classList.remove("hidden");
   document.getElementById("word-container").classList.add("hidden");
  }else{
   document.getElementById("word-container").classList.remove("hidden");
   document.getElementById("spinner").classList.add("hidden");
  }
}
// speker sectuon
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}



const loadLessons = () => {
fetch("https://openapi.programming-hero.com/api/levels/all")
.then(res => res.json())
.then(json => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons);
  lessonButtons.forEach ((btn) => btn.classList.remove("active"));

}

const loadLevelWord = (id) => { 
const wordContainer = document.getElementById("word-container");
 wordContainer.innerHTML =`
 <section id="spinner" class="col-span-3 flex justify-center items-center py-10">
    <span class="loading loading-dots loading-xl"></span>
  </section>
  `;
 const url =`https://openapi.programming-hero.com/api/level/${id}`
 fetch(url)
 .then(res => res.json())
 .then(data=>{
  removeActive(); 
  const clickBtn = document.getElementById(`lesson-btn-${id}`)
  // console.log(clickBtn);
  clickBtn.classList.add("active");
  displayLevelWord(data.data)
  });
}

const loadWordDetail = async(id) => {
  // manageSpinner(true);
  const url =`https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
}
const displayWordDetails = (word) =>{
const detailsBox = document.getElementById("details-container");
detailsBox.innerHTML=`
      <div>
        <h2 class="text-2xl font-bold font-bangla">${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
      </div>
       
      <div>
        <h2 class="font-semibold">Meaning</h2>
        <p class=" font-bangla font-semibold">${word.meaning}</p>
      </div>
      
       <div>
        <h2 class="font-semibold">Example</h2>
        <p class=" ">${word.sentence}</p>
       </div>

      <div class="">
      <h2 class="font-semibold">synonym</h2>
       <div class="">${createElements(word.synonyms)}</div>
      </div>
  `;
  document.getElementById("details_modal").showModal();
}

const displayLevelWord = (words) =>{
 const wordContainer = document.getElementById("word-container");
 wordContainer.innerHTML ="";

 if (words.length == 0){
 wordContainer.innerHTML =`
    <div class="col-span-full text-center py-10">
      <img class="mx-auto mb-4" src="./assets/alert-error.png" alt="">
      <p class="font-bangla text-[#79716B] mb-6 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h1 class="font-bangla font-bold text-4xl">নেক্সট Leasson এ যান</h1>
    </div>
 `;
 return;

}
words.forEach (word => {
    // console.log(word);
 const card = document.createElement("div"); 
 card.innerHTML = `
  <div class="bg-white rounded-xl shadow-sm text-center py-10 p-5 space-y-4">
     <h1 class="font-bold text-2xl">${word.word ? word.word:"শব্দ পাওয়া যায় নি"}</h1>
     <p class="font-semibold">Meaning /Pronounciation</p>
     <p class="font-bangla font-semibold text-2xl">"${word.meaning ? word.meaning:"অর্থ পাওয়া যায় নি"}/
      ${word.pronunciation ? word.pronunciation :"pronunciation পাওয়া যায় নি"}"</p>
     <div class="flex justify-between items-center">

      <button onclick="loadWordDetail(${word.id})" class="bg-sky-100 p-2 cursor-pointer px-3 rounded hover:bg-blue-300 border
       border-gray-200"><i class="fa-solid fa-circle-info"></i></button>

      <button onclick="pronounceWord('${word.word}')" class="bg-sky-100 p-2 cursor-pointer px-3 rounded hover:bg-blue-300 border border-gray-200">
        <i class="fa-solid fa-volume-high"></i></button>
     </div>
  </div>
 `;
 wordContainer.append(card);
 });
 manageSpinner(false);
}
const displayLesson = (lessons) => {
//   1.  get the container & empty
 const levelContainer = document.getElementById("level-container");
 levelContainer.innerHTML = "";

//   2. get into every lessons
for (let lesson of lessons){
    // 3. create element
    // console.log(lessons)
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}"  onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    // 4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();

document.getElementById("btn-search").addEventListener("click" , () =>{
  const input = document.getElementById("input-search");
  const searchValue = input.value;
//  console.log(searchValue)

 fetch("https://openapi.programming-hero.com/api/words/all")
 .then((res) => res.json())
 .then((data)=>{
   const allWords = data.data;
  //  console.log(allWords);
   const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));

   displayLevelWord(filterWords);
 });

});