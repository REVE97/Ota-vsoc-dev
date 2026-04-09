<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
      <span>리포트 상세 조회</span>
    </section>
    <section class="step button">
      <router-link 
        v-if="isValid?.eventReportId" 
        :to="{ name: 'monitoring_event_detail', params: { eventReportId: isValid.eventReportId } }">
        <button>Event Report</button>
      </router-link>
      <router-link 
        v-if="isValid?.weaknessReportId" 
        :to="{ name: 'monitoring_weakness_detail', params: { weaknessReportId: isValid.weaknessReportId } }">
        <button>Weakness Report</button>
      </router-link>
      <button class="active">Vulnerability Report</button>
      <router-link 
        v-if="isValid?.cyberReportId" 
        :to="{ name: 'monitoring_cyber_detail', params: { cyberReportId: isValid.cyberReportId } }">
        <button>Cybersecurity Incident Response Report</button>
      </router-link>
    </section>
    <section class="page">
      <article class="table">
        <strong>기본</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Vulnerability ID</th>
              <td>{{ allData?.id }}</td>
              <th>Weakness ID</th>
              <td>{{ allData?.weaknessReportId }}</td>
            </tr>
            <tr>
              <th>제품명</th>
              <td>{{ eventData?.productName }}</td>
              <th>프로젝트명</th>
              <td>{{ eventData?.projectName }}</td>
            </tr>
            <tr>
              <th>프로젝트 취약점 ID (해당하는 경우만)</th>
              <td>-</td>
              <th>Asset 이름</th>
              <td>{{ eventData?.associatedAsset }}</td>
            </tr>
            <tr>
              <th>사이버 보안 자산</th>
              <td>{{ allData?.weaknessReport?.cyberAsset }}</td>
              <th>공격 시나리오</th>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>분석 전</strong>
        <table>
          <colgroup>
            <col width="120px" />
            <col width="120px" />
            <col width="auto" />
            <col width="120px" />
            <col width="120px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="2">영향</th>
              <th>운영</th>
              <td>{{ allData?.preImpactOperation }}</td>
              <th rowspan="2">영향</th>
              <th>안전</th>
              <td>{{ allData?.preImpactSafety }}</td>
            </tr>
            <tr>
              <th>개인 정보</th>
              <td>{{ allData?.preImpactPrivacy }}</td>
              <th>재정</th>
              <td>{{ allData?.preImpactFinancial }}</td>
            </tr>
            <tr>
              <th colspan="2">영향 등급</th>
              <td>{{ allData?.preImpactRating }}</td>
              <th colspan="2">위협 시나리오</th>
              <td>{{ allData?.preThreatScenario }}</td>
            </tr>
            <tr>
              <th colspan="2">공격 경로</th>
              <td>{{ allData?.preAttackPath }}</td>
              <th colspan="2">위험 처리 방안</th>
              <td>{{ allData?.preRiskTreatmentPlan }}</td>
            </tr>
            <tr>
              <th rowspan="3">공격 가능성</th>
              <th>소요 시간</th>
              <td>{{ allData?.preAfElapsedTime }}</td>
              <th rowspan="3">공격 가능성</th>
              <th>한정된 기회</th>
              <td>{{ allData?.preAfWindowOfOpportunity }}</td>
            </tr>
            <tr>
              <th>기술 전문성</th>
              <td>{{ allData?.preAfTechnicalExpertise }}</td>
              <th>장비</th>
              <td>{{ allData?.preAfEquipment }}</td>
            </tr>
            <tr>
              <th>아이템에 대한 지식</th>
              <td>{{ allData?.preAfKnowledgeOfItem }}</td>
              <th>합계</th>
              <td>{{ preSum }}</td>
            </tr>
            <tr>
              <th colspan="2">공격 가능성 등급</th>
              <td>{{ preAttackRank }}</td>
              <th colspan="2">위험도 평가</th>
              <td>{{ allData?.preRiskAssessment }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>분석 후</strong>
        <table>
          <colgroup>
            <col width="120px" />
            <col width="120px" />
            <col width="auto" />
            <col width="120px" />
            <col width="120px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="3">공격 가능성</th>
              <th>소요 시간</th>
              <td>{{ allData?.postAfElapsedTime }}</td>
              <th rowspan="3">공격 가능성</th>
              <th>한정된 기회</th>
              <td>{{ allData?.postAfWindowOfOpportunity }}</td>
            </tr>
            <tr>
              <th>기술 전문성</th>
              <td>{{ allData?.postAfTechnicalExpertise }}</td>
              <th>장비</th>
              <td>{{ allData?.postAfEquipment }}</td>
            </tr>
            <tr>
              <th>아이템에 대한 지식</th>
              <td>{{ allData?.postAfKnowledgeOfItem }}</td>
              <th>합계</th>
              <td>{{ postSum }}</td>
            </tr>
            <tr>
              <th colspan="2">공격 가능성 등급</th>
              <td>{{ postAttackRank }}</td>
              <th colspan="2">위험도 평가</th>
              <td>{{ allData?.postAfRiskScore }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>설명</th>
              <td colspan="3">{{ allData?.postDescription }}</td>
            </tr>
            <tr>
              <th>담당자</th>
              <td>{{ allData?.postManager }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>취약점 관리</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Vulnerability Management ID</th>
              <td>-</td>
              <th>제품명</th>
              <td>{{ eventData?.productName }}</td>
            </tr>
            <tr>
              <th>프로젝트명</th>
              <td>{{ eventData?.projectName }}</td>
              <th>Vulnerability ID</th>
              <td>{{ allData?.id }}</td>
            </tr>
            <tr>
              <th>연관된 Asset</th>
              <td>{{ eventData?.associatedAsset }}</td>
              <th>분석 후 위험도</th>
              <td>{{ allData?.postRiskScore }}</td>
            </tr>
            <tr>
              <th>위험 관리 방안</th>
              <td>{{ allData?.riskMgmtPlan }}</td>
              <th>처리 후 위험도</th>
              <td>{{ allData?.treatedRiskScore }}</td>
            </tr>
            <tr>
              <th>담당자</th>
              <td>{{ allData?.manager }}</td>
              <th>최근 취약점 관리 일자</th>
              <td>{{ getDate(allData?.lastMgmtDate) }}</td>
            </tr>
            <tr>
              <th>취약점 관리 시작 일자</th>
              <td>{{ getDate(allData?.startMgmtDate) }}</td>
              <th>취약점 관리 종료 일자</th>
              <td>{{ getDate(allData?.endMgmtDate) }}</td>
            </tr>
            <tr>
              <th>취약점 관리 상태</th>
              <td>{{ allData?.mgmtStatus }}</td>
            </tr>
            <tr>
              <th>취약점 관리 상태 파일</th>
              <td class="group" v-for="item in allData?.fileList">
                파일명 : {{ item.originalName }} / {{ item.fileCategoryDescription }}
              </td>
            </tr>
          </tbody>
        </table>
      </article> 
      <article class="table">
        <strong>이력 관리</strong>
        <table>
          <thead>
            <tr>
              <th>일자</th>
              <th>활동</th>
              <th>담당자</th>
              <th>증빙자료</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in allData?.hisList">
              <td>{{ getDate(item.createdAt) }}</td>
              <td>{{ item.activity }}</td>
              <td>{{ item.manager }}</td>
              <td>{{ item.originalName }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button class="red line" @click="openDeleteConfirm">삭제</button>
        <router-link 
          :to="{ name: 'monitoring_vulner_update', params: { vulnerabilityReportId: route.params.vulnerabilityReportId } }">
          <button class="line">수정</button>
        </router-link>
        <button class="cancel" @click='router.push({ name: "monitoring_management" })'>목록</button>
        <router-link 
          v-if="isValid?.cyberReportId === null" 
          :to="{ name: 'monitoring_cyber_register', params: { vulnerabilityReportId: isValid.vulnerabilityReportId } }">
          <button>사이버 리포트 작성</button>
        </router-link>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import { getDate } from '@/common/common';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';

const route = useRoute();
const router = useRouter();
const store = useAppStore();

// 모니터링 취약점 리포트 상세조회 전체 데이터 상태값
const allData = ref(null);

// 모니터링 취약점 리포트 상세조회에서 필요한 이벤트 리포트 데이터 상태값
const eventData = ref(null);

// 버튼으로 이동하기 위한 리포트 데이터
const isValid = ref({
  eventReportId: "",
  weaknessReportId: "",
  vulnerabilityReportId: "",
  cyberReportId: "",
});

// 분석전 공격 가능성 합계
const preSum = computed(() => {
  return [
    allData?.value?.preAfElapsedTime,
    allData?.value?.preAfTechnicalExpertise,
    allData?.value?.preAfKnowledgeOfItem,
    allData?.value?.preAfWindowOfOpportunity,
    allData?.value?.preAfEquipment
  ].reduce((sum, value) => sum + value,0);
});

// 분석후 공격 가능성 합계
const postSum = computed(() => {
  return [
    allData?.value?.postAfElapsedTime,
    allData?.value?.postAfTechnicalExpertise,
    allData?.value?.postAfKnowledgeOfItem,
    allData?.value?.postAfWindowOfOpportunity,
    allData?.value?.postAfEquipment
  ].reduce((sum, value) => sum + value,0)
});

// 분석전 공격 가능성 등급 데이터 상태값
const preAttackRank = computed(() => {
  if(preSum.value <= 13) return "High";
  else if(preSum.value >= 14 && preSum.value < 23) return "Medium";
  else if(preSum.value >= 24 && preSum.value < 25) return "Low";
  else return "Very Low";
})

// 분석후 공격 가능성 등급 데이터 상태값
const postAttackRank = computed(() => {
  if(postSum.value <= 13) return "High";
  else if(postSum.value >= 14 && postSum.value < 23) return "Medium";
  else if(postSum.value >= 24 && postSum.value < 25) return "Low";
  else return "Very Low";
})

// 모니터링 취약점 리포트 상세조회 API 호출
const getfetch_vulner_detail = async() => {
  try {
    const vulnerabilityReportId = route.params.vulnerabilityReportId;
    const res = await axios.get(`/api/vsoc/monitoring-report/vulnerability/${vulnerabilityReportId}`);
    allData.value = res.data.data.report;
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// 해당 리포트 리스트 바로가는 버튼, 다음 리포트 작성 버튼 API 호출
const getfetch_button_link = async() => {
  try {
    const vulnerabilityReportId = Number(route.params.vulnerabilityReportId);
    const res = await axios.get('/api/vsoc/monitoring-report');
    isValid.value = res.data.data.monitoringReports.list.find((item)=>item.vulnerabilityReportId === vulnerabilityReportId);
    
    const res_plus = await axios.get(`/api/vsoc/monitoring-report/event/${isValid.value.eventReportId}`);
    eventData.value = res_plus.data.data.report;

  } catch (error) {
    console.error(error);
    alert('버튼 데이터 불러오기 실패');
  }
}

// 모니터링 취약점 리포트 상세조회 삭제 API 호출
const deletefetch_vulner_detail = async() => {
  try {
    const vulnerabilityReportId = route.params.vulnerabilityReportId;
    await axios.post(`/api/vsoc/monitoring-report/vulnerability/${vulnerabilityReportId}`);
  } catch (error) {
    console.error(error);
    alert('데이터 삭제 실패!');
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
      await deletefetch_vulner_detail();
      goList(); 
    },
  })
};

onMounted(() =>{
  getfetch_vulner_detail();
  getfetch_button_link();
});
</script>
