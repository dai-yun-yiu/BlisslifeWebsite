// I acknowledge the use of ChatGPT (https://chat.openai.com/) to generate functionality (line 253) and debug coding (line 321).
    // The prompts used and the response from ChatGPT are included in Appendix in the following seciton of this javascript (line 253 and 321).
    // The detail description refers to line 253 and 321.



// slideshow banner, references https://www.w3schools.com/howto/howto_js_slideshow.asp
let slideIndex = 0;
let timeoutId; 
showSlide();

function showSlide() {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  // clear previous timer, or it will change next slide faster // setTimeout, clearTimeout problems reference: https://stackoverflow.com/questions/3015319/settimeout-cleartimeout-problems 
  clearTimeout(timeoutId);
  // reset new timer
  timeoutId = setTimeout(showSlide, 4000);
}

// When a user click dot/use Tab
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        slideIndex = index; 
        showSlide(); // present corresponding slide when clicking the dot
    });

    dot.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            slideIndex = index;
            showSlide();
        }
    });
});




// fetch eventd from Community API
// References:
    // Rendering Cards Automatically Refers from: Dynamically Rendering Card (https://www.youtube.com/watch?v=qLyeIU8iSfI&ab_channel=IanWilson)
    // Render Pagination Refers from: Fetch REST API and Pagination in javascript (https://www.youtube.com/watch?v=xqWeLRZFg10&ab_channel=VickyTechnical)
// Ｃards Data API
const CardContainer = document.getElementById('CardContainer');
const filterDropdown = document.getElementById('event-type');
const paginationContainer = document.getElementById('pagination-buttons');
const ItemsPerPage = 16; // 16 cards in a page
let CurrentPage = 1; // Current Page Number
let data = []; // save all cards
const baseURL = 'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community_events/';

fetch(baseURL)
    .then(response => response.json())
    .then(apiData => {
        data = apiData; // save a number of cards to data list
        renderCards(data); 
        renderPagination(data.length); 
    })
    .catch(error => {
        console.error('Error Fetch', error);
    });

    // When a user click filter dropdown, then rerender page(cards) and pagination

    filterDropdown.addEventListener('change', () => {
        const selectedEventType = filterDropdown.value;
        const filteredData = filterEventsByType(selectedEventType, data); 
        renderCards(filteredData);
        renderPagination(filteredData.length); // render pagination 
    });

    // If click 'All' in dropdown component, then display all card (whole data)
    // otherwise, to filter by event.type
    function filterEventsByType(eventType, data) {
        if (eventType === 'All') {
            return data;
        } else {
            return data.filter(event => event.event_type === eventType);
        }
    }


    function renderCards(data) {
        CardContainer.innerHTML = ''; 
        const startIndex = (CurrentPage - 1) * ItemsPerPage; //  which data needs to be displayed on the current page
        const endIndex = startIndex + ItemsPerPage; // endIndex represents the ending index.
        const visibleItems = data.slice(startIndex, endIndex);
    
        let cardCount = 0; // Rerendered cards count
    
        visibleItems.forEach((event) => {
            if (cardCount % 8 === 0 && cardCount > 0) {
                // 8 cards to insert a img
                const roundedImageContainer = document.createElement('div');
                roundedImageContainer.className = 'rounded-image-container';
                const roundedImage = document.createElement('img');
                roundedImage.src = 'media/event-people laughing.jpg'; // Media Reference: https://unsplash.com/photos/nF8xhLMmg0c
                roundedImage.alt = 'Banner about people are happy';
                roundedImageContainer.appendChild(roundedImage);
                CardContainer.appendChild(roundedImageContainer);
            }
    
            const card = createCard(event);
            CardContainer.appendChild(card);
    
            cardCount++; // Add rerendered cards
        });
    }

    function renderPagination(totalItems) {
        paginationContainer.innerHTML = ''; // Clear Container
    
        const totalPages = Math.ceil(totalItems / ItemsPerPage);// calculates the total number of pages
        const prevButton = document.createElement('span');
        prevButton.className = 'page';
        prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        
        paginationContainer.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => {
                CurrentPage = i;
                renderCards(data); // Rerender
            });
            paginationContainer.appendChild(button);
        }

        const nextButton = document.createElement('span');
        nextButton.className = 'page';
        nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
       
        paginationContainer.appendChild(nextButton);
    }

    function createCard(event) {
        const card = document.createElement('div');
        card.className = 'card';
        card.tabIndex = 0; 
        
        // Card's Img Container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        const image = document.createElement('img');

        if (event.photo === null) {
            image.src = 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&q=80&w=2740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; 
            // Media reference: https://unsplash.com/photos/three-persons-standing-front-of-field-S5DEUg2yUVU 
        } else {
            image.src = event.photo; 
        }

        image.alt = event.description;
        imageContainer.appendChild(image);
    
        // Event's Title Container
        const titleContainer = document.createElement('div');
        titleContainer.setAttribute('aria-labelledby', 'Event-title-' + event.name);
        titleContainer.className = 'title-container';
        const title = document.createElement('h3');
        title.textContent = event.name; 
        title.setAttribute('id', 'Event-title-' + event.name);
        titleContainer.appendChild(title);
    
        // Even't Detail Container
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'details-container';
        detailsContainer.setAttribute('aria-label', "Event Details");
    
        const location = document.createElement('p');
        location.textContent = 'Location: ' + event.location; 
        detailsContainer.appendChild(location);
        
        // Event Date-Time Change Format
        const apiDate = new Date(event.date_time);
        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const formattedDateTime = new Intl.DateTimeFormat('en-AU', options).format(apiDate);
        const time = document.createElement('p');
        time.textContent = 'Time: ' + formattedDateTime; 
        detailsContainer.appendChild(time);
        
        // Event Type
        const type = document.createElement('p');
        type.textContent = 'Event Type: ' + event.event_type; 
        detailsContainer.appendChild(type);

        // Add clickable arrow
        const arrowContainer = document.createElement('div');
        arrowContainer.className = 'arrow-container';
        
        // Arrow icon
        const arrowIcon = document.createElement('i');
        // Icon reference: https://fontawesome.com/icons/arrow-right?f=classic
        arrowIcon.className = 'fas fa-arrow-right'; 
        arrowContainer.appendChild(arrowIcon);
        const arrowContainers = document.querySelectorAll('.arrow-container');

        // Arrow Tab - Enter 
        arrowContainers.forEach(arrowContainer => {
            arrowContainer.tabIndex = 0; 
            arrowContainer.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    arrowContainer.click();
                }
            });
        });

        // Arrow Click
        arrowContainer.addEventListener('click', () => {
            console.log('Arrow click');
        });

        //click any point at card container, then to the same page - event detail
        //Card Tab - Enter
        card.addEventListener('click', (event) => {
            if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
                window.location.href = 'eventdetail.html';
            }
        });

        // Append Container to Card
        card.appendChild(imageContainer);
        card.appendChild(titleContainer);
        card.appendChild(detailsContainer);
        card.appendChild(arrowContainer);
        
        return card;
    }


// Add Event Function     
// pop up modal window reference: W3school How To Create a Modal Box:  https://www.w3schools.com/howto/howto_css_modals.asp 
// I acknowledge the use of ChatGPT (https://chat.openai.com/) to generate functionality and debug coding.
    // The prompts used and the response from ChatGPT are included in Appendix in the following seciton of this javascript.
    // The output from these prompts was the function that when I swipe the popup window, the content page behind the modal form should not be slide . 
    // This was used to ask the how to improve the functionality and user experience. 

// Me: Javascript. when I swipe the popup window, the content page behind the modal form should not be slide.
        // addButton.addEventListener('click', () => { modalContainer.style.display = 'flex'; // 或者 'block'});
        // closeButton.addEventListener('click', () => {modalContainer.style.display = 'none';});
        // cancelButton.addEventListener('click', () => {modalContainer.style.display = 'none';});
        // modalContainer.addEventListener('click', (event) => {if (event.target === modalContainer) { modalContainer.style.display = 'none';}});
        // form submit logic // const modalForm = document.getElementById('modal-form');modalForm.addEventListener('submit', (event) => {
           // event.preventDefault();modalContainer.style.display = 'none';});
// ChatGPT prompt: 
        // Method 1: Use Css
           // You can set the overflow property of the body to hidden when opening the modal box to prevent page scrolling:
           // Display Modal
              //addButton.addEventListener('click', () => {
                // modalContainer.style.display = 'flex'; 
                // document.body.style.overflow = 'hidden'; );
            // Close Modal
                // cancelButton.addEventListener('click', () => {
                // modalContainer.style.display = 'none';
                // document.body.style.overflow = 'auto'; // allow page scrolled});
                // modalContainer.addEventListener('click', (event) => {
                   // if (event.target === modalContainer) {
                   // modalContainer.style.display = 'none';
                    // document.body.style.overflow = 'auto'; }});
            // This code disables page scrolling when the modal box is open and restores page scrolling when the modal box is closed.
        // Method 2: Use Javascript
            // By listening for modal box scroll events and preventing events from propagating, you can prevent modal box scroll from affecting page scroll. This method is usually used when the modal box content is long and requires scrolling.
            // modalContainer.addEventListener('scroll', function(event) {
               // event.stopPropagation();});
            // The above code will prevent the mode box's scroll event from propagating to the parent element, preventing the scroll from being passed to the page behind it.
        // Please choose the right method according to your needs. If you encounter any problems or need further help, please feel free to let me know!


const addButton = document.querySelector('.add-button');
const modalContainer = document.querySelector('.popup-modal-container');
const cancelButton = document.querySelector('.cancel-button');

// display
addButton.addEventListener('click', () => {
    modalContainer.style.display = 'flex'; 
    document.body.style.overflow = 'hidden';
});

// close form - 1. click outside form 2. click 'cancel' button
// reference: https://developer.mozilla.org/zh-TW/docs/Web/API/Event/target 
cancelButton.addEventListener('click', closeModal);
modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        closeModal();
    }
});

function closeModal() {
    modalContainer.style.display = 'none'; // disappear form
    document.body.style.overflow = 'auto'; // allow page scroll
}



// Popup Modal of Form - Post API
const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    // Verifiy Input
    const name = document.getElementById('name').value; 
    const location = document.getElementById('location').value; 
    const organiser = document.getElementById('organiser').value; 
    const eventType = document.getElementById('event_type').value; 
    const description = document.getElementById('description').value; 
    // const dateTime = document.getElementById('date_time').value; 
    const dateTimeInput = document.getElementById('date_time').value;
    const selectedDateTime = new Date(dateTimeInput);

    // time changer -> reference: chatgpt debugging because I use the html type="datetime-local" which needs to be the API time-date format yyyymmddhhmmss
    // Debug by ChatGPT(https://chat.openai.com/)
            // The output from these prompts was for debugging can not fetching date&time data.
            // This was used to ask how to find the reason and fix the problem.
            // Because I use the html form type="datetime-local" and found its default format is different from API post, I use ChatGPT to help me fix this problem.
            
            // Me: appears this "date_time": ["Datetime has wrong format. Use one of these formats instead: YYYY-MM-DD hh:mm."]
            // ChatGPT prompt: 
                // This error indicates that the API endpoint expects to receive a date_time field in an incorrect format. The error message mentions that the correct date-time format should be YYYY-MM-DD hh:mm.
                // In your front-end code, the value of the date_time field should be a string, which should follow the date-time format required by the API endpoint. You can use the Date object in JavaScript to format the date time.
                // Before submitting an API request, you need to format the date and time selected by the user into the format expected by the API. For example:
                // const dateTimeInput = document.getElementById('date_time');
                // const selectedDateTime = new Date(dateTimeInput.value);
                // const formattedDateTime = `${selectedDateTime.getFullYear()}-${String(selectedDateTime.getMonth() + 1).padStart(2, '0')}-${String(selectedDateTime.getDate()).padStart(2, '0')} ${String(selectedDateTime.getHours()).padStart(2, '0')}:${String(selectedDateTime.getMinutes()).padStart(2, '0')}`;
                // formData.append('date_time', formattedDateTime);
                // This code formats the user-selected date and time in the format YYYY-MM-DD hh:mm and then adds it to the formData. Make sure to use this formatted date-time in the API request. This should solve the problem of API return errors.

    const formattedDateTime = `${selectedDateTime.getFullYear()}-${String(selectedDateTime.getMonth() + 1).padStart(2, '0')}-${String(selectedDateTime.getDate()).padStart(2, '0')} ${String(selectedDateTime.getHours()).padStart(2, '0')}:${String(selectedDateTime.getMinutes()).padStart(2, '0')}`;
    const websiteCode = document.getElementById('website_code').value;

    
    const fileInput = document.getElementById('photo');
    let uploadedFile = null;
    if (fileInput.files.length > 0) {
        uploadedFile = fileInput.files[0];
        if (uploadedFile.size > 10 * 1024 * 1024) { 
            alert('The file is too large, photo files must be 10MB or less in size');
            return;
        }
    }

    // Data Preparation
    var formData = new FormData();
    formData.append('name', name); 
    formData.append('location', location); 
    formData.append('organiser', organiser); 
    formData.append('event_type', eventType); 
    formData.append('description', description); 
    formData.append('date_time', formattedDateTime);
    formData.append('website_code', websiteCode);
    if (uploadedFile) {
        formData.append('photo', uploadedFile);
    }


    const baseURL = 'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community_events/';
    const requestOptions = {
        method: 'POST', 
        body: formData, 
        redirect: 'follow'
    }

    fetch(baseURL, requestOptions) 
        .then(response => {
            if (response.status === 201)  {
                return response.json(); 
            } else {
                return Promise.reject(response);
            }
            
        })
        .then(result => {
            console.log(result); 
            closeModal();
        })
        .catch(error => {
            console.error('Error:', error);
            
});



// Click Pagination, then automatically to the top of new page
const paginationButton = document.getElementById('pagination-buttons');
const main = document.getElementById('main');

paginationButton.addEventListener('click', function() {
    main.scrollIntoView({ behavior: 'auto', block: 'start' });
});

});
