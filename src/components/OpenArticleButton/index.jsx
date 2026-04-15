import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../constants/colors";

export default function OpenArticleButton ({props}) {
    return(
        <TouchableOpacity style={styles.container} key={props.id}>
            <Text style={styles.textConf}>{props.title}</Text>
            <Text style={styles.textConfB}>{props.author}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.background,
        borderRadius: 8
    },
    textConf: {
        color: colors.text,
        fontWeight: 700,
        fontSize: 22
    },
    textConfB: {
        color: colors.textC,
        fontWeight: 700,
        fontSize: 18
    } 
})