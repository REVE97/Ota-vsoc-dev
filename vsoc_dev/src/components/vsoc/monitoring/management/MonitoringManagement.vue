<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
    </section>
    <section class="search">
      <article>
        <strong>Event ID</strong>
        <div class="input">
          <input 
            type="text"
            placeholder="Event ID 값을 입력해주세요." 
            v-model.number="userInput.inputEventId" />
        </div>
        <strong>Source ID</strong>
        <div class="input">
          <input 
            type="text" 
            placeholder="Source ID 값을 입력해주세요."
            v-model.number="userInput.inputSourceId" />
        </div>
        <strong>Trigger ID</strong>
        <div class="input">
          <input 
            type="text"
            placeholder="Trigger ID 값을 입력해주세요." 
            v-model.number="userInput.inputTriggerId" />
        </div>
        <strong>보고자</strong>
        <div class="input">
          <input 
            type="text" 
            placeholder="보고자를 입력해주세요."
            v-model="userInput.inputReporter"/>
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
              <th>Event ID</th>
              <th>Source ID</th>
              <th>Trigger ID</th>
              <th>
                보고자
                <div class="tooltip">
                  <i></i>
                  <p>이벤트 최초 보고자의 이름</p>
                </div>
              </th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in display">
              <td>{{ item.eventReportId }}</td>
              <td>{{ item.sourceId }}</td>
              <td>{{ item.triggerId }}</td>
              <td>{{ item.reporter }}</td>
              <td class="button" :style="{display:'flex', gap:'8px', justifyContent:'center'}">
                <!-- 이벤트 리포트 -->
                <button
                  class="gray line"
                  v-if="item.eventReportId === null"
                  @click="router.push({ name: 'monitoring_event_register' })">
                  Event Report
                </button>
                <router-link
                  v-else
                  :to="{ name: 'monitoring_event_detail', params: { eventReportId: item.eventReportId } }">
                  <button class="line">Event Report</button>
                </router-link>

                <!-- 약점 리포트 -->
                <router-link
                  v-if="item.weaknessReportId === null && item.eventReportId !== null"
                  :to="{ name: 'monitoring_weakness_register', params: { eventReportId: item.eventReportId } }">
                  <button class="gray line">Weakness Report</button>
                </router-link>
                <button
                  v-else-if="item.weaknessReportId === null && item.eventReportId === null"
                  class="gray line"
                  disabled>
                  Weakness Report
                </button>
                <router-link
                  v-else
                  :to="{ name: 'monitoring_weakness_detail', params: { weaknessReportId: item.weaknessReportId } }">
                  <button class="line">Weakness Report</button>
                </router-link>

                <!-- 취약점 리포트 -->
                <router-link
                  v-if="item.vulnerabilityReportId === null && item.weaknessReportId !== null"
                  :to="{ name: 'monitoring_vulnerability_register', params: { weaknessReportId: item.weaknessReportId } }">
                  <button class="gray line">Vulnerability Report</button>
                </router-link>
                <button
                  v-else-if="item.vulnerabilityReportId === null && item.weaknessReportId === null"
                  class="gray line"
                  disabled>
                  Vulnerability Report
                </button>
                <router-link
                  v-else
                  :to="{ name: 'monitoring_vulner_detail', params: { vulnerabilityReportId: item.vulnerabilityReportId } }">
                  <button class="line">Vulnerability Report</button>
                </router-link>

                <!-- 사이버 리포트 -->
                <router-link
                  v-if="item.cyberReportId === null && item.vulnerabilityReportId !== null"
                  :to="{ name: 'monitoring_cyber_register', params: { vulnerabilityReportId: item.vulnerabilityReportId } }">
                  <button class="gray line">Cybersecurity Incident Response Report</button>
                </router-link>
                <button
                  v-else-if="item.cyberReportId === null && item.vulnerabilityReportId === null"
                  class="gray line"
                  disabled>
                  Cybersecurity Incident Response Report
                </button>
                <router-link
                  v-else
                  :to="{ name: 'monitoring_cyber_detail', params: { cyberReportId: item.cyberReportId } }">
                  <button class="line">Cybersecurity Incident Response Report</button>
                </router-link>
              </td>
            </tr>
            <tr v-if="searchStatus === false && display.length === 0">
              <td colspan="5">먼저 검색 조건을 입력한 뒤 검색 버튼을 눌러주세요.</td>
            </tr>
            <tr v-if="searchStatus === true && display.length === 0">
              <td colspan="5">조건에 맞는 데이터가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// 대시보드 전체 데이터
const allData = ref([]);

// 사용자 검색 시 입력 데이터 상태값
const userInput = ref({
  inputEventId: "",
  inputSourceId: "",
  inputTriggerId: "",
  inputReporter: "",
})

// 필터링에 적용할 데이터 상태값
const appliedSearchData = ref({
  inputEventId: "",
  inputSourceId: "",
  inputTriggerId: "",
  inputReporter: "",
})

// 사용자 검색 시 데이터 상태값
const searchStatus = ref(false);

// 사용자 검색 필터링
const filteredData = computed(() => {
  return allData.value.filter( item => {
    const matchEventId =
     !appliedSearchData.value.inputEventId || 
     appliedSearchData.value.inputEventId === item.eventReportId;

    const matchSourceId = 
      !appliedSearchData.value.inputSourceId || 
      appliedSearchData.value.inputSourceId === item.sourceId;

    const matchTriggerId = 
      !appliedSearchData.value.inputTriggerId || 
      appliedSearchData.value.inputTriggerId === item.triggerId;

    const matchReporter = 
      !appliedSearchData.value.inputReporter || 
      appliedSearchData.value.inputReporter === item.reporter;

    return matchEventId && matchSourceId && matchTriggerId && matchReporter;
  })
})

// 검색 기능 활성화
const search_on = () => {
  appliedSearchData.value = {...userInput.value};
  searchStatus.value = true;
}

// 전체 데이터, 검색 데이터 구분 
const display = computed(() => {
  if (!searchStatus.value) return [];
  return filteredData.value;
})

// 모니터링 대시보드 데이터 조회 API 호출
const getfetch_monitoring = async() => {
  try {
    const res = await axios.get('/api/vsoc/monitoring-report');
    allData.value = res.data.data.monitoringReports.list;
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

onMounted(getfetch_monitoring);
</script>

<style scoped>
</style>