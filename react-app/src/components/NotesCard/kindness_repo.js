const kindquotable = {
"1": "Your words here",
"2": "Send something nice",
"3": "Reply your heart out",
"4": "Have something to say?",
"5": "Unleash a compliment",
"6": "Add something wonderful",
"7": "Say your thing",
"8": "Let your words fly out",
"9": "Give it to us",
"10": "Type text here",
"0": "Eh?",
}
let quoties = Object.values(kindquotable)

function newQuote() {
  var randomQuote = Math.floor(Math.random() * quoties.length);
  return kindquotable[randomQuote]
 }

 export default newQuote
