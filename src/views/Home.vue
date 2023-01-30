<template>
  <div class="home">
    <el-row>
      <el-col :span="6" style="padding-right: 10px">
        <el-card class="box-card">
          <div class="top">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <div class="user-info">
              <p class="user">Admin</p>
              <p class="role">超级管理员</p>
            </div>
          </div>
          <div class="bottom">
            <p>
              上次登录时间:
              <span>2022-12-25</span>
            </p>

            <p>
              上次登录地点:
              <span>莫斯科</span>
            </p>
          </div>
        </el-card>
        <el-card class="box-card next-card">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(item,index) in tableLabel"
              :key="index"
              :prop="index"
              :label="item"
            />
            <!-- 
            <el-table-column prop="name" label="品牌" />
            <el-table-column prop="todayBuy" label="日购买量" />
            <el-table-column prop="monthBuy" label="月购买量" />
            <el-table-column prop="totalBuy" label="总购买量" />-->
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="18" style="padding-left: 10px">
        <div class="num">
          <el-card class="box-card" v-for="item in countData" :key="item">
            <el-icon color="#fff" :style="{background: item.color}">
              <!-- <House /> -->
              <!-- $icon[item.icon] -->
              <component :is="item.icon"></component>
            </el-icon>
            <div class="detail">
              <span class="card-value">￥{{item.value}}</span>
              <p class="card-name">{{item.name}}</p>
            </div>
          </el-card>
        </div>
        <el-card class="orderData" style="height:280px">
          <!-- 折线图 -->
          <div ref="order" style="height:280px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height:260px">
            <!-- 柱状图 -->
            <div ref="echarts2" style="height:260px"></div>
          </el-card>
          <el-card style="height:260px">
            <!-- 饼状图 -->
            <div ref="echarts3" style="height:220px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { defineComponent } from "vue";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { getData } from "../api/index.js";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "日购买量",
        monthBuy: "月购买量",
        totalBuy: "总购买量"
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "Star",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "CircleCloseFilled",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "Star",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "CircleCloseFilled",
          color: "#5ab1ef"
        }
      ]
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;
      // 基于准备好的dom，创造echarts实例
      const order = echarts.init(this.$refs.order);
      // 指定图表的配置和数据
      var orderOption = {};
      // 处理数据xAxis
      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      console.log(xAxis);
      orderOption.xAxis = {
        data: xAxis
      };
      orderOption.yAxis = {};
      orderOption.legend = {
        data: xAxis
      };
      console.log(orderOption);
      orderOption.series = [];
      xAxis.forEach(index => {
        orderOption.series.push({
          name: index,
          data: orderData.data.map(item => item[index]),
          type: "line"
        });
      });
      order.setOption(orderOption);
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333"
          }
        },
        grid: {
          left: "20%"
        },
        // 提示框
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3"
            }
          },
          axisLabel: {
            interval: 0,
            color: "#333"
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              }
            }
          }
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map(item => item.new),
            type: "bar"
          },
          {
            name: "活跃用户",
            data: userData.map(item => item.active),
            type: "bar"
          }
        ]
      };
      echarts2.setOption(echarts2Option);
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
          trigger: "item"
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf"
        ],
        series: [
          {
            type: "pie",
            data: videoData
          }
        ]
      };
      console.log(echarts3Option);
      echarts3.setOption(echarts3Option);
    });
  }
};
</script>
<style lang="less" scoped>
.top {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  .el-avatar {
    --el-avatar-size: 150px;
    margin-right: 40px;
  }
  .user {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .role {
    color: #999999;
  }
}
.bottom {
  // padding-top: 10px;
  p {
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.next-card {
  margin-top: 20px;
  height: 460px;
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 30px;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .el-card /deep/ .el-card__body {
    display: flex;
    padding: 0;
    align-items: center;
  }
  .el-icon {
    // background-color: rgb(0, 132, 255);
    width: 80px;
    height: 80px;
    // font-size: 30px;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    margin-left: 15px;
    .card-value {
      line-height: 30px;
      height: 30px;
      margin-bottom: 10px;
    }
    .card-name {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
  // .orderData {
  //   height: 280px;
  // }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>
