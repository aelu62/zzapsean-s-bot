require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');

// 디스코드 클라이언트 설정
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// 봇이 켜졌을 때 실행되는 이벤트
client.once('ready', () => {
    console.log(`✅ 로그인 완료! 봇 이름: ${client.user.tag}`);
});

// 데이터베이스 연결 및 봇 실행 함수
async function startBot() {
    try {
        // 1. MongoDB 연결 (키는 Cloudtype에서 가져옴)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB 연결 성공!');

        // 2. 디스코드 로그인 (키는 Cloudtype에서 가져옴)
        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error('❌ 실행 중 오류 발생:', error);
    }
}

// 봇 실행
startBot();
