

export async function emailSender(params:{sender:string,secretCode:string, email:string, url:string}){

    const {sender, secretCode, email, url} = params;
    var data = {
        service_id: 'service_lw4asfu',
        template_id: 'template_w40qxj9',
        user_id: '8PRSCPiNFnlqGodvd',
        template_params: {
            'from_name': sender,
            'message': `Open the url:${'https://cvitas-2d83e.firebaseapp.com' + url} and insert the code:${secretCode}`,
            'user_email' : email

        }
    };
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Request-Headers", "*");
    myHeaders.append("Access-Control-Request-Method", "*");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);



    fetch("https://api.emailjs.com/api/v1.0/email/send",{
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })
    .then(response => response.text())
    .then(result => alert(' The mail has been sent'))
    .catch(error => console.log('error', error));
}