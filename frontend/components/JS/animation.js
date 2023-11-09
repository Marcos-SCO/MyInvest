const toggleAnimation = (value)=>{
    const FormPage = document.getElementById('slide1');
    
    if(value === 0){
        FormPage.classList.remove('slide1');
        FormPage.classList.add('slide2');
    } else if(value === 1){
        FormPage.classList.remove('slide2');
        FormPage.classList.add('slide1');
    };
};

export default toggleAnimation;