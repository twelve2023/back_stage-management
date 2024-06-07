<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px;">
        <el-card class="box-card">
          <div class="user">
            <img src="../images/user.png" alt class="user-img" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>
              上次登录的时间：
              <span>2021-1-12</span>
            </p>
            <p>
              上次登录的地点：
              <span>东莞</span>
            </p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px;height:460px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(val,key) in tableLable" :key="key" :prop="key" :label="val" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left:10px">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{display:'flex',padding:0}"
          >
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <div>
          <el-card style="height:280px">
            <!-- 为用echarts准备一个dom节点,可通过this.$refs.echarts1获取dom节点 -->
            <div ref="echarts1" style="height: 280px;"></div>
          </el-card>
        </div>
        <!-- 图表 -->
        <div class="graph">
           <!-- 柱状图 -->
          <el-card style="height: 260px;">
            <div ref="echarts2" style="height: 260px;"></div>
          </el-card>
          <!-- 饼状图 -->
          <el-card style="height: 260px;">
            <div ref="echarts3" style="height: 240px;"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getData } from "../api/index";
// 引入echarts
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
      tableLable: {
        name: "品牌",
        todayBuy: "今日购买量",
        monthBuy: "本月购买量",
        todayBuy: "总购买量"
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ]
    };
  },
  mounted() {
    getData().then(({ data }) => {
      // 把tableData从data.data中解构出来
      const { tableData } = data.data;
      // console.log('22222222222',tableData);
      this.tableData = tableData;
      // console.log(data);

      // 折线图
      const echarts1 = echarts.init(this.$refs.echarts1);
      var echarts1Option = {};
      // 处理x轴数据
      const { orderData,userData,videoData } = data.data;
      
      // 获取数据的key值
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis
      };
      // x轴数据
      echarts1Option.xAxis = xAxisData;
      echarts1Option.tooltip={};
      echarts1Option.yAxis = {};
      echarts1Option.legend = xAxisData;
      echarts1Option.series = [];
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          // 返回的是key相同的值
          data: orderData.data.map(item => item[key]),
          type: "line"
        });
      });

      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(echarts1Option);

      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      var echarts2Option = {
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
          data: userData.map(item=>item.date),
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
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3"
        ],
        series: [
          {
            name:'新增用户',
            data:userData.map(item=>item.new),
            type:'bar'
          },
          {
            name:'活跃用户',
            data:userData.map(item=>item.active),
            type:'bar'
          }
        ]
      };
      echarts2.setOption(echarts2Option);


      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      var echarts3Option={
        tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data:videoData,
              type: 'pie'
            }
          ],
      }
      echarts3.setOption(echarts3Option);
    });
  }
};
</script>
<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  .user-img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      font-size: 12px;
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
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