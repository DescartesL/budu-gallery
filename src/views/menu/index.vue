<template>
    <div id="app">
        <div class="container">
            <header class="header">
                <h1 class="logo">
                    Menus
                    <div class="period"></div>
                </h1>

                <div class="avatar"></div>
            </header>

            <div class="stack">
                <VueCardStack :cards="cards" :cardWidth="286" :cardHeight="458" stackWidth="100%" @move="onMove"
                    @update="onUpdate">
                    <template v-slot:card="{ card }">
                        <div class="card">
                            <img onmousedown="event.preventDefault()" draggable="false" :src="card.cover" :style="{
                                ...getStyles(card),
                                transition: card.isDragging ? 'none' : 'all 0.2s'
                            }" @dblclick="clickImg(card.url)" />
                        </div>
                    </template>
                </VueCardStack>
            </div>

        </div>
    </div>
</template>
  
<script>
import VueCardStack from './components/vue-card-stack.vue';

export default {
    components: {
        VueCardStack
    },
    computed: {
        getInfoStyles() {
            const SPEED = 0.25;

            if (this.stack.length) {
                const styles = this.cards.map((card, index) => {
                    const cardInStack = this.stack.find((x) => x.id === card.id);
                    const cardIndexInStack = this.stack.findIndex(
                        (x) => x.id === card.id
                    );

                    const yPosFactor = this.convertRange(
                        cardInStack.xPos,
                        [0, 69],
                        [1, 0]
                    );

                    if (this.direction === "left") {
                        const o = (i) => {
                            if (this.isDragging) {
                                if (i === 0) {
                                    return this.convertRange(cardInStack.xPos, [380, 69], [0, 1]);
                                } else if (i === 1) {
                                    return this.convertRange(cardInStack.xPos, [69, 65], [1, 0]);
                                } else {
                                    return 0;
                                }
                            } else {
                                return i === 1 ? 1 : 0;
                            }
                        };

                        return {
                            transform: `translate(0, ${cardIndexInStack === 0
                                ? 5 * yPosFactor
                                : (cardIndexInStack + 1) * (100 * yPosFactor)
                                }px)`,
                            transition: `transform ${this.isDragging && !(cardIndexInStack > 1) ? 0 : SPEED
                                }s ease 0s, opacity ${this.isDragging ? 0 : SPEED}s ease 0s`,
                            opacity: o(cardIndexInStack)
                        };
                    } else {
                        const o = (i) => {
                            if (this.isDragging) {
                                if (i === 1) {
                                    return this.convertRange(cardInStack.xPos, [69, 200], [1, 0]);
                                } else if (i === 2) {
                                    return this.convertRange(cardInStack.xPos, [55, 69], [0, 1]);
                                } else {
                                    return 0;
                                }
                            } else {
                                return i === 1 ? 1 : 0;
                            }
                        };

                        return {
                            transform: `translate(0, ${cardIndexInStack === 1
                                ? 5 * yPosFactor
                                : (cardIndexInStack - 1) * (100 * yPosFactor)
                                }px)`,
                            transition: `transform ${this.isDragging && !(cardIndexInStack > 2) ? 0 : SPEED
                                }s ease 0s, opacity ${this.isDragging ? 0 : SPEED}s ease 0s`,
                            opacity: o(cardIndexInStack)
                        };
                    }
                });

                return styles;
            }

            return {};
        }
    },
    methods: {
        convertRange(value, r1, r2) {
            return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
        },
        getStyles(card) {
            const MIN_POS_X = 0;
            const MAX_POS_X = 69;
            const MIN_SCALE_FACTOR = 1;
            const MAX_SCALE_FACTOR = 2.5;

            const opacity = this.convertRange(
                card.xPos > 0 ? card.xPos : 0,
                [MIN_POS_X, MAX_POS_X],
                [0, 1]
            );

            const scale = this.convertRange(
                card.xPos > 0 ? card.xPos : 0,
                [MIN_POS_X, MAX_POS_X],
                [MAX_SCALE_FACTOR, 1]
            );

            const normalizedScale =
                scale >= MIN_SCALE_FACTOR
                    ? scale <= MAX_SCALE_FACTOR
                        ? scale
                        : MAX_SCALE_FACTOR
                    : MIN_SCALE_FACTOR;

            const normalizedOpacity = opacity >= 0 ? (opacity <= 1 ? opacity : 1) : 0;

            return {
                transform: `scale(${card.$index !== 0 ? normalizedScale : 1}, ${card.$index !== 0 ? normalizedScale : MIN_SCALE_FACTOR
                    })`,
                opacity: `${card.$index !== 0 ? normalizedOpacity : 1}`
            };
        },
        onUpdate({ active }) {
            this.activeCard = active;
        },
        onMove({ stack, direction, isDragging }) {
            this.stack = stack;
            this.direction = direction;
            this.isDragging = isDragging;
        },
        clickImg(url) {
            this.$router.push(url);
        }
    },
    data() {
        return {
            stack: [],
            isDragging: false,
            activeCard: {
                rating: 0
            },
            cards: [
                {
                    id: 1,
                    title: "照片墙",
                    release: "10.2.18",
                    url: "/calendar",
                    cover: "/src/assets/images/icons/gallery.png",
                    
                },
                {
                    id: 2,
                    title: "文章墙",
                    url: "/article",
                    release: "10.6.17",
                    cover: "/src/assets/images/icons/article.png",
                    
                },
                {
                    id: 1,
                    title: "照片墙",
                    url: "/calendar",
                    release: "10.2.18",
                    cover: "/src/assets/images/icons/gallery.png",
                    
                },
                {
                    id: 2,
                    title: "文章墙",
                    url: "/article",
                    release: "10.6.17",
                    cover: "/src/assets/images/icons/article.png",
                    
                },

            ]
        };
    }
};
</script>
  
<style lang="scss">
@font-face {
    font-family: "Eina";
    src: url("https://assets.codepen.io/152347/eina-03-semibold.woff2") format("woff2"),
        url("https://assets.codepen.io/152347/eina-03-semibold.woff") format("woff");
}

body {
    font-family: "Eina", serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #9796f0;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right,
            #fbc7d4,
            #9796f0);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right,
            #fbc7d4,
            #9796f0);

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#app {
    color: #1c1c1c;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    grid-gap: 60px;
}

.attribution {
    text-decoration: none;
    width: auto;
    border-radius: 999em;
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 12px 25px 12px 60px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1c1c1c;
    background: #fff;
    background: rgba(255, 255, 255, 0.25);
    position: relative;
    font-family: "Montserrat", sans-serif;

    >img {
        color: green;
        width: 40px;
        height: 40px;
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translate(0, -50%);
    }

    .inner {
        display: flex;
        flex-direction: column;
        grid-gap: 2px;
    }

    h3 {
        font-size: 11px;
    }

    h5 {
        font-size: 16px;
        font-weight: 600;
    }
}

.container {
    z-index: 2;
    position: relative;
    background: #fff;
    border-radius: 12px;
    width: 375px;
    height: 667px;
    overflow: hidden;
    box-shadow: 0 70px 63px -60px;
    display: flex;
    flex-direction: column;
}

//////////////////////////////////////////
// HEADER
//////////////////////////////////////////
.header {
    display: flex;
    justify-content: space-between;
    padding: 24px;

    .logo {
        align-items: baseline;
        display: flex;
        font-size: 29px;
    }

    .period {
        width: 5px;
        height: 5px;
        margin-left: 4px;
        background: #ff3366;
    }

    .avatar {
        width: 32px;
        height: 32px;
        border-radius: 20px;
        background: #ffe259;
        overflow: hidden;
    }

    .avatar>img {
        width: 100%;
        height: auto;
    }
}

//////////////////////////////////////////
// FOOTER
//////////////////////////////////////////
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    flex-direction: row-reverse;
    position: relative;
}

//////////////////////////////////////////
// RATING
//////////////////////////////////////////
.rating {
    display: flex;
    justify-content: space-between;
    justify-self: flex-end;

    .star {
        background: url("https://assets.codepen.io/152347/star.svg");
        background-size: 100%;
        width: 15px;
        height: 15px;
        transform: scale(0.5, 0.5);
        margin: 2px;
        transition: all 0.2s ease;
        opacity: 0.5;

        &.active {
            transform: scale(1, 1);
            opacity: 1;
        }
    }
}

//////////////////////////////////////////
// INFO
//////////////////////////////////////////
.info {
    position: absolute;
    left: 24px;

    .title {
        font-size: 16px;
        line-height: 22px;
    }

    .date {
        font-size: 11px;
        line-height: 15px;
        color: #9ba7c6;
    }
}

.stack {
    width: 100%;
}

.card {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    transform: rotate(0);
    background: #fff;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;

    >img {
        width: 286px;
        height: 458px;
        object-fit: cover;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
    }
}

.try-me {
    display: flex;
    grid-gap: 8px;
    align-items: center;
    font-size: 14px;
    margin-top: -24px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    color: #fff;
}
</style>
  