import { Text } from 'react-native';
const Link = ({active,children,onPress}) => {
    if (active) {
        return <Text>{children}</Text>
    }
    return (
        <Text onPress={()=>onPress()}></Text>
    );
}