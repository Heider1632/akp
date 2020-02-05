//function generate ramdon id 
const { ID } = require("./ext_functions")

const fs = require("fs")

const path = require("path")

let functions = require("./percieve")

exports.view = async (req, res) => {
	res.render('index', { trace_akp })
}

exports.akp = (req, res) => {

	let word = req.body.word;
	let data = {}
	let AKP = []
	let AKP_Field = {}
	let precondition = {}
	let PCField = {}
	let priority = [ "Hight", "Medium", "Low" ]

	let words = []

	if(word.length > 15){

		words = word.split(" ")

		words.map((item, index) => {

			async function Percieve(){

				PCField = {
					id: ID(),
					B: 0,
					E: 0,
					IP: item,
					OP: {},
					C: priority[Math.floor(Math.random()*priority.length)],
					S: "Activo"
				}
	
				precondition = {
					"is a": {
						type: "AKP_Field",
					
					},
					"has": {
						PCField
					}
	
				}
	
				AKP_Field = {
					"is a": {
						type: "Field"
					},
					"has": {
						"Name": item,
						"Value": precondition,
						"preconditions": [
							"pre_read_stimuli", "pre_encodeSMU", "pre_saveSMUtoSSM", "pre_copySMUtoBCPUInput"
						],
						"postconditions": [
							"post_read_stimuli", "post_encodeSMU", "post_saveSMUtoSSM", "post_copySMUtoBCPUInput"
						],
						"Y": [
							"new_stimuli_is_detected", "input_is_read_from_sensor", "input_fact_is_encode", "input_fact_is_saved_into_SSM", "input_fact_is_copied_into_BCPU_input", "input_is_perceive"
						]
					}
				}
	
				AKP.unshift({
					"is_a": {
						"Profile": item
					},
					"has": {
						"F" : AKP_Field
					},
					A: []
				})

				functions.read_stimuli(AKP, item);
				functions.encode_input_fact(AKP, item);
				functions.save_input_fact_into_ssm();
				functions.copy_input_fact_BCPU(AKP, item);


			}

			Percieve()

			AKP.map(item => {

				item.has.F.has.Value.has.PCField.E = Date.now()

			})
		})

		data = AKP

		fs.exists('akp.json', function(exists){
			if(exists){
				console.log("yes file exists");
				fs.readFile('akp.json', function readFileCallback(err, data){
				if (err){
					console.log(err);
				} else {
				obj = JSON.parse(data); 
				var json = JSON.stringify({obj }, null, 4); 
				fs.writeFile('akp.json', json, function(err, result) {
					if(err) console.log('error', err);
				  }); 
				}});
			} else {
				console.log("file not exists")
				var json = JSON.stringify({ data}, null, 4);
				fs.writeFile('akp.json', json, function(err, result) {
					if(err) console.log('error', err);
				});
			}
		});

		res.render('index', { AKP })
	} else {
		
		PCField = {
			id: ID(),
			B: 0,
			E: 0,
			IP: word,
			OP: {},
			C: priority[Math.floor(Math.random()*priority.length)],
			S: "Activo"
		}

		precondition = {
			"is a": {
				type: "AKP_Field",
			
			},
			"has": {
				PCField
			}

		}

		AKP_Field = {
			"is a": {
				type: "Field"
			},
			"has": {
				"Name": word,
				"Value": precondition,
				"preconditions": [
					"1", "2", "3", "4"
				],
				"postconditions": [
					"1", "2", "3", "4"
				]
			}
		}

		AKP.push({
			"is_a": {
				"Profile": word
			},
			"has": {
				"F" : AKP_Field
			},
			A: []
		})

		async function Percieve(){
			let read_stimuli = await functions.read_stimuli(AKP, word);
			let encode_input_fact = await functions.encode_input_fact(word);
			let save_input_fact_into_ssm = await functions.save_input_fact_into_ssm(word);
			let copy_input_fact_BCPU = await functions.copy_input_fact_BCPU(AKP, word);

		}

		Percieve()

		AKP.forEach(finish => {
			finish.has.F.has.Value.has.PCField.E = Date.now()
		})
		

		res.render('index', { AKP })
	}



}