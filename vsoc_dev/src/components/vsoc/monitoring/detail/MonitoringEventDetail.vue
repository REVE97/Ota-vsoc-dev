<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
      <span>리포트 상세 조회</span>
    </section>
    <section class="step button">
      <button class="active">Event Report</button>
      <router-link 
        v-if="isValid?.weaknessReportId" 
        :to="{ name: 'monitoring_weakness_detail', params: { weaknessReportId: isValid.weaknessReportId } }">
        <button>Weakness Report</button>
      </router-link>
      <router-link 
        v-if="isValid?.vulnerabilityReportId" 
        :to="{ name: 'monitoring_vulner_detail', params: { vulnerabilityReportId: isValid.vulnerabilityReportId } }">
        <button>Vulnerability Report</button>
      </router-link>
      <router-link 
        v-if="isValid?.cyberReportId" 
        :to="{ name: 'monitoring_cyber_detail', params: { cyberReportId: isValid.cyberReportId } }">
        <button>Cybersecurity Incident Response Report</button>
      </router-link>
    </section>
    <section class="page">
      <article class="table">
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Event ID</th>
              <td>{{ allData?.id }}</td>
              <th>Source ID</th>
              <td>{{ allData?.sourceId }}</td>
            </tr>
            <tr>
              <th>Trigger ID</th>
              <td>{{ allData?.triggerId }}</td>
              <th>Keyword</th>
              <td>{{ allData?.keyword }}</td>
            </tr>
            <tr>
              <th>제품명</th>
              <td>{{ allData?.productName }}</td>
              <th>프로젝트명</th>
              <td>{{ allData?.projectName }}</td>
            </tr>
            <tr>
              <th>연관된 Asset</th>
              <td>{{ allData?.associatedAsset }}</td>
              <th>CS Info 이름</th>
              <td>{{ allData?.csInfoName }}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td colspan="3">{{ allData?.description }}</td>
            </tr>
            <tr>
              <th>심각도/CVSS 점수</th>
              <td>{{ allData?.severityScore }}</td>
              <th>수집된 URL</th>
              <td>{{ allData?.collectionUrl }}</td>
            </tr>
            <tr>
              <th>보고자</th>
              <td>{{ allData?.reporter }}</td>
              <th>담당자</th>
              <td>{{ allData?.manager }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button class="red line" @click="openDeleteConfirm">삭제</button>
        <router-link :to="{ name: 'monitoring_event_update', params: { eventReportId: route.params.eventReportId } }">
          <button class="line">수정</button>
        </router-link>
        <button class="cancel" @click='router.push({ name: "monitoring_management" })'>목록</button>
        <router-link 
          v-if="isValid?.weaknessReportId === null" 
          :to="{ name: 'monitoring_weakness_register', params: { eventReportId: isValid.eventReportId } }">
          <button>약점 리포트 작성</button>
        </router-link>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';

const route = useRoute();
const router = useRouter();
const store = useAppStore();

// 모니터링 리포트 이벤트 리포트 상세조회 전체 데이터
const allData = ref(null);

// 버튼으로 이동하기 위한 리포트 데이터
const isValid = ref({
  weaknessReportId: "",
  vulnerabilityReportId: "",
  cyberReportId: "",
});

// 모니터링 리포트 이벤트 리포트 상세조회 API 호출
const getfetch_event_detail = async() => {
  try {
    const eventReportId = route.params.eventReportId;
    const res = await axios.get(`/api/vsoc/monitoring-report/event/${eventReportId}`);
    allData.value = res.data.data.report;
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// 해당 리포트 리스트 바로가는 버튼, 다음 리포트 작성 버튼 API 호출
const getfetch_button_link = async() => {
  try {
    const eventReportId = Number(route.params.eventReportId);
    const res = await axios.get('/api/vsoc/monitoring-report');
    isValid.value = res.data.data.monitoringReports.list.find((item)=>item.eventReportId === eventReportId);
  } catch (error) {
    console.error(error);
    alert('버튼 데이터 불러오기 실패');
  }
}

// 모니터링 리포트 이벤트 리포트 상세조회 삭제 API 호출
const deletefetch_event_detail = async() => {
  try {
    const eventReportId = route.params.eventReportId;
    await axios.delete(`/api/vsoc/monitoring-report/event/${eventReportId}`);
  } catch (error) {
    console.error(error);
    alert('데이터 삭제 실패');
  }
}

// modal
const goList = () => router.replace({ name: "monitoring_management" });

const openDeleteConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "warning",
    textArea: "리포트를 삭제하시겠습니까?",

    rightBtn: async() => { 
      await deletefetch_event_detail();
      goList(); 
    },
  })
};

onMounted(() =>{
  getfetch_event_detail();
  getfetch_button_link();
});
</script>
