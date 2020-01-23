import VK from 'vk-io';
let vk = new VK({
    token: process.env.vk_botapi
})
const ngrok = require('ngrok');
const axios = require("axios");
(async () => {
    console.info("getting localtunnel");
    const url = await ngrok.connect(5000);
    console.info('localtunnel ready on '+url);
    let resT = await axios.get("https://api.telegram.org/bot"+process.env.botapi+"/setWebhook?url="+url+'/webhook');
    console.info(resT.data);
    let vk_callback = await vk.api.groups.editCallbackServer({
        server_id: 1,
        group_id: 145874230,
        url: url+'/webhook_vk',
        title: "Сервер 1"
    });
    console.log(vk_callback);
        // let vk_callback = await vk.api.groups.editCallbackServer({
    //     group_id: 145874230,
    //
    // })
    console.log('started');
    // setInterval(async ()=>{
    //     await (axios.get(url).catch(()=>{}));
    // },2000);
})().catch((e)=>{
    console.error(e);
    throw e;
});