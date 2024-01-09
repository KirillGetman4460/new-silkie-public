const getCurrentDate = (monthCurrent:number) => {
    const currentMonth = new Date().getMonth() + 1;
  
    if (currentMonth === monthCurrent) {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString();
      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    } else if (monthCurrent >= 1 && monthCurrent <= 12) {
      const currentDate = new Date(new Date().getFullYear(), monthCurrent - 1, 1);
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString();
      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }
  
    // Вернуть что-то, если monthCurrent не соответствует ожидаемому диапазону
    return 'Неверный месяц';
};

export default getCurrentDate