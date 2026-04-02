<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>알림 이력 조회</span>
    </section>
    <section class="search">
      <article>
        <strong>알림 발송일</strong>
        <div class="input calendar">
          <Datepicker
            v-model="userInput.inputAlarmsDate"
            format="yyyy-MM-dd"
            model-type="format"
            :enable-time-picker="false"
            :clearable="false"
            :hideInputIcon="true"
            locale="ko"
          />
          <label></label>
        </div>
        <strong>차대 번호</strong>
        <div class="input">
          <input
            type="text"
            placeholder="차대 번호를 입력해주세요"
            v-model="userInput.inputVin"
          />
        </div>
        <div class="button">
          <button @click="search_on">검색</button>
        </div>
      </article>
    </section>
    <section class="content">
      <article class="table">
        <table>
          <thead>
            <tr>
              <th>알림 발송 일시</th>
              <th>데이터 출처</th>
              <th>미승인 정보</th>
              <th>차대번호</th>
              <th>차종</th>
              <th>ECU</th>
              <th>ECU SW 버전</th>
              <th>RXSWIN 식별 번호</th>
              <th class="checkbox">
                <input
                  type="checkbox"
                  id="allCheckbox"
                  :checked="isAllChecked"
                  @change="toggleAllCheckbox"
                />
                <label for="allCheckbox"></label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in display">
              <td>{{ getDate(item.alarmSentDate) }}</td>
              <td>{{ item.dataSource }}</td>
              <td>{{ item.unapprovedInfo }}</td>
              <td>{{ item.vin }}</td>
              <td>{{ item.vehModel }}</td>
              <td>{{ item.ecuName }}</td>
              <td>{{ item.ecuSwVersion }}</td>
              <td>{{ item.rxswinId }}</td>
              <td v-if="Number(item.isRead) === 1">확인</td>
              <td v-else class="checkbox">
                <input
                  type="checkbox"
                  :id="`listCheckbox-${item.id}`"
                  :value="item.id"
                  v-model="selectedAlarmIds"
                />
                <label :for="`listCheckbox-${item.id}`"></label>
              </td>
            </tr>
            <tr v-if="searchStatus === false && display.length === 0">
              <td colspan="9">먼저 검색 조건을 입력한 뒤 검색 버튼을 눌러주세요.</td>
            </tr>
            <tr v-if="searchStatus === true && display.length === 0">
              <td colspan="9">조건에 맞는 데이터가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button @click="postfetch_notification">알림 확인</button>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getDate } from "@/common/common";
import axios from "axios";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// 알림 이력 조회 전체 데이터 상태값
const allData = ref([]);

// 사용자 검색 입력 데이터 상태값
const userInput = ref({
  inputAlarmsDate: "",
  inputVin: "",
});

// 필터링에 적용할 데이터 상태값
const appliedSearchData = ref({
  inputAlarmsDate: "",
  inputVin: "",
})

// 선택된 체크박스들의 데이터 상태값
const selectedAlarmIds = ref([]);

// 검색 모드 데이터 상태값
const searchStatus = ref(false);

// 검색모드 시 필터링 데이터 상태값
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const matchAlaramsDate =
      !appliedSearchData.value.inputAlarmsDate ||
      getDate(item.alarmSentDate) === appliedSearchData.value.inputAlarmsDate;

    const matchVin =
      !appliedSearchData.value.inputVin ||
      item.vin.includes(appliedSearchData.value.inputVin);

    return matchAlaramsDate && matchVin;
  });
});

// 검색모드 on/off 구분하는 데이터 상태값 (읽지 않은 알림부터 출력)
const display = computed(() => {
  if (!searchStatus.value) return [];

  const sorted =  searchStatus.value ? filteredData.value : allData.value;

  return [...sorted].sort((a,b) => Number(a.isRead) - Number(b.isRead)); 
});

// 체크 가능한 목록만 따로 추출 , isRead === 0 인 항목만 체크박스를 보여주므로 이 목록만 전체선택 대상
const checkableItems = computed(() => {
  return display.value.filter((item) => Number(item.isRead) !== 1);
});

// 전체 선택 여부
const isAllChecked = computed(() => {
  return (
    checkableItems.value.length > 0 &&
    checkableItems.value.every((item) =>
      selectedAlarmIds.value.includes(item.id)
    )
  );
});

// 컬럼 체크박스 클릭 시 전체 선택/해제
const toggleAllCheckbox = (event) => {
  const checked = event.target.checked;
  if (checked) {
    selectedAlarmIds.value = checkableItems.value.map((item) => item.id);
  } else {
    selectedAlarmIds.value = [];
  }
};

// 검색모드 메서드
const search_on = () => {
  appliedSearchData.value = {...userInput.value};
  searchStatus.value = true;
  selectedAlarmIds.value = [];
};

// 알림 이력 조회 API 호출
const getfetch_notification = async () => {
  try {
    const res = await axios.get("/api/vsoc/alarms", {
      params: {
        alarmSentStartDate: "",
        alarmSentEndDate: "",
        vin: "",
      },
    });
    allData.value = res.data.data.alarms.list;
  } catch (error) {
    console.error(error);
    alert("데이터 불러오기 실패");
  }
};

// 알림 읽음 업데이트 API 호출
const postfetch_notification = async () => {
  try {
    const postData = {
      alarmIdList: selectedAlarmIds.value,
    };
    await axios.post("/api/vsoc/alarms", postData);

    selectedAlarmIds.value = [];

    await getfetch_notification();
  } catch (error) {
    console.error(error);
    alert("알림 읽음 업데이트 실패");
  }
};

onMounted(getfetch_notification);
</script>

<style scoped>
/* :deep(.dp__clear_icon) {
  right: 36px;
} */
</style>