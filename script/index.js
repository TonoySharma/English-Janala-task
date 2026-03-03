const loadLessons = ()=> {
fetch("https://openapi.programming-hero.com/api/levels/all")
.then(res => res.json())
.then(json => displayLesson(json.data));
};

const loadLevelWord = (id)=>{ 
 const url =`https://openapi.programming-hero.com/api/level/${id}`
 fetch(url)
 .then(res => res.json())
 .then(data=>displayLevelWord(data.data));
}
 const displayLevelWord =(words) =>{
 const wordContainer = document.getElementById("word-container");
 wordContainer.innerHTML ="";
 words.forEach(word => {
    console.log(word);
 const card = document.createElement("div"); 
 card.innerHTML = `
  <div class="bg-white rounded-xl shadow-sm text-center py-10 p-5 space-y-4">
     <h1 class="font-bold text-2xl">${word.word}</h1>
     <p class="font-semibold">Meaning /Pronounciation</p>
     <p class="font-bangla font-semibold text-2xl">"${word.meaning}/ ${word.pronunciation}"</p>
     <div class="flex justify-between items-center">
      <button class="bg-sky-100 p-2 cursor-pointer px-3 rounded hover:bg-blue-300 border border-gray-200">
        <i class="fa-solid fa-circle-info"></i></button>
      <button class="bg-sky-100 p-2 cursor-pointer px-3  rounded hover:bg-blue-300 border border-gray-200">
        <i class="fa-solid fa-volume-high"></i></button>
     </div>
  </div>
 `;
 wordContainer.append(card);
 });

}
const displayLesson = (lessons) => {
//   1.  get the container & empty
 const levelContainer = document.getElementById("level-container");
 levelContainer.innerHTML = "";

//   2. get into every lessons
for (let lesson of lessons){
    // 3. create element
    console.log(lessons)
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    // 4. append into container
    levelContainer.append(btnDiv);
  }
};
  loadLessons();