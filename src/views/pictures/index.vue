<template>
    <div class="Container">
        <div v-for="(item, index) in pictures" :key="index" @dblclick="show(index)" class="Picture">
            <img class="Picture-img" :src="item.src" alt="" />
            <div class="Picture-note"><span>{{ item.note }}</span></div>
        </div>
        <div class="Picture">
            <img class="Picture-img" :src="url" alt="" />
            <div class="Picture-note"><span style="color: rgb(204, 6, 128); font-weight: bolder;">{{ data }}</span></div>
        </div>
    </div>

    <vue-easy-lightbox :visible="visibleRef" :imgs="imagesRef" :index="indexRef" @hide="onHide"
        @on-index-change="insertDiv" :loop="true"/>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'
export default {
    name: 'Pictures',
    components: {
        VueEasyLightbox
    },
    data() {
        return {
            visibleRef: false,
            indexRef: 0,
            imagesRef: [
                'https://picsum.photos/id/733/400',
                'https://picsum.photos/id/613/400',
                'https://picsum.photos/id/40/400',
                'https://picsum.photos/id/465/400',
                'https://picsum.photos/id/1029/400',
                'https://picsum.photos/id/923/400',
                'https://picsum.photos/id/425/400',
                'https://picsum.photos/id/200/400',
                'https://picsum.photos/id/244/400',
                'https://picsum.photos/id/15/400'

            ],
            title: 'Pictures',
            data: '',
            url: '/src/assets/images/months/',
            // 显示是倒序的哦
            pictures: [
                {
                    src: "https://picsum.photos/id/733/400",
                    note: "Over the clouds"
                },
                {
                    src: "https://picsum.photos/id/613/400",
                    note: "Golden Gate Bridge - San Francisco"
                },
                {
                    src: "https://picsum.photos/id/40/400",
                    note: "Cat nose"
                },
                {
                    src: "https://picsum.photos/id/465/400",
                    note: "Mountain"
                },
                {
                    src: "https://picsum.photos/id/1029/400",
                    note: "Central Park - New York"
                },
                {
                    src: "https://picsum.photos/id/923/400",
                    note: "Autumn"
                },
                {
                    src: "https://picsum.photos/id/425/400",
                    note: "Coffee"
                },
                {
                    src: "https://picsum.photos/id/200/400",
                    note: "An Irish cow enjoying the wind on the beach"
                },
                {
                    src: "https://picsum.photos/id/244/400",
                    note: "pelicans at the water's edge"
                },
                {
                    src: "https://picsum.photos/id/15/400",
                    note: "Waterfall"
                }

            ]
        }
    },
    mounted() {
        this.initPictures();
    },
    created() {
        this.getRouterData();
        this.getBackground();
    },
    methods: {
        initPictures() {
            const pictures = document.querySelectorAll('.Picture');
            var previousTouch = undefined;

            // 首先获取所有具有类名为"Picture"的元素，并使用forEach方法遍历每个元素。
            // 对于每个元素，函数生成随机的X坐标、Y坐标和旋转角度，并将它们应用到元素的样式中，使得每个元素的初始位置和旋转角度都不相同。

            pictures.forEach(picture => {
                const range = 100;
                const randomX = Math.random() * (range * 2) - range;
                const randomY = Math.random() * (range * 2) - range;
                const randomRotate = Math.random() * (range / 2) - range / 4;
                const startFunction = (event) => startDrag(picture, event);
                picture.style.top = `${randomY}px`;
                picture.style.left = `${randomX}px`;
                picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
                // 然后，为每个元素添加mousedown和touchstart事件的监听器，当鼠标按下或触摸开始时，会调用"startDrag"函数来启动拖动。
                picture.addEventListener("mousedown", startFunction);
                picture.addEventListener("touchstart", startFunction);
            });

            // 这段JavaScript代码是一个用于初始化图片拖动功能的函数。它通过获取具有类名为"Picture"的所有元素，为每个元素添加拖动功能的事件监听器。
            // 函数中定义了一些辅助函数和变量。其中，"updateElementPosition"函数用于更新元素的位置，根据鼠标或触摸事件的移动距离来计算新的位置坐标，并将新的位置应用到元素的样式中。
            // "startDrag"函数用于开始拖动元素，它会添加事件监听器来跟踪鼠标或触摸事件的移动，并调用"updateElementPosition"函数来更新元素的位置。
            function startDrag(element, event) {
                const updateFunction = (event) => updateElementPosition(element, event);
                const stopFunction = () => stopDrag({ update: updateFunction, stop: stopFunction });
                document.addEventListener("mousemove", updateFunction);
                document.addEventListener("touchmove", updateFunction);
                document.addEventListener("mouseup", stopFunction);
                document.addEventListener("touchend", stopFunction);
            }

            // "stopDrag"函数用于停止拖动元素，它会移除之前添加的事件监听器，停止跟踪鼠标或触摸事件的移动。
            function stopDrag(functions) {
                previousTouch = undefined;
                document.removeEventListener("mousemove", functions.update);
                document.removeEventListener("touchmove", functions.update);
                document.removeEventListener("mouseup", functions.stop);
                document.removeEventListener("touchend", functions.stop);
            }

            function updateElementPosition(element, event) {
                var movementX, movementY;

                if (event.type === 'touchmove') {
                    const touch = event.touches[0];
                    movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
                    movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
                    previousTouch = touch;
                } else {
                    movementX = event.movementX;
                    movementY = event.movementY;
                }

                const elementY = parseInt(element.style.top || 0) + movementY;
                const elementX = parseInt(element.style.left || 0) + movementX;

                element.style.top = elementY + "px";
                element.style.left = elementX + "px";
            }

        },
        // 接受参数
        getRouterData() {
            this.data = this.$route.query.data
            this.url = this.url + this.$route.query.data + '.png'
        },
        show(index) {
            this.indexRef = index
            this.visibleRef = true
        },

        onHide() {
            this.visibleRef = false
        },
        getBackground() {
            const month = this.$route.query.data
            let gradientVariable;
            switch (month) {
                case "January":
                    gradientVariable = "--jan-gradient";
                    break;
                case "February":
                    gradientVariable = "--feb-gradient";
                    break;
                case "March":
                    gradientVariable = "--mar-gradient";
                    break;
                case "April":
                    gradientVariable = "--apr-gradient";
                    break;
                case "May":
                    gradientVariable = "--may-gradient";
                    break;
                case "June":
                    gradientVariable = "--jun-gradient";
                    break;
                case "July":
                    gradientVariable = "--jul-gradient";
                    break;
                case "August":
                    gradientVariable = "--aug-gradient";
                    break;
                case "September":
                    gradientVariable = "--sep-gradient";
                    break;
                case "October":
                    gradientVariable = "--oct-gradient";
                    break;
                case "November":
                    gradientVariable = "--nov-gradient";
                    break;
                case "December":
                    gradientVariable = "--dec-gradient";
                    break;
                default:
                    gradientVariable = "--default-gradient"
            }
            const bodyElement = document.querySelector("body");
            bodyElement.style.background = `var(${gradientVariable})`;
        },
        // 在vel-img下面添加一个div，用于显示图片的名称
        insertDiv() {
            setTimeout(() => {
                var imgElement = document.querySelector(".vel-img");
                console.log(imgElement)
                var textNode = document.createTextNode("测试一下");
                var divElement = document.createElement("div");
                divElement.className = "vel-text";
                divElement.appendChild(textNode);

                var parentElement = imgElement.parentNode;
                parentElement.insertBefore(divElement, imgElement.nextSibling);
            }, 350)
        }

    },


}
</script>

<style>
@import '../../assets/base.css';
@import url("https://fonts.googleapis.com/css2?family=Caveat");
@import url('..\..\assets\font\font.css/');

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: 'Caveat', serif;
    overflow: hidden;
    /* 根据data的不同，设置不同的背景 */
    background: linear-gradient(135deg, rgb(248, 248, 248), #1690f5);
}

.Container {
    position: absolute;
    top: 50%;
    left: 50%;
}

.Picture {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    border: 5px solid #fff;
    border-radius: 3px;
    background: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    transform: translate(-50%, -50%);
    user-select: none;
    cursor: pointer;
}

.Picture-img {
    display: block;
    width: 300px;
    height: 300px;
    pointer-events: none;
}

.Picture-note {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 70px;
    padding: 12px 24px;
    font-size: 1.5rem;
    text-align: center;
}

.Network {
    display: inline-block;
    padding: 0 5px;
}

.Network img {
    width: 1.5rem;
    aspect-ratio: 1 / 1;
    vertical-align: middle;
}

.vel-img {
    border: 7px solid white;
    box-shadow: -5px -5px 10px -4px rgba(0, 0, 0, 0.6), 5px -5px 10px -4px rgba(0, 0, 0, 0.6);
}

.vel-text {
    background: white;
    box-shadow: 0 5px 20px 2px rgba(0, 0, 0, .7);
    height: 50px;
    text-align: center;
    font-family: 'wenrou', serif;
    font-size: 24px;
    font-weight: bold;
    line-height: 45px;
}
</style>
