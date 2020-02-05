//function generate ramdon id 
const { ID } = require("./ext_functions")

//cache
var localStorage = require('localStorage')

//percieve functions

//global variables
let stimuli = {}
let fact = {}
let buf = ""
exports.read_stimuli = (AKP, item) => {

    AKP.forEach(akp_in_read => {
        if(akp_in_read.is_a.Profile == item){
            akp_in_read.has.F.has.Value.has.PCField.B = Date.now()
        }
    })

    stimuli = {
        "has": item
    } 

}

exports.encode_input_fact = (AKP, item) => {

    fact = {
        ID: ID(),
        typeSMU: "",
        name: item
    }

    AKP.forEach(akp_in_encode => {
        if(akp_in_encode.is_a.Profile == item){
            akp_in_encode.has.F.has.Value.has.PCField.OP = fact
        }
    })

}

exports.save_input_fact_into_ssm = () => {

    buf = Buffer.from(JSON.stringify(fact));

}

exports.copy_input_fact_BCPU = (AKP, item) => {

    localStorage.setItem("BCPU", buf)

}