const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const botToken = '6552612518:AAFOEO3OPklIganMVTccZuGTBEWZPbDxCuQ';
const bot = new TelegramBot(botToken, {polling: true});
const axios = require('axios');
let token = "XSRF-TOKEN=eyJpdiI6IlVhZExkcGNJNEVmbDcrclNtMkZTMGc9PSIsInZhbHVlIjoiMTlWZE5YazE0WTczZ0JNREhiK1VzOGxxSHBxS2xIM3JLSDlpN0RyeDNNZURLRWNEdDhrQ0ZyaFQ2ejY2K3FWVjFKcC8wUk1OME55ZEJ3WE5xd0hmNWJkajZ4aTZsZnRRU0R6cmt0Vy9RRzRVVnBBNGxCUm1Hb1VweEdxakpJazgiLCJtYWMiOiI4MGU2NTk0NGM1NTc2ZTU0MzFkOGJiYTg0ZTQ4NDExMTc4MTA2MmMxYjg2YzNhYTgxNDk5MDgwZThlNzU1YTU4IiwidGFnIjoiIn0%3D; _session=eyJpdiI6IjhwT1JFRW9leWQ4TG9WMUliSFRLTWc9PSIsInZhbHVlIjoiSWtzQWNTL3RkdVdpTFgxSitoRGs1WEZiai9VcXhSVUx5cDdkOGthc2hsSS9tbk9FeThQbUx2TGFNTXNHZGVJb21kMkppNVRpMXhlWWE3RzFKRFRKRG1nVFQvb2Rzdk5SZ1pucTNmd3VTbytONFRTbnorNTFUc1dZL3hGODg0UEIiLCJtYWMiOiI2MmM2NGNjMWUwYTkyMjkyY2U5ZGIyZWY0NjgxNDRhMWViYjA3NTk1MzA4OWMyYjQzMGRlMjY2YTVhODBkNmNkIiwidGFnIjoiIn0%3D";

// bot.onText(/\/test/, function onLoveText(msg) {
//     bot.sendMessage(msg.chat.id, '收到?');
// });
//出现BUG不会强行退出
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

 bot.on('message', async (msg) => {
    //接受所有消息回调函数
    chatId = msg.chat.id
    var arr = msg.text.toString().split(" ");
    if (msg.text.toString().indexOf(" 设置token") !== -1) {
        token = msg.text.toString().split(" 设置token")[0];
        bot.sendMessage(msg.chat.id, "设置成功");
    }
    if (arr.length === 2) {
        if (arr[1].indexOf("代收查单") !== -1) {
            // console.log(token);
            var arr1 = arr[0].split("/");
            var originalNumber;
            var originalAmount;
            if (arr1[0] !== "") {
                //查订单
                 axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + arr1[0], {
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
                        // console.log("订单");
                        var orderData = res.data.result.data;
                        // console.log(orderData);
                        var status;
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
                        } else if (orderData[0].status === 6) {
                            status = "第三方进行中";
                        }
                        originalNumber = orderData[0].customer_bank_card_account;
                        console.log(originalNumber);
                        originalAmount = orderData[0].total_amount;
                        originalAmount = parseFloat(originalAmount);
                        originalAmount = originalAmount.toFixed(2)
                        console.log(originalNumber)
                        console.log(originalAmount)
                        bot.sendMessage(msg.chat.id, "订单 : " + orderData[0].m_id + " \n建立时间 : " + orderData[0].created_at + " \n完成时间 : " + orderData[0].complete_at + " \n金额 : " + orderData[0].total_amount
                            + " \n收款账号 : " + orderData[0].merchant_bank_card_account + " \n填入手机号 : " + orderData[0].customer_bank_card_account + " \n备注 : " + orderData[0].remark
                            + " \n状态 : " + status);
                        //查关联数据
                        if (arr1[1] !== "") {
                            axios.get('https://yuzhou.pubz.fyi/sms/smsdata?page=1&itemsPerPage=15&sortBy=created_at&sortDesc=true&form_query[refno]=' + arr1[1], {
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

                                    console.log(res.data.result.data[0]);
                                    bot.sendMessage(msg.chat.id, 'ref关联订单信息:' + res.data.result.data[0].message + "，付款金额：" + res.data.result.data[0].amount);
                                    if (originalNumber !== res.data.result.data[0].message.split(" ")[2]) {
                                        console.log(originalNumber + ":" + res.data.result.data[0].message.split(" ")[2])
                                        bot.sendMessage(msg.chat.id, '需要补单，可能错误原因: 用户填入号码不对');
                                    }
                                    if (originalAmount !== res.data.result.data[0].amount) {
                                        console.log(originalAmount + ":" + res.data.result.data[0].amount)
                                        bot.sendMessage(msg.chat.id, '需要补单，可能错误原因: 用户支付金额不对');
                                    }
                                })
                                .catch(err => {
                                    console.log('Error: ', err.response.data.message);
                                    if (err.response.data.message === "Unauthenticated.") {
                                        bot.sendMessage(msg.chat.id, "需要重新登录");
                                    }
                                });

                        }

                    })
                    .catch(err => {
                        console.log('Error: ', err.message);
                    });


            }


        } else if (arr[1].indexOf("补单") !== -1) {
            var arr2 = arr[0].split("/");
            //先查询数据
             axios.get('https://yuzhou.pubz.fyi/transaction/transactionDepositDetail?page=1&itemsPerPage=15&report_type=created_at&sortBy=created_at&sortDesc=true&form_query[m_id]=' + arr2[0], {
                //参数列表
                //请求头配置
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Cookie": token
                }
            })
                .then(res => {
                    var orderData = res.data.result.data[0];
                    // console.log(orderData);
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
                        remark: orderData.type,
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
                        replenishment_reason: "逾时入款",
                        utr: arr2[1],
                        replenishment: true,
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            "Cookie": token
                        }
                    }).then(res => {

                    })
                        .catch(err => {
                            console.log('Error: ', err.response.data.message);
                        });
                })
                .catch(err => {
                    console.log('Error: ', err.response.data.message);
                    if (err.response.data.message === "Unauthenticated.") {
                        bot.sendMessage(msg.chat.id, "需要重新登录");
                    }
                });
        } else if (arr[1].indexOf("代付查单") !== -1) {
            var arr2 = arr[0];
            //先查询数据
             axios.get('https://yuzhou.pubz.fyi/order/orderDetail?page=1&itemsPerPage=15&report_type=created_at&form_query[m_id]=' + arr2, {
                //参数列表
                //请求头配置
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Cookie": token
                }
            })
                .then(res => {
                    var orderData = res.data.result.data;
                    var resault = "other";
                    if (orderData[0].remark === "無法取得出款會員資料") {
                        resault = "member information incomplete";
                    } else if (orderData[0].remark === "會員帳號收款額度已滿") {
                        resault = "Member received payee quota is full";
                    } else if (orderData[0].remark === "官方返回无此收款号") {
                        resault = "Official return does not have this payment account";
                    }
                      bot.sendMessage(msg.chat.id, "订单 : " + orderData[0].m_id + " \n建立时间 : " + orderData[0].created_at + " \n完成时间 : " + orderData[0].complete_at + " \n金额 : " + orderData[0].total_amount
                        + " \n手机号 : " + orderData[0].pay_bank_card_account + " \n备注 : " + orderData[0].remark);
                     bot.sendMessage(msg.chat.id, "orderId : " + orderData[0].m_id + " \ncreateTime : " + orderData[0].created_at + " \nfinishTime : " + orderData[0].complete_at + " \nprice : " + orderData[0].total_amount
                        + " \nphone : " + orderData[0].pay_bank_card_account + " \nremark : " + resault);
                })
                .catch(err => {
                    console.log('Error: ', err.response.data.message);
                    if (err.response.data.message === "Unauthenticated.") {
                        bot.sendMessage(msg.chat.id, "需要重新登录");
                    }
                });
        }
    }
})
