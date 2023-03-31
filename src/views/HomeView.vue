
<template>
  <div>
    <div class="yuki-count-down">{{ mainText }}</div>

    <a-button
      type="primary"
      class="db mt10"
      @click="showDiv = !showDiv"
    >点击显示/隐藏</a-button>
    <div v-show="showDiv">
      <div class="yuki-holiday">
        <h1>请编辑你的法定节假日</h1>
        <a-button
          type="primary"
          @click="addItem(holidays)"
        >新增</a-button>
        <a-table
          class="mt20"
          :dataSource="holidays"
          :columns="columns"
          :pagination="false"
        >
          <template #bodyCell="{ record, column }">
            <template v-if="column.key === 'operation'">
              <a-button
                type="text"
                danger
                @Click="deleteRow('holidays', record)"
              >删除</a-button>
            </template>
            <template v-if="column.dataIndex === 'date' && !record.date">
              <div>
                <a-date-picker
                  v-model:value="record.date"
                  placeholder="请选择日期"
                  valueFormat="YYYY-MM-DD"
                />
              </div>
            </template>
            <template v-if="column.dataIndex === 'title' && !record.title">
              <div>
                <a-input
                  v-model:value="record.title"
                  placeholder="请输入事件"
                ></a-input>
              </div>
            </template>
          </template>
        </a-table>

      </div>
      <div class="yuki-work-day">
        <h1>请编辑你的额外工作日</h1>
        <a-button
          type="primary"
          @click="addItem(workDays)"
        >新增</a-button>
        <a-table
          class="mt20"
          :dataSource="workDays"
          :columns="columns"
          :pagination="false"
        >
          <template #bodyCell="{ record, column }">
            <template v-if="column.key === 'operation'">
              <a-button
                type="text"
                danger
                @Click="deleteRow('workDays', record)"
              >删除</a-button>
            </template>
            <template v-if="column.dataIndex === 'date' && !record.date">
              <div>
                <a-date-picker
                  v-model:value="record.date"
                  placeholder="请选择日期"
                  valueFormat="YYYY-MM-DD"
                />
              </div>
            </template>
            <template v-if="column.dataIndex === 'title' && !record.title">
              <div>
                <a-input
                  v-model:value="record.title"
                  placeholder="请输入事件"
                ></a-input>
              </div>
            </template>
          </template>
        </a-table>

      </div>

      <div class="yuki-get-off-time">
        <h1>请编辑你的下班时间</h1>
        <a-time-picker
          v-model:value="getOffTime"
          value-format="HH:mm:ss"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Button as aButton, Table as aTable, DatePicker as aDatePicker, Input as aInput, TimePicker as aTimePicker } from 'ant-design-vue';

export default {
  components: { aButton, aTable, aDatePicker, aInput, aTimePicker },
  data() {
    return {
      showDiv: true,
      columns: [
        {
          title: '日期',
          dataIndex: 'date',
          width: '150px'
        },
        {
          title: '事件',
          dataIndex: 'title',
        },
        {
          title: '操作',
          key: 'operation',
          width: '60px'
        },
      ],
      holidays: [
        {
          date: '2023-04-05',
          title: '清明节(1天)',
        },
        {
          date: '2023-04-29',
          title: '劳动节(5天)',
        },
        {
          date: '2023-05-12',
          title: '《王国之泪》发售',
        },
        {
          date: '2023-06-22',
          title: '端午节(3天)',
        },
        {
          date: '2023-09-29',
          title: '中秋国庆双节(8天)',
        },
      ], // 初始化数组
      workDays: [
        //调班

        {
          date: '2023-04-23',
          title: '劳动节调班',
        },
        {
          date: '2023-05-06',
          title: '劳动节调班',
        },
        {
          date: '2023-10-07',
          title: '中秋国庆双节调班',
        },
        {
          date: '2023-10-08',
          title: '中秋国庆双节调班',
        },
        //额外加班
        {
          date: '2023-02-11',
          title: '2月月初周六加班',
        },
        {
          date: '2023-03-04',
          title: '3月月初周六加班',
        },
        {
          date: '2023-04-01',
          title: '4月月初周六加班',
        },
        {
          date: '2023-06-03',
          title: '6月月初周六加班',
        },
        {
          date: '2023-07-01',
          title: '7月月初周六加班',
        },
        {
          date: '2023-08-05',
          title: '8月月初周六加班',
        },
        {
          date: '2023-09-02',
          title: '9月月初周六加班',
        },
        {
          date: '2023-10-14',
          title: '10月月初周六加班(预测)',
        },
        {
          date: '2023-11-04',
          title: '11月月初周六加班',
        },
        {
          date: '2023-12-02',
          title: '12月月初周六加班',
        },
      ],
      getOffTime: '18:00:00',
      mainText: ''
    };
  },
  methods: {
    isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
      return key in object;
    },
    deleteRow(listName: any, item: { title: string }) {
      if (!listName || !item) return
      if (this.isValidKey(listName, this)) {
        let list: Array<any> = this[listName]
        list = list.filter((day: { title: string }) => item.title !== day.title)
      }
    },
    addItem(data: Array<any>) {
      console.log(data);
      if (!data[data.length - 1]?.title || !data[data.length - 1]?.date) return
      data && data.push({ date: '', title: '', });
    },
    removeItem(data: any[], index: number) {
      data.splice(index, 1);
    },
    getOffTimeInfo() {
      const now = new Date();
      let todayOff = new Date()
      let dayOff = this.getOffTime.split(':')
      todayOff.setHours(+dayOff[0])
      todayOff.setMinutes(+dayOff[1])
      todayOff.setSeconds(+dayOff[2])
      let diff = (todayOff.getTime() - now.getTime()) / 1000;
      let str = '';
      if (diff < 0) {
        //已经下班
        if (diff <= -600) {
          str += '\n依然为了老板努力加班的社畜，已加班:' + -diff;
        } else {
          str += '\n下班了！！！！快润';
        }
      } else {
        str += '\n今天的工作时间剩余: ' + diff;
        if (diff > 3600) {
          let h = Math.floor(diff / 3600);
          console.log(diff - h * 3600);
          let m = Math.floor((diff - h * 3600) / 60);
          str +=
            '\n时间： ' +
            h +
            ' 时 ' +
            m +
            ' 分 ' +
            Math.floor(diff % 60) +
            ' 秒';
        } else {
          str +=
            '\n时间： ' +
            Math.floor(diff / 60) +
            ' 分 ' +
            Math.floor(diff % 60) +
            ' 秒';
        }
      }
      this.mainText = str
      return str;
      // return '今天的工作时间剩余: 24236\n时间： 6 时 43 分 56 秒\n距离【清明节(1天)】6天\n距离【劳动节(5天)】30天\n 距离【《王国之泪》发售】43天\n距离【端午节(3天)】84天\n距离【中秋国庆双节(8天)】183天\n2023-04-01 , 4月月初周六加班, 你还不能放假哦\n不算当天, 距离【周末】2天';
    },
  },
  mounted() {
    this.getOffTimeInfo()
    setInterval(() => { this.getOffTimeInfo() }, 1000)
  }
}
</script>
<style>
.yuki-count-down {
  white-space: pre-wrap;
}
</style>