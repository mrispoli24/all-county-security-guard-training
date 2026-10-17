(function() {
    console.log('hello world');
    var navigation = document.querySelector('.navigation');


    document.querySelector('.header__navOpenTrigger').addEventListener('click', function() {
        navigation.classList.add('navigation--open');
    });

    document.querySelector('.navigation__navCloseTrigger').addEventListener('click', function() {
        navigation.classList.remove('navigation--open');
    });
})();
