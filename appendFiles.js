// html必须要有appendFiles类作为盒子
class appendFiles1 {
    constructor(maxnum) {
        this.src = '';//图片地址
        this.type = 0;//类型，0为加号，1为图片
        this.num = 0;//图片序号，用作dom和fileMsg进行比对
        this.fileMsg = [];//存入dom图片
        this.maxnum = maxnum//最多可上传图片数量，可从外部引入
    }
    init() {
        this.appendFile('./image/upload.png','0');
    }
    html(){
        let that = this;
        let li = document.createElement('li');
        let label = document.createElement('label');
        label.setAttribute('no',this.num);
        let img = document.createElement('img');
        img.src = this.src;
        label.appendChild(img);
        if(this.type ==0) {
            let input = document.createElement('input');
            input.type = 'file';
            input.onchange = function () {
                that.fileReader();
            }
            label.appendChild(input);
        }else {
            let closeImg = document.createElement('img');
            closeImg.src = './image/关闭.png';
            closeImg.className = 'close_img';
            closeImg.onclick = function () {
                that.closeImg();
            }
            label.appendChild(closeImg);
        }
        li.appendChild(label);
        return li;
    }
    fileReader() {
        let that = this;
        if (event.target.files[0]){
            let file = event.target.files[0];
            var filereader = new FileReader()
            filereader.readAsDataURL(file)
            filereader.onload = function (e) {
                let base64 = e.target.result;
                that.num ++;
                if(file.type.split('/')[0] === 'image') {
                    that.appendFile(base64,'1',true);
                }
            }
        }
    }
    closeImg() {
        let abc = false;
        this.fileMsg.forEach((item,index) => {
            let num = item.firstElementChild.getAttribute('no');
            if(num == event.target.parentNode.getAttribute('no')) {
                this.fileMsg.splice(index,1);
                event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
                this.num--;
                if(this.num == this.maxnum-1) {
                    abc = true;
                }
            }
        });
        if(abc) {
            this.appendFile('./image/upload.png','0');
            abc = false
        }
    }
    appendFile(img,type,is) {
        this.src = img;
        this.type = type;
        let abc = this.html();
        if(is) {
            this.fileMsg.splice(this.fileMsg.length-1, 0, abc);
        }else {
            this.fileMsg.push(abc);
        }
        if(this.fileMsg.length >= this.maxnum+1) {
            this.fileMsg.pop()
        }
        let fileBox = document.createElement('div');
        this.fileMsg.forEach(item => {
            fileBox.appendChild(item);
        });
        document.querySelector('.appendFiles').innerHTML = '';
        document.querySelector('.appendFiles').appendChild(fileBox);
    }
}

