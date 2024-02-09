import { StatusBar, row } from "react-native";

const styles = {

    inputs: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        borderColor: "#7b4731"
    },

    image: {
        width: 200, 
        height: 200,
        resizeMode: 'contain', 
        margin: 20,
        alignSelf: "center"
    },

    text: {
        textAlign: "center",
        margin: 20,
    },


    titles: {
        padding: 20,
        fontSize: 30,
        textAlign: "center",
        color: "#333333",
    },

    linkableText: {
        color: "#0047b3",
        textAlign: "center",
        textDecorationLine: 'underline'
    },

    estructure: {
        // display: row,
        // justifyContent: "center",
        // alignItems: "center",
        padding: 20
    },

    buttons: {
        color: "#ec5f28",
        borderRadius: 10,
    },

    errors: {
        color: 'white',
        textAlign: "center",
        padding: 20,
        margin: 20, 
        backgroundColor: "red",
        borderRadius: 10,
        fontWeight: "bold"
    }

    // container: {
    //     flex: 1,
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "space-around",
    //     backgroundColor: "lavender",
    //     ...Platform.select({
    //         ios: { paddingTop: 20 },
    //         android: { paddingTop: StatusBar.currentHeight }
    //     })
    //},
};

export default styles;