const validationMessages = {
    emptyInput: "Enter a To-Do or Enter a Date.",
    pastDate: "The Date You Select Cannot Be Earlier Than Today's Date.",
    invalidFormat: "Input must consist of two words separated by a space."
};

const validate = {
    checkEmpty: function(inputValue) {
        return inputValue.trim() === "";
    },
    checkPastDate: function(selectedDate, todayDate) {
        return selectedDate < todayDate;
    },
    checkFormat: function(inputValue) {
        const regex = /^\w+\s\w+$/;
        return !regex.test(inputValue);
    }
};

export { validationMessages, validate };