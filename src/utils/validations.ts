// @ts-nocheck
export function formatPhoneNumber(input) {
    const cleaned = input.replace(/\D/g, "").slice(0, 11);
    let formatted = "+";
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 1) {
        formatted += " " + cleaned[i];
      } else if (i === 4 || i === 7 || i === 9) {
        formatted += " " + cleaned[i];
      } else {
        formatted += cleaned[i];
      }
    }
  
    return formatted;
  }
  
  export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  export function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\+\d \d{3} \d{3} \d{2} \d{2}$/;
  
    return phoneRegex.test(phoneNumber);
  }
  
  
  export function formatDateString(inputDate) {
  
    let cleanedInput = inputDate.replace(/[^\d]/g, '');
  
  
    let formattedDate = '';
    if (cleanedInput.length > 0) {
        formattedDate += cleanedInput.substr(0, 2);
    }
    if (cleanedInput.length > 2) {
        formattedDate += '.' + cleanedInput.substr(2, 2);
    }
    if (cleanedInput.length > 4) {
        formattedDate += '.' + cleanedInput.substr(4, 4);
    }
  
    return formattedDate;
  }
  
  
  export function validateDate(inputDate) {
  
    var cleanedInput = inputDate.replace(/[^\d]/g, '');
  
    // Перевірити довжину введеного рядка
    if (cleanedInput.length !== 8) {
        return false;
    }
  
    // Отримати компоненти дати
    var day = parseInt(cleanedInput.substr(0, 2), 10);
    var month = parseInt(cleanedInput.substr(2, 2), 10);
    var year = parseInt(cleanedInput.substr(4, 4), 10);
  
  
    var inputDateObj = new Date(year, month - 1, day);
    var currentDate = new Date();
  
    if (isNaN(inputDateObj.getTime()) || inputDateObj < currentDate) {
        return  false;
    } else if (day > 31 || month > 12) {
        return false;
    } else {
        return true; // Дата валідна
    }
  }
  
  
  export function isThreeDaysPassed(inputDate) {
  
    const currentDate = new Date();
    const inputDateTime = new Date(inputDate);
  
   const timeDifference = currentDate - inputDateTime;
  
   
    const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;
  
    
    if (timeDifference >= threeDaysInMillis) {
    
      return { isPassed: true, daysLeft: 0 };
    } else {
  
      const daysLeft = Math.ceil((threeDaysInMillis - timeDifference) / (24 * 60 * 60 * 1000));
  
      return { isPassed: false, daysLeft };
    }
  }