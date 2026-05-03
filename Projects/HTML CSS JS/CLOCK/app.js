const hourEl= document.querySelector(".hour");
const minuteEl= document.querySelector(".minutes");
const secondEl= document.querySelector(".seconds");
function updateClock(){
    const currentDate= new Date();
    setTimeout(updateClock, 1000);
const hour = currentDate.getHours();    
const minutes = currentDate.getMinutes();    
const seconds = currentDate.getSeconds();    
const hourDeg= (hour/12)* 360;
hourEl.style.transform= `rotate(${hourDeg}deg)`;
const minuteDeg= (minutes/60)* 360;
minuteEl.style.transform= `rotate(${minuteDeg}deg)`;
const secondDeg= (seconds/60)* 360;
secondEl.style.transform= `rotate(${secondDeg}deg)`;
    
}
updateClock();
