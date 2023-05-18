import { Center, Heading, Spinner } from "native-base";

const LoadingSpinner = () => {
    return (
        <Center flex={1} >
            <Spinner color={'darkBlue.300'} size={'lg'}/>
            <Heading size={'md'} mt={2}>
                Please Wait...
            </Heading>
        </Center>
    )
}

export default LoadingSpinner;