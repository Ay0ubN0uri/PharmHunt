import { Box } from "native-base";
import ExpensesSummary from "./ExpensesSummary";
import { useContext } from "react";
import { RootContext } from "../../store/context/root-context";
import ExpensesList from "./ExpensesList";
import { ExpenseContext } from "../../store/context/expenses-context";


const ExpensesOutput = ({ expensesPeriod,expenses }) => {
    const { themeMode } = useContext(RootContext);

    return (
        // <Box bg={themeMode.current.bgColor} flex={1}>
        <>
            <ExpensesSummary expensesPeriod={expensesPeriod} />
            <ExpensesList expenses={expenses} />
        </>
        // </Box>
    )
}

export default ExpensesOutput;