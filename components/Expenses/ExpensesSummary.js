import { Box, Center, HStack, Heading, useColorMode } from "native-base";
import { RootContext } from "../../store/context/root-context";
import { useContext } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { ExpenseContext } from "../../store/context/expenses-context";

const ExpensesSummary = ({ expensesPeriod }) => {
    const { themeMode} = useContext(RootContext);
    const { expenses } = useContext(ExpenseContext);
    const { colorMode, toggleColorMode } = useColorMode();
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);
    return (
        <HStack p={3} bg={'darkBlue.200'} m={2} mt={4} rounded="2xl" alignItems="center" justifyContent={'space-between'}>
            <Heading fontWeight={'bold'} size="sm">{expensesPeriod}</Heading>
            <Heading fontWeight={'900'} size="lg" alignSelf={'center'} mt={1} alignItems="center">
                <FontAwesome name="dollar" size={24} color={colorMode == 'dark' ? 'white' : 'black'} /> {expensesSum.toFixed(2)}
            </Heading>
        </HStack>
    )
}

export default ExpensesSummary;