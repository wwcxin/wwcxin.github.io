function generateMessage() {
    updateStatusBarTime();
    const phoneNumber = document.getElementById('phoneNumber').value;
    const packageNumber = document.getElementById('packageNumber').value;
    const courierCompany = document.getElementById('courierCompany').value;
    const proofType = document.getElementById('proofType').value;
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const headerPhoneNumber = document.getElementById('headerPhoneNumber');
    
    if (phoneNumber && packageNumber) {
        chatMessages.innerHTML = '';
        chatContainer.style.display = 'flex';
        headerPhoneNumber.textContent = phoneNumber;
        document.querySelector('.container').style.display = 'none';

        let initialMessage, response;

        if (proofType === '签收证明') {
            initialMessage = `你好${courierCompany}，这边给您送的包裹${packageNumber}是否收到？收到回复【是】谢谢！`;
            
            // 根据快递公司选择不同的回复
            if (courierCompany === '京东快递') {
                response = '是';
            } else {
                const responses = ['已收到', '收到了', '拿到了'];
                response = responses[Math.floor(Math.random() * responses.length)];
            }
        } else {
            initialMessage = `你好${courierCompany}，这边给您送的包裹${packageNumber}收到时外包装是否完好？`;
            response = '包装是好的';
        }

        // 添加日期
        addDateSeparator();

        // 添加快递公司的消息（发件人）
        addMessage(initialMessage, 'sender');

        // 添加客户的回复（收件人）
        addMessage(response, 'receiver');

    } else {
        alert('请填写对方手机号和快递包裹号');
    }
}

function addDateSeparator() {
    const chatMessages = document.getElementById('chatMessages');
    const dateElement = document.createElement('div');
    dateElement.classList.add('date-separator');
    const today = new Date();
    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    dateElement.textContent = `今天 星期${dayNames[today.getDay()]}`;
    chatMessages.appendChild(dateElement);
}

function addMessage(content, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageWrapper = document.createElement('div');
    messageWrapper.className = `message-wrapper-${type}`;

    const avatar = document.createElement('div');
    avatar.className = `avatar-${type}`;
    avatar.innerHTML = `<svg class="icon icon-touxiang" aria-hidden="true"><use xlink:href="#icon-touxiang"></use></svg>`;

    const messageContent = document.createElement('div');
    messageContent.className = `message-content-${type}`;

    const messageBubble = document.createElement('div');
    messageBubble.className = `message-bubble-${type}`;
    messageBubble.textContent = content;

    const time = document.createElement('div');
    time.className = `message-time-${type}`;
    
    const now = new Date();
    if (type === 'sender') {
        now.setMinutes(now.getMinutes() - 1);
    }
    time.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageContent.appendChild(messageBubble);
    messageContent.appendChild(time);

    if (type === 'sender') {
        messageWrapper.appendChild(messageContent);
        messageWrapper.appendChild(avatar);
    } else {
        messageWrapper.appendChild(avatar);
        messageWrapper.appendChild(messageContent);
    }

    chatMessages.appendChild(messageWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// 添加返回按钮功能
document.querySelector('.back-button').addEventListener('click', function() {
    document.getElementById('chatContainer').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
});

// 在文件末尾添加以下函数
function updateStatusBarTime() {
    const statusBarTime = document.getElementById('statusBarTime');
    const now = new Date();
    statusBarTime.textContent = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// 初始更新时间
updateStatusBarTime();

// 每分钟更新一次时间
setInterval(updateStatusBarTime, 60000);

// 在 generateMessage 函数的开头调用 updateStatusBarTime
function generateMessage() {
    updateStatusBarTime();
    const phoneNumber = document.getElementById('phoneNumber').value;
    const packageNumber = document.getElementById('packageNumber').value;
    const courierCompany = document.getElementById('courierCompany').value;
    const proofType = document.getElementById('proofType').value;
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const headerPhoneNumber = document.getElementById('headerPhoneNumber');
    
    if (phoneNumber && packageNumber) {
        chatMessages.innerHTML = '';
        chatContainer.style.display = 'flex';
        headerPhoneNumber.textContent = phoneNumber;
        document.querySelector('.container').style.display = 'none';

        let initialMessage, response;

        if (proofType === '签收证明') {
            initialMessage = `你好${courierCompany}，这边给您送的包裹${packageNumber}是否收到？收到回复【是】谢谢！`;
            
            // 根据快递公司选择不同的回复
            if (courierCompany === '京东快递') {
                response = '是';
            } else {
                const responses = ['已收到', '收到了', '拿到了'];
                response = responses[Math.floor(Math.random() * responses.length)];
            }
        } else {
            initialMessage = `你好${courierCompany}，这边给您送的包裹${packageNumber}收到时外包装是否完好？`;
            response = '包装是好的';
        }

        // 添加日期
        addDateSeparator();

        // 添加快递公司的消息（发件人）
        addMessage(initialMessage, 'sender');

        // 添加客户的回复（收件人）
        addMessage(response, 'receiver');

    } else {
        alert('请填写对方手机号和快递包裹号');
    }
}