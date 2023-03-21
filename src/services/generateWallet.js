const generateWallet = async () => {
    const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
                        "k", "l", "m", "p", "q", "r", "s", "t", "u", "w", 
                        "x", "z", "0", "1", "2", "3", "4", "5", "6", "7", 
                        "8", "9"]
    let wallet = []

    for (var i = 0; i < 7; i++) {
        let randomCharacter = Math.floor(Math.random() * 32)
        wallet.push(characters[randomCharacter])
        console.log(wallet)
    }

    let stringWallet = wallet.join("")

    return stringWallet
}
export default generateWallet
