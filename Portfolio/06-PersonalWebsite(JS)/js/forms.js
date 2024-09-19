cont = 0

$("button").click((e) => {
    var data = []
    var bandera = true
    var inputs = $("input")
    var tam = inputs.length

    for(var i = 0; i<tam; i++){
        if(inputs[i].value == ""){
            bandera = false
        }
        data.push(inputs[i].value)
    }

    for(var i = 0; i<tam; i++){
        inputs[i].value = ""
    }

    var selectOption = $("select")
    data.push(selectOption.val())
    if (selectOption.val() == ""){
        bandera = false
    } 
    selectOption.val("")

    var textArea = $("#notes")
    data.push(textArea.val())
    if (textArea.val() == ""){
        bandera = false
    } 
    textArea.val("")

    if(bandera){
        var tableBody = $("tbody")
        tableBody.append(" <tr id='"+cont+"'></tr>")
    
        var tableRow = $("#"+cont)
        data.forEach((element) =>{
            tableRow.append("<td>"+element+"</td>")
        })
        
        $("#warning").text("")
        cont++
    }
    else{
        $("#warning").text("Please fill all the information")
    }
})