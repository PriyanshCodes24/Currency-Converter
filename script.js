let baseUrl="https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";
const btn=document.querySelector("form button");
const dropdowns=document.querySelectorAll(".dropdown select");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const arrows=document.querySelector("#arrows");

for(let select of dropdowns){
    for(curr in currencyCodes){
        let newOpt=document.createElement("option");
        newOpt.innerText=curr;
        newOpt.value=curr;
        if(select.name === "from" && curr==="US"){
            newOpt.selected="selected";
        }
        else if(select.name === "to" && curr==="IN"){
            newOpt.selected="selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let country=element.value;
    let flag=`https://flagsapi.com/${country}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=flag;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal=="" || amtVal<1){
        amtVal=1;
        amount.value=1;
    }
    console.log(amtVal);
    const URL=`${baseUrl}/${currencyCodes[tocurr.value]}_${currencyCodes[fromcurr.value]}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data.rate;
    let final=amtVal*rate;
    msg.innerText=`${amtVal} ${currencyCodes[fromcurr.value]} = ${final} ${currencyCodes[tocurr.value]}`;
    msg.classList.add("msgs");
    
});

arrows.addEventListener("click",()=>{
    let flag1=`https://flagsapi.com/${fromcurr.value}/flat/64.png`;
    let flag2=`https://flagsapi.com/${tocurr.value}/flat/64.png`;
    tocurr.parentElement.querySelector("img").src=flag1;
    fromcurr.parentElement.querySelector("img").src=flag2;
    let temp=fromcurr.value;
    fromcurr.value=tocurr.value;
    tocurr.value=temp;
    console.log("btn clicked");
});