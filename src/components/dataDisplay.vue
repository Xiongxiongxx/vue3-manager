<script setup lang="ts">
import { getTotal } from '../../utils/api'
let sales = ref('')
let goods = ref('')
let orders = ref('')
getTotal().then(res => {
    sales.value = res.salesTotal
    goods.value = res.goodsTotal
    orders.value = res.ordersTotal
})
</script>

<template>
    <div class="data-box row">
        <div class="data">
            <p class="data-title">销量</p>
            <p class="data-num">{{orders}}</p>
        </div>
        <div class="data">
            <p class="data-title">商品总数</p>
            <p class="data-num">{{goods}}</p>
        </div>
        <div class="data">
            <p class="data-title">销售额</p>
            <p class="data-num">{{sales}}</p>
        </div>
    </div>

</template>

<style scoped lang="less">
.data-box {
    justify-content: space-between;

    .data {
        padding: 30px;
        border-radius: 10px;
        width: 26%;

        p {
            text-align: center;
            color: #fff;
        }

        .data-num {
            font-size: 26px;
            margin-top: 20px;
            font-weight: bold;
        }
    }

    .data:nth-child(1) {
        background: pink;
    }

    .data:nth-child(2) {
        background: skyblue;
    }

    .data:nth-child(3) {
        background: orange;
    }

}
</style>
