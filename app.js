const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const qs = require('qs');
const botToken = '6552612518:AAFOEO3OPklIganMVTccZuGTBEWZPbDxCuQ';
const cheerio = require('cheerio');
const bot = new TelegramBot(botToken, {polling: true});
const axios = require('axios');
let token = "remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6IjdYclVocVN3dFN0Y1M4Y3JXNlIxcHc9PSIsInZhbHVlIjoid0dWY3EyRlRPZzM3NzVtNVlFYlJHVDYrb205V1hIcFJFNGh1Rm9Ndi9GbEF2R3c1NmFZZ1l1QVV4M1JzS0RmaUlSRk5TcUpuck9rN0FiaDJ5NEV2cVdQNVNoK1NoeVRnTTY5ZnFhaXB1bVBGaUpRMUtscTN5MldFUHRNYStWT1BQYmJZRnp2YkRjNTJnbzRjNmVzYk92WldmdWxTbVBocmJ5ZWNIL1ZwQnFxSXdyUUVYTElPSHNFNTh1ZEZ2MnVlUzVaOHA3TmtaZDlmTGNaZjg3UEx1ejhEZ3hFNWVsT1phdWZYMjNOQ0JjRT0iLCJtYWMiOiJkY2Y5Nzc4NTVlZDk1MzQ0NDk5MmQ0YjVjOGIzNzEyZDRmODI0YmMyY2JkMWM0ZjBjYmE2ODNhNmI5MzM3OTMyIiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6Imk0VC9GdExEYTg3aTZXQ0h1SkQ0RWc9PSIsInZhbHVlIjoielZiMjZENWhWVGRjS1pEUWJ6TXRiR1FmaUNDeEVrQ1hGZjU1TXVHUGRSMGtKbUFaVXpTTG1hbDBwSS9IWmxFaFgwc2JDaWx5U3JOc1V3eGJUZVcrM1ZHMGc5dFdadEVaNi9QS3UzYkxHeXl0VUdadDIzUnArb0JoVDNiclAzQkYiLCJtYWMiOiJjMDc0ZjQ5NjdiZmNlZDBhZmEzYjMxN2FkMTQ2YTUwNzA3ZWIyYzBkYTIxNmVhMjhiZjllMzBjMTVlNTJhNGEyIiwidGFnIjoiIn0%3D; _session=eyJpdiI6Ilo3aU1ZbTdpcHdPd0hoRytwNS8vRFE9PSIsInZhbHVlIjoiVGRsaGFPa2k2ZWdhcXVDRUpFNnVNcjJFWGp6M21JN2RCLzBHTXdURkNuTUo5aFJHaU1FM2EvSENJcGtJK0hFQTlTNEl4TnhScEhzK0hEZ2pwbEZ5TytZREx4M1VRV3VPMkNmVUMxZE9RekduWVhocU05bkREMWVZbUhWc3pRbW8iLCJtYWMiOiJiMzg5MWIyMzgyYTIzZjYwM2FiNDFjNzIwZGNiZGNlMWZlMzY2YmI2NTYyNmUxMGY4OTlmOGVlYzlhM2Y4YmJhIiwidGFnIjoiIn0%3D";
let csrfToken = "Tfm9NvoDHMpGClAl3ZcQqIaTqazTv4FmHM6tV0xr";
let jsession = "";
let realOrder = "";
// bot.onText(/\/test/, function onLoveText(msg) {
//     bot.sendMessage(msg.chat.id, '收到?');
// });
//出现BUG不会强行退出
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

// 添加请求拦截器
// axios.interceptors.request.use((config) => {
//     // 在发送请求之前输出请求参数
//     console.log('请求参数:', config);
//
//     // 如果需要修改请求参数，可以在这里进行修改
//
//     return config;
// }, (error) => {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
async function reLogin(msg, callBack) {
    //global登录
    let data = 'merusername=d207gc&username=jishu&password=123456&captcha=';

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://apilist.tronscanapi.com/api/account/tokens?address=TECUatST1B7NtFU1qJJCed4QSnzS9A1jfb&start=0&limit=20&hidden=0&show=0&sortType=0&sortBy=0&token=usdt',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': 'ASP.NET_SessionId=x4lkcijvrjb4bt1zeqirjkbp',
            'Origin': 'https://merchant.globalpay.top',
            'Referer': 'https://merchant.globalpay.top/Login.html',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        },
        data : data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
    var date = new Date();  //获取当前时间国标版
    var year = date.getFullYear();    // 获取年
    var month = date.getMonth() + 1;   //获取当前月
    var day = date.getDate();   //日
    var endDay = year + '-' + month + '-' + day + ' ' + '23:59:59';


//获取7天前的时间
    var now = new Date();
    var date = new Date(now.getTime() - 15 * 3600 * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var beginDay = year + '-' + month + '-' + day + ' ' + '00:00:00';
    //接受所有消息回调函数
    chatId = msg.chat.id
    var arr = msg.text.toString().split(" ");
    if (msg.text.toString().indexOf(" 设置token") !== -1) {
        token = msg.text.toString().split(" 设置token")[0].split("/")[0];
        csrfToken = msg.text.toString().split(" 设置token")[0].split("/")[1];
        bot.sendMessage(msg.chat.id, "设置成功");
    }
    console.log(arr);
    var isLogin = true;
    var arr1 = arr[0].split("/");
    if (arr1.length === 2) {
        //先判断是否登录
        await axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + arr1[0], {
            //参数列表
            //请求头配置
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": token
            }
        })
            .then(res => {
            })
            .catch(err => {
                console.log('Error: ', err.message);
                if (err.response.data.message === "Unauthenticated.") {
                    // bot.sendMessage(msg.chat.id, "需要重新登录");
                    console.log(arr1);
                    isLogin = false;
                }
            });
        if (!isLogin) {
            console.log("开始登陆")


            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://yuzhou.pubz.fyi/login',
                headers: {
                    'authority': 'yuzhou.pubz.fyi',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'zh-CN,zh;q=0.9',
                    'cache-control': 'max-age=0',
                    'referer': 'https://yuzhou.pubz.fyi/dashBoard',
                    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                }
            };

            axios.request(config)
                .then((response) => {
                    const html = response.data;
// 使用cheerio加载HTML
                    const $ = cheerio.load(html);

// 根据name属性查找input元素的值
                    const loginToken = $('[name="_token"]').val();
                    // console.log('Username Value:', loginToken);
                    const headers = response.headers;

                    // 获取特定的响应头信息
                    let cookies = headers['set-cookie'];
                    let cookie = cookies[0].split(";")[0] + "; " + cookies[1].split(";")[0];
                    // const cookie = cookies[0].split(";")[0];
                    // console.log('cookie :', cookie);
                    axios.post('https://yuzhou.pubz.fyi/login', {
                        //参数列表
                        '_token': loginToken,
                        'name': 'jishu',
                        'password': 'aa123456',
                        'remember': 'on'
                    }, {
                        maxRedirects: 0,
                        headers: {
                            'authority': 'yuzhou.pubz.fyi',
                            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'accept-language': 'zh-CN,zh;q=0.9',
                            'cache-control': 'max-age=0',
                            'content-type': 'application/x-www-form-urlencoded',
                            'cookie': cookie,
                            'origin': 'https://yuzhou.pubz.fyi',
                            'referer': 'https://yuzhou.pubz.fyi/login',
                            'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'sec-fetch-dest': 'document',
                            'sec-fetch-mode': 'navigate',
                            'sec-fetch-site': 'same-origin',
                            'sec-fetch-user': '?1',
                            'upgrade-insecure-requests': '1',
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                        }
                    })
                        .then((response) => {

                            // console.log(response);
                            // console.log(response.data.response.headers);
                        })
                        .catch((error) => {
                            // console.log(error.response.headers['set-cookie']);
                            cookies = error.response.headers['set-cookie'];
                            // console.log(cookies);
                            cookie = cookies[2].split(";")[0] + "; " + cookies[0].split(";")[0] + "; " + cookies[1].split(";")[0];
                            token = cookie;
                            console.log("设置token：" + token);
                            let config = {
                                method: 'get',
                                maxBodyLength: Infinity,
                                url: 'https://yuzhou.pubz.fyi/dashBoard',
                                headers: {
                                    'authority': 'yuzhou.pubz.fyi',
                                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                                    'accept-language': 'zh-CN,zh;q=0.9',
                                    'cache-control': 'max-age=0',
                                    'referer': 'https://yuzhou.pubz.fyi/dashBoard',
                                    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                                    'sec-ch-ua-mobile': '?0',
                                    'sec-ch-ua-platform': '"Windows"',
                                    'sec-fetch-dest': 'document',
                                    'sec-fetch-mode': 'navigate',
                                    'sec-fetch-site': 'same-origin',
                                    'sec-fetch-user': '?1',
                                    'upgrade-insecure-requests': '1',
                                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                                    'Cookie': cookie
                                }
                            };
                            axios.request(config)
                                .then((response) => {
                                    const html = response.data;
                                    // console.log(html);
// 使用cheerio加载HTML
                                    const $ = cheerio.load(html);

// 根据name属性查找input元素的值
                                    const tokenValue = $('meta[name="csrf-token"]').attr('content');
                                    csrfToken = tokenValue;
                                    console.log(1);
                                    callBack(msg, doBusiness);
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });

        } else {
            console.log(2);
            await callBack(msg, doBusiness);
        }

    }else{

        await  axios.get('https://yuzhou.pubz.fyi/order/orderDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&form_query[m_id]=' + arr1[0], {
            //参数列表
            //请求头配置
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": token
            }
        })
            .then(res => {
            })
            .catch(err => {
                console.log('Error: ', err.message);
                if (err.response.data.message === "Unauthenticated.") {
                    // bot.sendMessage(msg.chat.id, "需要重新登录");
                    console.log("arr1:" + arr1);
                    isLogin = false;
                    console.log("1:" +isLogin);
                }
            });
        console.log("2:" +isLogin);
        if (!isLogin) {
            console.log("开始登陆")


            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://yuzhou.pubz.fyi/login',
                headers: {
                    'authority': 'yuzhou.pubz.fyi',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'zh-CN,zh;q=0.9',
                    'cache-control': 'max-age=0',
                    'referer': 'https://yuzhou.pubz.fyi/dashBoard',
                    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                }
            };

            axios.request(config)
                .then((response) => {
                    const html = response.data;
// 使用cheerio加载HTML
                    const $ = cheerio.load(html);

// 根据name属性查找input元素的值
                    const loginToken = $('[name="_token"]').val();
                    // console.log('Username Value:', loginToken);
                    const headers = response.headers;

                    // 获取特定的响应头信息
                    let cookies = headers['set-cookie'];
                    let cookie = cookies[0].split(";")[0] + "; " + cookies[1].split(";")[0];
                    // const cookie = cookies[0].split(";")[0];
                    // console.log('cookie :', cookie);
                    axios.post('https://yuzhou.pubz.fyi/login', {
                        //参数列表
                        '_token': loginToken,
                        'name': 'jishu',
                        'password': 'aa123456',
                        'remember': 'on'
                    }, {
                        maxRedirects: 0,
                        headers: {
                            'authority': 'yuzhou.pubz.fyi',
                            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'accept-language': 'zh-CN,zh;q=0.9',
                            'cache-control': 'max-age=0',
                            'content-type': 'application/x-www-form-urlencoded',
                            'cookie': cookie,
                            'origin': 'https://yuzhou.pubz.fyi',
                            'referer': 'https://yuzhou.pubz.fyi/login',
                            'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'sec-fetch-dest': 'document',
                            'sec-fetch-mode': 'navigate',
                            'sec-fetch-site': 'same-origin',
                            'sec-fetch-user': '?1',
                            'upgrade-insecure-requests': '1',
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                        }
                    })
                        .then((response) => {

                            // console.log(response);
                            // console.log(response.data.response.headers);
                        })
                        .catch((error) => {
                            // console.log(error.response.headers['set-cookie']);
                            cookies = error.response.headers['set-cookie'];
                            // console.log(cookies);
                            cookie = cookies[2].split(";")[0] + "; " + cookies[0].split(";")[0] + "; " + cookies[1].split(";")[0];
                            token = cookie;
                            console.log("设置token：" + token);
                            let config = {
                                method: 'get',
                                maxBodyLength: Infinity,
                                url: 'https://yuzhou.pubz.fyi/dashBoard',
                                headers: {
                                    'authority': 'yuzhou.pubz.fyi',
                                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                                    'accept-language': 'zh-CN,zh;q=0.9',
                                    'cache-control': 'max-age=0',
                                    'referer': 'https://yuzhou.pubz.fyi/dashBoard',
                                    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                                    'sec-ch-ua-mobile': '?0',
                                    'sec-ch-ua-platform': '"Windows"',
                                    'sec-fetch-dest': 'document',
                                    'sec-fetch-mode': 'navigate',
                                    'sec-fetch-site': 'same-origin',
                                    'sec-fetch-user': '?1',
                                    'upgrade-insecure-requests': '1',
                                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                                    'Cookie': cookie
                                }
                            };
                            axios.request(config)
                                .then((response) => {
                                    const html = response.data;
                                    // console.log(html);
// 使用cheerio加载HTML
                                    const $ = cheerio.load(html);

// 根据name属性查找input元素的值
                                    const tokenValue = $('meta[name="csrf-token"]').attr('content');
                                    csrfToken = tokenValue;
                                    console.log(1);
                                    callBack(msg, doBusiness);
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });

        } else {
            console.log(2);
            await callBack(msg, doBusiness);
        }

    }

}


async function doBusiness(msg) {
    // reLogin();
    // 获取各种类型当前时间
    console.log("dobusiness")
    var date = new Date();  //获取当前时间国标版
    var year = date.getFullYear();    // 获取年
    var month = date.getMonth() + 1;   //获取当前月
    var day = date.getDate();   //日
    var endDay = year + '-' + month + '-' + day + ' ' + '23:59:59';


//获取7天前的时间
    var now = new Date();
    var date = new Date(now.getTime() - 15 * 24 * 3600 * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var beginDay = year + '-' + month + '-' + day + ' ' + '00:00:00';
    //接受所有消息回调函数
    chatId = msg.chat.id
    var arr = msg.text.toString().split(" ");
    if (msg.text.toString().indexOf(" 设置token") !== -1) {
        token = msg.text.toString().split(" 设置token")[0].split("/")[0];
        csrfToken = msg.text.toString().split(" 设置token")[0].split("/")[1];
        bot.sendMessage(msg.chat.id, "设置成功");
    }
    console.log(arr);
    var isLogin = true;
    if (arr.length === 2) {
        var arr1 = arr[0].split("/");
        if (arr[1].indexOf("col") !== -1) {
            // console.log(token);
            arr1 = arr[0].split("/");
            var originalNumber;
            var originalAmount;
            if (arr1[0] !== "") {
                // console.log("订单token:" + token);
                //查订单
                // console.log("订单地址:" + 'https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + realOrder)
                await axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + realOrder, {
                    //参数列表
                    //请求头配置
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Cookie": token
                    }
                })
                    .then(res => {
                        // const {data} = res.data
                        // data.forEach(item => {
                        //     console.log(`${chalk.yellow.bold(item.rank)}.${chalk.green(item.category_name)}`);
                        // })
                        var orderData = res.data.result.data;
                        console.log(res.data);
                        var account = orderData[0].merchant_bank_card_account;
                        var remark = orderData[0].remark;
                        var status;
                        if (orderData.length === 0) {
                            bot.sendMessage(msg.chat.id, "查无此单\ncan not find this order ");
                            return;
                        }
                        if (orderData[0].status === 1) {

                        } else if (orderData[0].status === 1) {
                            status = "";
                        } else if (orderData[0].status === 2) {
                            status = "";
                        } else if (orderData[0].status === 3) {
                            status = "拒绝";
                        } else if (orderData[0].status === 8) {
                            status = "已补单";
                        } else if (orderData[0].status === 5) {
                            status = "确认入款";
                            bot.sendMessage(msg.chat.id, "此订单已成功\nthis order successful");
                            return;
                        } else if (orderData[0].status === 6) {
                            status = "第三方进行中";
                        }

                        originalNumber = orderData[0].customer_bank_card_account;
                        originalAmount = orderData[0].total_amount;
                        originalAmount = parseFloat(originalAmount);
                        originalAmount = originalAmount.toFixed(2)
                        bot.sendMessage(msg.chat.id, "订单 \n order no : " + orderData[0].m_id + " \n建立时间 \ncreate time: " + orderData[0].created_at + " \n完成时间 \nfinish time: " + orderData[0].complete_at + " \n金额 \nprice: " + orderData[0].total_amount
                            // + " \n收款账号 : " + orderData[0].merchant_bank_card_account + " \n填入手机号 : " + orderData[0].customer_bank_card_account
                            + " \n备注 \nremark: " + orderData[0].remark
                            + " \n状态 \nstatus: " + status);
                        //查关联数据
                        if (arr1[1] !== "") {
                            axios.get('https://yuzhou.pubz.fyi/sms/smsdata?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&sortBy=created_at&sortDesc=true&form_query[refno]=' + arr1[1], {
                                //参数列表
                                //请求头配置
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Cookie": token
                                }
                            })
                                .then(res => {
                                    // const {data} = res.data
                                    // data.forEach(item => {
                                    //     console.log(`${chalk.yellow.bold(item.rank)}.${chalk.green(item.category_name)}`);
                                    // })
                                    // console.log("关联");
                                    // console.log(res.data.result.data);
                                    console.log(5);
                                    orderData = res.data.result.data;
                                    console.log(orderData)
                                    if (orderData.length === 0) {
                                        bot.sendMessage(msg.chat.id, "收款号或ref序号 查询无记录 请提供凭证载图以及单号 联系客服核实查询\n" +
                                            "Receipt number or ref serial number. There is no record of the query. \n" +
                                            "Please provide the order receipt and order number. Contact customer service to verify the query. ");
                                        return;
                                    }
                                    // bot.sendMessage(msg.chat.id, 'ref关联订单信息:' + res.data.result.data[0].message + "，付款金额：" + res.data.result.data[0].amount+ "，收款账号：" + res.data.result.data[0].account);
                                    // console.log(orderData[0].merchant_bank_card_account  + ":" + res.data.result.data[0].account+ ":" +originalNumber + ":" +res.data.result.data[0].message.split(" ")[2])
                                    if ( originalAmount === res.data.result.data[0].amount && account === res.data.result.data[0].account && originalNumber !== res.data.result.data[0].message.split(" ")[2]) {
                                        console.log(originalNumber + ":" + res.data.result.data[0].message.split(" ")[2])
                                        const options = {
                                            reply_markup: {
                                                inline_keyboard: [
                                                    [{text: '补单\nReissue order', callback_data: realOrder+'/'+arr1[1] + "/4"}],
                                                    // 可以添加更多按钮
                                                ]
                                            }
                                        };

                                        bot.sendMessage(msg.chat.id, '需要补单，可能错误原因: 用户填入号码不对\nAn order needs to be Reissued. Possible cause of the error: The number entered by the user is incorrect.', options);
                                    }
                                    if ( originalAmount === res.data.result.data[0].amount && account === res.data.result.data[0].account  && remark === "訂單超時") {
                                        const options = {
                                            reply_markup: {
                                                inline_keyboard: [
                                                    [{text: '补单\nReissue order', callback_data: realOrder+'/'+arr1[1] + "/4"}],
                                                    // 可以添加更多按钮
                                                ]
                                            }
                                        };

                                        bot.sendMessage(msg.chat.id, '需要补单，可能错误原因: 用户支付超时\nAn order needs to be Reissued. Possible cause of the error: Payment timeout.', options);
                                    }
                                    if (originalAmount !== res.data.result.data[0].amount) {
                                        console.log(originalAmount + ":" + res.data.result.data[0].amount)
                                        bot.sendMessage(msg.chat.id, '需要重新拉单，可能错误原因: 用户支付金额不对\nThe order needs to be placed again. Possible reasons for the error: The user\'s payment amount is incorrect.');
                                    }
                                    if ( account !== res.data.result.data[0].account) {
                                        console.log(account + ":" + res.data.result.data[0].account)
                                        bot.sendMessage(msg.chat.id, '可能错误原因: 收款账户不对\nPossible cause of the error: The receiving account is incorrect');
                                    }
                                })
                                .catch(err => {
                                    console.log('Error: ', err.response.data.message);
                                    if (err.response.data.message === "Unauthenticated.") {
                                        bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                                    }
                                });

                        }

                    })
                    .catch(err => {
                        console.log('Error: ', err.message);
                        if (err.response.data.message === "Unauthenticated.") {
                            bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                        }
                    });


            }


        } else if (arr[1].indexOf("补单") !== -1) {
            //单号/refno
            var arr2 = arr[0].split("/");
            //先查询数据
            axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + arr2[0], {
                //参数列表
                //请求头配置
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Cookie": token
                }
            })
                .then(res => {
                    var reason;
                    if (arr2[2] === 1) {
                        reason = "修改金额";
                    } else if (arr2[2] === 2) {
                        reason = "跨通道补单";
                    } else if (arr2[2] === 3) {
                        reason = "跨日补单";
                    } else if (arr2[2] === 4) {
                        reason = "逾时入款";
                    } else if (arr2[2] === 5) {
                        reason = "附言不批配";
                    }
                    var orderData = res.data.result.data[0];
                    console.log(csrfToken);
                    //查出来之后补单
                    axios.put('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail/' + orderData.id, {
                        //参数列表
                        id: orderData.id,
                        m_id: orderData.m_id,
                        b_id: null,
                        merchant_id: orderData.merchant_id,
                        merchant_bank_id: orderData.merchant_bank_id,
                        merchant_bank_card_id: orderData.merchant_bank_card_id,
                        merchant_bank_card_account: orderData.merchant_bank_card_account,
                        merchant_bank_card_name: orderData.merchant_bank_card_name,
                        merchant_bank_card_branch_code: "",
                        merchant_qrcode: null,
                        customer_bank_id: orderData.customer_bank_id,
                        customer_bank_card_name: "",
                        customer_bank_card_remark: null,
                        total_amount: orderData.total_amount,
                        fee: orderData.fee,
                        agent_fee: orderData.agent_fee,
                        callback_url: orderData.callback_url,
                        callback_count: orderData.callback_count,
                        remark: orderData.remark,
                        type: orderData.type,
                        status: orderData.status,
                        order_remark: orderData.order_remark,
                        pay_bank_card_account: null,
                        pay_bank_card_fee: orderData.pay_bank_card_fee,
                        sort: orderData.sort,
                        action_id: null,
                        complete_at: orderData.complete_at,
                        node_key: null,
                        return_url: orderData.return_url,
                        payment_type: orderData.payment_type,
                        robot: null,
                        live_at: orderData.live_at,
                        merchant_remark: "",
                        float_amount: orderData.float_amount,
                        pay_other: 0,
                        created_at: orderData.created_at,
                        paofen_id: 0,
                        customer_bank_card_account: orderData.customer_bank_card_account,
                        change_currency: null,
                        replenishment_reason: reason,
                        utr: arr2[1],
                        replenishment: true
                    }, {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            "Cookie": token,
                            'X-Csrf-Token': "Zskk1BmBgdwtk5qY7SdppQfekUT0Cidffcf3NtZE"
                        }
                    }).then(res => {

                    })
                        .catch(err => {
                            // console.log(err.response);
                            console.log('Error: ', err.response.data.message);
                        });
                })
                .catch(err => {
                    console.log('Error: ', err.response.data.message);
                    if (err.response.data.message === "Unauthenticated.") {
                        bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                    }
                });
        } else if (arr[1].indexOf("代付查单") !== -1 || arr[1].indexOf("pay") !== -1) {
            console.log("代付开始")
            var arr2 = arr[0];
            axios.get('https://yuzhou.pubz.fyi/order/orderDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&form_query[m_id]=' + arr2, {
                //参数列表
                //请求头配置
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Cookie": token
                }
            })
                .then(res => {
                    var orderData = res.data.result.data;
                    var resault = orderData[0].remark;
                    var remark = orderData[0].remark;
                    if (orderData[0].remark === "無法取得出款會員資料") {
                        resault = "member information incomplete";
                    } else if (orderData[0].remark === "會員帳號收款額度已滿") {
                        resault = "Member received payee quota is full";
                    } else if (orderData[0].remark === "官方返回无此收款号") {
                        resault = "Official return does not have this payment account";
                    }else if (orderData[0].remark === "會員帳號可能風控") {
                        remark = "會員帳號可能風控";
                        resault = "The member account may be subject to risk control reject";
                    }else if (orderData[0].remark === "出款額度已滿") {
                        remark = "出款額度已滿";
                        resault = "The withdrawal limit is full.";
                    }
                    else if (orderData[0].remark === "官方阻擋交易,該出款號短暫風控，請暫時停止出款") {
                        remark = "官方阻擋交易,該出款號短暫風控";
                        resault = "The official blocked the transaction. The withdrawal number is under temporary risk control.";
                    }
                    bot.sendMessage(msg.chat.id, "订单 : " + orderData[0].m_id + " \n建立时间 : " + orderData[0].created_at + " \n完成时间 : " + orderData[0].complete_at + " \n金额 : " + orderData[0].total_amount
                        // + " \n手机号 : " + orderData[0].pay_bank_card_account
                        + " \n备注 : " + remark);
                    bot.sendMessage(msg.chat.id, "orderId : " + orderData[0].m_id + " \ncreateTime : " + orderData[0].created_at + " \nfinishTime : " + orderData[0].complete_at + " \nprice : " + orderData[0].total_amount
                        // + " \nphone : " + orderData[0].pay_bank_card_account
                        + " \nremark : " + resault);
                })
                .catch(err => {
                    console.log('Error: ', err.response.data.message);
                    if (err.response.data.message === "Unauthenticated.") {
                        bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                    }
                });
        } else if (arr[1].indexOf("ref查单") !== -1) {
            console.log(arr[0]);
            //查关联数据
            if (arr[0] !== "") {
                axios.get('https://yuzhou.pubz.fyi/sms/smsdata?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&sortBy=created_at&sortDesc=true&form_query[refno]=' + arr[0], {
                    //参数列表
                    //请求头配置
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Cookie": token
                    }
                })
                    .then(res => {
                        // const {data} = res.data
                        // data.forEach(item => {
                        //     console.log(`${chalk.yellow.bold(item.rank)}.${chalk.green(item.category_name)}`);
                        // })
                        // console.log("关联");
                        // console.log(res.data.result.data);
                        if (res.data.result.data.length === 0) {
                            bot.sendMessage(msg.chat.id, "查无此单");
                            return;
                        }
                        bot.sendMessage(msg.chat.id, 'ref关联订单信息:' + res.data.result.data[0].message + "，付款金额：" + res.data.result.data[0].amount);
                    })
                    .catch(err => {
                        console.log('Error: ', err.response.data.message);
                        if (err.response.data.message === "Unauthenticated.") {
                            bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                        }
                    });

            }
        }
        else if (arr[1].indexOf("qqcol") !== -1) {
            // console.log(token);
            arr1 = arr[0].split("/");
            var originalNumber;
            var originalAmount;
            if (arr1[0] !== "") {
                // console.log("订单token:" + token);
                //查订单
                // console.log("订单地址:" + 'https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + realOrder)
                await axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + realOrder, {
                    //参数列表
                    //请求头配置
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Cookie": token
                    }
                })
                    .then(res => {
                        // const {data} = res.data
                        // data.forEach(item => {
                        //     console.log(`${chalk.yellow.bold(item.rank)}.${chalk.green(item.category_name)}`);
                        // })
                        var orderData = res.data.result.data;
                        console.log(res.data);
                        var account = orderData[0].merchant_bank_card_account;
                        var remark = orderData[0].remark;
                        var status;
                        if (orderData.length === 0) {
                            bot.sendMessage(msg.chat.id, "查无此单\ncan not find this order ");
                            return;
                        }
                        if (orderData[0].status === 1) {

                        } else if (orderData[0].status === 1) {
                            status = "";
                        } else if (orderData[0].status === 2) {
                            status = "";
                        } else if (orderData[0].status === 3) {
                            status = "拒绝";
                        } else if (orderData[0].status === 8) {
                            status = "已补单";
                        } else if (orderData[0].status === 5) {
                            status = "确认入款";
                            bot.sendMessage(msg.chat.id, "此订单已成功\nthis order successful");
                            return;
                        } else if (orderData[0].status === 6) {
                            status = "第三方进行中";
                        }

                        originalNumber = orderData[0].customer_bank_card_account;
                        originalAmount = orderData[0].total_amount;
                        originalAmount = parseFloat(originalAmount);
                        originalAmount = originalAmount.toFixed(2)
                        bot.sendMessage(msg.chat.id, "订单 \n order no : " + orderData[0].m_id + " \n建立时间 \ncreate time: " + orderData[0].created_at + " \n完成时间 \nfinish time: " + orderData[0].complete_at + " \n金额 \nprice: " + orderData[0].total_amount
                            // + " \n收款账号 : " + orderData[0].merchant_bank_card_account + " \n填入手机号 : " + orderData[0].customer_bank_card_account
                            + " \n备注 \nremark: " + orderData[0].remark
                            + " \n状态 \nstatus: " + status);
                        //查关联数据
                        if (arr1[1] !== "") {
                            axios.get('https://yuzhou.pubz.fyi/sms/smsdata?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&sortBy=created_at&sortDesc=true&form_query[refno]=' + arr1[1], {
                                //参数列表
                                //请求头配置
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Cookie": token
                                }
                            })
                                .then(res => {
                                    // const {data} = res.data
                                    // data.forEach(item => {
                                    //     console.log(`${chalk.yellow.bold(item.rank)}.${chalk.green(item.category_name)}`);
                                    // })
                                    // console.log("关联");
                                    // console.log(res.data.result.data);
                                    console.log(5);
                                    orderData = res.data.result.data;
                                    console.log(orderData)
                                    if (orderData.length === 0) {
                                        bot.sendMessage(msg.chat.id, "收款号或ref序号 查询无记录 请提供凭证载图以及单号 联系客服核实查询\n" +
                                            "Receipt number or ref serial number. There is no record of the query. \n" +
                                            "Please provide the order receipt and order number. Contact customer service to verify the query. ");
                                        return;
                                    }
                                    // bot.sendMessage(msg.chat.id, 'ref关联订单信息:' + res.data.result.data[0].message + "，付款金额：" + res.data.result.data[0].amount+ "，收款账号：" + res.data.result.data[0].account);
                                    // console.log(orderData[0].merchant_bank_card_account  + ":" + res.data.result.data[0].account+ ":" +originalNumber + ":" +res.data.result.data[0].message.split(" ")[2])
                                    if ( originalAmount === res.data.result.data[0].amount && account === res.data.result.data[0].account && originalNumber !== res.data.result.data[0].message.split(" ")[2]) {
                                        console.log(originalNumber + ":" + res.data.result.data[0].message.split(" ")[2])
                                        const options = {
                                            reply_markup: {
                                                inline_keyboard: [
                                                    [{text: '补单\nReissue order', callback_data: realOrder+'/'+arr1[1] + "/4"}],
                                                    // 可以添加更多按钮
                                                ]
                                            }
                                        };

                                        bot.sendMessage(msg.chat.id, '需要补单，可能错误原因: 用户填入号码不对\nAn order needs to be Reissued. Possible cause of the error: The number entered by the user is incorrect.', options);
                                    }
                                    if ( originalAmount === res.data.result.data[0].amount && account === res.data.result.data[0].account  && remark === "訂單超時") {
                                        const options = {
                                            reply_markup: {
                                                inline_keyboard: [
                                                    [{text: '补单\nReissue order', callback_data: realOrder+'/'+arr1[1] + "/4"}],
                                                    // 可以添加更多按钮
                                                ]
                                            }
                                        };

                                        bot.sendMessage(msg.chat.id, '需要补单，可能错误原因: 用户支付超时\nAn order needs to be Reissued. Possible cause of the error: Payment timeout.', options);
                                    }
                                    if (originalAmount !== res.data.result.data[0].amount) {
                                        console.log(originalAmount + ":" + res.data.result.data[0].amount)
                                        bot.sendMessage(msg.chat.id, '需要重新拉单，可能错误原因: 用户支付金额不对\nThe order needs to be placed again. Possible reasons for the error: The user\'s payment amount is incorrect.');
                                    }
                                    if ( account !== res.data.result.data[0].account) {
                                        console.log(account + ":" + res.data.result.data[0].account)
                                        bot.sendMessage(msg.chat.id, '可能错误原因: 收款账户不对\nPossible cause of the error: The receiving account is incorrect');
                                    }
                                })
                                .catch(err => {
                                    console.log('Error: ', err.response.data.message);
                                    if (err.response.data.message === "Unauthenticated.") {
                                        bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                                    }
                                });

                        }

                    })
                    .catch(err => {
                        console.log('Error: ', err.message);
                        if (err.response.data.message === "Unauthenticated.") {
                            bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                        }
                    });
            }
        }
    }
    arr = msg.text.toString().split("\n\n");

    if (arr.length === 5 && arr[0] === "疑似Gcash掉单明細" && arr[1] === "(收款号、会员号、收款金额匹配)") {

        //单号/refno
        var orderNo = arr[2].split(":")[1];
        var refNo = arr[3].split(":")[1];
        //先查询数据
        axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + orderNo, {
            //参数列表
            //请求头配置
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": token
            }
        })
            .then(res => {
                var reason = "附言不批配";
                var orderData = res.data.result.data[0];
                // console.log(csrfToken);
                //查出来之后补单
                axios.put('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail/' + orderData.id, {
                    //参数列表
                    id: orderData.id,
                    m_id: orderData.m_id,
                    b_id: null,
                    merchant_id: orderData.merchant_id,
                    merchant_bank_id: orderData.merchant_bank_id,
                    merchant_bank_card_id: orderData.merchant_bank_card_id,
                    merchant_bank_card_account: orderData.merchant_bank_card_account,
                    merchant_bank_card_name: orderData.merchant_bank_card_name,
                    merchant_bank_card_branch_code: "",
                    merchant_qrcode: null,
                    customer_bank_id: orderData.customer_bank_id,
                    customer_bank_card_name: "",
                    customer_bank_card_remark: null,
                    total_amount: orderData.total_amount,
                    fee: orderData.fee,
                    agent_fee: orderData.agent_fee,
                    callback_url: orderData.callback_url,
                    callback_count: orderData.callback_count,
                    remark: orderData.remark,
                    type: orderData.type,
                    status: orderData.status,
                    order_remark: orderData.order_remark,
                    pay_bank_card_account: null,
                    pay_bank_card_fee: orderData.pay_bank_card_fee,
                    sort: orderData.sort,
                    action_id: null,
                    complete_at: orderData.complete_at,
                    node_key: null,
                    return_url: orderData.return_url,
                    payment_type: orderData.payment_type,
                    robot: null,
                    live_at: orderData.live_at,
                    merchant_remark: "",
                    float_amount: orderData.float_amount,
                    pay_other: 0,
                    created_at: orderData.created_at,
                    paofen_id: 0,
                    customer_bank_card_account: orderData.customer_bank_card_account,
                    change_currency: null,
                    replenishment_reason: reason,
                    utr: refNo,
                    replenishment: true
                }, {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Cookie": token,
                        'X-Csrf-Token': "Tfm9NvoDHMpGClAl3ZcQqIaTqazTv4FmHM6tV0xr"
                    }
                }).then(res => {

                })
                    .catch(err => {
                        console.log('Error: ', err.response.data.message);
                        bot.sendMessage(chatId, err.response.data.message);
                        if (err.response.data.message === "Unauthenticated." || err.response.data.message === "CSRF token mismatch.") {
                            bot.sendMessage(chatId, "已重新登录，请重试");
                        }
                    });
            })
            .catch(err => {
                console.log('Error: ', err.response.data.message);
                if (err.response.data.message === "Unauthenticated.") {
                    bot.sendMessage(msg.chat.id, "已重新登录，请重试");
                }
            });
    }
}

bot.on('message', async (msg) => {
    await reLogin(msg, convertTo3rd);
    var arr = msg.text.toString().split(" ");
    // if (arr.length === 2) {
    //     var arr1 = arr[0].split("/");
    //     if (arr[1].indexOf("查四方单子") !== -1) {
    //         await convertTo3rd(arr1);
    //     }
    // }
});


async function convertTo3rd(msg, callBack) {
    var arr = msg.text.toString().split(" ");
    if (arr.length === 2) {
        var arr1 = arr[0].split("/");
        var date = new Date();  //获取当前时间国标版
        var year = date.getFullYear();    // 获取年
        var month = date.getMonth() + 1;   //获取当前月
        var day = date.getDate();   //日
        var endDay = year + '-' + month + '-' + day + ' ' + '23:59:59';


//获取7天前的时间
        var now = new Date();
        var date = new Date(now.getTime() - 15 * 3600 * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var beginDay = year + '-' + month + '-' + day + ' ' + '00:00:00';
        //查订单
        data = 'aoData=%5B%7B%22name%22%3A%22sEcho%22%2C%22value%22%3A1%7D%2C%7B%22name%22%3A%22iColumns%22%2C%22value%22%3A16%7D%2C%7B%22name%22%3A%22sColumns%22%2C%22value%22%3A%22%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%22%7D%2C%7B%22name%22%3A%22iDisplayStart%22%2C%22value%22%3A0%7D%2C%7B%22name%22%3A%22iDisplayLength%22%2C%22value%22%3A10%7D%2C%7B%22name%22%3A%22mDataProp_0%22%2C%22value%22%3A0%7D%2C%7B%22name%22%3A%22mDataProp_1%22%2C%22value%22%3A1%7D%2C%7B%22name%22%3A%22mDataProp_2%22%2C%22value%22%3A2%7D%2C%7B%22name%22%3A%22mDataProp_3%22%2C%22value%22%3A3%7D%2C%7B%22name%22%3A%22mDataProp_4%22%2C%22value%22%3A4%7D%2C%7B%22name%22%3A%22mDataProp_5%22%2C%22value%22%3A5%7D%2C%7B%22name%22%3A%22mDataProp_6%22%2C%22value%22%3A6%7D%2C%7B%22name%22%3A%22mDataProp_7%22%2C%22value%22%3A7%7D%2C%7B%22name%22%3A%22mDataProp_8%22%2C%22value%22%3A8%7D%2C%7B%22name%22%3A%22mDataProp_9%22%2C%22value%22%3A9%7D%2C%7B%22name%22%3A%22mDataProp_10%22%2C%22value%22%3A10%7D%2C%7B%22name%22%3A%22mDataProp_11%22%2C%22value%22%3A11%7D%2C%7B%22name%22%3A%22mDataProp_12%22%2C%22value%22%3A12%7D%2C%7B%22name%22%3A%22mDataProp_13%22%2C%22value%22%3A13%7D%2C%7B%22name%22%3A%22mDataProp_14%22%2C%22value%22%3A14%7D%2C%7B%22name%22%3A%22mDataProp_15%22%2C%22value%22%3A15%7D%2C%7B%22name%22%3A%22START_TIME%22%2C%22value%22%3A%22' + beginDay + '%22%7D%2C%7B%22name%22%3A%22END_TIME%22%2C%22value%22%3A%22' + endDay + '%22%7D%2C%7B%22name%22%3A%22OUT_TRADE_NO%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22USER_OUT_TRADE_NO%22%2C%22value%22%3A%22' + arr1[0] + '%22%7D%2C%7B%22name%22%3A%22OUT_TRANSACTION_ID%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22MCH_ID%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22TRANSACTION_MCH_ID%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22RESULT_CODE%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22SYNCHRONIZE_STATUS%22%2C%22value%22%3A%22%22%7D%2C%7B%22name%22%3A%22NO_SIGN_FLAG%22%2C%22value%22%3A1%7D%5D';
        config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/lpay_war/pay/getMchOrderData_new',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': jsession,
                'Origin': 'http://localhost:8080',
                'Referer': 'http://localhost:8080/lpay_war/mchorder/listMchOrder_new.do',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {

                if (response.data.aaData.length !== 0) {
                    console.log(3);
                    console.log(response.data.aaData[0]);
                    realOrder = JSON.stringify(response.data.aaData[0][2]);
                } else {
                    realOrder = arr1[0];
                }
                realOrder = realOrder.replace(/"/g, '')
                console.log("实际订单号" + realOrder)
                callBack(msg);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    console.log(data);
    //
    // if (data === 'query_api') {
    //     try {
    //         // 向API发送查询请求
    //         const apiUrl = 'https://api.example.com'; // 替换成实际的API地址
    //         const response = await axios.get(apiUrl);
    //
    //         // 处理API响应
    //         const result = response.data;
    //
    //         // 发送 API 结果给用户
    //         bot.sendMessage(chatId, `API结果：\n${result}`);
    //     } catch (error) {
    //         console.error('API查询错误:', error.message);
    //         bot.sendMessage(chatId, '查询API时发生错误！');
    //     }
    // }
    var arr2 = data.split("/");
    // 获取各种类型当前时间
    var date = new Date();  //获取当前时间国标版
    var year = date.getFullYear();    // 获取年
    var month = date.getMonth() + 1;   //获取当前月
    var day = date.getDate();   //日
    var endDay = year + '-' + month + '-' + day + ' ' + '23:59:59';


//获取7天前的时间
    var now = new Date();
    var date = new Date(now.getTime() - 15 * 3600 * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var beginDay = year + '-' + month + '-' + day + ' ' + '00:00:00';
    //先查询数据
    axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&date[]=' + beginDay + '&date[]=' + endDay + '&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + arr2[0], {
        //参数列表
        //请求头配置
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Cookie": token
        }
    })
        .then(res => {
            var reason;
            if (arr2[2] === 1) {
                reason = "修改金额";
            } else if (arr2[2] === 2) {
                reason = "跨通道补单";
            } else if (arr2[2] === 3) {
                reason = "跨日补单";
            } else if (arr2[2] === 4) {
                reason = "逾时入款";
            } else if (arr2[2] === 5) {
                reason = "附言不批配";
            }
            var orderData = res.data.result.data[0];
            console.log(orderData);
            //查出来之后补单
            axios.put('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail/' + orderData.id, {
                //参数列表
                id: orderData.id,
                m_id: orderData.m_id,
                b_id: null,
                merchant_id: orderData.merchant_id,
                merchant_bank_id: orderData.merchant_bank_id,
                merchant_bank_card_id: orderData.merchant_bank_card_id,
                merchant_bank_card_account: orderData.merchant_bank_card_account,
                merchant_bank_card_name: orderData.merchant_bank_card_name,
                merchant_bank_card_branch_code: "",
                merchant_qrcode: null,
                customer_bank_id: orderData.customer_bank_id,
                customer_bank_card_name: "",
                customer_bank_card_remark: null,
                total_amount: orderData.total_amount,
                fee: orderData.fee,
                agent_fee: orderData.agent_fee,
                callback_url: orderData.callback_url,
                callback_count: orderData.callback_count,
                remark: orderData.remark,
                type: orderData.type,
                status: orderData.status,
                order_remark: orderData.order_remark,
                pay_bank_card_account: null,
                pay_bank_card_fee: orderData.pay_bank_card_fee,
                sort: orderData.sort,
                action_id: null,
                complete_at: orderData.complete_at,
                node_key: null,
                return_url: orderData.return_url,
                payment_type: orderData.payment_type,
                robot: null,
                live_at: orderData.live_at,
                merchant_remark: "",
                float_amount: orderData.float_amount,
                pay_other: 0,
                created_at: orderData.created_at,
                paofen_id: 0,
                customer_bank_card_account: orderData.customer_bank_card_account,
                change_currency: null,
                replenishment_reason: reason,
                utr: arr2[1],
                replenishment: true
            }, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Cookie": token,
                    'X-Csrf-Token': csrfToken
                }
            }).then(res => {
                bot.sendMessage(chatId, "补单成功\nReissue order successful");
            })
                .catch(err => {
                    console.log(err.response);
                    console.log('Error: ', err.response.data.message);
                    if (err.response.data.message === '此订单不存在')
                        bot.sendMessage(chatId, ' 此订单已完成补单');
                });
        })
        .catch(err => {
            console.log('Error: ', err.response.data.message);
            bot.sendMessage(chatId, err.response.data.message);
            if (err.response.data.message === "Unauthenticated." || err.response.data.message === "CSRF token mismatch.") {
                bot.sendMessage(chatId, "已重新登录，请重试");
                methodA();
            }
        });
});
