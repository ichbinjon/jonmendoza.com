function getSpanFor(char,y) {
    return y.filter(y => y.innerHTML === `${char}<!----><!---->`)
}
const delay = (delayInms) => {
return new Promise(resolve => setTimeout(resolve, delayInms));
};
const typePassword = async () => {
for ( let ch of "B!gbaddog9292") {
    let x = document.getElementsByClassName("mat-button-wrapper")
    let y = [...x];
    let shiftKey = y[y.length -3];
    let lowerCaseRegex = /^[a-z0-9]+$/;
    let isLowerCase = lowerCaseRegex.test(ch);

    if (isLowerCase) {
        console.log("isLowerCase", isLowerCase)
        getSpanFor(ch,y)[0].click();
    } else {
        console.log("hitting shift key");
        shiftKey.click();
        await delay(500);
        console.log("trying to find key ", ch);
        let key = getSpanFor(ch,y)[0]
        console.log(key);
        key.click();
    }
    await delay(500);
    }
};
typePassword();

