 function ochistka() {
    document.querySelector('input[name="FUO"]').value = '';
     document.querySelector('input[name="mail"]').value = '';
      document.querySelector('input[name="telofon"]').value = '';
      document.querySelector('input[name="job"]').value = '';
      document.querySelector('input[name="departamet"]').value = '';

      document.querySelectorAll('input[name="dostup"]').forEach(radio => {
  radio.checked = false;
});
      document.querySelectorAll('input[name="prioritet"]').forEach(radio => {
  radio.checked = false;
});
      document.querySelectorAll('input[name="srok"]').forEach(radio => {
  radio.checked = false;
});

 document.querySelector('input[name="data"]').value = '';

 document.querySelector('input[name="goals"]').value = '';
      document.querySelector('input[name="komm"]').value = '';

    // очистить каждое поле
 };
// формируем из полей формы обьект 
    // получить массив заявок из локалсторэич 
    //добавить 
  function otpravka(e) {
    e.preventDefault()
    console.log('uhgjgj')
    const zaivka = {
        FUO: document.querySelector('input[name="FUO"]').value,
        mail: document.querySelector('input[name="mail"]').value,
        telofon: document.querySelector('input[name="telofon"]').value,
        job: document.querySelector('input[name="job"]').value,
        departamet: document.querySelector('input[name="departamet"]').value,

        dostup: document.querySelector('input[name="dostup"]:checked')?.value || '',
        prioritet: document.querySelector('input[name="prioritet"]:checked')?.value || '',
        srok: document.querySelector('input[name="srok"]:checked')?.value || '',

        data: document.querySelector('input[name="data"]').value,
        goals: document.querySelector('input[name="goals"]').value,
        komm: document.querySelector('input[name="komm"]').value
    };

    let zaivki = JSON.parse(localStorage.getItem('zaivki'));
    if (!Array.isArray(zaivki)) { zaivki = []; }
    zaivki.push(zaivka);
    localStorage.setItem('zaivki', JSON.stringify(zaivki));
    window.location.href = '..\\zaivki_tabl\\index.html';
}
// console.log('dostup:', document.querySelector('input[name="dostup"]:checked'));
// console.log('prioritet:', document.querySelector('input[name="prioritet"]:checked'));
// console.log('srok:', document.querySelector('input[name="srok"]:checked'));