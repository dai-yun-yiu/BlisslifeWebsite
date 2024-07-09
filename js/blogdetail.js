// Functionality for changing fontsize in event detail page
// Codes Reference: https://www.tutorialspoint.com/How-to-change-the-font-size-of-a-text-using-JavaScript
// Codes Reference: https://www.w3schools.com/jsref/prop_style_fontsize.asp
// Support from ChatGPT(https://chat.openai.com/)
    // Explaination: Initaiily I used Style fontSize Property guideline from w3school to change the fontsize, but I found that some font-size worked but some didn't. 
                    // So I asked ChatGPT and found that 'style.fontSize' can not directly access to css file, and it suggest to use 'getComputedStyle' to caculate font size in browser. 

const h1titles = document.querySelectorAll('.h1title');
const paragraphElements = document.querySelectorAll('.paragraph');


// Get default text fontsize
const orih1FontSize = parseFloat(window.getComputedStyle(h1titles[0]).fontSize);
const oripFontSize = parseFloat(window.getComputedStyle(paragraphElements[0]).fontSize);



// // Medium Text Button - Default
const mediumButton = document.getElementById('mediumbutton');
mediumButton.addEventListener('click', function() {
    h1titles.forEach(element => {
        element.style.fontSize = `${orih1FontSize}px`;
    });
    
    paragraphElements.forEach(element => {
        element.style.fontSize = `${oripFontSize}px`;
    });
   
});


// // Small Text Button 
const smallButton = document.getElementById('smallbutton');
smallButton.addEventListener('click', function() {
    // change fontsize: default size * 0.9
    const increasedh1FontSize = orih1FontSize * 0.9;
    const increasedpFontSize = oripFontSize * 0.9;

    h1titles.forEach(element => {
        element.style.fontSize = `${increasedh1FontSize}px`;
    });

    paragraphElements.forEach(element => {
        element.style.fontSize = `${increasedpFontSize}px`;
    });
});


//Large Text Button 
const largeButton = document.getElementById('largebutton');
largeButton.addEventListener('click', function() {
    // change fontsize: default size * 1.2
    const increasedh1FontSize = orih1FontSize * 1.2;
    const increasedpFontSize = oripFontSize * 1.2;

    
    h1titles.forEach(element => {
        element.style.fontSize = `${increasedh1FontSize}px`;
    });
    
    paragraphElements.forEach(element => {
        element.style.fontSize = `${increasedpFontSize}px`;
    });
    
});
