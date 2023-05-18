import { Button, FormControl, Input, InputGroup, InputLeftAddon, InputRightAddon, Modal, Pressable, Text, TextArea, useColorMode, useToast } from 'native-base';
import { useContext, useRef, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { getFormattedDate } from '../../utils/date';
import { Fontisto } from '@expo/vector-icons';
import { ExpenseContext } from '../../store/context/expenses-context';
import CustomToast from '../core/CustomToast';
import { fetchExpenses, storeExpense } from '../../utils/http';
import axios from 'axios';

const AddExpenseModal = ({ showModal, onCloseModal }) => {
    const initialRef = useRef(null);
    const toast = useToast();
    const { colorMode } = useColorMode();
    const { addExpense } = useContext(ExpenseContext);
    const [formData, setData] = useState({
        description: '',
        amount: '',
        date: new Date()
    });
    const [errors, setErrors] = useState({});
    const validate = () => {
        setErrors({});
        // if (formData.description === undefined) {
        if (formData.description === '') {
            setErrors({
                // ...errors,
                description: 'Description is required'
            });
            return false;
        } else if (formData.description.length < 3) {
            setErrors({
                // ...errors,
                description: 'Description is too short'
            });
            return false;
        }
        if (formData.amount === '') {
            setErrors({
                // ...errors,
                amount: 'Amount is required'
            });
            return false;
        } else if (isNaN(formData.amount) || parseFloat(formData.amount) < 0) {
            setErrors({
                // ...errors,
                amount: 'Amount is invalid'
            });
            return false;
        }

        return true;
    };
    const onSubmit = async () => {
        // console.log(await fetchExpenses());
        console.log(formData);
        console.log(errors);
        if (validate()) {
            console.log('Submitted')
            const id = storeExpense(formData);
            addExpense({ ...formData, id });
            setErrors({});
            onCloseModal();
            toast.show({
                render: () => <CustomToast message="Expense Added!" />
            })
        }
        else {
            console.log('Validation Failed')
        }
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setData(formData => {
            return {
                ...formData,
                date: currentDate
            }
        });
    };

    return (
        <Modal
            isOpen={showModal}
            onClose={() => {
                setErrors({});
                setData({
                    description: '',
                    amount: '',
                    date: new Date()
                });
                onCloseModal();
            }}
            size={'lg'}
            avoidKeyboard
            initialFocusRef={initialRef}
            _backdrop={{
                _dark: {
                    bg: "coolGray.800"
                },
                bg: "warmGray.50"
            }}
        >
            <Modal.Content >
                <Modal.CloseButton />
                <Modal.Header >Add Expense</Modal.Header>
                <Modal.Body>
                    <FormControl isRequired isInvalid={'description' in errors}>
                        <FormControl.Label _dark={{
                            _text: {
                                color: 'white'
                            }
                        }}
                            _light={{
                                _text: {
                                    color: 'black'
                                }
                            }} >Description</FormControl.Label>
                        <TextArea ref={initialRef} _dark={{
                            placeholderTextColor: 'warmGray.400'
                        }} placeholder="Expense's Description" onChangeText={value => setData({
                            ...formData,
                            description: value
                        })} />
                        {/* <Input ref={initialRef} _dark={{
                            placeholderTextColor: 'warmGray.400'
                        }} placeholder="Expense's Description" onChangeText={value => setData({
                            ...formData,
                            description: value
                        })} /> */}
                        {'description' in errors ?
                            <FormControl.ErrorMessage
                                leftIcon={<Entypo name="warning" size={16} color='red' />}
                                fontWeight={'bold'}>
                                {errors.description}
                            </FormControl.ErrorMessage> :
                            <FormControl.HelperText>
                                Name should contain atleast 3 character.
                            </FormControl.HelperText>}
                    </FormControl>

                    <FormControl isRequired isInvalid={'amount' in errors}>
                        <FormControl.Label _dark={{
                            _text: {
                                color: 'white'
                            }
                        }}
                            _light={{
                                _text: {
                                    color: 'black'
                                }
                            }} >Amount</FormControl.Label>
                        <Input _dark={{
                            placeholderTextColor: 'warmGray.400'
                        }} placeholder="Expense's amount" onChangeText={value => setData({
                            ...formData,
                            amount: parseFloat(value)
                        })} />
                        {'amount' in errors ?
                            <FormControl.ErrorMessage
                                leftIcon={<Entypo name="warning" size={16} color='red' />}
                                fontWeight={'bold'}>
                                {errors.amount}
                            </FormControl.ErrorMessage> :
                            <FormControl.HelperText>
                                Amount should be greater then 0.
                            </FormControl.HelperText>}
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label _dark={{
                            _text: {
                                color: 'white'
                            }
                        }}
                            _light={{
                                _text: {
                                    color: 'black'
                                }
                            }} >Date</FormControl.Label>
                        <Pressable onPress={e => {
                            DateTimePickerAndroid.open({
                                value: formData.date,
                                onChange,
                                mode: 'date',
                                is24Hour: true,
                            });
                        }}>
                            <InputGroup>
                                <InputLeftAddon children={<Fontisto name="date" size={24} color={colorMode === 'dark' ? 'white' : 'black'} />} />
                                <Input isReadOnly flex={1} placeholder="nativebase" value={getFormattedDate(formData.date)} />
                            </InputGroup>
                        </Pressable>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setErrors({});
                            setData({
                                description: '',
                                amount: '',
                                date: new Date()
                            });
                            onCloseModal();
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={onSubmit}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}

export default AddExpenseModal;