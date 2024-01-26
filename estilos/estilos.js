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
        width: 200, // Ajusta el ancho según tus necesidades
        height: 200, // Ajusta la altura según tus necesidades
        resizeMode: 'contain', // Ajusta el modo de redimensionamiento según tus necesidades
        margin: 20, // Ajusta el margen inferior según tus necesidades
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
        borderRadius: 10
    },

    errors: {
        color: 'red',
        textAlign: "center"
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