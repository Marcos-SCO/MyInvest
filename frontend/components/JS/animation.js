// // animation.js
// const toggleAnimation = () => {
//     const FormPage = document.getElementById('slide1');

//     if (FormPage.classList.contains('slide1')) {
//         FormPage.classList.remove('slide1');
//         FormPage.classList.add('slide2');
//         console.log("Slide 2 ativado");
//     } else {
//         FormPage.classList.remove('slide2');
//         FormPage.classList.add('slide1');
//         console.log("Slide 1 ativado");
//     }
// };

// export default toggleAnimation;


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