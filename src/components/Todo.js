import { Text } from 'react-native';
const Todo = ({onPress, completed, text}) => {
    <Text onPress={onPress} style={{textDecortion:completed?"line-through":"none"}}></Text>
};