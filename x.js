// did user provide command line arg? try $ node x.js artist_data.json
process.argv[2] ? {} : (() => {console.log('required filename param\nex: $ node x.js artist_data.json');process.exit(0);})()

// remove special characters from string
let remove_special_chars = (str) => {
	let special_characters = '!@#$%^&*(){}[]-_=+~`":;,.<>?\\/'
	let array_of_chars = str.split('')
	let filtered_chars = array_of_chars.filter((character) => {
		if (special_characters.includes(character)) return false
		else return true;
	})
	return filtered_chars.join('')
}

class hack_table {
	constructor() { this.backbone = {} }
	add(e) { this.backbone[e] ? ++this.backbone[e] : this.backbone[e] = 1; }
	sort() {
    let sorting_arr = []
    for (let x in this.backbone) {
      sorting_arr.push([this.backbone[x], x])
    }
    for (let i =  0; i < sorting_arr.length-1;i++) {
      for (let j =  0; j < sorting_arr.length-i-1;j++) {
        if (sorting_arr[j][0] < sorting_arr[j+1][0]) {
          let tmp = sorting_arr[j]
          sorting_arr[j] = sorting_arr[j+1]
          sorting_arr[j+1] = tmp
        }
      }
    }
    return sorting_arr
	}
}

let main = () => {
	let json_data = require(__dirname + '/' + process.argv[2]);
	let text_data = json_data.map((e) => e.text);
	let split_text_data = text_data.map((str) => str.split(' '));
	let ht = new hack_table();
	for (let text_lst in split_text_data) {
		for (let text_node in split_text_data[text_lst]) {
			remove_special_chars((split_text_data[text_lst][text_node].toLowerCase()))
			ht.add(remove_special_chars((split_text_data[text_lst][text_node].toLowerCase())))
		}
	}
	console.log(ht.sort())
}
main()
