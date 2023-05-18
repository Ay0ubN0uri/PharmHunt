import { Center, FlatList, Text } from "native-base";
import ExpenseItem from "./ExpenseItem";


const ExpensesList = ({ expenses }) => {
    const renderExpenseItem = (itemData) => {
        const item = itemData.item;
        const exspenseProps = {
            description: item.description,
            date: item.date,
            amount: item.amount,
        }
        return <ExpenseItem {...exspenseProps} />
    }
    return (
        <FlatList data={expenses} keyExtractor={(item) => item.id} renderItem={renderExpenseItem} />
    )
}
export default ExpensesList;