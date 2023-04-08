const generateWallet = async (large) => {
    const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
                        "K", "L", "M", "P", "Q", "R", "S", "T", "U", "W", 
                        "X", "Z", "0", "1", "2", "3", "4", "5", "6", "7", 
                        "8", "9"] //no existen la V,O,Ñ,N,Y para evitar confuciones
    const wallet = []

    for (var i = 0; i < large; i++) {
        let randomCharacter = Math.floor(Math.random() * 32)
        wallet.push(characters[randomCharacter])
        console.log(wallet)
    }

    const stringWallet = wallet.join("")

    return stringWallet
}
export default generateWallet
