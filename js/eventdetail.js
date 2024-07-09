// Functionality for changing fontsize in event detail page
// Codes Reference: https://www.tutorialspoint.com/How-to-change-the-font-size-of-a-text-using-JavaScript
// Codes Reference: https://www.w3schools.com/jsref/prop_style_fontsize.asp
// Support from ChatGPT(https://chat.openai.com/)
    // Explaination: Initaiily I used Style fontSize Property guideline from w3school to change the fontsize, but I found that some font-size worked but some didn't. 
                    // So I asked ChatGPT and found that 'style.fontSize' can not directly access to css file, and it suggest to use 'getComputedStyle' to caculate font size in browser. 
                    // I type:I want to use style.fontSize to change the fontsize, but I found that some font-size worked but some didn't.
                    // ChatGPT: If you want to change the font size using the `style.fontSize` property and you are experiencing issues where some font sizes work while others don't, there might be a specific unit or format issue causing the problem. Here are a few things to check:
                        // ### 1. **Unit Type:**
                        // Make sure you specify the unit when setting the font size using `style.fontSize`. For example, use `'px'` for pixels or `'em'` for relative units. For instance:
                        // javascript
                        // element.style.fontSize = '16px'; // sets font size to 16 pixels
                        // element.style.fontSize = '1.2em'; // sets font size to 1.2 times the parent element's font size
                        // ### 2. **String Format:**
                        // Ensure that the font size value is provided as a string, not as a number. For example, use `'16px'` instead of `16`.
                        // ### 3. **Parent Element's Font Size:**
                        // Remember that relative units like `'em'` are relative to the font size of the parent element. If you're using relative units, make sure the parent element's font size is appropriately set.
                        // ### 4. **CSS Specificity:**
                        // CSS rules in an external stylesheet might have higher specificity than inline styles set through JavaScript. Ensure that there are no conflicting styles being applied from external stylesheets.
                        // ### 5. **Inspecting Elements:**
                        // Use browser developer tools to inspect the elements after your JavaScript code runs. Check the computed styles to see if the font size is being applied as expected.
                        // ### 6. **Parsing Values:**
                        // Ensure that you are correctly parsing values if they are coming from external sources. For example, use `parseInt` or `parseFloat` to extract numeric values from strings if necessary.
                        // If you're still experiencing issues after checking these points, please provide more specific details about the problem you're facing, such as the code snippet that's causing trouble, and I'll be happy to assist you further.

const h1titles = document.querySelectorAll('.h1title');
const h2titles = document.querySelectorAll('.h2title');
const h3titles = document.querySelectorAll('.h3title');
const paragraphElements = document.querySelectorAll('.paragraph');
const bookElements = document.querySelectorAll('.book-button');

// Get default text fontsize
const orih1FontSize = parseFloat(window.getComputedStyle(h1titles[0]).fontSize);
const orih2FontSize = parseFloat(window.getComputedStyle(h2titles[0]).fontSize);
const orih3FontSize = parseFloat(window.getComputedStyle(h3titles[0]).fontSize);
const oripFontSize = parseFloat(window.getComputedStyle(paragraphElements[0]).fontSize);
const oribookFontSize = parseFloat(window.getComputedStyle(bookElements [0]).fontSize);


// // Medium Text Button - Default
const mediumButton = document.getElementById('mediumbutton');
mediumButton.addEventListener('click', function() {
    h1titles.forEach(element => {
        element.style.fontSize = `${orih1FontSize}px`;
    });
    h2titles.forEach(element => {
        element.style.fontSize = `${orih2FontSize}px`;
    });
    h3titles.forEach(element => {
        element.style.fontSize = `${orih3FontSize}px`;
    });
    paragraphElements.forEach(element => {
        element.style.fontSize = `${oripFontSize}px`;
    });
    bookElements.forEach(element => {
        element.style.fontSize = `${oribookFontSize}px`;
    });
});


// // Small Text Button 
const smallButton = document.getElementById('smallbutton');
smallButton.addEventListener('click', function() {
    // change fontsize: default size * 0.8
    const increasedh1FontSize = orih1FontSize * 0.9;
    const increasedh2FontSize = orih2FontSize * 0.9;
    const increasedh3FontSize = orih3FontSize * 0.9;
    const increasedpFontSize = oripFontSize * 0.9;
    const increasedbookFontSize = oribookFontSize * 0.9;

    h1titles.forEach(element => {
        element.style.fontSize = `${increasedh1FontSize}px`;
    });
    h2titles.forEach(element => {
        element.style.fontSize = `${increasedh2FontSize}px`;
    });
    h3titles.forEach(element => {
        element.style.fontSize = `${increasedh3FontSize}px`;
    });
    paragraphElements.forEach(element => {
        element.style.fontSize = `${increasedpFontSize}px`;
    });
    bookElements.forEach(element => {
        element.style.fontSize = `${increasedbookFontSize}px`;
    });
});

//Large Text Button 
const largeButton = document.getElementById('largebutton');
largeButton.addEventListener('click', function() {
    // change fontsize: default size * 1.2
    const increasedh1FontSize = orih1FontSize * 1.2;
    const increasedh2FontSize = orih2FontSize * 1.2;
    const increasedh3FontSize = orih3FontSize * 1.2;
    const increasedpFontSize = oripFontSize * 1.2;
    const increasedbookFontSize = oribookFontSize * 1.2;

    
    h1titles.forEach(element => {
        element.style.fontSize = `${increasedh1FontSize}px`;
    });
    h2titles.forEach(element => {
        element.style.fontSize = `${increasedh2FontSize}px`;
    });
    h3titles.forEach(element => {
        element.style.fontSize = `${increasedh3FontSize}px`;
    });
    paragraphElements.forEach(element => {
        element.style.fontSize = `${increasedpFontSize}px`;
    });
    bookElements.forEach(element => {
        element.style.fontSize = `${increasedbookFontSize}px`;
    });
});
