const validationMessages = {
    emptyInput: "Enter a To-Do or Enter a Date.",
    pastDate: "The Date You Select Cannot Be Earlier Than Today's Date.",
};

const validate = {
    checkEmpty: function(inputValue) {
        return inputValue.trim() === "";
    },
    checkPastDate: function(selectedDate, todayDate) {
        return selectedDate < todayDate;
    },
};

export { validationMessages, validate };