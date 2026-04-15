// Wait for the full DOM to load before running any code
$(function() {

    // Initialize the display with starting pet values
    updatePetInfoInHtml();

    // Bind click events to each button
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton); // New button
});

// Pet info object with keys: name, weight, happiness, and energy (new stat)
var pet_info = {
    name: "Biscuit",
    weight: 20,
    happiness: 5,
    energy: 10
};

// Arrays of pet comments for each action - a random one is picked on each press
var treatComments = [
    "Yum! That was delicious!",
    "More treats please!",
    "My favorite snack!",
    "So tasty, 10/10!"
];
var playComments = [
    "That was so fun!",
    "Let's play again!",
    "Woohoo! Best day ever!",
    "I love playing with you!"
];
var exerciseComments = [
    "I'm so tired...",
    "Ugh, that was rough.",
    "Can we rest now?",
    "My paws are killing me..."
];
var napComments = [
    "Zzz... so comfy!",
    "That was a great nap!",
    "I feel so refreshed!",
    "Sweet dreams... wait, I'm awake!"
];

// Swaps the pet image src directly
function setPetImage(src) {
    $('.pet-image').attr('src', src);
}

// Treat: increases happiness (+3) and weight (+2)
function clickedTreatButton() {
    pet_info.happiness += 3;
    pet_info.weight += 2;
    showNotification(getRandomComment(treatComments), '#e17055');
    setPetImage('images/treat.png');
    bouncePet();
    checkAndUpdatePetInfoInHtml();
}

// Play: increases happiness (+4), decreases weight (-1) and energy (-2)
function clickedPlayButton() {
    pet_info.happiness += 4;
    pet_info.weight -= 1;
    pet_info.energy -= 2;
    showNotification(getRandomComment(playComments), '#00b894');
    setPetImage('images/playing.png');
    bouncePet();
    checkAndUpdatePetInfoInHtml();
}

// Exercise: decreases happiness (-2), weight (-3), and energy (-3)
function clickedExerciseButton() {
    pet_info.happiness -= 2;
    pet_info.weight -= 3;
    pet_info.energy -= 3;
    showNotification(getRandomComment(exerciseComments), '#0984e3');
    setPetImage('images/exercise.png');
    bouncePet();
    checkAndUpdatePetInfoInHtml();
}

// Nap (new button): restores energy (+5), boosts happiness (+2)
function clickedNapButton() {
    pet_info.energy += 5;
    pet_info.happiness += 2;
    showNotification(getRandomComment(napComments), '#817ae7');
    setPetImage('images/napping.png');
    checkAndUpdatePetInfoInHtml();
}

// Returns a random comment string from the given array (Floor = round, Random = 0 - 1)
function getRandomComment(commentsArray) {
    var index = Math.floor(Math.random() * commentsArray.length);
    return commentsArray[index];
}

function checkAndUpdatePetInfoInHtml() {
    checkWeightAndHappinessBeforeUpdating();
    updatePetInfoInHtml();
}

// Conditional guards: prevents weight, happiness, and energy from dropping below zero
function checkWeightAndHappinessBeforeUpdating() {
    if (pet_info.weight < 0) pet_info.weight = 0;
    if (pet_info.happiness < 0) pet_info.happiness = 0;
    if (pet_info.energy < 0) pet_info.energy = 0;
    if (pet_info.energy > 10) pet_info.energy = 10;
 
}

// Updates the HTML spans with the current pet_info values
function updatePetInfoInHtml() {
    $('.name').text(pet_info.name);
    $('.weight').text(pet_info.weight);
    $('.happiness').text(pet_info.happiness);
    $('.energy').text(pet_info.energy);
    secretFunc()

}

// Shows a visual speech-bubble notification with a comment from the pet.
function showNotification(message, color) {
    var $notification = $('.notification');
    $notification.text('"' + message + '"');

    /*
     * jQuery Unique Method #1: .css()
     * .css(property, value) directly gets or sets a CSS style property on matched elements.
     * Here it dynamically changes the notification border color to match the action taken,
     * giving a visual color cue (orange = treat, green = play, blue = exercise, purple = nap).
     */
    $notification.css('border-color', color);

    // - .stop(true, true) — stops any currently running animation on the notification element.
    $notification.stop(true, true).show();
    setTimeout(function() {
        $notification.fadeOut(700);
    }, 2500);
}

// Creates a bounce effect on the pet image using a CSS keyframe animation
function bouncePet() {
    var $pet = $('.pet-image');

    /*
     * jQuery Unique Method #2: .toggleClass()
     * .toggleClass(className) adds the class if the element doesn't have it,
     * and removes it if the element already has it.
     * Here it adds the 'bouncing' class to trigger a CSS keyframe animation on the
     * pet image, then removes it after 300ms so the animation can be triggered again
     * on the next button press.
     */
    $pet.toggleClass('bouncing');
    setTimeout(function() {
        $pet.toggleClass('bouncing');
    }, 300);
}








function secretFunc() {
if (pet_info.weight > 100) {
        setPetImage('images/fat.png');
    }

}