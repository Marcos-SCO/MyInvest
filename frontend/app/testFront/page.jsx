import FormInput from '../../components/testComp/FormInput'
import FormButton from '../../components/testComp/FormButton'

const testFront = () => {
    return(
        <div className='testForm'>
            <FormInput placeholder="Username"/>
            <FormInput placeholder="E-Mail"/>
            <FormInput placeholder="Password"/>
            <FormInput placeholder="Repeat your Password"/>
            <FormButton placeholder="Cadatrar"/>
        </div>
    )
}

export default testFront;